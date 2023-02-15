<template>
  <div class="placed-order">
    <div class="row">
      <div class="col-md-12">
        <div class="confirmation-message">
          <p>
            <img src="@/assets/img/succes-icon.svg" alt /> Your order has been
            placed
          </p>
          <h2>Thank You For Purchasing From Us</h2>
        </div>

        <OrderInfo v-if="order" :order="order.data.orderByToken" />

        <div class="order-invoices">
          <nuxt-link to="/" class="btn">Browse More</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import OrderByToken from "~/apollo/users/queries/OrderByToken.gql";

@Component({
  name: "OrderPlaced",
  components: {},
})
export default class OrderPlaced extends Vue {
  async asyncData({ app, route, redirect }: any) {
    const client = app.apolloProvider.defaultClient;
    let order = await client
      .query({
        query: OrderByToken,
        variables: { token: route.params.id },
      })
      .catch((e: any) => {
        // redirect("/");
      });
    return { order };
  }
}
</script>
<style scoped lang="scss">
.placed-order {
  min-height: calc(100vh - 123px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: $section-margin;
}

.confirmation-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fafaf5;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 0;
  margin-bottom: $section-margin;
  p {
    display: flex;
    color: #6cbc00;
    font-family: $font-family-base;
    align-items: center;
    margin-bottom: 1rem;
    img {
      margin-right: 15px;
      width: 30px;
    }
  }

  h2 {
    font-family: $font-family-base;
    text-transform: capitalize;
    color: $color-secondary;
  }
}
</style>
