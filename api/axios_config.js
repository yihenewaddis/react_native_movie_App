import axios from axios

const axios=require('axios').default

// const instance=axios.create({
//     baseUrl:'https://api.chapa.co/v1/transaction/initialize',
//     timeout:1000,
//     Headers:{}
// })


const callback_url=(tax_ref)=>{
    return axios.get(`https://api.chapa.co/v1/transaction/verify/${tax_ref}`).then(async({data})=>await data)
}
const data={
    "amount":"100",
    "currency": "ETB",
    "email": "abebech_bekele@gmail.com",
    "first_name": "Bilen",
    "last_name": "Gizachew",
    "phone_number": "0912345678",
    "tx_ref": "chewatatest-666912",
    "callback_url":()=>callback_url("chewatatest-666912"),
    "customization[title]": "Payment for my favourite merchant",
    "customization[description]": "I love online payments."
}
const postTransaction=()=>{
    return axios.post('https://api.chapa.co/v1/transaction/initialize',data,{
        Headers:{}
    }).then(async({data})=>await data)
}

export default postTransaction;