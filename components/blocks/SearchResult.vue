<template>
  <div>
    <transition
      v-if="!SearchShow"
      @enter="searchRevealEnter"
      @leave="searchRevealLeave"
      :css="false"
      mode="out-in"
    >
      <div
        class="search-wrapper"
        v-show="showSearchField.fieldShow"
        ref="wrapper"
      >
        <div class="search-form">
          <p class="field">
            <input
              ref="focusMe"
              type="text"
              v-model="searchTerm"
              @keyup="getProducts"
              placeholder="Start typing what you are looking for"
            />
            <a
              @click.prevent="
                setSearchNavToggle({ animation: true, fieldShow: false })
              "
              href="#"
              class="close-btn"
            >
              <img src="@/assets/img/search-close.svg" alt />
            </a>
          </p>
        </div>
        <transition @leave="searchListleave" :css="false" mode="out-in">
          <div
            class="search-result"
            v-if="products != null"
            :key="'p' + searchTerm"
            ref="searchResults"
          >
            <div class="result-collection" ref="inside">
              <p class="reset-text">
                {{ products.totalCount }} Result{{
                  products.totalCount > 1 ? "s" : ""
                }}.
                <a href="#" @click.prevent="reset()">Reset</a>
              </p>

              <!-- <p v-if="products.results.length == 0"></p>
            {{products.count}} Result
            <a href="#" @click.prevent="reset">Reset</a>
            </p>-->

              <div class="products-wrapper">
                <ShopSingleProduct
                  v-for="product in products.edges"
                  :key="product.node.id"
                  :shop-product="product.node"
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <div v-if="SearchShow">
      <transition>
        <div class="search-wrapper" ref="wrapper">
          <div class="search-form">
            <div class="field">
              <div class="form-group">
                <input
                  ref="focusMe"
                  class="form-input"
                  type="text"
                  v-model="searchTerm"
                  @keyup="getProducts"
                  placeholder="Start typing what you are looking for"
                />
              </div>

              <div
                v-if="products == null"
                class="search-icon"
                :class="{
                  'is-search-active': showSearchField.fieldShow == true,
                }"
              >
                <a
                  href="#"
                  @click.prevent="
                    setSearchNavToggle({
                      animation: true,
                      fieldShow: !showSearchField.fieldShow,
                    })
                  "
                >
                  <i class="fas fa-search"></i>
                </a>
              </div>

              <a v-else @click.prevent="reset()" href="#" class="close-btn">
                <img src="@/assets/img/search-close.svg" alt />
              </a>
            </div>
          </div>
          <transition @leave="searchListleave" :css="false" mode="out-in">
            <div
              class="search-result"
              v-if="products != null"
              :key="'p' + searchTerm"
              ref="searchResults"
            >
              <div class="result-collection" ref="inside">
                <p class="reset-text">
                  {{ products.totalCount }} Result{{
                    products.totalCount > 1 ? "s" : ""
                  }}.
                  <a href="#" @click.prevent="reset()">Reset</a>
                </p>

                <!-- <p v-if="products.results.length == 0"></p>
            {{products.count}} Result
            <a href="#" @click.prevent="reset">Reset</a>
            </p>-->

                <div class="products-wrapper">
                  <ShopSingleProduct
                    v-for="product in products.edges"
                    :key="product.node.id"
                    :shop-product="product.node"
                  />
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  Component,
  Getter,
  Mutation,
  Prop,
  Vue,
  Watch,
} from "nuxt-property-decorator";
import animations from "~/scripts/animations";
import { isMobile } from "~/scripts/utils/MobileDetect";
import { SEARCH_FIELD_NAV_STATE } from "~/utils/store/getters.names";
import { SET_SEARCH_NAV_TOGGLE } from "~/utils/store/mutations.names";
import { namespaced, NS_ANIM } from "~/utils/store/namespaces.names";
import { SearchFieldToggleEvent } from "~/utils/store/store.types";
import ProductList from "~/apollo/products/queries/ProductList.gql";

@Component({
  name: "SearchResult",
  components: {},
})
export default class SearchResult extends Vue {
  searchTerm: string = "";
  products: any | null = null;
  pageSize: number = 20;
  timeout: null | any;

