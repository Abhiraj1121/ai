document.addEventListener('DOMContentLoaded', () => {
  // 🔧 DOM Elements
  const chat = document.getElementById('chat');
  const msg = document.getElementById('msg');
  const send = document.getElementById('send');
  const mic = document.getElementById('mic');
  const micStatus = document.getElementById('mic-status');
  const themeToggle = document.getElementById('themeToggle');
  const muteToggle = document.getElementById('muteToggle');
  const voiceOnlyToggle = document.getElementById('voiceOnlyToggle');
  const languageToggle = document.getElementById('languageToggle');
  const chips = document.querySelectorAll('.chip');
  const avatar = document.querySelector('.avatar');
  const listeningAnimation = document.getElementById('listeningAnimation');
  const wakeMicButton = document.getElementById('wakeMicButton');

  // 🔁 State
  let isMuted = false;
  let voiceOnly = false;
  let currentSpeech = null;
  let typingBubble = null;
  let recognition;

  // ✨ Make URLs, emails & phones clickable
  function linkify(text) {
    return text
      .replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      .replace(
        /(^|[^\/])(www\.[^\s]+)/g,
        '$1<a href="https://$2" target="_blank" rel="noopener noreferrer">$2</a>'
      )
      .replace(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        '<a href="mailto:$1">$1</a>'
      )
      .replace(
        /(\+?\d[\d\s\-]{6,}\d)/g,
        '<a href="tel:$1">$1</a>'
      );
  }

  // 💬 Chat Bubble (with animated link-safe typing)
  function addBubble(text, who = 'bot', meta = '', animate = false) {
    if (voiceOnly) return;

    const b = document.createElement('div');
    b.className = `bubble ${who}`;
    const content = document.createElement('div');
    content.className = 'ai-text';
    b.appendChild(content);

    const processedText = linkify(text);

    if (animate && who === 'bot') {
      let i = 0;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = processedText;
      const fullHTML = tempDiv.innerHTML;
      const visible = document.createElement('div');
      content.appendChild(visible);

      const interval = setInterval(() => {
        if (i < fullHTML.length) {
          if (fullHTML[i] === '<') {
            const end = fullHTML.indexOf('>', i);
            if (end !== -1) {
              visible.innerHTML += fullHTML.substring(i, end + 1);
              i = end + 1;
            } else {
              visible.innerHTML += fullHTML[i++];
            }
          } else {
            visible.innerHTML += fullHTML[i++];
          }
        } else {
          clearInterval(interval);
          if (meta) {
            const metaDiv = document.createElement('div');
            metaDiv.className = 'meta';
            metaDiv.innerHTML = meta;
            b.appendChild(metaDiv);
          }
        }
      }, 15);
    } else {
      content.innerHTML = processedText;
      if (meta) {
        const metaDiv = document.createElement('div');
        metaDiv.className = 'meta';
        metaDiv.innerHTML = meta;
        b.appendChild(metaDiv);
      }
    }

    chat.appendChild(b);
    autoScroll();
  }

  function addTyping() {
    if (voiceOnly) return;
    typingBubble = document.createElement('div');
    typingBubble.className = 'bubble bot typing';
    typingBubble.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>`;
    chat.appendChild(typingBubble);
    requestAnimationFrame(() => (chat.scrollTop = chat.scrollHeight));
  }

  function removeTyping() {
    if (typingBubble) {
      typingBubble.remove();
      typingBubble = null;
    }
  }

  // 📤 Send Message
  async function sendMessage(text) {
    const cleaned = text.trim();
    if (!cleaned) {
      addBubble('Swastik: Please enter a valid question.', 'bot');
      return;
    }

    window.speechSynthesis.cancel();
    removeTyping();
    addBubble(`You: ${cleaned}`, 'user', new Date().toLocaleTimeString());
    msg.value = '';
    addTyping();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: cleaned })
      }).then(r => r.json());

      removeTyping();
      const isHindi = /[\u0900-\u097F]/.test(res.reply);

      setTimeout(() => {
        addBubble(
          `Swastik: ${res.reply}`,
          'bot',
          isHindi ? '🗣️ Spoken in Hindi' : '🗣️ Spoken in English',
          true
        );

        const cleanReply = res.reply
          .replace(/(\*\*|__|[_*`])/g, '')
          .replace(/<[^>]*>/g, '');

        speak(cleanReply);
      }, 500);
    } catch (err) {
      removeTyping();
      addBubble('Swastik: Sorry, something went wrong. Try again.', 'bot');
      console.error("Error sending message:", err);
    }
  }

  // 🔊 Speak
  function speak(text) {
    if (!text || !('speechSynthesis' in window) || isMuted) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.0;
    utter.pitch = 1.2;

    const selectedLang = languageToggle?.value || 'auto';
    const isHindi = /[\u0900-\u097F]/.test(text);
    utter.lang =
      selectedLang === 'en'
        ? 'en-GB'
        : selectedLang === 'hi'
        ? 'hi-IN'
        : isHindi
        ? 'hi-IN'
        : 'en-GB';

    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      const preferred = voices.find(v =>
        utter.lang === 'hi-IN'
          ? v.lang === 'hi-IN' || v.name.includes('Hindi')
          : v.name === 'Google UK English Female'
      );
      if (preferred) utter.voice = preferred;

      avatar?.classList.add('voice-anim');
      listeningAnimation.style.display = 'block';
      speechSynthesis.cancel();
      speechSynthesis.speak(utter);
      currentSpeech = utter;

      utter.onend = () => {
        avatar?.classList.remove('voice-anim');
        listeningAnimation.style.display = 'none';
        if (voiceOnly && recognition)
          wakeMicButton.style.display = 'flex';
      };
    };

    if (speechSynthesis.getVoices().length === 0)
      speechSynthesis.onvoiceschanged = setVoice;
    else setVoice();
  }

  // 🎤 Voice Recognition
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      mic.classList.add('mic-active');
      micStatus.textContent = '🎤 Listening...';
      listeningAnimation.style.display = 'block';
      wakeMicButton.style.display = 'none';
    };

    recognition.onresult = e => {
      const transcript = e.results[0][0].transcript;
      msg.value = transcript;
      sendMessage(transcript);
    };

    recognition.onend = () => {
      mic.classList.remove('mic-active');
      micStatus.textContent = '';
      listeningAnimation.style.display = 'none';
      if (voiceOnly) wakeMicButton.style.display = 'flex';
    };

    recognition.onerror = () => {
      mic.classList.remove('mic-active');
      micStatus.textContent = '';
      listeningAnimation.style.display = 'none';
      addBubble('Swastik: Voice input failed. Try typing instead.', 'bot');
    };

    mic.addEventListener('click', () => recognition.start());
    wakeMicButton.addEventListener('click', () => {
      if (recognition && voiceOnly) {
        wakeMicButton.style.display = 'none';
        recognition.start();
      }
    });
  } else {
    mic.style.opacity = 0.45;
    mic.title = 'Voice input not supported';
  }

  // ⚙️ UI Controls
  send.addEventListener('click', () => sendMessage(msg.value));
  msg.addEventListener('keydown', e => e.key === 'Enter' && sendMessage(msg.value));

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });

  muteToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    muteToggle.textContent = isMuted ? '🔇' : '🔊';
  });

  voiceOnlyToggle.addEventListener('click', () => {
    voiceOnly = !voiceOnly;
    document.body.classList.toggle('voice-only', voiceOnly);
    if (voiceOnly && recognition) {
      listeningAnimation.style.display = 'block';
      speak("Hello, I’m Swastik. I’m listening.");
      wakeMicButton.style.display = 'none';
    } else {
      wakeMicButton.style.display = 'none';
    }
  });

  // 🎹 Spacebar Wake Mic
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      if (voiceOnly && recognition && wakeMicButton.style.display === 'flex')
        wakeMicButton.click();
    }
  });

  chips.forEach(c => c.addEventListener('click', () => {
    const q = c.dataset.q;
    msg.value = q;
    sendMessage(q);
  }));

  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

  addBubble('Sir/Mam Hello, I am Swastik your AI Chat bot for G.G.P.School Bokaro', 'bot', '', true);
});

function autoScroll() {
  const chat = document.getElementById('chat');
  requestAnimationFrame(() => (chat.scrollTop = chat.scrollHeight));
}

window.addEventListener('load', () => {
  listeningAnimation.style.display = 'none';
});
