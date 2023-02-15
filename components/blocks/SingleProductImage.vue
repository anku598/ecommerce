<template>
  <nuxt-link
    tag="div"
    :to="{ name: 'store-products-slug', params: { slug: product.slug } }"
    class="single-product-img"
    v-if="product"
  >
    <div class="slide-img">
      <div class="hover-img">
        <img :src="imageURL[0]" alt="Featured Image" />
      </div>
    </div>

    <p v-if="product.category" class="category">
      {{ product.category.name }}
    </p>
    <p class="title">{{ product.name }}</p>
    <!-- <p class="price">{{ priceString }}</p> -->
    <p
      class="desc"
      v-for="(short_desc, idx) in compData.metadata"
      :key="'short_desc' + idx"
      v-if="short_desc.key == 'short_description'"
    >
      {{ short_desc.value }}
    </p>
  </nuxt-link>
  <!-- <div>Single Product</div> -->
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'SingleProductImage',
  components: {},
})
export default class SingleProductImage extends Vue {
  @Prop() compData: any;
  @Prop() product: any;
  get HOST() {
    return process.env.HOST;
  }

  // get imageURL(): string {
  //   if (this.compData.override_image) {
  //     return this.HOST + this.compData.override_image.original.src;
  //   } else {
  //     let image = this.compData.product.images.find((val: any) => val.default);
  //     if (image != undefined) {
  //       return this.HOST + image.image.original;
  //     } else {
  //       return this.HOST + this.compData.product.images[0].image.original;
  //     }
  //   }
  // }

  get imageURL(): string {
    return this.product.images.map((img: any) => {
      return img.url;
    });
  }
}
</script>
<style scoped lang="scss">
.single-product-img {
  .slide-img {
    height: 75vh;
    width: 100%;
    margin-bottom: 15px;
    overflow: hidden;
    @media (min-width: 769px) and (max-width: 1170.98px) {
      height: 50vh !important;
    }

    @media (max-width: 768px) {
      height: auto;
    }

    .hover-img {
      width: 100%;
      height: 100%;

      transform: scale(1);
      transition: transform 0.5s ease-in-out;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        transform: scale(1.1);
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
      }
    }
  }
}

.category {
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 1.3px;
  // @include mediaXs {
  //   margin-bottom: 18px !important;
  // }
}

.title {
  font-size: 1.5rem;
  font-weight: 500;
  margin: 6px 0 14px;

  @include mediaXs {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 6px 0 2px;
  }
}

.price {
  font-size: 1rem;
  font-weight: 300;
}

.desc {
  text-transform: capitalize;
  font-family: $font-family-h;
  font-weight: 300;
  font-size: 1.1rem;
  color: #2e2e2e;
  max-width: 80%;
  line-height: 28px;

  @include mediaSm {
    margin: 0 auto;
  }
}

img {
  width: 100%;
}
</style>
