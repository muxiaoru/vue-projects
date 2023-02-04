<template>
  <div class="music-player">
    <h1>Music Player</h1>
    <div class="music-container">
      <div class="musicInfo" :class="{ musicOpacity: isShow }">
        <h4>{{ songs[songsIndex] }}</h4>
        <el-progress
          ref="progress"
          :percentage="percentage"
          :color="customColor"
          class="progress-container"
          :stroke-width="4"
          @click.native="setProgress"
        ></el-progress>
      </div>
      <audio
        @timeupdate="updateProgress"
        @loadedmetadata="videoReady"
        ref="audioPlay"
        :src="`./audios/${songs[songsIndex]}.mp3`"
      ></audio>
      <div class="img-container" :class="{ imageInner: isRuning }">
        <img
          :src="`./images/${songs[songsIndex]}.jpeg`"
          :alt="`${songs[songsIndex]}`"
        />
      </div>
      <div class="navigation">
        <el-button icon="el-icon-caret-left" @click="prevBtn"></el-button>
        <el-button
          class="MusicPlay"
          :icon="MusicPlay ? 'el-icon-video-play' : 'el-icon-video-pause'"
          @click="handleClick"
        ></el-button>
        <el-button icon="el-icon-caret-right" @click="nextBtn"></el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MusicPlayer",
  data() {
    return {
      title: "dddd",
      customColor: "#fe8daa",
      MusicPlay: true,
      isShow: false,
      isRuning: false,
      songsIndex: 2,
      songs: ["hey", "summer", "ukulele"],
      percentage: 0,
      duration: 0,
    };
  },
  computed: {
    // url() {
    //   return this.urls[this.songsIndex];
    // },
    // audioSrc() {
    //   return this.songs[this.songsIndex];
    // },
  },
  methods: {
    handleClick() {
      this.MusicPlay = !this.MusicPlay;
      this.isShow = !this.isShow;
      this.isRuning = !this.isRuning;
      if (
        this.isRuning === true &&
        this.MusicPlay === false &&
        this.isShow === true
      ) {
        this.$refs.audioPlay.play();
      } else {
        this.$refs.audioPlay.pause();
      }
    },
    prevBtn() {
      this.songsIndex--;
      if (this.songsIndex < 0) {
        this.songsIndex = this.songs.length - 1;
      }
      this.MusicPlay = false;
      this.isShow = true;
      this.isRuning = true;
      this.$nextTick(() => this.$refs.audioPlay.play());
    },
    nextBtn() {
      this.songsIndex++;
      if (this.songsIndex > this.songs.length - 1) {
        this.songsIndex = 0;
      }
      this.MusicPlay = false;
      this.isShow = true;
      this.isRuning = true;
      this.$nextTick(() => this.$refs.audioPlay.play());
    },
    videoReady() {
      this.duration = this.$refs.audioPlay.duration;
    },
    updateProgress(e) {
      this.percentage = (e.target.currentTime / this.duration) * 100;
      if (this.$refs.audioPlay.ended) {
        this.nextBtn();
      }
    },
    setProgress(e) {
      const clickX = e.offsetX;
      const width = this.$refs.progress.$el.clientWidth;
      this.$refs.audioPlay.currentTime = (clickX / width) * this.duration;
    },
  },
};
</script>
<style scoped>
.music-player {
  background-image: linear-gradient(
    0deg,
    rgba(247, 247, 247, 1) 23.8%,
    rgba(252, 221, 221, 1) 92%
  );
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.music-container {
  background-color: #fff;
  border: 0;
  border-radius: 15px;
  margin: 100px 0;
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 20px 20px 0 rgb(252 169 169 / 60%);
  display: flex;
  height: 100px;
}
.musicInfo {
  position: absolute;
  top: 0;
  left: 20px;
  padding: 10px 10px 10px 150px;
  background-color: rgba(255, 255, 255, 0.5);
  width: calc(100% - 40px);
  border-radius: 15px 15px 0 0;
  transition: transform 0.3s ease-in, opacity 0.3s ease-in;
  transform: translateY(0%);
  opacity: 0;
  z-index: 0;
}
.musicOpacity {
  transform: translateY(-100%);
  opacity: 1;
}
.musicInfo h4 {
  margin: 0;
}
.progress-container {
  margin: 10px 0;
  cursor: pointer;
}
::v-deep .el-progress__text {
  display: none;
}
::v-deep .el-progress-bar {
  padding-right: 0;
}
.img-container {
  transform: translateY(-50%);
  width: 110px;
  height: 110px;
}
.img-container::after {
  content: "";
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  transform: translate(-50%, 50%);
}
.img-container img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
}
.imageInner img {
  animation-play-state: running;
}
/* ::v-deep .el-image__inner {
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
}
.imageInner ::v-deep .el-image__inner {
  animation-play-state: running;
} */
.navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}
.el-button {
  background-color: #fff;
  border: 0;
  color: #dfdbdf;
  font-size: 20px;
  padding: 10px;
  margin: 0 20px;
}
.MusicPlay {
  font-size: 30px;
  color: #cdc2d0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>