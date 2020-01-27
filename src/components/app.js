import Vue from 'vue'
import s from 'vue-styled-components'
import Appx from '../store/appx'

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
    render(){
        const General=s.div`
        font-family:sans-serif;
        `
        return (
            <General> 
                <MdToolbar></MdToolbar>
                <MdDrawer></MdDrawer>
            </General>
        )
    }
})