<template>
  <div>
    <div class="mobile-menu" :class="{}">
      <div class="left-item">
        <div class="menu-bar" @click.prevent="burgerMenuClick">
          <span class="one line"></span>
          <span class="two line"></span>
          <span class="three line"></span>
        </div>
        <div>
          <div class="logo">
            <nuxt-link to="/">
              <img
                src="@/assets/img/logo-black.svg"
                class="mobile-logo"
                alt="Logo"
              />
            </nuxt-link>
          </div>
        </div>
      </div>

      <div class="right-item">
        <!-- <router-link to>
          <img src="@/assets/img/cart-icon-black.svg" alt="Cart Icon" />
        </router-link>
        <router-link to>
          <i class="far fa-user"></i>
        </router-link>-->

        <ul class="header-action">
          <li v-if="authenticated || guest">
            <a @click.prevent="toggleCartShowing" class="wishlist-icon" href>
              <img src="@/assets/img/cart-icon-black.svg" alt="Cart Icon" />
              <span v-if="cart !== null && cart.lines.length > 0">{{
                cart.lines.length
              }}</span>
            </a>
          </li>

          <!-- <li :class="{'is-profile-active':(isCartShowing == true)}">
              <a @click.prevent="toggleCartShowing" class="wishlist-icon" href>
                <img
                  v-if="isCartShowing == true"
                  src="@/assets/img/bag-white.svg"
                  alt="wishlist icon"
                />
                <img v-else src="@/assets/img/bag.svg" alt="wishlist icon" />
                <p>
                  Bag
                  <span v-if="cart.length  > 0">({{cart.length}})</span>
                </p>
              </a>
          </li>-->
          <!-- <li>
            <router-link to>
              <i class="far fa-user"></i>
            </router-link>
          </li>-->

          <!-- <li >
            <transition
              @enter="ProfileNavEnter"
              @leave="ProfileNavLeave"
              mode="out-in"
              :css="false"
            >
              <ProfileNav v-if="profileNavState" />
            </transition>

            <a href="#" @click.prevent="setProfileNavToggle(!profileNavState)">
              <i class="far fa-user"></i>
            </a>
          </li> -->

          <li v-if="authenticated">
            <transition
              @enter="ProfileNavEnter"
              @leave="ProfileNavLeave"
              mode="out-in"
              :css="false"
            >
              <ProfileNavComp v-if="showProfileNav" />
            </transition>

            <a href="#" @click.prevent="ProfileNavToggle">
              <i class="far fa-user"></i>
            </a>

            <!-- <ProfileNav /> -->
          </li>
          <li v-else>
            <a href="#" @click.prevent="LoginformToggle">
              <i class="far fa-user"></i>
            </a>
            <!-- <transition
              @enter="LoginFormEnter"
              @leave="LoginFormLeave"
              mode="out-in"
              :css="false"
            >

            </transition> -->
            <LoginForm
              v-if="showLogin && !authenticated"
              v-on:toggle-login="LoginformToggle"
            ></LoginForm>
            <!-- <LoginForm v-if="showLogin"></LoginForm> -->
          </li>
        </ul>
      </div>

      <transition
        @enter="mobileMenuEnter"
        @leave="mobileMenuLeave"
        :css="false"
      >
        <div class="mobile-nav" v-if="showMobileNav">
          <div class="top-item">
            <div class="top-logo">
              <nuxt-link to="/">
                <img src="@/assets/img/logo-black.svg" alt="Logo" />
              </nuxt-link>
            </div>

            <div class="close-icon" @click.prevent="burgerMenuClose">
              <span class="one line"></span>
              <span class="three line"></span>
            </div>
          </div>
          <ul class="nav">
            <div class="item-wrap">
              <li
                class="dropdown menu-link"
                :class="{ 'menu-highlight': mitem.highlight }"
                v-for="(mitem, idx) in mainMenu"
                :key="'mc' + idx"
              >
                <router-link
                  :to="`${mitem.link}${mitem.url_append}`"
                  v-if="mitem.link !== null"
                >
                  {{ mitem.label }}
                </router-link>
                <a
                  v-else
                  class="demo"
                  @click="multiNavHandler(true, mitem, idx)"
                >
                  {{ mitem.label }}
                  <i class="fas fa-chevron-right"></i>
                </a>

                <!-- <div v-if="mitem.children.length > 0">
                <div class="dropdown-bg">
                  <span>Back</span>
                  <h2>Woman Collections</h2>
                  <ul
                    class="dropdown-content"
                    v-if="mitem.children && menuPopUp == idx"
                  >
                    <div class="container-fluid">
                      <div class="row">
                        <div
                          class="col-sm-6 col-md-4 col-6 custom-margin"
                          v-for="(child, idnx) in mitem.children"
                          :key="'c' + idnx"
                        >
                          <router-link :to="child.link">
                            <div class="category-img">
                              <picture>
                                <img
                                  src="@/assets/img/instaphotos/img1.jpg"
                                  alt="ImageOne"
                                />
                              </picture>
                            </div>
                            <span>{{ child.label }}</span>
                          </router-link>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div> -->
              </li>
            </div>
          </ul>
          <!-- <p>Bottom Nav</p> -->

          <SearchResult />

          <!-- <div class="search-icon type-form">
            <form class="example" action="/action_page.php">
              <input type="text" placeholder="Type to search" name="search" />
              <button type="submit">
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div> -->

          <!-- <div
            class="search-icon"
            :class="{ 'is-search-active': showSearchField.fieldShow == true }"
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
          </div> -->

          <div class="bottom-nav">
            <div class="lang-item mobile-country" v-if="currentCountry">
              <a
                class="currency-hover"
                href="#"
                @click.prevent="showCurrencyDropDown = !showCurrencyDropDown"
                ><img :src="currentCountry.icon" alt=""
              /></a>
              <transition name="slide-fade">
                <ul v-if="!showCurrencyDropDown" class="dropdown-currency">
                  <li
                    v-for="(country, idx) in countryOptions"
                    :key="`copts-${idx}`"
                  >
                    <a :href="country.url"
                      ><img :src="country.icon" alt=""
                    /></a>
                  </li>
                </ul>
              </transition>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div
      class="navbar desktop-menu"
      :class="{
        hidden: !showNavbar,
        'not-hidden': navFixed,
      }"
    >
      <div class="top-bar">
        <div class="lang-item" v-if="currentCountry">
          <div class="lang-item-flex">
            <a
              class="currency-hover"
              href="#"
              @click.prevent="showCurrencyDropDown = !showCurrencyDropDown"
              ><img :src="currentCountry.icon" alt=""
            /></a>
            <i class="fas fa-caret-down"></i>
          </div>
          <ul v-if="countryOptions" class="dropdown-currency">
            <li v-for="(country, idx) in countryOptions" :key="`copts-${idx}`">
              <a :href="country.url"><img :src="country.icon" alt="" /></a>
            </li>
          </ul>
        </div>
        <div class="wishlist-item">
          <ul>
            <!-- <li>
              <router-link to="/contact">Contact</router-link>
            </li> -->
            <!-- <li>
              <nuxt-link to="#">
                <img src="@/assets/img/favorite.svg" alt />
                <p>
                  Wishlist
                  <span>(3)</span>
                </p>
              </nuxt-link>
            </li> -->
            <li
              v-if="authenticated || guest"
              :class="{
                'is-profile-active': isCartShowing == true,
              }"
            >
              <a @click.prevent="toggleCartShowing" class="wishlist-icon" href>
                <img
                  v-if="isCartShowing == true"
                  src="@/assets/img/bag-white.svg"
                  alt="wishlist icon"
                />
                <img v-else src="@/assets/img/bag.svg" alt="wishlist icon" />
                <p>
                  Bag
                  <span v-if="cart !== null && cart.lines.length > 0"
                    >({{ cart.lines.length }})</span
                  >
                </p>
              </a>
            </li>
            <li v-if="1 == 2">
              <!-- <a @click.prevent="profileNavToggle()" href="#">profile</a>

              <transition
                @enter="ProfileNavEnter"
                @leave="ProfileNavLeave"
                mode="out-in"
                :css="false"
              >
                <ProfileNav v-if="profileNavState" />
              </transition>

              <a href="#">Profile</a> -->

              <!-- <ProfileNav /> -->
            </li>
            <li v-if="authenticated">
              <transition
                @enter="ProfileNavEnter"
                @leave="ProfileNavLeave"
                mode="out-in"
                :css="false"
              >
                <ProfileNavComp
                  v-if="showProfileNav"
                  v-on:toggle-profile="ProfileNavToggle"
                />
              </transition>

              <a href="#" @click.prevent="ProfileNavToggle">Profile</a>

              <!-- <ProfileNav /> -->
            </li>
            <li v-else>
              <a @click.prevent="LoginformToggle">Login</a>
              <!-- <transition
                @enter="LoginFormEnter"
                @leave="LoginFormLeave"
                mode="out-in"
                :css="false"
              >
                <LoginForm
                  @close="
                    setAccountNavToggle({ animation: false, show: false })
                  "
                ></LoginForm>
              </transition> -->

              <LoginForm
                v-if="showLogin && !authenticated"
                v-on:toggle-login="LoginformToggle"
              ></LoginForm>
            </li>
          </ul>
        </div>
      </div>
      <div class="desktop-main-menu">
        <div class="logo">
          <nuxt-link to="/">
            <img src="@/assets/img/logo-black.svg" alt="Logo" />
          </nuxt-link>
        </div>
        <ul class="nav">
          <li
            v-for="(mitem, idx) in mainMenu"
            :key="'m' + idx"
            :class="{ 'menu-highlight': mitem.highlight }"
            @mouseenter="multiNavHandler(true, mitem, idx)"
            @mouseleave="multiNavHandler(false, mitem, idx)"
          >
            <nuxt-link
              class="gelo"
              :to="`${mitem.link}${mitem.url_append}`"
              v-if="mitem.link !== null"
              >{{ mitem.label }}</nuxt-link
            >

            <a v-else>{{ mitem.label }}</a>

            <!-- <transition
              @enter="DropDownMenuEnter"
              @leave="DropDownMenuLeave"
              :css="false"
              mode="out-in"
            > -->
            <div class="dropdown-bg" v-if="mitem.children && menuPopUp == idx">
              <ul class="dropdown-content">
                <swiper :options="swiperOption" class="desk-swiper-container">
                  <swiper-slide
                    class="sub-menu-item"
                    v-for="(child, idnx) in mitem.children"
                    :key="'c' + idnx"
                  >
                    <nuxt-link :to="`${child.link}${child.url_append}`">
                      <div class="category-img">
                        <img
                          :src="$config.HOST + child.image.url"
                          alt="ImageOne"
                        />
                      </div>
                      <span>{{ child.label }}</span>
                    </nuxt-link>
                  </swiper-slide>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
              </ul>
            </div>
            <!-- </transition> -->
          </li>

          <div
            class="search-icon"
            :class="{ 'is-search-active': showSearchField.fieldShow == true }"
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
        </ul>
      </div>
    </div>

    <SearchResult class="mobile-none" />

    <transition @enter="CartEnter" @leave="CartLeave" :css="false">
      <!-- <CartList v-if="isCartShowing && cart.length > 0" v-on:toggle-cart="toggleCartShowing" /> -->
      <CartList
        v-if="isCartShowing && cart.lines.length > 0"
        v-on:toggle-cart="toggleCartShowing"
      />
    </transition>
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
import {
  AUTHENTICATED,
  CART,
  MAIN_MENU,
  SEARCH_FIELD_NAV_STATE,
  SETTINGS,
} from "~/utils/store/getters.names";
import {
  SET_SEARCH_NAV_TOGGLE,
  SET_SETTINGS,
} from "~/utils/store/mutations.names";
import {
  MainMenuItem,
  SearchFieldToggleEvent,
  SettingsData,
} from "~/utils/store/store.types";
import {
  TimelineMax,
  CSSPlugin,
  ScrollToPlugin,
  Draggable,
  Power4,
  Power2,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
  fromTo,
} from "gsap/all";
import LoginForm from "./LoginForm.vue";
import ProfileNav from "~/scripts/animations/ProfileNavAnim";
import { namespaced, NS_ANIM, NS_USER } from "~/utils/store/namespaces.names";
import animations from "~/scripts/animations";
import { Checkout } from "~/graphqlTypes";
import { onClient } from "../../utils/animation";
import { getProducts } from "~/utils/sitemap";
import { GUEST } from "../../utils/store/getters.names";
@Component({
  name: "Navigation",
  components: {
    LoginForm,
    ProfileNav,
  },
})
export default class Navigation extends Vue {
  @Getter(`settings/${SETTINGS}`) settings: any;
  @Getter(namespaced(NS_USER, AUTHENTICATED)) authenticated!: any;
  @Getter(namespaced(NS_USER, CART)) cart!: any;
  @Getter(namespaced(NS_ANIM, SEARCH_FIELD_NAV_STATE))
  showSearchField!: SearchFieldToggleEvent;
  @Getter(namespaced(NS_USER, GUEST)) guest!: string | null;
  @Mutation(namespaced(NS_ANIM, SET_SEARCH_NAV_TOGGLE)) setSearchNavToggle: any;
  get mainMenu(): any | null {
    if (this.settings == null) {
      return [];
    } else {
      return this.settings.menus.main_menu;
    }
  }

