<template>
  <div class="signup-page">
    <ValidationObserver v-if="success === null" class="sign-up-form">
      <form @submit.prevent="submitForm">
        <h2 class="form-title">Reset Password</h2>
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
              v-model="resetForm.password1"
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
              v-model="resetForm.password2"
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
      </form>
    </ValidationObserver>
    <div v-else-if="success" class="success-message">
      Password Changed Successfully!
    </div>
    <div v-else class="success-message">
      Something went wrong while resetting your password.
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
import { namespaced, NS_USER } from '~/utils/store/namespaces.names';
import { SIGN_UP } from '~/utils/store/actions.names';
import SetPassword from '~/apollo/users/mutations/SetPassword.gql';

const DEFAULT_SIGNUP_FORM: any = {
  password1: '',
  password2: '',
};
@Component({
  name: 'SignUpForm',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class SignUpForm extends Vue {
  success: boolean | null = null;
  postRegistrationData: any | null = null;
  @Action(namespaced(NS_USER, SIGN_UP)) signup: any;
  resetForm: any = JSON.parse(JSON.stringify(DEFAULT_SIGNUP_FORM));

  reset() {
    this.resetForm = JSON.parse(JSON.stringify(DEFAULT_SIGNUP_FORM));
  }

  async submitForm() {
    const params = JSON.parse(JSON.stringify(this.$route.query));

    if (params.email == undefined || params.token == undefined) {
      this.success == false;
    } else {
      const data: any = JSON.parse(JSON.stringify(this.resetForm));
      delete data.password2;
      data.password = data.password1;
      delete data.password1;
      data.email = params.email;
      data.token = params.token;
      (this as any).$apollo
        .mutate({
          mutation: SetPassword,
          variables: data,
        })
        .then((res: any) => {
          const data = res.data.setPassword;
          if (data.accountErrors.length > 0) {
            this.success == false;
          } else {
            this.success = true;
            setTimeout(() => {
              this.$router.push('/');
            }, 2000);
          }
        })
        .catch((e: any) => {
          this.success = false;
        });
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

input[type='text'],
input[type='email'],
input[type='password'] {
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

input[type='text']:focus,
input[type='password']:focus {
  border: 1px solid $color-lightgray;
  outline: none;
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

input[type='text'],
input[type='email'],
input[type='password'] {
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

input[type='text']:focus,
input[type='password']:focus {
  border: 1px solid $color-lightgray;
  outline: none;
}

input[type='text'] {
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
      content: '';
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
