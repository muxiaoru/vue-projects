<template>
  <div class="container">
    <h1>Vue Projects</h1>
    <p>List of projects that I am proud of</p>
    <div class="projects-container">
      <router-link to="/hangman" class="text-container"><iconify-icon icon="ph:game-controller" class="text-icon"></iconify-icon>Hangman Game</router-link>
      <router-link to="/typing-game" class="text-container"><iconify-icon icon="material-symbols:match-word-rounded" class="text-icon"></iconify-icon>Typing Game</router-link>
      <router-link to="/breakout-game" class="text-container"><iconify-icon icon="fluent:breakout-room-20-regular" class="text-icon"></iconify-icon>Breakout Game</router-link>
      <router-link to="/form" class="text-container"><iconify-icon icon="fluent:form-20-regular" class="text-icon"></iconify-icon>Form Validator</router-link>
      <router-link to="/array" class="text-container"><iconify-icon icon="material-symbols:data-array" class="text-icon"></iconify-icon>DOM Array Methods Project</router-link>
      <router-link to="/exchange" class="text-container"><iconify-icon icon="icon-park-twotone:water-rate" class="text-icon"></iconify-icon>Exchange Rate Calculator</router-link>
      <router-link to="/movie" class="text-container"><iconify-icon icon="mdi:movie-open-check-outline" class="text-icon"></iconify-icon>Movie Seat Booking</router-link>
      <router-link to="/video" class="text-container"><iconify-icon icon="material-symbols:video-camera-back-rounded" class="text-icon"></iconify-icon>Custom Video Player</router-link>
      <router-link to="/foo" class="text-container"><iconify-icon icon="vaadin:modal-list" class="text-icon"></iconify-icon>Menu Slider & Modal</router-link>
      <router-link to="/mealfinder" class="text-container"><iconify-icon icon="game-icons:hot-meal" class="text-icon"></iconify-icon>Mealfinder App</router-link>
      <router-link to="/expensetracker" class="text-container"><iconify-icon icon="arcticons:expense-register" class="text-icon"></iconify-icon>Expense Tracker</router-link>
      <router-link to="/music-player" class="text-container"><iconify-icon icon="material-symbols:music-note" class="text-icon"></iconify-icon>Music Player</router-link>
      <router-link to="/infinite-scrolling" class="text-container"><iconify-icon icon="mdi:scroll-outline" class="text-icon"></iconify-icon>Infinite Scrolling</router-link>
      <router-link to="/speech-text-reader" class="text-container"><iconify-icon icon="material-symbols:speech-to-text" class="text-icon"></iconify-icon>Speech Text Reader</router-link>
      <router-link to="/memory-cards" class="text-container"><iconify-icon icon="mdi:credit-cards" class="text-icon"></iconify-icon>Memory Cards</router-link>
      <router-link to="/lyrics-search-app" class="text-container"><iconify-icon icon="material-symbols:lyrics-outline" class="text-icon"></iconify-icon>LyricsSearch App</router-link>
      <router-link to="/relaxer-app" class="text-container"><iconify-icon icon="quill:breather" class="text-icon"></iconify-icon>Relaxer App</router-link>
      <router-link to="/new-year-count-down" class="text-container"><iconify-icon icon="pepicons-pop:countdown" class="text-icon"></iconify-icon>New Year Countdown</router-link>
      <router-link to="/sortable-list" class="text-container"><iconify-icon icon="mdi:sort" class="text-icon"></iconify-icon>Sortable List</router-link>
      <router-link to="/guess-number" class="text-container"><iconify-icon icon="mdi:number-0-box-multiple-outline" class="text-icon"></iconify-icon>Speak Number Guessing Game</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
.container{
  background: url("@/assets/img/briefbg.jpeg") center center/cover rgba(0, 0, 0, .5);
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
p{
  color: #a6a3a3;
}
.projects-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  font-size: 18px;
}
.text-container{
  border: 1px solid #ddd;
  text-align: left;
  width: 100%;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  color: #000000;
}
.text-icon{
  padding: 0 10px;
  font-size: 40px;
}
</style>
