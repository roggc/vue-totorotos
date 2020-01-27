import Vue from 'vue'

export default mutations=>
Vue.extend({
    data(){
        return{
            s:null
        }
    },
   methods:{
       commit(data){
           mutations[data.type](data,this)
       }
   } 
})