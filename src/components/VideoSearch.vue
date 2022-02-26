<template>
  <div>
    <select class="search" v-model="genre" @change="changeGenre">
      {{
        genres
      }}
      <option value="">All genre</option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.name">
        {{ genre.name }}
      </option>
    </select>
    <input
      class="search"
      placeholder="Search"
      v-model="keyword"
      @input="inputKeyword"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      genres: [],
      genre: this.$store.state.genre,
      keyword: "",
    };
  },
  methods: {
    changeKeyword: function inputKeyword(e) {
      this.$emit("input-keyword", e.target.value);
    },
    changeGenre: function changeGenre(e) {
      this.$emit("change-genre", e.target.value);
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