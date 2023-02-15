import MobileMenu from './MobileMenu'
import WaterMark from './WaterMarkTextAnim'
import ShoppingCart from './CartAnim'
import SizeChartAnim from './SizeChartAnim'
import LoginFormAnim from './LoginFormAnim'
import { EnterRoute, LeaveRoute } from './routes'
import MenuDropDown from './MenuDropDown'
import SignUpFormAnim from './SignUpForm'
import ShoppingCartEmpty from './CartAnimNoItem'
import ProfileNav from './ProfileNavAnim'
import LoginFormMobileAnim from './LoginFormMobileAnim'
import LoaderEnter from './LoaderEnter'
import LoaderLeave from './LoaderLeave'
import searchFormRevealAnim from './searchFormRevealAnim'
import searchFormEnter from './searchFormEnter'
import ZoomImage from './ZoomImage'

const animations = new Map()

animations.set('enter-route', EnterRoute)
animations.set('leave-route', LeaveRoute)
animations.set('zoom-img', ZoomImage)
animations.set('mobile-menu', MobileMenu)
animations.set('watermark', WaterMark)
animations.set('size-chart-anim', SizeChartAnim)
animations.set('shopping-cart', ShoppingCart)
animations.set('login-form-anim', LoginFormAnim)
animations.set('preloader-enter', LoaderEnter)
animations.set('preloader-leave', LoaderLeave)
animations.set('search-form-reveal-anim', searchFormRevealAnim)
animations.set('search-form-enter-anim', searchFormEnter)
animations.set('login-form-mobile-anim', LoginFormMobileAnim)
animations.set('profile-nav', ProfileNav)
animations.set('signup-form-anim', SignUpFormAnim)
animations.set('dropdown-menu', MenuDropDown)
animations.set('empty-cart', ShoppingCartEmpty)

export default animations
