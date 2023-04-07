<template>
  <div class="login">
    <form action="" class="form" @submit.prevent="login">
      <h1>Login</h1>
      <label for="username">username</label>
      <input v-model="username" name="username" type="text" class="input" />
      <label for="password">Password</label>
      <input v-model="password" name="passowrd" type="password" class="input" />
      <button class="btn">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      window.user = this.username;
      this.$router.push({ name: "protected" });
    },
  },
};
</script>
