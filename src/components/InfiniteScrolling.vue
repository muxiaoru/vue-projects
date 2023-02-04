<template>
  <div
    class="infinite-scrolling"
    v-infinite-scroll="load"
    infinite-scroll-immediate="false"
  >
    <div class="infinite-container">
      <h1>My Blog</h1>
      <el-input
        v-model="filterText"
        placeholder="Filter posts..."
        @input="filterPosts"
      ></el-input>
      <ul class="infinite-list infinite-list-wrapper">
        <el-badge
          :value="index + 1"
          v-for="(post, index) in posts"
          :key="index"
          class="item infinite-list-item"
        >
          <li>
            <h2>
              {{ post.title }}
            </h2>
            <p>
              {{ post.body }}
            </p>
          </li>
        </el-badge>
      </ul>
      <div v-show="loading" class="loader">
        <p class="circle"></p>
        <p class="circle"></p>
        <p class="circle"></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfiniteScrolling",
  data() {
    return {
      filterText: "",
      loading: false,
      searchTopic: "",
      searchBody: "",
      posts: [],
      page: 1,
      limit: 5,
      timeout: null,
    };
  },
  methods: {
    async getPosts() {
      await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.posts.push(...data);
        });
    },
    load() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.loading = true;
      this.timeout = setTimeout(async () => {
        this.page++;
        await this.getPosts();
        this.loading = false;
      }, 1000);
    },
    filterPosts(e) {
      const posts = document.querySelectorAll('.item');
      posts.forEach((post) => {
        const title = post.querySelector('h2').innerText.toUpperCase();
        const body = post.querySelector('p').innerText.toUpperCase();
        if (
          title.indexOf(e.toUpperCase()) > -1 ||
          body.indexOf(e.toUpperCase()) > -1
        ) {
          post.style.display = "flex";
        } else {
          post.style.display = "none";
        }
      });
    },
  },
  computed: {
    disabled() {
      return this.loading;
    },
  },
  created() {
    this.getPosts();
  },
};
</script>
<style scoped>
.infinite-scrolling {
  background-color: #296ca8;
  color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 100px;
}
.infinite-container {
  width: 80vw;
  max-width: 800px;
  text-align: center;
}
.infinite-list {
  list-style-type: none;
  padding-left: 16px;
  margin: 0;
}
.item {
  position: relative;
  background-color: #4992d3;
  box-shadow: 0 2px 4px rgb(0 0 0 / 30%);
  border-radius: 3px;
  padding: 20px;
  margin: 40px 0;
  display: flex;
  max-width: 800px;
  text-align: left;
}
::v-deep .el-badge__content.is-fixed {
  position: absolute;
  top: 0px;
  left: -55px;
  transform: translateY(-50%) translateX(100%);
  background-color: #fff;
  color: #296ca8;
  width: 40px;
  height: 40px;
  font-size: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px 10px;
  z-index: 10;
}
.loader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
}
.circle {
  animation: bounce 0.5s ease-in infinite;
  margin: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  margin: 5px;
}
.circle:nth-of-type(2) {
  animation-delay: 0.1s;
}
.circle:nth-of-type(3) {
  animation-delay: 0.2s;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>