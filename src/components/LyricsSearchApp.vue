<template>
  <div class="lyrice-search">
    <el-container class="lyrice-container">
      <el-header height="auto" class="lyrice-header">
        <h1>LyricsSearch</h1>
        <el-form class="search-container">
          <el-form-item>
            <el-input
              v-model="searchValue"
              class="lyrice-search-input"
              placeholder="Enter artist or song name..."
            ></el-input>
            <el-button class="searchBtn" @click.prevent="searchSongBtn"
              >Search</el-button
            >
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="info-cantainer">
        <p v-if="noResults">Results will be displayed here</p>
        <div class="lyrice-info" v-else>
          <ul>
            <li v-for="(song, index) in songs" :key="index">
              <span
                ><strong>{{ song.artistName }}</strong> -
                {{ song.songTitle }}</span
              >
              <button>Get Lyrics</button>
            </li>
          </ul>
        </div>
      </el-main>
      <el-footer class="info-cantainer footer" v-show="switchInfo">
        <button class="nextBtn" v-show="prevBtn" @click="getMoreSongs(prevBtn)">
          Prev
        </button>
        <button class="nextBtn" v-show="nextBtn" @click="getMoreSongs(nextBtn)">
          Next
        </button>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "LyricsSearchApp",
  data() {
    return {
      searchValue: "",
      songs: [],
      noResults: true,
      nextBtn: false,
      prevBtn: false,
      switchInfo: false,
    };
  },
  methods: {
    async searchSongs(term) {
      await fetch(`https://api.lyrics.ovh/suggest/${term}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return (this.songs = []);
          }
          // for循环会叠加
          // for (let i = 0; i < data.data.length; i++) {
          //   const isSearchSong = {
          //     artistName: data.data[i].artist.name,
          //     songTitle: data.data[i].title,
          //   };
          //   this.songs.push(isSearchSong);
          // }

          // map不叠加
          this.songs = data.data.map((song) => {
            return { artistName: song.artist.name, songTitle: song.title };
          });
          if (data.prev || data.next) {
            this.switchInfo = true;
            this.prevBtn = data.prev;
            this.nextBtn = data.next;
          } else {
            this.switchInfo = false;
          }
        })
        .catch((e) => {
          console.log(e);
          this.songs = [];
        });
    },
    async searchSongBtn() {
      if (!this.searchValue) {
        alert("Please type in a search term");
      } else {
        await this.searchSongs(this.searchValue);
        this.noResults = !this.songs.length;
        this.switchInfo = this.songs.length ? true : false;
      }
    },
    async getMoreSongs(url) {
      await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            return (this.songs = []);
          }
          // map不叠加
          this.songs = data.data.map((song) => {
            return { artistName: song.artist.name, songTitle: song.title };
          });
          if (data.prev || data.next) {
            this.switchInfo = true;
            this.prevBtn = data.prev;
            this.nextBtn = data.next;
          } else {
            this.switchInfo = false;
          }
        });
    },
  },
};
</script>
<style scoped>
.lyrice-search {
  width: 100%;
  min-height: 100vh;
}
.lyrice-container {
  text-align: center;
}
.lyrice-header {
  background-image: url(https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0;
}
.lyrice-header h1 {
  margin: 0 0 30px;
}
::v-deep .el-input__inner {
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 16px;
  height: 50px;
}
.searchBtn {
  border-radius: 50px;
  position: absolute;
  right: 2px;
  top: 3px;
  background-color: #e056fd;
  color: #fff;
  font-size: 16px;
  padding: 13px 30px;
}
.search-container {
  width: 500px;
  max-width: 100%;
}
::v-deep .search-container .el-form-item__content {
  display: flex;
  flex-direction: row;
}
.info-cantainer {
  max-width: 100%;
  width: 500px;
  margin: 30px auto;
  padding: 0;
}
.lyrice-info ul {
  list-style-type: none;
  padding: 0;
}
.lyrice-info ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.info-cantainer button {
  color: #fff;
  background-color: #8d56fd;
  padding: 4px 10px;
  border-radius: 10px;
  border: 0;
  cursor: pointer;
}
.footer {
  margin-top: 0;
}
.nextBtn {
  transform: scale(1.3);
}
</style>