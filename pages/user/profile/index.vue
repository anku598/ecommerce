<template>
  <div class="user-profile">
    <div class="row">
      <div class="col-md-12 col-lg-3 col- col-sm-12">
        <SideNav />
      </div>
      <div class="col-md-12 col-lg-9 col-sm-12">
        <div v-if="profile">
          <h2 class="user-gretting-title" v-show="!showProfileInfo">
            Welcome {{ profile.firstName }}!
          </h2>

          <div class="my-profile-section">
            <div class="user-info" v-show="!showProfileInfo">
              <p class="name">{{ profile.firstName }} {{ profile.lastName }}</p>
              <a class="email-link" href="#">{{ profile.email }}</a>
              <a class="edit-btn" @click.prevent="toggleInfo()" href="#"
                >Edit Info</a
              >
              <a class="edit-btn" @click="togglePasswordForm()" href="#"
                >Change Password</a
              >
            </div>

            <ValidationObserver
              v-if="showProfileInfo"
              v-slot="{ handleSubmit }"
              ref="updateform"
            >
              <form
                @submit.prevent="handleSubmit(onProfileUpdate)"
                class="edit-profile-info"
              >
                <h2>Edit Information</h2>
                <div class="name-field">
                  <p class="field col">
                    <label for="first-name">
                      First Name
                      <span>*</span>
                    </label>
                    <ValidationProvider
                      vid="firstName"
                      rules="required|alpha_spaces"
                    >
                      <input
                        type="text"
                        class="form-control"
                        name="First name"
                        v-model="userForm.firstName"
                      />
                    </ValidationProvider>
                  </p>
                  <p class="field col">
                    <label for="last-name">
                      Last Name
                      <span>*</span>
                    </label>
                    <ValidationProvider
                      vid="lastName"
                      rules="required|alpha_spaces"
                    >
                      <input
                        type="text"
                        class="form-control"
                        name="last name"
                        v-model="userForm.lastName"
                      />
                    </ValidationProvider>
                  </p>
                </div>

                <div class="name-field">
                  <!-- <p class="field col">
                    <label for="email">
                      Phone Number
                      <span>*</span>
                    </label>
                    <ValidationProvider rules="required|min_value:5">
                      <input
                        type="text"
                        class="form-control"
                        name="phone_number"
                        v-model="userForm.phone_number"
                      />
                    </ValidationProvider>
                  </p> -->
                  <div class="gender-field col">
                    <p class="g-title">Gender:</p>
                    <div class="radio-field">
                      <p>
                        <input
                          type="radio"
                          id="gender1"
                          name="gender"
                          value="M"
                          v-model="userForm.gender"
                        />
                        <label for="gender1">Male</label>
                      </p>
                      <p>
                        <input
                          type="radio"
                          id="gender2"
                          name="gender"
                          value="F"
                          v-model="userForm.gender"
                        />
                        <label for="gender2">Female</label>
                      </p>
                      <p>
                        <input
                          type="radio"
                          id="gender3"
                          name="gender"
                          value="U"
                          v-model="userForm.gender"
                        />
                        <label for="gender3">Prefer not to say</label>
                      </p>
                    </div>
                  </div>
                </div>

                <div class="save-btn">
                  <button class="btn" type="submit">Save Info</button>
                  <button
                    href="#"
                    class="btn cancel-btn"
                    @click.prevent="toggleInfo()"
                  >
                    cancel
                  </button>
                </div>
              </form>
            </ValidationObserver>

            <ValidationObserver
              v-if="showPassForm"
              v-slot="{ handleSubmit }"
              ref="passwordform"
            >
              <form @submit.prevent="handleSubmit(onPasswordChange)">
                <p class="field col-md-6 pl-0 pr-0">
                  <label for="first-name">
                    Old Password
                    <span>*</span>
                  </label>
                  <ValidationProvider rules="required" vid="oldPassword">
                    <input
                      type="password"
                      class="form-control"
                      name="New Password"
                      v-model="passwordForm.oldPassword"
                    />
                  </ValidationProvider>
                </p>
                <p class="field col-md-6 pl-0 pr-0">
                  <label for="first-name">
                    New password
                    <span>*</span>
                  </label>
                  <ValidationProvider
                    rules="required|confirmed:newPasswordRepeat"
                    vid="newPassword"
                  >
                    <input
                      type="password"
                      class="form-control"
                      name="New Password"
                      v-model="passwordForm.newPassword"
                    />
                  </ValidationProvider>
                </p>

                <p class="field col-md-6 pl-0 pr-0">
                  <label for="first-name">
                    Repeat new password
                    <span>*</span>
                  </label>
                  <ValidationProvider rules="required" vid="newPasswordRepeat">
                    <input
                      type="password"
                      class="form-control"
                      name="Repeat new password"
                      v-model="passwordForm.newPasswordRepeat"
                    />
                  </ValidationProvider>
                </p>
                <div class="save-btn">
                  <button class="btn" type="submit">Save Info</button>
                  <button
                    href="#"
                    class="btn cancel-btn"
                    @click.prevent="togglePasswordForm()"
                  >
                    cancel
                  </button>
                </div>
              </form>
            </ValidationObserver>

            <!-- <h3>Address</h3> -->
            <!-- <div
              class="billing-address"
              v-for="(address, idx) in profile.address"
              :key="`addr${idx}`"
            >
              <div>
                <h4 class="sub-title">
                  {{
                    address.is_default_shipping && address.is_default_billing
                      ? 'Billing and Shipping'
                      : address.is_default_billing
                      ? 'Billing'
                      : 'Shipping'
                  }}
                  Address
                </h4>
                <p>
                  <strong>Full Name:</strong>
                  {{
                    address.full_name.length > 0
                      ? address.full_name
                      : profile.user.full_name
                  }}
                  <br />
                  <strong>Phone:</strong>
                  {{
                    address.phone_number.length > 0
                      ? address.phone_number
                      : profile.phone_number.length > 0
                      ? profile.phone_number
                      : 'N/A'
                  }}
                </p>
                <p>
                  {{ address.apt_and_suite }}
                  <br />
                  {{ address.street_address }}
                  <br />
                  {{ address.city }}, {{ address.state }},
                  {{ address.country }}, {{ address.postal_code }}
                </p>
                <a @click.prevent="addressEdit = idx" class="edit-btn" href="#"
                  >Edit this Address.</a
                >
                <AddressForm
                  v-if="addressEdit == idx"
                  :existing="address"
                  v-on:cancel="addressEdit = null"
                  v-on:done="onAddressUpdate()"
                ></AddressForm>
              </div>
            </div> -->
            <!-- <a
              v-if="addressMsg.msg && newAddressForm == false"
              @click.prevent="newAddressForm = true"
              class="edit-btn"
              href="#"
              >{{ addressMsg.msg }}</a
            >
            <AddressForm
              v-if="newAddressForm"
              :set-default="addressMsg.type"
              v-on:cancel="newAddressForm = false"
              v-on:done="onAddressUpdate()"
            ></AddressForm> -->
          </div>

          <h3>Addresses</h3>
          <div class="addresses col-md-12 col-lg-12 col-sm-12">
            <div class="address-section">
              <div class="container-fluid p-0">
                <div class="row">
                  <div
                    class="col-xs-12 col-sm-12 col-md-6 col-lg-6 custom-padding"
                  >
                    <div
                      class="add-addrss-btn"
                      @click.prevent="showAddressForm = !showAddressForm"
                    >
                      <span>+</span>
                      <p>Add Address</p>
                    </div>
                  </div>
                  <AddressForm
                    :update-data="editFormData"
                    v-if="showAddressForm"
                    @close="handleAddressFormClose"
                  ></AddressForm>
                  <AddressCard
                    v-for="(address, idx) in addresses"
                    :key="`shipping-${address.id}-${idx}`"
                    :address="address"
                    :class="{
                      'col-xs-12': true,
                      'col-sm-12': true,
                      'col-md-6': true,
                      'col-lg-6': true,
                      'custom-info-padding': true,
                    }"
                    @edit="handleAddressEdit(address)"
                  ></AddressCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import { ValidationObserver } from "vee-validate";
