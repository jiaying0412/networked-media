document.addEventListener("DOMContentLoaded", () => {
    const eggDropSound = new Audio("assets/eggDrop.m4a"); 
    const alarmSound = new Audio("assets/chicken.m4a");

    // Play sound at 80% of 1.5s animation (1.2 seconds) -> when egg "bounces"
    setTimeout(() => {
        eggDropSound.play();
    }, 1200);

    let dialImage = document.querySelector('.dial-image');
    let timerDisplay = document.querySelector('.timer'); 
    let yolk = document.querySelector('.yolk');
    let isDragging = false;
    let startAngle = 0;
    let currentAngle = 0;
    let timerInterval = null;
    let timeLeft = 0;
    

    // Get the center of the dial image
    function getCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    // Calculate the angle between two points
    function getAngle(center, point) {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        return Math.atan2(dy, dx) * (180 / Math.PI); 
    }

    // start the countdown timer
    function startTimer(minutes) {
        if (timerInterval) {
            clearInterval(timerInterval); 
        }

        timeLeft = minutes * 60; 
        timerDisplay.textContent = formatTime(timeLeft);
        timerDisplay.style.display = 'block'; 

        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerDisplay.textContent = formatTime(timeLeft);
                updateBackgroundColor(minutes * 60, timeLeft); 
            } else {
                clearInterval(timerInterval); 
                alarmSound.play();
                timerDisplay.style.display = 'none'; 
                yolk.style.display = "flex"; 
            }
        }, 1000);
    }

    // Format the time in MM:SS format
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    // changing background color based on time (yellow -> orange)
    function updateBackgroundColor(totalTime, timeLeft) {
        const startColor = { r: 255, g: 245, b: 157 }; 
        const endColor = { r: 255, g: 165, b: 0 };     

        const percentage = timeLeft / totalTime;

        const r = Math.round(startColor.r + (endColor.r - startColor.r) * (1 - percentage));
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * (1 - percentage));
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * (1 - percentage));

        document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    dialImage.addEventListener('mousedown', (e) => {
        isDragging = true;
        const center = getCenter(dialImage);
        startAngle = getAngle(center, { x: e.clientX, y: e.clientY }) - currentAngle;
        dialImage.style.cursor = 'grabbing'; 
        timerDisplay.style.display = 'block'; 
        yolk.style.display = "none"; 
    });

    window.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const center = getCenter(dialImage);
            let newAngle = getAngle(center, { x: e.clientX, y: e.clientY }) - startAngle;

            if (newAngle < -65) newAngle = -65;  // Minimum angle for 7 minutes
            if (newAngle > 68) newAngle = 68;    // Maximum angle for 0 minutes

            currentAngle = newAngle;
            dialImage.style.transform = `rotate(${currentAngle}deg)`; 
        }
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
        dialImage.style.cursor = 'grab'; 

        const normalizedAngle = (currentAngle % 140 + 140) % 140 - 70;

        // console.log("Normalized Angle:", normalizedAngle); 

        let minutes;

        if (normalizedAngle >= -70 && normalizedAngle < -50) {
            minutes = 3;
        } else if (normalizedAngle >= -50 && normalizedAngle < -30) {
            minutes = 2;
        } else if (normalizedAngle >= -30 && normalizedAngle < -10) {
            minutes = 1;
        } else if (normalizedAngle >= -20 && normalizedAngle < 5) { 
            minutes = 0;
        } else if (normalizedAngle >= -5 && normalizedAngle <  20) { 
            minutes = 7;
        } else if (normalizedAngle >= 10 && normalizedAngle < 30) {
            minutes = 6;
        } else if (normalizedAngle >= 30 && normalizedAngle < 50) {
            minutes = 5;
        } else if (normalizedAngle >= 50 && normalizedAngle < 70) {
            minutes = 4;
        } 

        startTimer(minutes);
    });

    dialImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});