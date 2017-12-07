import request from 'superagent'

const host = 'http://localhost:3030'

export default class ApiClient {
  defaultOptions = {
    tokenStorageKey: 'legaljoeApiJWT'
  }

  constructor(options = {}) {
    this.options = { ...this.defaultOptions, ...options }
  }

  authenticate(username, password) {
    return this.post('/sessions', { username, password })
  }

  signOut() {
    this.removeToken()
  }

  get(path) {
    return request
      .get(this.createUrl(path))
      .set(this.headers())
  }

  post(path, data = {}) {
    return request
      .post(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  put(path, data = {}) {
    return request
      .put(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  patch(path, data = {}) {
    return request
      .patch(this.createUrl(path))
      .set(this.headers())
      .send(data)
  }

  delete(path) {
    return request
      .delete(this.createUrl(path))
      .set(this.headers())
  }

  headers() {
    let headers = {
      Accept: 'application/json'
    }

    if (this.isAuthenticated()) {
      headers.Authorization = `Bearer ${this.getToken()}`
    }

    return headers
  }

  isAuthenticated() {
    return !!this.getToken()
  }

  createUrl(path) {
    return [host, path].join('')
  }

  getToken() {
    return localStorage.getItem(this.options.tokenStorageKey)
  }

  storeToken(token) {
    localStorage.setItem(this.options.tokenStorageKey, token)
  }

  removeToken() {
    localStorage.removeItem(this.options.tokenStorageKey)
  }
}
