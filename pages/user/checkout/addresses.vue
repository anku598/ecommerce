<template>
  <div class="checkout-form">
    <div class="container-fluid wrap-padding">
      <StepWizard :steps="timeLineSteps" :current-step="1"></StepWizard>
      <div class="row" v-if="addresses">
        <div class="col-xs-12 col-md-12 col-lg-7 col-xl-7 col-sm-12">
          <div class="edit-billing-info">
            <h2 class="billing-title">Shipping Address</h2>

            <div class="address-section">
              <div class="container-fluid p-0">
                <div class="row">
                  <div
                    class="col-xs-12 col-sm-12 col-md-6 col-lg-6 custom-padding"
                  >
                    <div
                      class="add-addrss-btn"
                      @click.prevent="
                        showShippingAddForm = !showShippingAddForm
                      "
                    >
                      <span>+</span>
                      <p>Add Address</p>
                    </div>
                  </div>
                  <AddressForm
                    :update-data="editFormData"
                    v-if="showShippingAddForm"
                    :address-type="AddressTypeEnum.Shipping"
                    @close="handleShippingFormClose"
                    :guest="!authenticated"
                    :updateCart="guest ? { useSame: useSame } : null"
                  ></AddressForm>
                  <AddressCard
                    v-for="(address, idx) in addresses"
                    :key="`shipping-${address.id}`"
                    :address="address"
                    :class="{
                      'col-xs-12': true,
                      'col-sm-12': true,
                      'col-md-6': true,
                      'col-lg-6': true,
                      'custom-info-padding': true,
                      selected:
                        selectedBillingAddress != null &&
                        selectedBillingAddress.id == address.id,
                    }"
                    @edit="handleAddressEdit('billing', address)"
                    @click.native="selectedBillingAddress = address"
                  ></AddressCard>
                </div>
              </div>
            </div>
            <h2 class="billing-title">Billing Address</h2>
            <div class="use-same">
              <p class="field">
                <input
                  class="default-checkbox"
                  id="use-same"
                  type="checkbox"
                  v-model="useSame"
                />
                <label for="use-same">Use the Same as Shipping?</label>
              </p>
            </div>
            <div class="address-section" v-if="!useSame">
              <div class="container-fluid p-0">
                <div class="row">
                  <div
                    class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 custom-padding"
                  >
                    <div
                      class="add-addrss-btn"
                      @click.prevent="showBillingAddForm = !showBillingAddForm"
                    >
                      <span>+</span>
                      <p>Add Address</p>
                    </div>
                  </div>
                  <AddressForm
                    v-if="showBillingAddForm"
                    :address-type="AddressTypeEnum.Billing"
                    @close="handleBillingFormClose"
                    :update-data="editFormData"
                    :guest="!authenticated"
                    :updateCart="guest ? { useSame: useSame } : null"
                  ></AddressForm>
                  <AddressCard
                    v-for="(address, idx) in addresses"
                    :key="`billing-${address.id}`"
                    :address="address"
                    :class="{
                      'col-xs-12': true,
                      'col-sm-12': true,
                      'col-md-6': true,
                      'col-lg-6': true,
                      'custom-info-padding': true,
                      selected:
                        selectedShippingAddress != null &&
                        selectedShippingAddress.id == address.id,
                    }"
                    @edit="handleAddressEdit('billing', address)"
                    @click.native="selectedShippingAddress = address"
                  ></AddressCard>
                </div>
              </div>
            </div>

            <div class="save-btn">
              <button @click.prevent="handleProceed" class="btn">
                Proceed to Shipping
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12 col-12 disable-on-mobile">
          <UserCheckoutCart />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { SmartQuery } from "vue-apollo-decorators";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  DEFAULT_CHECKOUT_STEPS,
  fromAddressToAddressInput,
} from "~/utils/sells";
import { StepOption } from "~/utils/types";
import Addresses from "~/apollo/users/queries/Addresses.gql";
import { Action, Getter } from "nuxt-property-decorator";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { AUTHENTICATED } from "~/utils/store/getters.names";
import { Address } from "~/graphqlTypes";
import { AddressTypeEnum } from "../../../graphqlTypes";

import UserCheckoutCart from "~/components/checkout/UserCheckoutCart.vue";
import { UPDATE_CART_ADDRESSES } from "~/utils/store/actions.names";

import AddressCard from "../../../components/checkout/AddressCard.vue";
import shipping from "./shipping.vue";
import isAuthOrGuest from "~/middleware/isAuthOrGuest";
import { CART, GUEST } from "../../../utils/store/getters.names";

