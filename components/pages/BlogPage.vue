<template>
  <div class="blog-details" v-if="pageData">
    <header class="blog-header-img">
      <picture>
        <source
          :srcset="$config.HOST + pageData.hero_image_tab.url"
          media="(max-width: 800px)"
        />
        <source
          :srcset="$config.HOST + pageData.hero_image_mobile.url"
          media="(max-width: 300px)"
        />
        <img
          :src="$config.HOST + pageData.hero_image_original.url"
          alt="Banner Img"
        />
      </picture>
    </header>

    <div class="full-blog-card">
      <div class="blog-header-title">
        <div class="cate-info">
          <p class="date">
            {{
              $dayjs(pageData.meta.first_published_at).format("MMM DD, YYYY")
            }}
          </p>
          <span>{{ pageData.category_name }}</span>
        </div>
        <h2>{{ pageData.title }}</h2>

        <div class="social-share-icon">
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fab fa-pinterest-p"></i>
          </a>
        </div>
      </div>

      <div class="content-details" v-html="pageData.rendered_content"></div>
      <div class="social-wrapper">
        <div class="social-share-icon">
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fab fa-pinterest-p"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="comment-wrapper" v-if="generalSettings.disqus_short_name">
      <VueDisqus
        :shortname="generalSettings.disqus_short_name"
        :identifier="pageData.meta.html_url"
      ></VueDisqus>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  name: "BlogPage",
  components: {},
})
export default class BlogPage extends Vue {
  @Prop() pageData: any;

  get HOST() {
    return process.env.HOST;
  }
}
</script>

<style lang="scss" scoped>
.blog-details {
  margin-bottom: $section-margin;
}
.blog-header-img {
  width: 95%;
  margin: 0 auto;
  position: relative;
  margin-bottom: $section-margin;
  height: calc(85vh - 90px);

  @include mediaSm {
    margin-bottom: 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
}

.blog-header-title {
  background: #fff;
  padding: 2rem 3rem;
  // -webkit-box-shadow: 0px 5px 28px -15px rgba(0, 0, 0, 0.69);
  // -moz-box-shadow: 0px 5px 28px -15px rgba(0, 0, 0, 0.69);
  // box-shadow: 0px 5px 28px -15px rgba(0, 0, 0, 0.69);
  width: 65%;
  margin: 0 auto;
  margin-top: -12rem;
  position: relative;
  // @include mediaXs {
  //   width: 100%;
  //   margin-top: 0;
  //   padding: 2rem 2rem;
  //   padding-bottom: 1rem;
  //   box-shadow: none;
  // }
  @include mediaSm {
    width: 100%;
    margin-top: 0;
    padding: 2rem 2rem;
    padding-bottom: 1rem;
    box-shadow: none;
  }
  @include mediaMd {
    width: 90%;
    padding: 2rem 4rem;
  }
  h2 {
    font-size: 1.7rem;
    font-family: $font-family-h;
    font-weight: 600;
    @include mediaXs {
      font-size: 1.3rem;
    }

    @include mediaSm {
      font-size: 1.4rem;
    }
  }

  .cate-info {
    display: flex;
    font-family: $font-family-h;
    font-weight: 400;
    color: $color-lightgray;
    margin-bottom: 10px;
    .date {
      font-size: 1.05rem;
      padding-right: 15px;
    }

    span {
      padding-left: 15px;
      border-left: 1px solid #707070;
      text-transform: uppercase;
    }
  }
}

.content-details {
  margin: 0 auto;
  width: 65%;
  padding: 0 3rem;
  // margin-top: 20px;

  @include mediaSm {
    width: 90%;
    padding: 0;
  }

  @include mediaXs {
    width: 85%;
    padding: 0;
  }

  /deep/ p {
    color: #0e1224;
    font-family: $font-family-h;
    font-weight: 400;
    margin-bottom: 30px;
    line-height: 35px;
    font-size: 1.1rem;
  }
  /deep/ h2,
  /deep/ h3,
  /deep/ h4 {
    font-family: $font-family-h;
    font-weight: 600;
    color: #0e1224;
  }

  /deep/ img {
    width: 60%;
    margin: 0 auto;
  }

  /deep/ figcaption {
    width: 60%;
    margin: 0 auto;
    color: #878787;
    font-family: $font-family-h;
    font-style: italic;
    margin-top: 15px;
  }

  /deep/ blockquote {
    font-family: $font-family-h;
    font-weight: 300;
    color: #0e1224;
    font-style: italic;
    padding: 2rem;
    background: #f6f6f6;
    font-size: 1.2rem;
  }
}

.social-share-icon {
  display: flex;
  margin-top: 10px;
  a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $color-dark-blue;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    font-size: 1.1rem;
  }
}

.social-wrapper {
  width: 65%;
  margin: 0 auto;
  padding: 0 3rem;

  @include iPad {
    margin-left: 0;
  }
}

.comment-wrapper {
  width: 50%;
  margin: 0 auto;
  margin-top: 1.5rem;
}
</style>