  get HOST() {
    return process.env.HOST;
  }

  menuPopUp: number | null = null;
  menuBarTl: any = new TimelineMax({ paused: true });
  navAnimTl: any = new TimelineMax({});

  isSearchOpen: boolean = false;
  isSearchFormOpen: boolean = false;
  showNavbar: boolean = true;
  isCartShowing: boolean = false;
  lastScrollPosition: any = 0;
  navbarShow: any = false;
  showProfileNav: any = false;
  showMobileNav: boolean = false;
  showCurrencyDropDown: boolean = true;
  showLogin: any = false;
  countries: any = {
    IN: {
      name: "India",
      icon: require("../../assets/india.svg"),
      url: "https://lovegen.com",
    },
    BD: {
      name: "Bangladesh",
      url: "https://lovegenbd.com",
      icon: require("../../assets/bangladesh.svg"),
    },
  };

  get currentCountry() {
    return this.countries[(this as any).$config.SITE_COUNTRY];
  }

  get countryOptions() {
    const countries: any[] = [];
    Object.keys(this.countries).map((k: string) => {
      if (k != (this as any).$config.SITE_COUNTRY) {
        countries.push(this.countries[k]);
      }
    });
    return countries;
  }

  get navFixed() {
    const pathParts = this.$route.path.split("/");
    return pathParts.length >= 2 && pathParts[1] === "store";
  }

