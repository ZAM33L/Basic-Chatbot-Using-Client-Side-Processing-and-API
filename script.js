const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");


let userMessage;

const API_KEY='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'

const createChatLi = (message, className) => {
        const chatLi = document.createElement("li");
        chatLi.classList.add("chat", className);
        let chatContent = className === "outgoing" ? `<p>${message}</p>` : ` <p>${message}</p>`;
        chatLi.innerHTML = chatContent;
        return chatLi;
}


const generateResponse = (incomingChatLi) => {
        const API_URL = "https://api.openai.com/v1/chat/completions";
        
        const messageElement = incomingChatLi.querySelector("p");

        const requestOptions = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userMessage}]
                 })
        }
        fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
                messageElement.textContent = data.choices[0].message.content;
        }).catch((error) => {
                messageElement.textContent = "oops! Something went wrong. Please try again.|";
        })
}




const handleChat = () => {
        userMessage = chatInput.value.trim();
        if(!userMessage) return;
       
        // Append the user's message to the chatbox
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        
        setTimeout(() => {
        const incomingChatLi = createChatLi("thinking..","incoming"); 
        chatbox.appendChild(incomingChatLi);
        generateResponse(incomingChatLi);
        }, 600);
}


sendChatBtn.addEventListener("click", handleChat);