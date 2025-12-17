# 🤖 Swastik – Intelligent AI Chat Assistant

**Swastik** is a modern, AI-powered web chatbot designed to provide natural conversations through text and voice. It features a sleek chat UI, optional Wikipedia-powered web search, markdown-rendered responses, and hands-free voice interaction — all running in a lightweight Flask-based web app.

Swastik is built to be fast, flexible, and easy to extend, making it ideal for personal assistants, knowledge bots, demos, or AI experiments.


legal Documents : https://abhiraj1121.github.io/ai-tc/

---

## 🚀 Features

### 🧠 AI Intelligence

* AI-powered conversational responses using a cloud-based text generation API
* Smart fallback logic for reliable replies
* Clean, friendly, and concise responses by default

### 🌐 Web / Wikipedia Search (Optional)

* Toggle-based web search (OFF by default)
* Uses **Wikipedia** for factual and up-to-date information
* Automatically falls back to AI if no wiki result is found
* Safe, fast, and non-intrusive (no crashes)

### 📝 Markdown Support

* AI and Wiki responses support **Markdown formatting**
* Proper rendering of:

  * Headings
  * Bullet points
  * Bold / italic text
  * Code blocks
* Clean reading experience for long answers

### 🎤 Voice Interaction

* 🎙️ Voice input using Web Speech API
* 🔊 Voice output using Speech Synthesis
* Automatic language detection (English / Hindi)
* Voice-only mode with wake mic support

### 💬 Chat Experience

* Smooth typing animation
* Chat bubbles with timestamps
* Quick-reply action buttons
* Auto-scroll behavior
* Responsive UI for desktop and mobile

### 🧹 Chat Management

* **Clear Chat / History button**
* Instantly wipes conversation from UI
* Optional voice confirmation after clearing

### 🎨 UI & Controls

* Dark / Light theme toggle
* Mute / Unmute voice output
* Web search toggle with glowing animation
* Clean, modern, animated interface

---

## 🛠️ Tech Stack

### Backend

* **Python 3.8+**
* **Flask**
* **Flask-CORS**
* **Requests**
* **python-dotenv**

### Frontend

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla)**
* Web Speech API (Voice Input)
* SpeechSynthesis API (Voice Output)

### AI

* Any OpenAI-compatible or OpenRouter-compatible AI API
* Wikipedia REST API for factual lookup

---

## 📁 Project Structure

```
Swastik/
├── app.py                  # Flask backend (AI + Wiki logic)
├── templates/
│   └── index.html          # Chat UI
├── static/
│   ├── style.css           # Styling & animations
│   ├── script.js           # Chat logic, voice, toggles
│   └── Swastik.png         # Logo
├── .env                    # API keys & config
└── README.md               # Documentation
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
pip install flask requests flask-cors python-dotenv
```

---

### 2️⃣ Environment Variables

Create a `.env` file:

```bash
AI_API_URL="https://api.openai.com/v1/chat/completions"
AI_API_KEY="your-api-key-here"
```

(Works with OpenAI, OpenRouter, or any compatible provider)

---

### 3️⃣ Run the App

```bash
python app.py
```

---

### 4️⃣ Open in Browser

```
http://127.0.0.1:5000
```

---

## 🧪 Usage Examples

Try typing or speaking:

* “What is Artificial Intelligence?”
* “DC of Patna” (with 🌐 Web Search ON)
* “Explain black holes in simple words”
* “Write a Python function for Fibonacci”

Toggle 🌐 Web Search ON to fetch verified information from Wikipedia.

---

## 📌 Notes

* Best experience on **Google Chrome** (voice features)
* Web search works **only when enabled**
* AI responses are used when Wiki is disabled or unavailable
* No conversation history is stored on the server

---

## 👤 Author

**Abhi**
Developer & Designer
