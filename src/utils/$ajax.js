// ajax方法
import $ from 'jquery'
/**
 * @author   : syx_ann
 * @version : 1.00
 * @date     : 2019-08
 * @direction: 接口调用封装
 * @comment ：
 */
export default function $ajax (cfg) {
  var ajaxUrl = 'http://api.hebisoft.com' // 接口访问地址
  var ajaxError = null // 接口访问失败处理事件
  if (cfg.api) {
    cfg.api = ajaxUrl + cfg.api
  }
  if (!cfg.error) {
    cfg.error = ajaxError
  }
  cfg.async = (cfg.async === null || cfg.async === '' || typeof (cfg.async) === 'undefined') ? 'true' : cfg.async
  cfg.crossDomain = (cfg.crossDomain === null || cfg.crossDomain === '' || typeof (cfg.crossDomain) === 'undefined') ? 'true' : cfg.crossDomain
  cfg.type = (cfg.type === null || cfg.type === '' || typeof (cfg.type) === 'undefined') ? 'post' : cfg.type
  $.ajax({
    url: cfg.api,
    type: cfg.type, // POST or GET
    async: cfg.async, // 同步or异步
    data: cfg.input, // 输入数据
    crossDomain: cfg.crossDomain, // 跨域支持
    dataType: cfg.dateType, // 'xml', 'html', 'script', 'json', 'jsonp', 'text'.
    xhrFields: {withCredentials: true}, // 支持跨域cookie
    success: function (result, status, xhr) {
      if (typeof cfg.success === 'function') {
        cfg.success(result, status, xhr, cfg)
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if (typeof cfg.error === 'function') {
        cfg.error(XMLHttpRequest, textStatus, errorThrown, cfg)
      }
    }
  })
}
