<template>
  <router-link
    :to="{ name: 'product-detail', params: { slug: shopProducts.slug } }"
  >
    <div
      class="single-img-slider"
      @mouseenter="$refs.swiperRef.swiper.autoplay.start()"
      @mouseleave="$refs.swiperRef.swiper.autoplay.stop()"
    >
      <swiper :options="swiperOption" ref="swiperRef">
        <swiper-slide
          v-for="(productImg, idx) in shopProducts.images"
          :key="'sproducts' + idx"
        >
          <div class="product-slide-img">
            <img
              :src="$config.HOST + productImg.image.original"
              alt="Featured"
            />
          </div>
        </swiper-slide>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <p class="category">{{ shopProducts.category.name }}</p>
      <p class="title">{{ shopProducts.name }}</p>
      <p class="price">{{ priceString }}</p>
    </div>
  </router-link>
</template>

<script lang ='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { Getter } from "vuex-class";

@Component({
  name: "SingleImageSlider",
  components: {
    swiper,
    swiperSlide,
  },
})
export default class SingleImageSlider extends Vue {
  @Prop() shopProducts: any;
  get HOST() {
    return (process as any).env.HOST;
  }
  swiperOption: any = {
    slidesPerView: 1,
    freeMode: false,
    speed: 600,
    mousewheelControl: true,
    parallax: true,
    watchOverflow: false,
    loopFillGroupWithBlank: false,
    // effect: 'fade',
    loop: true,
    touchRatio: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  get priceString() {
    let p = this.shopProducts.prices.find((val: any) => {
      return val.currency.short_code == this.currencyCode;
    });
    if (p == undefined) {
      if (this.shopProducts.prices.length > 0) {
        p = this.shopProducts.prices[0];
      } else {
        return "N/A";
      }
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: p.currency.short_code,
    }).format(Number.parseFloat(p.calculated));
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  overflow: hidden;
  &:hover {
    // .swiper-button-prev,
    // .swiper-button-next {
    //   opacity: 1;
    // }

    .swiper-button-prev {
      left: 12px;
    }

    .swiper-button-next {
      right: 12px;
    }
  }
}

img {
  width: 100%;
}

.swiper-button-prev,
.swiper-button-next {
  opacity: 1;
  transition: all 0.3s ease-out;
}

.product-slide-img {
  position: relative;
  overflow: hidden;
  padding-bottom: 140%;

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    // object-fit: cover;
    // object-position: top center;
  }
}

.swiper-button-prev {
  background-image: url("../../assets/img/chevron-right.svg") !important;
  width: 30px;
  height: 30px;
  background: #fff;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
  left: -40px;
  background-size: 5px;
  transform: translateY(-50%) rotate(180deg);
  transition: all 0.3s ease-out;
}

.swiper-button-next {
  background-image: url("../../assets/img/chevron-right.svg") !important;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
  background: #fff;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
  right: -40px;
  background-size: 5px;
  transition: all 0.3s ease-out;
}
</style>
