<template>
  <div>
    <HeaderAuth />
    <button @click="$router.push('/')">&lt;</button>

    <div class="like">
      <h2 class="title">お気に入り動画一覧</h2>
      <VideoCard area="" genre="" keyword="" />
    </div>
  </div>
</template>

<script>
import HeaderAuth from "../components/HeaderAuth";

export default {
  data() {},
  components: {
    HeaderAuth,
  },
  methods: {
    created() {
      // 環境設定ファイルからURL取得
      this.api_url = process.env.VUE_APP_API_BASE_URL;
    },
  },
};
</script>

<style scoped>
.home {
  flex-wrap: wrap;
}
.reservation {
  background: #305dff;
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 50%;
}
.reservation_id {
  margin-top: 20px;
}
.title {
  margin: 10px;
  font-weight: bold;
  width: 350px;
  color: black;
}
.card {
  margin: 10px;
  width: 350px;
  background: #fff;
  border-radius: 5px;
  padding: 0 0 10px 0;
}
.card-content {
  padding: 20px;
}
.card-link {
  padding: 20px;
}
.card-link a {
  text-decoration: none;
  color: #0bd;
  margin: 0 10px;
  cursor: pointer;
}
.card-link a:hover {
  color: #0090aa;
}
.reservation {
  margin: 10px;
  width: 350px;
  border-radius: 5px;
  padding: 0 0 10px 0;
}
.reservation li {
  color: white;
  background: #305dff;
  text-align: left;
  padding: 10px;
  list-style: none;
}
.card-img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}

.form {
  text-align: center;
}
.form input {
  margin-top: 15px;
  width: 80%;
  padding: 5px;
  color: black;
  border: none;
  border-bottom: 1px solid #ccc;
}
.card button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  background-color: #305dff;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 0px;
  border: none;
  color: white;
}
.area {
  margin-left: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.genre {
  cursor: pointer;
}
.icon {
  padding: 10px 0 0px;
  margin: 0 10px 0 20px;
  width: 8%;
  height: 8%;
  cursor: pointer;
}
.right {
  margin: 0 0 0 auto;
}
</style>