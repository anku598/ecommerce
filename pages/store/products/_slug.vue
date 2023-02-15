<template>
  <div class="product-index-details">
    <!-- <div class="indicator-btn">
      <div class="next-product">
        <svg
          id="Component_2_8"
          data-name="Component 2 – 8"
          xmlns="http://www.w3.org/2000/svg"
          width="16.24"
          height="8.477"
          viewBox="0 0 16.24 8.477"
        >
          <g id="Group_580" data-name="Group 580" transform="translate(-51.748 8.477) rotate(-90)">
            <g id="arrow-drop-down" transform="translate(0 63.75)">
              <path
                id="Path_29"
                data-name="Path 29"
                d="M0,63.75l4.238,4.238L8.477,63.75Z"
                transform="translate(0 -63.75)"
                fill="#b8b8b8"
              />
            </g>
          </g>
          <path
            id="Path_197"
            data-name="Path 197"
            d="M0,0H13V2H0Z"
            transform="translate(0 3.188)"
            fill="#b8b8b8"
          />
        </svg>
      </div>
      <div class="prev-product">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16.24"
          height="8.477"
          viewBox="0 0 16.24 8.477"
        >
          <g
            id="Component_2_7"
            data-name="Component 2 – 7"
            transform="translate(16.24 8.477) rotate(180)"
          >
            <g
              id="Group_580"
              data-name="Group 580"
              transform="translate(-51.748 8.477) rotate(-90)"
            >
              <g id="arrow-drop-down" transform="translate(0 63.75)">
                <path
                  id="Path_29"
                  data-name="Path 29"
                  d="M0,63.75l4.238,4.238L8.477,63.75Z"
                  transform="translate(0 -63.75)"
                  fill="#b8b8b8"
                />
              </g>
            </g>
            <path
              id="Path_197"
              data-name="Path 197"
              d="M0,0H13V2H0Z"
              transform="translate(0 3.188)"
              fill="#b8b8b8"
            />
          </g>
        </svg>
      </div>
    </div>-->
    <div class="product-top-info">
      <div class="page-info">
        <div class="producdata-breadcrumb">
          <p>
            <nuxt-link :to="{ name: 'store' }">Shop</nuxt-link>/
            <!-- <nuxt-link
              :to="{
                name: 'store-for-slug',
                params: { slug: productData.gender.slug },
              }"
              >{{ productData.gender.name }}</nuxt-link
            >/ -->
            <span ref="brd" class="brd-name">{{ productData.name }}</span>
          </p>
        </div>
      </div>
      <div class="product-number">
        <p>item code : {{ productData.sku }}</p>
      </div>
    </div>
    <div class="custom-margin inner-product">
      <div class="container-fluid p-0" v-if="productData.defaultImg.length > 1">
        <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 p-0">
            <ProductImageList :key="this.productData.id" :comp-data="images" />
          </div>
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">
            <div class="sticky">
              <IndividualProductSidebar
                :key="productData.id"
                :comp-data="productData"
                :description="description"
                :seo-description="seoDescription"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="one-image-wrapper" v-if="productData.defaultImg.length == 1">
        <div class="">
          <ProductImageList :key="productData.id" :comp-data="images" />
        </div>
        <div class="">
          <div class="sticky">
            <IndividualProductSidebar
              :key="productData.id"
              :comp-data="productData"
              :description="description"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- <h3>You may also like</h3> -->
    <!-- <div class="relevent-product">
      <div class="container-fluid p-0">
        <div class="row">
          <div
            class="col-md-4 col-sm-6 col-xl-3 mb-4 p-0"
            v-for="product in productData.related_products"
            :key="product.product.slug"
          >
            <div>
              <ShopSingleProduct :shop-product="product.product" />
            </div>
          </div>
        </div>
      </div>
    </div>-->

    <!-- <transition v-on:after-enter="afterEnter" appear>
      <div class="relevent-product">
        <div
          class="product-item"
          v-for="product in productData.related_products"
          :key="product.product.slug"
        >
          <div class="single-shop-reveal-product">
            <ShopSingleProduct
              :shop-products="product.product"
              img-version="list"
            />
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script lang='ts'>
import { SmartQuery } from "vue-apollo-decorators";
// import { ProductData } from '*/ProductData.gql';
import ProductData from "~/apollo/products/queries/ProductData.gql";
import { Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import { draftJSToHTML, stripHTML } from "~/utils/common";
import { namespaced, NS_SETTINGS } from "~/utils/store/namespaces.names";
import { SETTINGS } from "~/utils/store/getters.names";
@Component({
  name: "ProductDetail",
  components: {},
})
export default class ProductDetail extends Vue {
  productData: any | null = null;
  seoDescription: string = "";

  get images() {
    return {
      original: this.productData.originalImg,
      optimal: this.productData.optimalImg,
      default: this.productData.defaultImg,
      mobile: this.productData.mobileImg,
      mobileZoom: this.productData.mobileZoomImg,
    };
  }

  // get sku() {
  //   const skuMeta = this.productData.metadata.find((m: any) => {
  //     return m.key === "sku";
  //   });
  //   if (skuMeta) {
  //     return skuMeta.value;
  //   }
  //   if (this.productData.defaultVariant) {
  //     return this.productData.defaultVariant.sku;
  //   }
  //   return "";
  // }

  async asyncData({ app, route, redirect }: any) {
    const client = app.apolloProvider.defaultClient;

    const productDataReq = await client
      .query({
        query: ProductData,
        variables: { slug: route.params.slug },
      })
      .catch((e: any) => {
        // console.log(e);
      });

    const productData = productDataReq.data.product;

    if (productData === null) {
      redirect("/404");
    }
    const description = draftJSToHTML(productData.descriptionJson);
    return {
      productData,
      description,
      seoDescription: productData.seoDescription || stripHTML(description),
    };
  }
}
</script>
<style scoped lang="scss">
.product-index-details {
  width: 100%;
  margin: 0 auto;
  margin-bottom: $section-margin;
  margin-top: 223px;
  // @include mediaXs {
  //   width: 90%;
  // }

  @include mediaSm {
    margin-top: 180px;
  }
}

.producdata-breadcrumb {
  p {
    font-family: "Roboto";
    font-weight: 500;
    color: #2e2e2e;
    text-transform: capitalize;
    font-size: 15px !important;
    font-style: italic;

    @include mediaXs {
      font-size: 13px !important;
    }
  }
}

.one-image-wrapper {
  display: flex;
  justify-content: center;
  max-width: 55%;
  margin: 0 auto;
  @include mediaXs {
    flex-direction: column;
    max-width: 100%;
  }
}

.indicator-btn {
  position: absolute;
  right: 0;

  .prev-product,
  .next-product {
    width: 63px;
    height: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: #f6f6f6;
    transition: all 0.3s ease-out;
    &:hover {
      background: $color-dark-blue;
      svg {
        path {
          fill: #fff;
        }
      }
    }
  }

  .next-product {
    margin-bottom: 10px;
  }
}

h3 {
  font-family: $font-family-h;
  font-weight: 400;
  text-transform: inherit;
  font-size: 1.375rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 35px;
  position: relative;
  color: #2e2e2e;
  width: 95%;

  @include mediaXs {
    width: 90%;
  }
  &:before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    content: "";
    width: 40%;
    left: 0;
    height: 2px;
    background: #dbdbdb;
    @include mediaXs {
      width: 20%;
    }
  }

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    content: "";
    width: 40%;
    right: 0;
    height: 2px;
    background: #dbdbdb;
    @include mediaXs {
      width: 20%;
    }
  }
}

