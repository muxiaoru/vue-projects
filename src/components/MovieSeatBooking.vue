<template>
<div class="movieSeat">
  <div class="movie-container">
    <el-form>
      <el-form-item label="Pick a movie:">
        <el-select v-model="region" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <ul class="showcase">
      <li v-for="(list, index) in lists" :key="index">
        <div class="seat" :class="list.color"></div>
        <small>{{ list.text }}</small>
      </li>
    </ul>
    <div class="seats-container">
      <div class="screen"></div>
      <seat-group
        v-for="(groupSeats, index) in seats"
        :key="index"
        :seats="groupSeats"
        :rowIndex="index"
        @updatePosition="updatePosition"
      ></seat-group>
    </div>
    <p class="text">
      You have selected
      <span id="count">{{ counter }}</span>
      seats for a price of $
      <span id="total">{{ price }}</span>
    </p>
  </div>
</div>
</template>

<script lang="js">
import SeatGroup from "./SeatGroup.vue";

  export default{
    name:"MovieSeatBooking",
    components:{
       SeatGroup
    },
    methods: {
      updatePosition(index, status){
        const [x,y] = index.split('-');
        this.seats[Number(x)][Number(y)].status = status;     
        localStorage.setItem('selectedPosition', JSON.stringify(this.seats));  
      }
    },
    computed:{
      counter() {
        let newArray = [];
        this.seats.forEach(groupSeats => {
          const selectedSeats = groupSeats.filter((seat) => seat.status === "selected")
          newArray.push(...selectedSeats)
        });
        return newArray.length
      },
      price(){
       return Number(this.region) * this.counter;
      }
    },
    watch:{
      region(newVal){
console.log(newVal)
localStorage.setItem('selectedRegion', newVal);
      },
    },
    data(){
      return {
        region:localStorage.getItem('selectedRegion') || '10',
        options:[
          {value: '10', label:'Avengers: Endgame ($10)'},
          {value: '12', label:'Joker ($12)'},
          {value: '8', label:'Toy Story 4 ($8)'},
          {value: '9', label:'The Lion King ($9)'},
        ],
        lists:[
          {text:"N/A", color: ""},
          {text:"Selected", color: "selected"},
          {text: "Occupied", color: "occupied"}
        ],
        seats:JSON.parse(localStorage.getItem('selectedPosition')) || [
        [
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
      ],
      [
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "occupied", isSeat: true},
        {status: "occupied", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
      ],
      [
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "occupied", isSeat: true},
        {status: "occupied", isSeat: true},
      ],
      [
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
      ],
      [
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "occupied", isSeat: true},
        {status: "occupied", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
      ],
      [
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        { isSeat:false},
        {status: "unselected", isSeat: true},
        {status: "unselected", isSeat: true},
        {status: "occupied", isSeat: true},
        {status: "occupied", isSeat: true},
        { isSeat:false},
        {status: "occupied", isSeat: true},
        {status: "unselected", isSeat: true},
      ],
      ]
      }
    }
  }
</script>

<style scoped>
::v-deep .el-form-item__label {
  color: #fff;
}
::v-deep .el-input__suffix {
  display: none;
}
::v-deep .el-col {
  display: flex;
}
</style>

<style scoped>
.movieSeat {
  background-color: #242333;
  color: #fff;
  margin-top: 20px;
  width: 100%;
  padding: 20px;
}
.movie-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-form {
  width: 400px;
}
.showcase {
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
}
.showcase li {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}
.seat {
  background-color: #444451;
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.seat.selected {
  background-color: #6feaf6;
}

.seat.occupied {
  background-color: #fff;
}
.seats-container {
  perspective: 1000px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.screen {
  background-color: #fff;
  height: 70px;
  width: 100%;
  margin: 15px 0;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}
p.text {
  margin: 5px 0;
}
</style>