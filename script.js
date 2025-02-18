// Wait until the DOM is fully loaded before running our scripts
document.addEventListener("DOMContentLoaded", function() {

  /* -----------------------------------------------------
     Typewriter Effect
     - This class creates a typing (and deleting) effect 
       for text in elements with a .typewrite class.
  ----------------------------------------------------- */
  class TypeWriter {
    constructor(element, toRotate, period) {
      this.toRotate = toRotate; // Array of strings to display
      this.element = element;   // The HTML element containing the text
      this.loopNum = 0;         // Tracks the current string index
      this.period = parseInt(period, 10) || 2000; // Pause duration between texts
      this.txt = "";            // Current text being displayed
      this.isDeleting = false;  // Flag to check if deleting is in progress
      // Find the inner element where the text will be displayed
      this.wrap = this.element.querySelector(".wrap");
      this.tick();              // Start the typewriter effect
    }

    // Function to update the text content at intervals
    tick() {
      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        // Remove one character at a time
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add one character at a time
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      // Update the inner HTML of the wrap element
      this.wrap.innerHTML = this.txt;

      // Set typing speed (randomized for a natural effect)
      let delta = 200 - Math.random() * 100;
      if (this.isDeleting) delta /= 2;

      // If the text is completely typed out, wait before deleting
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        // Once deletion is complete, move to the next string
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      // Schedule the next tick after the delay
      setTimeout(() => this.tick(), delta);
    }
  }

  // Function to initialize the typewriter effect on all elements with the class "typewrite"
  function initTypeWriter() {
    const elements = document.getElementsByClassName("typewrite");
    for (let i = 0; i < elements.length; i++) {
      let toRotate = elements[i].getAttribute("data-type");
      let period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TypeWriter(elements[i], JSON.parse(toRotate), period);
      }
    }
  }

  /* -----------------------------------------------------
     Fade-in Animation on Scroll
     - Uses IntersectionObserver to add a "visible" class
       to elements with the .fade-in class when they enter
       the viewport.
  ----------------------------------------------------- */
  const fadeInElements = document.querySelectorAll(".fade-in");
  if (fadeInElements.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.5 });
    fadeInElements.forEach(element => observer.observe(element));
  }

  // Initialize the typewriter effect on page load
  initTypeWriter();

});
