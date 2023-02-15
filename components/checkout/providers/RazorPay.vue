<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Getter, Action } from "vuex-class";
import { Checkout, PaymentGateway, User } from "~/graphqlTypes";
import { VALIDATE_CART, VALIDATE_PAYMENT } from "~/utils/store/actions.names";
import { CART, PROFILE } from "~/utils/store/getters.names";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { GUEST } from "../../../utils/store/getters.names";

@Component({
  name: "RazorPay",
  components: {},
})
export default class RazorPay extends Vue {
  @Prop() cart!: Checkout;
  @Prop() config!: PaymentGateway;

  @Getter(namespaced(NS_USER, PROFILE)) profile!: any;
  @Getter(namespaced(NS_USER, GUEST)) guest!: any;
  @Action(namespaced(NS_USER, VALIDATE_CART)) [VALIDATE_CART]!: any;
  @Action(namespaced(NS_USER, VALIDATE_PAYMENT)) [VALIDATE_PAYMENT]!: any;
  instance: any | null;
  validationDetails: any | null = null;

  getOptions(id: string) {
    if (!this.cart || !this.config) return null;

    const prefillData: any = {
      email: this.profile ? this.profile.email : this.guest,
    };
    if (this.profile) {
      prefillData.name = `${this.cart.billingAddress?.firstName} ${this.cart.billingAddress?.lastName}`;
    }
    return {
      key: this.config.config[0].value, // Enter the Key ID generated from the Dashboard
      amount: `${(this.cart as any).totalPrice.gross.amount * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: (this.cart as any).totalPrice.gross.currency,
      name: "LoveGen",
      description: "Designed in Spain.",
      // image: `${HOST}/static/img/logo-black.1e12a50b.svg`,
      order_id: id, // "1234ASDF", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: (response: any) => {
        // console.log(response);
        this[VALIDATE_PAYMENT]({
          data: response,
        }).then((data: any) => {
          this.$emit("complete", data);
        });
      },
      prefill: prefillData,
      notes: {
        address: "Lovegen India",
      },
      theme: {
        color: "#F37254",
      },
    };
  }

  validate(resp: any) {
    this[VALIDATE_PAYMENT]({
      data: resp,
    }).then((data: any) => {
      this.$emit("complete", data);
      // // if (data.success) {
      //   this.$router.push({
      //     name: "payment-success",
      //     params: { id: this.$route.params.id },
      //   });
      // // } else {
      // //   this.$router.push("/");
      // // }
    });
  }

  // {
  //       gateway: "mirumee.payments.braintree"
  //       token: "tokencc_bh_s3bjkh_24smq8_6c6zhq_w4v6b9_8vz"
  //       amount: 25.99
  //     }
  public mounted() {
    this[VALIDATE_CART]({
      gateway: "design.co.razorpayment",
      token: this.cart.token,
      amount: (this.cart as any).totalPrice.gross.amount,
    }).then((data: any) => {
      // console.log(data);
      this.validationDetails = data;
      let script = document.createElement("script");
      script.onload = () => {
        this.instance = new (window as any).Razorpay(
          this.getOptions(data.checkoutPaymentCreate.payment.token)
        );
        this.instance.open();
      };
      script.setAttribute(
        "src",
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      document.head.appendChild(script);
    });
  }
}
</script>

<style lang="scss" scoped>
</style>
