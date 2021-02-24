import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'



Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
		path: '/',
		name: 'login',
		component: Login,
	},
	{
		path: '/layout',
		component: Layout,
		children:[{
			path:'',
			name:'home',
			component: Home
		}
		]
    }
	
  ]
})
