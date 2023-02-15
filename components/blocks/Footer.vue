<template>
  <footer ref="footer" class="footer">
    <div class="wrapper">
      <div class="container-fluid padding-mobile">
        <div class="row">
          <div class="col-12 col-sm-12 col-xl-8 col-lg-7 col-md-12 mb-3 order">
            <div class="left-content">
              <div class="social-media-link">
                <p>Follow Us</p>
                <div class="social-icons">
                  <a href="https://www.facebook.com/lovegenofficial/">
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://twitter.com/lovegenofficial">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="https://www.instagram.com/lovegen_official/">
                    <i class="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCjHoPDLL4HbFgppsyUzZ7hg/featured"
                  >
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a href="https://in.pinterest.com/lovegenofficial/">
                    <i class="fab fa-pinterest-p"></i>
                  </a>
                </div>
              </div>
              <div class="copyright">
                <span>
                  &copy; 2020 LoveGen. All rights reserved
                  <a href="https://codesign.com.bd" style="color: #fff">
                    <span class="desktop-made">
                      Made by
                      <img src="@/assets/co-logo.svg" alt="Codesign" />
                    </span>
                  </a>
                </span>
              </div>
            </div>
          </div>

          <div class="col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12">
            <div class="right-content">
              <div class="container-fluid">
                <div class="row d-flex justify-content-between custom-flex">
                  <div
                    class="quick-info"
                    v-for="(ftmenu, index) of settings.menus.flat_menus"
                    :key="'ft' + index"
                  >
                    <h3>{{ ftmenu.heading }}</h3>
                    <div class="quick-link">
                      <router-link
                        v-for="(menuitem, idx) of ftmenu.menu_items"
                        :key="'mitem' + idx"
                        :to="menuitem.link"
                        >{{ menuitem.link_text }}</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang='ts'>
import { Action, Getter } from "nuxt-property-decorator";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { FETCH_SETTINGS } from "~/utils/store/actions.names";
import { SETTINGS } from "~/utils/store/getters.names";
@Component({
  name: "Footer",
  components: {},
})
export default class Footer extends Vue {
  @Prop() flatMenu: any;
  @Prop() social: any;
  @Prop() general: any;

  @Getter(`settings/${SETTINGS}`) settings!: any;
  @Action(`settings/${FETCH_SETTINGS}`) fetchSettings!: any;
}
</script>
<style scoped lang="scss">
.footer {
  background: $color-secondary;
  padding: 5rem 0;
  position: relative;
  z-index: 60;
  @include mediaXs {
    padding: 3rem 0 1rem;
  }

  @media screen and (min-width: 991px) {
    z-index: 0;
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
    font-size: 1.5rem;
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

.padding-mobile {
  @include mediaXs {
    padding: 0 !important;
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

      @include mediaXs {
        display: flex;
      }

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
  }
  .social-media-link {
    min-height: 170px;
    @include mediaXs {
      min-height: 110px;
    }

    @include iPad {
      min-height: 50px;
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
        i {
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
    padding: 0 !important;
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
  width: 110px;
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
</style>
