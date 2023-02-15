<template>
  <div class="home">
    <div class="banner" v-if="pageData">
      <div id="js-cta-slider" class="cta__slider-wrapper swiper-container">
        <div class="swiper-wrapper cta__slider">
          <div
            class="cta__slider-item swiper-slide"
            v-for="(comp, idx) in pageData.header"
            :key="'headcomp' + idx"
          >
            <div class="media-wrapper slide-inner">
              <component :is="comp.type" :comp-data="comp.value"></component>
            </div>
          </div>
        </div>
        <!-- <div class="swiper-pagination"></div> -->

        <!-- <div class="cta__slider-arrows">
          <div id="js-cta-slider-previous" class="prev-slide">
            <img src="@/assets/img/next-icon.svg" alt />
          </div>

          <div id="js-cta-slider-next" class="next-slide">
            <img src="@/assets/img/prev-icon.svg" alt />
          </div>
        </div> -->
      </div>
      <!-- <div class="cta__slider-counter">
      <div id="js-cta-slider-counter" class="counter"></div>
    </div>-->
    </div>

    <component
      :is="comp.type"
      v-for="(comp, idx) in pageData.body"
      :key="'bodycomp' + idx"
      :comp-data="comp.value"
    ></component>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { TimelineMax, Expo, clearProps, TweenMax, Power4 } from 'gsap/all';
import Swiper from 'swiper';
import MarkableBanner from '../blocks/MarkableBanner.vue';
import 'swiper/dist/css/swiper.css';
import ProductShowCase from '../blocks/ProductShowcase.vue';
import CallToActionBanner from '../blocks/CallToActionBanner.vue';
import VideoCarousel from '../blocks/VideoCarousel.vue';
import InstagramGrid from '../blocks/InstagramGrid.vue';
import ProductShowcaseCta from '../blocks/ProductShowcaseCta.vue';
@Component({
  name: 'HomePage',
  components: {
    slide: MarkableBanner,
    product_showcase: ProductShowCase,
    call_to_action_banner: CallToActionBanner,
    video_carousel: VideoCarousel,
    instagram_grid: InstagramGrid,
    product_showcase_and_cta: ProductShowcaseCta,
  },
})
export default class HomePage extends Vue {
  @Prop() pageData: any;

  tagsVisibile: boolean = true;

