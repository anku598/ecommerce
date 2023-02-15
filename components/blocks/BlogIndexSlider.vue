<template>
  <div class="collection-page collection-page2">
    <span class="watermark">Blog</span>
    <transition
      v-on:enter="slideEnter"
      v-on:enter-active="slideEnterActive"
      v-on:leave="slideLeave"
      :css="false"
      mode="out-in"
    >
      <section :key="'slide' + currentIndex" v-if="currentSlide">
        <div class="left-content">
          <div class="positioning">
            <div class="date overflow">
              <!-- <p>{{ currentSlide.value.meta.first_published_at }}</p> -->
              <p>
                {{
                  $dayjs(currentSlide.value.first_published_at).format(
                    "MMM DD, YYYY"
                  )
                }}
              </p>
            </div>

            <div class="b-title overflow" :key="'title' + currentIndex">
              <h2>{{ currentSlide.value.title }}</h2>
            </div>
            <div class="b-para overflow">
              <p class="para">{{ currentSlide.value.short_description }}</p>
            </div>
          </div>

          <div class="slider-bottom">
            <router-link :to="currentSlide.value.url" class="btn"
              >Read More</router-link
            >
            <!-- <div class="slider-btn">
              <div
                :class="['prev-btn', (currentIndex <= 0) ? 'disabled' : '']"
                slot="button-prev"
                @click="move(-1)"
              >
                <i class="fas fa-long-arrow-alt-left"></i>
              </div>
              <div
                :class="['next-btn', (currentIndex >= compData.length - 1) ? 'disabled' : '']"
                slot="button-next"
                @click="move(1)"
              >
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
            </div>-->
          </div>
        </div>

        <div class="right-img">
          <picture :key="'pic' + currentIndex">
            <!-- <source :srcset="$config.HOST + currentSlide.value.hero_image_tab.url" media="(min-width: 800px)" />
            <source :srcset="$config.HOST + currentSlide.value.hero_image_mobile.url" media="(min-width: 300px)" />-->
            <img
              class="slide-img"
              :src="$config.HOST + currentSlide.value.image.original.src"
              alt="Banner Img"
            />
          </picture>
        </div>
      </section>
    </transition>
  </div>
</template>

<script lang ='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
// import { swiper, swiperSlide } from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css';
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

@Component({
  name: "BlogIndexSlider",
  components: {
    // swiper,
    // swiperSlide,
  },
})
export default class BlogIndexSlider extends Vue {
  @Prop() compData: any;
  currentIndex: number = 0;

  get HOST() {
    return process.env.HOST;
  }

  move(amount: any) {
    const newIndex = this.currentIndex + amount;
    if (newIndex >= 0 && newIndex < this.compData.length) {
      this.currentIndex = newIndex;
    }
  }

  get currentSlide(): any {
    return this.compData[this.currentIndex];
  }

  waterMarkAnim() {
    const revealTl = new TimelineMax({});
    revealTl.to(".watermark", 25, {
      x: -200,
      ease: Power4.easeOut,
      yoyo: true,
      repeat: -1,
    });

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const controller6 = new ScrollMagic.Controller();
      const scene6: any = new ScrollMagic.Scene({
        triggerElement: ".collection-page2",
        triggerHook: "onEnter",
      })
        .setTween(revealTl)
        .addTo(controller6);
    }
  }

  // Enter Animation

  slideEnter(el: HTMLElement, done: any) {
    const title = el.querySelector(".b-title h2");
    const date = el.querySelector(".date p");
    const paraText = el.querySelector(".b-para .para");
    const slideImg = el.querySelector(".slide-img");
    const SliderAnim = new TimelineMax({})
      .fromTo(
        slideImg,
        1,
        {
          xPercent: 100,
        },

        {
          xPercent: 0,
          ease: Expo.easeInOut,
        },
        0
      )
      .fromTo(date, 1, { y: 100 }, { y: 0, ease: Expo.easeInOut }, 0)
      .fromTo(title, 1, { y: 500 }, { y: 0, ease: Expo.easeInOut }, 0)
      .fromTo(
        paraText,
        1,
        { y: 200 },
        {
          y: 0,
          ease: Expo.easeInOut,
          onComplete: () => {
            if (done) {
              done();
            }
          },
        },
        0
      );
  }

  slideEnterActive(el: HTMLElement, done: any) {
    const title = el.querySelector(".b-title h2");
    const date = el.querySelector(".date p");
    const paraText = el.querySelector(".b-para .para");
    const slideImg = el.querySelector(".slide-img");
    const SliderAnim = new TimelineMax({});
    SliderAnim.to(slideImg, 1.5, {
      opacity: 0,
      onComplete: () => {
        if (done) {
          done();
        }
      },
    });
  }

  slideLeave(el: HTMLElement, done: any) {
    const title = el.querySelector(".b-title h2");
    const date = el.querySelector(".date p");
    const paraText = el.querySelector(".b-para .para");
    const slideImg = el.querySelector(".slide-img");

    const SliderAnim = new TimelineMax({})

      .fromTo(
        slideImg,
        1,
        {
          xPercent: 0,
        },
        {
          xPercent: -100,
          onComplete: done,
          ease: Expo.easeInOut,
        },
        0
      )
      .fromTo(date, 1, { y: 0 }, { y: -100, ease: Expo.easeInOut }, 0)
      .fromTo(title, 1, { y: 0 }, { y: -500, ease: Expo.easeInOut }, 0)
      .fromTo(
        paraText,
        1,
        { y: 0 },
        {
          y: -200,
          ease: Expo.easeInOut,
          onComplete: () => {
            if (done) {
              done();
            }
          },
        },
        0
      );
  }

  public mounted() {
    this.currentIndex++;
    if (this.compData.length <= this.currentIndex) {
      this.currentIndex = 0;
    }
    if (process.browser && window) {
      this.waterMarkAnim();
    }
  }
}
</script>

