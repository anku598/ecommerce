<template>
  <div class="contact-form" v-if="compData">
    <span class="watermark">Contact</span>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-6">
          <span class="common-text">{{ compData.address_title }}</span>
          <div class="contact-add" v-html="compData.address_detail"></div>
        </div>
        <div class="col-md-12 col-lg-6 section-margin">
          <span class="common-text">{{ compData.form_title }}</span>
          <h2>{{ compData.form_subtitle }}</h2>
          <ValidationObserver ref="form">
            <form action class="form">
              <ValidationProvider>
                <div class="form-group custom-margin">
                  <!-- <label class="form-label" for="first">Full Name</label> -->
                  <input
                    id="first"
                    class="form-input"
                    type="text"
                    placeholder="Full Name"
                    v-model="contactForm.full_name"
                  />
                </div>
              </ValidationProvider>

              <div class="phn-email custom-margin">
                <ValidationProvider>
                  <div class="form-group margin-right email-field">
                    <!-- <label class="form-label" for="last">Email</label> -->
                    <input
                      id="last"
                      class="form-input"
                      type="text"
                      placeholder="Email"
                      v-model="contactForm.email"
                    />
                  </div>
                </ValidationProvider>

                <ValidationProvider>
                  <div class="form-group">
                    <!-- <label class="form-label" for="last">Phone</label> -->
                    <input
                      id="last"
                      class="form-input"
                      type="text"
                      placeholder="Phone"
                      v-model="contactForm.phone"
                    />
                  </div>
                </ValidationProvider>
              </div>
              <ValidationProvider>
                <div class="form-group custom-margin">
                  <!-- <label class="form-label" for="textarea">Message?</label> -->
                  <textarea
                    name
                    id="teaxtarea"
                    placeholder="Message"
                    v-model="contactForm.message"
                  ></textarea>
                </div>
              </ValidationProvider>

              <div class="submit-button">
                <a href="#" @click.prevent="onSubmit()" class="btn">Submit</a>
                <div class="success-form" v-if="success == true">
                  Thanks for reaching out to us
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
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
import { API_ENDPOINT, OTHER_ENDPOINTS } from '~/utils/store/endpoints';

