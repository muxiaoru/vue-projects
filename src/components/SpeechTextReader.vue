<template>
  <div class="speech-container">
    <h1>Speech Text Reader</h1>
    <el-button class="btn toggle-btn" @click="diaVisible">
      Toggle Text Box
    </el-button>
    <div class="popBox" :class="{ show: isShow }">
      <div class="close" @click="closeBtn">X</div>
      <h3>Choose Voice</h3>
      <el-select v-model="vioceValue" class="language-selection">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        type="textarea"
        :rows="7"
        placeholder="Enter text to read..."
        v-model="textarea"
      >
      </el-input>
      <el-button @click="readAloud" class="btn readText">Read Text</el-button>
    </div>
    <div class="text-container">
      <div
        class="text-box"
        v-for="(imgList, index) in imgLists"
        :key="index"
        @click="pictureSpeech(imgList.text)"
      >
        <el-image
          style="width: 100%; height: 200px"
          :src="imgList.url"
          fit="cover"
          class="imgBox"
        ></el-image>
        <p class="text-info">{{ imgList.text }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SpeechTextReader",
  data() {
    return {
      imgLists: [
        { url: "./images/drink.jpeg", text: "I'm Thirsty" },
        { url: "./images/food.jpeg", text: "I'm Hungry" },
        { url: "./images/tired.jpeg", text: "I'm Tired" },
        { url: "./images/hurt.jpeg", text: "I'm Hurt" },
        { url: "./images/happy.jpeg", text: "I'm Happy" },
        { url: "./images/angry.jpeg", text: "I'm Angry" },
        { url: "./images/sad.jpeg", text: "I'm Sad" },
        { url: "./images/scared.jpeg", text: "I'm Scared" },
        { url: "./images/outside.jpeg", text: "I Want To Go Outside" },
        { url: "./images/home.jpeg", text: "I Want To Go Home" },
        { url: "./images/school.jpeg", text: "I Want To Go To School" },
        { url: "./images/grandma.jpeg", text: "I Want To Go To Grandmas" },
      ],
      dialogVisible: false,
      options: [],
      vioceValue: "",
      textarea: "",
      isShow: false,
    };
  },
  methods: {
    diaVisible() {
      this.isShow = !this.isShow;
      const voices = speechSynthesis.getVoices();
      this.vioceValue = voices[0].name;
      for (var i = 0; i < voices.length; i++) {
        const languageCollection = {
          label: voices[i].name + " " + voices[i].lang,
          value: voices[i].name,
        };
        this.options.push(languageCollection);
      }
    },
    closeBtn() {
      this.isShow = true;
    },
    readAloud() {
      const synth = window.speechSynthesis;
      var voices = synth.getVoices();
      const utterThis = new SpeechSynthesisUtterance(this.textarea);
      utterThis.voice = voices.find((voice) => voice.name === this.vioceValue);
      synth.speak(utterThis);
    },
    pictureSpeech(text) {
      const synth = window.speechSynthesis;
      var voices = synth.getVoices();
      const utterThis = new SpeechSynthesisUtterance(text);
      utterThis.voice = voices.find((voice) => voice.name === this.vioceValue);
      synth.speak(utterThis);
    },
  },
  created() {
    this.diaVisible();
  },
};
</script>
<style scoped>
.speech-container {
  width: 100%;
  min-height: 100vh;
  background-color: #ffefea;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  color: #fff;
  background-color: darksalmon;
  font-size: 16px;
  padding: 8px;
  border: 0;
  border-radius: 4px;
}
.toggle-btn {
  margin-bottom: 20px;
}
.text-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.text-box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 2px 10px rgb(0 0 0 / 20%);
  border-radius: 5px;
  transition: box-shadow 0.2s ease-out;
  cursor: pointer;
}
.imgBox {
  overflow: unset;
}
.text-info {
  text-align: center;
  width: 100%;
  background-color: darksalmon;
  color: #fff;
  font-size: 18px;
  height: 100%;
  margin: 0;
  padding: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.popBox {
  position: absolute;
  top: 30%;
  left: 50%;
  bottom: auto;
  right: auto;
  transform: translate(-50%, 0);
  width: 70%;
  transition: transform 1s ease-in-out;
  z-index: 2000;
  background-color: #333;
  color: #fff;
  padding: 20px;
}
.popBox.show {
  transform: translate(-50%, -200%);
}
.el-textarea {
  margin: 15px 0;
}
.readText {
  width: 100%;
}
::v-deep .el-textarea .el-textarea__inner {
  padding: 8px;
}
.language-selection {
  width: 100%;
}
::v-deep .language-selection .el-input__inner {
  background-color: darksalmon;
  color: #fff;
}
::v-deep .language-selection .el-select__caret {
  color: #fff;
}
.close {
  float: right;
  text-align: right;
  cursor: pointer;
}
@media (max-width: 1100px) {
  .text-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 760px) {
  .text-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .text-container {
    grid-template-columns: 1fr;
  }
}
</style>