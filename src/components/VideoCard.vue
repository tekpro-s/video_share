<template>
  <div>
    <!--
    {{ videos_data }}
    {{ videos_snippets }}
    -->
    <button v-if="this.$store.state.auth" class="add-button" @click="openModal">
      動画を追加する
    </button>
    <div id="overlay" v-if="show">
      <div id="content" class="modal">
        <div>
          <ul>
            <li>
              動画ID：<input
                placeholder="動画ID"
                name="video_name"
                v-model="video_name"
                cols="40"
              />
            </li>
            <li>
              ジャンル：
              <select class="search" v-model="genre_id">
                <option value="">All genre</option>
                <option
                  v-for="genre in genres"
                  :key="genre.id"
                  :value="genre.id"
                >
                  {{ genre.name }}
                </option>
              </select>
            </li>
            <li>
              動画概要：
              <textarea
                placeholder="動画概要"
                name="summary"
                v-model="summary"
                class="flex"
                rows="4"
                cols="40"
              >
              </textarea>
            </li>
          </ul>
        </div>
        <button class="owner-button" @click="send">動画を追加する</button>
        <button class="owner-button" @click="closeModal">閉じる</button>
      </div>
    </div>
    <div class="home flex">
      <div class="card" v-for="(video, index) in videos_data" :key="video.id">
        <iframe
          width="320"
          height="180"
          :src="srcCreate(video.video_name)"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div class="card-content">
          <h2 class="card-title">{{ videos_snippets[index].title }}</h2>
        </div>
        <div class="flex">
          <div class="card-link">
            <button @click="detail(video.id)">詳しくみる</button>
          </div>
          <img
            v-if="!getFav[index] && $store.state.auth"
            class="icon"
            src="../assets/like_false.png"
            @click="setFav(index)"
            alt
          />
          <img
            v-if="getFav[index] && $store.state.auth"
            class="icon"
            src="../assets/like_true.png"
            @click="setFav(index)"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      api_url: null,
      videos_data: null,
      videos_snippets: null,
      show: false,
      id: "",
      video_name: "",
      genre_id: 1,
      summary: "",
    };
  },
  methods: {
    async getVideos() {
      const videos = await axios.get(this.api_url + "videos");
      this.videos_data = videos.data.data;
      this.videos_snippets = videos.data.snippets;
      console.log(this.videos);
    },
    detail(id) {
      this.$router.push({ name: "Detail", params: { video_id: id } });
    },
    srcCreate(video_name) {
      return "https://www.youtube.com/embed/" + video_name;
    },
    async send() {
      try {
        const videos = await axios.post(this.api_url + "videos", {
          user_id: 2,
          video_name: "SyVxZ7fVOj4",
          genre_id: 1,
          summary: this.summary,
        });

        const video = await axios.get(
          this.api_url + "videos/" + videos.data.data.id
        );

        console.log(video.data.data);
        this.videos_data.push(video.data.data);
        this.videos_snippets.push(video.data.snippets);
        this.show = false;

        console.log(video);
      } catch (error) {
        alert(error);
      }
    },
    async setFav(index) {
      try {
        // ログイン中のユーザーIDが、ショップに紐づくいいねリストにあるか確認
        const result = this.videos_data[index].likes.some((value) => {
          return value.user_id == this.$store.state.user.id;
        });

        // いいねが存在するか確認
        if (result) {
          // いいねが存在する場合いいね削除
          const likes = await axios.delete(
            this.api_url + "videos/" + this.videos_data[index].id + "/likes",
            {
              params: { user_id: this.$store.state.user.id },
            }
          );

          console.log(likes);
        } else {
          // いいねが存在しない場合いいね追加
          const likes = await axios.put(
            this.api_url + "videos/" + this.videos_data[index].id + "/likes",
            {
              user_id: this.$store.state.user.id,
            }
          );

          console.log(likes);
        }

        const video = await axios.get(
          this.api_url + "videos/" + this.videos_data[index].id
        );
        this.videos_data.splice(index, 1, video.data.data);
        console.log(video);
      } catch (error) {
        alert(error);
      }
    },
    openModal() {
      this.id = "";
      this.show = true;
    },
    closeModal() {
      this.id = "";
      this.show = false;
    },
  },
  computed: {
    getFav() {
      const likes = [];

      for (const i in this.videos_data) {
        // ログイン中のユーザーIDが、ショップに紐づくいいねリストにあるか確認
        const result = this.videos_data[i].likes.some((value) => {
          return value.user_id == this.$store.state.user.id;
        });
        likes.push(result);
      }

      return likes;
    },
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
    this.getVideos();
  },
};
</script>

<style scoped>
.home {
  justify-content: space-around;
  flex-wrap: wrap;
}
.card {
  width: 35%;
  margin: 5px 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px #ccc;
}
.card-img {
  border-radius: 5px 5px 0 0;
  max-width: 100%;
  height: auto;
}
.card-content {
  padding: 20px;
}
.card-title {
  font-size: 20px;
  color: #333;
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
.card button {
  width: 100px;
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
  padding: 20px 0 10px;
  width: 10%;
  height: 10%;
  cursor: pointer;
}
.search {
  margin-left: 20px;
}

.add-button {
  width: 100px;
  text-align: center;
  padding: 8px 0 10px;
  background-color: #0438ff;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
  color: white;
  border: none;
  margin: 10px;
}

.icon {
  padding: 10px 0 0px;
  margin: 0 10px 0 20px;
  width: 10%;
  height: 10%;
  cursor: pointer;
}

.right {
  margin: 0 0 0 auto;
}

#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
#content {
  text-align: center;
  z-index: 2;
  width: 100%;
  padding: 10px;
  background: #fff;
  align-items: center;
  justify-content: center;
}

#content select,
#content textarea {
  margin-top: 5px;
  margin-bottom: 15px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}
</style>