  burgerMenuClick() {
    this.showMobileNav = true;
  }

  burgerMenuClose() {
    this.showMobileNav = !this.showMobileNav;
  }

  @Watch("$route", { deep: true, immediate: true })
  handleRouteChange(val: any, oldVal: any) {
    this.showMobileNav = false;
    if (process.browser && window) {
      this.showLogin = false;
      document.documentElement.style.overflow = "inherit";
      this.showProfileNav = false;
      this.isCartShowing = false;
      document.documentElement.style.overflow = "inherit";
    }

    // console.log(val.query);
  }

  LoginformToggle() {
    this.showLogin = !this.showLogin;
  }

  ProfileNavToggle() {
    this.showProfileNav = !this.showProfileNav;
  }

  multiNavHandler(isActive: boolean, item: any, idx: number) {
    if (item.children.length > 0) {
      this.menuPopUp = isActive ? idx : null;
    }
  }

  onScroll() {
    if (window.pageYOffset < 0) {
      return;
    }
    if (Math.abs(window.pageYOffset - this.lastScrollPosition) < 60) {
      return;
    }
    this.showNavbar = window.pageYOffset < this.lastScrollPosition;
    this.lastScrollPosition = window.pageYOffset;
  }

  navAnim() {
    if (this.$route.name == "new-arrival") {
      // console.log('whooo');
    }
    this.lastScrollPosition = window.pageYOffset;
    window.addEventListener("scroll", this.onScroll);
  }

