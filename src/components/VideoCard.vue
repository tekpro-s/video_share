<template>
  <div>
    <!-- {{ selectgenres }}
    {{ videos_data }} -->
    <!-- {{ genre }}<br />
    {{ genres }}<br />
    {{ keyword }}<br />
    {{ filteredVideos }}<br /> -->
    <!-- {{ videos_data }}
    {{ getFav }} -->
    <!-- {{ videos_snippets }} -->
    {{ selectgenres }}
    <!-- {{ active }}
    {{ videos_data }} -->
    {{ videos_data[0] }}

    <button
      v-if="this.$store.state.auth && this.$route.path === '/'"
      class="add-button"
      @click="openModal"
    >
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
                  v-for="genre in selectgenres"
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
      <div v-for="video in filteredVideos" :key="video.id" class="card">
        <div v-if="video">
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
            <h2 class="card-title" v-if="!getActive(video)">
              {{ video.video_title }}
            </h2>
            <input
              placeholder="title"
              v-model="video.video_title"
              size="50"
              v-else
            />
          </div>
          <div class="flex">
            <div class="card-link">
              <p v-if="!getActive(video)">{{ video.genre.name }}</p>
              <select class="search" v-model="video.genre_id" v-else>
                {{
                  genres
                }}
                <option value="">All genre</option>
                <option
                  v-for="genre in selectgenres"
                  :key="genre.id"
                  :value="genre.id"
                >
                  {{ genre.name }}
                </option>
              </select>

              <p v-if="!getActive(video)">{{ video.summary }}</p>
              <input
                placeholder="summary"
                v-model="video.summary"
                size="50"
                v-else
              />
              <!-- <p>{{ video.likes }}</p>
              <p>{{ video.id }}</p> -->
              <!-- <p>{{ video.liked_by_user }}</p> -->
              <!-- <button @click="detail(video.id)">詳しくみる</button> -->
              <button @click="updateVideo(video)" v-if="$route.path === '/'">
                更新
              </button>
              <button @click="deleteVideo(video)" v-if="$route.path === '/'">
                削除
              </button>
            </div>
            <img
              v-if="!getFav(video)"
              class="icon"
              src="../assets/like_false.png"
              @click="setFav(video)"
              alt
            />
            <img
              v-if="getFav(video)"
              class="icon"
              src="../assets/like_true.png"
              @click="setFav(video)"
              alt
            />
            <!-- <button
              class="icon"
              @click="onLikeClick(video)"
              :class="{ 'heart-animation': video.liked_by_user }"
            /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    genre: String,
    genres: Array,
    keyword: String,
  },
  data() {
    return {
      selectgenres: [],
      api_url: null,
      videos_data: null,
      videos_snippets: null,
      show: false,
      id: "",
      video_name: "",
      genre_id: 1,
      summary: "",
      active: [],
    };
  },
  methods: {
    async getVideos() {
      const videos = await axios.get(this.api_url + "videos");
      this.videos_data = videos.data.data;

      for (const i in this.videos_data) {
        this.active.push(false);
        console.log(i);
      }
      // this.videos_snippets = videos.data.snippets;
      console.log(this.videos);
    },
    async getGenres() {
      const genres = await axios.get(this.api_url + "genres");
      this.selectgenres = genres.data.data;
      console.log(this.selectgenres);
    },
    detail(id) {
      this.$router.push({ name: "Detail", params: { video_id: id } });
    },
    srcCreate(video_name) {
      return "https://www.youtube.com/embed/" + video_name;
    },
    async send() {
      //動画追加
      try {
        alert(
          this.video_name +
            " " +
            this.$store.state.user.id +
            " " +
            this.genre_id +
            " " +
            this.summary
        );
        const videos = await axios.post(this.api_url + "videos", {
          video_name: this.video_name,
          video_title: "テスト",
          user_id: this.$store.state.user.id,
          genre_id: this.genre_id,
          summary: this.summary,
        });

        const video = await axios.get(
          this.api_url + "videos/" + videos.data.data.id
        );

        console.log(video.data.data);
        this.videos_data.push(video.data.data);
        // this.videos_snippets.push(video.data.snippets);
        this.show = false;

        console.log(video);
      } catch (error) {
        alert(error);
      }
    },
    async updateVideo(video) {
      //動画更新
      alert(video.id);

      try {
        const index = this.videos_data.findIndex((v) => v.id === video.id);

        if (video.user_id == this.$store.state.user.id) {
          if (!this.active[index]) {
            const result = await axios.put(
              this.api_url + "videos/" + video.id,
              {
                video_name: video.video_name,
                video_title: video.video_title,
                user_id: video.user_id,
                genre_id: video.genre_id,
                summary: video.summary,
              }
            );

            const genreindex = this.selectgenres.findIndex(
              (v) => v.id === video.genre_id
            );
            alert(index + " " + genreindex);
            alert(
              this.videos_data[index].video_title +
                " " +
                this.selectgenres[genreindex].name
            );
            this.$set(
              this.videos_data[index],
              "genre",
              this.selectgenres[genreindex]
            );
            console.log(result);
          }
          this.$set(this.active, index, !this.active[index]);
          // this.shop.comments.splice(index, 1);
          // this.active.splice(index, 1);
        } else {
          alert("自分の投稿のみ更新できます。");
        }
      } catch (e) {
        alert(e);
      }
    },
    async deleteVideo(video) {
      //動画削除
      alert(video.id);
      try {
        if (video.user_id == this.$store.state.user.id) {
          const result = await axios.delete(
            this.api_url + "videos/" + video.id
          );
          console.log(result);
          const index = this.videos_data.findIndex((v) => v.id === video.id);

          this.videos_data.splice(index, 1);
          // this.shop.comments.splice(index, 1);
          // this.active.splice(index, 1);
        } else {
          alert("自分の投稿のみ削除できます。");
        }
      } catch (e) {
        alert(e);
      }
    },
    onLikeClick(video) {
      if (video.liked_by_user) {
        this.unlike(video);
      } else {
        this.like(video);
      }
    },
    async setFav(video) {
      const video_data = video;
      console.log(video_data);

      // ログイン中のユーザーIDが、ショップに紐づくいいねリストにあるか確認
      const result = video_data.likes.some((value) => {
        alert(value.user_id + " " + this.$store.state.user.id);
        return value.user_id == this.$store.state.user.id;
      });
      alert(result);

      try {
        // いいねが存在するか確認
        if (result) {
          // いいねが存在する場合いいね削除
          const likes = await axios.delete(
            this.api_url + "videos/" + video_data.id + "/likes",
            {
              params: { user_id: this.$store.state.user.id },
            }
          );

          console.log(likes);
        } else {
          // いいねが存在しない場合いいね追加
          const likes = await axios.put(
            this.api_url + "videos/" + video_data.id + "/likes",
            {
              user_id: this.$store.state.user.id,
            }
          );

          console.log(likes);
        }

        const video_data_after = await axios.get(
          this.api_url + "videos/" + video_data.id
        );

        const index = this.videos_data.findIndex((v) => v.id === video_data.id);

        console.log(video_data_after);
        alert(index + " " + this.$store.state.user.id);
        this.videos_data.splice(index, 1, video_data_after.data.data);
        alert(this.videos_data);
        console.log(this.videos_data);
      } catch (error) {
        alert(error);
      }
    },
    getFav(video) {
      const video_data = video;

      // ログイン中のユーザーIDが、ショップに紐づくいいねリストにあるか確認
      const result = video_data.likes.some((value) => {
        //alert(value.user_id + " " + this.$store.state.user.id);
        return value.user_id == this.$store.state.user.id;
      });

      return result;
    },
    getActive(video) {
      const video_data = video;
      const index = this.videos_data.findIndex((v) => v.id === video_data.id);

      return this.active[index];
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
    filteredVideos() {
      // 全店舗の元データを読み込む
      const videos = [];

      for (const i in this.videos_data) {
        //var flag = false;
        //alert(flag);
        const videos_data = this.videos_data[i];
        // const videos_snippet = this.videos_snippets[i];
        //alert(videos_snippet.title);
        console.log(videos_data);
        if (videos_data.video_title.indexOf(this.keyword) !== -1) {
          if (videos_data.genre.name == this.genre || !this.genre) {
            //alert(video.genre.name + " " + this.genre);
            if (this.$route.path === "/mypage") {
              //ログイン中のユーザーIDが、ショップに紐づくいいねリストにあるか確認
              const result = videos_data.likes.some((value) => {
                return value.user_id == this.$store.state.user.id;
              });
              if (result) {
                videos.push(videos_data);
              }
              // flag = true;
              // alert(flag);
            } else {
              videos.push(videos_data);
            }
          }
        }
      }

      // if (flag == true) {
      //   videos.push(videos_data);
      // } else {
      //   videos.push(false);
      // }
      //}
      //alert(videos);
      return videos;
    },
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
    this.getVideos();
    alert("");
    this.getGenres();
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