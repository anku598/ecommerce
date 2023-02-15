<template>
  <div class="cart-section">
    <div id="cart-bg" v-on:click.prevent="$emit('toggle-cart')"></div>
    <div class="cart-details" ref="cart">
      <header>
        <div class="header-wrap">
          <p>
            My Bag
            <!-- <span
              >({{ cart.length }} item{{ cart.length > 1 ? 's' : '' }})</span
            > -->
          </p>
          <a href="#" v-on:click.prevent="$emit('toggle-cart')">
            <img src="@/assets/img/close-icon.svg" alt="delete" />
          </a>
        </div>
      </header>

      <div class="list-body" v-if="cart != null && cart.lines.length > 0">
        <ul>
          <CartItem
            v-for="(item, idx) in cart.lines"
            :key="`item${idx}`"
            :cart-item="item"
            :calculations="calculations.lines[idx]"
          ></CartItem>
        </ul>
      </div>

      <div class="footer-bottom-section">
        <div class="promo-code">
          <form class="promo-code-form" v-if="!cart.voucherCode">
            <input
              type="text"
              placeholder="Enter Promo Code "
              v-model="promoCode"
              name="search"
            />
            <button @click.prevent="onPromoAdd()" type="submit">Apply</button>
          </form>

          <div v-else class="applied-promo">
            <p>
              <span>
                <span class="currency-sign">{{ cart.discount.currency }}</span>
                {{ cart.discount.amount }} OFF
              </span>
              Promo Applied!
            </p>
            <a href="#" @click.prevent="onRemovePromoCode()">Remove Code</a>
          </div>
        </div>
        <a href="#" @click.prevent="onProceed" class="checkout-btn">
          <div class="proceed-btn">
            <p>Proceed to Checkout</p>
            <span class="total-price">
              {{ calculations.total.main }}
            </span>
          </div>
        </a>
      </div>
    </div>

    <!-- <span v-if="cart.length > 0" class="line"></span> -->
  </div>
</template>

<script lang='ts'>
import { Action, Getter } from "nuxt-property-decorator";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Checkout, CheckoutLine, TaxedMoney } from "~/graphqlTypes";
import { cartCalculations } from "~/utils/common";
import { ADD_PROMO_CODE, REMOVE_PROMO_CODE } from "~/utils/store/actions.names";
import { CART } from "~/utils/store/getters.names";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { createTaxedMoneyPrice, formatMoney } from "../../utils/sells";
@Component({
  name: "CartList",
  components: {},
})
export default class CartList extends Vue {
  @Getter(namespaced(NS_USER, CART)) cart!: Checkout | null;
  @Action(namespaced(NS_USER, ADD_PROMO_CODE)) [ADD_PROMO_CODE]!: any;
  @Action(namespaced(NS_USER, REMOVE_PROMO_CODE)) [REMOVE_PROMO_CODE]!: any;
  formatMoney = formatMoney;
  isPromoApplied: boolean = false;
  promoCode: string = "";

  onPromoAdd() {
    if (this.promoCode.length > 0) {
      this[ADD_PROMO_CODE](this.promoCode);
    }
  }

  onRemovePromoCode() {
    this[REMOVE_PROMO_CODE](this.cart?.voucherCode);
    this.promoCode = "";
  }

  get calculations() {
    return cartCalculations(this.cart);
  }

  get currentRouteName() {
    return (
      this.$route.name == "user-checkout" &&
      this.$route.matched.some(({ name }) => name === "user-checkout")
    );
  }

  onToggleCart() {
    this.$emit("toggle-cart");
  }

  showPromoSection() {
    this.isPromoApplied = !this.isPromoApplied;
  }

  onProceed() {
    if (this.$route.name === "user-checkout") {
      this.onToggleCart();
    } else {
      this.$router.push({ name: "user-checkout" });
    }
  }

