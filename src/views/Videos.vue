<template>
  <div class="home">
    <HeaderAuth />
    <select class="search" v-model="genre">
      {{
        genres
      }}
      <option value="">All genre</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.name">
        {{ genre.name }}
      </option>
    </select>
    <input class="search" placeholder="Search" v-model="keyword" />
    <VideoCard :genre="genre" :genres="genres" :keyword="keyword" />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAuth from "../components/HeaderAuth";
import VideoCard from "@/components/VideoCard.vue";
import axios from "axios";
export default {
  components: {
    HeaderAuth,
    VideoCard,
  },
  data() {
    return {
      genres: [],
      genre: this.$store.state.genre,
      keyword: "",
      api_url: null,
    };
  },
  methods: {
    setGenre(genre_name) {
      this.genre = genre_name;
    },
    async getGenres() {
      const genres = await axios.get(this.api_url + "genres");
      this.genres = genres.data.data;
      console.log(this.genres);
    },
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
    this.getGenres();
  },
};
</script>
