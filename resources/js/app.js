/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import { Form, HasError, AlertError } from 'vform'
import VueRouter from 'vue-router'
import moment from 'moment'
import VueProgressBar from 'vue-progressbar'
import swal from 'sweetalert2'

// V-Form
window.Form = Form
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
// End V-Form


// Toast Sweat Alert
window.Swal = swal
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.Toast = Toast
// End Toast Sweat Alert


// Progress Bar
Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '2px'
})
// End Progress Bar

// Vue Router
Vue.use(VueRouter)
const routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '/profile', component: require('./components/Profile.vue').default }
]

const router = new VueRouter({
    mode: 'history',
    routes, // short for `routes: routes`,
    linkActiveClass: "active", // active class for non-exact links.
    linkExactActiveClass: "active" // active class for *exact* links.
})

// End Vue Router


// Vue Filter
Vue.filter('upText', function (text) {
    if (!text) return ''
    text = text.toString()
    return text.charAt(0).toUpperCase() + text.slice(1)
})

Vue.filter('myDate', function (date) {
    return moment(date).format('MMMM Do YYYY')
})
// End Vue Filter

// Custom Event
window.Fire = new Vue()

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router
});
