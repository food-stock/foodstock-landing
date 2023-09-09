<script lang="js">
  import { onMount } from "svelte";
  
  const frameCount = 123;
  let context;
  let html;
  let canvas;
  let img;
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  gsap.registerPlugin(ScrollTrigger);
  let maxScrollDown; // We'll calculate this value dynamically
  let isDisplaying = true;
  
  const currentFrame = index => (
    `http://localhost:5173/gsap/iphone${index.toString().padStart(4, '0')}.png`
  );
  
  const updateImage = index => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  };
  
  onMount(() => {
    html = document.documentElement;
  
    canvas = document.getElementById("hero-lightpass");
    canvas.style.position = 'fixed';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)'; // Center the canvas
    isDisplaying = true;
  
    context = canvas.getContext("2d");
    preloadImages();
    img = new Image();
    img.src = currentFrame(1);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    img.onload = function () {
      context.drawImage(img, 0, 0);
    }

    window.addEventListener('scroll', () => {
      setmaxScrollDown();
      const scrollTop = html.scrollTop;
      const maxScrollTop = maxScrollDown;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.abs(Math.ceil(scrollFraction * frameCount))
      );
      if (isDisplaying) {
        requestAnimationFrame(() => updateImage(frameIndex + 1))
      }
      console.log(maxScrollDown);
      if (maxScrollDown < scrollTop) {
        canvas.style.position = 'relative';
        canvas.style.top = '40%';
        isDisplaying = false;
      } else {
        canvas.style.position = 'fixed';
        canvas.style.left = '50%';
        canvas.style.top = '50%';
        canvas.style.transform = 'translate(-50%, -50%)'; // Center the canvas
        isDisplaying = true;
      }

    });

    setmaxScrollDown();
  })
  
  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  function setmaxScrollDown() {
  const threshold = 10; // You can adjust this threshold as needed
  const section = document.querySelector(".canvas"); // Get the section containing the canvas
  const sectionRect = section.getBoundingClientRect();
  const screenHeight = window.innerHeight;

  if (sectionRect.top <= threshold && sectionRect.bottom + 2*window.outerHeight >= screenHeight - threshold) {
    maxScrollDown = 0; // Canvas section is fully in view
  } else {
    maxScrollDown = sectionRect.bottom + 1.5*window.outerHeight - screenHeight + threshold;
  }
}



  </script>
  
  <section class="hero">
    <div class="container">
      <h1>Your food pantry</h1>
      <h2>at your phone's fingertips.</h2>
    </div>
  </section>
  
  <section class="about">
    <div class="container">
      <h1>FOODSTOCK</h1>
      <h2>Scroll down</h2>
      <h2>Scroll down</h2>
      <h2>Scroll down</h2>
    </div>
  </section>
  
  <section class="canvas">
    <canvas id="hero-lightpass" />
  </section>

  <section class="try">
    <div class="container">
      <button>try it</button>
    </div>
  </section>

<style>
 @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@800&display=swap');

* {
  margin: 0%;
  padding: 0%;
  box-sizing: border-box;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-family: 'Open Sans', sans-serif;
  color: white;
}

canvas {
  max-width: 100vw;
  max-height: 100vh;
  z-index: 1000;
}

section {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero {
  background-color: blue;
}
.canvas {
  background-color: green;
}

.about {
  background-color: aqua;
}

.try {
  background-color: red;
}

</style>