<template>
  <div class="featured-products wrapper">
    <div class="row generation-reveal">
      <div class="col-md-12 col-lg-6 col-xl-6 position-relative">
        <div class="single-img">
          <img
            :src="$config.HOST + compData.section_2.image.original.src"
            alt="Single Image"
          />
        </div>

        <div class="gradient" />
      </div>
      <div class="col-md-12 col-lg-6 col-xl-6">
        <div class="right-content">
          <span>{{ compData.section_2.subtitle }}</span>
          <h2 class="section-title">
            {{ compData.section_2.title }}
          </h2>
          <p>{{ compData.section_2.text }}</p>
        </div>
      </div>
    </div>
    <div class="product-reveal">
      <!-- <div class="collection-btn">
        <a :href="compData.section_2.call_to_action.link">{{
          compData.section_2.call_to_action_label
        }}</a>
      </div> -->
      <div>
        <swiper
          v-if="compData.products"
          class="f-slide-wrapper"
          :options="swiperOption2"
        >
          <swiper-slide
            v-for="(item, idx) of products"
            :key="'cd' + idx"
            class="f-slide"
          >
            <SingleProductImage
              class="product-hover"
              :comp-data="item"
              :product="item"
            />
          </swiper-slide>

          <div slot="button-prev" class="swiper-button-prev" />
          <div slot="button-next" class="swiper-button-next" />
        </swiper>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  TimelineMax,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
} from "gsap/all";
import gql from "graphql-tag";
import { SmartQuery } from "vue-apollo-decorators";
import productQuery from "~/apollo/category/products/cmsProduct.gql";
import { cmsProductQueryBuilder } from "~/apollo/products/queries/builders";
import SingleProductImage from "./SingleProductImage.vue";

@Component({
  name: "FeaturedProducts",
  components: {
    SingleProductImage,
  },
})
export default class FeaturedProducts extends Vue {
  @Prop() compData: any;

  @SmartQuery<FeaturedProducts>({
    query() {
      const queries: any = (this as any).compData.products.map(
        (p: any, idx: number) => {
          return cmsProductQueryBuilder(idx, p.product.slug, "width-1920");
        }
      );
      const q = String.raw`
        query Product {
          ${queries.join("\n")}
        }
      `;
      return gql(q);
    },
    fetchPolicy: "cache-and-network",
    update: (data) => Object.values(data),
  })
  products: any;

  get HOST() {
    return process.env.HOST;
  }

  swiperOption2: any = {
    slidesPerView: 3,
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
        spaceBetween: 0,
        slidesPerGroup: 1,
      },