  get currentRouteName() {
    return this.$route.name == "user-checkout";
  }

  toggleCartShowing() {
    this.isCartShowing = !this.isCartShowing;
    if (this.isCartShowing) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "inherit";
    }
  }

  LoginFormEnter(element: any, done: any) {
    if (process.browser && window) {
      animations
        .get("login-form-anim")(element, true)
        .eventCallback("onComplete", done)
        .play();
      window.document.documentElement.style.overflow = "hidden";
    }
  }

  LoginFormLeave(element: any, done: any) {
    animations
      .get("login-form-anim")(element, false)
      .eventCallback("onReverseComplete", () => {
        done();
      })
      .progress(1)
      .reverse();
    document.documentElement.style.overflow = "inherit";
  }

  CartEnter(element: any, done: any) {
    animations
      .get(this.cart.lines.length > 0 ? "shopping-cart" : "empty-cart")(
        element,
        true
      )
      .eventCallback("onComplete", done)
      .play();
  }

  CartLeave(element: any, done: any) {
    animations
      .get(this.cart.lines.length > 0 ? "shopping-cart" : "empty-cart")(
        element,
        false
      )
      .eventCallback("onReverseComplete", () => {
        done();
      })
      .progress(1)
      .reverse();
  }

  ProfileNavEnter(element: any, done: any) {
    animations
      .get("profile-nav")(element, true)
      .eventCallback("onComplete", done)
      .play();
    document.documentElement.style.overflow = "hidden";
  }

  ProfileNavLeave(element: any, done: any) {
    animations
      .get("profile-nav")(element, false)
      .eventCallback("onReverseComplete", () => {
        done();
      })
      .progress(1)
      .reverse();
    document.documentElement.style.overflow = "inherit";
  }

  mobileMenuEnter(element: any, done: any) {
    animations
      .get("mobile-menu")(element, true)
      .eventCallback("onComplete", done)
      .play();
    document.documentElement.style.overflow = "hidden";
  }

  mobileMenuLeave(element: any, done: any) {
    document.documentElement.style.overflow = "inherit";
    this.menuBarTl.reversed(!this.menuBarTl.reversed());

    animations
      .get("mobile-menu")(element, true)
      .eventCallback("onReverseComplete", () => {
        done();
      })
      .progress(0)
      .reverse();
    document.documentElement.style.overflow = "inherit";
  }
  // else {
  //   animations
  //     .get('mobile-menu')(element, true)
  //     .eventCallback('onReverseComplete', () => {
  //       done();
  //     })
  //     .progress(1)
  //     .reverse();
  // }

  created() {
    if (process.browser && window) {
      this.handleView();
    }
  }

  handleView() {
    this.navbarShow = window.innerWidth <= 991;
    window.addEventListener("resize", this.handleView);
  }

  mounted() {
    if (process.browser && window) {
      this.navAnim();
      // this.handleView();
    }
  }
}
</script>
<style scoped lang="scss">
.mobile-none {
  @media (max-width: 991.98px) {
    display: none;
  }
}

