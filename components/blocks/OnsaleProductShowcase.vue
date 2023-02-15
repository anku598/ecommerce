<template>
  <transition v-on:after-enter="afterEnter" mode="out-in" appear>
    <div class="onsale-collection">
      <h2 class="section-title">{{ compData.title }}</h2>
      <div class="container-fluid remove-mobile-padding" v-if="!gridShow">
        <div class="row">
          <!-- <swiper v-if="products" :options="swiperOptionSale">
            <swiper-slide v-for="(item, idx) of products" :key="'itc' + idx">
              <ShopSingleProduct :shop-product="item" img-version="list" />
            </swiper-slide>
          </swiper> -->

          <div
            class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-margin onsale-product-item"
            v-for="(item, idx) of products"
            :key="'itc' + idx"
          >
            <ShopSingleProduct :shop-product="item" img-version="list" />
          </div>
        </div>
      </div>

      <div class="all-products" v-if="products && gridShow">
        <div v-for="(item, idx) of products" :key="'itc' + idx">
          <ShopSingleProduct :shop-product="item" img-version="list" />
        </div>
      </div>
      <!-- <div class="load-more">
        <router-link
          :to="{
            name: 'product-collection',
            params: { slug: pageData.meta.slug },
          }"
          >See Full Collection</router-link
        >
      </div> -->
    </div>
  </transition>
</template>

<script lang ='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import ShopSingleProduct from './ShopSingleProduct.vue';

import {
  TimelineMax,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
} from 'gsap/all';

import ShopTheCollectionImage from './ShopTheCollectionImage.vue';
import { checkIsMobile } from '../../utils/MobileDetect';
import { SmartQuery } from 'vue-apollo-decorators';
import { cmsProductQueryBuilder } from '../../apollo/products/queries/builders';
import gql from 'graphql-tag';
@Component({
  name: 'OnsaleProductShowcase',
  components: {
    ShopTheCollectionImage,
    ShopSingleProduct,
  },
})
export default class OnsaleProductShowcase extends Vue {
  @Prop() compData: any;
  @Prop() pageData: any;

  @SmartQuery<OnsaleProductShowcase>({
    query() {
      const queries: any = (this as any).compData.products.map(
        (p: any, idx: number) => {
          return cmsProductQueryBuilder(idx, p.product.slug, 'fill-420x560');
        }
      );
      const q = String.raw`
        query Product {
          ${queries.join('\n')}
        }
      `;
      return gql(q);
    },
    fetchPolicy: 'cache-and-network',
    update: (data) => Object.values(data),
  })
  products: any;

  swiperOptionSale: any = {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 1300,
    slidesPerGroup: 1,
    infinite: true,
    watchOverflow: false,
    // loop: true,
    // loopFillGroupWithBlank: false,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 1,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
      },

      480: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
      },

      320: {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    on: {
      init() {
        const swiperPrev: any = document.querySelector('.swiper-button-prev');
        const swiperNext: any = document.querySelector('.swiper-button-next');

        // if (this.products.images.length > 3) {
        //   swiperPrev.style.display = 'block';
        //   swiperNext.style.display = 'block';
        // } else {
        //   swiperPrev.style.display = 'none';
        //   swiperNext.style.display = 'none';
        // }
      },
    },
  };

  OnSaleCollectionReveal() {
    if ((process as any).browser && window) {
      const tl = new TimelineMax({});
      const isMobile = window.innerWidth <= 991;
      if (isMobile) {
        tl.fromTo(
          '.onsale-collection',
          2.5,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, ease: Expo.easeOut, clearProps: 'all' }
        );
      } else {
        tl.staggerFromTo(
          '.onsale-product-item',
          2.5,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, ease: Expo.easeOut, clearProps: 'all' },
          0.1
        );
      }
      const ScrollMagic = (window as any).ScrollMagic;
      const controllerOnSaleItem = new ScrollMagic.Controller();
      const OnSaleItemScene: any = new ScrollMagic.Scene({
        triggerElement: '.onsale-collection',
        offset: 200,
        reverse: false,
        triggerHook: 'onEnter',
      })
        .setTween(tl)
        .addTo(controllerOnSaleItem);
    }
  }

  afterEnter(el: any) {
    if ((process as any).browser && window) {
      this.OnSaleCollectionReveal();
    }
  }

  gridShow: boolean = false;

  mounted() {
    if ((process as any).browser && window) {
      this.handleView();
    }
  }

  handleView() {
    if ((process as any).browser && window) {
      this.gridShow = window.innerWidth <= 767;
      window.addEventListener('resize', this.handleView);
    }
  }
}
</script>

<style lang="scss" scoped>
.onsale-collection {
  width: 90%;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: $section-margin;
  @include mediaXs {
    width: 95%;
    margin-top: $section-margin - 40px;
    margin-bottom: 220px;
  }

  .remove-mobile-padding {
    @include mediaXs {
      padding: 0;
    }
  }

  .all-products {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
    grid-gap: 56px 40px;
    margin-bottom: $section-margin;
    width: 95%;
    margin: 0 auto;
    @include mediaXs {
      grid-gap: 20px 20px;
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
    }
  }

  .section-title {
    font-family: $font-family-h;
    margin-bottom: 2rem;
    text-align: center;
    @include mediaXs {
      margin-bottom: 1rem;
    }
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
  }
}

.col-margin {
  margin-bottom: 30px;
}

.load-more {
  margin-top: 120px;
}
</style>
