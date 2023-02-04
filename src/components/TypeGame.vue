<template>
  <div class="type-game">
    <el-button
      icon="el-icon-s-tools"
      class="settings-btn"
      @click="settingsBtn"
    ></el-button>
    <div class="settings" :class="{ settingsHide: hasHide }">
      <el-form ref="form" :model="difficulty">
        <el-form-item label="Difficulty">
          <el-select v-model="difficulty.region">
            <el-option
              v-for="(list, index) in lists"
              :key="index"
              :value="list.value"
              :label="list.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="type-container">
      <!-- <div class="word-spelling" v-show="wordSpelling"> -->
      <h2>👩‍💻 Speed Typer 👨‍💻</h2>
      <div class="time-score">
        <p class="time-container">Time left: {{ times }}s</p>
        <p class="score-container">Score: {{ totalScore }}</p>
      </div>
      <div class="type-following">
        <small>Type the following:</small>
        <h1>{{ randomWord }}</h1>
      </div>
      <el-input
        class="word-input"
        v-model="inputWord"
        placeholder="Type the word here..."
        @input="checkRandomWord"
        autofocus
      ></el-input>
      <!-- </div> -->
      <div class="game-over" :class="{ gameOver: isOver }">
        <h1>Time ran out</h1>
        <p>Your final score is {{ totalScore }}</p>
        <el-button @click="reloadGame">Reload</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TypeGame",
  data() {
    return {
      difficulty: {
        region: "medium",
      },
      lists: [
        { label: "Easy", value: "easy" },
        { label: "Medium", value: "medium" },
        { label: "Hard", value: "hard" },
      ],
      hasHide: false,
      totalScore: 0,
      times: 10,
      words: [
        "sigh",
        "tense",
        "airplane",
        "ball",
        "pies",
        "juice",
        "warlike",
        "bad",
        "north",
        "dependent",
        "steer",
        "silver",
        "highfalutin",
        "superficial",
        "quince",
        "eight",
        "feeble",
        "admit",
        "drag",
        "loving",
      ],
      inputWord: "",
      isOver: false,
      randomWord: "",
    };
  },
  methods: {
    settingsBtn() {
      this.hasHide = !this.hasHide;
    },
    getRandomWord() {
      this.randomWord =
        this.words[Math.floor(Math.random() * this.words.length)];
    },
    timeInterval() {
      setInterval(this.updateTime, 1000);
    },
    updateTime() {
      this.times--;
      if (this.times === 0) {
        this.isOver = true;
      }
    },
    checkRandomWord(e) {
      if (e === this.randomWord) {
        this.totalScore++;
        this.inputWord = "";
        this.getRandomWord();
        if (this.difficulty.region === "hard") {
          this.times += 2;
        } else if (this.difficulty.region === "medium") {
          this.times += 3;
        } else {
          this.times += 5;
        }
        this.updateTime();
      }
    },
    reloadGame() {
      location.reload();
    },
  },
  created() {
    this.getRandomWord();
    this.timeInterval();
  },
};
</script>
<style scoped>
.type-game {
  background-color: #2c3e50;
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.settings-btn {
  position: absolute;
  bottom: 30px;
  left: 30px;
  padding: 5px 15px;
  border-width: 2px;
  color: #000;
}
.settings {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}
.settingsHide {
  transform: translateY(-100%);
}
.el-form-item {
  display: flex;
  flex-direction: row;
  margin-bottom: 0;
}
::v-deep .el-form-item__label {
  color: #fff;
  font-size: 16px;
}
::v-deep .el-input__suffix {
  display: none;
}
.type-container {
  position: relative;
  background-color: #34495e;
  text-align: center;
  padding: 20px;
  width: 500px;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 5px rgb(0 0 0 / 30%);
}
h2 {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 8px;
  border-radius: 4px;
  margin: 0;
}
h1 {
  margin: 0;
}
.type-following {
  margin-bottom: 10px;
}
.time-score {
  display: flex;
  justify-content: space-between;
}
.word-input {
  width: 300px;
  margin-top: 10px;
}
::v-deep .word-input input {
  padding: 12px 20px;
}
.game-over {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: inherit;
}
.gameOver {
  display: flex;
}
</style>