const ANSWERS = {
  hours: {
    q: "⏰ What are your hours?",
    a: "We're open 7 days a week!\n\n📅 Monday – Saturday: 11:00 AM – 8:00 PM\n📅 Sunday: 11:00 AM – 7:00 PM\n\nNo appointment needed — just walk in!"
  },
  location: {
    q: "📍 Where are you located?",
    a: "We're at:\n\n📍 6701 W Thomas Rd, Suite 1\nPhoenix, AZ 85033\n\nEasy to find on W Thomas Rd. Plenty of parking available!"
  },
  time: {
    q: "⚡ How long does a repair take?",
    a: "Most repairs are super fast! ⚡\n\n📱 Screen replacement: ~20 minutes\n🔋 Battery replacement: ~30 minutes\n🔌 Charging port: ~30–45 minutes\n📷 Camera repair: ~45–60 minutes\n\nMore complex repairs may take a few hours. We'll give you an honest estimate upfront."
  },
  cost: {
    q: "💰 How much does it cost?",
    a: "Pricing depends on the device and repair type. We offer the best prices in Phoenix and will beat any competitor's written quote! 💰\n\nCall us at (602) 373-7378 or stop by for a free diagnostic and quote — no obligation!"
  },
  walkin: {
    q: "🚶 Do I need an appointment?",
    a: "No appointment needed! 🙌\n\nWe welcome walk-ins anytime during business hours. Most repairs are done while you wait, so you can be in and out in no time."
  },
  devices: {
    q: "📱 What devices do you fix?",
    a: "We fix all major brands and devices! 📱\n\n✅ iPhones (all models)\n✅ Samsung Galaxy (S, A, Note, Z series)\n✅ Google Pixel\n✅ Motorola, LG, OnePlus & more\n✅ iPads (all models)\n✅ Android tablets\n✅ And many more!\n\nIf it has a screen, we can likely fix it."
  },
  warranty: {
    q: "🛡️ Do repairs come with a warranty?",
    a: "Yes! Every repair includes a 12-month warranty on parts and labor. 🛡️\n\nIf anything goes wrong with our repair within 12 months, bring it back and we'll make it right — no questions asked."
  },
  water: {
    q: "💧 Can you fix water damage?",
    a: "Yes — and the sooner the better! 💧\n\nIf your device got wet, bring it in IMMEDIATELY. Don't try to charge it or turn it on first. We perform professional cleaning and diagnostics to give your device the best chance of recovery.\n\nCall us at (602) 373-7378 if you need urgent help!"
  }
};

const toggle = document.getElementById('chat-toggle');
const panel = document.getElementById('chat-panel');
const iconOpen = document.getElementById('chat-icon-open');
const iconClose = document.getElementById('chat-icon-close');
const closeBtn = document.getElementById('chat-close-btn');
const messages = document.getElementById('chat-messages');
const suggestions = document.getElementById('chat-suggestions');

function openChat() {
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  iconOpen.style.display = 'none';
  iconClose.style.display = 'block';
}

function closeChat() {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  iconOpen.style.display = 'block';
  iconClose.style.display = 'none';
}

toggle.addEventListener('click', () => panel.classList.contains('open') ? closeChat() : openChat());
closeBtn.addEventListener('click', closeChat);

function addMessage(text, type) {
  const div = document.createElement('div');
  div.className = `chat-msg ${type}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerText = text;
  div.appendChild(bubble);
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot typing-msg';
  div.innerHTML = '<div class="chat-bubble typing"><span></span><span></span><span></span></div>';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

document.querySelectorAll('.chat-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.key;
    const item = ANSWERS[key];
    if (!item) return;

    addMessage(item.q, 'user');
    suggestions.style.display = 'none';

    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage(item.a, 'bot');

      // Show follow-up prompt
      const followUp = document.createElement('div');
      followUp.className = 'chat-msg bot';
      followUp.innerHTML = '<div class="chat-bubble">Anything else I can help with? 😊</div>';
      messages.appendChild(followUp);
      messages.scrollTop = messages.scrollHeight;

      const resetBtn = document.createElement('button');
      resetBtn.className = 'chat-reset';
      resetBtn.innerText = '← Ask another question';
      resetBtn.addEventListener('click', () => {
        resetBtn.remove();
        suggestions.style.display = 'flex';
        messages.scrollTop = messages.scrollHeight;
      });
      messages.appendChild(resetBtn);
      messages.scrollTop = messages.scrollHeight;
    }, 900);
  });
});
