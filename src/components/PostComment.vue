<template>
  <div>
    <div class="left-padding">
      <button
        :disabled="!commentButtonFlg"
        class="comment-button"
        @click="openModal"
      >
        投稿する
      </button>
    </div>
    <div id="overlay" v-if="show">
      <div id="content" class="modal">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <div>
            <validation-provider name="comment" rules="required">
              <div slot-scope="ProviderProps">
                <textarea
                  placeholder="コメント"
                  name="comment"
                  v-model="comment"
                  class="flex"
                  rows="4"
                  cols="40"
                >
                </textarea>
                <p class="error">{{ ProviderProps.errors[0] }}</p>
              </div>
            </validation-provider>
          </div>
          <button
            class="comment-button"
            @click="send"
            :disabled="ObserverProps.invalid"
          >
            投稿する
          </button>
          <button class="comment-button" @click="closeModal">閉じる</button>
        </validation-observer>
      </div>
    </div>
    {{ video_data }}
    {{ video_data.comments }}
    <div>
      <div v-for="comment in video_data.comments" :key="comment.id">
        {{ comment }}
        {{ comment.content }}
        <ul class="comment">
          <div class="flex">
            <li>
              <b>{{ comment.user.name }}さんのコメント</b>
            </li>
          </div>
          <li>{{ comment.content }}</li>
          <li class="created_at">{{ comment.created_at }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  extend,
  ValidationProvider,
  ValidationObserver,
} from "vee-validate/dist/vee-validate.full";
import { required } from "vee-validate/dist/rules";
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
      reservations: [],
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
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
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