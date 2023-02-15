<template>
  <div class="rich-text-page">
    <h2>{{ pageTitle }}</h2>
    <div v-html="compData"></div>
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'RichTextPage',
  components: {},
})
export default class RichTextPage extends Vue {
  @Prop() compData: any;
  @Prop() pageTitle: any;
}
</script>
<style scoped lang="scss">
.rich-text-page {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  // margin-bottom: $section-margin;
  padding-top: 120px;
  padding-bottom: 120px;
}

/deep/ h2 {
  text-align: center;
  font-family: $font-family-h;
  font-weight: 700;
  text-transform: capitalize;
  font-size: calc(2.5vmin + 15px);
  margin-bottom: 65px;
}

.bold-para {
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 16px;
}

/deep/ h3 {
  margin-top: 3rem;
  font-family: $font-family-h;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 15px;
}

/deep/ p {
  color: #0e1224;
  font-family: $font-family-h;
  font-weight: 400;
  margin-bottom: 30px;
  line-height: 25px;
  font-size: 0.9rem;
}

/deep/ ul {
  /deep/ li {
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 14px;
    margin: 1rem 0;
    line-height: 20px;
    list-style: initial;
  }
}
</style>