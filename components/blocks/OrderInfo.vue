<template>
  <div>
    <div class="order-list" v-if="order">
      <h2>Order Detail</h2>
      <div class="order-detail">
        <div class="row">
          <div class="col-md-12 pl-0">
            <div class="list-item table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="list-head-item" scope="col">Order date</th>
                    <th class="list-head-item" scope="col">Order Number</th>
                    <th class="list-head-item" scope="col">
                      Number of products
                    </th>
                    <th class="list-head-item" scope="col">Payment</th>
                    <th class="list-head-item" scope="col">Delivary Date</th>
                    <th class="list-head-item" scope="col">Status</th>
                  </tr>
                </thead>
                <tbody class="list-body">
                  <tr scope="row">
                    <td>{{ standardDate(order.created) }}</td>
                    <td>{{ order.number }}</td>
                    <td>{{ totalQuantity }}</td>
                    <td>{{ order.paymentStatusDisplay }}</td>
                    <td>Estd. 2 Apr, 2020</td>
                    <td>{{ order.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="order-detail">
        <div class="row">
          <div class="col-md-12 pl-0">
            <div class="list-item table-responsive info-table">
              <table class="table">
                <thead>
                  <tr class="d-flex">
                    <th class="list-head-item col-3" scope="col">name</th>
                    <th class="list-head-item col-3" scope="col">
                      Contact Mail
                    </th>
                    <th class="list-head-item col-3" scope="col">
                      Shipping Address
                    </th>
                    <th class="list-head-item col-3" scope="col">
                      Billing Address
                    </th>
                  </tr>
                </thead>
                <tbody class="list-body">
                  <tr scope="row" class="d-flex">
                    <td class="col-3">{{ fullName }}</td>
                    <td class="col-3">{{ order.user.email }}</td>
                    <td class="col-3">
                      <!-- <h3>
                        {{ order.shippingAddress.firstName }}
                        {{ order.shippingAddress.lastName }}
                      </h3> -->
                      <p>
                        {{ order.shippingAddress.streetAddress1 }},<br />
                        {{ order.shippingAddress.streetAddress2 }},<br />
                        {{ order.shippingAddress.city }},
                        {{ order.shippingAddress.country.country }}.<br />
                      </p>
                    </td>
                    <td class="col-3">
                      <p>
                        {{ order.billingAddress.streetAddress1 }},<br />
                        {{ order.billingAddress.streetAddress2 }},<br />
                        {{ order.billingAddress.city }},
                        {{ order.billingAddress.country.country }}.<br />
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Order, OrderLine } from "~/graphqlTypes";
import { standardDate } from "../../utils/date";
@Component({
  name: "OrderInfo",
  components: {},
})
export default class OrderInfo extends Vue {
  @Prop() order!: Order;
  standardDate = standardDate;

  get totalQuantity() {
    let val = 0;
    if (this.order) {
      this.order.lines.map((l: any) => {
        val += l.quantity;
      });
    }
    return val;
  }

  get fullName() {
    if (this.order) {
      if (this.order.user?.firstName || this.order.user?.lastName) {
        return [this.order.user?.firstName, this.order.user?.lastName].join(
          " "
        );
      } else {
        return [
          this.order.billingAddress?.firstName,
          this.order.billingAddress?.lastName,
        ].join(" ");
      }
    } else {
      return "";
    }
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
  margin-bottom: 0rem;
  font-family: $font-family-h;
  font-weight: 700;
  text-transform: capitalize;
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
  text-align: left;
  vertical-align: middle;
  color: #7b7b7b;
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  &:first-child {
    padding-left: 0;
  }
}

.list-body {
  tr {
    td {
      vertical-align: middle;
      text-align: left;
      color: $color-secondary;
      font-family: $font-family-h;
      font-weight: 500;
      text-transform: capitalize;
      font-size: 14px;
      &:first-child {
        padding-left: 0;
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
</style>