const DEFAULT_FORM_DATA: any = {
  full_name: '',
  email: '',
  phone: '',
  message: '',
};
@Component({
  name: 'ContactAddress',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class ContactAddress extends Vue {
  @Prop() compData: any;
  success: boolean | null = null;
  contactForm: any = JSON.parse(JSON.stringify(DEFAULT_FORM_DATA));
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };

  waterMarkAnim() {
    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const revealTl = new TimelineMax({});
      revealTl.to('.watermark', 10, {
        x: '-=500',
        ease: Power4.easeOut,
        yoyo: true,
        repeat: -1,
      });

      const controller5 = new ScrollMagic.Controller();
      const scene5: any = new ScrollMagic.Scene({
        triggerElement: '.contact-form',
        triggerHook: 'onEnter',
      })
        .setTween(revealTl)
        .addTo(controller5);
    }
  }

  onSubmit() {
    this.$refs.form
      .validate()
      .then((success) => {
        if (!success) {
          return;
        }

        this.$axios
          .post(`${OTHER_ENDPOINTS}/contact-form/`, this.contactForm)
          .then(({ data }) => {
            // console.log(data);
            this.success = true;
            this.contactForm = JSON.parse(JSON.stringify(DEFAULT_FORM_DATA));
            this.$nextTick(() => {
              this.$refs.form.reset();
            });
          })
          .catch((e: any) => {
            // console.log(e);
            this.success = false;
          });
      })
      .catch((e: any) => {
        // console.log(e);
      });
  }

  public mounted() {
    this.waterMarkAnim();
  }
}
</script>
<style scoped lang="scss">
.watermark {
  @include watermark;
  left: 25%;
  top: 6%;
  font-size: calc(13vw + 16px);
  z-index: -1;
}
.common-text {
  font-family: $font-family-h;
  font-weight: 300;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 8px;
  position: relative;
  margin-bottom: 3.5rem;
  display: block;
  @include mediaSm {
    text-align: center;
    // margin-bottom: 2rem;
    font-size: 0.9rem;
  }

  @include mediaXs {
    margin-bottom: 2.2rem;
    display: none;
  }
  &:before {
    position: absolute;
    top: 50%;
    left: -4.5rem;
    transform: translateY(-50%);
    height: 1px;
    width: 50px;
    background: rgba($color: #000000, $alpha: 0.2);
    content: '';

    @include mediaSm {
      text-align: center;
      width: 100%;
      left: 0;
      top: inherit;
      bottom: -20px;
    }
  }
}

h2 {
  font-family: $font-family-h;
  font-weight: 600;
  font-size: 1.8rem;
  text-transform: capitalize;
  @include mediaSm {
    text-align: center;
    // margin-bottom: 2rem;
    font-size: 1.3rem;
  }
}

.section-margin {
  @include mediaSm {
    margin-top: 3rem;
  }

  @include mediaXs {
    margin-top: 2.2rem;
  }
}

.success-form {
  font-family: $font-family-h;
  text-transform: capitalize;
  @include productTitle;
  margin-top: 20px;
  color: $color-dark-blue;
  font-size: 1rem;
}

.contact-add {
  @include mediaSm {
    text-align: center;
  }

  /deep/ h2 {
    font-family: $font-family-h;
    font-weight: 600;
    font-size: 1.8rem;
    text-transform: capitalize;
    margin-bottom: 15px;

    @include mediaXs {
      font-size: 1.3rem;
      margin-bottom: 13px;
    }
  }

  /deep/ p {
    max-width: 60%;
    font-family: $font-family-h;
    font-size: 15px;
    margin-bottom: 7px;
    line-height: 25px;
    display: block;
    margin-top: 0;
    letter-spacing: 0.5px;
    margin-bottom: 2.7rem;
    font-weight: 400;
    color: #535353;
    @include mediaSm {
      text-align: center;
      max-width: 100%;
      margin-bottom: 1.7rem;
      // &:last-child {
      //   // margin-bottom: 3.5rem;
      // }
    }
  }

  /deep/ ul {
    margin-bottom: 2.7rem;
    list-style: none;
    padding-left: 0 !important;
    @include mediaXs {
      margin-bottom: 1.7rem;
    }
    /deep/ li {
      a {
        max-width: 60%;
        font-family: $font-family-h, sans-serif;
        font-size: 15px;
        margin-bottom: 5px;
        display: block;
        margin-top: 0;
        letter-spacing: 0.5px;
        color: #535353;
        font-weight: 400;
        text-decoration: none;
        @include mediaSm {
          text-align: center;
          max-width: 100%;
        }
      }
    }
  }
}

/deep/ p {
  display: none;
}

.contact-form {
  width: 70%;
  margin: 0 auto;
  margin-bottom: $section-margin;

  position: relative;
  @include mediaSm {
    width: 95%;
  }
}

.phn-email {
  display: flex;
  justify-content: space-between;

  @include mediaSm {
    flex-direction: column;

    .email-field {
      margin-bottom: 1.5rem;
      margin-right: 0;
    }
  }

  span {
    flex: 1;
  }
}

.custom-margin {
  margin-bottom: 4rem;
  margin-top: 25px;
  @include mediaSm {
    margin-bottom: 1.5rem;
  }
}

.margin-right {
  margin-right: 30px;
}

input {
  border-top: 0;
  border-left: 0;
  border-right: 0;
  width: 100%;
  outline: 0;
  position: relative;
  padding: 12px 0px 5px 0;
  transition: all 150ms ease-out;
  font-family: $font-family-h;
  font-size: 15px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.5);
  &:focus {
    outline: none;
    box-shadow: 0 2px 0 0 #000;
  }

  &::placeholder {
    display: block;
    position: absolute;
    top: 8px;
    z-index: 10;
    font-family: $font-family-h;
    font-size: 15px;
  }
}

.form {
  margin-top: 3rem;
  @include mediaXs {
    margin-top: 0;
  }
}

.form-group {
  flex: 1;
  position: relative;
}

label[for='textarea'] {
  // padding: 20px;
  &:focus {
    outline: none;
  }
}

textarea {
  width: 100%;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  outline: 0;
  font-family: $font-family-h;
  font-size: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);

  &::placeholder {
    display: block;
    position: absolute;
    bottom: 12px;
    z-index: 10;
    font-family: $font-family-h;
    font-size: 15px;
  }
}

.btn {
  text-transform: uppercase;
  font-family: $font-family-base;
  padding: 1.1rem 4rem;
}

.submit-button {
  @include mediaXs {
    text-align: center;
  }

  @include iPad {
    display: flex;
    justify-content: center;
  }
}
</style>
