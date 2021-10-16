<template>
  <div class="header flex">
    <div class="left flex">
      <img
        class="logo"
        src="../assets/menu.png"
        :to="{name:'Videos'}"
      />
      <p v-if="this.$store.state.auth">
        ログインユーザー：{{ this.$store.state.user.name }}さん
      </p>
    </div>
    <div class="right flex">
      <router-link
        :to="{ name: 'Register' }"
        class="link"
        v-if="!this.$store.state.auth"
        >新規登録</router-link
      >
      <router-link
        :to="{ name: 'Login' }"
        class="link"
        v-if="!this.$store.state.auth"
        >ログイン</router-link
      >
      <p
        @click="
          $store.dispatch('logout');
          transition();
        "
        class="link"
        v-if="this.$store.state.auth"
      >
        ログアウト
      </p>
    </div>
  </div>
</template>


<style scoped>
.right {
  align-items: center;
}
.left {
  align-items: center;
}
.link {
  margin-right: 20px;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
.header {
  margin: 20px;
  justify-content: space-between;
}
.logo {
  width: 50px;
  cursor: pointer;
}
</style>