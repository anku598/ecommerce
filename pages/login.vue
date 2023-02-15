<template>
  <div class="login-part">
    <div class="login-form">
      <ValidationObserver v-slot="{ invalid }" ref="guestform">
        <form class="guest-login" @submit.prevent="onGuestLogin">
          <h2 class="form-title">Continue as Guest</h2>
          <p class="guest-para">
            If you don’t wish to register an account, don’t worry. You can
            checkout as a guest. We care about you just as much as any
            registered user.
          </p>

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
              <input type="text" name="email" v-model="guestForm.email" />
              <span class="error" v-if="touched && errors.length > 0">{{
                errors[0]
              }}</span>
            </ValidationProvider>
          </p>

          <button
            type="submit"
            :class="{ btn: true, 'login-btn': true, disabled: invalid }"
            :disabled="invalid"
          >
            Continue as guest
          </button>

          <!-- <div class="guest-footer">
          <span>Or you can</span>
          <nuxt-link :to="{ name: 'user-signup' }" class="new-account-btn">
            <p>Create an account</p>
          </nuxt-link>
        </div> -->
        </form>
      </ValidationObserver>
      <div class="login-wrapper">
        <CommonLoginForm />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  Action,
  Component,
  Mutation,
  Prop,
  Vue,
} from "nuxt-property-decorator";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { namespaced, NS_USER } from "../utils/store/namespaces.names";
import { SET_GUEST } from "../utils/store/mutations.names";
import { nextFromQuery } from "../utils/common";
@Component({
  name: "LoginPage",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class LoginPage extends Vue {
  @Mutation(namespaced(NS_USER, SET_GUEST)) setGuest!: any;
  guestForm: any = {
    email: "",
  };

  async onGuestLogin() {
    this.setGuest(this.guestForm.email);
    nextFromQuery(this.$route, this.$router);
  }
}
</script>
<style scoped lang="scss">
.login-part {
  width: 100%;
  min-height: calc(100vh - 123px);
  display: flex;
  align-items: center;
  justify-content: center;
  // background: rgba(0, 0, 0, 0.3);
  // position: fixed;
  // left: 0;
  // z-index: 20;
  // top: 32px;
  @include mediaSm {
    top: 90px;
  }
}

.form-title {
  margin-bottom: 40px;
  text-transform: capitalize;
  color: $color-secondary;
  font-size: 1.5rem;
  font-family: $font-family-h;
  font-weight: 500;

  @include mediaSm {
    margin-bottom: 0.6;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
}

.login-form {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @include mediaSm {
    width: 100%;
    padding: 0rem 2.5rem;
    margin-bottom: 35px;
    flex-direction: column;
  }

  &.autoHeight {
    // height: auto !important;
    padding: 2rem 0rem !important;

    @include mediaSm {
      padding: 2rem 0rem !important;
    }
  }

  .btn {
    margin-bottom: 40px;
    @include mediaXs {
      margin-bottom: 10px;
      padding: 0.6rem 1.5rem;
    }
  }
  .login-wrapper {
    width: 500px;
    max-width: 100%;
    // margin: 0 auto;
    form {
      width: 100%;
    }
  }
}

.guest-login {
  max-width: 500px;
  @include mediaXs {
    margin-bottom: 40px;
  }
  .guest-para {
    font-family: $font-family-h;
    color: $color-secondary;
    font-size: 1.1rem;
    line-height: 32px;
    margin-bottom: 45px;
    @include mediaXs {
      margin-bottom: 20px;
      font-size: 0.9rem;
      line-height: 24px;
    }
  }

  .guest-footer {
    display: flex;
    font-size: 1.1rem;
    @include mediaXs {
      font-size: 0.9rem;
      line-height: 24px;
    }
    span {
      margin-right: 10px;
      color: #727272;
    }
  }
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
</style>
