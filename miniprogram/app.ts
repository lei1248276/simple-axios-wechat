import SimpleAxios from './src/simpleAxios/index'

// app.ts
App({
  globalData: {},
  onLaunch() {
    /* const simpleAxios = SimpleAxios.create({
      baseURL: 'http://httpbin.org/get',
      timeout: 10 * 1000
      //! adapter: 自定义处理请求方法，要求返回一个Promise
    })*/
    SimpleAxios.defaults.baseURL = 'http://httpbin.org/get'
    SimpleAxios.defaults.timeout = 10 * 1000
    console.log('%c🚀 ~ method: onLaunch ~', 'color: #F25F5C;font-weight: bold;', { SimpleAxios })

    SimpleAxios.interceptors.request.use((res) => {
      console.log('%c🚀 ~ method: request ~', 'color: #F25F5C;font-weight: bold;', res)
      return res
    }, (err) => {
      console.error('request:', err)
    })

    SimpleAxios.interceptors.response.use((res) => {
      console.log('%c🚀 ~ method: response ~', 'color: #F25F5C;font-weight: bold;', res)
      return res.statusCode === 200 ? res : Promise.reject(res)
    }, (err) => {
      console.error('response:', err)
      return Promise.reject(err)
    })

    const simpleAxios = SimpleAxios.create({
      baseURL: 'http://httpbin.org/post'
    })
    console.log('%c🚀 ~ method: onLaunch ~', 'color: #F25F5C;font-weight: bold;', { simpleAxios })

    /* SimpleAxios.get('').then(res => {
      console.log('%c🚀 ~ method: SimpleAxios.get ~', 'color: #F25F5C;font-weight: bold;', res)
    })*/

    /* simpleAxios.post('').then(res => {
      console.log('%c🚀 ~ method: simpleAxios.post ~', 'color: #F25F5C;font-weight: bold;', res)
    })*/

    SimpleAxios<{data: any, state: number}>({
      url: '',
      method: 'GET',
      getRequestTask: (task) => {
        console.log('%c🚀 ~ method: getRequestTask ~', 'color: #F25F5C;font-weight: bold;', task.abort())
      }
    })
      .then(res => {
        console.log('%c🚀 ~ method: SimpleAxios ~', 'color: #F25F5C;font-weight: bold;', res)
      })
      .catch(err => {
        console.error(err)
      })
  }
})
