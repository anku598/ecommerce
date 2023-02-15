<template>
  <div class="duel-image-carousel" v-if="this.compData">
    <transition @enter="sliderEnter" @leave="sliderLeave" :css="false">
      <div class="left-img" :key="'slideImgLeft' + currentIndex">
        <div class="slide-item">
          <picture>
            <source :srcset="$config.HOST + currentLeftSlide.image.tab.src" />
            <source
              :srcset="$config.HOST + currentLeftSlide.image.mobile.src"
            />
            <img
              class="duel-img left-slide-img"
              :src="$config.HOST + currentLeftSlide.image.original.src"
              alt
            />
          </picture>
          <!-- <img
            class="duel-img left-slide-img"
            :src="$config.HOST + currentLeftSlide.image.original.src"
            alt
          /> -->
        </div>
      </div>
    </transition>

    <transition
      @enter="sliderEnterRight"
      @leave="sliderLeaveRight"
      :css="false"
    >
      <div class="right-img" :key="'slideImgRight' + currentIndex">
        <div class="slide-item">
          <picture>
            <source :srcset="$config.HOST + currentRightSlide.image.tab.src" />
            <source
              :srcset="$config.HOST + currentRightSlide.image.mobile.src"
            />
            <img
              class="duel-img right-slide-img"
              :src="$config.HOST + currentRightSlide.image.original.src"
              alt
            />
          </picture>
          <!-- <img
            class="duel-img right-slide-img"
            :src="$config.HOST + currentRightSlide.image.original.src"
            alt
          /> -->
        </div>
      </div>
    </transition>

    <div
      @click.prevent="prev"
      class="swiper-button-prev prev-btn"
      slot="button-prev"
    >
      <i class="fas fa-long-arrow-alt-left"></i>
    </div>
    <div
      @click.prevent="next"
      class="swiper-button-next next-btn"
      slot="button-next"
    >
      <i class="fas fa-long-arrow-alt-right"></i>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  TimelineMax,
  gsap,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
} from "gsap/all";
@Component({
  name: "DuelImageCarousel",
  components: {},
})
export default class DuelImageCarousel extends Vue {
  @Prop() compData: any;
  get HOST() {
    return process.env.HOST;
  }

  currentIndex = 0;
  direction: any = null;
  get currentLeftSlide() {
    return this.compData.left[this.currentIndex];
  }

  get currentRightSlide() {
    return this.compData.right[this.currentIndex];
  }

  next() {
    if (
      this.currentIndex < this.compData.left.length &&
      this.compData.right.length
    ) {
      const newIndex = this.currentIndex + 1;
      if (newIndex >= this.compData.left.length && this.compData.right.length) {
        this.currentIndex = 0;
      } else {
        this.currentIndex = newIndex;
      }
      this.direction = "next";
    }
  }

  prev() {
    if (this.currentIndex >= 0) {
      const newIndex = this.currentIndex - 1;
      console.log(newIndex);
      if (newIndex < 0) {
        this.currentIndex =
          this.compData.left.length && this.compData.right.length - 1;
      } else {
        this.currentIndex = 0;
      }
      this.direction = "prev";
    }
  }

  sliderEnter(el: any, done: any) {
    if (process.browser) {
      const slideImg = el.querySelector(".slide-item .left-slide-img");
      const slideRightImg = el.querySelector(".slide-item .right-slide-img");

      const yPercent = this.direction === "next" ? 100 : -100;
      const yPercentRight = this.direction === "next" ? -100 : 100;
      const y = this.direction === "next" ? 50 : -50;
      const tl = new TimelineMax({ onComplete: done });
      tl.fromTo(
        slideImg,
        1.5,
        { yPercent },
        {
          ease: Power4.easeOut,
          yPercent: 0,
        },
        "start"
      );
    }
  }

  sliderEnterRight(el: any, done: any) {
    if (process.browser) {
      const slideRightImg = el.querySelector(".slide-item .right-slide-img");
      const yPercentRight = this.direction === "next" ? -100 : 100;
      const tl = new TimelineMax({ onComplete: done });

      tl.fromTo(
        slideRightImg,
        2,
        { yPercent: yPercentRight },
        {
          ease: Power4.easeOut,
          yPercent: 0,
        },
        "start"
      );
    }
  }

  sliderLeave(el: any, done: any) {
    if (process.browser) {
      const slideImg = el.querySelector(".slide-item .left-slide-img");
      const slideRightImg = el.querySelector(".slide-item .right-slide-img");
      const yPercent = this.direction === "next" ? -100 : 100;

      const tl = new TimelineMax({});
      tl.fromTo(
        slideImg,
        1.5,
        { yPercent: 0 },
        { ease: Power4.easeOut, yPercent },
        "start"
      );
    }
  }

  sliderLeaveRight(el: any, done: any) {
    if (process.browser) {
      const slideRightImg = el.querySelector(".slide-item .right-slide-img");
      const yPercentRight = this.direction === "next" ? 100 : -100;
      const tl = new TimelineMax({});
      tl.fromTo(
        slideRightImg,
        2,
        { yPercent: 0 },
        {
          ease: Power4.easeOut,
          yPercent: yPercentRight,
        },
        "start"
      );
    }
  }
}
</script>
<style scoped lang="scss">
.duel-image-carousel {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: $section-margin;
  position: relative;
  @include mediaXs {
    width: 90%;
    margin-bottom: $section-margin - 60px;
    margin-top: 0;
  }

  @include iPad {
    width: 90%;
    height: 50vh;
  }

  // @include mediaSm {
  //   margin-top: 20%;
  // }

  @include mediaSm {
    margin-top: 135px;
  }

  &:before {
    content: "";
    padding-top: 50%;
    display: block;

    @include mediaSm {
      padding-top: 33%;
    }
    @include mediaXs {
      margin-top: 135px !important;
    }
  }
}

.left-img {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  width: 50.1%;
  display: flex;
  flex-direction: column;
  height: 80vh;

  @include mediaXs {
    height: 100%;
  }

  @include iPad {
    height: 100%;
  }

  .slide-item {
    height: 100%;
    transition: transform 1.4s ease;
    // transition: transform 1.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    //   -webkit-transform 1.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-left: 1px;
  }
}

.right-img {
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  width: 50%;
  display: flex;
  height: 80vh;
  flex-direction: column;
  @include mediaXs {
    height: 100%;
  }

  @include iPad {
    height: 100%;
  }
  .slide-item {
    height: 100%;
    transition: transform 1.4s ease;
    // transition: transform 1.4s cubic-bezier(0.165, 0.84, 0.44, 1),
    //   -webkit-transform 1.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.white-overlay {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 3;
  visibility: hidden;
}

.swiper-button-prev,
.swiper-button-next {
  transition: all 0.3s ease-out;
  &:hover {
    background: #000;
    color: #fff;
  }
}

.swiper-button-prev {
  left: 50%;
  width: 50px;
  height: 50px;
  font-family: "Font Awesome 5 Free";
  content: "\f30b";
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(-99%, -50%);

  @include mediaXs {
    top: 50%;
    transform: translate(-99%, -50%);
    height: 30px;
    width: 30px;
  }
}

.swiper-button-next {
  left: 50%;
  width: 50px;
  height: 50px;
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);

  @include mediaXs {
    top: 50%;
    transform: translate(0%, -50%);
    height: 30px;
    width: 30px;
  }
}
</style>
