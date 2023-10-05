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
    
    preloadImages();

    html = document.documentElement;
  
    canvas = document.getElementById("hero-lightpass");
    canvas.style.position = 'fixed';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)'; // Center the canvas
    isDisplaying = true;
  
    context = canvas.getContext("2d");
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
    console.log('preloadImages');
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
    <div class="container left">
      <h1>FOODSTOCK</h1>
      <h2>Scroll down</h2>
      <h2>Scroll down</h2>
      <h2>Scroll down</h2>
    </div>
  </section>
  
  <section class="canvas">
    <canvas id="hero-lightpass" />
    <div class="container second">
      <h1>FOODSTOCK</h1>
      <h2>Scroll down</h2>
      <h2>Scroll down</h2>
      <h2>Scroll down</h2>
  </div>
  </section>

  <section class="try">
    <div class="grid">
      <div class="lt">You want to try it ?</div>
      <div class="lm"></div>
      <div class="lb">Greetings from the foodstock team</div>
      <div class="mb"></div>
      <div class="mm">
        <button on:click={()=>window.location.href="/"}>here</button>
      </div>
      <div class="mt"></div>
      <div class="rt">a lot of people would thank you for using foodstock .. </div>
      <div class="rm"></div>
      <div class="rb">you should not be hesitating that much ..</div>
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

button {
  background-color: transparent;
  border: 2px solid white;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: white;
  color: black;
}

.left {
  position: absolute;
  right: 10%;
}

.second {
  position: absolute;
  left: 10%;
}

.grid {  
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  width: 100vw;
  height: 100vh;
}

.lt { grid-area: 1 / 1 / 2 / 2;
font-size: 5vw; }

.lm { grid-area: 2 / 1 / 3 / 2; }

.lb { grid-area: 3 / 1 / 4 / 2; 
transform: translateY(-100px);}

.mb { grid-area: 3 / 2 / 4 / 3; }

.mm { grid-area: 2 / 2 / 3 / 3; }

.mt { grid-area: 1 / 2 / 2 / 3; }

.rt { grid-area: 1 / 3 / 2 / 4; 
font-size: 3vw; 
transform: translateX(-60px);}

.rm { grid-area: 2 / 3 / 3 / 4; }

.rb { grid-area: 3 / 3 / 4 / 4; }


</style>