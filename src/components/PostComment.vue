<template>
  <div>
    <div class="left-padding">
      <button class="comment-button" @click="openModal">投稿する</button>
    </div>
    <div id="overlay" v-if="show">
      <div id="content" class="modal">
        <div>
          <textarea
            placeholder="コメント"
            name="comment"
            v-model="comment"
            class="flex"
            rows="4"
            cols="40"
          >
          </textarea>
        </div>
        <button class="comment-button" @click="send">投稿する</button>
      </div>
    </div>
    {{ video_data.comments[0] }}
    {{ active }}
    <div>
      <div v-for="(comment, index) in video_data.comments" :key="comment.id">
        <ul class="comment">
          <div class="flex">
            <li>
              <b>{{ comment.user.name }}さんのコメント</b>
              <img
                class="icon right"
                src="../assets/edit.png"
                @click="edit(comment.video_id, comment.id, index)"
                alt
              />
              <img
                class="icon"
                src="../assets/cancel.png"
                @click="cancel(comment.video_id, comment.id, index)"
                alt
              />
            </li>
          </div>
          <div v-if="!active[index]">
            <li>{{ comment.content }}</li>
          </div>
          <div v-else>
            <li>
              <textarea
                placeholder="コメント"
                name="comment"
                v-model="video_data.comments[index].content"
                class="flex"
                rows="4"
                cols="40"
              >
              </textarea>
            </li>
          </div>
          <li class="created_at">{{ comment.created_at }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate/dist/vee-validate.full";
import { required } from "vee-validate/dist/rules";
import axios from "axios";
// バリデーションルール
extend("required", required);
export default {
  props: {
    video_data: Object,
  },
  data() {
    return {
      comment: "",
      show: false,
      active: [],
    };
  },
  methods: {
    openModal() {
      this.show = true;
    },
    closeModal() {
      this.show = false;
    },
    // コメント更新
    async edit(video_id, comment_id, index) {
      //console.log(this.video_data.comments[index]);
      try {
        if (
          this.video_data.comments[index].user_id == this.$store.state.user.id
        ) {
          if (this.active[index]) {
            await axios.put(this.api_url + "videos/" + video_id + "/comments", {
              comment_id: comment_id,
              content: this.video_data.comments[index].content,
            });
          }
          console.log(this.active[index] + " " + index);
          this.$set(this.active, index, !this.active[index]);
          console.log(this.active[index] + " " + index);
        } else {
          alert("自分のコメントのみ更新できます。");
        }
      } catch (e) {
        alert(e);
      }
    },
    async cancel(video_id, comment_id, index) {
      try {
        console.log(this.video_data.comments[index]);
        console.log(comment_id);
        console.log(video_id);
        if (
          this.video_data.comments[index].user_id == this.$store.state.user.id
        ) {
          const comment = await axios.delete(
            this.api_url + "videos/" + video_id + "/comments",
            {
              params: { comment_id: comment_id },
            }
          );
          console.log(comment);
          console.log(this.video_data.comments);
          this.video_data.comments.splice(index, 1);
          this.active.splice(index, 1);
        } else {
          alert("自分のコメントのみ削除できます。");
        }
      } catch (e) {
        alert(e);
      }
    },
    async send() {
      try {
        //コメントを投稿する
        this.show = false;

        const comment = await axios.post(
          this.api_url + "videos/" + this.video_data.id + "/comments",
          {
            user_id: this.$store.state.user.id,
            content: this.comment,
          }
        );

        // コメント一覧にコメントを追加する
        const user = {
          id: this.$store.state.user.id,
          name: this.$store.state.user.name,
        };
        console.log(user);
        console.log(comment.data.data);
        this.$set(comment.data.data, "user", user);

        this.video_data.comments.unshift(comment.data.data);
        this.active.unshift(false);
        console.log(comment.data.data);

        this.evaluation = "";
        this.comment = "";
      } catch (error) {
        alert(error);
      }
    },
    // setCommentsActive() {
    //   console.log("a");
    //   console.log(this.video_data);
    //   console.log(this.video_data.comments);
    //   for (const i in this.video_data.comments) {
    //     this.active.push(true);
    //     console.log(i);
    //   }
    // },
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
    //this.setCommentsActive();
  },
};
</script>

<style scoped>
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

.comment-button {
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
.comment {
  background: #305dff;
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 50%;
  list-style: none;
}
.comment li {
  margin-top: 10px;
}
.evaluation-star {
  display: flex;
  flex-wrap: wrap;
}
.evaluation-star li {
  width: calc(20% / 5); /*←画像を横に4つ並べる場合*/
  box-sizing: border-box;
}
.evaluation-star li img {
  max-width: 100%; /*画像のはみだしを防ぐ*/
  height: auto; /*画像の縦横比を維持 */
}
.created_at {
  font-size: 12px;
  margin-bottom: 10px;
}
.comment-button {
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
.comment-button:disabled {
  background-color: #a9a9a9;
}
.icon {
  padding: 10px 0 0px;
  margin: 0 10px 0 20px;
  width: 5%;
  height: 5%;
  cursor: pointer;
}
.comment textarea {
  border-radius: 10px;
}
.right {
  margin: 0 0 0 auto;
}
</style>