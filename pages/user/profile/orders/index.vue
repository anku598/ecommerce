<template>
  <div>
    <div class="order-list">
      <div class="sort-option">
        <div class="row">
          <div class="col-md-12 col-lg-3 col- col-sm-12">
            <SideNav />
          </div>
          <div class="col-md-12 col-lg-9 col-sm-12">
            <h2>Your orders</h2>
            <div class="sorting-bar">
              <!-- <div class="dropdown-btn">
                <div
                  class="default-header"
                  @click.prevent="sortOption = !sortOption"
                >
                  <p href="#">SORT BY: Price High to Low</p>
                  <div
                    class="s-dropdown-icon"
                    :class="{ isActive: sortOption == true }"
                  >
                    <img src="@/assets/img/dropdown-icon.svg" alt />
                  </div>
                </div>

                <transition
                  name="expand"
                  @enter="enterSelectDropdown"
                  @after-enter="afterEnterSelectDropdown"
                  @leave="leaveSelectDropdown"
                >
                  <ul v-if="sortOption">
                    <li
                      v-for="(option, idx) in options"
                      :key="'f' + idx"
                      @click="sortOption = !sortOption"
                    >
                      <p>{{ option.text }}</p>
                    </li>
                  </ul>
                </transition>
              </div> -->

              <!-- <div class="sort-by-date">
                <p>Sort By date</p>
              </div>-->
            </div>

            <div
              class="list-item table-responsive-xl table-responsive-lg table-responsive-md table-responsive-sm"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th class="list-head-item" scope="col">Order date</th>
                    <th class="list-head-item" scope="col">Order Number</th>
                    <th class="list-head-item" scope="col">
                      Number of products
                    </th>
                    <th class="list-head-item" scope="col">Total Price</th>
                    <th class="list-head-item" scope="col">Status</th>
                    <th class="list-head-item" scope="col"></th>
                  </tr>
                </thead>
                <tbody class="list-body">
                  <tr
                    scope="row"
                    v-for="(order, idx) in orders.edges"
                    :key="'list' + idx"
                  >
                    <td>{{ standardDate(order.node.created) }}</td>
                    <td>{{ order.node.number }}</td>
                    <td>{{ getQuanitity(order.node.lines) }}</td>
                    <td>
                      {{ order.node.total.currency }}
                      {{ order.node.total.gross.amount }}
                    </td>
                    <td>
                      {{ order.node.statusDisplay }}
                    </td>
                    <td class="order-btn">
                      <router-link
                        :to="{
                          name: 'user-profile-orders-id',
                          params: { id: order.node.id },
                        }"
                        class="btn"
                        >Order Details</router-link
                      >
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
import {
  TimelineMax,
  gsap,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
} from "gsap/all";
import isAuth from "~/middleware/isAuth";
import Orders from "~/apollo/users/queries/Orders.gql";
import { standardDate } from "../../../../utils/date";
import { OrderLine } from "../../../../graphqlTypes";

@Component({
  name: "OrderPage",
  components: {},
  middleware: [isAuth],
})
export default class OrderPage extends Vue {
  async asyncData({ app }: any) {
    const client = app.apolloProvider.defaultClient;
    const orderReq = await client.query({
      query: Orders,
      variables: { pageSize: 10 },
    });
    return { orders: orderReq.data.me.orders };
  }
  standardDate = standardDate;

  getQuanitity(lines: OrderLine[]) {
    let q = 0;
    for (let num = 0; num < lines.length; num++) {
      const line = lines[num];
      q += line.quantity;
    }
    return q;
  }

  enterSelectDropdown(el: any) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = 0;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = height;
    });
  }

  afterEnterSelectDropdown(el: any) {
    el.style.height = "auto";
  }

  leaveSelectDropdown(el: any) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = 0;
    });
  }
}
</script>
<style scoped lang="scss">
h2 {
  font-family: $font-family-h;
  margin-bottom: 2rem;
  text-transform: capitalize;
}
select {
  width: 150px;
  padding: 5px 35px 5px 5px;
  display: block;
  font-size: 16px;
  border: 1px solid rgba(112, 112, 112, 0.5);
  height: 34px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("../../../../assets/img/drop-down-icon.svg") 85% / 10%
    no-repeat #fff;
  cursor: pointer;
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 14px;
  text-transform: capitalize;
  padding-left: 10px;
}

select::-ms-expand {
  display: none; /* Remove default arrow in Internet Explorer 10 and 11 */
}

.sorting-bar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 25px;
  @include mediaSm {
    display: none;
  }

  .dropdown-btn {
    position: relative;
    width: 250px;
    border: 1px solid lighten($color: $color-lightgray, $amount: 30);
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 0.95rem;
    color: $color-dark-blue;
    cursor: pointer;

    .default-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 15px;
      .s-dropdown-icon {
        width: 12px;
        transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
        &.isActive {
          transform: rotate(180deg);
        }
      }
    }

    ul {
      position: absolute;
      top: 102%;
      transform: translateY(-50);
      z-index: 5;
      background: #fff;
      width: 100%;
      left: 0;
      -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
      li {
        padding: 12px 15px;
        transition: all 0.5s ease-out;
        &:hover {
          background: #f6f6f6;
        }
        a {
          color: $font-family-h;
          font-family: $font-family-h;
          font-weight: 400;
          font-size: 15px;
          text-transform: initial;
        }
      }
    }
  }
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

  &:last-child {
    padding-right: 0;
    text-align: right;
  }
}

.list-body {
  tr {
    td {
      vertical-align: middle;
      text-align: center;
      color: $color-secondary;
      font-family: $font-family-h;
      font-weight: 500;
      text-transform: capitalize;
      font-size: 14px;
      &:first-child {
        padding-left: 0;
        text-align: left;
      }

      &:last-child {
        padding-right: 0;
        text-align: right;
      }
    }
  }
}

.order-list {
  width: 80%;
  margin: 160px auto;
  height: auto;
  @include mediaSm {
    margin: 50px auto;
    width: 90%;
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

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}
</style>
