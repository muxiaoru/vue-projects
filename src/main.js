import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import App from './App.vue'
import './style/form.css'
import VueRouter from 'vue-router'
import MenuSlider from "./components/MenuSlider.vue"
import ArrayMethods from "./components/ArrayMethods.vue";
import ExchangeRate from "./components/ExchangeRate.vue";
import HelloWorld from "./components/HelloWorld.vue";
import MovieSeatBooking from "./components/MovieSeatBooking.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import HomePage from "./components/HomePage";
import HangmanGame from "./components/HangmanGame"
import MealFinder from "./components/MealFinder"
import ExpenseTracker from "./components/ExpenseTracker"
import MusicPlayer from "./components/MusicPlayer"
import InfiniteScrolling from "./components/InfiniteScrolling"
import TypeGame from "./components/TypeGame"
import SpeechTextReader from "./components/SpeechTextReader"
import MemoryCards from "./components/MemoryCards"
import CardsTest from "./components/CardsTest"
import LyricsSearchApp from "./components/LyricsSearchApp"
import RelaxerApp from "./components/RelaxerApp"
import BreakoutGame from "./components/BreakoutGame"
import NewYearCountDown from "./components/NewYearCountDown"
import SortableList from "./components/SortableList"
import GuessNumber from "./components/GuessNumber"


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component(CollapseTransition.name, CollapseTransition)

const routes = [
  { path: '/', component: HomePage },
  { path: '/form', component: HelloWorld },
  { path: '/array', component: ArrayMethods },
  { path: '/exchange', component: ExchangeRate },
  { path: '/movie', component: MovieSeatBooking },
  { path: '/video', component: VideoPlayer },
  { path: '/foo', component: MenuSlider },
  { path: '/hangman', component: HangmanGame },
  { path: '/mealfinder', component: MealFinder },
  { path: '/expensetracker', component: ExpenseTracker },
  { path: '/music-player', component: MusicPlayer },
  { path: '/infinite-scrolling', component: InfiniteScrolling },
  { path: '/typing-game', component: TypeGame },
  { path: '/speech-text-reader', component: SpeechTextReader },
  { path: '/memory-cards', component: MemoryCards },
  { path: '/cards-test', component: CardsTest },
  { path: '/lyrics-search-app', component: LyricsSearchApp },
  { path: '/relaxer-app', component: RelaxerApp },
  { path: '/breakout-game', component: BreakoutGame },
  { path: '/new-year-count-down', component: NewYearCountDown },
  { path: '/sortable-list', component: SortableList },
  { path: '/guess-number', component: GuessNumber },
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
