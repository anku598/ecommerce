<template>
  <div class="collection-page" data-name="collection" v-if="collections">
    <span class="watermark">New Collections</span>

    <transition
      v-on:enter="slideEnter"
      v-on:leave="slideLeave"
      :css="false"
      mode="out-in"
    >
      <section :key="'slide' + currentIndex" v-if="collections.length > 0">
        <div class="left-content">
          <div class="date">
            <h3>New Collections</h3>
            <div class="b-title overflow">
              <p>{{ currentSlide.year }}</p>
            </div>
          </div>

          <div class="b-title overflow">
            <h2>{{ currentSlide.title }}</h2>
          </div>
          <div class="b-para overflow">
            <p class="para">{{ currentSlide.description }}</p>
          </div>
          <div class="slider-bottom">
            <nuxt-link
              :to="$route.path + '/' + currentSlide.meta.slug + '/'"
              class="btn"
              >Discover More</nuxt-link
            >
            <div class="slider-btn">
              <div
                :class="['prev-btn', currentIndex <= 0 ? 'disabled' : '']"
                slot="button-prev"
                @click="move(-1)"
              >
                <i class="fas fa-long-arrow-alt-left"></i>
              </div>
              <div
                :class="[
                  'next-btn',
                  currentIndex >= collections.length - 1 ? 'disabled' : '',
                ]"
                slot="button-next"
                @click="move(1)"
              >
                <i class="fas fa-long-arrow-alt-right"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="right-img">
          <picture>
            <nuxt-link :to="$route.path + '/' + currentSlide.meta.slug + '/'">
              <img
                class="slide-img"
                :src="$config.HOST + currentSlide.hero_image_original.url"
                alt="Winter Collection"
              />
            </nuxt-link>
          </picture>
        </div>
      </section>
    </transition>
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
import { PAGES_ENDPOINT } from "~/utils/store/endpoints";
@Component({
  name: "CollectionIndexPage",
  components: {},
})
export default class CollectionIndexPage extends Vue {
  @Prop() pageData: any;
  collections: any[] = [];

  async fetch() {
    const collections = await this.$axios
      .$get(
        `${PAGES_ENDPOINT}/?child_of=${this.pageData.id}&type=cms.CollectionPage&fields=description,collection_data,image_size_in_carousel,hero_image_original,hero_image_tab,hero_image_mobile`
      )
      .catch((e: any) => {});
    this.collections = collections.items;
  }

  get HOST() {
    return process.env.HOST;
  }

  currentIndex: number = 0;

  move(amount: any) {
    const newIndex = this.currentIndex + amount;
    if (newIndex >= 0 && newIndex < this.collections.length) {
      this.currentIndex = newIndex;
    }
  }

  get currentSlide(): any {
    return this.collections[this.currentIndex];
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
      const controller5 = new ScrollMagic.Controller();
      const scene5: any = new ScrollMagic.Scene({
        triggerElement: ".collection-page",
        triggerHook: "onEnter",
      })
        .setTween(revealTl)
        .addTo(controller5);
    }
  }

  slideEnter(el: HTMLElement, done: any) {
    const title = el.querySelector(".b-title h2");
    const Slug = el.querySelector(".date h3");
    const date = el.querySelector(".b-title p");
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
        "-=0.3"
      )
      .fromTo(date, 1, { y: 100 }, { y: 0, ease: Expo.easeInOut }, 0)
      .fromTo(Slug, 1, { y: 100 }, { y: 0, ease: Expo.easeInOut }, 0)
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

    const date = el.querySelector(".b-title p");
    const paraText = el.querySelector(".b-para .para");
    const slideImg = el.querySelector(".slide-img");
    const SliderAnim = new TimelineMax({});
    SliderAnim.to(
      slideImg,
      1.5,
      {
        opacity: 0,
        onComplete: () => {
          if (done) {
            done();
          }
        },
      },
      "-=1.5"
    );
  }

  slideLeave(el: HTMLElement, done: any) {
    const title = el.querySelector(".b-title h2");
    const Slug = el.querySelector(".date h3");
    const date = el.querySelector(".b-title p");
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
          xPercent: -110,
          // onComplete: () => {
          //   if (done) {
          //     done();
          //   }
          // },
          ease: Expo.easeInOut,
        },
        0
      )
      .fromTo(Slug, 1, { y: 0 }, { y: -100, ease: Expo.easeInOut }, 0)
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

  mounted() {
    this.waterMarkAnim();
  }
}
</script>
<style scoped lang="scss">
.overflow {
  overflow: hidden;
}

.watermark {
  @include watermark;
  font-size: calc(13vw + 16px);
  z-index: 1;
  top: 24%;
  left: 32px;
}

.collection-page {
  height: calc(100vh - 105px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  position: relative;

  @include mediaSm {
    // margin-top: 90px !important;
    height: calc(100vh - 90px);
    margin-bottom: 60px;
  }

  @include iPad {
    margin-bottom: 0 !important;
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

.view {
  position: relative;
}

.left-content {
  // margin-left: calc(10vw + 25px);
  flex-basis: 40%;

  @include mediaSm {
    width: 90%;
    margin: 0 auto;
    margin-top: 25px;
  }

  @include iPad {
    flex-basis: 33%;
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
    }
  }
  h2 {
    font-family: $font-family-h;
    font-size: calc(2.5vw + 15px);
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
  color: rgba(14, 18, 36, 1) !important;
  border-bottom: 1px solid #000;
  padding-right: 0;
  padding-left: 0;
  font-family: $font-family-h;
  font-weight: 600;
  transition: 0.5s ease all;
  transform: translateX(0);
  text-transform: uppercase;
  letter-spacing: 1.1px;
  padding-bottom: 5px;
  font-size: 15px;
  outline: none;
  border-radius: 0;
  @include mediaSm {
    font-size: 13px;
    padding-left: 0rem;
  }
  &:hover {
    color: rgba(14, 18, 36, 0.5) !important;
  }

  &:focus {
    outline: none !important;
  }
}

.right-img {
  padding-left: 2rem;
  flex-basis: 60%;
  height: 70vh;
  overflow: hidden;
  z-index: 2;
  @include mediaMd {
    height: 57vh;
  }
  @include mediaSm {
    padding-left: 0;
    width: 100%;
    order: -1;
  }

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}

.date {
  display: flex;
  justify-content: space-between;
  width: 450px;
  overflow: hidden;
  @include mediaSm {
    width: auto;
    margin-bottom: 18px;
  }
  h3,
  p {
    font-weight: 300;
    font-family: $font-family-h;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    @include mediaSm {
      margin: 0;
      font-size: 0.9rem;
    }
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
  margin-top: 5rem;
  @include mediaMd {
    max-width: 100%;
  }
  @include mediaSm {
    margin-top: 2rem;
    max-width: 100%;
  }
}

.slider-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  .next-btn,
  .prev-btn {
    width: 45px;
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
