import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'




Vue.use(VueRouter)


  // mode:'history',
  const routes=[
    {
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/',
		component: Layout,
		children:[{
			path:'',
			name:'home',
			component: Home
		},
		{
			path:'/article',
			name:'article',
			component:Article
		},
    {
			path:'/publish',
			name:'publish',
			component:Publish
		}
		]
    }
	
  ]
  const router = new VueRouter({
	  routes
  })

//路由导航
  router.beforeEach((to,from,next)=> {
//to 是 访问界面
// from 是来自哪
// next是放行方法
	if(to.path !=='/login'){
		const user =JSON.parse(window.localStorage.getItem('user'))
		
		if(user){
			//已登录，允许通过
			next()
		} else {
			//没有登录 跳转到登录界面
			next('/login')
		}
	} else {
		//登录界面 正常允许通过
		next()
	}

  })

export default router