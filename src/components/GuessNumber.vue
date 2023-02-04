<template>
  <div class="guess-number-container">
    <div v-if="isShow">
      <img src="@/assets/img/mic.png" alt="mic" />
      <h1>Guess a Number Between 1 - 100</h1>
      <h3>Speak the number into your microphone</h3>
      <div class="guess-info">
        <div>You said:</div>
        <span class="box">{{ msgNumber }}</span>
        <div>{{ checkNumberText }}</div>
      </div>
    </div>
    <div class="rightNumber" v-else>
      <h2>
        Congrats! You have guessed the number!<br /><br />It was
        {{ randomNumber }}
      </h2>
      <button @click="playAgainBtn">Play Again</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "GuessNumber",
  data() {
    return {
      msgNumber: "",
      randomNumber: "",
      isShow: true,
      recognition: "",
      checkNumberText: "",
    };
  },
  methods: {
    getRandomNumber() {
      this.randomNumber = Math.floor(Math.random() * 100) + 1;
      console.log(this.randomNumber);
    },
    writeMessage(msg) {
      this.msgNumber = msg;
    },
    checkNumber(msg) {
      const num = +msg;
      if (Number.isNaN(num)) {
        this.checkNumberText = "That is not a valid number";
        return;
      }

      if (num < 1 || num > 100) {
        this.checkNumberText = "Number must be between 1 and 100";
        return;
      }

      if (num === this.randomNumber) {
        this.checkNumberText = "";
        this.isShow = false;
      } else if (num > this.randomNumber) {
        this.checkNumberText = "GO LOWER";
      } else {
        this.checkNumberText = "GO HIGHER";
      }
    },
    onSpeak(e) {
      const msg = e.results[0][0].transcript;
      console.log(msg);
      this.writeMessage(msg);
      this.checkNumber(msg);
    },
    addEventListener() {
      this.recognition.addEventListener("result", this.onSpeak);
      this.recognition.addEventListener("end", () => {
        this.recognition.start();
      });
    },
    playAgainBtn() {
      window.location.reload();
    },
  },
  created() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new window.SpeechRecognition();
    this.recognition.start();
    this.getRandomNumber();
    this.addEventListener();
  },
};
</script>
<style scoped>
.guess-number-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/img/speekbg.jpeg") no-repeat left center/cover;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
h1,
h3 {
  margin-bottom: 0;
}
.guess-info {
  margin-top: 40px;
  font-size: 1.5em;
}
.box {
  border: 1px solid #dedede;
  padding: 10px;
  margin: 20px;
  display: inline-block;
  font-size: 30px;
}
.rightNumber {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rightNumber button {
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>