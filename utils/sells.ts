import { ProductVariant, TaxedMoneyRange } from "~/graphqlTypes";
import {
  ProductPricingInfo,
  VariantPricingInfo,
  TaxedMoney,
} from "../graphqlTypes";
import { StepOption } from "~/utils/types";
import { AddressInput, Address } from "../graphqlTypes";

export const DEFAULT_CHECKOUT_STEPS: StepOption[] = [
  {
    label: "Cart",
    url: { name: "user-checkout" },
  },
  {
    label: "Address",
    url: { name: "user-checkout-addresses" },
  },
  {
    label: "Shipping",
    url: { name: "user-checkout-shipping" },
  },
  {
    label: "Payment",
    url: { name: "user-checkout-payment" },
  },
  {
    label: "Review",
    url: { name: "user-checkout-review" },
  },
];

const MoneyFormatters: { [key: string]: any } = {};

export function formatMoney(val: number | string, currency: string) {
  if (!val || !currency) {
    return "";
  }
  if (!(currency in MoneyFormatters)) {
    MoneyFormatters[currency] = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }
  return MoneyFormatters[currency].format(val);
}

export function createSelectionMatrix(variants: ProductVariant[]) {
  const data: any = {
    attributes: {},
    variants: {},
    inputs: {},
  };
  variants = variants.filter((variant: ProductVariant) => {
    return variant.isAvailable === true;
  });
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    const attrs = variant.attributes;
    const variantData: any = {
      pricing: variant.pricing?.priceLocalCurrency,
      id: variant.id,
      isAvailable: variant.isAvailable,
    };
    for (let j = 0; j < attrs.length; j++) {
      const attribute = attrs[j];
      const attrSlug: any = attribute.attribute.slug;
      const attrVal: any = attribute.values[0];
      const valSlug: string = attrVal.slug;
      if (attrSlug && data.attributes[attrSlug] === undefined) {
        data.attributes[attrSlug] = {
          isColor: attribute.attribute.isColor,
          name: attribute.attribute.name,
          values: {},
        };
      }
      data.attributes[attrSlug].values[valSlug] = attrVal;
      variantData[attrSlug] = valSlug;
      data.inputs[attrSlug] = null;
    }
    data.variants[variant.id] = variantData;
  }
  if (variants.length > 0) {
    const defaultVar: any = data.variants[variants[0].id];
    Object.keys(data.inputs).map((key: string) => {
      data.inputs[key] = data.attributes[key].values[defaultVar[key]];
    });
  }
  return data;
}

export function createPriceFromRange(range: TaxedMoneyRange) {
  const mainS = `${
    range.start?.net?.amount !== null
      ? Math.round(range.start?.net?.amount as any)
      : 0
  }`;
  const mainE = `${
    range.stop?.net?.amount !== null
      ? Math.round(range.stop?.net?.amount as any)
      : 0
  }`;
  const genericFormatter = Intl.NumberFormat();
  const mainp =
    mainE === mainS
      ? formatMoney(mainE, range.start?.currency as string)
      : `${range.start?.currency} ${genericFormatter.format(
          parseFloat(mainS)
        )} - ${genericFormatter.format(parseFloat(mainE))}`;
  const label = mainp;
  const currency = range.start?.currency;
  const value =
    mainE === mainS
      ? genericFormatter.format(parseFloat(mainE))
      : `${genericFormatter.format(
          parseFloat(mainS)
        )} - ${genericFormatter.format(parseFloat(mainE))}`;
  return { label, value, currency };
}

export function createProductPrice(pricingData: ProductPricingInfo) {
  const rdata: any = {
    main: null,
    undiscounted: null,
    onSale: false,
  };
  rdata.onSale = pricingData.onSale || false;
  if (pricingData.priceRange) {
    rdata.main = createPriceFromRange(pricingData.priceRange);
  }
  if (pricingData.priceRangeUndiscounted) {
    rdata.undiscounted = createPriceFromRange(
      pricingData.priceRangeUndiscounted
    );
  }
  return rdata;
}

export const DEFAULT_TAX_VALUE_PRICE: any = {
  main: "",
  mainvalue: 0,
  tax: "",
  taxValue: 0,
  discount: null,
  onSale: false,
};

export function createTaxedMoneyPrice(pricingData: TaxedMoney, onSale = false) {
  const rdata: any = JSON.parse(JSON.stringify(DEFAULT_TAX_VALUE_PRICE));

  rdata.main = formatMoney(pricingData.net.amount, pricingData.currency);
  rdata.mainValue = pricingData.net.amount;
  rdata.tax = formatMoney(pricingData.tax.amount, pricingData.currency);
  rdata.taxValue = pricingData.tax.amount;
  return rdata;
}

export function createAttributeDescription(variant: ProductVariant) {
  const values: String[] = variant.attributes.map((attr: any) => {
    const vals: String[] = attr.values.map((v: any) => {
      return v.name;
    });
    vals.sort();
    return `${attr.attribute.name}: ${vals.join(", ")}`;
  });
  values.sort();
  return values.join(", ");
}

const DEFAULT_ADDRESS_FORM: AddressInput = {
  firstName: "",
  lastName: "",
  companyName: "",
  streetAddress1: "",
  streetAddress2: "",
  city: "",
  postalCode: "",
  country: null,
  countryArea: "",
  phone: "",
};

export function fromAddressToAddressInput(addr: Address | null): AddressInput {
  const formData: any = JSON.parse(JSON.stringify(DEFAULT_ADDRESS_FORM));
  if (addr == null) {
    return formData;
  } else {
    console.log(formData);
    Object.keys(formData).map((key: string) => {
      if (key === "country") {
        const val = (addr as any)[key];
        if (val === null) {
          formData[key] = val;
        } else {
          formData[key] = typeof val === "string" ? val : val.code;
        }
      } else {
        formData[key] = (addr as any)[key];
      }
    });
  }
  return formData;
}
