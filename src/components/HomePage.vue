<template>
  <div class="container">
    <router-link to="/form">表单</router-link>
    <router-link to="/array">数组</router-link>
    <router-link to="/exchange">汇率</router-link>
    <router-link to="/movie">电影院座位</router-link>
    <router-link to="/video">视频</router-link>
    <router-link to="/foo">侧边栏和弹框</router-link>
    <router-link to="/hangman">hangman game</router-link>
    <router-link to="/mealfinder">meal finder</router-link>
    <router-link to="/expensetracker">expense-tracker</router-link>
    <router-link to="/music-player">music-player</router-link>
    <router-link to="/infinite-scrolling">Infinite Scrolling</router-link>
    <router-link to="/typing-game">Type Game</router-link>
    <router-link to="/speech-text-reader">Speech TextReader</router-link>
    <router-link to="/memory-cards">Memory Cards</router-link>
    <router-link to="/cards-test">CardsTest</router-link>
    <router-link to="/lyrics-search-app">LyricsSearchApp</router-link>
    <router-link to="/relaxer-app">RelaxerApp</router-link>
    <router-link to="/breakout-game">BreakoutGame</router-link>
    <router-link to="/new-year-count-down">NewYearCountDown</router-link>
    <router-link to="/sortable-list">SortableList</router-link>
    <router-link to="/guess-number">GuessNumber</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
</style>
