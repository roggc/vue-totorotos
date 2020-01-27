import Vue from 'vue'
import s from 'vue-styled-components'
import Appx from '../store/appx'

export default Vue.extend({
    name:'myApp',
    data(){
        return {
            x:new Appx(),
            switch:true
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
                <MdButton class='md-raised md-primary'>click</MdButton>
                <MdSwitch vModel={this.switch} class='md-primary'/>
            </General>
        )
    }
})