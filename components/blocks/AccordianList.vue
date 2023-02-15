<template>
  <div class="accordian-list">
    <ul class="accordian-wrapper">
      <li
        v-for="(item, idx) in faq"
        :key="'accordian' + idx"
        @click.prevent="
          contentVisible === idx
            ? contentVisible == false
            : (contentVisible = idx)
        "
      >
        <div class="acc-title">
          <div
            class="accordian-badge"
            :class="{ isActive: contentVisible === idx }"
          >
            <div class="line line-one"></div>
            <div class="line line-two"></div>
          </div>
          {{ item.title }}
        </div>
        <transition
          name="expand"
          @enter="enter"
          @after-enter="afterEnter"
          @leave="leave"
        >
          <div
            v-if="contentVisible === idx"
            v-html="item.content"
            class="acc-text"
          ></div>
        </transition>
      </li>
    </ul>
    <!-- <h2>AccordianList</h2> -->
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
import { namespaced } from '~/utils/store/namespaces.names';
import { FETCH_FAQ } from '~/utils/store/actions.names';
@Component({
  name: 'accordian-list',
  components: {},
})
export default class AccordianList extends Vue {
  contentVisible: boolean = false;
  @Action(namespaced('faq', FETCH_FAQ)) fetchFaq: any;
  faq: any = [];

  enter(el: any) {
    el.style.height = 'auto';
    const height = getComputedStyle(el).height;
    el.style.height = 0;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = height;
    });
  }

  afterEnter(el: any) {
    el.style.height = 'auto';
  }

  leave(el: any) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = 0;
    });
  }

  async fetch() {
    this.faq = await this.fetchFaq();
  }
}
</script>
<style scoped lang="scss">
.accordian-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  margin-top: 3rem;
  @include mediaXs {
    margin-top: 1rem;
  }

  li {
    font-family: $font-family-h;
    font-weight: 500;
    padding: 0.8rem 0.5rem;
    width: 100%;
    position: relative;
    cursor: pointer;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.3);
    &:first-child {
      border-top: 1px solid rgba($color: #000000, $alpha: 0.3);
    }

    @include mediaXs {
      padding: 0rem 0.5rem;
    }
  }
}

.line {
  width: 12px;
  height: 2px;
  background: $color-lightgray;
  transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.line-two {
  transform: rotate(90deg) translateX(-2px);
}

.accordian-badge {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;

  .line {
    width: 10px;
  }

  &.isActive {
    .line {
      transform: rotate(180deg);
    }

    .line-two {
      opacity: 0;
    }
  }
}

.acc-title {
  padding: 1rem 0;
  position: relative;
  @include mediaXs {
    font-size: 14px;
  }
}

// .line {
//   width: 15px;
//   height: 1px;
//   background: #000;
// }

.acc-text {
  pointer-events: none;
  font-size: 14px;
  font-weight: 300;
  font-family: $font-family-h;
  line-height: 25px;
  @include mediaXs {
    font-size: 12px;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s ease-in-out;
  overflow: hidden;
}

// .line-two {
//   transform: rotate(90deg);
// }
</style>