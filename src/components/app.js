import Vue from 'vue'
import s from 'vue-styled-components'
import Appx from '../store/appx'
import Main from './main'
import User from './user'
import Card from './card'
import Card2 from './card2'
import * as firebase from "firebase/app"
import "firebase/auth"
import io from 'socket.io-client'

const socket = io('localhost:5000')

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
        var query=`
        query{
            getEmails
        }
        `
        var variables={}

// var url = 'https://us-central1-totorotos-api.cloudfunctions.net/api1',
var url = 'http://localhost:5000',
    options = {
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
        
        
        // var url = 'https://us-central1-totorotos-api.cloudfunctions.net/api1',
        var url = 'http://localhost:5000',
            options = {
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
                               this.x.s.card2xs.push(json.data.getPosts)})
                           .catch(e=>console.log(e))
                   }))
                   .catch(e=>console.log(e))

        socket.on('updated',(that=> function(payload){
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
                email:payload.email
            }


// var url = 'https://us-central1-totorotos-api.cloudfunctions.net/api1',
var url = 'http://localhost:5000',
    options = {
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
                           if(a[0].email!==payload.email){
                               return true
                           }
                       })
                       arrs.push(json.data.getPosts)
                       that.x.s.card2xs=arrs
                    })
                   .catch(e=>console.log(e))
          })(this))
    },
    render(){
        const General=s.div`
        font-family:sans-serif;
        `
        return (
            <General> 
                <MdToolbar>
                {/* <MdButton class="md-icon-button" vOn:click={()=>{
                    this.x.s.showDrawer=true
                    }}>
          <MdIcon>menu</MdIcon>
        </MdButton> */}
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
                {/* <MdDrawer  md-active={this.x.s.showDrawer}>     
<MdToolbar>
<div class="md-toolbar-section-end">
            <MdButton class="md-icon-button md-dense" vOn:click={()=>{
                this.x.s.showDrawer=false
                }}>
              <MdIcon>keyboard_arrow_left</MdIcon>
            </MdButton>
          </div>
</MdToolbar>
        <MdList>
        <MdListItem>
                <MdIcon>dashboard</MdIcon>
                <div class='md-toolbar-section-start'>
                    <MdButton class='md-primary' vOn:click={()=>{
                        this.x.s.userPage=false
                        this.x.s.cardPage=false
                        this.x.s.mainPage=true
                        }}>
                        <span class="md-list-item-text">MAIN</span>
                    </MdButton>
                </div>
            </MdListItem>
            <MdListItem>
                <MdIcon>verified_user</MdIcon>
                <div class='md-toolbar-section-start'>
                    <MdButton class='md-primary' vOn:click={()=>{
                        this.x.s.mainPage=false
                        this.x.s.cardPage=false
                        this.x.s.userPage=true
                        }}>
                        <span class="md-list-item-text">USER</span>
                    </MdButton>
                </div>
            </MdListItem>
            <MdListItem>
                <MdIcon>edit</MdIcon>
                <div class='md-toolbar-section-start'>
                    <MdButton class='md-primary' vOn:click={()=>{
                        this.x.s.mainPage=false
                        this.x.s.userPage=false
                        this.x.s.cardPage=true
                        }}>
                        <span class="md-list-item-text">CARD</span>
                    </MdButton>
                </div>
            </MdListItem>
        </MdList>
                </MdDrawer> */}
                {/* {this.x.s.mainPage&& <Main x={this.x.s.mainx}/>}
                {this.x.s.userPage&& <User x={this.x.s.userx}/>}
                {this.x.s.cardPage&& <Card x={this.x.s.cardx}/>} */}
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

{/* var url = 'https://us-central1-totorotos-api.cloudfunctions.net/api1', */}
var url = 'http://localhost:5000',
    options = {
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
                   .then(json=>console.log(json.data.postMessage))
                   .catch(e=>console.log(e))

                    }}>Post</MdButton>
                    {/* <MdButton class='md-primary'
                    vOn:click={()=>{
                        console.log((new Date()).toString()
                        .substring(0,24))
                    }}>POST2</MdButton> */}
                </div>}
                {this.x.s.card2xs.map(card2x=><Card2 x={card2x}/>)}
            </General>
        )
    }
})