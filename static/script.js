document.addEventListener('DOMContentLoaded', () => {
  // ===============================
  // 🔧 DOM ELEMENTS
  // ===============================
  const chat = document.getElementById('chat');
  const msg = document.getElementById('msg');
  const send = document.getElementById('send');
  const mic = document.getElementById('mic');
  const micStatus = document.getElementById('mic-status');
  const themeToggle = document.getElementById('themeToggle');
  const muteToggle = document.getElementById('muteToggle');
  const voiceOnlyToggle = document.getElementById('voiceOnlyToggle');
  const languageToggle = document.getElementById('languageToggle');
  const webToggle = document.getElementById('webToggle');
  const chips = document.querySelectorAll('.chip');
  const avatar = document.querySelector('.avatar');
  const listeningAnimation = document.getElementById('listeningAnimation');
  const wakeMicButton = document.getElementById('wakeMicButton');
  const historyList = document.getElementById('historyList');
  const clearChatBtn = document.getElementById('clearChat');
  const clearHistoryBtn = document.getElementById('clearHistory');

  // ===============================
  // 🧠 STATE
  // ===============================
  let chatHistory = [];
  let isMuted = false;
  let voiceOnly = false;
  let webSearchEnabled = false;
  let recognition = null;

  // ===============================
  // 🌐 WEB SEARCH TOGGLE
  // ===============================
  webToggle?.addEventListener('click', () => {
    webSearchEnabled = !webSearchEnabled;
    webToggle.classList.toggle('active', webSearchEnabled);
    webToggle.setAttribute('aria-pressed', webSearchEnabled);
    webToggle.title = `Toggle Web Search (${webSearchEnabled ? 'ON' : 'OFF'})`;
  });

  // ===============================
  // 🗑️ CLEAR CHAT / HISTORY
  // ===============================
  clearHistoryBtn?.addEventListener('click', () => {
    chatHistory = [];
    historyList.innerHTML = '';
  });

  clearChatBtn?.addEventListener('click', () => {
    chat.innerHTML = '';
    addBubble('Chat cleared successfully.', 'bot', '', true);
    if (!isMuted) speak('Chat cleared successfully.');
  });

  // ===============================
  // 📜 HISTORY SIDEBAR
  // ===============================
  function renderHistory() {
    historyList.innerHTML = '';
    const recent = chatHistory.slice(-10);

    for (let i = 0; i < recent.length; i += 2) {
      const userMsg = recent[i]?.content || '';
      const aiMsg = recent[i + 1]?.content || '';

      const li = document.createElement('li');
      li.textContent = `You: ${userMsg}`;
      li.title = aiMsg;
      li.onclick = () => {
        msg.value = userMsg;
        msg.focus();
      };

      historyList.appendChild(li);
    }
  }

  // ===============================
  // 💬 ADD CHAT BUBBLE (MARKDOWN SAFE)
  // ===============================
  function addBubble(text, who = 'bot', meta = '', animate = false) {
    if (voiceOnly) return;

    const bubble = document.createElement('div');
    bubble.className = `bubble ${who}`;

    const content = document.createElement('div');
    content.className = 'ai-text';
    bubble.appendChild(content);

    const renderMeta = () => {
      if (!meta) return;
      const metaDiv = document.createElement('div');
      metaDiv.className = 'meta';
      metaDiv.innerHTML = meta;
      bubble.appendChild(metaDiv);
    };

    if (animate && who === 'bot') {
      let i = 0;
      const raw = text;
      const timer = setInterval(() => {
        if (i < raw.length) {
          i++;
          content.innerHTML = marked.parse(raw.slice(0, i));
        } else {
          clearInterval(timer);
          renderMeta();
        }
      }, 25);
    } else {
      content.innerHTML = marked.parse(text);
      renderMeta();
    }

    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
  }

  // ===============================
  // ⌨️ TYPING INDICATOR
  // ===============================
  function addTyping() {
    if (voiceOnly) return;
    const typing = document.createElement('div');
    typing.className = 'bubble bot typing';
    typing.innerHTML = `
      <div style="display:flex;gap:8px">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>`;
    chat.appendChild(typing);
  }

  function removeTyping() {
    document.querySelector('.bubble.typing')?.remove();
  }

  // ===============================
  // 📤 SEND MESSAGE
  // ===============================
  async function sendMessage(text) {
    const cleaned = text.trim();
    if (!cleaned) return;

    chatHistory.push({ role: 'user', content: cleaned });
    renderHistory();

    addBubble(`You: ${cleaned}`, 'user', new Date().toLocaleTimeString());
    msg.value = '';
    addTyping();

    try {
      const res = await fetch('https://ggpai-1-0.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: cleaned,
          history: chatHistory,
          wiki: webSearchEnabled
        })
      }).then(r => r.json());

      removeTyping();

      const source =
        res.source === 'web+ai' ? '🌐 Web + 🤖 AI' :
        res.source === 'local' ? '📁 Local' : '🤖 AI';

      chatHistory.push({ role: 'assistant', content: res.reply });
      renderHistory();

      setTimeout(() => {
        addBubble(`Swastik: ${res.reply}`, 'bot', source, true);
        const cleanReply = res.reply
        .replace(/(\*\*|__|[_*`])/g, '')
        .replace(/<[^>]*>/g, '')
        .replace(/[\p{Extended_Pictographic}]/gu, '')
        .trim();
        speak(cleanReply);
      }, 300);


    } catch {
      removeTyping();
      addBubble('Swastik: Something went wrong. Please try again.', 'bot');
    }
  }

  // ===============================
  // 🔊 TEXT TO SPEECH
  // ===============================
  function speak(text) {
    if (!text || isMuted || !('speechSynthesis' in window)) return;

    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1.1;

    const isHindi = /[\u0900-\u097F]/.test(text);
    utter.lang =
      languageToggle.value === 'hi' ? 'hi-IN' :
      languageToggle.value === 'en' ? 'en-GB' :
      isHindi ? 'hi-IN' : 'en-GB';

    utter.onstart = () => {
      avatar?.classList.add('voice-anim');
      listeningAnimation.style.display = 'block';
    };

    utter.onend = () => {
      avatar?.classList.remove('voice-anim');
      listeningAnimation.style.display = 'none';
      if (voiceOnly) {
        wakeMicButton.style.display = 'flex';
      } else {
        msg.focus(); // 🔥 restore typing
      }
    };

    speechSynthesis.speak(utter);
  }

  // ===============================
  // 🎤 SPEECH RECOGNITION
  // ===============================
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      mic.classList.add('mic-active');
      micStatus.textContent = ' Listening...';
      listeningAnimation.style.display = 'block';
    };

    recognition.onresult = e => sendMessage(e.results[0][0].transcript);

    recognition.onend = () => {
      mic.classList.remove('mic-active');
      micStatus.textContent = '';
      listeningAnimation.style.display = 'none';
      if (!voiceOnly) msg.focus();
    };

    mic.onclick = () => recognition.start();
    wakeMicButton.onclick = () => recognition.start();
  }

  // ===============================
  // 🎛️ CONTROLS
  // ===============================
  send.onclick = () => sendMessage(msg.value);
  msg.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendMessage(msg.value);
  });

  themeToggle.onclick = () => document.body.classList.toggle('dark');

  muteToggle.onclick = () => {
    isMuted = !isMuted;
    muteToggle.classList.toggle('active', isMuted);
  };

  voiceOnlyToggle.onclick = () => {
    voiceOnly = !voiceOnly;
    document.body.classList.toggle('voice-only', voiceOnly);
    if (voiceOnly) {
    wakeMicButton.style.display = 'flex';
    msg.blur();
    speak("Hello, I'm Swastik. I'm listening.");
  } else {
    wakeMicButton.style.display = 'none';
    msg.focus();
  }
};
// Add this at the bottom of your script.js inside DOMContentLoaded
window.addEventListener('keydown', (e) => {
  // Only act if voice-only mode is active
  if (!voiceOnly) return;

  // Use Space key to activate mic
  if (e.code === 'Space') {
    e.preventDefault(); // prevent page scroll
    if (recognition) {
      recognition.start();
      // Optional: give visual feedback
      wakeMicButton.classList.add('active');
      setTimeout(() => wakeMicButton.classList.remove('active'), 300);
    }
  }
});


  chips.forEach(c => c.onclick = () => sendMessage(c.dataset.q));

  // ===============================
  // 👋 GREETING
  // ===============================
  addBubble(
    'Hello 👋 I am **Swastik**, your AI assistant.\n\nAsk me anything! ',
    'bot',
    '',
    true
  );

  // 🔐 emergency focus recovery
  window.addEventListener('click', (e) => {
  if (
    !voiceOnly &&
    e.target !== languageToggle &&
    !languageToggle.contains(e.target)
  ) {
    msg.focus();
  }
});
});