.lang-item-flex {
  display: flex;
  align-items: center;
}

.lang-item {
  .currency-hover {
    margin-right: 3px !important;
    img {
      width: 25px !important;
    }
  }
}

.mobile-country {
  position: relative;
  width: 100%;
  margin-left: auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  .currency-hover {
    text-transform: uppercase;
    font-family: "Aileron-Bold", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
    letter-spacing: 2px;
    font-size: 12px;

    img {
      width: 30px;
    }
  }

  .dropdown-currency {
    top: -53px;
    visibility: visible;
    opacity: 1;
    right: 0;
    left: auto;
    li {
      padding: 7px 16px !important;
      a {
        img {
          width: 25px !important;
        }
      }
    }
  }
}

.display-mobile {
  @media (max-width: 991px) {
    display: block;
  }
}
.display-desktop {
  @media (max-width: 992px) {
    display: none;
  }
}

.is-profile-active {
  background: $color-black;
  color: #fff;
}

// .nuxt-link-active {
//   color: red;
// }

.is-search-active {
  opacity: 0.4;
  transition: all 0.3s ease-out;
}

ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  li {
    margin-right: 25px;
    @media screen and (min-width: 992px) and (max-width: 1150px) {
      margin-right: 15px;
    }
    &:last-child {
      margin-right: 0;
    }
    a {
      text-transform: uppercase;
      font-family: $font-family-base;
      letter-spacing: 2px;
      font-size: 12px;
      @media screen and (min-width: 992px) and (max-width: 1150px) {
        font-size: 0.6rem;
      }
    }
  }
}

/** Desktop Menu Styling Start Here**/
.hidden {
  transform: translateY(-100%);
  transition: all 0.5s ease-in-out;
}

.not-hidden {
  transform: translateY(0) !important;
}
.navbar {
  min-height: 90px;
  // margin-bottom: 17px;
  position: fixed;
  transition: all 0.5s;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 12;
  padding: 0;
  // without top-bar style
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  .top-bar {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    flex-wrap: wrap;
    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    height: 33px;
    align-items: center;
    width: 100%;
    .lang-item {
      margin-left: 2.5%;
      height: 100%;
      display: inline-flex;
      align-items: center;
      position: relative;
      min-width: 8%;
      &:hover {
        .dropdown-currency {
          opacity: 1;
          top: 33px;
          visibility: visible;
        }
      }
      a {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 15px;
        margin-left: -15px;
        margin-right: -15px;
        transition: all 0.25s ease;
        font-family: $font-family-base;
        font-size: 0.8rem;
        text-transform: capitalize;
        letter-spacing: 2px;
        img {
          width: 25px;
        }
      }

      a.region-hover {
        margin-left: 0px;
      }
    }
    .wishlist-item {
      margin-right: 2.5%;
      display: flex;
      align-items: center;
      height: 100%;
      ul {
        height: 100%;
        li {
          height: 100%;
          display: flex;
          margin-right: 0;
          padding: 0 11px;
          a {
            height: 100%;
            font-size: 0.8rem;
            display: flex;
            align-items: center;
            img {
              margin-right: 5px;
              width: 13px;
            }

            p {
              span {
                margin-left: -3px;
              }
            }
            @media screen and (min-width: 992px) and (max-width: 1150px) {
              font-size: 0.6rem;
            }
          }

          // .wishlist-icon {
          //   // background: rgba(0, 0, 0, 0.75);
          //   // display: block;
          //   // padding: 9px;
          // }
        }
      }
    }
  }

  .desktop-main-menu {
    display: flex;
    justify-content: space-between;
    //height: 60px;
    height: 90px;
    width: 100%;
    align-items: center;
    .logo {
      margin-left: 2.5%;
      height: 100%;
      max-width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        height: 55%;
        display: flex;
        align-items: center;
        justify-content: center;
        @media screen and (min-width: 992px) and (max-width: 1150px) {
          height: 40%;
        }

        img {
          height: 100%;
          width: auto;
        }
      }
    }

    .nav {
      margin-right: 2.5%;
      align-items: center;
      justify-content: flex-end;
      height: 100%;
      transition: opacity 0.3s ease-out;
      &:hover {
        li {
          opacity: 0.4;
        }
      }

      > li {
        height: 100%;
        align-items: center;
        display: flex;
        transition: opacity 0.3s ease-out;
        position: relative;

        .nuxt-link-exact-active {
          color: rgba(0, 0, 0, 0.5) !important;
        }

        &:hover {
          opacity: 1;
        }

        .dropdown-bg {
          position: fixed;
          left: 0;
          width: 100%;
          top: 123px !important;
          height: auto;
          z-index: 2;
          top: 73px;
          padding: 2rem 0;
          padding-bottom: 2rem;
          background: #fff;
          -webkit-box-shadow: 0px 6px 10px -5px rgba(0, 0, 0, 0.75);
          -moz-box-shadow: 0px 6px 10px -5px rgba(0, 0, 0, 0.75);
          box-shadow: 0px 6px 10px -5px rgba(0, 0, 0, 0.75);
          .dropdown-content {
            margin-left: 2.5%;
            height: 100%;
            .desk-swiper-container {
              height: 100%;
            }
            .category-img {
              position: relative;
              overflow: hidden;
              padding-bottom: 100%;

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                object-position: top center;
              }
            }
            span {
              display: block;
              margin-top: 16px;
              font-family: $font-family-h;
              font-weight: 400;
              letter-spacing: normal;
              text-transform: capitalize;
              font-size: 1.1rem;
            }
          }
        }

        a {
          font-size: 0.9rem;
          @media screen and (min-width: 992px) and (max-width: 1150px) {
            font-size: 12px;
          }
        }
      }
    }
  }

  .search-icon {
    margin-left: 25px;
    @media screen and (min-width: 992px) and (max-width: 1150px) {
      font-size: 12px;
      margin-top: 3px;
    }
  }
}

