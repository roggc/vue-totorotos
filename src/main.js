import App from './components/app'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Vue from 'vue'
import * as firebase from "firebase/app"

Vue.use(VueMaterial)

firebase.initializeApp({
    apiKey: "AIzaSyDUQ5jrMvXmI_454b_w55lreimSWhNLtbw",
    authDomain: "totorotos.firebaseapp.com",
    databaseURL: "https://totorotos.firebaseio.com",
    projectId: "totorotos",
    storageBucket: "totorotos.appspot.com",
    messagingSenderId: "421208747931",
    appId: "1:421208747931:web:9d55bceee2005743963b3e",
    measurementId: "G-X47Y3L72VJ"
  })


new App({
    el:'#app'
})