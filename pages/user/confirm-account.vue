<template>
  <div class="registration-complete">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div v-if="confirmedAccount" class="confirmation-message">
            <p>
              <img src="@/assets/img/succes-icon.svg" alt />
            </p>
            <h2>Successfully completed your Registration.</h2>
          </div>
          <div
            v-else-if="confirmedAccount == null"
            class="confirmation-message"
          >
            <h2>Do you want to create an account?</h2>
            <button class="btn" @click.prevent="onConfirm">Confirm</button>
          </div>
          <div v-else class="confirmation-message">
            <!-- <p>
              <img src="@/assets/image/" alt />
            </p> -->
            <h2>
              Invalid Token or Email. Please try again or contact support.
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import ConfirmAccount from '~/apollo/users/mutations/ConfirmAccount.gql';

@Component({
  name: 'completeregistration',
  components: {},
})
export default class completeregistration extends Vue {
  confirmedAccount: boolean | null = null;

  onConfirm() {
    // console.log("validating...");
    if ((process as any).client && window) {
      const params = JSON.parse(JSON.stringify(this.$route.query));
      if (params.email == undefined || params.token == undefined) {
        this.confirmedAccount == false;
      } else {
        (this as any).$apollo
          .mutate({
            mutation: ConfirmAccount,
            variables: params,
          })
          .then((res: any) => {
            const data = res.data.confirmAccount;
            if (data.accountErrors.length > 0) {
              this.confirmedAccount == false;
            } else {
              this.confirmedAccount = true;
              setTimeout(() => {
                this.$router.push('/');
              }, 2000);
            }
          })
          .catch((e: any) => {
            this.confirmedAccount = false;
          });
      }
    }
  }
}
</script>
<style scoped lang="scss">
.registration-complete {
  width: 90%;
  margin: 0 auto;
  min-height: calc(100vh - 223px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.confirmation-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fafaf5;
  width: 50%;
  margin: 0 auto;
  padding: 6rem;
  margin-bottom: $section-margin;
  p {
    display: flex;
    color: #6cbc00;
    font-family: $font-family-base;
    align-items: center;
    margin-bottom: 1rem;
    img {
      margin-right: 15px;
      width: 30px;
    }
  }

  h2 {
    font-family: $font-family-base;
    text-transform: capitalize;
    color: $color-secondary;
    font-size: 1.3rem;
  }
}
</style>
