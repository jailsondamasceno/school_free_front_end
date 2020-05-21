import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = 'http://localhost:4000/api/v1'

export function showError(e) {
    if(e && e.response && e.response.data) {
        Vue.toasted.global.defaultError({ msg : e.response.data })
    } else if(typeof e === 'string') {
        Vue.toasted.global.defaultError({ msg : e })
    } else if(typeof e == Object){
        Vue.toasted.global.defaultError({msg:e})
    } else if(typeof e == []){
        Vue.toasted.global.defaultError({msg:e[0]})
    }else {
        Vue.toasted.global.defaultError()
    }
}



export default { baseApiUrl, showError, userKey }