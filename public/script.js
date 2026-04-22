let isSending = false;

function loadMemory() {
  return JSON.parse(localStorage.getItem("eve_memory") || "[]");
}

function saveMemory(memory) {
  localStorage.setItem("eve_memory", JSON.stringify(memory));
}

function typeMessage(text, element) {
  let i = 0;
  element.innerHTML = "";

  const interval = setInterval(() => {
    element.innerHTML += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 18);
}

async function sendMessage() {
  const input = document.getElementById("input");
  const message = input.value.trim();
  if (!message || isSending) return;

  isSending = true;

  addMessage("You", message);
  input.value = "";

  const loadingBubble = addMessage("Eve", "…");

  let memory = loadMemory();

  try {
    const res = await fetch("/api/eve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        memory
      })
    });

    const data = await res.json();

    await new Promise(r => setTimeout(r, 800));

    loadingBubble.innerHTML = "";
    typeMessage(data.reply, loadingBubble);

    memory.push({ role: "user", content: message });
    memory.push({ role: "assistant", content: data.reply });

    saveMemory(memory);

  } catch (err) {
    loadingBubble.innerHTML = "I can't reach you right now… 💔";
  }

  isSending = false;
}
