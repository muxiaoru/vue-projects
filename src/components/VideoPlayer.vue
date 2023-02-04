<template>
  <div class="videoContainer">
    <div class="video-container">
      <h1>Custom Video Player</h1>
      <div class="video">
        <video
          src="@/assets/videos/gone.mp4"
          poster="@/assets/img/poster.png"
          ref="video"
          @click="toggleVideoStatus"
          @timeupdate="updateProgress"
          @loadedmetadata="videoReady"
        ></video>
        <div class="controls">
          <div class="play">
            <el-button
              @click="toggleVideoStatus"
              class="btn"
              type="text"
              icon="el-icon-video-play"
              v-if="videoPause"
            ></el-button>
            <el-button
              @click="toggleVideoStatus"
              v-else
              class="btn"
              type="text"
              icon="el-icon-video-pause"
            ></el-button>
          </div>
          <div class="reset">
            <el-button
              class="btn"
              type="text"
              icon="el-icon-refresh-left"
              @click="stopVideo"
            ></el-button>
          </div>
          <div class="progress">
            <el-slider
              @change="setVideoProgress"
              :min="0"
              :max="100"
              :step="0.1"
              :show-tooltip="false"
              v-model="currentTime"
            ></el-slider>
            <span>{{ sliderTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "VideoPlayer",
  data() {
    return {
      videoPause: true,
      duration: 0,
      currentTime: 0,
      sliderTime: "00:00",
    };
  },
  methods: {
    toggleVideoStatus() {
      if (this.$refs.video.paused) {
        this.$refs.video.play();
        this.videoPause = false;
      } else {
        this.$refs.video.pause();
        this.videoPause = true;
      }
    },
    stopVideo() {
      this.$refs.video.currentTime = 0;
      this.$refs.video.pause();
      this.videoPause = true;
    },
    updateProgress(progress) {
      this.currentTime = (progress.target.currentTime / this.duration) * 100;
      let mins = Math.floor(progress.target.currentTime / 60);
      if (mins < 10) {
        mins = "0" + String(mins);
      }
      let secs = Math.floor(progress.target.currentTime % 60);
      if (secs < 10) {
        secs = "0" + String(secs);
      }
      this.sliderTime = `${mins}:${secs}`;
    },
    setVideoProgress(val) {
      this.$refs.video.currentTime = (val * this.$refs.video.duration) / 100;
    },
    videoReady() {
      this.duration = this.$refs.video.duration;
    },
  },
  // mounted() {
  //   const that = this;
  //   const i = setInterval(function () {
  //     if (that.$refs.video.readyState > 0) {
  //       that.duration = that.$refs.video.duration;
  //       clearInterval(i);
  //     }
  //   }, 200);
  // },
};
</script>
<style scoped>
.videoContainer {
  background-color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #fff;
}
.video-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.video {
  width: 60%;
}
video,
.controls {
  width: 100%;
}
video {
  cursor: pointer;
  background-color: #000 !important;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.controls {
  background: #333;
  color: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
  padding: 10px;
  margin-top: -5px;
}
.btn {
  border: 0;
  padding: 1px 6px;
  background: transparent;
  font-size: 25px;
}
.play {
  flex: 1;
}
.reset {
  flex: 1;
  margin-right: 15px;
}
.progress {
  flex: 20;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-slider {
  width: 100%;
  margin-right: 12px;
}
</style>