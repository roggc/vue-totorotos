import Vue from 'vue'
import s from 'vue-styled-components'
import Appx from '../store/appx'
import Main from './main'
import User from './user'
import Card from './card'
import Card2 from './card2'
import * as firebase from "firebase/app"
import "firebase/auth"

// const url='http://localhost:5000'
// const urlWs='ws://localhost:5000'
// const url='https://us-central1-totorotos-api.cloudfunctions.net/api1'
// const urlWs='wss://us-central1-totorotos-api.cloudfunctions.net/api1'
const url='https://totorotos-api.herokuapp.com'
const urlWs='wss://totorotos-api.herokuapp.com'

var ws = new WebSocket(urlWs)

export default Vue.extend({
    name:'myApp',
    data(){
        return {
            x:new Appx()
        }
    },
    beforeMount(){
        this.x.commit({type:'init'})
    },
    mounted(){
        ws.onmessage = (that=>function(msg) {
                        var query=`
            query($email:String!){
                getPosts(email:$email){
                  name
                  message
                  photo
                  email
                  date
                }
              }
            `

            var variables={
                email:msg.data
            }

var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    }

fetch(url, options).then(resp=>resp.json())
                   .then(json=>{
                       const arrs=that.x.s.card2xs.filter(a=>{
                           if(a[0].email!==msg.data){
                               return true
                           }
                       })
                       arrs.push(json.data.getPosts.sort((a,b)=>{
                           return Date.parse(b.date)-Date.parse(a.date)
                       }))
                       that.x.s.card2xs=arrs
                    })
                   .catch(e=>console.log(e))
          })(this)

        var query=`
        query{
            getEmails
        }
        `
        var variables={}

var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    }

fetch(url, options).then(resp=>resp.json())
                   .then(json=>json.data.getEmails.forEach(e=>{
                    var query=`
                    query($email:String!){
                        getPosts(email:$email){
                          name
                          message
                          photo
                          email
                          date
                        }
                      }
                    `
        
                    var variables={
                        email:e
                    }
        
        
        var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            }
        
        fetch(url, options).then(resp=>resp.json())
                           .then(json=>{
                               this.x.s.card2xs.push(json.data.getPosts.sort(
                                   (a,b)=>{
                                       return Date.parse(b.date)-Date.parse(a.date)
                                   }
                               ))})
                           .catch(e=>console.log(e))
                   }))
                   .catch(e=>console.log(e))
    },
    render(){
        const General=s.div`
        font-family:sans-serif;
        `
        return (
            <General> 
                <MdToolbar>
                    <span class="md-title">TOTOROTO'S VIP</span>
                    <div class="md-toolbar-section-end">
                        {!this.x.s.userLoggedIn&&<a style='cursor:pointer;'
                        vOn:click={()=>{
                            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(d=> {
      this.x.commit({type:'setState',val:{
          userLoggedIn:true,
          user:d.user
      }})
    })
    .catch(function(e) {
      if(e.code==='auth/web-storage-unsupported')
      {
        alert("For google authentication to work you must enable third party cookies in your browser configuration")
      }
      else {
        throw e
      }
    })
                        }}>sign in w/ google</a>}
                    </div>
                </MdToolbar>
                {this.x.s.userLoggedIn&&<div style='margin:20px;'>
                <MdField>
                    <label>Write a thought:</label>
                <MdTextarea ref='message'/>
                </MdField>
                <MdButton class='md-primary md-raised' vOn:click={()=>{
                    var query = `
mutation($message:String,$email:String!,$name:String,$photo:String,
$date:String!) { 
    postMessage(message:$message,email:$email,name:$name,photo:$photo,
    date:$date)
}
`
var variables = {
    message:this.$refs.message.localValue,
    email:this.x.s.user.email,
    name:this.x.s.user.displayName,
    photo:this.x.s.user.photoURL,
    date:(new Date()).toString().substring(0,24)
}

var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables
        })
    }

fetch(url, options).then(resp=>resp.json())
                   .then(json=>json.data.postMessage)
                   .catch(e=>console.log(e))

                    }}>Post</MdButton>
                </div>}
                {this.x.s.card2xs.length===0&&
                <MdProgressSpinner md-mode="indeterminate"></MdProgressSpinner>}
                {this.x.s.card2xs.map(card2x=><Card2 x={card2x}/>)}
            </General>
        )
    }
})