<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card
        icon="log-in"
        title="欢迎登录"
        :bordered="false"
      >
        <div class="form-con">
          <login-form
            @on-success-valid="handleSubmit"
            :isLoading="isLoading"
          ></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/login-form";
import login from "@/api/user.js";
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    handleSubmit({ username, password }) {
      var self = this;
      self.isLoading = true;
      self
        .handleLogin({ username, password })
        .then(res => {
          if (res) {
            self.$router.push({
              name: "blogList"
            });
          }
        })
        .catch(error => {})
        .finally(() => {
          self.isLoading = false;
        });
    },
    async handleLogin(form) {
      let loginResult = await login(form);
      return loginResult;
    }
  },
  created() {
    localStorage.clear();
  }
};
</script>

<style>
</style>
