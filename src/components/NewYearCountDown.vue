<template>
  <div class="newYearCount">
    <h1>New Year Countdown</h1>
    <div class="countDown" v-show="isShowTime">
      <div class="time">
        <h2>{{ days }}</h2>
        <small>days</small>
      </div>
      <div class="time">
        <h2>{{ hours }}</h2>
        <small>hours</small>
      </div>
      <div class="time">
        <h2>{{ minutes }}</h2>
        <small>minutes</small>
      </div>
      <div class="time">
        <h2>{{ seconds }}</h2>
        <small>seconds</small>
      </div>
    </div>
    <div class="year">{{ currentYear + 1 }}</div>

    <img
      v-show="isLoading"
      src="@/assets/img/spinner.gif"
      alt="Loading..."
      class="loading"
    />
  </div>
</template>
<script>
export default {
  name: "NewYearCountDown",
  data() {
    return {
      isLoading: true,
      isShowTime: false,
      currentYear: null,
      newYearTime: null,
      days: "",
      hours: "",
      minutes: "",
      seconds: "",
    };
  },
  methods: {
    updateCountDown() {
      const currentTime = new Date();
      const diff = this.newYearTime - currentTime;

      const d = Math.floor(diff / 1000 / 60 / 60 / 24);
      const h = Math.floor(diff / 1000 / 60 / 60) % 24;
      const m = Math.floor(diff / 1000 / 60) % 60;
      const s = Math.floor(diff / 1000) % 60;

      this.days = d;
      this.hours = h < 10 ? "0" + h : h;
      this.minutes = m < 10 ? "0" + m : m;
      this.seconds = s < 10 ? "0" + s : s;

      return this.updateCountDown;
    },
    updateTime() {
      setInterval(this.updateCountDown(), 1000);
    },
    moveLoading() {
      setTimeout(() => {
        this.isLoading = false;
        this.isShowTime = true;
      }, 1000);
    },
  },
  created(){
    this.updateTime();
    this.moveLoading();
  },
  mounted() {
    this.currentYear = new Date().getFullYear();
    this.newYearTime = new Date(`January 01 ${this.currentYear + 1} 00:00:00`);
  },
};
</script>
<style scoped>
.newYearCount {
  width: 100%;
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1467810563316-b5476525c0f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80")
    no-repeat center center/cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.newYearCount::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.newYearCount * {
  z-index: 1;
}
h1 {
  font-size: 60px;
  margin: -80px 0 40px;
}
.countDown {
  display: flex;
  flex-direction: row;
  transform: scale(2);
}
.time {
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h2 {
  margin: 0 0 5px;
}
.year {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 200px;
  opacity: 0.2;
}

@media(max-width:500px){
  h1{
    font-size: 45px;
  }
  .time{
    margin: 5px;
  }
  h2{
    font-size: 12px;
    margin: 0;
  }
  small{
    font-size: 10px;
  }
}
</style>