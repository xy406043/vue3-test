<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :rules="rules"
      :model="formState"
    >
      <a-form-item name="phone">
        <a-input
          size="large"
          type="text"
          placeholder="账号"
          v-model:value="formState.phone"
        >
          <template #prefix>
            <UserOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          size="large"
          placeholder="密码"
          v-model:value="formState.password"
        >
          <template #prefix>
            <LockOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-checkbox v-model:checked="autoLogin">自动登录</a-checkbox>
      </a-form-item>
      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          @click="onSubmit"
          htmlType="submit"
          class="login-button"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import store from "@/store/index";
import { useRouter } from "vue-router";
import { UserActionTypes } from "@/store/modules/user/action-types";
import { reactive, ref, UnwrapRef } from "vue";
// setup中定义的方法函数都会暴露出去，直接引用 就可以在template中进行访问

const autoLogin = ref(true);
const formLogin = ref();
const formState: UnwrapRef<{ phone: string; password: string }> = reactive({
  phone: "",
  password: "",
});
const rules = {
  phone: { required: true, message: "请输入账号", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

const $router = useRouter();
const onSubmit = async () => {
  await formLogin.value.validate();
  await store.dispatch(UserActionTypes.LOGIN, formState);
  $router.push({ path: "/" });
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