  mounted() {
    // let cartDetails = this.$refs.cart;

    if (process.browser && window) {
      let vh = window.innerHeight * 0.01;
      (document.documentElement as any).style.setProperty("--vh", `${vh}px`);
      window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        (document.documentElement as any).style.setProperty("--vh", `${vh}px`);
      });
    }
  }
}
</script>
<style scoped lang="scss">
.cart-section {
  position: fixed;
  top: 0px;
  right: 0;
  // min-height: 100%;
  width: 100%;
  z-index: 5;
  overflow-y: hidden !important;
  display: flex;
  justify-content: flex-end;
  z-index: 20;
  // @include mediaXs {
  //   top: 70px;
  // }

  #cart-bg {
    background: rgba(0, 0, 0, 0.3);
    height: calc(100vh - 0px);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    @include mediaSm {
      display: none;
    }
  }

  @media only screen and (max-width: 991.98px) {
    top: 0px;
  }

  .cart-details {
    width: 600px;
    background: #fff;
    overflow-y: hidden;
    overflow-x: hidden;
    position: relative;
    // padding: 3rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    font-family: $font-family-h;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    @media only screen and (max-width: 767.98px) {
      width: 100%;
    }

    @include iPad {
      width: 100% !important;
    }
    // @include mediaXs {
    //   padding: 1.5rem;
    //   padding-bottom: 0;
    //   height: calc(100vh - 70px);
    // }

    // @media only screen and (max-width: 991.98px) {
    //   height: calc(100vh - 0px);
    // }
  }

  header {
    padding-top: 2rem;
    padding-bottom: 2rem;
    border: 1px solid #dbdbdb;
    @include mediaXs {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }

    .header-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin: 0 auto;
      p {
        color: #0f1326;
        text-transform: capitalize;
        font-size: 1.5rem;
        font-family: $font-family-h;
        font-weight: 500;
        @include mediaXs {
          font-size: 1rem;
        }

        span {
          font-weight: 400;
        }
      }
    }
  }
}

.footer-bottom-section {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.promo-code {
  min-height: 60px;
  background: #f6f6f6;
  display: flex;
  align-items: center;
  @include mediaXs {
    margin-bottom: 70px;
  }
  @include iPad {
    margin-bottom: 0;
  }

  .promo-code-form {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    button {
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.9rem;
      text-transform: uppercase;
      font-family: $font-family-h;
      font-weight: 400;
      text-align: right;
      cursor: pointer;
    }
  }
}

.applied-promo {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  font-family: $font-family-h;
  p {
    font-weight: 500;
    span {
      font-weight: 600;
      text-transform: uppercase;

      .currency-sign {
        text-transform: capitalize;
      }
    }
  }

  a {
    font-weight: 400;
    text-transform: uppercase;
    font-size: 0.9rem;
  }
}

input[type="text"] {
  font-size: 14px;
  font-weight: 400;
  font-family: $font-family-h;
  flex-basis: 75%;
  border: 1px solid #c8c8c8; /* Remove the default border */
  background: #f9f9f9;
  color: $color-secondary;
  transition: color 0.3s ease-out;
  background: #e4e4e4;
  height: 40px;
  padding: 0px 15px;
  outline: none;

  &::placeholder {
    color: #414141;
    font-size: 0.9rem;
    font-family: $font-family-h;
    font-weight: 400;
  }
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: 1px solid #c8c8c8;
  outline: none;
}

.proceed-btn {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  font-size: 1.125rem;
  font-family: $font-family-h;
  font-weight: 600;
  @include mediaXs {
    font-size: 0.9rem;
  }
}

.list-body {
  color: #000;
  // flex: 1 0 auto;
  margin-top: 20px;
  overflow: hidden;
  overflow-y: auto;
  // height: calc(99vh - 100px);
}

.total {
  color: #000;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
  .sub-total {
    margin-bottom: 12px;
    p {
      text-transform: uppercase;
      font-size: 17px;
      letter-spacing: 2px;
      font-weight: 300;
      font-family: $font-family-h;
      @include mediaXs {
        font-size: 14px;
      }
    }
  }

  .vat {
    color: #000;
  }

  .span-text {
    font-size: 14px;
  }

  .total-price {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    p {
      @include mediaXs {
        font-size: 14px;
      }
    }
  }
}

.vat-total {
  .sub-total,
  .vat {
    p {
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 300;
      font-family: $font-family-h;

      @include mediaXs {
        font-size: 14px;
      }
    }
  }
}

.grand-total {
  padding-top: 20px;
  margin-top: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.checkout-btn {
  color: #fff !important;
  display: block;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 1.3px;
  text-align: center;
  // padding-bottom: 1rem;
  // padding-top: 1rem;
  min-height: 70px;
  display: flex;
  align-items: center;
  background: #0f1326;
  @include mediaXs {
    font-size: 15px;
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}

.line {
  width: 600px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: 98px;
  right: 0;
  @include mediaXs {
    bottom: 115px;
  }
}
</style>
