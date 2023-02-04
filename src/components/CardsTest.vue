<template>
  <div class="cards-container">
    <el-card class="card-question" shadow="always">
      <el-carousel arrow="always" :autoplay="false" :loop="false" @change="changeCarousel">
        <el-carousel-item
          v-for="(card, index) in cards"
          :key="index"
          class="cardItem card"
        >
          <div class="card" :class="{ 'show-answer': isShowAnswer }" @click="switchAnswer">
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
</template>
<script>
export default {
  name: "CardsTest",
  data() {
    return {
      isShowAnswer: false,
      cards: [
        { question: 1, answer: 2 },
        { question: 4, answer: 5 },
        { question: 7, answer: 8 },
        { question: 0, answer: 12 },
      ],
    };
  },
  methods: {
    switchAnswer() {
      this.isShowAnswer = !this.isShowAnswer;
    },
    changeCarousel() {
      this.isShowAnswer = false;
    },
  },
};
</script>
<style scoped>
.cards-container {
  width: 500px;
  height: 300px;
  border-radius: 4px;
}
.card-question {
  height: 100%;
  border: 0;
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
</style>