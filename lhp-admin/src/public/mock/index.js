import Mock from 'mockjs'
import config from '@/config'

const { serverApi } = config

// var Random = Mock.Random
// Random.extend({
//   xw: function(date) {
//     var data = ['学士', '硕士', '博士']
//     return this.pick(data)
//   }
// })

Mock.mock(serverApi + 'getSignUpData', 'post', {
  'code': 0,
  'success': true,
  'message': '',
  'data': [0, 1, 2, 3, 4]
})

Mock.mock(serverApi + 'getSignUpData2', 'post', {
  'code': 0,
  'success': true,
  'message': '',
  'data': [{
  	'a': 1
  }]
})