      480: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
      },

      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    on: {
      init() {
        const swiperPrev: any = document.querySelector(".swiper-button-prev");
        const swiperNext: any = document.querySelector(".swiper-button-next");

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

  checkArrow() {
    // console.log('Check arrow');
  }

  layoutReveal() {
    const isMobile = window.innerWidth <= 991;
    const timeline = new TimelineMax({});
    timeline.from(".product-reveal", 2, {
      yPercent: 30,
      opacity: 0,
      ease: Power4.easeOut,
      clearProps: "all",
    });

    const generationTl = new TimelineMax({});

    if (isMobile) {
      generationTl.fromTo(
        ".single-img > img",
        1,
        { opacity: 0 },
        { opacity: 1, ease: Expo.easeInOut }
      );
    } else {
      generationTl.fromTo(
        ".single-img > img",
        1,
        { opacity: 0 },
        { opacity: 1, ease: Expo.easeInOut, clearProps: "all" }
      );
    }

    const generationTextTl = new TimelineMax({});

    if (isMobile) {
      generationTextTl.staggerFromTo(
        ".right-content > span, .right-content > h2, .right-content > p",
        1.5,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: Expo.easeOut },
        0.2
      );
    } else {
      generationTextTl.staggerFromTo(
        ".right-content > span, .right-content > h2, .right-content > p",
        1.5,
        { xPercent: 50, opacity: 0 },
        { xPercent: 0, opacity: 1, ease: Expo.easeOut, clearProps: "all" },
        0.2
      );
    }

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const singleImageController = new ScrollMagic.Controller();
      const singleImageScene: any = new ScrollMagic.Scene({
        triggerElement: ".right-img",
        reverse: false,
        triggerHook: "onLeave",
        offset: -200,
      })
        .setTween(generationTl)
        .addTo(singleImageController);

      const generationTextController = new ScrollMagic.Controller();
      const generationTextScene: any = new ScrollMagic.Scene({
        triggerElement: ".single-img",
        reverse: true,
        triggerHook: "onCenter",
      })
        .setTween(generationTextTl)
        .addTo(generationTextController);

      const controller = new ScrollMagic.Controller();
      if (isMobile) {
        const scene: any = new ScrollMagic.Scene({
          triggerElement: ".product-reveal",
          reverse: false,
          triggerHook: "onEnter",
        })
          .setTween(timeline)
          .addTo(controller);
      } else {
        const scene: any = new ScrollMagic.Scene({
          triggerElement: ".right-content",
          reverse: false,
          offset: 150,
          triggerHook: "onEnter",
        })
          .setTween(timeline)
          .addTo(controller);
      }
    }
  }

  public mounted() {
    // const postData: any = this.compData.products.map(
    //   (product: any, idx: number) => {
    //     let fields: Array<string> = [
    //       'id',
    //       'name',
    //       'tags',
    //       createImageConnectionQuery(['first', 1], ['id', 'transformedSrc']),
    //     ];
    //     return {
    //       handle: product.handle,
    //       fields: fields,
    //     };
    //   }
    // );
    if (process.browser && window) {
      this.layoutReveal();
    }
  }
}
</script>
<style scoped lang="scss">
.featured-products {
  width: 100%;
  @include mediaSm {
    margin-top: 0;
  }
  .section-heading {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
      margin-top: 3em;
    }

    @include mediaXs() {
      flex-direction: column;
    }

    h3 {
      font-size: 2.2rem;
      @include mediaXs() {
        margin-bottom: 15px;
      }
      @media (max-width: 768px) {
        font-size: 1.9rem;
        text-align: center;
      }
    }
    a {
      text-decoration: none;
      text-transform: uppercase;
      color: #000;
      font-size: 1.2rem;
      border-bottom: 1px solid #000;
      font-family: $font-family-base;
      @include mediaXs() {
        margin-top: 15px;
      }

      @media (max-width: 768px) {
        font-size: 1rem;
        text-align: center;
      }
    }
  }
}

::v-deep .swiper-button-prev,
.swiper-button-next {
  @include mediaXs {
    top: 40% !important;
  }
}

.line {
  height: 1px;
  background: lightgray;
  width: 60%;

  @include mediaSm() {
    width: 30%;
  }

  @include mediaXs() {
    width: 100%;
  }

  // @media (max-width: 768px) {
  //   width: 35%;
  // }

  @include mediaMd() {
    width: 35%;
  }

  @include mediaLg() {
    width: 40%;
  }
}

.f-slide-wrapper {
  // transition: opacity 0.3s ease-out;
  @include mediaXs {
    margin-top: -35%;
  }
  // &:hover {

  // .f-slide {
  //   .slide-img {
  //   }
  // }
}

.slide-img {
  height: 75vh !important;
  img {
    height: 100%;
    object-fit: cover;
  }
}

// .slide-img {
//   height: 75vh;
//   width: 100%;
//   margin-bottom: 15px;
//   display: none;
//   @media (min-width: 769px) and (max-width: 1170.98px) {
//     height: 50vh !important;
//   }

//   @media (max-width: 768px) {
//     height: auto;
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     object-position: center top;
//   }
// }

.swiper-slide {
  margin-top: 1.5em;
  @media (max-width: 992px) {
    text-align: center;
  }

  // .category-name {
  //   text-transform: uppercase;
  //   color: #919191;
  //   font-family: 'Roboto', sans-serif;
  //   font-weight: 500;
  //   font-size: 18px;
  // }

  // .price {
  //   color: #606060;
  //   font-family: 'Roboto', sans-serif;
  //   font-weight: 500;
  //   font-size: 18px;
  // }

  p {
    margin-bottom: 5px;
    text-transform: capitalize;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 1.5rem;
    @media (min-width: 769px) and (max-width: 1170.98px) {
      margin-bottom: 0px;
    }

    @media (min-width: 769px) and (max-width: 1170.98px) {
      font-size: 1rem;
    }
  }
  a {
    text-decoration: none;
    color: #000;
    @media (min-width: 769px) and (max-width: 1170.98px) {
      font-size: 0.8rem;
    }
  }
}

