<template>
  <tr scope="row" class="d-flex">
    <td class="col-12 col-sm-9 col-md-7 col-xl-7 col-lg-7">
      <ul>
        <li>
          <div class="cart-img">
            <img
              :src="cartItem.variant.product.thumbnail.url"
              alt="Cart Image"
            />
          </div>
          <div class="product-row-details">
            <div>
              <span
                >{{ cartItem.variant.product.category.name }} |
                {{ attributeDescription }}</span
              >
              <h3>{{ cartItem.variant.product.name }}</h3>
            </div>
            <div class="remove-btn" @click.prevent="onRemove">Remove</div>
          </div>
        </li>
      </ul>
    </td>
    <td class="col-5 col-sm-5 col-md-2 col-xl-2 col-lg-2">
      <div class="quantity">
        <QuantityButton
          v-model="quantity"
          @input="handleQuantityChange"
        ></QuantityButton>
      </div>
    </td>
    <td class="col-5 col-sm-5 col-md-2 col-xl-2 col-lg-2 price-column">
      <p>
        {{
          formatMoney(
            calculations.mainValue - calculations.taxValue,
            calculations.currency
          )
        }}
      </p>
      <!-- <span class="vat">
        +
        VAT
        {{
        new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: item.price.currency.short_code,
        }).format(
        (Number.parseFloat(item.price.calculated) / 100) *
        Number.parseFloat(item.product_variant.product.tax_rate) *
        item.count
        )
        }}
      </span>-->
    </td>
  </tr>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { CheckoutLine } from '~/graphqlTypes';
import { createAttributeDescription } from '~/utils/sells';
import { REMOVE_FROM_CART, UPDATE_CART } from '~/utils/store/actions.names';
import { namespaced, NS_USER } from '~/utils/store/namespaces.names';
import { formatMoney } from '../../utils/sells';
@Component({
  name: 'CartItemRow',
  components: {},
})
export default class CartItemRow extends Vue {
  @Prop() cartItem!: CheckoutLine;
  @Prop() calculations!: any;
  quantity: number = 1;
  @Action(namespaced(NS_USER, REMOVE_FROM_CART)) [REMOVE_FROM_CART]!: any;
  @Action(namespaced(NS_USER, UPDATE_CART)) [UPDATE_CART]!: any;

  onRemove() {
    this[REMOVE_FROM_CART](this.cartItem.id);
  }

  formatMoney = formatMoney;

  handleQuantityChange(val: number) {
    // console.log('Change', val);
    this[UPDATE_CART]([
      { variantId: this.cartItem.variant.id, quantity: val },
    ]).then(() => {
      this.quantity = this.cartItem.quantity;
    });
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
tr {
  &:last-child {
    td {
      border-bottom: 1px solid #dee2e6 !important;
    }
  }
  td {
    vertical-align: middle;
    color: $color-secondary;
    font-family: $font-family-h;
    font-weight: 500;
    text-transform: capitalize;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &:first-child {
      padding-left: 0;
      align-items: flex-start;
    }

    &:last-child {
      padding-right: 0;
    }

    // p {
    //   max-width: 30%;
    //   margin: 0 auto;
    // }
  }
  .cart-img {
    max-width: 90px;
    flex-basis: 25%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .product-row-details {
    flex-basis: 75%;
    margin-left: 15px;
    @include mediaXs {
      padding-left: 15px;
    }
    h3 {
      @include productTitle;
      font-size: 1rem;
    }
    span {
      color: #919191;
      font-family: $font-family-h;
      font-weight: 500;
      @include mediaXs {
        margin-bottom: 5px;
        display: inline-block;
        font-size: 14px;
      }
    }
  }

  .color-circle {
    width: 15px;
    height: 15px;
    background: #fed27b;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .color-name {
    color: #919191;
    font-family: $font-family-h;
    font-weight: 500;
  }
}

.remove-btn {
  color: #919191;
  font-family: $font-family-h;
  font-weight: 400;
  text-transform: uppercase;
  @include mediaXs {
    margin-top: 30px;
    font-size: 0.7rem;
  }
}

.price-column {
  align-items: center;
}

ul {
  li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}
</style>
