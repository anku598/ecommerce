<template>
  <div class="video-carousel wrapper" v-if="compData">
    <div class="section-heading">
      <p>On Tape</p>
      <h3>LoveGen Rolling</h3>
    </div>

    <client-only>
      <div class="blog-reveal">
        <!-- <div class="collection-btn">
        <a :href="compData.call_to_action.link" @click.prevent>{{
          compData.call_to_action_label
        }}</a>
      </div> -->
        <swiper
          v-if="!blogShow"
          :options="swiperOptionBlog"
          class="carousel-wrapper"
        >
          <swiper-slide
            class="f-slide"
            v-for="(video, idx) of compData"
            :key="'cf' + idx"
          >
            <!-- <router-link :to="blogItem.url">
            <div class="slide-img">
              <img :src="$config.HOST + blogItem.image.original.src" alt="Blog" />
            </div>
            <p class="blog-title">{{ blogItem.title }}</p>
            <p class="blog-text">{{ blogItem.short_description }}</p>
          </router-link> -->

            <!-- <LazyYoutubeVideo
            :iframeAttributes="{ autoplay: 'true' }"
            :src="video.youtube_video.url"
          >
          </LazyYoutubeVideo>
          <p class="blog-text">{{ video.caption }}</p> -->

            <vue-plyr>
              <div class="plyr__video-embed">
                <iframe
                  :src="video.youtube_video.url"
                  allowfullscreen
                  :resetOnEnd="false"
                ></iframe>
              </div>
            </vue-plyr>

            <!-- <my-video
            :sources="video.youtube_video.url"
            :options="options"
          ></my-video> -->
          </swiper-slide>

          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>

        <div v-if="blogShow" class="carousel-wrapper mobile-layout">
          <div
            class="f-slide"
            v-for="(video, idx) of compData"
            :key="'cf' + idx"
          >
            <!-- <router-link :to="blogItem.url">
            <div class="slide-img">
              <img :src="$config.HOST + blogItem.image.original.src" alt="Blog" />
            </div>
            <p class="blog-title">{{ blogItem.title }}</p>
            <p class="blog-text">{{ blogItem.short_description }}</p>
          </router-link> -->
            <vue-plyr>
              <div class="plyr__video-embed">
                <iframe :src="video.youtube_video.url" allowfullscreen></iframe>
              </div>
            </vue-plyr>
          </div>
          <!--
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div> -->
        </div>
      </div>
    </client-only>
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
  ScrollToPlugin,
} from "gsap/all";

@Component({
  name: "VideoCarousel",
  components: {},
})
export default class VideoCarousel extends Vue {
  @Prop() compData: any;
  get HOST() {
    return process.env.HOST;
  }

  swiperOptionBlog: any = {
    slidesPerView: 3,
    spaceBetween: 80,
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
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  blogShow: boolean = false;

  created() {
    if (process.browser && window) {
      this.handleView();
    }
  }

  handleView() {
    if (process.browser && window) {
      this.blogShow = window.innerWidth <= 991;
      window.addEventListener("resize", this.handleView);
    }
  }

  blogReveal() {
    const isMobile = window.innerWidth <= 991;
    var blogTimeline = new TimelineMax({});
    blogTimeline.from(".blog-reveal", 2, {
      yPercent: 15,
      opacity: 0,
      ease: Power4.easeOut,
    });

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const blogArticleController = new ScrollMagic.Controller();
      if (isMobile) {
        const blogArticleScene: any = new ScrollMagic.Scene({
          triggerElement: ".video-carousel",
          reverse: false,
          triggerHook: "onEnter",
        })
          .setTween(blogTimeline)
          .addTo(blogArticleController);
      } else {
        const blogArticleScene: any = new ScrollMagic.Scene({
          triggerElement: ".video-carousel",
          reverse: false,
          triggerHook: "onEnter",
        })
          .setTween(blogTimeline)
          .addTo(blogArticleController);
      }
    }
  }

  // mouseMove() {
  //   const plugins = [ScrollToPlugin];
  //   let sliderWrapper = document.querySelector('.carousel-wrapper');
  //   let carouselInner = document.querySelector(
  //     '.carousel-wrapper .swiper-wrapper'
  //   );
  //   // (carouselInner as any).addEventListner('mousemove', () => {
  //   //   // console.log('mousemove');

  //   // });

  //   (carouselInner as any).addEventListener('mousemove', (e: any) => {
  //     if (e.clientX > (sliderWrapper as any).clientWidth / 2) {
  //       TweenMax.to(sliderWrapper, 4, {
  //         scrollTo: { x: '+=400' },
  //         ease: Power4.easeOut,
  //       });
  //     } else {
  //       TweenMax.to(sliderWrapper, 4, {
  //         scrollTo: { x: '-=400' },
  //         ease: Power4.easeOut,
  //       });
  //     }
  //   });
  // }

