import withStore from './withStore'
import Mainx from './mainx.js'
import Userx from './userx.js'
import Cardx from './cardx.js'

export default withStore({
    init(data,this_){
        if(this_.s===null){
            this_.s={
                showDrawer:false,
                mainPage:true,
                userPage:false,
                cardPage:false,
                card2xs:[],
                mainx:new Mainx(),
                userx:new Userx(),
                cardx:new Cardx()
            }
            this_.s.mainx.commit({type:'init'})
            this_.s.userx.commit({type:'init'})
            this_.s.cardx.commit({type:'init'})
        }
    },
    setState(data,this_){
        this_.s={
            ...this_.s,
            ...data.val
        }
    }
})