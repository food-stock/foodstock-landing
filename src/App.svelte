<script lang="ts">
  let videoURL = "/main.mp4";

  let time = 0;
  let duration;

  let scrollY = 0;

  $: {
    const totalScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    time = duration * (scrollY / totalScroll);
  }
</script>

<svelte:window bind:scrollY />

<div class="video-container">
  <video
    bind:currentTime={time}
    bind:duration
    preload="metadata"
    muted
    src="{videoURL}"
  />
</div>

<div id="scroll-container">

  <div class="str strange" style="top:100px;">
    <p>
      Have you ever thrown away a food beacause you forgot its premumption date ?
    </p>
  </div>

  <div class="str" style="top:500px;left:17vw;">
    <p>
      Well, we have <span style="font-weight: bold;">ALL</span> done that ...
    </p>
  </div>

  <div class="str" style="top:900px;">
    <p>
      But let's change this NOW
    </p>
  </div>

  <div class="str" style="top:1300px;transform : translate(50%,0);">
    <p>
      Ok, but HOW ? Let us show you
    </p>
  </div>

  <div class="str" style="top:1700px;">
    <p>Discover your new stock management APP to reduce food waste !</p>
  </div>


  <div class="heading" style="top:2200px;">
    <h1>FOODSTOCK</h1>
  </div>

  <div class="str" style="top:2500px;">
    <p>Foodstock is a web application built for mobile users which allows you to :</p>
  </div>

  <div class="str" style="top:2650px;">
    <ul>
    <li>Monitor your fridge and drawers at any time</li>
    <li>Receive notification when food is about to expire</li>
    <li>Build your shopping list while not being at home</li>
  </ul>
  </div>

  <div class="str" style="top:2900px;">
    <p>Start now using our free plan !</p>
    <a href="https://welcome.foodstock.com" class="button">Try</a>
  </div>
</div>


<style>
  .video-container {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
  }
  .video-container video {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #scroll-container {
    height: 3200px;
  }

  .heading {
    position: absolute;
    left: 10px;
    width: 100%;
    text-align: center;
    color: white;
  }

  .heading h1 {
    color: white;
    font-size: 4em;
  }
  .str {
    position: absolute;
    display: block;
    flex-wrap: wrap;
    left: 50%;
    transform: translate(-50%, 0);
    line-height: 1.5;
    opacity: 0.8;
  }

  .strange {
    background-color: grey;
    border-radius: 20px;
  }

  ul {
    list-style-type: none;
  }

  li {

  }

  .button {
    background-color: greenyellow;
    color : white;
    text-decoration: none;
    padding: 10px;
    border-radius: 20px;
  }
</style>
