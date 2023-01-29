import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "zh-CN",
  title: "卷心菜",
  themeConfig: {
    editLink: {
      pattern: 'https://gitee.com/vuejs/vitepress/edit/main/docs/:path',
      text: '在Gitee中编辑本页面'
    },
    nav: [
      { text: '看这里', link: '/The cabbage of CAU' },
      {
        text: '看傻逼', items: [
          { text: 'Introduction', link: '/张随缘' },
          { text: 'Getting Started', link: '/getting-started' },
        ]
      }
    ]
  },
  lastUpdated: true
})
