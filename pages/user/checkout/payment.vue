<template>
  <div class="payment-method">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <StepWizard :steps="timeLineSteps" :current-step="3"></StepWizard>
        <div class="row">
          <div class="col-md-7 col-12">
            <div class="edit-billing-info">
              <h2 class="billing-title">Payment Method</h2>
              <PaymentInput
                v-if="cart"
                v-model="paymentMethod"
                :methods="cart.availablePaymentGateways"
              ></PaymentInput>
              <div class="save-btn">
                <button @click.prevent="handleProceed" class="btn">
                  Review
                </button>
              </div>
            </div>

            <!-- <CheckoutPayment v-if="showProceed" /> -->
          </div>
          <div class="col-md-4 col-12 col-sm-offset-3 disable-on-mobile">
            <UserCheckoutCart></UserCheckoutCart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  Component,
  Getter,
  Mutation,
  Prop,
  Vue,
  Watch,
} from "nuxt-property-decorator";
import { Checkout, PaymentGateway } from "~/graphqlTypes";
import { DEFAULT_CHECKOUT_STEPS } from "~/utils/sells";
import { CART, GET_PAYMENT_METHOD_BY_ID } from "~/utils/store/getters.names";
import { SET_PAYMENT_METHOD } from "~/utils/store/mutations.names";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { StepOption } from "~/utils/types";
import PaymentInput from "../../../components/checkout/PaymentInput.vue";
import isAuthOrGuest from "~/middleware/isAuthOrGuest";
@Component({
  name: "payment",
  components: {
    PaymentInput,
  },
  middleware: isAuthOrGuest,
})
export default class payment extends Vue {
  @Getter(namespaced(NS_USER, CART)) cart!: Checkout;
  @Mutation(namespaced(NS_USER, SET_PAYMENT_METHOD)) [SET_PAYMENT_METHOD]!: any;
  @Getter(namespaced(NS_USER, GET_PAYMENT_METHOD_BY_ID))
  [GET_PAYMENT_METHOD_BY_ID]!: any;

  timeLineSteps: StepOption[] = JSON.parse(
    JSON.stringify(DEFAULT_CHECKOUT_STEPS)
  );
  paymentMethod: PaymentGateway | null = null;

  mounted() {
    const val: PaymentGateway | null = this[GET_PAYMENT_METHOD_BY_ID](
      this.cart.id
    );
    if (val) {
      this.paymentMethod = val;
    }
  }

  @Watch("cart", { deep: true, immediate: true })
  handleCartChange(val: any, oldVal: any) {
    if (val && this.paymentMethod === null) {
      if (val.availablePaymentGateways.length > 0) {
        this.paymentMethod = val.availablePaymentGateways[0];
        if (val.paymentMethod) {
          this.paymentMethod = val.availablePaymentGateways.find((sm: any) => {
            return sm.id === val.paymentMethod.id;
          });
        } else {
          this.paymentMethod = val.availablePaymentGateways[0];
        }
      }
    }
  }

  handleProceed() {
    if (this.paymentMethod) {
      this[SET_PAYMENT_METHOD]({ id: this.cart.id, value: this.paymentMethod });
      this.$router.push({ name: "user-checkout-review" });
    }
  }
}
</script>
<style scoped lang="scss">
.payment-method {
  // min-height: calc(100vh - 223px);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  // margin-top: 100px;
  @include mediaXs {
    margin-top: 0px;
    width: 100%;
  }
}
h2 {
  @include productTitle;
  font-weight: 600;
}

.name-field {
  display: flex;
  align-items: center;
  @include mediaXs {
    flex-direction: column;
  }
}

.shipping-form {
  margin-top: 5rem;
}

.address-section {
  margin-bottom: 20px;
}

.disable-on-mobile {
  @include mediaSm {
    display: none;
  }
}

.back-btn {
  display: flex;
  align-items: center;
  color: #0e1224;
  font-family: $font-family-h;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0 !important;
  width: 100%;
  text-align: center;
  border: none;
  background: transparent;
  outline: none;
  img {
    margin-right: 10px;
    transform: rotate(180deg);
  }
}