  SearchShow: boolean = false;

  @Getter(namespaced(NS_ANIM, SEARCH_FIELD_NAV_STATE))
  showSearchField!: SearchFieldToggleEvent;
  @Mutation(namespaced(NS_ANIM, SET_SEARCH_NAV_TOGGLE)) setSearchNavToggle: any;

  @Watch("searchTerm")
  handleSearchTermChange(val: string, oldVal: string) {
    console.log(val);
  }

  getProducts(evt: any) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const val = this.searchTerm.trim();
      if (val.length === 0) {
        // console.log('setting null');
        this.products = null;
      } else {
        (this as any).$apollo
          .query({
            query: ProductList,
            variables: {
              filter: { search: val, isPublished: true },
              pageSize: this.pageSize,
            },
          })
          .then((req: any) => {
            this.products = req.data.products;
          });
      }
    }, 300);
  }

  handleView() {
    this.SearchShow = window.innerWidth <= 991;
    window.addEventListener("resize", this.handleView);
  }

  searchRevealEnter(element: any, done: any) {
    animations
      .get("search-form-reveal-anim")(element, true)
      .eventCallback("onComplete", done)
      .play();
    if (window.innerWidth >= 991) {
      (this.$refs.focusMe as any).focus();
    }
  }

  executeLeaveAnimation(element: any, done: any) {
    if (this.showSearchField.animation == false) {
      // This will work.
      this.setSearchNavToggle({
        fieldShow: this.showSearchField.fieldShow,
        animation: true,
      });

      this.reset();
      (this.$refs.wrapper as any).style.display = "none";

      // // why animation here? It's animation false, right? yes
      (this.$parent.$parent.$refs.main as any).style.display = "block";
      (this.$parent.$parent.$refs.footer as any).style.display = "block";
    } else {
      animations
        .get("search-form-reveal-anim")(element, false)
        .eventCallback("onReverseComplete", () => {
          done();
        })
        .progress(0.7)
        .reverse();
      (this.$parent.$parent.$refs.main as any).style.display = "block";
      (this.$parent.$parent.$refs.footer as any).style.display = "block";
    }
  }

  searchRevealLeave(element: any, done: any) {
    if (this.products == null) {
      this.executeLeaveAnimation(element, done);
    } else {
      this.products = null;
      setTimeout(() => {
        this.executeLeaveAnimation(element, done);
      }, 840); //now tweak this time value to get optimal result. okay
    }
  }

  searchListleave(element: any, done: any) {
    // how much time does this take?
    // if (this.showSearchField.animation == false) {
    //   // This will work.
    //   this.setSearchNavToggle({
    //     fieldShow: this.showSearchField.fieldShow,
    //     animation: true
    //   });
    //   animations
    //     .get('search-form-enter-anim')(element, false)
    //     .eventCallback('onReverseComplete', () => {
    //       done();
    //     })
    //     .progress(0)
    //     .reverse();
    // } else {
    //   // this.setSearchNavToggle({ animation: true, fieldShow: false });
    //   animations
    //     .get('search-form-enter-anim')(element, false)
    //     .eventCallback('onReverseComplete', () => {
    //       done();
    //     })
    //     .progress(0.7)
    //     .reverse();
    // }

    animations
      .get("search-form-enter-anim")(element, false)
      .eventCallback("onReverseComplete", () => {
        done();
      })
      .progress(1)
      .reverse();
  }

  reset() {
    this.searchTerm = "";
    this.products = null;
  }

  @Watch("products", { deep: true })
  productsState(newVal: any, oldVal: any) {
    if (newVal !== null) {
      if (window.innerWidth >= 991.98) {
        (this.$parent.$parent.$refs.main as any).style.display = "none";
        (this.$parent.$parent.$refs.footer as any).style.display = "none";
      }
      if (window.innerWidth <= 990) {
        this.enableScroll();
      }
    } else {
      (this.$parent.$parent.$refs.main as any).style.display = "block";
      (this.$parent.$parent.$refs.footer as any).style.display = "block";
    }
  }

  disableScroll() {
    document.body.style.overflow = "hidden";
    (document as any).querySelector("html").scrollTop = window.scrollY;
  }

  enableScroll() {
    (document.documentElement as any).style.overflow = null;
  }

  @Watch("setSearchNavToggle.fieldShow")
  handleFieldShowChange(val: boolean, oldVal: boolean) {
    if (val == false) {
      this.reset();
    }
  }

  mounted() {
    if (process.browser && window) {
      this.handleView();
    }
    // console.log(this.$parent.$parent.$refs);
  }
}
</script>
<style scoped lang="scss">
.search-wrapper {
  position: fixed;
  top: 123px;
  left: 0;
  right: 0;
  background: transparent;
  width: 100%;
  z-index: 11;
  transition: all 0.5s ease-out;
  margin: 0 auto;

  @media screen and (max-width: 991px) {
    top: 85px;
    z-index: 0;
  }

  // @include mediaSm {

  // }
}

