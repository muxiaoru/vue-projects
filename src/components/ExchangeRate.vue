<template>
  <div class="exchange-container">
    <div class="imageText">
      <el-image :src="url"></el-image>
      <h1 class="text">Exchange Rate Calculator</h1>
      <p>Choose the currency and the amounts to get the exchange rate</p>
    </div>
    <div class="selectedRate">
      <div class="selectedOption">
        <el-select
          @change="calculate"
          :value="value1"
          v-model="value1"
          class="selectInput"
        >
          <option-rate></option-rate>
        </el-select>
        <el-input
          type="number"
          class="rateInput"
          v-model="input1"
          step="1"
          @input="calculate"
        ></el-input>
      </div>
      <div class="exchangeBtn">
        <el-button @click="exchange" type="primary">Swap</el-button>
        <div class="rate">{{ rateText }}</div>
      </div>
      <div class="selectedOption">
        <el-select
          @change="calculate"
          :value="value2"
          v-model="value2"
          class="selectInput"
        >
          <option-rate></option-rate>
        </el-select>
        <el-input
          type="number"
          class="rateInput"
          v-model="input2"
          step="1"
          @input="calculate"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script>
import OptionRate from "./OptionRate.vue";
import img from "@/assets/img/money.png";
export default {
  components: { OptionRate },
  name: "ExchangeRate",
  data() {
    return {
      url: img,
      value1: "USD",
      value2: "EUR",
      input1: "1",
      input2: "0.98",
      rate: 0.98,
    };
  },
  methods: {
    calculate() {
      fetch("https://open.exchangerate-api.com/v6/latest")
        .then((res) => res.json())
        .then((data) => {
          this.rate = data.rates[this.value2] / data.rates[this.value1];
          this.input2 = (this.input1 * this.rate).toFixed(2);
        });
    },
    exchange() {
      const temp = this.value1;
      this.value1 = this.value2;
      this.value2 = temp;
      this.calculate();
    },
  },
  computed: {
    rateText() {
      return `1 ${this.value1} = ${this.rate}  ${this.value2}`;
    },
  },
};
</script>
<style scoped>
::v-deep .el-input__inner {
  border: 0;
  text-align: right;
  background-color: transparent;
  color: #000;
  padding: 0;
}
::v-deep .el-input__suffix {
  display: none;
}
.imageText {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text,
.rate {
  color: #5fbaa7;
}
.selectedOption,
.exchangeBtn {
  display: flex;
  align-items: center;
  margin: 40px auto;
  justify-content: space-between;
}

.selectInput {
  padding: 10px 20px 10px 10px;
  font-size: 16px;
  border: 1px solid #dedede;
  width: 78px;
  height: 39px;
  display: flex;
  align-items: center;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%20000002%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-position: right 3px top 50%, 0, 0;
  background-size: 12px auto, 100%;
  background-repeat: no-repeat;
}
.rateInput {
  padding: 1px 2px;
  font-size: 30px;
}
</style>