  public mounted() {
    if (process.browser && window) {
      this.blogReveal();
    }
    // this.mouseMove();
  }
}
</script>
<style scoped lang="scss">
.video-carousel {
  margin-bottom: $section-margin + 40px !important;
  width: 100%;
  margin: 0 auto;
  position: relative;
  @include mediaSm {
    margin-bottom: 14vw !important;
    width: 90%;
    margin-left: 0;
    margin: 0 auto;
  }
  @include mediaXs {
    width: 90%;
    margin-left: 0;
    margin: 0 auto;
    margin-top: 40px;
  }
  .all-articles-btn {
    text-align: right;
    display: inline-flex;
    justify-content: flex-end;
    color: #000;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    font-family: "Aileron-Bold", sans-serif;
    border-bottom: 1.5px solid #000;
    padding-bottom: 5px;
    letter-spacing: -0.5px;
  }

  ::v-deep .swiper-slide {
    cursor: pointer;
  }

  ::v-deep .swiper-container {
    overflow: inherit !important;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    top: -45px;
  }

  .swiper-button-next {
    background: url("../../assets/img/right-arrow.svg") no-repeat;
    background-position: center;
    right: 26px;
  }

  .swiper-button-prev {
    background: url("../../assets/img/left-arrow.svg") no-repeat;
    background-position: center;
    left: auto;
    right: 67px;
  }

  .section-heading {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
      margin-top: 30px;
      margin-bottom: 2rem;
    }

    @include mediaXs() {
      flex-direction: column;
    }

    p {
      color: #000;
      text-transform: uppercase;
      letter-spacing: 10px;
      font-weight: 400;
      font-size: 16px;
      font-family: "Roboto", sans-serif;
    }

    h3 {
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      font-size: 4rem;
      margin: 0;
      text-transform: uppercase;
      @media (max-width: 768px) {
        font-size: 2rem;
        text-align: center;
        margin-top: 14px;
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

.slide-img {
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: 60%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    object-position: center top;
  }
}

.swiper-slide,
.mobile-layout {
  margin-top: 1.5em;

  .f-slide {
    margin-bottom: 20px;
    cursor: pointer;
  }
  @media (max-width: 992px) {
    text-align: center;
  }

  .category-name {
    text-transform: uppercase;
    color: #919191;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 18px;
  }

  .price {
    color: #606060;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 18px;
  }

  .blog-title {
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    font-size: 1.3rem;
    text-transform: capitalize;
    color: #2e2e2e;
    margin-top: 25px;
    margin-bottom: 0;
    @include mediaSm {
      font-size: 1.1rem;
    }
  }

  ::v-deep .plyr__control {
    background: #0e1224;
  }

  .blog-text {
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    font-size: 1.1rem;
    color: #2e2e2e;
    margin-top: 10px;
    max-width: 80%;
    line-height: 28px;
    @include mediaSm {
      font-size: 16px;
      margin-bottom: 30px;
      max-width: 100%;
    }

    @include mediaXs {
      font-size: 16px;
      margin-bottom: 30px;
    }
  }

  // p {
  //   margin-bottom: 5px;
  //   font-family: 'Roboto', sans-serif;
  //   font-weight: 500;
  //   font-size: 1.5rem;
  //   @media (min-width: 769px) and (max-width: 1170.98px) {
  //     margin-bottom: 0px;
  //   }

  //   @media (min-width: 769px) and (max-width: 1170.98px) {
  //     font-size: 1rem;
  //   }
  // }
  a {
    text-decoration: none;
    color: #000;
    @media (min-width: 769px) and (max-width: 1170.98px) {
      font-size: 0.8rem;
    }
  }
}

.blog-reveal {
  // margin-left: 5%;
  width: 95%;
  margin: 0 auto;

  @include mediaXs {
    width: 100%;
    margin-left: 0;
  }
  .collection-btn {
    text-align: right;
    width: 90%;
    margin: 0 auto;
    margin-left: 0;

    @include mediaSm {
      position: absolute;
      bottom: -3%;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      text-align: center !important;
    }

    @include mediaXs {
      position: absolute;
      bottom: -3%;
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

// .carousel-wrapper {
//   .swiper-slide {
//     margin-right: 80px !important;
//     &.swiper-slide-prev {
//       margin-left: -160px !important;
//       margin-right: 0px !important;
//     }

//     @include mediaSm {
//       margin-top: 0.5px !important;
//     }
//   }
// }

// .swiper-button-prev,
// .swiper-button-next {
//   // top: 4%;
//   // border: 0.5px solid #000;
//   // padding: 20px;
// }

::v-deep .plyr--stopped .plyr__controls {
  opacity: 0;
}
</style>
