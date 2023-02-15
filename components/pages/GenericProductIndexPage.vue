<template>
  <div class="gender-index">
    <div class="product-top-info">
      <div class="page-info">
        <!-- <h2>{{ gender.name }}</h2> -->
        <div class="gender-breadcrumb">
          <p>
            Shop
            <span v-if="pageLabel"> / {{ pageLabel }}</span>
          </p>
        </div>
      </div>
      <div class="product-number" v-if="productData">
        <p>
          {{ productData.products.totalCount }} item{{
            productData.products.totalCount > 1 ? "s" : ""
          }}
        </p>
      </div>
    </div>

    <div class="products-page-wrapper">
      <div class="sidebar-wrapper">
        <div class="filter-box sticky">
          <ShopSortingSidebar
            v-if="filterData && filterValue"
            :filter-data="filterData"
            :page-type="pageType"
            v-model="filterValue"
            :sort-by="sortBy"
            @sort="(evt) => (sortBy = evt)"
          />
        </div>
      </div>
      <div class="show-filtered-product">
        <div class="all-products">
          <!-- <div class="sub-category-filter">
            <div
              class="sub-wrapper"
              v-for="(category, index) in filterValue.category"
              :key="'subcate' + index"
              v-if="category.children.length > 0"
            >
              <div
                class="child_category"
                v-for="(sub_category, idx) in category.children"
                :key="'child_cate' + idx"
              >
                <div class="sub-img">
                  <img :src="$config.HOST + sub_category.image" alt="" />
                </div>
                <div class="sub-name">{{ sub_category.name }}</div>
              </div>
            </div>
          </div> -->
          <div
            class="sorting-bar desktop-sort"
            v-if="productData.products.totalCount > 0"
          >
            <SortingButton v-model="sortBy"></SortingButton>
          </div>
          <div
            class="product-slider"
            v-if="productData && productData.products"
          >
            <div
              v-for="(shopProducts, idx) in productData.products.edges"
              :key="'sproducts' + idx"
            >
              <ShopSingleProduct
                :shop-product="shopProducts.node"
                img-version="list"
              />
            </div>
          </div>

          <client-only>
            <InfiniteLoading
              @infinite="loadMore"
              class="product-slider"
              :identifier="infiniteId"
              spinner="waveDots"
              v-if="productData && productData.products"
            >
              <!-- <div slot="no-results" class="no-product">No Product Found</div> -->
            </InfiniteLoading>
          </client-only>

          <!-- <paginate
            v-model="page"
            v-if="products && productData.products.results.length > 5"
            :page-count="pageCount"
            :page-range="5"
            :margin-pages="0"
            :clickHandler="handlePageChange"
            prev-text="<"
            next-text=">"
            class="pagination"
            active-class="pagination-active"
            disabled-class="pg-disabled"
            :first-last-button="true"
            :page-class="'page-item'"
          ></paginate> -->
        </div>

        <div class="not-found" v-if="productData.products.totalCount == 0">
          <h3>No results</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Getter, Prop, Vue, Watch } from "nuxt-property-decorator";
import { SmartQuery } from "vue-apollo-decorators";
import gql from "graphql-tag";
import categoryQuery from "~/apollo/category/queries/category.gql";
import collectionQuery from "~/apollo/collection/queries/collection.gql";
import onSaleQuery from "~/apollo/common/queries/onsale.gql";
import Categories from "~/apollo/category/queries/categories.gql";
import attributes from "~/apollo/category/queries/attributes.gql";
import CategoryPriceRange from "~/apollo/category/queries/PriceRange.gql";
import ProductList from "~/apollo/products/queries/ProductList.gql";
import {
  AttributeInput,
  OrderDirection,
  ProductOrder,
  ProductOrderField,
} from "~/graphqlTypes";
import ShopSortingSidebar from "~/components/blocks/ShopSortingSidebar.vue";
import { edgesNormalizer, getCategoryName } from "~/utils/common";
import ShopSingleProduct from "~/components/blocks/ShopSingleProduct.vue";
import {
  createFilterSpec,
  createGQLProductFilter,
  processFilterValue,
} from "~/utils/filter";
import InfiniteLoading from "vue-infinite-loading";
import { namespaced, NS_SETTINGS } from "~/utils/store/namespaces.names";
import { SETTINGS } from "~/utils/store/getters.names";

