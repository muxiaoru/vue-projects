<template>
  <div class="memory-cards">
    <el-button
      icon="el-icon-delete-solid"
      class="btn clearBtn"
      @click="clearBtn"
      >Clear Cards</el-button
    >
    <h1>
      Memory Cards
      <el-button icon="el-icon-plus" class="btn addBtn" @click="additionCard"
        >Add New Card</el-button
      >
    </h1>
    <div class="cards-container">
      <el-card class="card-question" shadow="always" v-show="isDisplay">
        <el-carousel
          ref="switchUpDown"
          arrow="never"
          :autoplay="false"
          :loop="false"
          indicator-position="none"
          @change="changeCarousel"
        >
          <el-carousel-item
            v-for="(card, index) in cards"
            :key="index"
            class="cardItem card"
          >
            <div
              class="card"
              :class="{ 'show-answer': isShowAnswer }"
              @click="switchAnswer"
            >
              <div class="inner-card">
                <div class="inner-card-front">
                  <p>{{ card.question }}</p>
                </div>
                <div class="inner-card-back">
                  <p>{{ card.answer }}</p>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </div>
    <div class="navigation">
      <el-button
        icon="el-icon-back"
        class="btn navBtn"
        @click="preBtn"
      ></el-button>
      <p class="currentCard">{{ currentCard }}</p>
      <el-button
        icon="el-icon-right"
        class="btn navBtn"
        @click="nextBtn"
      ></el-button>
    </div>
    <div class="add-container" v-show="addShow">
      <h1>
        Add New Card
        <el-button
          icon="el-icon-close"
          class="closeBtn"
          @click="closeBtn"
        ></el-button>
      </h1>
      <el-form>
        <el-form-item label="Question">
          <el-input
            class="textInput question"
            type="textarea"
            v-model="questionValue"
            placeholder="Enter question..."
          ></el-input>
        </el-form-item>
        <el-form-item label="Answer">
          <el-input
            class="textInput answer"
            type="textarea"
            v-model="answerValue"
            placeholder="Enter Answer..."
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button icon="el-icon-plus" class="btn addCard" @click="addCardBtn">
        Add Card
      </el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "MemoryCards",
  data() {
    return {
      questionValue: "",
      answerValue: "",
      addShow: false,
      cards: [],
      currentActiveCard: 1,
      currentCard: "",
      isShowAnswer: false,
      isDisplay: false,
    };
  },
  methods: {
    additionCard() {
      this.addShow = true;
    },
    closeBtn() {
      this.addShow = false;
    },
    addCardBtn() {
      if (this.questionValue.trim() && this.answerValue.trim()) {
        const card = { question: this.questionValue, answer: this.answerValue };
        this.cards.push(card);
      }
      this.addShow = false;
      this.isDisplay = true;
      this.currentCard = this.currentActiveCard + "/" + this.cards.length;
    },
    preBtn() {
      if (this.currentActiveCard === 1) {
        this.currentActiveCard = 1;
      } else {
        this.$refs.switchUpDown.prev();
      }
    },
    nextBtn() {
      if (this.currentActiveCard === this.cards.length) {
        this.currentActiveCard = this.cards.length;
      } else {
        this.$refs.switchUpDown.next();
      }
    },
    switchAnswer() {
      this.isShowAnswer = !this.isShowAnswer;
    },
    changeCarousel(val) {
      this.isShowAnswer = false;
      this.currentActiveCard = val + 1;
      this.currentCard = this.currentActiveCard + "/" + this.cards.length;
    },
    clearBtn() {
      this.isDisplay = false;
      this.currentCard = "";
    },
  },
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:300,500,700&display=swap");
::v-deep .el-card__body {
  padding: 0;
}
.memory-cards {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: "Lato", sans-serif;
}
.btn {
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px 15px;
  color: #000;
}

.btn:hover,
.btn:active,
.btn:focus {
  color: #000;
  border-color: #aaa;
  background-color: #fff;
}
.clearBtn {
  position: absolute;
  left: 30px;
  bottom: 30px;
}
.addBtn {
  padding: 5px 10px;
  font-size: 12px;
}
.cards-container {
  width: 500px;
  height: 300px;
  perspective: 1000px;
  position: relative;
  max-width: 100%;
  border-radius: 4px;
}
.card-question {
  height: 100%;
  border: 0;
  cursor: pointer;
}
::v-deep .el-card__body {
  padding: 0;
}
.cardItem {
  display: flex;
  align-items: center;
  justify-content: center;
}
.card {
  width: 100%;
  height: 100%;
}
.inner-card {
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
}

.card.show-answer .inner-card {
  transform: rotateX(180deg);
}

.inner-card-front,
.inner-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #fff;
}

.inner-card-front {
  transform: rotateX(0deg);
  z-index: 2;
}

.inner-card-back {
  transform: rotateX(180deg);
}

.inner-card-front::after,
.inner-card-back::after {
  content: "\f021  Flip";
  font-family: "Font Awesome 5 Free", Lato, sans-serif;
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
}
/* .cardBody {
  height: 100%;
  border: 0;
  box-shadow: 0 1px 10px rgb(0 0 0 / 30%);
}
.cardsCon {
  box-shadow: 0 1px 10px rgb(0 0 0 / 30%);
  border-radius: 4px;
  height: 100%;
  width: 100%;
  position: absolute;
  cursor: pointer;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateX(0) rotateY(0deg);
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
} */
/* .inner-card {
  position: absolute;
  opacity: 1;
  font-size: 1.5em;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.switchCards {
  transform: rotateX(180deg);
  transform-style: preserve-3d;
}
.strokeLeft {
  transform: translateX(-50%) rotateY(10deg);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.strokeRight {
  transform: translateX(50%) rotateY(-10deg);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
}
.inner-card-front,
.inner-card-back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #fff;
}
.inner-card-front {
  transform: rotateX(0deg);
  z-index: 2;
}
.inner-card-back {
  transform: rotateX(180deg);
}
.inner-card-front::after,
.inner-card-back::after {
  content: "\f021 Flip";
  font-family: "Font Awesome 5 Free", Lato, sans-serif;
  position: absolute;
  top: 10px;
  right: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #ddd;
} */
.navigation {
  display: flex;
  margin: 20px 0;
  align-items: center;
  justify-content: center;
}
.navBtn {
  border: none;
  font-size: 18px;
  font-weight: 900;
  font-family: "Font Awesome 5 Free";
  padding: 1px 6px;
  margin-top: 0;
}
.currentCard {
  margin: 0 20px;
}
.add-container {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  position: relative;
}
.closeBtn {
  border: none;
  padding: 5px 10px;
  font-size: 12px;
  position: absolute;
  right: 0;
  transform: translate(115%, -50%);
  background-color: #f0f0f0;
  margin-top: 20px;
  color: #000;
  font-weight: 900;
}
.clearBtn:hover,
.clearBtn:active,
.clearBtn:focus {
  color: #000;
  border-color: none;
  background-color: #f0f0f0;
}
.textInput {
  width: 500px;
  max-width: 100%;
}
::v-deep .textInput .el-textarea__inner {
  padding: 12px;
}
</style>