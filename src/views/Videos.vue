<template>
  <div class="home">
    <HeaderAuth />
    <h2 class="title">共有動画一覧</h2>
    <VideoSearch
      @change-genre="genre = $event"
      @input-keyword="keyword = $event"
    />
    <VideoCard :genre="genre" :keyword="keyword" />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAuth from "../components/HeaderAuth";
import VideoCard from "@/components/VideoCard.vue";
import VideoSearch from "@/components/VideoSearch.vue";
export default {
  components: {
    HeaderAuth,
    VideoCard,
    VideoSearch,
  },
  data() {
    return {
      genre: "",
      keyword: "",
      api_url: null,
    };
  },
  // methods: {
  //   setGenre(genre_name) {
  //     this.genre = genre_name;
  //   },
  //   async getGenres() {
  //     const genres = await axios.get(this.api_url + "genres");
  //     this.genres = genres.data.data;
  //     console.log(this.genres);
  //   },
  // },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
  },
};
</script>