.swiper-button-next {
  background: url("../../assets/img/right-arrow.svg") no-repeat;
  background-position: center;
  right: 26px;
  &:focus {
    outline: none;
  }
  @include iPad {
    right: 9px;
  }
}

.swiper-button-prev {
  background: url("../../assets/img/left-arrow.svg") no-repeat;
  background-position: center;
  left: 26px;
  &:focus {
    outline: none;
  }
  @include iPad {
    left: 9px;
  }
}

.right-content {
  margin-top: 100px !important;
  margin-left: 20% !important;
  margin-bottom: 40px;

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-left: 0 !important;
    width: 100% !important;
  }

  h2 {
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 3rem !important;
    }

    p {
      font-size: 1.1rem !important;
      @media (min-width: 768px) and (max-width: 991.98px) {
        width: 100% !important;
      }
    }
  }

  @include mediaSm {
    margin-left: auto !important;
    margin-bottom: 0px;
    margin-right: auto;
    text-align: center;
  }

  p {
    position: relative;
    // &:after {
    //   position: absolute;
    //   bottom: -50%;
    //   transform: translateY(50%);
    //   width: 1px;
    //   height: 60px;
    //   content: '';
    //   background: rgba(0, 0, 0, 0.5);
    //   left: 0;
    // }
  }
}

