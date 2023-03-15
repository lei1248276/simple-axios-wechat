function d(s) {
  return /^(https?:)/.test(s);
}
function p(s, e) {
  const t = ["constructor"];
  return Object.getOwnPropertyNames(e).filter((r) => !t.includes(r)).forEach((r) => {
    const u = e[r];
    s[r] = typeof u == "function" ? u.bind(s) : u;
  }), s;
}
class h {
  constructor(e) {
    this.defaults = e, this.interceptors = {
      request: new o(),
      response: new o()
    };
  }
  request(e) {
    var u;
    e = { ...this.defaults, ...e }, e.url = d(e.url) ? e.url : e.baseURL + e.url;
    const t = [((u = this.defaults) == null ? void 0 : u.adapter) || f, null];
    this.interceptors.request.forEach(function(l) {
      t.unshift(l.fulfilled, l.rejected);
    }), this.interceptors.response.forEach(function(l) {
      t.push(l.fulfilled, l.rejected);
    });
    let n = Promise.resolve(e), r = 0;
    for (; r < t.length; )
      n = n.then(t[r++], t[r++]);
    return n;
  }
  options(e = "", t = {}) {
    return this.request({ method: "OPTIONS", url: e, ...t });
  }
  get(e = "", t = {}) {
    return this.request({ method: "GET", url: e, ...t });
  }
  head(e = "", t = {}) {
    return this.request({ method: "HEAD", url: e, ...t });
  }
  post(e = "", t = {}) {
    return this.request({ method: "POST", url: e, ...t });
  }
  put(e = "", t = {}) {
    return this.request({ method: "PUT", url: e, ...t });
  }
  delete(e = "", t = {}) {
    return this.request({ method: "DELETE", url: e, ...t });
  }
  trace(e = "", t = {}) {
    return this.request({ method: "TRACE", url: e, ...t });
  }
  connect(e = "", t = {}) {
    return this.request({ method: "CONNECT", url: e, ...t });
  }
}
class o {
  constructor() {
    this.handlers = [];
  }
  use(e, t) {
    return this.handlers.push({ fulfilled: e || null, rejected: t || null }), this.handlers.length - 1;
  }
  eject(e) {
    this.handlers[e] = { fulfilled: null, rejected: null };
  }
  clear() {
    this.handlers = [];
  }
  forEach(e) {
    this.handlers.forEach((t) => {
      e(t);
    });
  }
}
function f(s) {
  return new Promise((e, t) => {
    const n = wx.request({
      ...s,
      success: (r) => {
        e(r);
      },
      fail: (r) => {
        t(r);
      }
    });
    s.getRequestTask && s.getRequestTask(n);
  });
}
function i(s) {
  const e = new h(s), t = h.prototype.request.bind(e);
  return Object.assign(t, p(e, h.prototype));
}
const c = {
  baseURL: "",
  header: {}
}, q = Object.assign(i(c), {
  create(s) {
    return i({ ...c, ...s });
  }
});
export {
  q as default,
  q as simpleAxios
};
