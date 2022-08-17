import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import UsersView from "../views/UsersView.vue";
import EditView from "../views/EditView.vue";
import axios from "axios";

function AdminAuth(to, from, next){
  var token = localStorage.getItem('token');
  if(token != undefined){
    var req = { headers: { Authorization: "Bearer " + token } };
    axios.post("http://localhost:8686/validate",{},req).then(res=>{
      console.log(res);
      next();
    }).catch(err=>{
      console.log(err)
      next('/login');
    });
  } else {
    console.log("5-> ");
    next("/login");
  }  
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/admin/users',
    name: "Users",
    component: UsersView,
    beforeEnter: AdminAuth
  },
  {
    path: '/admin/users/edit/:id',
    name: "UserEdit",
    component: EditView,
    beforeEnter: AdminAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
