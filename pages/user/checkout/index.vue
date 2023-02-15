<template>
  <div class="checkout-index">
    <div class="row">
      <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 pl-0 mobile-screen">
        <div class="go-back">
          <button class="back-btn">
            <img src="@/assets/img/back-indicator.svg" alt /> Back
          </button>
        </div>
      </div> -->
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 responsive-padding">
        <StepWizard :steps="timeLineSteps" :current-step="0"></StepWizard>
        <div class="order-page-product-list">
          <h2 class="cart-section-title">Cart Items</h2>
          <div class="product-detail">
            <div class="row">
              <div class="col-md-12 col-lg-8 col-xl-8 pl-0 pr-0">
                <div class="list-item table-responsive info-table">
                  <table class="table">
                    <thead>
                      <tr class="d-flex">
                        <th
                          class="list-head-item col-12 col-sm-9 col-md-7 col-xl-7 col-lg-7"
                          scope="col"
                        >
                          Product
                        </th>

                        <th
                          class="list-head-item col-5 col-sm-5 col-md-2 col-xl-2 col-lg-2"
                          scope="col"
                        >
                          Quantity
                        </th>
                        <th
                          class="list-head-item col-5 col-sm-5 col-md-2 col-xl-2 col-lg-2"
                          scope="col"
                        >
                          Prices
                        </th>
                      </tr>
                    </thead>
                    <tbody class="list-body" v-if="cart != null">
                      <!-- <CartItemRow
                        v-for="(item, idx) in cart"
                        :key="'i' + idx"
                        :item="item"
                      ></CartItemRow> -->
                      <CartItemRow
                        v-for="(item, idx) in cart.lines"
                        :key="`item${idx}`"
                        :cart-item="item"
                        :calculations="calculations.lines[idx]"
                      ></CartItemRow>
                    </tbody>
                  </table>
                </div>
                <div class="checkout-btn col-lg-3">
                  <nuxt-link to="/user/checkout/addresses" class="btn"
                    >Checkout</nuxt-link
                  >
                </div>
              </div>
              <div
                class="col-md-12 col-lg-4 col-xl-4 col-sm-offset-3 disable-on-mobile"
              >
                <UserCheckoutCart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import StepWizard from "~/components/checkout/StepWizard.vue";
import { Checkout, CheckoutLine, TaxedMoney } from "~/graphqlTypes";
import isAuthOrGuest from "~/middleware/isAuthOrGuest";
import { createTaxedMoneyPrice, DEFAULT_CHECKOUT_STEPS } from "~/utils/sells";
import { CART } from "~/utils/store/getters.names";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { StepOption } from "~/utils/types";
import { formatMoney } from "../../../utils/sells";
import UserCheckoutCart from "../../../components/checkout/UserCheckoutCart.vue";
import { cartCalculations } from "~/utils/common";

@Component({
  name: "CheckoutIndex",
  components: {
    StepWizard: StepWizard,
    UserCheckoutCart,
  },
  middleware: [isAuthOrGuest],
})
export default class CheckoutIndex extends Vue {
  @Getter(namespaced(NS_USER, CART)) cart!: Checkout | null;

  timeLineSteps: StepOption[] = JSON.parse(
    JSON.stringify(DEFAULT_CHECKOUT_STEPS)
  );

  formatMoney = formatMoney;

  isPromoApplied: boolean = false;

  get calculations() {
    return cartCalculations(this.cart);
  }

  couponField: boolean = false;

  showCouponField() {
    this.couponField = !this.couponField;
  }
}
</script>
<style scoped lang="scss">
.checkout-index {
  // min-height: calc(100vh - 123px);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  // margin-top: 223px;
  @include mediaXs {
    margin-top: 0px;
    width: 85%;
  }
}
.order-page-product-list {
  margin-bottom: $section-margin;
  @media screen and (max-width: 991.98px) {
    margin-top: 40px;
  }

  @include mediaXs {
    margin-bottom: 40px !important;
  }
}
.order-detail {
  margin-bottom: 5rem;
}
.info-table {
  word-wrap: break-word;
}
h2 {
  margin-bottom: 2rem;
  font-family: $font-family-base;
  font-weight: 1.1rem;

  &.cart-section-title {
    @media screen and (max-width: 991.98px) {
      font-size: 1.2rem;
      margin-bottom: 0 !important;
    }

    @include mediaXs {
      font-size: 1rem;
      text-align: center;
    }
  }
}

.view-cart {
  text-transform: uppercase;
}

.list-item {
  margin-top: 2rem;

  .table-header,
  .list-items {
    justify-content: space-between;
  }
}

.disable-on-mobile {
  @include mediaSm {
    display: none;
  }
}