function generateQueryVariables(
  filterData: any,
  filterValue: any,
  pageSize: any,
  sortBy: any,
  pageType: string
) {
  const filter = processFilterValue(filterValue, filterData, pageType);
  if (
    (pageType === "gender" || pageType === "category") &&
    filter.categories === undefined
  ) {
    filter.categories = [filterData.category.id];
  }
  if (pageType === "collection" && filterData.collections === undefined) {
    filter.collections = [filterData.collection.id];
  }
  if (pageType === "onSale") {
    filter.onSale = true;
  }
  return {
    filter,
    pageSize: pageSize,
    sortBy: sortBy,
  };
}

async function getProducts(variables: any, client: any) {
  const productsReq = await client.query({
    query: ProductList,
    variables,
  });

  return productsReq.data;
}

@Component({
  name: "GenericProductIndexPage",
  components: {
    ShopSortingSidebar,
    ShopSingleProduct,
    InfiniteLoading,
  },
})
export default class GenericProductIndexPage extends Vue {
  @Getter(namespaced(NS_SETTINGS, SETTINGS)) settings!: any;
  pageType: string = "generic";
  priceRange: any | null = null;
  filterValue: any | null = null;
  filterData: any | null = null;
  sortBy: any | null = {
    field: ProductOrderField.PublicationDate,
    direction: OrderDirection.Desc,
  };
  PAGE_SIZE: number = 20;
  productData: any | null = null;
  infiniteId: any = new Date();
  category: any | null = null;
  collection: any | null = null;

  setProductData(data: any) {
    this.productData = data;
    this.infiniteId = new Date();
  }

  get pageLabel() {
    switch (this.pageType) {
      case "category":
        if (this.category === null) {
          return "";
        }
        return getCategoryName(this.category);
        break;
      case "gender":
        if (this.category === null) {
          return "";
        }
        return getCategoryName(this.category);
        break;
      case "collection":
        return this.collection.name;
        break;
      case "onSale":
        return "On Sale";
        break;
      default:
        return "";
    }
  }

