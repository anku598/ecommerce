import { GetterTree, ActionTree, MutationTree } from "vuex";
import {
  LOGIN,
  LOGOUT,
  RETRIEVE_CREDENTIAL_FROM_STORAGE,
  SIGN_UP,
} from "../utils/store/actions.names";
import LoginMutation from "~/apollo/users/mutations/Login.gql";
import { createAccountMutation } from "~/apollo/users/builders/accountRegister.ts";
import TokenVerifyMutation from "~/apollo/users/mutations/TokenVerify.gql";
import RefreshMutation from "~/apollo/users/mutations/Refresh.gql";
import CartCreate from "~/apollo/users/mutations/CartCreate.gql";
import AddToCart from "~/apollo/users/mutations/AddToCart.gql";
import AddPromoCode from "~/apollo/users/mutations/addPromoCode.gql";
import RemovePromoCode from "~/apollo/users/mutations/removePromoCode.gql";
import SetPassword from "~/apollo/users/mutations/SetPassword.gql";
import RemoveFromCart from "~/apollo/users/mutations/RemoveFromCart.gql";
import UpdateCartItems from "~/apollo/users/mutations/UpdateCartItems.gql";
import AddressCreate from "~/apollo/users/mutations/AddressCreate.gql";
import AddressUpdate from "~/apollo/users/mutations/AddressUpdate.gql";
import CreatePayment from "~/apollo/users/mutations/CreatePayment.gql";
import PaymentComplete from "~/apollo/users/mutations/PaymentComplete.gql";
import UpdateDefaultAddress from "~/apollo/users/mutations/UpdateDefaultAddress.gql";
import UpdateShippingMethod from "~/apollo/users/mutations/UpdateShippingMethod.gql";
import UpdateCartAddresses from "~/apollo/users/mutations/UpdateCartAddresses.gql";
import UpdateCartShippingAddress from "~/apollo/users/mutations/UpdateCartShippingAddress.gql";
import UpdateCartBillingAddress from "~/apollo/users/mutations/UpdateCartBillingAddress.gql";
import AccountUpdate from "~/apollo/users/mutations/AccountUpdate.gql";
import WishlistAddProduct from "~/apollo/users/mutations/WishlistAddProduct.gql";
import WishlistRemoveProduct from "~/apollo/users/mutations/WishlistRemoveProduct.gql";
import PasswordChange from "~/apollo/users/mutations/PasswordChange.gql";
import {
  REFRESH_TOKEN,
  FETCH_PROFILE,
  FETCH_CART,
} from "../utils/store/actions.names";
import { UserDataState } from "../utils/store/store.types";
import {
  AUTH_TOKEN,
  CART,
  GET_PAYMENT_METHOD_BY_ID,
  PROFILE,
  WISHLIST,
  GUEST,
  AUTHENTICATED,
} from "../utils/store/getters.names";
import ProfileQuery from "~/apollo/users/queries/Profile.gql";
import {
  SET_PROFILE,
  SET_CART,
  SET_PAYMENT_METHOD,
} from "../utils/store/mutations.names";
import CartQuery from "~/apollo/users/queries/Cart.gql";
import CartByIDQuery from "~/apollo/users/queries/CartByID.gql";
import {
  VALIDATE_PAYMENT,
  VALIDATE_CART,
  UPDATE_PROFILE,
} from "../utils/store/actions.names";
import { Vue } from "nuxt-property-decorator";
import {
  CLEAR_CART,
  SET_WISHLIST,
  SET_GUEST,
} from "../utils/store/mutations.names";
import { getCookie } from "../utils/common";
import {
  CHANGE_PASSWORD,
  REQUEST_PASSWORD_RESET,
  SET_PASSWORD,
} from "../utils/store/actions.names";
import {
  AccountInput,
  CheckoutCreate,
  CheckoutLinesAdd,
  CheckoutLinesUpdate,
} from "../graphqlTypes";
import { requestForgetPassword } from "../apollo/users/builders/requestForgetPassword";
import {
  WISHLIST_ACTION,
  FETCH_CART_BY_ID,
} from "../utils/store/actions.names";
import { CheckoutCreateInput } from "../graphqlTypes";
import {
  UPDATE_CART_ADDRESSES,
  UPDATE_SHIPPING_METHOD,
} from "../utils/store/actions.names";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  ADD_PROMO_CODE,
  REMOVE_PROMO_CODE,
} from "../utils/store/actions.names";
import {
  CheckoutLineInput,
  AddressInput,
  AddressTypeEnum,
  AccountRegisterInput,
} from "../graphqlTypes";
import {
  CREATE_OR_UPDATE_ADDRESS,
  SET_DEFAULT_ADDRESS,
} from "../utils/store/actions.names";
import {
  SET_CREDENTIAL,
  DELETE_CREDENTIAL,
} from "../utils/store/mutations.names";
export const state = (): UserDataState => ({
  token: null,
  profile: null,
  error: false,
  cart: null,
  wishlist: [],
  payments: {},
  guest: null,
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  [AUTH_TOKEN](state: RootState) {
    return state.token;
  },
  [AUTHENTICATED](state: RootState) {
    return state.token != null;
  },
  [CART](state: RootState) {
    return state.cart;
  },
  [WISHLIST](state: RootState) {
    return state.wishlist;
  },
  [GET_PAYMENT_METHOD_BY_ID]: (state) => (id: string) => {
    return state.payments[id] || null;
  },
  [PROFILE](state: RootState) {
    if (state.profile) {
      return state.profile;
    }
    return null;
  },
  [GUEST](state: RootState) {
    return state.guest;
  },
};

export const actions: ActionTree<RootState, RootState> = {
  async [LOGIN]({ commit, dispatch }, credentials: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const client = this.app.apolloProvider.defaultClient;

      try {
        const res = await client
          .mutate({
            mutation: LoginMutation,
            variables: credentials,
          })
          .catch((e: any) => {
            // console.log(e);
          });

        if (res.data.tokenCreate.accountErrors.length == 0) {
          // console.log(res);
          await this.app.$apolloHelpers.onLogin(res.data.tokenCreate.token);
          commit(SET_CREDENTIAL, res.data.tokenCreate.token);
          commit(SET_PROFILE, res.data.tokenCreate.user);
        }
        resolve(res);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  },
  async [LOGOUT]({ commit }) {
    await this.app.$apolloHelpers.onLogout();
    commit(DELETE_CREDENTIAL);
  },

  async [SIGN_UP]({ commit }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const client = this.app.apolloProvider.defaultClient;
        const req = await client.mutate({
          mutations: createAccountMutation,
        });
        // console.log(req);
      } catch (e) {
        // console.log(e);
      }
    });
  },

  async [FETCH_PROFILE]({ commit, dispatch }) {
    const client = this.app.apolloProvider.defaultClient;
    const profileReq = await client
      .query({
        query: ProfileQuery,
      })
      .catch((e: any) => {
        // console.log(e);
      });
    commit(SET_PROFILE, profileReq.data.me);
  },

  async [UPDATE_PROFILE]({ commit }, payload: AccountInput) {
    const client = this.app.apolloProvider.defaultClient;
    let req = await client.mutate({
      mutation: AccountUpdate,
      variables: { input: payload },
    });
    if (req.data.accountUpdate.accountErrors.length == 0) {
      commit(SET_PROFILE, req.data.accountUpdate.user);
    }
    return req;
  },

  async [CHANGE_PASSWORD](context: any, payload: any) {
    const client = this.app.apolloProvider.defaultClient;
    let req = await client.mutate({
      mutation: PasswordChange,
      variables: payload,
    });
    return req;
  },

  async [WISHLIST_ACTION](
    { commit, getters },
    payload: { id: string; action: "add" | "remove" }
  ) {
    if (getters[AUTHENTICATED]) {
      const client = this.app.apolloProvider.defaultClient;
      let req = await client.mutate({
        mutation:
          payload.action === "add" ? WishlistAddProduct : WishlistRemoveProduct,
        variables: { id: payload.id },
        fetchPolicy: "no-cache",
      });
      const data =
        req.data[
          payload.action === "add"
            ? "wishlistAddProduct"
            : "wishlistRemoveProduct"
        ];
      if (data.wishlistErrors.length > 0) {
        Vue.$toast.error(
          `Error in ${
            payload.action === "add" ? "adding to" : "removing from"
          } the wishlist.`
        );
      } else {
        commit(SET_WISHLIST, data.wishlist);
      }
    }
  },

  async [ADD_TO_CART]({ commit, state }, payload: any) {
    const client = this.app.apolloProvider.defaultClient;
    let data: CheckoutCreate | CheckoutLinesAdd | null = null;
    if (state.cart == null) {
      let req = await client.mutate({
        mutation: CartCreate,
        variables: { input: payload },
        fetchPolicy: "no-cache",
      });
      if (req.data.checkoutCreate.checkoutErrors.length == 0) {
        commit(SET_CART, req.data.checkoutCreate.checkout);
        // if (!state.token && state.guest) {
        //   localStorage.setItem(
        //     "guestCartID",
        //     req.data.checkoutCreate.checkout.token
        //   );
        // }
        Vue.$toast.success("Item added to cart successfully!");
      } else {
        Vue.$toast.error("Sorry! Insufficient Stock.");
      }
      data = req.data.checkoutCreate;
    } else {
      let req = await client.mutate({
        mutation: AddToCart,
        variables: { id: state.cart.id, input: payload.lines },
        fetchPolicy: "no-cache",
      });
      if (req.data.checkoutLinesAdd.checkoutErrors.length == 0) {
        commit(SET_CART, req.data.checkoutLinesAdd.checkout);
        Vue.$toast.success("Item added to cart successfully!");
      } else {
        Vue.$toast.error("Sorry! Insufficient Stock.");
      }
      data = req.data.checkoutLinesAdd;
    }
    return data;
  },
  async [REMOVE_FROM_CART]({ commit, state }, payload: String) {
    if (state.cart != null) {
      const client = this.app.apolloProvider.defaultClient;
      let req = await client.mutate({
        mutation: RemoveFromCart,
        variables: { id: state.cart.id, lineId: payload },
        fetchPolicy: "no-cache",
      });
      commit(SET_CART, req.data.checkoutLineDelete.checkout);
    }
  },

  async [ADD_PROMO_CODE]({ commit, state }, payload: String) {
    if (state.cart != null) {
      const client = this.app.apolloProvider.defaultClient;
      let req = await client.mutate({
        mutation: AddPromoCode,
        variables: { id: state.cart.id, code: payload },
        fetchPolicy: "no-cache",
      });
      if (req.data.checkoutAddPromoCode.checkoutErrors.length == 0) {
        commit(SET_CART, req.data.checkoutAddPromoCode.checkout);
      } else {
        Vue.$toast.error("Sorry! Invalid Promo code.");
      }
    }
  },

  async [REMOVE_PROMO_CODE]({ commit, state }, payload: String) {
    if (state.cart != null) {
      const client = this.app.apolloProvider.defaultClient;
      let req = await client.mutate({
        mutation: RemovePromoCode,
        variables: { id: state.cart.id, code: payload },
        fetchPolicy: "no-cache",
      });
      commit(SET_CART, req.data.checkoutRemovePromoCode.checkout);
    }
  },

  async [UPDATE_CART]({ commit, state }, payload: String) {
    let data: CheckoutLinesUpdate | null = null;
    if (state.cart != null) {
      const client = this.app.apolloProvider.defaultClient;
      let req = await client.mutate({
        mutation: UpdateCartItems,
        variables: { id: state.cart.id, input: payload },
        fetchPolicy: "no-cache",
      });
      if (req.data.checkoutLinesUpdate.checkoutErrors.length == 0) {
        commit(SET_CART, req.data.checkoutLinesUpdate.checkout);
      } else {
        Vue.$toast.error("Sorry! Insufficient Stock.");
      }
      data = req.data.checkoutLinesUpdate;
      return data;
    }
  },

  async [FETCH_CART]({ commit }) {
    const client = this.app.apolloProvider.defaultClient;
    const req = await client
      .query({
        query: CartQuery,
        fetchPolicy: "no-cache",
      })
      .catch((e: any) => {
        // console.log(e);
      });
    // // console.log("fetching cart...", req);
    commit(SET_CART, req.data.me.checkout);
  },

  async [FETCH_CART_BY_ID]({ commit }, id: string) {
    console.log("triggered");
    const client = this.app.apolloProvider.defaultClient;
    const req = await client.query({
      query: CartByIDQuery,
      variables: { id },
      fetchPolicy: "no-cache",
    });
    console.log("fetching cart...", req);
    if (req.data.checkout) {
      commit(SET_CART, req.data.checkout);
    }
  },

  async [UPDATE_SHIPPING_METHOD](
    { dispatch, state },
    payload: { shipping: string }
  ) {
    if (state.cart) {
      const data: any = JSON.parse(JSON.stringify(payload));
      data.checkout = state.cart.id;
      const client = this.app.apolloProvider.defaultClient;
      const req = await client
        .mutate({
          mutation: UpdateShippingMethod,
          variables: data,
        })
        .catch((e: any) => {
          // console.log(e);
        });
      await dispatch(FETCH_CART_BY_ID, state.cart.token);
    }
  },

  async [VALIDATE_CART]({ state }, payload: any) {
    if (state.cart) {
      const input: any = JSON.parse(JSON.stringify(payload));
      const client = this.app.apolloProvider.defaultClient;
      const req = await client
        .mutate({
          mutation: CreatePayment,
          variables: { input, id: state.cart.id },
        })
        .catch((e: any) => {
          // console.log(e);
        });
      return req.data;
    }
  },

  async [VALIDATE_PAYMENT]({ state }, payload: any) {
    if (state.cart) {
      const input: any = JSON.stringify(payload);
      const client = this.app.apolloProvider.defaultClient;
      const req = await client
        .mutate({
          mutation: PaymentComplete,
          variables: { input, id: state.cart.id },
        })
        .catch((e: any) => {
          // console.log(e);
        });
      return req.data;
    }
  },

  async [REQUEST_PASSWORD_RESET]({ state }, email: string) {
    const client = this.app.apolloProvider.defaultClient;

    const mut = requestForgetPassword(email, (this as any).$config.SITE_URL);

    const req = await client.mutate({
      mutation: mut,
    });
    return req;
  },

  async [SET_PASSWORD]({ state }, input: any) {
    const client = this.app.apolloProvider.defaultClient;
    const req = await client.mutate({
      mutation: SetPassword,
      variables: input,
    });
    return req;
  },

  /*
                _     _
       /\      | |   | |
      /  \   __| | __| |_ __ ___  ___ ___
     / /\ \ / _` |/ _` | '__/ _ \/ __/ __|
    / ____ \ (_| | (_| | | |  __/\__ \__ \
   /_/    \_\__,_|\__,_|_|  \___||___/___/


  */

  async [CREATE_OR_UPDATE_ADDRESS](
    { commit },
    payload: { id?: String; type?: string; input: AddressInput }
  ) {
    // console.log(payload);
    const opType: any | null = payload.id
      ? AddressUpdate
      : payload.type
      ? AddressCreate
      : null;
    if (opType !== null) {
      const client = this.app.apolloProvider.defaultClient;

      const req = await client.mutate({
        mutation: opType,
        variables: payload,
      });

      return req.data.operation;
    } else {
      return null;
    }
  },

  async [UPDATE_CART_ADDRESSES](
    { state, dispatch },
    payload: { shipping?: AddressInput; billing?: AddressInput }
  ) {
    if (state.cart) {
      const data: any = JSON.parse(JSON.stringify(payload));
      data.id = state.cart.id;
      const client = this.app.apolloProvider.defaultClient;
      const query =
        payload.shipping && payload.billing
          ? UpdateCartAddresses
          : payload.shipping
          ? UpdateCartShippingAddress
          : UpdateCartBillingAddress;
      const req = await client.mutate({
        mutation: query,
        variables: data,
      });
      await dispatch(FETCH_CART_BY_ID, state.cart.token);
      return req;
    }
  },

  async [RETRIEVE_CREDENTIAL_FROM_STORAGE]({ commit, dispatch }) {
    const client = this.app.apolloProvider.defaultClient;
    const token = this.app.$apolloHelpers.getToken();

    if (token) {
      const client = this.app.apolloProvider.defaultClient;
      const isValidToken = await client
        .mutate({
          mutation: TokenVerifyMutation,
          variables: { token },
        })
        .catch(async (e: any) => {
          commit(DELETE_CREDENTIAL);
          await this.app.$apolloHelpers.onLogout();
          return true;
        });
      if (!!isValidToken.data.tokenVerify.isValid) {
        await this.app.$apolloHelpers.onLogin(token);
        commit(SET_CREDENTIAL, token);
        commit(SET_PROFILE, isValidToken.data.tokenVerify.user);
      } else {
        commit(DELETE_CREDENTIAL);
        await this.app.$apolloHelpers.onLogout();
      }
    } else {
      // const guest = localStorage.getItem("guestLG");
      // if (guest) {
      //   commit(SET_GUEST, guest);
      //   const guestCart = localStorage.getItem("guestCartID");
      //   if (guestCart) {
      //     dispatch(FETCH_CART_BY_ID, guestCart);
      //   }
      // }
    }
  },
  async [SET_DEFAULT_ADDRESS](
    { commit, dispatch },
    payload: { id: String; type: AddressTypeEnum }
  ) {
    const client = this.app.apolloProvider.defaultClient;
    const req = await client.mutate({
      mutation: UpdateDefaultAddress,
      variables: payload,
    });
    await dispatch(FETCH_PROFILE);
  },
};