.list-head-item {
  border-bottom: 0px solid #000 !important;
  border-top: 0px solid #000 !important;
  text-align: center;
  vertical-align: middle;
  color: #7b7b7b;
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  &:first-child {
    padding-left: 0;
    text-align: left;
  }
}

.list-body {
  // border-bottom: 1px solid rgba(0, 0, 0, 0.3) !important;
  display: block;
}

.order-btn {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 0.7rem 0.5rem;
  border-radius: 0;
  @include mediaSm {
    font-size: 12px;
  }
}

ul {
  li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 1rem;
    align-items: center;
    &:last-child {
      margin-bottom: 0rem;
    }
  }
}

.order-invoices {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  align-items: flex-start;

  @media screen and (max-width: 767.98px) {
    flex-direction: column;
    width: 100%;

    .cupon-code {
      width: 100%;
      margin-bottom: 2rem;
    }
  }

  label[for="default-checkbox-1"],
  label[for="firstname"] {
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  ul {
    flex-direction: column;
    flex-basis: 30%;
    @include mediaSm {
      width: 100%;
    }
    li {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      margin: 0;
      padding: 1rem 0;
      text-transform: uppercase;
      font-family: $font-family-h;
      font-weight: 400;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      &:first-child {
        border-top: 1px solid rgba(0, 0, 0, 0.3);
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
}

.control {
  // flex: 2;
  position: relative;
  @include mediaXs {
    margin-left: 31px;
  }

  input[type="number"] {
    text-align: center;
    padding-left: 2.5rem;
    padding-right: 1.6rem;
  }
}

input {
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  flex: 1 0;
  line-height: 1.65;
  height: 3em;
  margin: 0 auto;
  padding-left: 0.5rem;
  padding-right: calc(82 / 16 * 1rem);
  text-align: left;
  width: auto;
  max-width: 120px;
  vertical-align: middle;
  @include mediaXs {
    max-width: 162px;
  }
  // Firefox-specific hack
  // -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  }
}

button {
  border-left-width: 1px;
  color: #000;
  cursor: pointer;
  -ms-flex: 0 1;
  flex: 0 1;
  font-size: 0.875rem;

  line-height: 1.7;
  position: absolute;
  top: 0;
  text-align: center;
  width: 2.5rem;
  height: 42px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 5;
  box-shadow: 0 !important;
  border: 0;
  margin-top: 2rem;
  // @include mediaXs {
  //   right: 46px !important;
  // }

  &:hover,
  &:active,
  &:focus {
    // border-color: #000;
    // color: #000;
    outline: none;
  }

  &:hover {
    & ~ .input {
      border: 1px solid #000;
    }
  }
  &:active,
  &:focus {
    & ~ .input {
      border: 0;
      // box-shadow: 0 0 0 0.2rem #000;
    }
  }
  &:disabled,
  &.is-disabled {
    color: #000;
    opacity: 1;
  }
}

.increment-button {
  background: #f5f5f5;
  right: 0;
  // transform: translateX(60%);
}

.decrement-button {
  background: #f5f5f5;
  left: 0;
}

.cupon-form {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin: 1rem 0;
  width: 100%;
  margin-bottom: 0;
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
    font-weight: 400;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(168, 168, 168, 0.5);
    vertical-align: middle;
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

input[type="text"],
input[type="password"] {
  font-size: 14px;
  font-weight: 400;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: $font-family-h;
  width: 100%;
  padding: 10px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1); /* Remove the default border */
  background: #f9f9f9;
  color: $color-secondary;
  transition: color 0.3s ease-out;
  margin: 12px 0;
  background: transparent;
}

.input-code {
  max-width: 300px;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
}

input[type="text"] {
  // margin-bottom: 10px;
}

.save-btn {
  margin-bottom: 5rem;
  position: relative;
  @include mediaSm {
    margin-top: 0rem;
    margin-bottom: 3rem;
  }
}

.checkout-btn {
  width: 100%;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin-top: 2rem;
  @include mediaXs {
    margin-top: 0.5rem;
  }
  a {
    width: 100%;
    text-align: center;
    & .btn {
      border-radius: 0 !important;
    }
  }
}

.btn {
  padding: 0.7rem 0rem;
  width: 100%;
  font-family: $font-family-h;
  font-weight: 900;
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
  img {
    margin-right: 10px;
    transform: rotate(180deg);
  }
}

button[type="submit"] {
  margin-top: 0;
  max-width: 165px;
}

button {
  background: transparent;
}

.mobile-screen {
  @media screen and (max-width: 991.98px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      margin: 0;
    }

    button {
      margin: 0;
      position: relative;
    }
  }
}

.responsive-padding {
  @media screen and (max-width: 991.98px) {
    padding: 0;
  }
}
</style>
