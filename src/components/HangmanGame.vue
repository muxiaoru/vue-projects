<template>
  <div class="hangman-game" @keydown="window">
    <h1>Hangman</h1>
    <p>Find the hidden word - Enter a letter</p>
    <div class="game-container">
      <div class="figure-letter">
        <div class="figure-container">
          <svg height="250" width="200" class="figure">
            <!-- Rod -->
            <line x1="60" y1="20" x2="140" y2="20" />
            <line x1="140" y1="20" x2="140" y2="50" />
            <line x1="60" y1="20" x2="60" y2="230" />
            <line x1="20" y1="230" x2="100" y2="230" />

            <!-- Head -->
            <circle cx="140" cy="70" r="20" class="figure-part" />
            <!-- Body -->
            <line x1="140" y1="90" x2="140" y2="150" class="figure-part" />
            <!-- Arms -->
            <line x1="140" y1="120" x2="120" y2="100" class="figure-part" />
            <line x1="140" y1="120" x2="160" y2="100" class="figure-part" />
            <!-- Legs -->
            <line x1="140" y1="150" x2="120" y2="180" class="figure-part" />
            <line x1="140" y1="150" x2="160" y2="180" class="figure-part" />
          </svg>
        </div>
        <div class="wrong-letter-container">
          <div class="wrongLetter">
            <p>Wrong</p>
            <span>{{ wrongLetters }}</span>
          </div>
        </div>
      </div>
      <div class="letter-container">
        <div class="word" v-for="(word, index) in words" :key="index">
          <template v-for="letter in word">{{ letter }}</template>
        </div>
      </div>
    </div>
    <div class="popup-container" v-show="popupContainer">
      <div class="popup">
        <h2 v-if="errorWord">Unfortunately you lost. 😕</h2>
        <h2 v-else>Congratulations! You won! 😃</h2>
        <el-button class="play-button" @click="playAgainBtn"
          >Play Again</el-button
        >
      </div>
    </div>
    <!-- <el-button @click="show2 = !show2">Click Me</el-button> -->
    <transition name="el-zoom-in-bottom">
      <div v-show="show2" class="notification-container">
        <p>You have already entered this letter</p>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "HangmanGame",
  data() {
    return {
      wrongLetters: "",
      words: ["application", "programming", "interface", "wizard"],
      correctLetters: [],
      letter: "",
      errorWord: false,
      popupContainer: false,
      show2: false,
    };
  },
};
</script>
<style scoped>
.v-data-left {
  padding: 0 100px !important;
}
.hangman-game {
  background-color: #34495e;
  color: #fff;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-container {
  padding: 20px 30px;
  width: 450px;
  height: 350px;
  display: flex;
  flex-direction: column;
}
.figure {
  fill: transparent;
  stroke: #fff;
  stroke-width: 4px;
  stroke-linecap: round;
}
.figure-letter {
  display: flex;
  justify-content: space-between;
}
.wrongLetter p {
  margin: 0 0 5px;
  text-align: right;
}
.wrongLetter span {
  font-size: 24px;
}
.word {
  border-bottom: 3px solid #2980b9;
  display: inline-block;
  margin: 0 3px;
  height: 50px;
  width: 20px;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}
.letter-container {
  display: flex;
  justify-content: center;
  text-align: center;
}
.popup-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup {
  background: #2980b9;
  border-radius: 5px;
  box-shadow: 0 15px 10px 3px rgb(0 0 0 / 10%);
  padding: 20px;
  text-align: center;
}
.play-button {
  background-color: #fff;
  color: #2980b9;
  border: 0;
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
}
.notification-container {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px 10px 0 0;
  padding: 15px 20px;
  /* transition: bottom 0.3s ease-in-out; */
}
.notification-container p {
  margin: 0;
}
</style>