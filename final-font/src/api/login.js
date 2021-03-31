import axios from '@/utils/request'

const getCode = (sid) => {
  // axios.request({
  //  method: 'get',
  //  url: '/getCaptcha'
  // })
  return axios.get('/public/getCaptcha', {
    params: {
      sid: sid
    }
  })
}

const login = (loginInfo) => {
  return axios.post('api/user/login', {
    ...loginInfo
  })
}

const signUp = (signUpInfo) => {
  return axios.post('api/user/signUp', {
    ...signUpInfo
  })
}

const newBill = (billInfo) => {
  if (Array.isArray(billInfo)) {
    return axios.post('api/bill/newBill', [...billInfo])
  } else {
    return axios.post('api/bill/newBill', {
      ...billInfo
    })
  }
}

const getBillChart = (params) => {
  return axios.get('api/bill/getBillChart', {
    params
  })
}

export {
  getCode,
  signUp,
  login,
  newBill,
  getBillChart
}
