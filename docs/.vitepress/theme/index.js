import DefaultTheme from 'vitepress/theme'
import Layout from './components/Layout.vue'
import './custom.css'
import 'remixicon/fonts/remixicon.css'

export default {
  ...DefaultTheme,
  Layout,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)


    // register your custom global components
  }
}