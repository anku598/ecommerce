<template>
  <div class="shop-look">
    <div style="overflow: hidden">
      <span class="call-to-action-watermark">{{ compData.watermark }}</span>
    </div>
    <div class="left-img">
      <span class="left-img-box"></span>
      <img
        class="img-fluid"
        :src="$config.HOST + compData.image.original.src"
        :alt="$config.HOST + compData.image.original.alt"
      />
    </div>

    <div class="overlap-bg">
      <div class="shop-content">
        <span class="small-text">{{ compData.subtitle }}</span>
        <h2 class="section-title">{{ compData.title }}</h2>
        <p class="section-para">{{ compData.text }}</p>
        <div class="section-btn-anim">
          <nuxt-link
            class="section-btn"
            v-if="compData.call_to_action.type == 'page'"
            :to="compData.call_to_action.link"
            >{{ compData.call_to_action_label }}</nuxt-link
          >

          <a v-else class="section-btn" :href="compData.call_to_action.link">{{
            compData.call_to_action_label
          }}</a>
        </div>
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
  ScrollToPlugin,
} from "gsap/all";
@Component({
  name: "CallToActionBanner",
  components: {},
})
export default class CallToActionBanner extends Vue {
  @Prop() compData: any;
  get HOST() {
    return process.env.HOST;
  }

