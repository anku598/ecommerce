<template>
  <div class="cart-section">
    <div class="cart-details" v-if="cart">
      <div class="list-body">
        <ul>
          <UserCart
            v-for="(item, idx) in cart.lines"
            :key="`item${idx}`"
            :cart-item="item"
            :calculations="calculations.lines[idx]"
          ></UserCart>
        </ul>
      </div>

      <ul class="price-total">
        <li>
          <p>Sub total</p>
          <p>
            {{
              formatMoney(
                calculations.subTotal.mainValue - calculations.taxValue,
                calculations.currency
              )
            }}
          </p>
        </li>
        <li v-if="cart.discount && cart.discount.amount > 0">
          <p>discount</p>
          <p>
            {{ formatMoney(cart.discount.amount, calculations.currency) }}
          </p>
        </li>
        <li v-if="calculations.taxValue">
          <p>VAT</p>
          <p>
            {{ formatMoney(calculations.taxValue, calculations.currency) }}
          </p>
        </li>
        <li v-if="calculations.shipping">
          <p>Shipping</p>
          <p>
            {{
              calculations.shipping.amount > 0
                ? formatMoney(
                    calculations.shipping.amount,
                    calculations.currency
                  )
                : "Free"
            }}
          </p>
        </li>

        <li class="total">
          <p>Grand Total</p>
          <p>
            {{ calculations.total.main }}
          </p>
        </li>
      </ul>
    </div>
    <span class="line"></span>
  </div>
</template>

<script lang='ts'>
import { Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import { Checkout, CheckoutLine, TaxedMoney } from "~/graphqlTypes";
import { cartCalculations } from "~/utils/common";
import { createTaxedMoneyPrice, formatMoney } from "~/utils/sells";
import { CART } from "~/utils/store/getters.names";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import shipping from "../../pages/user/checkout/shipping.vue";
@Component({
  name: "UserCheckoutCart",
  components: {},
})
export default class UserCheckoutCart extends Vue {
  @Getter(namespaced(NS_USER, CART)) cart!: Checkout | null;
  formatMoney = formatMoney;
  isPromoApplied: boolean = false;

  get calculations() {
    return cartCalculations(this.cart);
  }

  toNumber(val: String) {
    console.log(`--${val}--`);
    const num = val.replace(/^.*?(\d+).*/, "$1");
    const check = parseFloat(val.split(" ")[1]);
    console.log(num);
    console.log(val.split(" ")[1]);
    return check;
  }
}
</script>
<style scoped lang="scss">
.checkout-form {
  // min-height: calc(100vh - 123px);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  margin-top: 123px;
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
  }
}

.custom-padding {
  padding-left: 0;
}

.billing-title {
  margin-bottom: 50px !important;
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
  margin-bottom: 20px;
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
    padding-bottom: 15px;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1.2rem;
      // padding-bottom: 1rem;
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
  p {
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    @include mediaXs {
      padding: 0.6rem 0;
    }
    &:first-child {
      border-top: 0px solid rgba(0, 0, 0, 0.1);
    }

    &:last-child {
      border-bottom: 0px solid rgba(0, 0, 0, 0.1);
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

input[type="number"] {
  text-align: center;
  padding-left: 2.5rem;
  padding-right: 1.6rem;
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

label[for="default-checkbox-1"],
label[for="firstname"] {
  font-family: $font-family-h;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
}
</style>
