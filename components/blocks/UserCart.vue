<template>
  <li>
    <div class="cart-img">
      <img
        :src="cartItem.variant.product.thumbnail.url"
        :alt="cartItem.variant.product.name"
      />
    </div>
    <div class="product-details">
      <div>
        <span class="category">{{
          cartItem.variant.product.category.name
        }}</span>
        <h3>{{ cartItem.variant.product.name }}</h3>
        <p>{{ attributeDescription }}</p>
      </div>
      <footer>
        <p class="price">
          {{
            formatMoney(
              calculations.mainValue - calculations.taxValue,
              calculations.currency
            )
          }}
        </p>

        <p>QTY {{ quantity }}</p>
      </footer>
    </div>
  </li>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { CheckoutLine } from '~/graphqlTypes';
import { createAttributeDescription, formatMoney } from '~/utils/sells';
import { REMOVE_FROM_CART, UPDATE_CART } from '~/utils/store/actions.names';
import { namespaced, NS_USER } from '~/utils/store/namespaces.names';
@Component({
  name: 'UserCart',
  components: {},
})
export default class UserCart extends Vue {
  @Prop() cartItem!: CheckoutLine;
  @Prop() calculations!: any;
  quantity: number = 1;
  @Action(namespaced(NS_USER, REMOVE_FROM_CART)) [REMOVE_FROM_CART]!: any;
  @Action(namespaced(NS_USER, UPDATE_CART)) [UPDATE_CART]!: any;
  formatMoney = formatMoney;

  onRemove() {
    this[REMOVE_FROM_CART](this.cartItem.id);
  }

  handleQuantityChange(val: number) {
    // console.log('Change', val);
    this[UPDATE_CART]([{ variantId: this.cartItem.variant.id, quantity: val }]);
    // return debounce(() => {
    //   // console.log("Change", val);

    // }, 300);
  }

  @Watch('cartItem', { deep: true, immediate: true })
  handleCartItemChange(val: CheckoutLine, oldVal: CheckoutLine) {
    if (oldVal == undefined || val.quantity != oldVal.quantity) {
      this.quantity = val.quantity;
    }
  }

  get attributeDescription() {
    if (!this.cartItem) {
      return '';
    } else {
      return createAttributeDescription(this.cartItem.variant);
    }
  }
}
</script>
<style scoped lang="scss">
.cart-img {
  max-width: 90px;
  flex-basis: 22%;
  img {
    width: 100%;
    object-fit: cover;
  }
}

.product-details {
  flex-basis: 78%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    @include productTitle;
    font-weight: 500;
    font-size: 1.1rem !important;
  }
  span {
    color: #919191;
    font-family: $font-family-h;
    font-weight: 500;
    text-transform: uppercase;
    @include mediaXs {
      font-size: 0.8rem;
    }
  }

  .category {
    font-size: 0.8rem;
  }

  p {
    font-size: 0.8rem;
    font-family: $font-family-h;

    @include mediaXs {
      font-size: 0.8rem;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;
    @include mediaXs {
      margin-top: 20px;
    }
  }
}
</style>
