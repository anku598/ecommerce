<template>
  <div class="faq">
    <h2>FAQs</h2>

    <h3>How can we help ?</h3>
    <!-- <div class="filter-search">
      <input
        type="text"
        class="searchTerm"
        placeholder="What are you looking for?"
      />
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </div> -->
    <div class="faq-accordian">
      <AccordianList :comp-data="compData" />
    </div>
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'faq',
  components: {},
})
export default class Faq extends Vue {
  @Prop() compData: any;
}
</script>
<style scoped lang="scss">
.faq {
  margin-top: 5rem;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: $section-margin;
  min-height: calc(100vh - 650px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include mediaXs {
    width: 85%;
    margin-top: 2rem;
  }
}

h2 {
  text-align: center;
  font-family: $font-family-h;
  font-weight: 700;
  text-transform: capitalize;
  font-size: calc(2.5vmin + 15px);
  margin-top: 2rem;
  margin-bottom: 6rem;

  @include mediaXs {
    margin-bottom: 2rem;
  }
}

h3 {
  // margin-top: 3rem;
  font-family: $font-family-h;
  font-weight: 700;
  font-size: 1.4rem;
  @include mediaXs {
    font-size: 0.8rem;
  }
}

input[type='text'] {
  border-radius: 26px;
  background: #fff;
  padding: 15px 15px 15px 55px;
  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}

.filter-search {
  position: relative;
}

button[type='submit'] {
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
}
</style>