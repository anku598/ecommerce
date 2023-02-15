<template>
  <div class="login-part">
    <div class="login-bg" v-on:click.prevent="$emit('toggle-login')"></div>
    <div class="login-form" :class="{ autoHeight: isLogin == true }">
      <div>
        <CommonLoginForm />
      </div>

      <!-- <div v-if="isLogin" class="login-wrapper">
        <SignUpForm v-on:toggle-signup="signUpformToggle" />
      </div> -->
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from 'nuxt-property-decorator';
import CommonLoginForm from './CommonLoginForm.vue';

@Component({
  name: 'LoginForm',
  components: {
    CommonLoginForm,
  },
})
export default class LoginForm extends Vue {
  isLogin: boolean = false;

  // mounted() {
  //   console.log(this.$emit('toggle-login'));
  // }
}
</script>
<style scoped lang="scss">
.login-part {
}

.login-bg {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 0;
  z-index: 0;
  top: 32px;
  @include mediaSm {
    top: 90px;
  }
}

.login-form {
  position: absolute;
  top: 0;
  right: 0;
  background: #fff;
  padding: 2rem 2.5rem;
  z-index: 2;
  width: 500px;
  border-top: 2px solid #000;

  @include mediaSm {
    width: 100%;
    padding: 2rem 2rem;
    top: 90px;
  }

  &.autoHeight {
    // height: auto !important;
    padding: 2rem 0rem !important;

    @include mediaSm {
      padding: 2rem 0rem !important;
    }
  }
  .login-wrapper {
    width: 80%;
    margin: 0 auto;
    form {
      width: 100%;
    }
  }
}
</style>
