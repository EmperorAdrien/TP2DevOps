const chatHistory = document.getElementById("chat-history");
const chatInputForm = document.getElementById("chat-input-form");
const userMessageInput = document.getElementById("user-message");

chatInputForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userMessage = userMessageInput.value.trim();
    if (!userMessage) return;

    addMessageToHistory(userMessage, "user-message");
    userMessageInput.value = "";

    const botResponse = await getBotResponse(userMessage);
    addMessageToHistory(botResponse, "bot-message");
});

function addMessageToHistory(message, className) {
    const chatMessage = document.createElement("div");
    chatMessage.classList.add("chat-message", className);
    chatMessage.innerText = message;
    chatHistory.appendChild(chatMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function getBotResponse(userMessage) {
    const response = await fetch("/api/get_bot_response/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_message: userMessage }),
    });

    if (response.ok) {
        const data = await response.json();
        const botResponse = data.bot_response;
        return botResponse;
    } else {
        console.error("Error fetching response from Django backend:", response);
        return "Sorry, I couldn't get a response from the API. Please try again later.";
    }
}

const button = document.getElementById("back-to-home");
button.addEventListener("click", function() {location.href = '/home'});