label {
  font-size: 15px;
  font-weight: 500;
  color: $color-secondary;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: $font-family-h;

  span {
    color: $color-secondary;
    margin-left: 2px;
  }
}

input[type="text"],
input[type="email"],
input[type="password"] {
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: $font-family-h;
  width: 100%;
  padding: 15px 15px 15px 20px;
  border: 1px solid rgba(112, 112, 112, 1); /* Remove the default border */
  background: #ffffff;
  color: #000;
  transition: color 0.3s ease-out;
  margin: 12px 0;
}

.gender-field {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

// gender Radio button custom style

[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  margin-right: 20px;
  color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff;

  color: $color-secondary;
  font-family: $font-family-h;
  font-weight: 400;
  text-transform: capitalize;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: #000;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.btn {
  text-align: center;
  text-transform: capitalize;
  font-family: $font-family-h;
  font-weight: 600;

  @include mediaSm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @include mediaXs {
    width: 90%;
  }
}
.billing-title {
  margin-bottom: 50px !important;
  @include mediaXs {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 40px !important;
  }
}

.btn {
  @include mediaXs {
    font-size: 0.8rem;
    margin: 0 auto !important;
  }
}

.add-addrss-btn {
  background: #f6f6f6;
  color: $color-black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  min-height: 200px;
  cursor: pointer;
  span {
    @include productTitle;
    color: $color-black;
    margin: 0;
  }

  p {
    @include productTitle;
    color: $color-black;
    margin: 0;
  }
}

.info-card {
  background: #f6f6f6;
  color: $color-black;
  display: flex;
  flex-direction: column;
  padding: 4rem 3rem;
  min-height: 200px;
  .name {
    font-family: $font-family-base;
    font-size: 1.1rem;
  }
}

.address-section-title {
}

.save-btn {
  margin-top: 2rem;
  margin-bottom: 5rem;
  @include mediaSm {
    margin-top: 2rem;
  }
}

.default-checkbox {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    color: $color-secondary;
    font-family: $font-family-h;
    font-weight: 300;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(168, 168, 168, 0.5);
    vertical-align: text-top;
  }

  &:checked + label:before {
    background: #000;
    border: 1px solid #000;
    transition: all 0.3s ease-out;
  }

  &:checked + label:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white,
      4px -6px 0 white, 4px -8px 0 white;
    transform: rotate(45deg);
    transition: all 0.3s ease-out;
  }
}

.cart-section {
  width: 100%;
  display: flex;
  justify-content: center;

  .cart-details {
    position: relative;
    padding: 0rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    font-family: $font-family-h;
    padding-right: 0;
    width: 100%;
  }
}

.list-body {
  color: #000;
  flex: 1 0 auto;

  ul {
    border-bottom: 1px solid #000;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      &:last-child {
        margin-bottom: 0rem;
      }
    }
  }
}

.price-total {
  flex-direction: column;
  flex-basis: 30%;
  @include mediaXs {
    margin-top: 2rem;
    font-size: 0.8rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin: 0;
    padding: 1rem 0;
    margin-bottom: 0;
    text-transform: uppercase;
    font-family: $font-family-h;
    font-weight: 400;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    @include mediaXs {
      padding: 0.6rem 0;
    }
    &:first-child {
      border-top: 0px solid rgba(0, 0, 0, 0.3);
    }

    &:last-child {
      border-bottom: 0px solid rgba(0, 0, 0, 0.3);
      padding-top: 8px;
    }

    &.total {
      font-family: $font-family-h;
      font-weight: 700;
    }
  }
}

.checkout-btn {
  color: #fff !important;
  display: block;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 1.3px;
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.line {
  width: 600px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: 7%;
  right: 0;
}

.address {
  p {
    margin-bottom: 10px;
  }

  .address-edit-btn {
    text-decoration: underline;
  }
}
</style>
