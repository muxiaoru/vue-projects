<template>
  <div class="sortableList">
    <h1>10 Richest People</h1>
    <p>Drag and drop the items into their corresponding spots</p>
    <div class="richest-list">
      <ul>
        <li
          v-for="(richPeople, index) in peopleListItems"
          :key="index"
          :data-index="index"
          :class="{ over: isOver }"
        >
          <span class="number">{{ index + 1 }}</span>
          <div class="draggable" :class="{ wrong: isWrong, right: isRight }">
            <!-- <p class="person-name">{{ richPeople.name }}</p> -->
            <p class="person-name">{{ richPeople }}</p>
            <i class="el-icon-s-operation"></i>
          </div>
        </li>
      </ul>
    </div>
    <el-button class="chechBtn" @click="checkOrder"
      >Check Order<i class="el-icon-s-promotion"></i
    ></el-button>
  </div>
</template>
<script>
export default {
  name: "SortableList",
  data() {
    return {
      richestPeople: [
        "Jeff Bezos",
        "Bill Gates",
        "Warren Buffett",
        "Bernard Arnault",
        "Carlos Slim Helu",
        "Amancio Ortega",
        "Larry Ellison",
        "Mark Zuckerberg",
        "Michael Bloomberg",
        "Larry Page",
      ],
      peopleListItems: [],
      isOver: false,
      dragStarIndex: "",
      isWrong: false,
      isRight: false,
    };
  },
  methods: {
    creatList() {
      this.peopleListItems = [...this.richestPeople]
        .map((a) => ({
          value: a,
          sort: Math.random(),
        }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
      // .map((a) => ({ name: a.value }));
    },
    dragStart() {
      this.dragStarIndex = this.closest("li").getAttribute("data-index");
    },
    dragEnter() {
      this.isOver = true;
    },
    dragLeave() {
      this.isOver = true;
    },
    dragOver(e) {
      e.preventDefault();
    },
    dragDrop() {
      const dragEndIndex = this.getAttribute("data-index");
      this.swapItem(this.dragStarIndex, dragEndIndex);
      this.isOver = false;
    },
    swapItem(fromIndex, toIndex) {
      const itemOne =
        this.peopleListItems[fromIndex].querySelector(".draggable");
      const itemTwo = this.peopleListItems[toIndex].querySelector(".draggable");
      this.peopleListItems[fromIndex].appendChild(itemTwo);
      this.peopleListItems[toIndex].appendChild(itemOne);
    },
    checkOrder() {
      this.peopleListItems.forEach((richPeople, index) => {
        if (richPeople !== this.richestPeople[index]) {
          this.isWrong = true;
        } else {
          this.isRight = true;
        }
      });
    },
    addEventListener() {
      const draggables = document.querySelectorAll(".draggale");
      const dragListItems = document.querySelectorAll(".richest-list ul li");
      draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", this.dragStart);
      });
      dragListItems.forEach((item) => {
        item.addEventListener("dragenter", this.dragEnter);
        item.addEventListener("dragleave", this.dragLeave);
        item.addEventListener("dragover", this.dragOver);
        item.addEventListener("drop", this.dragDrop);
      });
    },
  },
  created() {
    this.creatList();
    this.addEventListener();
  },
  // mounted() {
  //   this.addEventListener();
  // },
};
</script>
<style scoped>
:root {
  --border-color: #e3e5e4;
  --background-color: #c3c7ca;
  --text-color: #34444f;
}
.sortableList {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}
.richest-list ul {
  list-style-type: none;
  border: 1px solid #e3e5e4;
  padding: 0;
}
.richest-list ul li {
  display: flex;
  align-items: center;
  justify-content: center;
}
.richest-list ul li:not(:last-of-type) {
  border-bottom: 1px solid #e3e5e4;
}
.number {
  width: 60px;
  height: 60px;
  background-color: #c3c7ca;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.draggable {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  cursor: pointer;
}
.person-name {
  margin: 0 20px 0 0;
}
.chechBtn {
  font-size: 16px;
  background-color: #c3c7ca;
  color: #34444f;
  padding: 10px 20px;
  border: 0;
}
.chechBtn:active {
  transform: scale(0.98);
}
.over {
  background-color: #eaeaea;
}
.wrong .person-name {
  color: #ff3838;
}
.right .person-name {
  color: #3ae374;
}
</style>