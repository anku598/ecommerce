<template>
  <div class="blog-index">
    <BlogIndexSlider :comp-data="pageData.header" />
    <nav>
      <ul v-if="tabs !== null && tabs.length > 0">
        <li @click="activeTab = null" :class="{ active: activeTab == null }">
          All
        </li>
        <li
          @click.prevent="activeTab = tab.id"
          v-for="(tab, idx) in tabs"
          :class="{ active: activeTab == tab.id }"
          :key="'t' + idx"
        >
          {{ tab.name }}
        </li>
      </ul>

      <button
        id="pnAdvancerLeft"
        class="pn-Advancer pn-Advancer_Left"
        type="button"
      >
        <svg
          class="pn-Advancer_Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 551 1024"
        >
          <path
            d="M445.44 38.183L-2.53 512l447.97 473.817 85.857-81.173-409.6-433.23v81.172l409.6-433.23L445.44 38.18z"
          />
        </svg>
      </button>
      <button
        id="pnAdvancerRight"
        class="pn-Advancer pn-Advancer_Right"
        type="button"
      >
        <svg
          class="pn-Advancer_Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 551 1024"
        >
          <path
            d="M105.56 985.817L553.53 512 105.56 38.183l-85.857 81.173 409.6 433.23v-81.172l-409.6 433.23 85.856 81.174z"
          />
        </svg>
      </button>
    </nav>

    <div class="blog-list">
      <BlogList
        :comp-data="item"
        v-for="item in blogs"
        :key="
          'article' + (tabs[activeTab] ? tabs[activeTab].slug : 'all') + item.id
        "
      />
    </div>
  </div>
</template>

<script lang ='ts' scoped>
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import BlogList from '@/components/blocks/BlogList.vue';
import BlogIndexSlider from '@/components/blocks/BlogIndexSlider.vue';
import { Action } from 'vuex-class';
import { OTHER_ENDPOINTS, PAGES_ENDPOINT } from '~/utils/store/endpoints';
// import { FETCH_CHILDREN, FETCHBLOGCATEGORY } from '../store/actions.names';
// import { BlogPage } from '../store/cms.types';
// import { FetchChildrenParams } from '../store/store.types';

@Component({
  name: 'BlogIndexPage',
  components: {
    BlogList,
    BlogIndexSlider,
  },
})
export default class BlogIndexPage extends Vue {
  @Prop() pageData: any;

  tabs: any[] | null = null;
  blogs: any[] = [];
  activeTab: number | null = null;

  @Watch('activeTab')
  handleTabChange(val: number | null, oldVal: number | null) {
    if (val !== oldVal) {
      console.log(val, oldVal);
      this.$fetch();
    }
  }

  async fetch() {
    if (this.tabs === null) {
      const tabs = (await this.$axios
        .get(`${OTHER_ENDPOINTS}/blog-categories/?limit=10&offset=0`)
        .catch((e: any) => {})) as any;
      this.tabs = tabs.data.results;
    }

    const blogs = (await this.$axios
      .$get(
        `${PAGES_ENDPOINT}/?child_of=${this.pageData.id}&type=cms.BlogPage${
          this.activeTab !== null
            ? '&category=' + (this.tabs as any)[this.activeTab - 1].id
            : ''
        }&fields=title,short_description,hero_image_original,hero_image_tab,hero_image_mobile&order=-first_published_at`
      )
      .catch((e: any) => {})) as any;
    this.blogs = blogs.items;
  }
}
</script>

<style lang="scss">
nav {
  @include mediaXs {
    margin-top: 70px;
  }
  ul {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: 0 auto;

    @include mediaSm {
      justify-content: flex-start;
      padding-bottom: 10px;
    }

    @include iPad {
      justify-content: center;
    }

    /* Make this scrollable when needed */
    overflow-x: auto;
    /* We don't want vertical scrolling */
    overflow-y: hidden;
    /* For WebKit implementations, provide inertia scrolling */
    -webkit-overflow-scrolling: touch;
    /* We don't want internal inline elements to wrap */
    white-space: nowrap;
    /* If JS present, let's hide the default scrollbar */
    .js & {
      /* Make an auto-hiding scroller for the 3 people using a IE */
      -ms-overflow-style: -ms-autohiding-scrollbar;
      /* Remove the default scrollbar for WebKit implementations */
      &::-webkit-scrollbar {
        display: none;
      }
    }
    /* positioning context for advancers */
    position: relative;
    // Crush the whitespace here
    font-size: 0;

    li {
      cursor: pointer;
      text-transform: uppercase;
      color: #b1b1b1;
      font-family: $font-family-h;
      font-weight: 600;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
      padding: 0.2rem 1.2rem;
      position: relative;
      display: block;
      &:last-child {
        &::after {
          display: none;
        }
      }

      @include mediaSm {
        &:first-child {
          padding-left: 0;
        }
      }
      &::after {
        content: '';
        height: 90%;
        width: 1px;
        position: absolute;
        top: 0;
        right: -2px;
        background: #5e5e5e;
      }
    }
  }
}

.blog-list {
  width: 90%;
  margin: 0 auto;
  margin-top: 35px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  grid-gap: 40px 40px;
  padding-bottom: 2rem;
  justify-content: center;

  @media (min-width: 2200px) {
    // grid-gap: 56px 50px;
    grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
  }

  @include mediaXs {
    display: flex;
    flex-direction: column;
    margin-top: 25px;
  }
}

.active {
  // border-bottom: 1px solid #5e5e5e;
  color: #000;
}

.blog-index {
  margin-bottom: $section-margin;
  overflow: hidden;
}

.pn-Advancer {
  /* Reset the button */
  appearance: none;
  background: transparent;
  padding: 0;
  border: 0;
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
  }
  /* Now style it as needed */
  position: absolute;
  top: 0;
  bottom: 0;
  /* Set the buttons invisible by default */
  opacity: 0;
  transition: opacity 0.3s;
}

.pn-Advancer_Left {
  left: 0;
  [data-overflowing='both'] ~ &,
  [data-overflowing='left'] ~ & {
    opacity: 1;
  }
}

.pn-Advancer_Right {
  right: 0;
  [data-overflowing='both'] ~ &,
  [data-overflowing='right'] ~ & {
    opacity: 1;
  }
}

.pn-Advancer_Icon {
  width: 20px;
  height: 44px;
  fill: #bbb;
}
</style>
