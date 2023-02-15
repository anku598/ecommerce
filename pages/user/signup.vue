<template>
  <div class="signup-page">
    <ValidationObserver v-if="!success" class="sign-up-form">
      <form @submit.prevent="submitForm">
        <h2 class="form-title">Create Account</h2>
        <p class="field">
          <label for="first_name">
            First Name
            <span>*</span>
          </label>

          <ValidationProvider
            rules="required|alpha_spaces"
            v-slot="{ errors }"
            vid="first_name"
          >
            <input
              type="text"
              :style="{ border: errors[0] }"
              name="first_name"
              v-model="signUpForm.firstName"
            />
          </ValidationProvider>
        </p>

        <p class="field">
          <label for="last_name">
            last Name
            <span>*</span>
          </label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|alpha_spaces"
            vid="last_name"
          >
            <input
              type="text"
              :style="{ border: errors[0] }"
              name="last_name"
              v-model="signUpForm.lastName"
            />
          </ValidationProvider>
        </p>

        <p class="field">
          <label for="email">
            Email Address
            <span>*</span>
          </label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|email"
            vid="email"
          >
            <input
              type="email"
              v-model="signUpForm.email"
              :style="{ border: errors[0] }"
              name="email"
            />
          </ValidationProvider>
        </p>
        <p class="field">
          <label for="password1">
            password
            <span>*</span>
          </label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required|confirmed:password2"
            vid="password1"
          >
            <input
              type="password"
              :style="{ border: errors[0] }"
              name="password1"
              v-model="signUpForm.password1"
            />
          </ValidationProvider>
        </p>

        <p class="field">
          <label for="password2">
            Repeat password
            <span>*</span>
          </label>

          <ValidationProvider
            v-slot="{ errors }"
            rules="required"
            vid="password2"
          >
            <input
              type="password"
              :style="{ border: errors[0] }"
              name="password2"
              v-model="signUpForm.password2"
            />
          </ValidationProvider>
        </p>
        <div class="account-create">
          <!-- <p>The passwords do not match</p> -->
          <button type="submit" :class="{ btn: true, 'login-btn': true }">
            Create Account
            <span>
              <i>
                <i class="fas fa-arrow-right"></i>
              </i>
            </span>
          </button>
        </div>
        <span class="new-account-btn">
          Already have an account?
          <nuxt-link to="/login">Sign in</nuxt-link>
        </span>
      </form>
    </ValidationObserver>
    <div v-else class="success-message">
      <h3>Account Created Successfully! Please check mail for activation.</h3>
      <p>
        Haven't recieved email?
        <a href="#" @click.prevent="requestResend()">Click here to resend.</a>
      </p>
      <template v-if="resendStatus !== null">
        <p class="resend-status resend-success" v-if="resendStatus">
          Successfully sent another email.
        </p>
        <p class="resend-status resend-failed">Something went wrong!</p>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from "nuxt-property-decorator";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { SIGN_UP } from "~/utils/store/actions.names";
import accountRegisterMutation from "~/apollo/users/mutations/accountRegisterMutation.gql";
import requestConfirmationEmail from "~/apollo/users/mutations/requestConfirmationEmail.gql";

const DEFAULT_SIGNUP_FORM: any = {
  email: "",
  password1: "",
  password2: "",
  firstName: "",
  lastName: "",
};
@Component({
  name: "SignUpForm",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class SignUpForm extends Vue {
  success: boolean = false;
  postRegistrationData: any | null = null;
  @Action(namespaced(NS_USER, SIGN_UP)) signup: any;
  signUpForm: any = JSON.parse(JSON.stringify(DEFAULT_SIGNUP_FORM));
  redirectUrl = `${(this as any).$config.SITE_URL}/user/confirm-account/`;
  resendStatus: boolean | null = null;

  reset() {
    this.signUpForm = JSON.parse(JSON.stringify(DEFAULT_SIGNUP_FORM));
  }

  async submitForm() {
    const data: any = JSON.parse(JSON.stringify(this.signUpForm));
    delete data.password2;
    data.password = data.password1;
    delete data.password1;
    data.redirectUrl = this.redirectUrl;

    const res = await (this as any).$apollo.mutate({
      mutation: accountRegisterMutation,
      variables: { input: data },
    });
    const resData: any = res.data.accountRegister;
    // console.log(resData);
    if (resData.accountErrors.length === 0) {
      this.postRegistrationData = resData;
      this.success = true;
    }
  }

  async requestResend() {
    const res = await (this as any).$apollo.mutate({
      mutation: requestConfirmationEmail,
      variables: {
        input: {
          email: this.signUpForm.email,
          redirectUrl: this.redirectUrl,
        },
      },
    });
    const resData: any = res.data.requestConfirmationEmail;
    if (resData.accountErrors.length === 0 && resData.status === true) {
      this.resendStatus = true;
    } else {
      this.resendStatus = false;
    }
  }
}
</script>
<style scoped lang="scss">
.signup-page {
  min-height: calc(100vh - 123px);
  display: flex;
  justify-content: center;
  align-items: center;
  @include mediaXs {
    margin-bottom: 40px;
  }
}

.sign-up-form {
  width: 30%;
  @include mediaXs {
    width: 85%;
  }
}
.form-title {
  margin-bottom: 2rem;
  text-transform: capitalize;
  color: $color-secondary;
  font-size: 1.5rem;
  font-family: $font-family-h;
  font-weight: 500;
  @include mediaSm {
    margin-bottom: 1rem;
  }
}

.success-message {
  font-size: 1.5rem;
  font-family: $font-family-h;
  font-weight: 500;
  color: green;
}

.field {
  margin-bottom: 20px;
  @include mediaXs {
    margin-bottom: 10px;
  }

  .forgot-pass {
    font-size: 13px;
    margin-top: -2px;
    display: block;
    font-family: $font-family-h;
    color: #535353 !important;
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
input[type="email"],
input[type="password"] {
  font-size: 14px;
  font-weight: 400;
  font-family: $font-family-h;
  width: 100%;
  border: 1px solid $color-lightgray; /* Remove the default border */
  background: #f9f9f9;
  color: $color-secondary;
  transition: color 0.3s ease-out;
  height: 40px;
  padding: 0 15px;
  background: transparent;
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
  margin-top: 12px;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid $color-lightgray;

  @include mediaSm {
    flex-direction: row;
    align-items: center;
    margin-top: 0;
  }

  .btn {
    padding: 0 0 2px 0;
    width: 174px;
    height: 40px;
    font-family: $font-family-h;
    font-weight: 700;
    font-size: 14px;

    .disabled {
      background: yellow !important;
    }
  }

  p {
    font-size: 13px;
    color: #e03535;
    font-family: $font-family-h;
    font-weight: 400;
    text-transform: initial;
  }

  .login-btn {
    position: relative;
    cursor: pointer;

    @include mediaSm {
      // margin-bottom: 15px;
      // margin-top: 15px;
      // padding: 0.8rem 3rem !important;
    }

    span {
      position: absolute;
      top: 50%;
      display: inline-block;
      transform: translate(15px, -45%);
      font-size: 13px;
      opacity: 0;
      transition: all 0.3s ease;
    }

    &:hover {
      span {
        transform: translate(9px, -51%);
        opacity: 1;
        transition: all 0.3s ease;
      }
    }
  }
}

.new-account-btn {
  position: relative;
  display: inline-block;
  text-transform: initial;
  font-family: $font-family-h;
  font-size: 14px;
  color: $color-secondary !important;
  a {
    color: #2679d8;
    position: relative;
    font-family: $font-family-h;
    font-size: 14px;
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
