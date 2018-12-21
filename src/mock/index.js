import Mock from 'mockjs';
const vehicle = Mock.mock(
  '/auth/logout', 'get', (req, res) => {
    return {
      code: 100,
      msg: '登出test'
    }
  })
const user = Mock.mock(
  '/auth/login', 'post', (req, res) => {
    return {
      code: 200,
      msg: '登录test'
    }
  })
const gradeSubentry = Mock.mock(
  '/gradeSubentry', 'post', (req, res) => {
     return {
       code: 200,
       msg: '登录test'
    }
  })

export default {
  vehicle,
  user
}
