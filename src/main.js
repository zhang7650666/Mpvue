import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示。
const app = new Vue(App)
app.$mount()

export default {
  config: {
    'pages': [
      '^pages/me/main',
      'pages/comments/main',
      'pages/books/main'
    ],
    'window': {
      'backgroundTextStyle': 'light',
      'navigationBarBackgroundColor': '#EA5149',
      'navigationBarTitleText': 'Hadwin 图书管理',
      'navigationBarTextStyle': 'light'
    },
    'tabBar': {
      selectedColor: '#EA5149',
      'list': [{
        'pagePath': 'pages/books/main',
        'text': '图书',
        'iconPath': 'static/img/book.png',
        'selectedIconPath': 'static/img/book-active.png'
      },
      {
        'pagePath': 'pages/comments/main',
        'text': '评论',
        'iconPath': 'static/img/todo.png',
        'selectedIconPath': 'static/img/todo-active.png'
      },
      {
        'pagePath': 'pages/me/main',
        'text': '我',
        'iconPath': 'static/img/me.png',
        'selectedIconPath': 'static/img/me-active.png'
      }
      ]
    }

  }

}
