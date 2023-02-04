<template>
  <div class="expense-tracker">
    <h2>Expense Tracker</h2>
    <div class="expense-container">
      <h4>Your Balance</h4>
      <h1 class="balance">{{ "$" + total }}</h1>
      <div class="inc-exp-container">
        <div class="income">
          <h4>Income</h4>
          <p class="money plus">{{ "$" + plus.toFixed(2) }}</p>
        </div>
        <div class="expense">
          <h4>Expense</h4>
          <p class="money minus">{{ "$" + (minus * -1).toFixed(2) }}</p>
        </div>
      </div>
      <h3>History</h3>
      <ul class="list">
        <li
          class="listItem"
          v-for="(item, index) in items"
          :key="index"
          :class="{
            plusItem: item.amountCont >= 0,
            minusItem: item.amountCont < 0,
          }"
        >
          {{ item.textCont }}
          <span>{{ item.amountCont }}</span>
          <el-button @click="deleteBtn(item)" class="delete-btn">X</el-button>
        </li>
      </ul>
      <h3>Add new transaction</h3>
      <el-form>
        <el-form-item label="Text">
          <el-input v-model="textCont" placeholder="Enter text..."></el-input>
        </el-form-item>
        <el-form-item
          label="Amount
            (negative - expense, positive - income)"
        >
          <el-input
            v-model="amountCont"
            type="number"
            step="1"
            placeholder="Enter amount..."
          ></el-input>
        </el-form-item>
        <el-button class="addBtn" @click="addTransaction"
          >Add transaction</el-button
        >
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "ExpenseTracker",
  data() {
    return {
      textCont: "",
      amountCont: "",
      items: [],
      // isTextCont: "",
      // isAmountCont: "",
    };
  },
  methods: {
    addTransaction() {
      if (this.textCont.trim() === "" || this.amountCont.trim() === "") {
        alert("Please add a text and amount");
      } else {
        const transaction = {
          textCont: this.textCont,
          amountCont: +this.amountCont,
        };
        this.items.push(transaction);
        console.log(this.items);
        this.textCont = "";
        this.amountCont = "";
        localStorage.setItem("transaction", JSON.stringify(this.items));
      }
    },

    deleteBtn(item) {
      this.items = this.items.filter((t) => t !== item);
      localStorage.setItem("transaction", JSON.stringify(this.items));
    },
  },
  computed: {
    amounts() {
      return this.items.map((transaction) => transaction.amountCont);
    },
    plus() {
      return this.amounts
        .filter((item) => item > 0)
        .reduce((acc, item) => (acc += item), 0);
    },
    minus() {
      return this.amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0);
    },
    total() {
      return (this.plus + this.minus).toFixed(2);
    },
  },
  created(){
    const tmp = localStorage.getItem("transaction");
    if(tmp){
      this.items = JSON.parse(tmp);
    }
  }
};
</script>
<style scoped>
.expense-tracker {
  background-color: #f7f7f7;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}
.expense-container {
  width: 350px;
}
.inc-exp-container {
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  display: flex;
  justify-content: space-between;
}
.income {
  border-right: 1px solid #dedede;
}
.inc-exp-container div {
  flex: 1;
  text-align: center;
}
h4 {
  margin: 0;
  text-transform: uppercase;
}
h1 {
  margin: 0;
}
.money {
  font-size: 20px;
  letter-spacing: 1px;
  margin: 5px 0;
}
.plus {
  color: #2ecc71;
}
.minus {
  color: #c0392b;
}
h3 {
  margin: 40px 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #bbb;
}
.list {
  list-style-type: none;
  padding: 0;
}
.addBtn {
  width: 100%;
  background-color: #9c88ff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #fff;
  border: 0;
  font-size: 16px;
  margin: 10px 0 30px;
  padding: 10px;
}
.listItem {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: #333;
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 10px;
  margin: 10px 0;
}
.delete-btn {
  position: absolute;
  top: 50%;
  left: 0;
  border: 0;
  padding: 2px 5px;
  background-color: red;
  color: #fff;
  font-size: 20px;
  transform: translate(-100%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.listItem:hover .delete-btn {
  opacity: 1;
}
.plusItem {
  border-right: 5px solid #2ecc71;
}
.minusItem {
  border-right: 5px solid #c0392b;
}
</style>