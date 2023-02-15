<template>
  <div>
    <nuxt-link :to="$route.path + '/' + compData.meta.slug">
      <div class="bl-card">
        <div class="thumb-img">
          <picture>
            <img
              :src="$config.HOST + compData.hero_image_original.url"
              alt="Blog Image"
            />
          </picture>
        </div>

        <div class="blog-content">
          <!-- <p class="date">July 05, 2019</p> -->
          <h3 class="blog-title">{{ compData.title }}</h3>
          <p class="blog-preview-text">{{ compData.short_description }}</p>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang ='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { TimelineMax, Expo, clearProps, TweenMax, Power4 } from "gsap/all";

@Component({
  name: "BlogList",
  components: {},
})
export default class BlogList extends Vue {
  @Prop() compData: any;

  get HOST() {
    return process.env.HOST;
  }

  layoutReveal() {
    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const controller2 = new ScrollMagic.Controller();
      let blogItem = document.querySelectorAll(".bl-card");
      blogItem.forEach((elem) => {
        const revealTl = new TimelineMax({});
        revealTl.fromTo(
          elem,
          1.5,
          { visibility: "hidden", yPercent: 20 },
          {
            ease: Power4.easeOut,
            yPercent: 0,
            visibility: "visible",
            clearProps: "all",
          }
        );
        // Make a ScrollMagic scene
        var scene = new ScrollMagic.Scene({
          triggerElement: elem,
          reverse: false,
          triggerHook: "onEnter",
        })
          .setTween(revealTl)
          .addTo(controller2);
      });
    }
  }

  public mounted() {
    this.layoutReveal();
  }
}
</script>

<style lang="scss" scoped>
.blog-content {
  background: #fff;
  padding: 2rem;
  padding-left: 0;
}

.bl-card {
  position: relative;
  .blog-content {
    // width: 90%;
    // margin: 0 auto;
    // margin-top: -60px;
    // position: relative;
    // box-shadow: 0px 5px 28px -15px rgba(0, 0, 0, 0.69);
    @include mediaXs {
      box-shadow: none;
      background: #fff;
    }
  }
}

.date {
  color: $color-lightgray;
  font-size: 14px;
  font-family: $font-family-h;
  font-weight: 300;
}

.blog-title {
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 1.3rem;
  text-transform: capitalize;
  color: #2e2e2e;
  margin-bottom: 0;
}

.blog-preview-text {
  font-family: $font-family-h;
  font-weight: 300;
  font-size: 1.1rem;
  color: #2e2e2e;
  margin-top: 10px;
  line-height: 28px;
}

.thumb-img {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-bottom: 60%;
  @include mediaXs {
    height: auto;
    // width: 90%;
    // margin: 0 auto;
  }
  // @include mediaXs {
  //   width: 85%;
  //   margin: 0 auto;
  // }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    object-position: top center;
  }
}
</style>
