import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
    name:'myUser',
    props:{
        x:Object
    },
    render(){
        const User=s.div`
        `
        return (
            <User>
                user
            </User>
        )
    }
})