@Component({
  name: "CheckoutAddress",
  components: {
    AddressCard,
    UserCheckoutCart: UserCheckoutCart,
  },
  middleware: [isAuthOrGuest],
})
export default class CheckoutAddress extends Vue {
  @Getter(namespaced(NS_USER, AUTHENTICATED)) authenticated!: boolean;
  @Getter(namespaced(NS_USER, GUEST)) guest!: string | null;
  @Action(namespaced(NS_USER, UPDATE_CART_ADDRESSES))
  [UPDATE_CART_ADDRESSES]!: any;
  @Getter(namespaced(NS_USER, CART)) cart!: any;
  showShippingAddForm: boolean = false;
  showBillingAddForm: boolean = false;
  AddressTypeEnum = AddressTypeEnum;
  useSame: boolean = true;
  editFormData: any | null = null;
  addresses: Address[] = [];

  selectedShippingAddress: Address | null = null;
  selectedBillingAddress: Address | null = null;

  async asyncData({ store, app }: any) {
    const client = app.apolloProvider.defaultClient;
    if (store.getters[namespaced(NS_USER, GUEST)]) {
      const cart = store.getters[namespaced(NS_USER, CART)];
      if (cart === null) {
        return {
          addresses: [],
          selectedShippingAddress: null,
          selectedBillingAddress: null,
        };
      } else {
        return {
          addresses: [cart.shippingAddress, cart.billingAddress].filter(
            (addr: any) => addr !== null
          ),
          selectedShippingAddress: cart.shippingAddress,
          selectedBillingAddress: cart.billingAddress,
        };
      }
    } else if (store.getters[namespaced(NS_USER, AUTHENTICATED)]) {
      const res = await client.query({
        query: Addresses,
      });
      const addresses: Address[] = res.data.me.addresses;
      let selectedShippingAddress: Address | null = null,
        selectedBillingAddress: Address | null = null;
      for (const addr of addresses) {
        if (addr.isDefaultShippingAddress) {
          selectedShippingAddress = addr;
        }
        if (addr.isDefaultBillingAddress) {
          selectedBillingAddress = addr;
        }
      }
      return { addresses, selectedShippingAddress, selectedBillingAddress };
    }
    return {
      addresses: [],
      selectedShippingAddress: null,
      selectedBillingAddress: null,
    };
  }

  async fetchAddresses() {
    if (this.authenticated) {
      const res = (this as any).$apollo.query({
        query: Addresses,
      });
      this.addresses = res.data.me.addresses;
      for (const addr of this.addresses) {
        if (addr.isDefaultShippingAddress) {
          this.selectedShippingAddress = addr;
        }
        if (addr.isDefaultBillingAddress) {
          this.selectedBillingAddress = addr;
        }
      }
    }
  }

  handleAddressEdit(type: string, address: Address) {
    this.editFormData = address;
    if (type === "shipping") {
      this.showShippingAddForm = true;
    } else {
      this.showBillingAddForm = true;
    }
  }

  async handleShippingFormClose(evt: any) {
    this.showShippingAddForm = false;
    this.editFormData = null;
    if (evt.refresh) {
      if (this.guest) {
        this.addresses[0] = evt.data;
        this.selectedShippingAddress = evt.data;
        this.selectedBillingAddress = this.selectedShippingAddress;
      } else {
        await this.fetchAddresses();
        if (evt.id || false) {
          this.selectedShippingAddress =
            this.addresses.find((addr: Address) => {
              return addr.id == evt.id;
            }) || null;
          if (this.useSame) {
            this.selectedBillingAddress = this.selectedShippingAddress;
          }
        }
      }
    }
  }

  async handleBillingFormClose(evt: any) {
    this.showBillingAddForm = false;
    this.editFormData = null;
    if (evt.refresh) {
      if (this.guest) {
        this.addresses[1] = evt.data;
        this.selectedBillingAddress = evt.data;
        this.selectedShippingAddress = this.selectedBillingAddress;
      } else {
        await this.fetchAddresses();

        if (evt.id || false) {
          this.selectedBillingAddress =
            this.addresses.find((addr: Address) => {
              return addr.id == evt.id;
            }) || null;
          if (this.useSame) {
            this.selectedShippingAddress = this.selectedBillingAddress;
          }
        }
      }
    }
  }

  timeLineSteps: StepOption[] = JSON.parse(
    JSON.stringify(DEFAULT_CHECKOUT_STEPS)
  );

