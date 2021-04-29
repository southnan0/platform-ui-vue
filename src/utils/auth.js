import Cookies from 'js-cookie'

const TokenKey = 'login-token'
const TsKey = 'login-ts'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getTs() {
  return Cookies.get(TsKey)
}

export function setTs(ts) {
  return Cookies.set(TsKey, ts)
}

export function removeTs() {
  return Cookies.remove(TsKey)
}

