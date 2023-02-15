<template>
  <router-link
    :to="{
      name: 'product-collection',
      params: { slug: compData.product.slug },
    }"
  >
    <div class="s-product-image">
      <img :src="this.imageURL" alt="Featured Image" />
    </div>
    <p class="s-catagory-name">{{ compData.product.category.name }}</p>
    <p class="s-product-name">{{ compData.product.name }}</p>
  </router-link>
</template>

<script lang ='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Getter } from "vuex-class";

@Component({
  name: "ShopTheCollectionImage",
  components: {},
})
export default class ShopTheCollectionImage extends Vue {
  @Prop() compData: any;
  @Prop() product: any;
  get HOST() {
    return (process as any).env.HOST;
  }

  get imageURL(): string {
    if (this.compData.override_image) {
      return this.HOST + this.compData.override_image.original.src;
    } else {
      let image = this.compData.product.images.find((val: any) => val.default);
      if (image != undefined) {
        return this.HOST + image.image;
      } else {
        return this.HOST + this.compData.product.images[0].image;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.s-product-image {
  // position: relative;
  // overflow: hidden;
  // width: 100%;
  // height: 100%;
  // padding-bottom: 120%;
  // margin-bottom: 20px;
  // img {
  //   position: absolute;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;
  //   object-fit: cover;
  //   object-position: top center;
  // }
}

.s-catagory-name {
  color: #919191;
  font-family: $font-family-h;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1.2px;

  @include mediaLg {
    font-size: 16px;
    margin-bottom: 6px;
  }
}
.s-product-name {
  font-family: $font-family-h;
  margin-top: 13px;
  text-transform: capitalize;
  color: #2e2e2e;
  font-size: 1.4rem;
  font-weight: 600;
  @include mediaXs {
    font-size: 18px;
  }
  @include mediaLg {
    font-size: 18px;
    margin-top: 0;
  }

  @include mediaMd {
    font-size: 18px;
  }
}

img {
  margin-bottom: 20px;
  width: 100%;
}
</style>