.swiper-container {
  width: 100%;
}

.swiper-button-disabled {
  opacity: 0;
  transform: translateX(-50%);
  transition: all 0.5s ease;
}

.swiper-button-prev {
  background-image: url("../../assets/img/chevron-right.svg") !important;
  width: 35px;
  height: 35px;
  background: #fff;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
  transform: translateY(-50%) rotate(180deg);
}

.swiper-button-next {
  background-image: url("../../assets/img/chevron-right.svg") !important;
  width: 35px;
  height: 35px;
  transform: translateY(-50%);
  background: #fff;
  background-repeat: no-repeat;
  background-position: 50%;
  border-radius: 50%;
}

// Mobile Menu Style

.menu-bar {
  width: 30px;
  height: 24px;
  z-index: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // margin-right: 10px;
  position: relative;
  z-index: 6;
  // order: 2;
  @media (min-width: 991.98px) {
    display: none;
  }
  .line {
    width: 100%;
    height: 1px;
    background: #000;

    // @media (min-width: 991.98px) {
    //   display: none;
    // }
  }
}

.item-wrap {
  margin-top: -40px;
}

.top-item {
  display: flex;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  margin-top: 30px;
  .top-logo {
    width: 150px;
  }
  .close-icon {
    width: 30px;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .line {
      width: 100%;
      height: 1px;
      background: #000;
    }

    .one {
      transform: rotate(45deg);
    }
    .three {
      transform: rotate(-45deg);
    }
  }
}

.desktop-menu {
  display: none;
  @media screen and (min-width: 991.98px) {
    display: flex;
  }
}

