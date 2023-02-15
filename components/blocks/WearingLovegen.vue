<template>
  <div class="wearing-lovegen">
    <!-- <span class="watermark">I'm Wearing Lovegen</span> -->

    <div>
      <div class="dress-showcase">
        <SingleImageBlock
          class="wearing-lovegen-img"
          v-for="(item, idx) of results"
          :key="'der' + idx"
          :comp-data="item"
        />
      </div>
      <div class="load-more">
        <!-- <a href="#"></a> -->
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from 'nuxt-property-decorator';
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
import { FETCH_USER_IMAGE } from '~/utils/store/actions.names';
@Component({
  name: 'WearingLovegen',
  components: {},
})
export default class WearingLovegen extends Vue {
  @Prop() compData: any;
  @Action(FETCH_USER_IMAGE) fetchUserImage: any;
  results: any = [];
  waterMarkAnim() {
    const revealTl = new TimelineMax({});
    revealTl.to('.watermark', 120, {
      x: '-60%',
      ease: Power4.easeOut,
      yoyo: true,
      repeat: -1,
    });

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const controller5 = new ScrollMagic.Controller();
      const scene5: any = new ScrollMagic.Scene({
        triggerElement: '.wearing-lovegen',
        triggerHook: 'onEnter',
      })
        .setTween(revealTl)
        .addTo(controller5);
    }
  }

  public mounted() {
    this.fetchUserImage({ limit: 100, offset: 0 }).then((d: any) => {
      // console.log(d);
      this.results = d.results;
    });
    this.waterMarkAnim();
  }
}
</script>
<style scoped lang="scss">
.wearing-lovegen {
  position: relative;
}
.dress-showcase {
  width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 6rem 1rem;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
  // @include mediaXs {
  //   grid-gap: 4.3rem 1rem;
  //   width: 90% !important;
  // }

  @include mediaXs {
    display: flex !important;
    flex-direction: column;
    width: 90%;
    grid-gap: 0rem 0rem;
  }

  @include iPad {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

.wearing-lovegen-img {
  @include mediaSm {
    margin-bottom: 30px;
  }
}

.load-more {
  margin-top: 80px;
}

.watermark {
  @include watermark;
  font-size: calc(13vw + 16px);
  z-index: 1;
  white-space: nowrap;
  top: 3%;
}
</style>
