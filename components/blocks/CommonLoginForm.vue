<template>
  <ValidationObserver v-slot="{ invalid }" ref="loginform">
    <form @submit.prevent="onSignOn">
      <h2 class="form-title">Sign In</h2>
      <p class="field">
        <label for="login">
          Email
          <span>*</span>
        </label>
        <ValidationProvider
          rules="required|email"
          v-slot="{ errors, touched }"
          vid="email"
        >
          <input type="text" name="email" v-model="loginForm.email" />
          <span class="error" v-if="touched && errors.length > 0">{{
            errors[0]
          }}</span>
        </ValidationProvider>
      </p>
      <p class="field">
        <label for="password">
          password
          <span>*</span>
        </label>
        <ValidationProvider
          rules="required"
          v-slot="{ errors, touched }"
          vid="password"
        >
          <input type="password" v-model="loginForm.password" name="password" />
          <span class="error" v-if="touched && errors.length > 0">{{
            errors[0]
          }}</span>
        </ValidationProvider>
      </p>

      <div class="account-create">
        <!-- <p>Sign in information incorrect</p> -->
        <button
          type="submit"
          :class="{ btn: true, 'login-btn': true, disabled: invalid }"
          :disabled="invalid"
        >
          Sign In
          <span>
            <i>
              <i class="fas fa-arrow-right"></i>
            </i>
          </span>
        </button>
        <!-- <a @click.prevent="signUpformToggle" href="#" class="new-account-btn">Create New Account</a> -->
      </div>
      <p class="or-text">or</p>

      <!-- <ValidationProvider>
            <div class="social-login">
              <button class="fb s-login" @click.prevent="handleFacebookLogin()">
                <img src="@/assets/facebooklogo.svg" alt />
                <p>Sign in with Facebook</p>
              </button>

              <button
                class="google s-login"
                @click.prevent="handleGoogleLogin()"
              >
                <img src="@/assets/img/google-icon.svg" alt />
                <p>Sign in with Google</p>
              </button>
            </div>
          </ValidationProvider> -->

      <div class="lg-bottom">
        <nuxt-link :to="{ name: 'user-signup' }" class="new-account-btn">
          New user?
          <p>Create an account</p>
        </nuxt-link>
        <router-link :to="{ name: 'user-forgot-password' }" class="forgot-pass"
          >I forgot my password</router-link
        >
      </div>
    </form>
  </ValidationObserver>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from "nuxt-property-decorator";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { LOGIN } from "~/utils/store/actions.names";
import { transformErrorData } from "~/utils/form";
import { nextFromQuery } from "../../utils/common";
const DEFAULT_LOGIN_FORM: any = {
  email: "",
  password: "",
};

@Component({
  name: "CommonLoginForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class CommonLoginForm extends Vue {
  loginForm: any = JSON.parse(JSON.stringify(DEFAULT_LOGIN_FORM));
  @Action(`user/${LOGIN}`) login: any;

  async onSignOn() {
    const credentials = this.loginForm;
    const res = await this.login(credentials);
    if (res.data.tokenCreate.accountErrors.length > 0) {
      (this.$refs.loginform as any).setErrors(
        transformErrorData(res.data.tokenCreate.accountErrors)
      );
    }
    nextFromQuery(this.$route, this.$router);
  }

  resetLoginForm() {
    this.loginForm = JSON.parse(JSON.stringify(DEFAULT_LOGIN_FORM));
  }
}
</script>
<style scoped lang="scss">
.form-title {
  margin-bottom: 40px;
  text-transform: capitalize;
  color: $color-secondary;
  font-size: 1.5rem;
  font-family: $font-family-h;
  font-weight: 500;
}
.field {
  margin-bottom: 20px;
  @include mediaXs {
    margin-bottom: 10px;
  }
}

.social-login {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .s-login {
    display: flex;
    align-items: center;
    flex-basis: 48%;
    height: 40px;
    justify-content: center;
    outline: none;
    border: none;
    cursor: pointer;
    margin-top: 12px;
  }

  .fb {
    background: #3b5998;
    color: #fff;
    font-family: $font-family-h;
    font-weight: 700;
    font-size: 14px;

    img {
      width: 16px;
      display: block;
      margin-right: 9px;
    }
  }

  .google {
    border: 2px solid #eaeaea;
    font-size: 14px;
    color: #585450;
    font-family: $font-family-h;
    font-weight: 700;
    background: transparent;
    img {
      width: 17px;
      margin-right: 10px;
    }
  }
}

.or-text {
  text-align: center;
  margin-top: 6px;
  color: $color-secondary;
  font-family: $font-family-h;
}

label {
  font-size: 14px;
  font-weight: 400;
  color: $color-secondary;
  font-family: $font-family-h;
  margin-bottom: 6px;
  display: block;
  text-transform: capitalize;

  @include mediaXs {
    font-size: 12px;
  }

  span {
    color: #777;
  }
}

input[type="text"],
input[type="password"] {
  font-size: 14px;
  font-weight: 400;
  font-family: $font-family-h;
  width: 100%;
  border: 1px solid $color-lightgray; /* Remove the default border */
  background: #f9f9f9;
  color: $color-secondary;
  transition: color 0.3s ease-out;
  background: transparent;
  height: 40px;
  padding: 0px 15px;
  @include mediaXs {
    height: 35px;
  }
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: 1px solid $color-lightgray;
  outline: none;
}

input[type="text"] {
  // margin-bottom: 10px;
}

.account-create {
  display: flex;
  justify-content: flex-end;
  font-family: $font-family-h;
  text-transform: capitalize;
  margin-top: 24px;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 38px;
  border-bottom: 1px solid $color-lightgray;
  @include mediaSm {
    margin-top: 0 !important;
  }
  @include mediaXs {
    padding-bottom: 0px;
  }

  p {
    font-size: 13px;
    color: #e03535;
    font-family: $font-family-h;
    font-weight: 400;
    text-transform: initial;
  }

  .login-btn {
    // margin-bottom: 10px;
    position: relative;
    cursor: pointer;
    font-family: $font-family-h;
    font-weight: 700;
    font-size: 14px;
    padding: 0;
    width: 174px;
    height: 40px;
    padding: 0 0 2px 0 !important;
    @include mediaSm {
      margin-bottom: 15px;
    }

    span {
      position: absolute;
      top: 50%;
      display: inline-block;
      transform: translate(0px, -45%);
      font-size: 13px;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:hover {
      span {
        transform: translate(15px, -51%);
        opacity: 1;
        transition: all 0.3s ease;
      }
    }
  }
}

.lg-bottom {
  display: flex;
  align-items: center;
  margin-top: 38px;
  justify-content: space-between;

  @include mediaXs {
    flex-direction: column;
  }

  .forgot-pass {
    font-size: 13px;
    display: block;
    font-family: $font-family-h;
    font-weight: 400;
    color: #aeaeae !important;
    text-transform: initial;
  }
  a {
    color: $color-secondary !important;
    p {
      margin-left: 5px;
      text-shadow: none !important;
    }
  }
}

.new-account-btn {
  position: relative;
  display: flex;
  font-family: $font-family-h;
  font-weight: 400;
  font-size: 14px;
  @include mediaXs {
    margin-bottom: 12px;
  }

  p {
    color: #2679d8;
    position: relative;
    &::before {
      position: absolute;
      bottom: -4px;
      content: "";
      width: 0;
      height: 1px;
      background: #2679d8;
      transition: all 0.4s ease-in-out;
    }

    &:hover {
      &:before {
        width: 100%;
        transition: all 0.4s ease-in-out;
      }
    }
  }
}
</style>