  async handleProceed() {
    if (this.selectedShippingAddress == null) return;
    if (this.selectedBillingAddress == null && this.useSame == false) return;
    const payload: any = {
      shipping: fromAddressToAddressInput(this.selectedShippingAddress),
      billing: fromAddressToAddressInput(
        this.useSame
          ? this.selectedShippingAddress
          : this.selectedBillingAddress
      ),
    };
    await this[UPDATE_CART_ADDRESSES](payload);
    this.$router.push({ name: "user-checkout-shipping" });
  }
}
</script>
<style scoped lang="scss">
.checkout-form {
  // min-height: calc(100vh - 123px);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 2rem;
  // margin-top: 100px;
  @include mediaXs {
    // margin-top: 50px;
    width: 100%;
  }
}
h2 {
  @include productTitle;
  font-weight: 600;
}

.name-field {
  display: flex;
  align-items: center;
  @include mediaXs {
    flex-direction: column;
  }
}

.wrap-padding {
  @include mediaXs {
    padding: 0;
  }
}

.shipping-form {
  margin-top: 5rem;
}

.address-section {
  margin-bottom: 20px;
  margin-top: 50px;
}

.disable-on-mobile {
  @include mediaSm {
    display: none;
  }
}

.back-btn {
  display: flex;
  align-items: center;
  color: #0e1224;
  font-family: $font-family-h;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0 !important;
  width: 100%;
  text-align: center;
  border: none;
  background: transparent;
  outline: none;
  img {
    margin-right: 10px;
    transform: rotate(180deg);
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
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

.custom-info-padding {
  padding-left: 0;
  @include mediaXs {
    padding-right: 0;
  }
}

.btn {
  text-align: center;
  text-transform: capitalize;
  font-family: $font-family-h;
  font-weight: 600;

  @include mediaSm {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @include mediaXs {
    width: 90%;
  }
}

.custom-padding {
  padding-left: 0;
  @include mediaXs {
    padding-right: 0;
  }
}

.billing-title {
  margin-bottom: 50px !important;
  @include mediaXs {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 40px !important;
  }
}

.add-addrss-btn {
  background: #f6f6f6;
  color: $color-black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 2rem;
  min-height: 200px;
  margin-bottom: 20px;
  cursor: pointer;
  @include mediaXs {
    min-height: 50px;
    padding: 3rem 2rem;
  }
  span {
    @include productTitle;
    color: $color-black;
    margin: 0;
  }

  p {
    @include productTitle;
    color: $color-black;
    margin: 0;
  }
}

.address-section-title {
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

.cart-section {
  width: 100%;
  display: flex;
  justify-content: center;

  .cart-details {
    position: relative;
    padding: 0rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    font-family: $font-family-h;
    padding-right: 0;
    width: 100%;
  }
}

.list-body {
  color: #000;
  flex: 1 0 auto;

  ul {
    border-bottom: 1px solid #000;
    li {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      padding-bottom: 1rem;
      &:last-child {
        margin-bottom: 0rem;
      }
    }
  }
}

.price-total {
  flex-direction: column;
  flex-basis: 30%;
  @include mediaXs {
    margin-top: 2rem;
    font-size: 0.8rem;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin: 0;
    padding: 1rem 0;
    margin-bottom: 0;
    text-transform: uppercase;
    font-family: $font-family-h;
    font-weight: 400;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    @include mediaXs {
      padding: 0.6rem 0;
    }
    &:first-child {
      border-top: 0px solid rgba(0, 0, 0, 0.3);
    }

    &:last-child {
      border-bottom: 0px solid rgba(0, 0, 0, 0.3);
      padding-top: 8px;
    }

    &.total {
      font-family: $font-family-h;
      font-weight: 700;
    }
  }
}

.checkout-btn {
  color: #fff !important;
  display: block;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 1.3px;
  text-align: center;
  padding-bottom: 1rem;
  padding-top: 1rem;
}

.line {
  width: 600px;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: 7%;
  right: 0;
}

.address {
  p {
    margin-bottom: 10px;
  }

  .address-edit-btn {
    text-decoration: underline;
  }
}

input[type="number"] {
  text-align: center;
  padding-left: 2.5rem;
  padding-right: 1.6rem;
}

input {
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  flex: 1 0;
  line-height: 1.65;
  height: 3em;
  margin: 0 auto;
  padding-left: 0.5rem;
  padding-right: calc(82 / 16 * 1rem);
  text-align: left;
  width: auto;
  max-width: 120px;
  vertical-align: middle;
  @include mediaXs {
    max-width: 162px;
  }
  // Firefox-specific hack
  // -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  }
}

label[for="default-checkbox-1"],
label[for="firstname"] {
  font-family: $font-family-h;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  align-items: center;
}
</style>
