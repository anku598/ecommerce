<template>
  <li>
    <div class="item-card">
      <div class="quantity-btn-cart">
        <QuantityButtonCartItem
          v-model="quantity"
          @input="handleQuantityChange"
        />
      </div>
      <div class="cart-img">
        <img :src="cartItem.variant.product.thumbnail.url" alt="Cart Image" />
      </div>
      <div v-if="cartItem != null" class="product-details">
        <article>
          <!-- <span>{{ item.product_variant.product.category.name }}</span> -->
          <span class="item-code">Item Code : {{ cartItem.variant.sku }}</span>
          <h3>
            {{ cartItem.variant.product.name }}
            <span class="count" v-if="quantity > 1">
              {{ ` x ${quantity}` }}
            </span>
          </h3>
          <span class="span-text">{{ attributeDescription }}</span>
        </article>
        <footer>
          <p class="price">
            {{
              formatMoney(
                calculations.mainValue - calculations.taxValue,
                calculations.currency
              )
            }}
            <!-- <span class="vat span-text"> + VAT {{ calculations.tax }} </span> -->
          </p>
          <a href="#" @click.prevent="onRemove" class="remove-btn">Remove</a>
        </footer>
      </div>
    </div>
  </li>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { CheckoutLine, TaxedMoney, VariantPricingInfo } from '~/graphqlTypes';
import {
  createAttributeDescription,
  DEFAULT_TAX_VALUE_PRICE,
} from '~/utils/sells';
import { REMOVE_FROM_CART, UPDATE_CART } from '~/utils/store/actions.names';
import { namespaced, NS_USER } from '~/utils/store/namespaces.names';
import { createTaxedMoneyPrice, formatMoney } from '../../utils/sells';

import { debounce } from 'vue-debounce';

@Component({
  name: 'CartItem',
  components: {},
})
export default class CartItem extends Vue {
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
    this.quantity = this.cartItem.quantity;
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
li {
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 20px !important;
  height: 160px;
  &:last-child {
    margin-bottom: 60px !important;
  }
}

.item-card {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 15px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
}

.cart-img {
  max-width: 90px;
  flex: 1;
  padding: 3px;
  border: 1px solid #2e2e2e;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 2;
  margin-left: 20px;
  @include mediaXs {
    padding-left: 15px;
  }
  .item-code {
    color: #919191 !important;
    text-transform: uppercase;
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 0.7rem;
    &.span-text {
      font-size: 12px;
    }
    @include mediaXs {
      margin-bottom: 5px;
      display: inline-block;
      font-size: 14px;
    }
  }

  .span-text {
    font-size: 12px !important;
  }

  h3 {
    margin: 0;
    font-size: 1rem;
    margin-top: 2px;
    margin-bottom: 2px;
    font-family: $font-family-h;
    font-weight: 400;
    text-transform: uppercase;
    color: #2e2e2e;
    text-transform: capitalize;
    @include mediaXs {
      font-size: 0.8rem;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #000;

    .price {
      font-size: 1rem;
      color: #2e2e2e;
      font-family: $font-family-h;
      text-transform: capitalize;
      font-weight: 400;
      @include mediaXs {
        font-size: 0.8rem;
      }
    }

    .remove-btn {
      font-family: $font-family-h;
      font-weight: 400;
      text-transform: uppercase;
      font-size: 0.9rem;
      color: #2e2e2e;
      @include mediaXs {
        font-size: 0.8rem;
      }
    }
  }
}

.count,
.vat {
  color: gray;
}

.span-text {
  font-size: 14px;
}

.count {
  text-transform: initial;
}
</style>
