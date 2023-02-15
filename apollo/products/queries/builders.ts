export function cmsProductQueryBuilder (idx: number, slug: String, imgwidth: number | string) {
  return `p${idx}: product(slug: "${slug}") {
    id
    name
    descriptionJson
    slug

    pricing {
      onSale
      priceRange {
        start {
          currency
  gross {
    amount
    currency
  }
  net {
    amount
    currency
  }
  tax {
    amount
    currency
  }
        }
        stop {
          currency
  gross {
    amount
    currency
  }
  net {
    amount
    currency
  }
  tax {
    amount
    currency
  }
        }
      }
      priceRangeUndiscounted {
        start {
          currency
  gross {
    amount
    currency
  }
  net {
    amount
    currency
  }
  tax {
    amount
    currency
  }
        }
        stop {
          currency
  gross {
    amount
    currency
  }
  net {
    amount
    currency
  }
  tax {
    amount
    currency
  }
        }
      }
    }

    images {
      url(rendition: "${imgwidth}")
      alt
    }

    imgOriginal: images {
        url(rendition: "fill-420x560")
        alt
      }
      imgMobile: images {
        url(rendition: "fill-200x266")
      }
    metadata {
      key
      value
    }
    category {
      name
      slug
      metadata {
        key
        value
      }
    }
    collections {
      name
      slug
      metadata {
        key
        value
      }
    }
  }`
}

export function storeProductCategoryBuilder (idx: number, slug: String, limit: Number) {
  return `cat${idx}: category(slug:"${slug}") {
    id
    name
    slug
    descriptionJson
    children(first:${limit}) {
      edges {
        node {
          id
          name
          slug
          metadata {
            key
            value
          }
        }
      }
    }
  }

  attributes(first:${limit}) {
    edges {
      node {
        id
    		name
        slug
        isColor
        metadata {
          key
          value
        }
        values {
        	id
          slug
          name
          value
        }
      }
    }
  }

  collections(first:${limit})
  edges {
    node {
      id
      name
      slug
      metadata {
        key
        value
      }
    }
  }

  `
}
