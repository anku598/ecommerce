import draftToHtml from "draftjs-to-html";
import { Category } from "~/graphqlTypes";
import { Checkout, TaxedMoney, CheckoutLine } from "../graphqlTypes";
import { createTaxedMoneyPrice, formatMoney } from "./sells";

export function transformURLBuilder(HOST: string, SITE_URL: string) {
  const HOST_REGEX = new RegExp(`^${HOST}`);
  return (url: any) => {
    return url.replace(HOST_REGEX, SITE_URL);
  };
}

export function edgesNormalizer(data: any) {
  data = JSON.parse(JSON.stringify(data));
  Object.keys(data).map((k: string) => {
    const val = data[k];
    if (val === null) {
      data[k] = val;
    } else if (typeof val === "object") {
      if (val.edges !== undefined) {
        data[k] = val.edges.map((edge: any) => {
          return edgesNormalizer(edge.node);
        });
      } else if (Array.isArray(val)) {
        data[k] = val.map((edge: any) => {
          return edgesNormalizer(edge);
        });
      }
    } else {
      data[k] = val;
    }
  });
  return data;
}

export function transformURLToLocalBuilder(HOST: string, SITE_URL: string) {
  const HOST_REGEX = new RegExp(`^${HOST}`);
  return (url: any) => {
    url = url.replace(HOST_REGEX, SITE_URL);
    if (url.length === 0) {
      return "/";
    } else {
      return url;
    }
  };
}

// export function orderByKeys(data: any[], key: string, ordered_keys: string[]) {
//   data.sort((a: any, b: any) => {
//     const a_pos = ordered_keys.findIndex(a[key])
//     const b_pos = ordered_keys.findIndex(a[key])
//   })
// }

export function getCookie(cname: string) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(sKey: string, sPath: string = "", sDomain: string = "") {
  document.cookie =
    encodeURIComponent(sKey) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "");
}

export function draftJSToHTML(content: string) {
  return draftToHtml(JSON.parse(content));
}

export function stripHTML(content: string) {
  let regex = /(<([^>]+)>)/gi;
  return content.replace(regex, "").replace("\n", " ");
}

export function getCategoryName(category: Category) {
  const alt = category.metadata.find((mt: any) => mt.key === "alternate_name");
  if (alt) {
    return alt.value;
  } else {
    return category.name;
  }
}

export function cartCalculations(cart: Checkout | null) {
  const data: any = {
    currency: "",
    lines: [],
    tax: "",
    total: "",
    subTotal: "",
  };

  if (cart != null || cart != undefined) {
    const currency = cart.totalPrice?.currency;
    data.total = createTaxedMoneyPrice(cart.totalPrice as TaxedMoney);
    data.subTotal = createTaxedMoneyPrice(cart.totalPrice as TaxedMoney);
    let tax = 0;
    const lines = cart.lines;
    if (lines) {
      for (let lIdx = 0; lIdx < lines.length; lIdx++) {
        const line = lines[lIdx] as CheckoutLine;

        const price = createTaxedMoneyPrice(line.totalPrice as TaxedMoney);

        let vVat: number =
          line.quantity * (line.variant.pricing?.price?.tax.amount as number);
        vVat = parseFloat(vVat.toFixed(2));
        price.currency = currency;
        price.taxValue = vVat;
        price.tax = formatMoney(vVat, currency as string);
        data.lines.push(price);
        tax += vVat;
      }
    }
    tax = parseFloat(tax.toFixed(2));
    data.tax = formatMoney(tax, currency as string);
    data.taxValue = tax;
    data.currency = currency;
  }
  return data;
}

export function nextFromQuery(route: any, router: any, to: any = "/") {
  if (route.query.next !== undefined) {
    let url = (route.query as any).next;
    if (route.query.payload) {
      url += `?payload=${(route.query as any).payload}`;
    }
    router.push(url);
  } else {
    router.push(to);
  }
}