.relevent-product {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(316px, 1fr));
  grid-gap: 56px 40px;
  margin-bottom: $section-margin;
  width: 95%;
  margin: 0 auto;
  @include mediaXs {
    width: 90%;
  }

  // @include mediaXs {
  //   display: flex;
  //   flex-direction: column;
  //   width: 90%;

  //   .product-item {
  //     flex-basis: 50%;
  //   }
  // }

  @include mediaXs {
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
  }

  @include mediaSm {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @include mediaMd {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @include mediaLg {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (min-width: 1171px) and (max-width: 1422px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 1423px) and (max-width: 1700px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 2200px) {
    grid-gap: 56px 50px;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.inner-product {
  width: 95%;
  margin: 0 auto;
  margin-top: 195px;
  @include mediaXs {
    width: 90%;
    margin-top: 170px;
  }
}

.brd-name {
  text-transform: capitalize;
}

.sticky {
  position: relative;
  top: 0;

  @media screen and (min-width: 991.98px) {
    position: sticky;
    top: 295px;
    z-index: 5;
    // transition: all 3s ease;
  }
  // @include mediaMd {
  //   position: relative;
  //   top: 0;
  // }
  // @include mediaSm {
  //   position: relative;
  //   top: 0;
  // }
}

.custom-margin {
  margin-bottom: $section-margin;
}

.product-top-info {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 1rem 0rem;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  top: 123px;
  width: 100%;
  background: #fff;
  z-index: 10;
  align-items: center;
  @media screen and (min-width: 991.98px) {
    width: 100%;
  }

  @include mediaMd {
    top: 90px;
  }

  @include mediaSm {
    top: 90px;
  }
}

.page-info {
  margin-left: 2.5%;
  @include mediaXs {
    margin-left: 0%;
  }

  .producdata-breadcrumb {
    @include mediaXs {
      margin-left: 5%;
    }

    p {
      font-size: 13px;
    }
  }
}

.product-number {
  margin-right: 2.5%;
  @include mediaXs {
    margin-right: 5%;
    text-align: right;
  }
  p {
    font-family: $font-family-h;
    font-weight: 400;
    text-transform: uppercase;
    color: #2e2e2e;
    font-size: 15px;
    @include mediaXs {
      font-size: 13px;
    }
  }
}

.brd-name {
  font-family: $font-family-h;
  font-weight: 500;
  color: #919191;
  text-transform: capitalize;
  font-size: 15px;
  font-style: italic;
  @include mediaXs {
    font-size: 13px;
  }
}

// .brd-name {
//   p {
//     font-family: $font-family-h;
//     font-weight: 500;
//     color: #2e2e2e;
//     text-transform: capitalize;
//     font-size: 15px;
//     font-style: italic;
//     @include mediaXs {
//       font-size: 13px;
//     }
//     span {
//       color: #919191;
//     }
//   }
// }
</style>