export const mutations: MutationTree<RootState> = {
  [SET_CREDENTIAL](state, payload) {
    // console.log("payload", payload);
    state.token = payload;
    state.error = false;
    // localStorage.setItem("LG_TOKEN", payload.token);
    // localStorage.setItem("LG_RF_TOKEN", payload.refreshToken);
  },

  [DELETE_CREDENTIAL](state) {
    state.token = null;
    state.error = false;
    state.profile = null;
    state.cart = null;
    state.wishlist = [];
    state.payments = {};
    // localStorage.removeItem("LG_TOKEN");
    // localStorage.removeItem("LG_RF_TOKEN");
  },
  [SET_PROFILE](state, payload) {
    if (payload.checkout !== undefined) {
      state.cart = payload.checkout;
      delete payload.checkout;
    }
    if (payload.wishlist !== undefined) {
      state.wishlist = payload.wishlist;
      delete payload.wishlist;
    }
    state.profile = payload;
    state.guest = null;
    // localStorage.removeItem("guestLG");
    // localStorage.removeItem("guestCartID");
  },
  [SET_CART](state, payload) {
    Vue.set(state, "cart", payload);
  },
  [SET_WISHLIST](state, payload) {
    Vue.set(state, "wishlist", payload);
  },
  [SET_PAYMENT_METHOD](state, payload) {
    state.payments[payload.id] = payload.value;
  },
  [CLEAR_CART](state) {
    state.cart = null;
    state.payments = {};
  },
  [SET_GUEST](state, payload) {
    state.guest = payload;
    // if (payload) {
    //   localStorage.setItem("guestLG", payload);
    // } else {
    //   localStorage.removeItem("guestLG");
    //   localStorage.removeItem("guestCartID");
    // }
  },
};
