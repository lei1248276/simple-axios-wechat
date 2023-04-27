import SimpleAxios from './src/simpleAxios/index'

// app.ts
App({
  globalData: {},
  onLaunch() {
    /* const simpleAxios = SimpleAxios.create({
      baseURL: 'http://httpbin.org/get',
      timeout: 10 * 1000
      //! adapter?: 自定义处理请求方法，要求返回一个Promise
    })*/

    SimpleAxios.defaults.baseURL = 'http://httpbin.org/get'
    SimpleAxios.defaults.timeout = 10 * 1000
    SimpleAxios.defaults.header.token = ''
    /* SimpleAxios.defaults.adapter = function adapter(config) {
      return new Promise((resolve, reject) => {
        const RequestTask = wx.request({
          ...config,
          success: (res) => {
            console.log('%c🚀 ~ method: adapter ~', 'color: #F25F5C;font-weight: bold;', res)
            resolve(res)
          },
          fail: (err) => {
            reject(err)
          }
        })
        // ! 自定义adapter需要手动通过回调暴露RequestTask
        config.getRequestTask && config.getRequestTask(RequestTask)
      })
    }*/

    console.log('%c🚀 ~ method: onLaunch ~', 'color: #F25F5C;font-weight: bold;', { SimpleAxios })

    SimpleAxios.interceptors.request.use((res) => {
      console.log('%c🚀 ~ method: request ~', 'color: #F25F5C;font-weight: bold;', res.header!.code)
      return res
      // return Promise.reject(res)
    }, (err) => {
      console.error('request:', err)
      return Promise.reject(err)
    })

    SimpleAxios.interceptors.response.use((res) => {
      console.log('%c🚀 ~ method: response ~', 'color: #F25F5C;font-weight: bold;', res)
      return res.statusCode === 200 ? res : Promise.reject(res)
    }, (err) => {
      console.error('response:', err)
      return Promise.reject(err)
    })

    SimpleAxios({
      url: '',
      method: 'GET'
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    const simpleAxios = SimpleAxios.create({
      baseURL: 'http://httpbin.org/post',
      header: { token: '', state: 1, err: '???' }
    })
    console.log('%c🚀 ~ method: onLaunch ~', 'color: #F25F5C;font-weight: bold;', { simpleAxios })

    simpleAxios.interceptors.request.use((res) => {
      console.log('%c🚀 ~ method: request ~', 'color: #F25F5C;font-weight: bold;', res.header!.token)
      return res
    }, (err) => {
      console.error('request:', err)
      return Promise.reject(err)
    })

    simpleAxios.interceptors.response.use((res) => {
      console.log('%c🚀 ~ method: response ~', 'color: #F25F5C;font-weight: bold;', res)
      return res.statusCode === 200 ? res.data : Promise.reject(res)
    }, (err) => {
      console.error('response:', err)
      return Promise.reject(err)
    })

    simpleAxios.request<any, { state: number, msg: string }>({
      url: '',
      method: 'GET',
      getRequestTask: (task) => {
        console.log('%c🚀 ~ method: getRequestTask ~', 'color: #F25F5C;font-weight: bold;', task.abort())
      }
    })
      .then((res) => {
        if (typeof res === 'string' || (res instanceof ArrayBuffer)) return
        console.log('%c🚀 ~ method: SimpleAxios ~', 'color: #F25F5C;font-weight: bold;', res)
      })
      .catch(err => {
        console.error(err)
      })

    simpleAxios.get<{ state: number, msg: string }>('', {
      method: 'GET',
      getRequestTask: (task) => {
        console.log('%c🚀 ~ method: getRequestTask ~', 'color: #F25F5C;font-weight: bold;', task.abort())
      }
    })
      .then((res) => {
        if (typeof res === 'string' || (res instanceof ArrayBuffer)) return
        console.log('%c🚀 ~ method: SimpleAxios ~', 'color: #F25F5C;font-weight: bold;', res)
      })
      .catch(err => {
        console.error(err)
      })
  }
})
