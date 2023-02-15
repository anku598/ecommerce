<template>
  <div class="span-full-width">
    <ValidationObserver
      v-if="formData"
      v-slot="{ handleSubmit }"
      ref="addressform"
    >
      <form class="edit-billing-info" @submit.prevent="handleSubmit(onSubmit)">
        <!-- <h2 v-if="showTitle">
        {{ existing != null ? 'Edit' : 'Create' }} Address
      </h2> -->
        <div class="name-field">
          <p class="field col">
            <label for="first-name">First Name <span>*</span></label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="alpha_spaces|required"
              vid="firstName"
            >
              <input
                type="text"
                class="form-control"
                v-model="formData.firstName"
                name="first-name"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
          <p class="field col">
            <label for="last-name">Last Name <span>*</span></label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="alpha_spaces|required"
              vid="lastName"
            >
              <input
                type="text"
                class="form-control"
                name="last-name"
                v-model="formData.lastName"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
        </div>

        <div class="name-field">
          <p class="field col">
            <label for="company-name">Company Name (Optional)</label>
            <ValidationProvider v-slot="{ errors }" vid="companyName">
              <input
                type="text"
                class="form-control"
                name="company-name"
                v-model="formData.companyName"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
          <p class="field col">
            <label for="phone">
              Phone Number
              <span>*</span>
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="phone"
            >
              <input
                type="text"
                class="form-control"
                name="phone"
                rules="required"
                v-model="formData.phone"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
        </div>

        <div action class="name-field">
          <p class="field col">
            <label for="street">
              Address Line 1
              <span>*</span>
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="streetAddress1"
            >
              <input
                type="text"
                v-model="formData.streetAddress1"
                class="form-control"
                name="street"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
        </div>
        <div action class="name-field">
          <p class="field col">
            <label for="apt">
              Address Line 2
              <span>*</span>
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="streetAddress2"
            >
              <input
                type="text"
                v-model="formData.streetAddress2"
                class="form-control"
                name="apt"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
        </div>

        <div action class="name-field">
          <p class="field col">
            <label for="city">
              City
              <span>*</span>
            </label>
            <ValidationProvider v-slot="{ errors }" rules="required" vid="city">
              <input
                type="text"
                v-model="formData.city"
                class="form-control"
                name="city"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
          <p class="field col">
            <label for="city">
              Zip/Postal Code
              <span>*</span>
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="postalCode"
            >
              <input
                type="text"
                v-model="formData.postalCode"
                class="form-control"
                name="city"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
        </div>

        <div action class="name-field">
          <p class="field col">
            <label for="country">
              Country
              <span>*</span>
            </label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="country"
            >
              <!-- <input
              type="text"
              v-model="formData.country"
              class="form-control"
              name="country"
            /> -->
              <v-select
                name="country"
                class="country-drop"
                :options="country"
                v-model="formData.country"
                :searchable="true"
                :reduce="(country) => country.value"
              >
              </v-select>
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
          <p class="field col">
            <label for="state">State *</label>
            <ValidationProvider
              v-slot="{ errors }"
              rules="required"
              vid="countryArea"
            >
              <input
                type="text"
                v-model="formData.countryArea"
                class="form-control"
                name="state"
              />
              <span class="error" v-if="errors.length > 0">
                {{ errors[0] }}</span
              >
            </ValidationProvider>
          </p>
        </div>

        <div action class="name-field">
          <p
            class="field col"
            v-if="
              updateData == null || updateData.isDefaultShippingAddress === true
            "
          >
            <input
              class="default-checkbox"
              id="default-checkbox-1"
              type="checkbox"
              v-model="defaultShipping"
            />
            <label for="default-checkbox-1"
              >Use as my default shipping address</label
            >
          </p>
          <p
            class="field col"
            v-if="
              updateData == null || updateData.isDefaulBillingAddress === true
            "
          >
            <input
              class="default-checkbox"
              id="default-checkbox-2"
              type="checkbox"
              v-model="defaultBilling"
            />
            <label for="default-checkbox-2"
              >Use as my default billing address</label
            >
          </p>
        </div>

        <div class="save-btn">
          <button type="submit" class="btn checkout-btn">Save Address</button>
          <a
            href="#"
            class="btn cancel-btn"
            @click.prevent="$emit('close', { refresh: false })"
            >cancel</a
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import { Address, AddressInput, AddressTypeEnum } from "~/graphqlTypes";
import {
  CREATE_OR_UPDATE_ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "~/utils/store/actions.names";
import {
  namespaced,
  NS_SETTINGS,
  NS_USER,
} from "~/utils/store/namespaces.names";
import { fromAddressToAddressInput } from "~/utils/sells";
import { COUNTRIES } from "~/utils/store/getters.names";
import { transformErrorData } from "../../utils/form";
import { UPDATE_CART_ADDRESSES } from "../../utils/store/actions.names";

@Component({
  name: "AddressForm",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class AddressForm extends Vue {
  @Getter(namespaced(NS_SETTINGS, COUNTRIES)) countries!: any;
  @Prop({ default: AddressTypeEnum.Shipping }) addressType!: AddressTypeEnum;
  @Prop({ default: null }) updateData!: Address;
  @Prop({ default: false }) guest!: Boolean;
  @Prop({ default: null }) updateCart!: { useSame: boolean } | null;
  defaultBilling: boolean = false;
  defaultShipping: boolean = false;
  @Action(namespaced(NS_USER, CREATE_OR_UPDATE_ADDRESS))
  [CREATE_OR_UPDATE_ADDRESS]!: any;
  @Action(namespaced(NS_USER, UPDATE_CART_ADDRESSES))
  [UPDATE_CART_ADDRESSES]!: any;
  @Action(namespaced(NS_USER, SET_DEFAULT_ADDRESS)) [SET_DEFAULT_ADDRESS]!: any;

  get country() {
    return this.countries.filter(
      (c: any) => c.value == process.env.SITE_COUNTRY
    );
  }

  formData: AddressInput | null = null;

  mounted() {
    this.formData = fromAddressToAddressInput(this.updateData);
    if (this.updateData) {
      this.defaultShipping = this.updateData
        .isDefaultShippingAddress as boolean;
      this.defaultBilling = this.updateData.isDefaultBillingAddress as boolean;
    } else {
      this.formData["country"] = this.country[0].value;
    }
  }

  async updateCartAddress(formData: any, key: AddressTypeEnum | string) {
    key = key.toLowerCase();
    const payload: any = {};
    payload[key] = formData;
    const resp = await this[UPDATE_CART_ADDRESSES](payload);
    if (resp.data[key].checkoutErrors.length > 0) {
      (this.$refs.addressform as any).setErrors(
        transformErrorData(resp.data[key].checkoutErrors)
      );
      return false;
    } else {
      if (this.updateCart && this.updateCart.useSame) {
        const payload2: any = {};
        payload2[key == "billing" ? "shipping" : "billing"] = formData;
        await this[UPDATE_CART_ADDRESSES](payload2);
      }
    }
    return true;
  }

  async onSubmit() {
    if (this.guest) {
      let status = true;
      if (this.updateCart !== null) {
        status = await this.updateCartAddress(this.formData, this.addressType);
      }
      if (status) {
        this.$emit("close", { refresh: true, data: this.formData });
      }
    } else {
      const payload: any = { input: this.formData };
      if (this.updateData !== null) {
        payload.id = this.updateData.id;
      } else {
        payload.type = this.addressType;
      }
      const result: any = await this[CREATE_OR_UPDATE_ADDRESS](payload);
      // console.log(result);
      if (result.accountErrors.length > 0) {
        (this.$refs.addressform as any).setErrors(
          transformErrorData(result.accountErrors)
        );
      } else {
        const id = result.address.id;
        if (this.updateData !== null) {
          if (
            this.defaultBilling &&
            this.updateData.isDefaultBillingAddress !== this.defaultBilling
          ) {
            await this[SET_DEFAULT_ADDRESS]({
              id,
              type: AddressTypeEnum.Billing,
            });
          }
          if (
            this.defaultShipping &&
            this.updateData.isDefaultShippingAddress !== this.defaultShipping
          ) {
            await this[SET_DEFAULT_ADDRESS]({
              id,
              type: AddressTypeEnum.Shipping,
            });
          }
        }
        this.$emit("close", { refresh: true, id });
      }
    }
  }
}
</script>
<style scoped lang="scss">
.profile-page {
  margin-top: 123px;
  width: 85%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: $section-margin;
}

.span-full-width {
  width: 100%;
}

.my-profile-section {
  margin-top: 2.5rem;
  .user-info {
    display: inline-flex;
    flex-direction: column;
    font-family: $font-family-h;
    margin-bottom: 2rem;

    .name {
      text-transform: capitalize;
      font-weight: 500;
    }

    .email-link {
      margin: 1rem 0;
      font-weight: 400;
      display: block;
      margin-top: 0;
    }

    .edit-btn {
      font-weight: 300;
      text-decoration: underline;
      font-size: 14px;
      font-family: $font-family-h;
    }
  }
}

strong {
  font-weight: 600;
}

.billing-address {
  p {
    font-family: $font-family-h;
    font-size: 15px;
    font-weight: 400;
    margin: 1.6rem 0;
  }
}

h3 {
  font-family: $font-family-base;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
  margin-bottom: 15px;
  font-size: 1.4rem;
}

.sub-title {
  font-family: $font-family-base;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.edit-btn {
  font-weight: 300;
  text-decoration: underline;
  font-size: 14px;
  font-family: $font-family-h;
}

.edit-profile-info {
  h2 {
    font-family: $font-family-h;
    margin-bottom: 2rem;
    text-transform: capitalize;
  }
}

.name-field {
  display: flex;
  align-items: center;
  @include mediaXs {
    flex-direction: column;
  }
}

label {
  font-size: 15px;
  font-weight: 500;
  color: $color-secondary;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: $font-family-h;

  span {
    color: $color-secondary;
    margin-left: 2px;
  }
}

input[type="text"],
input[type="email"],
input[type="password"] {
  font-size: 14px;
  font-weight: 600;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
  font-family: $font-family-h;
  width: 100%;
  padding: 15px 15px 15px 20px;
  border: 1px solid rgba(112, 112, 112, 1); /* Remove the default border */
  background: #ffffff;
  color: #000;
  transition: color 0.3s ease-out;
  margin: 12px 0;
}

.gender-field {
  .g-title {
    font-weight: bold;
    margin-right: 10px;
  }

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

// gender Radio button custom style

[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  margin-right: 20px;
  color: #666;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff;

  color: $color-secondary;
  font-family: $font-family-h;
  font-weight: 400;
  text-transform: capitalize;
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: #000;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

.btn {
  text-align: center;
  text-transform: capitalize;
  font-family: $font-family-h;
  font-weight: 600;

  @include mediaSm {
    display: flex;
    flex-direction: column;
  }
}

.checkout-btn {
  @include mediaXs {
    font-size: 0.8rem !important;
    margin: 0 auto;
    width: 100%;
    align-items: center;
  }
}

.save-btn {
  margin-top: 2rem;
  margin-bottom: 5rem;
  @include mediaSm {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  @include mediaXs {
  }
}

.btn {
  @include mediaXs {
    font-size: 0.8rem;
    margin: 0 auto !important;
  }
}

.cancel-btn {
  margin-left: 15px;
  @include mediaSm {
    margin-left: 0;
    margin-top: 10px !important;
  }
}

.col {
  padding-left: 0;
  margin: 0;
  margin-right: 15px;
  @include mediaXs {
    margin: 0;
  }
}

.chng-password {
  font-size: 16px;
  font-family: $font-family-h;
  font-weight: 300;
  text-transform: capitalize;
  margin: 30px 0;
  color: $color-secondary;
  cursor: pointer;
}

.default-checkbox {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    color: $color-secondary;
    font-family: $font-family-h;
    font-weight: 300;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(168, 168, 168, 0.5);
    vertical-align: text-top;
  }

  &:checked + label:before {
    background: #000;
    border: 1px solid #000;
    transition: all 0.3s ease-out;
  }

  &:checked + label:after {
    content: "";
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white,
      4px -6px 0 white, 4px -8px 0 white;
    transform: rotate(45deg);
    transition: all 0.3s ease-out;
  }
}

.edit-billing-info {
  margin-top: 50px;
  @include mediaXs {
    margin-top: 30px;
  }
}

h2 {
  margin-bottom: 15px;
}

.country-drop {
  /deep/ .vs__dropdown-toggle {
    border: 1px solid #707070;
    border-radius: 0px;
  }
}
</style>