  bannerSlider() {
    var self = this;
    const slider = document.getElementById('js-cta-slider');
    const sliderCounter = document.getElementById('js-cta-slider-counter');
    const sliderNext = document.getElementById('js-cta-slider-next');
    const sliderPrevious = document.getElementById('js-cta-slider-previous');

    const interleaveOffset = 0.75;

    const swiper = new Swiper(slider, {
      loop: true,
      // loopedSlides: 5,
      direction: 'horizontal',
      speed: 900,
      grabCursor: false,
      watchSlidesProgress: true,
      mousewheelControl: true,
      mousewheel: false,

      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'custom',
        renderCustom: function (swiper: any, current: any, total: any) {
          let i = current ? current : 0;
          return `${('0' + i).slice(-2)} / ${('0' + total).slice(-2)}`;
        },
      },
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: sliderNext,
        prevEl: sliderPrevious,
      },

      on: {
        slideChangeTransitionStart() {
          // self.activeTags = [];
          self.tagsVisibile = false;
        },
        slideChangeTransitionEnd() {
          // self.activeTags = self.pageData[(this as any).realIndex].tags;
          self.tagsVisibile = true;
        },
        progress: function () {
          let swiper: any = this;

          for (let i = 0; i < swiper.slides.length; i++) {
            let slideProgress = swiper.slides[i].progress;
            let innerOffset = swiper.height * interleaveOffset;
            let innerTranslate = slideProgress * innerOffset;

            // TweenMax.fromTo(swiper.slides[i], 0.5, {
            //   skewX: `${innerTranslate * 0.025}deg`
            // });
            TweenMax.set(swiper.slides[i].querySelector('.slide-inner'), {
              x: innerTranslate,
            });
          }
        },
        touchStart: function () {
          let swiper: any = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = '';
          }
        },
        setTransition: function (speed: any) {
          let swiper: any = this;
          for (let i = 0; i < swiper.slides.length; i++) {
            swiper.slides[i].style.transition = speed + 'ms';
            swiper.slides[i].querySelector('.slide-inner').style.transition =
              speed + 'ms';
          }
        },
      },
    });
  }

  callToActionAnim() {
    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const shopLookController = new ScrollMagic.Controller();
      let shopTheLook = document.querySelectorAll('.shop-look');
      const isMobile = window.innerWidth <= 991;
      const shopLookTl = new TimelineMax({});

      shopTheLook.forEach((elem) => {
        console.log(elem);
        if (!isMobile) {
          shopLookTl
            .to('.left-img-box', 1.5, {
              width: '0%',
              transformOrigin: 'center center',
              ease: Expo.easeOut,
            })
            .to(
              '.overlap-bg',
              1.5,
              {
                width: '55%',
                transformOrigin: 'center center',
                ease: Expo.easeOut,
              },
              '-=1.4'
            )
            .staggerFromTo(
              '.small-text, .shop-content > .section-title,.section-para,.section-btn-anim',
              1.5,
              { x: 300, opacity: 0, z: 0 },
              { x: 0, opacity: 1, z: 0, ease: Expo.easeOut },
              0.05,
              '-=1.2'
            );
        }

        if (isMobile) {
          shopLookTl
            .addLabel('start')
            .fromTo(
              elem,
              1.5,
              { y: 200, opacity: 0 },
              { y: 0, ease: Power4.easeOut, opacity: 1, clearProps: 'all' },
              'start'
            );
        }

        if (isMobile) {
          const shopLookScene: any = new ScrollMagic.Scene({
            triggerElement: elem,
            reverse: true,
            triggerHook: 'onEnter',
          })
            .setTween(shopLookTl)
            .addTo(shopLookController);
        } else {
          const shopLookScene: any = new ScrollMagic.Scene({
            triggerElement: elem,
            reverse: true,
            offset: 250,
            triggerHook: 'onEnter',
          })
            .setTween(shopLookTl)
            .addTo(shopLookController);
        }
      });
    }
  }

  public mounted() {
    if (process.browser && window) {
      this.bannerSlider();
      // this.callToActionAnim();
    }
  }
}
</script>
<style scoped lang="scss">
.home {
  overflow: hidden;
}

.banner {
  height: 60vh;
  @media screen and (min-width: 1000px) {
    height: calc(100vh - #{$banner-height-calc});
    position: relative;
    width: 95%;
    margin: 0 auto;
    margin-bottom: $section-margin;
  }

  @media screen and (max-width: 576px) {
    height: 45vh;
  }
}

.swiper-container {
  height: 100%;
  .swiper-wrapper {
    height: 100%;
  }
}

::v-deep .swiper-slide {
  height: 100%;
}

.swiper-slide-active {
  z-index: 3;
}

.cta {
  padding: 12% 0;

  &__slider-wrapper {
    // position: relative;
    // width: 100%;
    // float: left;
    height: 100%;

    // .block {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    //   height: 100%;
    //   padding: 0;
    // }
  }

  &__slider {
    min-width: 50vh;

    .swiper-slide {
      overflow: hidden;
    }
  }

  &__slider-item {
    position: relative;

    .media-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }

  //COUNTER
  &__slider-counter {
    width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 3;
    padding: 20px 40px;
    color: #ffffff;
  }

  //CTA
  &__cta {
    padding-top: 12%;
    max-width: 8 * 60px;
  }
}

.swiper-pagination-bullet {
  background: transparent !important;
  opacity: 1;
}
</style>
