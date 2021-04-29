/**
 * 通过iframe进行下载
 * @param url
 */
export const downloadUrl = (url, errorCallback) => {
  const name = 'oa-download-iframe'
  // 首先创建一个用来发送数据的iframe.
  const el = document.getElementById(name)
  if (el) {
    document.body.removeChild(el)
  }
  const iframe = document.createElement('iframe')
  iframe.src = url
  iframe.id = name
  iframe.style.display = 'none'
  iframe.onload = function () {
    errorCallback()
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
