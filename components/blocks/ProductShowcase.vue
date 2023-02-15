<template>
  <div class="product-showcase">
    <div class="section-two">
      <NewArrival :comp-data="compData" />
    </div>
    <FeaturedProducts :comp-data="compData" />
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import NewArrival from './NewArrival.vue';
import FeaturedProducts from './FeaturedProducts.vue';
@Component({
  name: 'ProductShowCase',
  components: {
    NewArrival,
    FeaturedProducts,
  },
})
export default class ProductShowCase extends Vue {
  @Prop() compData: any;
}
</script>
<style scoped lang="scss">
.product-showcase {
  margin-bottom: $section-margin;

  @include mediaSm {
    margin-top: 150px;
  }

  // overflow: hidden;
}
</style>