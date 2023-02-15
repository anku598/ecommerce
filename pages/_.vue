<template>
  <component
    :is="pageType"
    :page-data="pageData"
    :key="$route.fullPath"
  ></component>
</template>

<script lang='ts'>
import { Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import {
  API_ENDPOINT,
  OTHER_ENDPOINTS,
  PAGES_ENDPOINT,
} from "@/utils/store/endpoints.ts";
import HomePage from "@/components/pages/HomePage.vue";
import BasicPage from "@/components/pages/BasicPage.vue";
import CollectionIndexPage from "~/components/pages/CollectionIndexPage.vue";
import CollectionPage from "~/components/pages/CollectionPage.vue";
import BlogIndexPage from "~/components/pages/BlogIndexPage.vue";
import BlogPage from "~/components/pages/BlogPage.vue";
import MediaPage from "~/components/pages/MediaPage.vue";
import { preloaderTransition } from "~/utils/animation";
import { namespaced, NS_SETTINGS } from "~/utils/store/namespaces.names";
import { SETTINGS } from "~/utils/store/getters.names";

@Component({
  name: "Page",
  components: {
    HomePage,
    BasicPage,
    CollectionIndexPage,
    CollectionPage,
    BlogIndexPage,
    BlogPage,
    MediaPage,
  },
  watchQuery: true,

  // transition: preloaderTransition,
})
export default class Page extends Vue {
  @Getter(namespaced(NS_SETTINGS, SETTINGS)) settings!: any;
  pageData: any | null = null;
  pageType: any | null = null;

  head() {
    const title =
      this.pageType === "HomePage"
        ? this.settings.site.title
        : `${this.pageData.title} | ${this.settings.site.title}`;
    const image =
      (this as any).$config.HOST +
      (this.pageData.opengraph_image
        ? this.pageData.opengraph_image.url
        : this.settings.general.default_og_image
        ? this.settings.general.default_og_image.url
        : false);
    let type: string = "website";
    switch (this.pageType) {
      case "BlogPage":
        type = "article";
        break;
    }

    const data = {
      title,
      meta: [
        {
          hid: "og:site_name",
          name: "og_site_name",
          content: this.settings.site.title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.pageData.meta.seo_title || title,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: (this as any).$config.SITE_URL + this.$route.path,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.pageData.meta.search_description,
        },
        {
          hid: "description",
          name: "description",
          content: this.pageData.meta.search_description,
        },
        {
          hid: "og:type",
          name: "og:type",
          content: type,
        },
      ],
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

  async asyncData({ route, $axios, redirect }: any) {
    const url = `${PAGES_ENDPOINT}/find/?html_path=${route.path}`;
    const pageData = await $axios.$get(url).catch((e: any) => {
      redirect("/404");
    });
    const pageType = pageData.meta.type.split(".")[1];

    return { pageData, pageType };
  }
}
</script>
<style scoped lang="scss">
</style>
