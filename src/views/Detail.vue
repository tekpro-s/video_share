<template>
  <div>
    <HeaderAuth />
    <div class="flex">
      <div class="video">
        <BackButton />
        <br />
        <iframe
          width="320"
          height="180"
          :src="srcCreate(video_data.video_name)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreenß
        ></iframe>
        <h2 class="video-title">{{ video_data.video_title }}</h2>
        <p>{{ video_data.genre.name }}</p>
        <p class="summary">{{ video_data.summary }}</p>
      </div>
    </div>
    <div>
      <PostComment :video_data="video_data" />
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";
import BackButton from "../components/BackButton";
import PostComment from "../components/PostComment";
import axios from "axios";

export default {
  props: {
    video_id: String,
  },
  data() {
    return {
      video_data: null,
      video_snippets: null,
    };
  },
  methods: {
    async getVideo() {
      const video = await axios.get(this.api_url + "videos/" + this.video_id);
      this.video_data = video.data.data;
      this.video_snippets = video.data.snippets;
      console.log(this.video_data);
    },
    async getVideos() {
      const video = await axios.get(this.api_url + "videos/" + this.video_id);
      this.videos_data = video.data.data;

      console.log(this.video_data);
    },
    srcCreate(video_id) {
      return "https://www.youtube.com/embed/" + video_id;
    },
  },
  computed: {
    changeDateFormat() {
      return this.date.replaceAll("-", "/");
    },
  },
  components: {
    HeaderAuth,
    BackButton,
    PostComment,
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
    this.getVideo();
  },
};
</script>

<style scoped>
.reservation-button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  background-color: #0438ff;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  border: none;
}
.reservation-button:disabled {
  background-color: #a9a9a9;
}
.area {
  margin-right: 10px;
  cursor: pointer;
}
.genre {
  cursor: pointer;
}
.video {
  color: black;
  width: 50%;
  margin: 10px;
}
.video-title,
.reservation-title {
  font-size: 24px;
}
.card-img {
  margin-bottom: 20px;
  border-radius: 5px 5px 0 0;
  max-width: 50%;
  height: auto;
}
.summary {
  margin-top: 20px;
}
.data {
  background: #4c7eff;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.reservation {
  background: #305dff;
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 50%;
}
input {
  margin: 10px;
}
select {
  margin-top: 10px;
  margin-left: 10px;
}
.data li {
  margin: 5px;
  list-style: none;
}
</style>