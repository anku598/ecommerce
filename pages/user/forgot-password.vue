<template>
  <div class="reset-form">
    <ValidationObserver v-slot="{ invalid }" ref="resetform" v-if="showForm">
      <form @submit.prevent="onRequest">
        <h2>Reset Password</h2>
        <p class="reset-text">
          Forgotten or lost your password? Please enter your email address. You
          will receive a link to create a new password via email.
        </p>

        <p class="field">
          <label for="email">
            Email Address
            <span>*</span>
          </label>
          <ValidationProvider
            rules="required|email"
            v-slot="{ errors, touched }"
            vid="email"
          >
            <input type="email" name="email" v-model="email" />
            <span class="error" v-if="touched && errors.length > 0">{{
              errors[0]
            }}</span>
          </ValidationProvider>
        </p>

        <div class="account-create">
          <button
            type="submit"
            :class="{ btn: true, 'login-btn': true }"
            :disabled="invalid"
          >
            Send Link
            <span>
              <i>
                <i class="fas fa-arrow-right"></i>
              </i>
            </span>
          </button>
        </div>
      </form>
    </ValidationObserver>

    <p class="thanks-text" v-if="!showForm">
      Thank you! Please check your email to reset your password.
    </p>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from 'nuxt-property-decorator';
import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver } from 'vee-validate';
import { namespaced, NS_USER } from '~/utils/store/namespaces.names';
import { REQUEST_PASSWORD_RESET } from '~/utils/store/actions.names';
import { transformErrorData } from '~/utils/form';
@Component({
  name: 'ResetPassword',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class ResetPassword extends Vue {
  @Action(namespaced(NS_USER, REQUEST_PASSWORD_RESET))
  [REQUEST_PASSWORD_RESET]!: any;
  email: string = '';
  showForm: boolean = true;

  async onRequest() {
    const req = await this[REQUEST_PASSWORD_RESET](this.email);
    const resp = req.data.requestPasswordReset;
    if (resp.accountErrors.length > 0) {
      (this.$refs.resetform as any).setErrors(
        transformErrorData(resp.accountErrors)
      );
    } else {
      this.showForm = false;
    }
  }
}
</script>
<style scoped lang="scss">
.reset-form {
  margin: 0 auto;
  min-height: 50vh;
  width: 95%;
  padding-top: 120px;
  padding-bottom: 120px;
  background: #f6f6f6;
  margin-bottom: $section-margin;
}

label {
  font-size: 14px;
  font-weight: 400;
  color: $color-secondary;
  font-family: $font-family-h;
  margin-bottom: 6px;
  span {
    color: #777;
  }
}

input[type='email'] {
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

// input[type='text']:focus,
// input[type='password']:focus {
//   border: 1px solid $color-lightgray;
//   outline: none;
// }

h2 {
  font-family: $font-family-h;
  font-weight: 700;
  margin-bottom: 15px;
}
.reset-text {
  max-width: 600px;
  text-align: center;
  margin-bottom: 15px;
  font-family: $font-family-h;
  font-size: 16px;
  color: $color-secondary;
}

.thanks-text {
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  color: #a1a1a1;
  font-family: $font-family-h;
  font-size: 16px;
  margin-top: 20px;
}

.field {
  // display: flex;
  flex-direction: column;
  margin-top: 24px;
}

form {
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input[type='text'],
input[type='password'] {
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
  width: 420px !important;

  @include mediaXs {
    width: 250px !important;
  }
}

input[type='text']:focus,
input[type='password']:focus {
  border: 1px solid rgba(0, 0, 0, 1);
  outline: none;
}

.account-create {
  display: flex;
  justify-content: space-between;
  font-family: $font-family-h;
  text-transform: capitalize;
  margin-top: 24px;
  align-items: center;
  justify-content: center;

  @include mediaSm {
    margin-top: 0 !important;
  }

  p {
    font-size: 13px;
    color: red;
    font-family: $font-family-h;
    font-weight: 400;
  }

  .btn {
    padding: 0.8rem 3rem !important;
  }

  .login-btn {
    // margin-bottom: 10px;
    position: relative;
    cursor: pointer;
    font-family: $font-family-h;
    font-weight: 700;
    font-size: 14px;
    @include mediaSm {
      margin-top: 20px;
      margin-bottom: 20px;
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
      // span {
      //   transform: translate(62px, -40%);
      //   opacity: 1;
      //   transition: all 0.3s ease;
      // }
    }
  }
}
</style>
