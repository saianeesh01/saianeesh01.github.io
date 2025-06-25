async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatlog = document.getElementById("chatlog");

  const userMsg = input.value;
  chatlog.innerHTML += `<div class="user-msg">You: ${userMsg}</div>`;
  input.value = '';

  const res = await fetch('http://127.0.0.1:5000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMsg })
  });

  const data = await res.json();
  chatlog.innerHTML += `<div class="bot-msg">Bot: ${data.response}</div>`;
}
