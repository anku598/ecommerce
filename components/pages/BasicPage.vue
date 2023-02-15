<template>
  <div v-if="pageData">
    <CommonPageHeader
      v-if="!pageData.hide_header"
      :title="pageData.title"
      :subtitle="pageData.subtitle"
      :brandname="pageData.brand_name"
      :img-src="{
        original: pageData.hero_image_original,
        tab: pageData.hero_image_tab,
        mobile: pageData.hero_image_mobile,
      }"
    />

    <component
      v-for="(comp, idx) in pageData.body"
      :key="'bsc' + idx"
      :is="comp.type"
      :comp-data="comp.value"
      :page-title="pageData.title"
    />
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import CommonPageHeader from '@/components/blocks/CommonPageHeader.vue';
import ContactAddress from '../blocks/ContactAddress.vue';
import AboutCollection from '../blocks/AboutCollection.vue';
import OverlappingImageAndText from '../blocks/OverlappingImageAndText.vue';
import LovegenStroyHeadBlock from '../blocks/LovegenStroyHeadBlock.vue';
import WearingLovegen from '../blocks/WearingLovegen.vue';
import Faq from '../blocks/Faq.vue';
import RichTextPage from '../blocks/RichTextPage.vue';
@Component({
  name: 'BasicPage',
  components: {
    CommonPageHeader,
    contact: ContactAddress,
    image_and_content: AboutCollection,
    overlapping_text_and_image: OverlappingImageAndText,
    product_showcase: LovegenStroyHeadBlock,
    i_am_wearing: WearingLovegen,
    FAQ: Faq,
    rich_text: RichTextPage,
  },
})
export default class BasicPage extends Vue {
  @Prop() pageData: any;
}
</script>
<style scoped lang="scss">
</style>