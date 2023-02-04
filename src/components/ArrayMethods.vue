<template>
  <div class="domArray">
    <div class="array-container">
      <h1>DOM Array Methods</h1>
      <div class="arry-methods">
        <div class="methods">
          <el-button @click="getRandomUser">Add User 👱‍♂️</el-button>
          <el-button @click="doubleMoney">Double Money 💰</el-button>
          <el-button @click="showMillionaires"
            >Show Only Millionaires 💵</el-button
          >
          <el-button @click="sortByRichest">Sort by Richest ↓</el-button>
          <el-button @click="calculateWealth"
            >Calculate entire Wealth 🧮</el-button
          >
        </div>
        <div class="array">
          <h2><strong>Person</strong> Wealth</h2>
          <div class="person" v-for="(newUser, index) in newUsers" :key="index">
            <strong>{{ newUser.name }}</strong
            >{{
              "$" + newUser.money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}
          </div>
          <div class="wealth" v-if="showWealth">
            <h3>Total Wealth:</h3>
            <strong>{{
              "$" + totalWealth.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
            }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ArrayMethods",
  data() {
    return {
      newUsers: [],
      totalWealth: 0,
      showWealth: false,
    };
  },
  methods: {
    getRandomUser() {
      fetch("https://randomuser.me/api")
        .then((res) => res.json())
        .then((data) => {
          const user = data.results[0];
          this.newUsers.push({
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000),
          });
        });
      this.showWealth = false;
    },
    doubleMoney() {
      this.newUsers = this.newUsers.map((newUser) => {
        return { ...newUser, money: newUser.money * 2 };
      });
      this.showWealth = false;
    },
    showMillionaires() {
      this.newUsers = this.newUsers.filter(
        (newUser) => newUser.money > 1000000
      );
      this.showWealth = false;
    },
    sortByRichest() {
      this.newUsers = this.newUsers.sort((a, b) => b.money - a.money);
      this.showWealth = false;
    },
    calculateWealth() {
      this.totalWealth = this.newUsers.reduce(
        (acc, newUser) => (acc += newUser.money),
        0
      );
      this.showWealth = true;
    },
  },
  created() {
    this.getRandomUser();
    this.getRandomUser();
    this.getRandomUser();
  },
};
</script>
<style scoped>
.domArray {
  background: #f4f4f4;
}
.array-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.arry-methods {
  display: flex;
  width: 800px;
}
.methods {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  width: 250px;
  border-right: 1px solid #111;
}
.methods button {
  margin: 0 0 20px 0;
  border: solid 1px #111;
  padding: 10px;
  color: #000;
}
.array {
  flex: 1;
  padding: 10px 20px;
}
h2 {
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #111;
}
.person {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
}
.wealth {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #111;
  padding: 10px;
  margin: 20px 0 0;
  font-weight: 300;
}
.wealth h3 {
  margin: 0;
}
</style>