<template>
  <div class="relaxer-container">
    <h1>Relaxer</h1>
    <div class="container" :class="{ grow: isGrow, shrink: isShrink }">
      <div class="circle">
        <p>{{ textInfo[textInfo.length - 1] }}</p>
      </div>
      <div class="pointer-container">
        <span class="pointer"></span>
      </div>
      <div class="outer-circle"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RelaxerApp",
  data() {
    return {
      textInfo: ["Breathe Out!", "Hold", "Breathe In!"],
      totalTime: 7500,
      isGrow: false,
      isShrink: false,
    };
  },
  methods: {
    reset() {
      this.textInfo = ["Breathe Out!", "Hold", "Breathe In!"];
      this.isGrow = false;
      this.isShrink = false;
    },
    breathAnimation() {
      this.reset();
      const breatheTime = (this.totalTime / 5) * 2;
      const holdTime = this.totalTime / 5;
      this.isGrow = true;
      setTimeout(() => {
        this.textInfo.pop();
        setTimeout(() => {
          this.textInfo.pop();
          this.isShrink = true;
        }, holdTime);
      }, breatheTime);
      return this.breathAnimation;
    },
    timeInterval() {
      // this.breathAnimation();
      setInterval(this.breathAnimation(), this.totalTime);
    },
  },
  created() {
    this.timeInterval();
  },
};
</script>
<style scoped>
.relaxer-container {
  min-height: 100vh;
  width: 100%;
  background: url("@/assets/img/bg.jpeg") no-repeat center center/cover
    rgb(34, 73, 65);
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  color: #fff;
}
.container {
  width: 300px;
  height: 300px;
  position: relative;
  margin: auto;
  transform: scale(1);
}
.circle {
  width: 100%;
  height: 100%;
  background-color: rgb(1, 15, 28);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
}
.circle p {
  color: #fff;
}
.pointer-container {
  position: absolute;
  top: -40px;
  left: 140px;
  width: 20px;
  height: 190px;
  animation: rotate 7.5s linear forwards infinite;
  transform-origin: bottom center;
}
.pointer {
  background: #fff;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: block;
}
.outer-circle {
  height: 320px;
  width: 320px;
  border-radius: 50%;
  background: conic-gradient(
    #55b7a4 0%,
    #4ca493 40%,
    #fff 40%,
    #fff 60%,
    #336d62 60%,
    #2a5b52 100%
  );
  position: absolute;
  top: -10px;
  left: -10px;
  z-index: 1;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.grow {
  animation: grow 3s linear forwards;
}
@keyframes grow {
  from {
    transform: scale(1);
  }

  to {
    transform: scale(1.2);
  }
}

.shrink {
  animation: shrink 3s linear forwards;
}
@keyframes shrink {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}
</style>