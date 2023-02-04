<template>
  <div class="breakout-container">
    <h1>Breakout!</h1>
    <el-button class="rulesBtn rulesOpenBtn" @click="rulesOpenBtn"
      >Show Rules</el-button
    >
    <div class="rules-info" :class="{ rulesShow: isShow }">
      <h2>How To Play:</h2>
      <p>
        Use your right and left keys to move the paddle to bounce the ball up
        and break the blocks.
      </p>
      <p>If you miss the ball, your score and the blocks will reset.</p>
      <el-button class="rulesBtn" @click="rulesCloseBtn">Close</el-button>
    </div>
    <canvas
      id="canvas-container"
      :width="wallCanvas.width"
      :height="wallCanvas.height"
      ref="canvas"
    ></canvas>
  </div>
</template>
<script>
export default {
  name: "BreakoutGame",
  data() {
    const brickRowCount = 9;
    const brickColumnCount = 5;
    const brickInfo = {
      w: 70,
      h: 20,
      padding: 10,
      offsetX: 45,
      offsetY: 60,
      visible: true,
    };
    const bricks = [];
    for (let i = 0; i < brickRowCount; i++) {
      bricks[i] = [];
      for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = { x, y, ...brickInfo };
      }
    }
    return {
      ctx: null,
      isShow: false,
      totalScore: 0,
      brickRowCount,
      brickColumnCount,
      delay: 500,
      wallCanvas: { width: 800, height: 600 },
      ball: {
        x: 400,
        y: 300,
        size: 10,
        speed: 4,
        dx: 4,
        dy: -4,
        visible: true,
      },
      paddle: {
        x: 360,
        y: 580,
        w: 80,
        h: 10,
        speed: 8,
        dx: 0,
        visible: true,
      },
      brickInfo,
      bricks,
    };
  },
  methods: {
    rulesOpenBtn() {
      this.isShow = true;
    },
    rulesCloseBtn() {
      this.isShow = false;
    },
    drawBricks() {
      this.bricks.forEach((column) => {
        column.forEach((brick) => {
          this.ctx.beginPath();
          this.ctx.rect(brick.x, brick.y, brick.w, brick.h);
          this.ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
          this.ctx.fill();
          this.ctx.closePath();
        });
      });
    },
    drawBall() {
      this.ctx.beginPath();
      this.ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.ball.visible ? "#0095dd" : "transparent";
      this.ctx.fill();
      this.ctx.closePath();
    },
    drawPaddle() {
      this.ctx.beginPath();
      this.ctx.rect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
      this.ctx.fillStyle = this.ball.visible ? "#0095dd" : "transparent";
      this.ctx.fill();
      this.ctx.closePath();
    },
    drawScore() {
      this.ctx.font = "20px Arial";
      this.ctx.fillText(`Score: ${this.totalScore}`, 700, 30);
    },
    movePaddle() {
      this.paddle.x += this.paddle.dx;
      if (this.paddle.x + this.paddle.w > this.wallCanvas.width) {
        this.paddle.x = this.wallCanvas.width - this.paddle.w;
      }
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      }
    },
    moveBall() {
      this.ball.x += this.ball.dx;
      this.ball.y += this.ball.dy;

      // Wall collision (right/left)
      if (
        this.ball.x + this.ball.size > this.wallCanvas.width ||
        this.ball.x - this.ball.size < 0
      ) {
        this.ball.dx *= -1;
      }

      // Wall collision (top/bottom)
      if (
        this.ball.y + this.ball.size > this.wallCanvas.height ||
        this.ball.y - this.ball.size < 0
      ) {
        this.ball.dy *= -1;
      }

      // Paddle collision
      if (
        this.ball.x - this.ball.size > this.paddle.x &&
        this.ball.x + this.ball.size < this.paddle.x + this.paddle.w &&
        this.ball.y + this.ball.size > this.paddle.y
      ) {
        this.ball.dy = -this.ball.speed;
      }

      // Brick collision
      this.drawBricks();
      this.bricks.forEach((column) => {
        column.forEach((brick) => {
          if (brick.visible) {
            if (
              this.ball.x - this.ball.size > brick.x &&
              this.ball.x + this.ball.size < brick.x + brick.w &&
              this.ball.y + this.ball.size > brick.y &&
              this.ball.y - this.ball.size < brick.y + brick.h
            ) {
              this.ball.dy *= -1;
              brick.visible = false;

              this.increaseScore();
            }
          }
        });
      });

      // Hit bottom wall - Lose
      if (this.ball.y + this.ball.size > this.wallCanvas.height) {
        this.showAllBricks();
        this.totalScore = 0;
      }
    },
    increaseScore() {
      this.totalScore++;
      if (
        this.totalScore % (this.brickRowCount * this.brickColumnCount) ===
        0
      ) {
        this.ball.visible = false;
        this.paddle.visible = false;

        setTimeout(() => {
          this.showAllBricks();
          this.totalScore = 0;
          this.paddle.x = this.wallCanvas.width / 2 - 40;
          this.paddle.y = this.wallCanvas.height - 20;
          this.ball.x = this.wallCanvas.width / 2;
          this.ball.y = this.wallCanvas.height / 2;
          this.ball.visible = true;
          this.paddle.visible = true;
        }, this.delay);
      }
    },
    showAllBricks() {
      this.bricks.forEach((column) => {
        column.forEach((brick) => {
          brick.visible = true;
        });
      });
    },
    draw() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.wallCanvas.width, this.wallCanvas.height);
      this.drawBall();
      this.drawPaddle();
      this.drawScore();
      this.drawBricks();
    },
    update() {
      this.movePaddle();
      this.moveBall();

      this.draw();
      requestAnimationFrame(this.update);
    },
    keyDown(e) {
      if (e.key === "Right" || e.key === "ArrowRight") {
        this.paddle.dx = this.paddle.speed;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        this.paddle.dx = -this.paddle.speed;
      }
    },
    keyUp(e) {
      if (
        e.key === "Right" ||
        e.key === "ArrowRight" ||
        e.key === "Left" ||
        e.key === "ArrowLeft"
      ) {
        this.paddle.dx = 0;
      }
    },
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.update();
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
  },
};
</script>
<style scoped>
.breakout-container {
  width: 100%;
  min-height: 100vh;
  background-color: #0095dd;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  color: #fff;
}
.rulesBtn {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
  border: 0;
}
.rulesOpenBtn {
  position: absolute;
  top: 30px;
  left: 30px;
}
.rules-info {
  color: #fff;
  background-color: #333;
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  min-height: 100vh;
  padding: 20px;
  line-height: 1.5;
  transform: translateX(-400px);
  transition: transform 1s ease-in-out;
}
.rulesShow {
  transform: translateX(0);
}
#canvas-container {
  background-color: #f0f0f0;
  border-radius: 5px;
  display: block;
}
</style>