.text-content,
.right-content {
  width: 70%;
  margin-left: auto;
  margin-top: 180px;
  position: relative;
  z-index: 10;

  @media (min-width: 1024px) and (max-width: 1171px) {
    width: 100%;
  }

  @include mediaSm {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: auto;
    position: relative;
    top: -35%;
  }

  @include mediaXs {
    position: relative;
    top: -35%;
  }
  span {
    font-size: 16px;
    font-family: "Roboto", sans-serif;
    letter-spacing: 11px;
    text-transform: uppercase;
    color: #000;
    position: relative;
    &:before {
      position: absolute;
      content: "";
      top: 50%;
      width: 60px;
      height: 1px;
      left: -120px;
      transform: translate(50%, -50%);
      background: rgba(0, 0, 0, 0.5);
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
  .section-title {
    @include responsive-font(3.5vw, 20px, 70px, 50px);
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    margin-top: 30px;
    color: #000;
    margin-bottom: 0;
    @include mediaXs {
      font-size: 2rem;
      margin-top: 14px !important;
    }
    // @media (min-width: 1024px) and (max-width: 1171px) {
    //   font-size: 3.5rem;
    // }

    // @media screen and (max-width: 1366px) {
    //   font-size: 2.5rem;
    // }
    // @include mediaSm {
    //   font-size: 2rem;
    // }
  }
  p {
    width: 80%;
    font-family: "Roboto", sans-serif;
    color: #000;
    font-weight: 300;
    font-size: 1.1rem;
    line-height: 28px;
    margin: 20px 0;

    @include mediaSm {
      width: 90% !important;
      position: relative;
      &:after {
        position: absolute;
        bottom: -75%;
        content: "";
        width: 1px;
        height: 60px;
        background: $color-lightgray;
        left: 50%;
        transform: translateX(-50%);
        display: none;
      }
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      width: 100% !important;
    }
  }

  a {
    color: #000;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    font-family: $font-family-base;
    border-bottom: 1.5px solid #000;
    padding-bottom: 5px;
    letter-spacing: -0.5px;
  }
}

.single-img {
  // width: auto;
  max-width: 100%;
  position: absolute;
  top: 0;
  margin-left: 7px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  overflow: hidden;
  left: 5.3%;

  // @media screen and (min-width: 2200px) {
  //   width: 60vw !important;
  // }

  @media screen and (max-width: 1366px) {
    width: 39vw;
    top: -2%;
  }
  overflow: hidden;

  @include mediaXs {
    top: 53%;
  }

  @media (min-width: 1024px) and (max-width: 1171px) {
    top: 77%;
  }
  @include mediaSm {
    width: 70%;
    position: relative;
    margin: 0 auto;
    top: 0;
    transform: translateY(0);
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    top: 70%;
    margin-left: 0;
  }
  @include mediaXs {
    width: 90vw;
    position: relative;
    margin: 0 auto;
    left: 0%;
  }

  @include iPad {
    top: 46%;
    transform: translateY(-50%);
  }

  img {
    width: 100%;
    object-fit: cover;
  }
}

.product-reveal {
  position: relative;
  margin-bottom: 190px;
  .collection-btn {
    text-align: right;
    width: 90%;
    margin: 0 auto;
    @include mediaSm {
      position: absolute;
      bottom: -5%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center !important;
    }
    a {
      color: #000;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      font-family: $font-family-base;
      border-bottom: 1.5px solid #000;
      padding-bottom: 5px;
      letter-spacing: 1.1px;
    }
  }
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 1;
  cursor: pointer;
  pointer-events: auto;
}

// .swiper-slide {
//   margin-right: 25px !important;
// }

.gradient {
  position: relative;
  height: 100%;
  &:before {
    content: "";
    position: absolute;
    //top: 72%;
    top: 55%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 1);
    background: -moz-linear-gradient(
      top,
      rgba(26, 1, 1, 0) 0%,
      rgba(255, 255, 255, 1) 19%,
      rgba(255, 255, 255, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      left bottom,
      color-stop(0%, rgba(255, 255, 255, 0)),
      color-stop(19%, rgba(255, 255, 255, 1)),
      color-stop(100%, rgba(255, 255, 255, 1))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgb(255, 255, 255) 19%,
      rgb(255, 255, 255) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 19%,
      rgba(255, 255, 255, 1) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 19%,
      rgba(255, 255, 255, 1) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 1) 19%,
      rgba(255, 255, 255, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f5f5f5', GradientType=0 );

    @include mediaSm {
      top: -39%;
    }
    @include mediaXs {
      top: -39%;
    }
  }
}

// .gradient {
//   position: relative;
//   height: 100%;
//   &:before {
//     content: '';
//     position: absolute;
//     top: 72%;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 100%;
//     height: 100vh;
//     background: rgba(255, 255, 255, 1);
//     background: -moz-linear-gradient(
//       to bottom,
//       rgba(26, 1, 1, 0) 0%,
//       rgba(254, 254, 252, 1) 19%,
//       rgba(254, 254, 252, 1) 100%
//     );
//     background: -webkit-gradient(
//       left top,
//       left bottom,
//       color-stop(0%, rgba(26, 1, 1, 0)),
//       color-stop(19%, rgba(254, 254, 252, 1)),
//       color-stop(100%, rgba(254, 254, 252, 1))
//     );

//     background: -webkit-linear-gradient(
//       to bottom,
//       rgba(26, 1, 1, 0) 0%,
//       rgba(254, 254, 252, 1) 19%,
//       rgba(254, 254, 252, 1) 100%
//     );
//     background: -o-linear-gradient(
//       to bottom,
//       rgba(26, 1, 1, 0) 0%,
//       rgba(254, 254, 252, 1) 19%,
//       rgba(254, 254, 252, 1) 100%
//     );
//     background: -ms-linear-gradient(
//       to bottom,
//       rgba(26, 1, 1, 0) 0%,
//       rgba(254, 254, 252, 1) 19%,
//       rgba(254, 254, 252, 1) 100%
//     );
//     background: linear-gradient(
//       to bottom,
//       rgba(26, 1, 1, 0) 0%,
//       rgba(254, 254, 252, 1) 19%,
//       rgba(254, 254, 252, 1) 100%
//     );
//     filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f5f5f5', GradientType=0 );

//     @include mediaSm {
//       top: -39%;
//     }
//     @include mediaXs {
//       top: -39%;
//     }
//   }
// }
</style>
