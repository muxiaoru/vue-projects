<template>
  <el-row :gutter="6" type="flex" justify="center">
    <seat-col
      v-for="(seat, index) in seats"
      :key="index"
      :seat="seat"
      :index="`${rowIndex}-${index}`"
      @updateStatus="updateStatus"
    ></seat-col>
  </el-row>
</template>

<script>
import SeatCol from "./SeatCol.vue";

export default {
  name: "SeatGroup",
  props: { seats: Array, rowIndex: Number },
  components: {
    SeatCol,
  },
  emits: ['updatePosition'],
  data() {
    return {};
  },
  methods: {
    updateStatus: function (index, status) {
      this.$emit('updatePosition', index, status);
    },
  },
};
</script>

<style scoped>
.el-row {
  margin-top: 6px;
}
</style>