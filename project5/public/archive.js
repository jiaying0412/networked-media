// load yummy sound
const yummy = new Audio('/assets/yummy.m4a');
yummy.preload = "auto";

window.onload = () => {
    // if chopSticks active (clicked on)
    let isChopsticksActive = false;

    // elements
    gsap.set('.cursor', { xPercent: -50, yPercent: -50 });
    const cursor = document.querySelector('.cursor');
    const chopCursor = document.getElementById('chopCursor-img');
    const chops = document.querySelector('.chopsticks');
    const chopsticks = document.getElementById('chopsticks-img');
    const tooltip = document.querySelector('.tooltip');
    const images = document.querySelectorAll(".food");

    let mouseX, mouseY;

    // track regular cursor position
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursor, { x: mouseX, y: mouseY });

        // if chopsticks are active, follow the cursor
        if (isChopsticksActive) {
            gsap.to(chopCursor, {
                x: mouseX - 1500,
                y: mouseY - 400,
                duration: 0.01
            });

            // log positions
            // const rect = chopCursor.getBoundingClientRect();
            // console.clear();
            // console.log(`Mouse: (${mouseX}, ${mouseY})`);
            // console.log(`ChopCursor: (${Math.round(rect.left)}, ${Math.round(rect.top)})`);
        }
    });

    // when chopsticks are clicked, activate them
    chopsticks.addEventListener('click', () => {
        document.body.style.cursor = "none";
        chopsticks.style.opacity = "0";
        tooltip.style.opacity = "0";
        isChopsticksActive = true;

        gsap.to(chopCursor, {
            scale: 1,
            opacity: 1,
            x: mouseX,
            y: mouseY,
            rotate: 25,
            ease: "power2.out"
        });
    });


    // dish dragging + hover response
    images.forEach(image => {
        let startY;

        image.addEventListener("mouseenter", function () {
            chops.classList.add('animate__animated', 'animate__shakeX');
        })

        image.addEventListener("mousedown", function (event) {
            startY = event.clientY;

            const onMouseMove = (moveEvent) => {
                let deltaY = moveEvent.clientY - startY;

                if (deltaY < -50) {
                    this.style.opacity = "0";
                    document.removeEventListener("mousemove", onMouseMove);
                    
                    // play sound 
                    yummy.currentTime = 0; 
                    yummy.play();
                }
            };

            document.addEventListener("mousemove", onMouseMove);

            image.addEventListener("mouseup", function () {
                document.removeEventListener("mousemove", onMouseMove);
            }, { once: true });
        });
    });
};
