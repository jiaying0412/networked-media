window.onload = () => {
    const messages = [
        "Trust your instincts; they won't let you down. Lucky Numbers: 38-5-41-24-57-11", 
        "Today is the perfect day to embrace new opportunities and let your dreams take flight. Lucky Numbers: 33-13-86-99-52-45", 
        "An unexpected encounter will bring you joy and surprise in the coming days. Lucky Numbers: 55-23-63-87-58-40",
        "Success is not a destination, but a journey filled with unexpected surprises. Lucky Numbers: 84-87-36-50-60-43",
        "An unexpected opportunity will soon present itself — be ready to seize it. Lucky Numbers: 57-25-43-32-91-37",
        "Your everlasting patience will be rewarded sooner or later. Lucky Numbers: 50-58-31-2-44-56",
        "The harder you work, the luckier you get. Lucky Numbers: 47-5-2-15-31-17",
        "Enjoy the small things you find on your path. Lucky Numbers: 38-42-54-35-21-9",
        "Your cheerful outlook is one of your assets. Lucky Numbers: 55-11-7-33-17-1",
        "Your creativity will inspire those around you – let it shine! Lucky Numbers: 63-49-26-8-65-55",
        "Stay true to your dreams; they are worth pursuing. Lucky Numbers: 16-77-43-10-48-5",
        "Engage in group activities that further transformation. Lucky Numbers: 30-17-55-1-5-8",
        "Change your thoughts, and you'll change the world. Lucky Numbers: 30-48-50-11-4-39",
        "Our perception and attitude toward any situation will determine the outcome. Lucky Numbers: 38-28-27-37-6-10"
    ];

    const image = document.getElementById("cookie-img"); 
    const messageContainer = document.querySelector('.message-container'); 

    let messageGenerated = false;

    image.addEventListener("click", function () {
        if (messageGenerated) {
            return;
        }
        const randomIndex = Math.floor(Math.random() * messages.length);
        messageContainer.textContent = messages[randomIndex]; 
        messageContainer.style.display = "flex";
        messageGenerated = true;
    });
};
