window.onload = () => {
  console.log('script has loaded');

  const tagline = document.querySelector('.anim-typewriter');
  tagline.innerHTML = `
    <span class="line" id="line1"></span><br>
    <span class="line" id="line2"></span><br>
    <span class="line" id="line3"></span><br>
    <span class="cursor" id="cursor"></span> <!-- only ONE cursor now -->
  `;

  const lines = [
    { text: "SAVOR.", elementId: "line1" },
    { text: "REVIEW.", elementId: "line2" },
    { text: "RECEIVE WISDOM.", elementId: "line3" }
  ];

  const cursor = document.getElementById('cursor');
  let lineIndex = 0;
  let charIndex = 0;
  let speed = 100; // typing speed per character

  function moveCursorToCurrentLine() {
    const currentLine = document.getElementById(lines[lineIndex].elementId);
    currentLine.parentNode.insertBefore(cursor, currentLine.nextSibling);
  }

  function typeLine() {
    if (lineIndex < lines.length) {
      const currentLine = document.getElementById(lines[lineIndex].elementId);
      const currentText = lines[lineIndex].text;

      // Move cursor next to current line
      moveCursorToCurrentLine();
      cursor.style.visibility = "visible";

      if (charIndex < currentText.length) {
        currentLine.innerHTML += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeLine, speed);
      } else {
        // After typing a full line
        if (lineIndex < lines.length - 1) {
          cursor.style.visibility = "hidden"; // hide after full line is typed
          setTimeout(() => {
            charIndex = 0;
            lineIndex++;
            typeLine();
          }, 450); // pause between lines
        } else {
          // Last line -> keep cursor blinking
          console.log('Finished all lines!');
        }
      }
    }
  }

  document.getElementById('cookie-img').addEventListener('mouseenter', function() {
    tagline.style.visibility = 'visible';
    typeLine();
  });

}