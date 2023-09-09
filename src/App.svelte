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
const maxScrollDown = 3000;
let isDisplaying = true;


const currentFrame = index => (
  `http://localhost:5173/gsap/iphone${index.toString().padStart(4, '0')}.png`
)

const updateImage = index => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

onMount(()=>{
html = document.documentElement;
canvas = document.getElementById("hero-lightpass");
context = canvas.getContext("2d");
preloadImages()
img = new Image()
img.src = currentFrame(1);
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
img.onload=function(){
  context.drawImage(img, 0, 0);
}
gsap.to(canvas, {
    x: '-100%', // Slide to the left
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: `+=${maxScrollDown}`,
      scrub: true, // Makes the animation smooth during scrolling
    },
});

  window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = maxScrollDown - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  if (isDisplaying) {
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  }
  if (scrollTop > maxScrollTop) {
    canvas.style.display = 'none';
    isDisplaying = false;
  } else {
    canvas.style.display = 'block';
    isDisplaying = true;
  }

});
})

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};
</script>



<canvas id="hero-lightpass" />

<section id="hero">
  <div class="hero container">
    <h1>Your food pantry</h1>
    <h2>at your phone's fingertips.</h2>
  </div>
</section>

<section id="about">
  <div class="about container">
    <h1>Foodstock</h1>
    <h2>Scroll down</h2>
    <h2>Scroll down</h2>
    <h2>Scroll down</h2>
  </div>
</section>

<section id="try">
  <div class="try container">
    <button>try it</button>
  </div>
</section>

<style>
*{
    margin: 0%;
    padding: 0%;
    box-sizing: border-box;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color : white;
}

canvas {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 100vw;
  max-height: 100vh;
  z-index: 1000;
}

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translate(0, -100vh);
  letter-spacing: 20px;
  font-weight: bold;
}

.hero {
  margin-top: 60vh;
}

.about {
  margin-top: 60vh;
}

.try {
  margin-top: 60vh;
}

</style>