<style lang="scss" scoped>
.collection-page {
  height: calc(60vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  margin-bottom: 120px;
  margin-top: 40px;

  @include mediaSm {
    min-height: calc(60vh - 90px);
    height: 100%;
    margin-bottom: 45px;
    margin-top: 0;
  }
}
.watermark {
  @include watermark;
  font-size: calc(14vw + 16px);
  z-index: 2;
  top: 20%;
}

.positioning {
  margin-right: 23px;
  overflow: hidden;
  position: relative;

  .date,
  .b-title,
  .b-para {
    // position: absolute !important;
    // top: 0;
  }
}
section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 90%;
  margin-left: auto;

  @include mediaSm {
    flex-direction: column;
    margin-right: auto;
    height: 100%;
  }

  @include mediaMd {
    width: 95%;
  }
}

.left-content {
  // margin-left: calc(10vw + 25px);
  flex-basis: 40%;

  @include mediaSm {
    width: 100%;
    margin-top: 25px;
  }

  .date {
    @include mediaLg {
      width: 350px;
    }
    @include mediaMd {
      width: 300px;
    }
    h3,
    p {
      @include mediaMd {
        font-size: 13px;
      }

      @include mediaSm {
        margin-bottom: 20px;
      }
    }
  }
  .overflow {
    overflow: hidden;
    position: relative;
  }
  h2 {
    font-family: $font-family-h;
    font-size: calc(1.4vw + 15px);
    margin-bottom: 15px;
    margin-top: 15px;
    @include mediaSm {
      margin: 0;
      margin-bottom: 12px;
    }
  }

  .para {
    font-family: $font-family-h;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 1.2px;
    max-width: 75%;
    @include mediaMd {
      max-width: 100%;
      font-size: 16px;
      line-height: 24px;
    }
    @include mediaSm {
      margin: 0;
      max-width: 100%;
      font-size: 16px;
      line-height: 24px;
    }
  }
}

.btn {
  background: transparent;
  color: $color-secondary !important;
  border-bottom: 1px solid #000;
  padding-right: 0;
  padding-left: 0;
  font-family: $font-family-h;
  font-weight: 400;
  -webkit-transition: 0.5s ease all;
  transition: 0.5s ease all;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  text-transform: uppercase;
  letter-spacing: 1.1px;
  padding-bottom: 5px;
  font-size: 15px;
  outline: none;
  border-radius: 0;
  @include mediaSm {
    font-size: 13px;
  }
  &:hover {
    color: rgba(14, 18, 36, 0.5) !important;
  }
}

.right-img {
  flex-basis: 60%;
  // overflow: hidden;
  height: 70vh;
  position: relative;
  padding-left: 2rem;
  z-index: 4;
  @include mediaXs {
    padding-left: 0;
  }

  @include mediaSm {
    height: 40vh;
  }
  picture {
    // position: absolute;
    // top: 0;
    // height: 100%;
    // left: 0;
  }

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
  @include mediaMd {
    height: 57vh;
  }
  @include mediaSm {
    padding-left: 0;
    width: 100%;
    order: -1;
  }
}

.date {
  p {
    margin-bottom: 0;
  }
}

.date {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h3,
  p {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  h3 {
    font-family: $font-family-h;
    font-weight: 400;
    margin-left: 2.5rem;
  }

  p {
    font-family: $font-family-h;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: capitalize;
  }

  h3 {
    position: relative;
    &::before {
      width: 60px;
      height: 1px;
      background: $color-secondary;
      content: "";
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -80px;
    }
  }
}

.slider-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80%;
  margin-top: 2rem;
  @include mediaMd {
    max-width: 100%;
  }
  @include mediaSm {
    margin-top: 10px;
    max-width: 100%;
  }
}

.slider-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  .next-btn,
  .prev-btn {
    width: 50px;
    height: 45px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @include mediaSm {
      width: 60px;
      height: 35px;
    }

    i {
      color: $color-secondary;
    }
  }

  .prev-btn {
    border-right: 0;
  }
}
</style>