  head() {
    const isCategory = !!this.category;
    let title: string = "Shop";
    let image: string | boolean = this.settings.general.default_og_image
      ? (this as any).$config.HOST + this.settings.general.default_og_image.url
      : false;
    switch (this.pageType) {
      case "onSale":
        title = "On Sale";
        break;
      case "collection":
        title = this.collection.name;
        if (this.collection.ogImage) {
          image = this.collection.ogImage.url;
        }
        break;
      case "gender":
        title = this.pageLabel;
        if (this.category.ogImage) {
          image = this.category.ogImage.url;
        }
        break;
      case "category":
        title = this.pageLabel;
        if (this.category.ogImage) {
          image = this.category.ogImage.url;
        }
        break;
      default:
        title = "Shop";
        break;
    }
    let type: string = "website";

    const breadCrumb: any = {
      type: "application/ld+json",
      vmid: "ldjson-schema-breadcrumb",
      json: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Store",
            item: "https://schema.org/ClothingStore",
          },
        ],
      },
    };
    const productsLD: any = {
      type: "application/ld+json",
      vmid: "ldjson-schema-product-list",
      json: {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: [],
      },
    };

    for (
      let idx = 0;
      idx < Math.min(this.productData.products.edges.length, 5);
      idx++
    ) {
      const product = this.productData.products.edges[idx].node;
      productsLD.json.itemListElement.push({
        "@type": "ListItem",
        position: idx + 1,
        url: (this as any).$config.SITE_URL + "/store/products/" + product.slug,
      });
    }

    if (isCategory) {
      breadCrumb.json.itemListElement.push({
        "@type": "ListItem",
        position: 2,
        name: isCategory ? this.category.seoTitle || title : title,
        item: "https://schema.org/ClothingStore",
      });
    }

    const data = {
      title,
      titleTemplate: `%s | ${this.settings.site.title}`,
      meta: [
        {
          hid: "og:site_name",
          name: "og_site_name",
          content: this.settings.site.title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: isCategory ? this.category.seoTitle || title : title,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: (this as any).$config.SITE_URL + this.$route.path,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: isCategory ? this.category.seoDescription : "",
        },
        {
          hid: "description",
          name: "description",
          content: isCategory ? this.category.seoDescription : "",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: type,
        },
      ],
      script: [breadCrumb, productsLD],
    };
    if (image) {
      data.meta.push({
        hid: "og:image",
        name: "og:image",
        content: image,
      });
    }
    return data;
  }

  async asyncData({ app, route }: any) {
    const client = app.apolloProvider.defaultClient;
    let filterData;
    let pageType;
    let category: any | null = null;
    let collection: any | null = null;
    switch (route.name) {
      case "store-for-slug":
        pageType = "gender";
        filterData = await client.query({
          query: categoryQuery,
          variables: { slug: route.params.slug },
        });
        break;
      case "store-categories-slug":
        pageType = "category";
        filterData = await client.query({
          query: categoryQuery,
          variables: { slug: route.params.slug },
        });
      case "store-collections-slug":
        pageType = "collection";
        filterData = await client.query({
          query: collectionQuery,
          variables: { slug: route.params.slug },
        });
        break;
      case "store-onsale":
        pageType = "onSale";
        filterData = await client.query({
          query: onSaleQuery,
        });
        break;
      default:
        pageType = "generic";
        filterData = await client.query({
          query: Categories,
        });
        break;
    }
    filterData = edgesNormalizer(filterData.data);
    if (pageType === "category" || pageType === "gender") {
      category = filterData.category;
    } else if (pageType === "collection") {
      collection = filterData.collection;
    }
    const filterValue = createFilterSpec(filterData);

    filterValue.priceGte = null;
    filterValue.priceLte = null;
    // const priceRangeReq = await client.query({
    //   query: CategoryPriceRange,
    //   variables: { id: filterData.category.id },
    // });
    // const priceRange = {
    //   min: priceRangeReq.data.min.edges[0].node.minimalVariantPrice.amount,
    //   max: priceRangeReq.data.max.edges[0].node.minimalVariantPrice.amount,
    // };

    const productData = await getProducts(
      generateQueryVariables(
        filterData,
        filterValue,
        20,
        {
          field: ProductOrderField.PublicationDate,
          direction: OrderDirection.Desc,
        },
        pageType
      ),
      client
    );

    return {
      filterValue,
      filterData,
      productData,
      category,
      collection,
      pageType,
      // priceRange,
      sortBy: {
        field: ProductOrderField.PublicationDate,
        direction: OrderDirection.Desc,
      },
    };
  }

  async loadMore(state: any) {
    if (this.productData.products.pageInfo.hasNextPage) {
      const filter = generateQueryVariables(
        this.filterData,
        this.filterValue,

        this.PAGE_SIZE,
        this.sortBy,
        this.pageType
      );
      (filter as any).after = this.productData.products.pageInfo.endCursor;
      const productData = await getProducts(filter, (this as any).$apollo);
      productData.products.edges = [
        ...this.productData.products.edges,
        ...productData.products.edges,
      ];
      this.setProductData(productData);
      state.loaded();
    } else {
      state.complete();
    }
  }

  @Watch("filterValue", { deep: true })
  async handleFilterValue(val: any, oldVal: any) {
    if (val !== null) {
      if (this.filterData !== null) {
        const filter = generateQueryVariables(
          this.filterData,
          val,

          this.PAGE_SIZE,
          this.sortBy,
          this.pageType
        );
        const productData = await getProducts(filter, (this as any).$apollo);
        this.setProductData(productData);
      }
    }
  }

  @Watch("sortBy")
  async handleSortValue(val: any, oldVal: any) {
    if (val !== oldVal) {
      if (this.filterData !== null && this.filterValue !== null) {
        const filter = generateQueryVariables(
          this.filterData,
          this.filterValue,

          this.PAGE_SIZE,
          val,
          this.pageType
        );
        const productData = await getProducts(filter, (this as any).$apollo);
        this.setProductData(productData);
      }
    }
  }

  @Watch("$apollo.loading")
  handleApolloLoading(val: any, oldVal: any) {
    // console.log(val);
  }

  mounted() {
    // console.log(this.$route.name);
  }
}
</script>
<style scoped lang="scss">
// .gender-index {
//   margin-top: 223px;
// }