  autoScroll() {
    const autoScrollTimeline = new TimelineMax({});
    autoScrollTimeline.to(".call-to-action-watermark", 10, {
      x: "-=1000",
      yoyo: true,
      repeat: -1,
    });

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const autoScrollController = new ScrollMagic.Controller();
      const autoScrollScene: any = new ScrollMagic.Scene({
        triggerElement: ".call-to-action-watermark",
        reverse: true,
        offset: -200,
      })
        .setTween(autoScrollTimeline)
        .addTo(autoScrollController);
    }
  }

  shopLookAnim() {
    const isMobile = window.innerWidth <= 991;
    const shopLookTl = new TimelineMax({});
    if (!isMobile) {
      shopLookTl
        .to(".left-img-box", 1.5, {
          width: "0%",
          transformOrigin: "center center",
          ease: Expo.easeOut,
        })
        .to(
          ".overlap-bg",
          1.5,
          {
            width: "55%",
            transformOrigin: "center center",
            ease: Expo.easeOut,
          },
          "-=1.4"
        )
        .staggerFromTo(
          ".small-text, .shop-content > .section-title,.section-para,.section-btn-anim",
          1.5,
          { x: 300, opacity: 0, z: 0 },
          { x: 0, opacity: 1, z: 0, ease: Expo.easeOut },
          0.05,
          "-=1.2"
        );
    }

    if (isMobile) {
      shopLookTl
        .addLabel("start")
        .fromTo(
          ".shop-look",
          1.5,
          { y: 200, opacity: 0 },
          { y: 0, ease: Power4.easeOut, opacity: 1, clearProps: "all" },
          "start"
        );
    }

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const shopLookController = new ScrollMagic.Controller();
      if (isMobile) {
        const shopLookScene2: any = new ScrollMagic.Scene({
          triggerElement: ".shop-look",
          reverse: false,
          triggerHook: "onEnter",
        })
          .setTween(shopLookTl)
          .addTo(shopLookController);
      } else {
        const shopLookScene2: any = new ScrollMagic.Scene({
          triggerElement: ".shop-look",
          reverse: false,
          offset: 250,
          triggerHook: "onEnter",
        })
          .setTween(shopLookTl)
          .addTo(shopLookController);
      }
    }
  }

  public mounted() {
    if (process.browser && window) {
      this.shopLookAnim();
      this.autoScroll();
    }
  }
}
</script>
<style scoped lang="scss">
.shop-look {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  margin-top: 8vw;
  margin-bottom: $section-margin + 40px;

  @include mediaSm {
    display: flex;
    flex-direction: column;
    flex-direction: column;
    margin-bottom: 0vw;
    margin-top: -160px;
    background: $color-dark-blue;
    padding-bottom: 40px;
  }
  @include iPad {
    display: flex;
    flex-direction: column;
    flex-direction: column;
    margin-bottom: 0vw;
    margin-top: -160px;
    background: $color-dark-blue;
    padding-bottom: 40px;
  }
  @include mediaXs {
    display: flex;
    flex-direction: column;
    margin-bottom: 0vw;
    margin-top: -160px;
    background: $color-dark-blue;
    padding-bottom: 40px;
  }
  .call-to-action-watermark {
    @include watermark;
    top: 2%;
    right: -45%;
    z-index: 1;
  }
  .left-img {
    width: 60%;
    position: relative;
    overflow: hidden;
    z-index: 2;
    height: 95vh;
    @include mediaSm {
      width: 90%;
      margin: 0 auto;
      height: 50vh;
    }

    @include mediaXs {
      width: 90%;
      margin: 0 auto;
      order: 2;
      margin-top: 40px;
    }

    @include iPad {
      order: 2;
    }
    .left-img-box {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #fff;

      @include mediaXs {
        display: none;
      }

      @include mediaSm {
        display: none;
      }

      @include iPad {
        display: none;
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
    }
  }

  .section-para {
    font-size: 1.1rem !important;
  }

  .overlap-bg {
    display: flex;
    justify-content: center;
    width: 0%;
    background: $color-secondary;
    min-height: 570px;
    height: 400px;
    align-items: center;
    position: absolute;
    overflow: hidden;
    top: 50%;
    right: 0;
    z-index: 3;
    // min-width: 55%;
    margin-left: auto;
    transform: translateY(-50%);

    @media (min-width: 1024px) and (max-width: 1171px) {
      min-height: 440px;
    }

    @media (min-width: 768px) and (max-width: 991.98px) {
      min-height: 400px !important;
      width: 60% !important;
    }
    @include mediaSm {
      position: relative;
      transform: translateY(0);
      top: 0;
      margin-right: auto;
      margin-top: 25px;
      width: 100% !important;
      min-height: 450px !important;
    }

    @include iPad {
      min-height: auto !important;
    }
    @include mediaXs {
      position: relative;
      transform: translateY(0);
      top: 0;
      margin-right: auto;
      margin-top: 25px;
      width: 100% !important;
      min-height: auto !important;
      height: auto;
      padding-top: 30px;
    }
    .shop-content {
      color: #fff;
      @media (min-width: 768px) and (max-width: 991.98px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      @include mediaSm {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      @include mediaXs {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      @media screen and (min-width: 1024px) {
        max-width: 100%;
        width: 100%;
        margin-left: 11vw;
      }
    }

    span {
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      letter-spacing: 11px;
      text-transform: uppercase;
      color: #fff;
      position: relative;
      display: block;

      @include mediaSm {
        text-align: center;
        letter-spacing: 7px;
      }

      @include mediaXs {
        text-align: center;
        letter-spacing: 7px;
      }
      &:before {
        position: absolute;
        content: "";
        top: 50%;
        width: 60px;
        height: 1px;
        left: -120px;
        transform: translate(50%, -50%);
        background: rgba(255, 255, 255, 0.5);

        @media (min-width: 768px) and (max-width: 991.98px) {
          display: none;
        }

        @include mediaSm {
          display: none;
        }

        @include mediaXs {
          display: none;
        }
      }
    }
    .section-title {
      font-size: 4rem;
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 30px;
      color: #fff;
      margin-bottom: 0;

      @media (min-width: 1024px) and (max-width: 1171px) {
        font-size: 3.5rem;
      }

      @media (min-width: 768px) and (max-width: 991.98px) {
        font-size: 3rem;
      }

      @include mediaSm {
        font-size: 2rem;
      }

      @include mediaXs {
        font-size: 2rem;
        margin-top: 14px;
      }
    }
    p {
      width: 80%;
      font-family: "Roboto", sans-serif;
      color: #fff;
      font-weight: 300;
      font-size: 17px;
      line-height: 28px;
      margin: 20px 0;
      @media (min-width: 768px) and (max-width: 991.98px) {
        text-align: center;
      }
      @include mediaSm {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
      }
    }

    .section-btn-anim {
      display: inline-flex;
      overflow: hidden;
    }

    .section-btn {
      color: #fff;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 400;
      text-decoration: none;
      font-family: $font-family-h;
      padding-bottom: 5px;
      letter-spacing: 1.5px;
      // display: block;
      background-color: $color-secondary;
      position: relative;
      background-size: 250%;
      padding: 10px 20px;
      border: 1px solid #fff;
      display: inline-flex;
      background-image: linear-gradient(90deg, transparent 50%, white 50%);
      transition: all 0.4s ease-in-out;
      overflow: hidden;
      &:hover {
        background-position: 100%;
        color: $color-secondary;
      }
    }
  }
}
</style>
