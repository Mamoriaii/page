import { notification } from 'antd';
import { extend } from 'umi-request';
const has = require('lodash/has');

/** 异常处理程序 */
const errorHandler = (error: { response: Response; data: any }): Response => {
  throw error;
};

/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  timeout: 5000,
});

// 根据options处理弹窗
const handleError = (
  error: { response: Response; data: any },
  options: SelfOption = {},
) => {
  return null;
  // return { data: null, httpErr: true, code: -2 };
};

// 根据配置处理返回的内容
// 如果失败 默认返回 null
const handleResponse = (res: any, options: SelfOption = {}) => {
  const { hasCode = false, getSuccess = false, skipError } = options;
  if (!res.httpErr) {
    // status 200 但是 success:false
    const hasInvalid = !res.success && !skipError;
    if (hasInvalid) {
      notification.error({
        message: res.message || res.msg || '未知错误！',
        description: res.message || res.data || '',
      });
    }
  }
  if (hasCode) {
    if (res.success == false && res.message == 'FAILED') {
      res.message = res.data || res.message;
    }
    return res;
  }
  if (has(res, 'code')) {
    if (res.success) {
      if (getSuccess) return res.data || res.success;
      return res.data;
    } else {
      return null;
    }
  }
  return res;
};

type SelfOption = {
  skipError?: boolean;
  hasCode?: boolean;
  getSuccess?: boolean; // data为null时，返回 success

  isFormdata?: boolean;
  isMock?: boolean;

  paramInUrl?: boolean;

  timeout?: number;

  isBlob?: boolean;
};

const Req = (oldUrl: string, conf?: any, options?: SelfOption): any => {
  const { isMock = false, isFormdata, isBlob } = options || {};
  const url = oldUrl;
  if (isFormdata) {
    if (!conf) conf = {};
    conf.requestType = 'form';
  }
  if (isBlob) conf.responseType = 'blob';
  return request(url, conf).catch((err) => handleError(err, options));
  // .then((res) => handleResponse(res, options));
};
// request.interceptors.response.use(ans as any);

export default {
  get: (url: string, data?: any, options?: SelfOption) => {
    return Req(url, { params: data, self: options } as any, options);
  },
  post: (url: string, data?: any, options?: SelfOption) => {
    return Req(
      url,
      { data: data, self: options, method: 'post' } as any,
      options,
    );
  },
  put: (url: string, data?: any, options?: SelfOption) => {
    const { paramInUrl = false } = options || {};
    const key = paramInUrl ? 'params' : 'data';
    return Req(
      url,
      { [key]: data, self: options, method: 'put' } as any,
      options,
    );
  },
  delete: (url: string, data?: any, options?: SelfOption) => {
    const { paramInUrl = false } = options || {};
    const key = paramInUrl ? 'params' : 'data';
    return Req(
      url,
      { [key]: data, self: options, method: 'delete' } as any,
      options,
    );
  },
};
