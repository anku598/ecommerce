<template>
  <div>
    <div class="order-page-product-list" v-if="order">
      <div class="product-detail">
        <div class="row">
          <div class="col-md-12 pl-0">
            <div class="list-item table-responsive info-table">
              <table class="table">
                <thead>
                  <tr class="d-flex">
                    <th class="list-head-item col-8" scope="col">Product</th>
                    <th class="list-head-item col-2" scope="col">Quantity</th>
                    <th class="list-head-item col-2" scope="col">Prices</th>
                  </tr>
                </thead>
                <tbody class="list-body">
                  <tr
                    scope="row"
                    class="d-flex"
                    v-for="(item, idx) in order.lines"
                    :key="`item-${idx}`"
                  >
                    <td class="col-8">
                      <ul>
                        <li>
                          <div class="cart-img">
                            <img
                              :src="item.thumbnail.url"
                              :alt="item.productName"
                            />
                          </div>
                          <div class="product-details">
                            <span>{{
                              item.variant.product.category.name
                            }}</span>
                            <h3>{{ item.productName }}</h3>
                            <p>
                              {{ createAttributeDescription(item.variant) }}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </td>

                    <td class="col-2">
                      <p>{{ item.quantity }}</p>
                    </td>
                    <td class="col-2">
                      <p>
                        {{
                          formatMoney(
                            calculations.lines[idx].mainValue -
                              calculations.lines[idx].taxValue,
                            calculations.lines[idx].currency
                          )
                        }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div class="order-invoices">
                <div></div>
                <!-- <a href="#" class="btn">Invoice Download</a> -->
                <ul class="price-total">
                  <li>
                    <p>Sub total</p>
                    <p>
                      {{
                        formatMoney(
                          calculations.subTotal.mainValue -
                            calculations.taxValue,
                          calculations.currency
                        )
                      }}
                    </p>
                  </li>
                  <li v-if="order.discount && order.discount.amount > 0">
                    <p>Discount</p>
                    <p>
                      {{
                        formatMoney(
                          order.discount.amount,
                          calculations.currency
                        )
                      }}
                    </p>
                  </li>
                  <li v-if="calculations.taxValue">
                    <p>VAT</p>
                    <p>
                      {{
                        formatMoney(
                          calculations.taxValue,
                          calculations.currency
                        )
                      }}
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
                    <p>{{ calculations.total.main }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Order, OrderLine, TaxedMoney } from "~/graphqlTypes";
import { createTaxedMoneyPrice } from "~/utils/sells";
import { formatMoney, createAttributeDescription } from "../../utils/sells";
@Component({
  name: "OrderPageProductList",
  components: {},
})
export default class OrderPageProductList extends Vue {
  @Prop() order!: Order;
  formatMoney = formatMoney;
  createAttributeDescription = createAttributeDescription;

  get calculations() {
    const data: any = {
      currency: "",
      lines: [],
      tax: "",
      total: "",
      subTotal: "",
    };

    if (this.order != null || this.order != undefined) {
      const currency = this.order.total?.currency;
      data.total = createTaxedMoneyPrice(this.order.subtotal as TaxedMoney);
      data.subTotal = createTaxedMoneyPrice(this.order.total as TaxedMoney);
      data.shipping = createTaxedMoneyPrice(
        this.order.shippingPrice as TaxedMoney
      );
      let tax = 0;
      const lines = this.order.lines;
      if (lines) {
        for (let lIdx = 0; lIdx < lines.length; lIdx++) {
          const line = lines[lIdx] as OrderLine;

          const price = createTaxedMoneyPrice(line.totalPrice as TaxedMoney);

          let vVat: number = line.totalPrice?.tax.amount as number;
          vVat = parseFloat(vVat.toFixed(2));
          price.currency = currency;
          price.taxValue = vVat;
          price.tax = this.formatMoney(vVat, currency as string);
          data.lines.push(price);
          tax += vVat;
        }
      }
      tax = parseFloat(tax.toFixed(2));
      data.tax = this.formatMoney(tax, currency as string);
      data.taxValue = tax;
      data.currency = currency;
    }
    return data;
  }
}
</script>
<style scoped lang="scss">
.order-detail {
  margin-bottom: 5rem;
}
.info-table {
  word-wrap: break-word;
}
h2 {
  margin-bottom: 2rem;
}

.list-item {
  margin-top: 2rem;

  .table-header,
  .list-items {
    justify-content: space-between;
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
  tr {
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
  }
}

.order-btn {
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 0.7rem 0.5rem;
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

.cart-img {
  max-width: 90px;
  flex-basis: 25%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.product-details {
  flex-basis: 75%;
  margin-left: 15px;
  h3 {
    @include productTitle;
    font-weight: 500;
  }
  @include mediaXs {
    padding-left: 15px;
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

.order-invoices {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  align-items: flex-end;
  @include mediaXs {
    margin-top: 0rem;
  }

  ul {
    flex-direction: column;
    flex-basis: 30%;
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

      @include mediaXs {
        font-size: 0.8rem;
        padding: 0.8rem;
      }
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
</style>
