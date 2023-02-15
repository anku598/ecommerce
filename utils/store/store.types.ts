import { PaymentGateway, WishlistItem } from '../../graphqlTypes'
import {
  HomePage,
  BasicPage,
  CollectionIndexPage,
  CollectionPage,
  BlogIndexPage,
  BlogPage,
  MediaPage
} from './cms.types'
import { Checkout, User } from '~/graphqlTypes'

export interface RootState {
  version: string;
  [key: string]: any;
}

export interface pageMeta {
  type: string;
  detail_url: string;
  html_url: string;
  slug?: string;
  show_in_menus?: boolean;
  seo_title?: string;
  search_description?: string;
  first_published_at?: string;
  parent?: pageDataType;
}

export interface pageDataType {
  id: number;
  meta: pageMeta;
  title: string;
  hide_footer: boolean;
  disable_scroll: boolean;
  [propName: string]: any;
}

export interface NavToggleEvent {
  show: boolean;
  animation: boolean;
}

export interface AccountNavToggleEvent {
  show: boolean;
  animation: boolean;
}

export interface SearchFieldToggleEvent {
  fieldShow: boolean;
  animation: boolean;
}
export interface PageDataState {
  page: pageDataType | null;
  error: any | null;
  navToggle: NavToggleEvent;
  profileNavToggle: boolean;
  accountNavToggle: AccountNavToggleEvent;
  searchFieldToggle: SearchFieldToggleEvent;
}

export interface PreviewParams {
  content_type: string;
  token: string;
}

export interface MediaItem {
  id: number;
  image: CMSImageType;
  link: String;
  published_at: String;
}

export interface MediaState {
  medias: MediaItem[];
}

export interface FaqItem {
  id: number;
  content: string;
  sort_order: number;
  title: string;
}

export interface FaqState {
  faq: FaqItem[];
}

export interface MainMenuItem {
  id: number;
  link: string;
  url_append: string;
  handle: string;
  label: string;
}

export interface MenuState {
  mainMenu: MainMenuItem[];
  mainMenuError: boolean;
  isMobileMenuOpen: boolean;
}

export interface RmainMenuItem {
  id: number;
  link: string;
  url_append: string;
  handle: string;
  label: string;
}

export interface RMenuState {
  rmainMenu: RmainMenuItem[];
  rmainMenuError: boolean;
}

export interface CMSImageType {
  width: number;
  height: number;
  url: string;
}

// Generated by https://quicktype.io

export interface SettingsData {
  general: GeneralSettings;
  social: SocialSettings;
  analytics: AnalyticsSettings;
  site: SiteSettings;
  mainMenu: MainMenuItem[];
  mainMenuError: boolean;
  isMobileMenuOpen: boolean;
  rmainMenu: RmainMenuItem[];
  rmainMenuError: boolean;
}

export interface AnalyticsSettings {
  google_analytics_id: string | null;
}

export interface GeneralSettings {
  address: string;
  google_map_key: string | null;
  map_style: any[];
  copyright_text: string | null;
  cookie_text: string | null;
  disqus_short_name: string;
}

export interface SiteSettings {
  title: string;
}

export interface SocialSettings {
  facebook_url: string | null;
  twitter_url: string | null;
  linkedin_url: string | null;
  pinterest_url: string | null;
  instagram_user: number;
}

export interface Color {
  id: number;
  name: string;
  code: string;
  color: number[];
}

export interface Size {
  id: number;
  name: string;
  code: string;
}

export interface Season {
  id: number;
  name: string;
  code: string;
}

export interface FilterOptions {
  colors: Color[];
  sizes: Size[];
  seasons: Season[];
}

export interface GlobalState {
  settings: SettingsData | any;
  settingsError: boolean;
  regions: any[];
  currencies: any[];
  regionsError: boolean;
  currenciesError: boolean;
  filterOptions: FilterOptions;
  preloader: boolean;
}

export interface CMSResponsiveImageType {
  original: CMSImageType;
  tab: CMSImageType;
  mobile: CMSImageType;
}

export interface ProductShowCaseItemType {
  image: CMSImageType;
  name: string;
  category: string;
  url: string;
  price: string;
}

export interface ProductShowCaseType {
  text_1: string;
  text_2: string;
  image_1: CMSResponsiveImageType;
  image_2: CMSResponsiveImageType;
  carousel: Array<ProductShowCaseItemType>;
}

type PageData =
  | HomePage
  | BasicPage
  | CollectionIndexPage
  | CollectionPage
  | BlogIndexPage
  | BlogPage
  | MediaPage;

export interface ShopifyState {}

export interface UserImageState {}

export interface ShopifyProductByHandleRequestData {
  handle: string;
  fields: Array<string>;
}

export interface GenericParams {
  [key: string]: any;
}
export interface FetchChildrenParams {
  id: number;
  pageType: string;
  fields: Array<string> | string;
  params?: GenericParams;
}

export interface PaginatedResponse {
  count: number;
  next: string | null;
  prev: string | null;
  results: any[];
}

export interface ProductDataState {
  currentRegion: string;
}

export interface PreferencesState {
  region: any | null;
  currency: any | null;
}

export interface RegistrationFormData {
  username: string;
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
}

export interface LoginFormData {
  id: string;
  password: string;
}

export interface OfflineCartItem {
  product_variant: any;
  price: any;
  count: number;
}

export interface OfflineCart {
  [key: number]: OfflineCartItem;
}

export interface UserDataState {
  token: string | null;
  profile: User | null;
  error: boolean;
  cart: Checkout | null;
  payments: {
    [key: string]: PaymentGateway;
  };
  wishlist: WishlistItem[];
  guest: string | null;
}

export interface FilterInputValue {
  color: string[];
  size: string[];
  category: any[];
  gender: any[];
  price: number[];
  seasons: string[];
}

export interface CookiesState {
  cookieAccepted: boolean | null;
}