.mobile-menu {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
  height: 90px;
  position: fixed;
  top: 0;
  width: 100%;
  background: #fff;
  z-index: 13;
  transition: all 0.5s;
  @media screen and (min-width: 991.98px) {
    display: none;
  }

  .left-item,
  .right-item {
    display: flex;
    align-items: center;
  }
  .left-item {
    flex-basis: 50%;
    margin: 0 auto;
    margin-left: 5%;
    // justify-content: space-between;
    @media screen and (min-width: 991.98px) {
      margin-left: 5%;
    }
  }

  .right-item {
    margin-right: 5%;
    @media screen and (min-width: 991.98px) {
      margin-right: 5%;
    }

    .header-action {
      display: flex;
      flex-wrap: inherit;
    }
    .login-form {
      top: 90px;
      width: 100%;
      right: 0;
      height: calc(100vh - 90px);
      &.heightAuto {
        height: "auto" !important;
      }
    }
    ul {
      li {
        a {
          // margin-right: 40px;
          width: 20px;
          display: block;
          position: relative;
          span {
            position: absolute;
            top: -3px;
            font-size: 12px;
            z-index: 5;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: $color-dark-blue;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            right: -14px;
          }
          img {
            width: 100%;
          }

          i {
            font-size: 1.5rem;
          }
          &:last-child {
            margin-right: 0;
          }

          & .nuxt-link-exact-active {
            color: rgba(0, 0, 0, 0.5) !important;
          }
        }
      }
    }
  }

  .logo {
    max-width: 185px;
    padding: 15px;
    .mobile-logo {
      height: 100%;
      width: 120px;
    }
  }

  img {
    width: 100%;
  }

  .mobile-nav {
    position: fixed;
    top: 0px;
    background: #fff;
    z-index: 100000;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
    left: 0;
    right: 0;
    height: calc(var(--vh, 1vh) * 100);
    // transform: translateX(-100%);

    .nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 95%;
      margin: 0 auto;
      // flex: 1 0 auto;

      @include mediaSm {
        width: 85%;
      }
      @include mediaXs {
        width: 85%;
      }
      li {
        margin-bottom: 2.3rem;
        @include mediaXs {
          margin-bottom: 1rem;
        }
        a {
          font-family: $font-family-base;
          font-size: 0.8rem !important;
          letter-spacing: inherit;
          i {
            font-size: 11px;
            margin-left: 7px;
          }

          @include mediaSm {
            font-size: 1rem;
          }
          @include mediaXs {
            font-size: 0.9rem;
          }
        }

        .nuxt-link-exact-active {
          color: rgba(0, 0, 0, 0.5) !important;
        }
      }
      .dropdown-bg {
        position: fixed;
        top: 0;
        background: #fff;
        z-index: 15;
        height: 100vh;
        width: 100%;
        margin: 0 auto;
        left: 0;
        -webkit-transform: translateX(-200%);
        transform: translateX(-200%);
        .dropdown-content {
          height: 550px;
          overflow-y: scroll;
        }
        > span {
          width: 90%;
          margin: 0 auto;
          display: block;
          margin-top: 20px;
        }
        h2 {
          text-align: center;
        }
        .custom-margin {
          margin-bottom: 30px;
          span {
            display: inline-block;
            padding-top: 10px;
            text-transform: capitalize;
            font-family: $font-family-h;
            font-weight: 400;
          }
        }
      }
    }

    .search-icon {
      order: -1;
      width: 95%;
      margin: 0 auto;
      margin-top: 15px;
      position: relative;
      @include mediaSm {
        width: 90%;
      }
      @include mediaXs {
        width: 90%;
      }
    }

    .slide-fade-enter-active {
      transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-leave-active {
      transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
      transform: translateX(20px);
      opacity: 0;
    }

    .bottom-nav {
      display: flex;
      justify-content: space-between;
      width: 85%;
      margin: 0 auto;
      align-items: center;
      padding-bottom: 1.2rem;
      position: absolute;
      bottom: 46px;
      right: 0;
      left: 0;
      @media screen and (max-width: 991px) {
        // display: none;
      }
      // @include mediaSm {
      //   width: 85%;
      //   display: none;
      // }
      // @include mediaXs {
      //   width: 85%;
      // }

      .wishlist-item {
        ul {
          li {
            a {
              color: $color-secondary;
              font-family: $font-family-h;
              font-weight: 400;
              text-transform: capitalize;
            }
          }
        }
      }
    }

    .lang-item {
      order: 2;

      ul {
        li {
          color: rgba(0, 0, 0, 0.75);
        }
      }
    }

    form.example input[type="text"] {
      padding: 10px;
      font-size: 17px;
      border: 1px solid rgba(112, 112, 112, 0.1);
      width: 100%;
      border-left: 0;
      border-right: 0;

      &:focus {
        outline: none;
      }
    }

    form.example button {
      font-size: 17px;
      cursor: pointer;
      position: absolute;
      border: none;
      background: transparent;
      color: #000;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.open {
  transform: translateX(0%) !important;
  -webkit-animation: slide-in-left 0.5s cubic-bezier(1, 0, 0, 1) both;
  animation: slide-in-left 0.5s cubic-bezier(1, 0, 0, 1) both;
}

// Transtion Mode

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

// individual nav item animation

/**
 * ----------------------------------------
 * animation slide-in-left
 * ----------------------------------------
 */
@-webkit-keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slide-in-left {
  0% {
    -webkit-transform: translateX(-1000px);
    transform: translateX(-1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
    opacity: 1;
  }
}

// Footer Style

.footer {
  background: $color-secondary;
  padding: 5rem 0;
  position: relative;
  z-index: 10;
  @include mediaXs {
    padding: 3rem 0 1rem;
  }

  .wrapper {
    width: 90%;
    margin: 0 auto;
  }
}

.social-icons {
  a {
    color: #dfdfdf !important;
    text-decoration: none;
    display: inline-block;
    font-family: $font-family-h;
    font-size: 1.2rem;
  }
}

.custom-grid-left {
  @media (min-width: 768px) and (max-width: 1170.98px) {
    flex: 1;
    max-width: 40%;
  }
}
.custom-grid-right {
  @media (min-width: 768px) and (max-width: 1170.98px) {
    flex: 2;
    max-width: 60%;
  }
}

.left-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  @include mediaXs() {
    text-align: center;
  }
  p,
  span {
    color: #979797;
    margin: 0;
    font-family: $font-family-base;
  }

  p {
    font-size: 1.3rem;
  }
  span {
    font-size: 0.8rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    a {
      padding-left: 10px;
      margin-left: 10px;
      border-left: 1px solid #fff;
      img {
        width: 28px;
        margin-left: 4px;
      }
    }
  }
  .social-media-link {
    min-height: 170px;
    @include mediaXs {
      min-height: 110px;
    }
    .social-icons {
      margin: 20px 0;
      a {
        margin: 0px 20px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}

li {
  a {
    cursor: pointer;
  }
}

.quick-info {
  @include mediaXs {
    margin-bottom: 25px;
  }
}

// right Content Style

.right-content {
  p {
    font-size: 1.1rem !important;
  }
  h3 {
    color: #979797;
    font-size: 1rem;
    font-family: $font-family-base;
    text-transform: uppercase;
  }

  .quick-link {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    @include mediaXs {
      margin-top: 3px;
    }
    a {
      margin: 10px 0;
      font-size: 0.92rem;
      color: #dfdfdf !important;
      display: inline-block;
      font-family: $font-family-h;
    }
  }
}

.order {
  @include mediaXs() {
    order: 2;
    margin-top: 25px;
  }

  @include mediaSm() {
    order: 2;
    margin-top: 25px;
    text-align: center;
  }
}

.custom-flex {
  @include mediaXs() {
    flex-direction: column;
    text-align: center;
  }

  @include mediaSm() {
    text-align: center;
  }
}

// login Form Style Here

.login-form {
  position: absolute;
  top: 33px;
  right: 0;
  background: #fff;
  z-index: 2;
  width: 500px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1),
    inset 0 3px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrapper {
    width: 80%;
    margin: 0 auto;
    form {
      width: 100%;
    }
  }
}

.field {
  .forgot-pass {
    font-size: 13px;
    margin-top: -2px;
    display: block;
    font-family: $font-family-h;
    color: #535353 !important;
    text-transform: initial;
  }
}

label {
  font-size: 14px;
  font-weight: 400;
  color: #535353;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: $font-family-h;

  span {
    color: #777;
    margin-left: 2px;
  }
}

.account-create {
  display: flex;
  justify-content: space-between;
  font-family: $font-family-h;
  text-transform: capitalize;
  margin-top: 3rem;
  align-items: center;
  flex-wrap: wrap;
  @include mediaSm {
    margin-top: 0 !important;
  }
}

.new-account-btn {
  position: relative;
  display: inline-block;
  &::before {
    position: absolute;
    bottom: -4px;
    content: "";
    width: 0;
    height: 2px;
    background: $color-secondary;
    transition: all 0.4s ease-in-out;
  }

  &:hover {
    &:before {
      width: 100%;
      transition: all 0.4s ease-in-out;
    }
  }
}

// .lang-item {
//   a {
//     display: block;
//     &:hover {
//       .dropdown-currency {
//         visibility: visible;
//       }
//     }
//   }
// }

.dropdown-currency {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 14px; // should 14px
  background: #fff;
  // width: 110px;
  opacity: 0;
  left: 0;
  align-items: flex-start;
  height: auto;
  z-index: 4;
  visibility: hidden;
  transition: all 0.25s ease;
  background: #fff;
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  li {
    margin-right: 0;
    padding: 15px 16px;
    transition: all 0.3s ease;
    width: 100%;
    display: block;
    &:hover {
      background: #f6f6f6;
    }
  }
}

.cookie-wrapper {
  background: #f6f6f6;
  position: fixed;
  bottom: 0;
  width: 35%;
  padding: 3rem 2rem;
  right: 5%;
  z-index: 100;

  @include mediaSm {
    width: 100%;
    right: 0;
    left: 0;
    padding: 1rem 1rem;
    margin: 0 auto;
  }

  .c-message {
    /deep/ p {
      width: 100%;
      font-family: "Roboto", sans-serif;
      color: #000;
      font-weight: 300;
      font-size: 0.9rem;
      line-height: 24px;
      margin: 20px 0;

      @include mediaSm {
        font-size: 12px;
        line-height: 21px;
        margin: 5px 0 9px 0;
      }
    }
  }
}

.skew {
  background: transparent;
  border-radius: none;
  border: none;
  margin-right: 15px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  font-size: 15px;
  cursor: pointer;

  @include mediaSm {
    font-size: 11px;
  }
}

[v-cloak] {
  display: none;
}

.cg-divider {
  height: 50%;
  width: 1px;
  background: black;
}

.menu-highlight {
  color: #ff3a3a !important;
}
</style>
