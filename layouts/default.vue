<template>
  <div class="main-app">
    <Navigation v-if="settings !== null" />
    <div
      class="view"
      ref="main"
      :style="[zeroMargin ? { 'margin-top': '0' } : '']"
    >
      <Nuxt />
    </div>
    <div ref="footer">
      <Footer v-if="settings !== null" />
    </div>

    <!-- <cookie-law
      theme="dark-lime"
      class="cookie-wrapper"
      v-if="settings && (cookieConsent == null || cookieOptDialogue)"
    >
      <div class="cookies">
        <div slot="message" class="c-message">
          <div v-html="settings.cookie_text"></div>
          <p v-if="cookieOptDialogue && cookieConsent !== null">
            Want to {{ cookieConsent ? 'Opt Out' : 'Opt In' }}?
          </p>
        </div>
        <div class="c-button">
          <button
            class="skew"
            @click="cookieOptIn"
            v-if="cookieConsent == null || cookieConsent == false"
          >
            <span>{{ cookieConsent == null ? 'Accept' : 'Opt In' }}</span>
          </button>
          <button
            class="skew"
            @click="cookieOptOut"
            v-if="cookieConsent == null || cookieConsent == true"
          >
            <span>{{ cookieConsent == null ? 'No Thanks' : 'Opt Out' }}</span>
          </button>
          <button
            class="skew"
            @click="cookieOptDialogue = false"
            v-if="cookieOptDialogue == true"
          >
            <span>Close</span>
          </button>
        </div>
      </div>
    </cookie-law> -->
  </div>
</template>

<script lang='ts'>
import { Action, Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import { SmartQuery } from "vue-apollo-decorators";
import Navigation from "~/components/blocks/Navigation.vue";
import { Checkout, User } from "~/graphqlTypes";
import {
  ACCEPT_COOKIE,
  DECLINE_COOKIE,
  FETCH_SETTINGS,
  RETRIEVE_CREDENTIAL_FROM_STORAGE,
} from "~/utils/store/actions.names";
import {
  AUTHENTICATED,
  COOKIE_CONSENT,
  MAIN_MENU,
  SETTINGS,
} from "~/utils/store/getters.names";
import { SET_SETTINGS } from "~/utils/store/mutations.names";
import ProfileQuery from "~/apollo/users/queries/Profile.gql";
import CartQuery from "~/apollo/users/queries/Cart.gql";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { preloaderTransition } from "~/utils/animation";
import { getProducts } from "~/utils/sitemap";

@Component({
  name: "Default",
  components: {
    Navigation: Navigation,
  },
  watchQuery: true,
})
export default class Default extends Vue {
  @Getter(`settings/${SETTINGS}`) settings!: any;
  @Action(`settings/${FETCH_SETTINGS}`) fetchSettings!: any;
  @Action(`user/${RETRIEVE_CREDENTIAL_FROM_STORAGE}`) retrieveCred: any;
  @Getter(namespaced(NS_USER, AUTHENTICATED)) isAuthenticated!: boolean;

  @Getter(COOKIE_CONSENT) cookieConsent!: boolean | null;
  @Action(`cookieAccepted/${ACCEPT_COOKIE}`) acceptCookie: any;
  @Action(DECLINE_COOKIE) declineCookie: any;

  cookieOptDialogue: boolean = false;

  // @SmartQuery<Default>({
  //   query: ProfileQuery,
  //   skip() {
  //     return !this.isAuthenticated;
  //   },
  //   update: (data) => data.me,
  // })
  // profile!: User;

  // @SmartQuery<Default>({
  //   query: CartQuery,
  //   skip() {
  //     return !this.isAuthenticated;
  //   },
  //   update: (data) => data.me.checkout,
  // })
  // cart!: Checkout | null;

  get zeroMargin() {
    const pathParts = this.$route.path.split("/");
    return pathParts.length >= 2 && pathParts[1] === "store";
  }

  cookieOptIn() {
    this.acceptCookie();
    this.cookieOptDialogue = false;
  }

  cookieOptOut() {
    this.declineCookie();
    this.cookieOptDialogue = false;
  }

  mounted() {
    if (process.browser && window) {
      this.retrieveCred();
    }
  }
  // async fetch() {
  //   // console.log('fetching...');
  //   this.fetchSettings();
  // }
}
</script>
<style scoped lang="scss">
.view {
  margin-top: 123px;
  flex: 1 0 auto;
  @include mediaSm {
    margin-top: 90px;
  }

  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) {
    margin-top: 0;
  }
}

.main-app {
  display: flex;
  flex-direction: column;
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
</style>
