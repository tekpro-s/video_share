<template>
  <div>
    <div class="card">
      <h2>会員登録</h2>
      <div class="form">
        <validation-observer ref="obs" v-slot="ObserverProps">
          <validation-provider
            name="名前"
            v-slot="{ errors }"
            rules="required|max:255"
          >
            <input
              name="name"
              placeholder="Username"
              type="text"
              v-model="name"
            />
            <p class="error">{{ errors[0] }}</p>
          </validation-provider>
          <validation-provider
            name="メールアドレス"
            v-slot="{ errors }"
            rules="required|email|max:255"
          >
            <input
              name="email"
              placeholder="Email"
              type="email"
              v-model="email"
            />
            <p class="error">{{ errors[0] }}</p>
          </validation-provider>
          <validation-provider
            name="パスワード"
            v-slot="{ errors }"
            rules="required|min:8|max:255"
          >
            <input
              name="password"
              placeholder="Password"
              type="password"
              v-model="password"
            />
            <p class="error">{{ errors[0] }}</p>
          </validation-provider>
          <button
            :disabled="ObserverProps.invalid || !ObserverProps.validated"
            @click="auth"
          >
            登録
          </button>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  extend,
  ValidationProvider,
  ValidationObserver,
  localize,
} from "vee-validate/dist/vee-validate.full";
import { required, email, min, max } from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja";

// バリデーションルール
extend("required", required);
extend("email", {
  ...email,
  message: "有効なメールアドレスではありません",
});
extend("min", min);
extend("max", max);
localize("ja", ja);

export default {
  props: {
    role: Number,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      api_url: null,
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  methods: {
    async auth() {
      try {
        const users = await axios.post(this.api_url + "users/registration", {
          name: this.name,
          email: this.email,
          password: this.password,
          role_id: 1,
        });
        console.log(users);
        this.$router.push("/thanks");
      } catch (error) {
        alert(error);
      }
    },
  },
  created() {
    // 環境設定ファイルからURL取得
    this.api_url = process.env.VUE_APP_API_BASE_URL;
  },
};
</script>

<style scoped>
.card {
  margin: 100px auto;
  width: 350px;
  background: #fff;
  border-radius: 5px;
  padding: 0 0 10px 0;
}
.card h2 {
  color: white;
  background: #305dff;
  text-align: left;
  padding: 20px;
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
.form button {
  margin-top: 15px;
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
.form button:disabled {
  background-color: #a9a9a9;
}
</style>