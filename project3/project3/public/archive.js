window.onload = () => {
    const images = document.querySelectorAll(".food"); 

    images.forEach(image => {
        let startY; // Store initial Y position

        image.addEventListener("mousedown", function (event) {
            startY = event.clientY; // Record starting Y position

            const onMouseMove = (moveEvent) => {
                let deltaY = moveEvent.clientY - startY; // Calculate movement difference

                if (deltaY < -50) { // If dragged up by 50px or more
                    this.style.opacity = "0"; // instead of setting display to none to hide the img because this won't change the layout
                    document.removeEventListener("mousemove", onMouseMove); // Remove listener
                }
            };

            document.addEventListener("mousemove", onMouseMove);

            image.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", onMouseMove); // Stop tracking when released
            }, { once: true });
        });
    });
};