import {
  TimelineMax,
  gsap,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
} from "gsap/all";
import isAuth from "~/middleware/isAuth";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { AUTHENTICATED, PROFILE } from "~/utils/store/getters.names";
import { AccountInput, Address, User } from "../../../graphqlTypes";
import Addresses from "~/apollo/users/queries/Addresses.gql";
import {
  CHANGE_PASSWORD,
  UPDATE_CART_ADDRESSES,
  UPDATE_PROFILE,
} from "~/utils/store/actions.names";
import { transformErrorData } from "~/utils/form";
import { SmartQuery } from "vue-apollo-decorators";
import AddressForm from "../../../components/blocks/AddressForm.vue";
import AddressCard from "../../../components/checkout/AddressCard.vue";
@Component({
  name: "ProfileInfo",
  components: {
    ValidationObserver,
    ValidationProvider,
    AddressForm,
    AddressCard,
  },
  middleware: [isAuth],
})
export default class ProfileInfo extends Vue {
  @Getter(namespaced(NS_USER, AUTHENTICATED)) authenticated!: boolean;
  @Getter(namespaced(NS_USER, PROFILE)) profile!: User;
  @Action(namespaced(NS_USER, UPDATE_PROFILE)) [UPDATE_PROFILE]!: any;
  @Action(namespaced(NS_USER, CHANGE_PASSWORD)) [CHANGE_PASSWORD]!: any;
  @Action(namespaced(NS_USER, UPDATE_CART_ADDRESSES))
  [UPDATE_CART_ADDRESSES]!: any;