.desktop-sort {
  display: none !important;
  @media screen and (min-width: 991.98px) {
    display: flex !important;
  }
}
.products-page-wrapper {
  display: flex;
  flex-wrap: wrap;
  padding: 0 0rem;
  width: 95%;
  margin: 0 auto;
  margin-top: 223px;

  @include mediaSm {
    margin-top: 191px !important;
    flex-direction: column;
  }
}

.not-found {
  text-align: center;
  @include productTitle;
}

.filter-box {
  flex: 1;
  max-width: 270px;
  max-height: calc(100vh - 156px);
  overflow-y: auto;
  @include mediaSm {
    max-width: 95%;
  }

  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) {
    max-width: 95%;
  }
}

.show-filtered-product {
  flex: 2;
  padding-left: 50px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;

  @media screen and (max-width: 991.98px) {
    padding-left: 0px;
    flex: inherit;
    width: 95%;
    margin: 0 auto;
    min-height: 100vh;
  }
}

::v-deep .infinite-status-prompt {
  display: none;
}

.sub-category-filter {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  justify-content: center;

  img {
    border-radius: 100%;
  }

  .sub-img {
    margin-bottom: 15px;
    cursor: pointer;
  }

  .sub-name {
    text-transform: uppercase;
    font-family: "Roboto";
    font-weight: 400;
    font-size: 0.9rem;
  }
}

.child_category {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 50px;
}

.sub-wrapper {
  margin-right: 50px;
  display: flex;
  margin-bottom: 20px;
}

.sidebar-wrapper {
  flex: 1;
  max-width: 270px;
  @include mediaSm {
    position: relative;
    z-index: 12;
  }
}

.product-top-info {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  padding: 0.6rem 0 0.6rem;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  top: 123px !important;
  width: 100%;
  background: #fff;
  z-index: 10;
  @media screen and (min-width: 991.98px) {
    width: 100%;
  }

  @include mediaMd {
    top: 90px !important;
  }

  @include mediaSm {
    top: 90px !important;
  }
}

.page-info {
  margin-left: 2.5%;
  padding-left: 4px;
}

.product-number {
  margin-right: 2.5%;
  @include mediaXs {
    margin-right: 2.5%;
  }
  p {
    font-family: $font-family-h;
    font-weight: 400;
    text-transform: uppercase;
    color: #2e2e2e;
    font-size: 15px;
    @include mediaXs {
      font-size: 13px;
    }
  }
}

.no-product {
  @include productCategory;
  text-transform: capitalize;
}

h2 {
  font-family: $font-family-h;
  font-weight: 500;
  color: #2e2e2e;
  margin-top: 0;
  font-size: 1.6rem;
  text-transform: capitalize;
  margin-bottom: 5px;
}

.gender-breadcrumb {
  p {
    font-family: $font-family-h;
    font-weight: 500;
    color: #2e2e2e;
    text-transform: capitalize;
    font-size: 15px;
    font-style: italic;
    span {
      color: #919191;
    }
  }
}

// Previous Style

.product-slider {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  grid-gap: 56px 40px;
  margin-bottom: $section-margin;

  @include mediaXs {
    grid-gap: 20px 20px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important;
    margin-bottom: 30px;
  }

  @include mediaSm {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @include mediaMd {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @include mediaLg {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (min-width: 1171px) and (max-width: 1422px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 1423px) and (max-width: 1700px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  @media (min-width: 2200px) {
    grid-gap: 56px 50px;
    grid-template-columns: repeat(auto-fill, minmax(416px, 1fr));
  }
}
// comment

.sorting-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 25px;
  @include mediaXs {
    margin-bottom: 15px;
  }

  // @include mediaSm {
  //   display: none;
  // }
}

.sticky {
  position: sticky;
  top: 171px;
  height: 100%;
  transition: all 0.3s ease-in-out;
  @media screen and (max-width: 991.98px) {
    position: fixed;
    top: 129px;
    height: auto;
    z-index: 5 !important;
    width: 100%;
    background: #fff;
  }

  @media all and (device-width: 768px) and (device-height: 1024px) and (orientation: portrait) {
    width: 100% !important;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 80px;
  color: #919191;
  font-family: $font-family-h;
  font-weight: 400;

  @include mediaXs {
    margin-bottom: 30px;
  }
}

::v-deep .infinite-loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
