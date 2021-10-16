<template>
  <div class="home">
    <HeaderAuth />
    <VideoCard />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderAuth from "../components/HeaderAuth";
import VideoCard from "@/components/VideoCard.vue";

export default {
  components: {
    HeaderAuth,
    VideoCard,
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
  },
};
</script>
