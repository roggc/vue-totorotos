import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
    name:'myMain',
    props:{
        x:Object
    },
    render(){
        const Main=s.div`
        `
        return (
            <Main>
                hola
            </Main>
        )
    }
})