.search-icon {
  @media screen and (max-width: 991px) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 7%;
  }
}

// .search-result {
//   margin: 0 auto;
//   background: #fff;
//   padding-top: 38px;
//   min-height: calc(100vh - 203px);
//   @include mediaXs {
//     padding-top: 20px;
//     position: absolute;
//     height: calc(100vh - 120px);
//     width: 100%;
//     overflow-y: auto;
//   }
// }

.search-result {
  padding-top: 20px;
  position: absolute;
  height: calc(100vh - 120px);
  width: 100%;
  overflow-y: auto;
  background: #fff;
}

.result-collection {
  width: 90%;
  margin: 0 auto;
  min-height: 100%;

  @include mediaXs {
    min-height: auto;
    height: 3000px;
  }
}

.reset-text {
  text-align: center;
  font-family: $font-family-h;
  font-weight: 400;
  color: #2e2e2e;
  margin-bottom: 38px;
  @include mediaXs {
    margin-bottom: 20px;
    font-size: 12px;
  }
  a {
    color: #919191;
    position: relative;
    &::before {
      position: absolute;
      bottom: -4px;
      content: "";
      width: 0;
      height: 1px;
      background: #919191;
      transition: all 0.4s ease-in-out;
    }

    &:hover {
      &:before {
        width: 100%;
        transition: all 0.4s ease-in-out;
      }
    }
  }
}

::v-deep .form-group {
  height: 100%;
}

.products-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(416px, 1fr));
  grid-gap: 56px 16px;
  margin-bottom: 160px;
  position: relative;
  z-index: 2;

  @include mediaXs {
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
    margin-bottom: 100px;
  }

  @include mediaSm {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @include mediaMd {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @include mediaLg {
    grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  }

  @media (min-width: 1171px) and (max-width: 1422px) {
    grid-template-columns: repeat(auto-fill, minmax(316px, 1fr));
  }
}

.field {
  position: relative;
  height: 100%;
}

.close-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 25px;
}

.search-form {
  background: #f6f6f6;
  width: 95%;
  margin: 0 auto;
  height: 80px;

  @media screen and (max-width: 991px) {
    width: 100%;
    height: 40px;
  }
}

input[type="text"],
input[type="password"] {
  font-size: 1.1rem;
  font-weight: 400;
  font-family: $font-family-h;
  border: 0px solid $color-lightgray; /* Remove the default border */
  background: #f9f9f9;
  color: $color-secondary;
  width: 100%;
  transition: color 0.3s ease-out;
  background: transparent;
  padding: 0px 25px;
  height: 100%;
  @include mediaXs {
    font-size: 16px !important;
  }

  &::placeholder {
    color: #bfbfbf;
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 1.1rem;

    @include mediaSm {
      font-size: 0.9rem;
    }
  }
}

input[type="text"]:focus,
input[type="password"]:focus {
  border: 0px solid $color-lightgray;
  outline: none;
}

// input[type='text'] .result-page {
//   min-height: 100%;
// }

input[type="text"]:focus,
input[type="number"]:focus,
textarea:focus {
  font-size: 16px !important;
}

/* disable auto-zoom on iphone input field focus */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  select:focus,
  textarea:focus,
  input:focus {
    font-size: 16px !important;
  }
}
</style>
