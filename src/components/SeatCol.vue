<template>
  <el-col :span="2.4">
    <div
      class="seat"
      :class="seat.isSeat ? seat.status : 'aisle'"
      @click="selectSeat"
    ></div>
  </el-col>
</template>

<script>
export default {
  name: "SeatCol",
  props: { seat: Object, index: String },
  emits: ["updateStatus"],
  methods: {
    selectSeat: function () {
      if (!this.seat.isSeat || this.seat.status === "occupied") {
        return;
      }
      if (this.seat.status === "unselected") {
        this.$emit("updateStatus", this.index ,"selected");
      }else{
        this.$emit("updateStatus", this.index ,"unselected");
      }
    },
  },
};
</script>

<style scoped>
.seat {
  background-color: #444451;
  height: 12px;
  width: 15px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.occupied {
  background-color: #fff;
}
.aisle {
  background-color: transparent;
  height: 12px;
  width: 12px;
}
.selected {
  background-color: #6feaf6;
}
</style>