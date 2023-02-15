<template>
  <div class="img-wrap">
    <GenericLink
      v-if="this.compData.tags.length == 0"
      :link="compData.call_to_action"
    >
      <picture>
        <source
          :srcset="$config.HOST + compData.image.tab.src"
          media="(max-width: 769px)"
        />
        <source
          :srcset="$config.HOST + compData.image.mobile.src"
          media="(max-width: 576px)"
        />
        <img
          class="head-img"
          :src="$config.HOST + compData.image.original.src"
          alt="Banner Img"
        /> </picture
    ></GenericLink>

    <picture v-else>
      <source
        :srcset="$config.HOST + compData.image.tab.src"
        media="(max-width: 769px)"
      />
      <source
        :srcset="$config.HOST + compData.image.mobile.src"
        media="(max-width: 576px)"
      />
      <img
        class="head-img"
        :src="$config.HOST + compData.image.original.src"
        alt="Banner Img"
      />
    </picture>
    <template v-if="compData.tags.length === products.length">
      <MarkableBannerTag
        v-for="(item, idx) of compData.tags"
        :tag-data="item"
        :product="products[idx]"
        :key="'pc' + idx"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { SmartQuery } from "vue-apollo-decorators";
import { Action } from "vuex-class";
import { cmsProductQueryBuilder } from "../../apollo/products/queries/builders";
import gql from "graphql-tag";
import MarkableBannerTag from "./MarkableBannerTag.vue";

@Component({
  name: "MarkableBanner",
  components: {
    MarkableBannerTag,
  },
})
export default class MarkableBanner extends Vue {
  @Prop() compData: any;
  tagsVisibile: boolean = true;
  products: any[] = [];
  $apollo: any;
  get HOST() {
    return process.env.HOST;
  }

  get query() {
    const queries: any = (this as any).compData.tags.map(
      (tag: any, idx: number) => {
        const productQuery = cmsProductQueryBuilder(
          idx,
          tag.product.product.slug,
          "fill-420x560"
        );

        return productQuery;
      }
    );
    if (queries.length > 0) {
      const q = String.raw`
        query Product {
          ${queries.join("\n")}
        }
      `;
      return gql(q);
    } else {
      return null;
    }
  }

  async fetch() {
    if (this.query !== null) {
      const client = this.$apollo.getClient();
      const res = await client.query({
        query: this.query,
      });
      this.products = Object.values(res.data);
    }
  }
}
</script>

<style lang="scss" scoped>
.img-wrap {
  height: 100%;
}
.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.head-img {
  width: 100%;
}
</style>
