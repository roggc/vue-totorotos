import Vue from 'vue'
import s from 'vue-styled-components'

export default Vue.extend({
    name:'myCard2',
    props:{
        x:Array
    },
    render(){
        const Card2=s.div`
        border-radius:3px;
        box-shadow:0 0 1px;
        float:left;
        padding:10px;
        margin:10px;
        width:200px;
        `
        const Content=s.div`
        overflow:auto;
        height:200px;
        `
        const Img=s.img`
        height:40px !important;
        border-radius:3px;
        `
        return (
            <Card2>
                <Img src={this.x[0].photo}/> {this.x[0].name}
                <hr/>
                <Content>
                    {this.x.map(xi=><div>
                    <span>📍<em>{xi.date}:</em> </span>
                    <span>{xi.message}</span>
                        </div>)}
                </Content>
            </Card2>
        )
    }
})