  @SmartQuery<ProfileInfo>({
    query: Addresses,
    skip() {
      return !this.authenticated;
    },
    update(data) {
      const addresses: Address[] = data.me.addresses;
      return addresses;
    },
  })
  addresses!: Address[];

  showProfileInfo: any = false;
  showPassForm: any = false;
  showAddressForm: boolean = false;
  userForm: AccountInput | null = null;
  passwordForm: any | null;
  $router: any;
  addressEdit: number | null = null;
  newAddressForm: boolean = false;
  editFormData: any | null = null;

  async handleAddressFormClose(evt: any) {
    this.showAddressForm = false;
    this.editFormData = null;
    if (evt.refresh) {
      await (this as any).$apollo.queries.addresses.refetch();
    }
  }

  handleAddressEdit(address: Address) {
    this.editFormData = address;
    this.showAddressForm = true;
  }

  toggleInfo() {
    if (!this.showProfileInfo) {
      this.userForm = {
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        gender: this.profile.gender,
      };
    } else {
      this.userForm = null;
    }
    this.showProfileInfo = !this.showProfileInfo;
  }

  togglePasswordForm() {
    if (!this.showPassForm) {
      this.passwordForm = {
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      };
    } else {
      this.passwordForm = null;
    }
    this.showPassForm = !this.showPassForm;
  }

  onProfileUpdate() {
    this[UPDATE_PROFILE](this.userForm).then((request: any) => {
      if (request.data.accountUpdate.accountErrors.length == 0) {
        this.toggleInfo();
      } else {
        (this.$refs as any).updateform.setErrors(
          transformErrorData(request.data.accountUpdate.accountErrors)
        );
      }
    });
  }

  onPasswordChange() {
    const data: any = JSON.parse(JSON.stringify(this.passwordForm));
    delete data.newPasswordRepeat;
    this[CHANGE_PASSWORD](data).then((request: any) => {
      if (request.data.passwordChange.accountErrors.length == 0) {
        this.togglePasswordForm();
      } else {
        (this.$refs as any).passwordform.setErrors(
          transformErrorData(request.data.passwordChange.accountErrors)
        );
      }
    });
  }
}
</script>
<style scoped lang="scss">
.user-profile {
  width: 80%;
  margin: 160px auto;
  height: auto;
  @include mediaSm {
    margin: 50px auto;
  }
}

.my-profile-section {
  margin-top: 2.5rem;
  @include mediaSm {
    margin-top: 0;
  }
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

.radio-field {
  display: flex;
  @include mediaXs {
    flex-direction: column;
  }
  p {
    margin-bottom: 10px;
  }
}

.billing-address {
  p {
    font-family: $font-family-h;
    font-size: 15px;
    font-weight: 400;
    margin: 1.6rem 0;
  }
  margin-bottom: 15px;
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

.user-gretting-title {
  font-family: $font-family-h;
  margin-bottom: 2rem;
  text-transform: capitalize;
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
  margin-bottom: 15px;
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
  cursor: pointer;

  @include mediaSm {
    display: flex;
    flex-direction: column;
  }

  @include mediaXs {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 12px;
    padding: 0.7rem 0rem;
  }
}

.save-btn {
  margin-top: 2rem;
  margin-bottom: 5rem;
  @include mediaSm {
    margin-top: 2rem;
    margin-bottom: 0;
  }
}

.cancel-btn {
  margin-left: 15px;
  @include mediaSm {
    margin-left: 0;
    margin-top: 15px;
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
</style>
