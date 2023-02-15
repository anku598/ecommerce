export interface UserImage {
  readonly id?: number;
  readonly image?: any;
  name: string;
  product_link: string;
  readonly updated_at?: string;
}

export interface BlogCategory {
  readonly id?: number;
  name?: string | null;
  slug?: string | null;
}

export interface PageParentMeta {
  readonly type: string;
  readonly detail_url: string;
  readonly html_url: string;
}

export interface PageParent {
  readonly id: number;
  readonly meta: PageParentMeta;
  readonly title: string;
}

export interface Meta {
  readonly type: string;
  readonly detail_url: string;
  readonly html_url: string;
  readonly slug: string;
  readonly first_published_at: string;
  readonly show_in_menus?: boolean;
  readonly seo_title?: string;
  readonly search_description?: string;
  readonly parent?: Meta | null;
}

export interface TagsChild {
  readonly x: number | null;
  readonly y: number | null;
  readonly product: number | null;
}

export interface MarkableBannerBlock {
  readonly image: number | null;
  readonly tags?: Array<TagsChild>;
}

type PageOrLinkBlock = number | string;

export interface ProductShowcaseSection {
  readonly image: number | null;
  readonly title: string | null;
  readonly subtitle: string | null;
  readonly text: string | null;
  readonly call_to_action: PageOrLinkBlock | null;
  readonly call_to_action_label: string | null;
}

export interface ProductShowcase {
  readonly section_1?: ProductShowcaseSection;
  readonly section_2?: ProductShowcaseSection;
  readonly watermark: string | null;
  readonly products?: Array<number>;
}

export interface CallToActionBanner {
  readonly image: number | null;
  readonly title: string | null;
  readonly subtitle: string | null;
  readonly text: string | null;
  readonly call_to_action: PageOrLinkBlock | null;
  readonly call_to_action_label: string | null;
  readonly watermark: string | null;
}

export interface ShowcaseArticlesChild {
  readonly override_image: number | null;
  readonly override_short_description: string | null;
  readonly article?: number;
}

export interface BlogPostCarousel {
  readonly title: string | null;
  readonly subtitle: string | null;
  readonly call_to_action: number | null;
  readonly call_to_action_label: string | null;
  readonly showcase_articles?: Array<ShowcaseArticlesChild>;
}

export interface InstagramGrid {
  readonly title: string | null;
  readonly tag: string | null;
}

export interface HomePage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly header?: Array<MarkableBannerBlock> | null;
  readonly body?: Array<
    BlogPostCarousel | CallToActionBanner | InstagramGrid | ProductShowcase
  > | null;
  readonly hide_footer?: boolean;
}

export interface CollectionIndexPage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly hide_footer?: boolean;
}

export interface ImageRenditionField {
  readonly height: number;
  readonly width: number;
  readonly url: string;
}

export interface DualImageCarouselChild {
  readonly image: number | null;
  readonly product_handle?: string;
}

export interface ImageAndContent {
  readonly title?: string;
  readonly text?: string;
  readonly image: number | null;
  readonly image_position: string | null;
  readonly watermark?: string;
  readonly style: string | null;
  readonly remove_margin?: boolean;
}

export interface CollectionShopSlider {
  readonly title: string | null;
  readonly handle: string | null;
  readonly showcase_items?: Array<number>;
}

export interface CollectionPage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly hero_image_original?: ImageRenditionField | null;
  readonly hero_image_tab?: ImageRenditionField | null;
  readonly hero_image_mobile?: ImageRenditionField | null;
  readonly year: number;
  readonly description: string;
  readonly image_size_in_carousel: string;
  readonly shopify_handle: string;
  readonly body: Array<
    CollectionShopSlider | DualImageCarouselChild | ImageAndContent
  >;
  readonly hide_footer?: boolean;
}

export interface HeroContentBlock {
  readonly override_image: number | null;
  readonly override_short_description: string | null;
  readonly article?: number;
}

export interface BlogIndexPage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly header?: Array<HeroContentBlock> | null;
  readonly hide_footer?: boolean;
}

export interface MediaPage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly header_title?: string;
  readonly header_description?: string | null;
  readonly hero_image_original?: ImageRenditionField | null;
  readonly hero_image_tab?: ImageRenditionField | null;
  readonly hero_image_mobile?: ImageRenditionField | null;
  readonly hide_footer?: boolean;
}

export interface BlogPage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly category_name?: any | null;
  readonly category?: number | null;
  readonly short_description?: string | null;
  readonly hero_image_original?: ImageRenditionField | null;
  readonly hero_image_tab?: ImageRenditionField | null;
  readonly hero_image_mobile?: ImageRenditionField | null;
  readonly rendered_content?: any | null;
  readonly hide_footer?: boolean;
}

export interface ContactBlock {
  readonly address_title: string | null;
  readonly address_detail: string | null;
  readonly form_title?: string;
  readonly form_subtitle?: string;
  readonly watermark?: string;
}

export interface BasicPage {
  readonly id: number;
  readonly title: string;
  readonly meta: Meta;
  readonly brand_name?: string | null;
  readonly subtitle: string;
  readonly hero_image_original?: ImageRenditionField | null;
  readonly hero_image_tab?: ImageRenditionField | null;
  readonly hero_image_mobile?: ImageRenditionField | null;
  readonly body: Array<ContactBlock | string>;
  readonly hide_footer?: boolean;
}
