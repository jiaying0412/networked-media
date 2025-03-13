window.onload = () => {
    console.log('script has loaded')
    
    console.log(gsap);
    // Initialize GSAP Timeline
    var tl = new TimelineMax({
      paused: true
    });
  
    // Letter animation (typewriter effect)
    tl.fromTo(".anim-typewriter", 2.5, { // animation will take 2.5 sec to complete
      width: "0",
    }, {
      width: "9.8em", // estimated text width 
      ease: SteppedEase.config(16) // number of steps in the animation -> count of the # of char in longest line 
    }, 0);
    
    // Text cursor animation
    tl.fromTo(".anim-typewriter", 0.7, { // cursor blinks every 0.7 sec
      "border-right-color": "rgba(253, 209, 49,0.75)"
    }, {
      "border-right-color": "rgba(253, 209, 49,0)",
      repeat: -1,
      ease: SteppedEase.config(17)
    }, 0);
  
    document.getElementById('cookie-img').addEventListener('mouseenter', function() {
      tl.play(); 
      document.querySelector('.tagline').style.visibility = 'visible'; 
    });
  };

async function addElements(e){
    let data = await fetch('/allpostsinjson')
    let formatData = await data.json()
    console.log(formatData)
}