<template>
  <div class="order-details-wrap">
    <div class="row">
      <div class="col-md-12 col-lg-3 col- col-sm-12">
        <SideNav />
      </div>

      <div class="col-md-12 col-lg-9 col-sm-12">
        <div class="order-detail-page">
          <OrderInfo :order="order" />
          <OrderPageProductList :order="order" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import OrderByID from '~/apollo/users/queries/OrderByID.gql';
@Component({
  name: 'OrderDetails',
  components: {},
})
export default class OrderDetails extends Vue {
  async asyncData({ app, route }: any) {
    const client = app.apolloProvider.defaultClient;
    const orderReq = await client.query({
      query: OrderByID,
      variables: { id: route.params.id },
    });
    return { order: orderReq.data.order };
  }
}
</script>
<style scoped lang="scss">
.order-details-wrap {
  width: 80%;
  margin: 160px auto;
}
</style>
