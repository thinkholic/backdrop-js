export const httpStatus = {
  100: 'Continue',
  101: 'Switching Protocols',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested range not satisfiable',
  417: 'Expectation Failed',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version not supported',
};

const http = {};
Object.keys(httpStatus).forEach((code) => {
  const key = httpStatus[code].toUpperCase().replaceAll(' ', '_');
  http[key] = code;
});

http.messages = httpStatus;

// response
export const response = {};

response.ok = (res, data = httpStatus[http.OK], errors = null) =>
  res.status(http.OK).json({ code: http.OK, data, errors });

response.notFound = (res, data = null, errors = [httpStatus[http.NOT_FOUND]]) =>
  res.status(http.NOT_FOUND).json({ code: http.NOT_FOUND, data, errors });

response.internalError = (
  res,
  data = null,
  errors = [httpStatus[http.INTERNAL_SERVER_ERROR]]
) =>
  res
    .status(http.INTERNAL_SERVER_ERROR)
    .json({ code: http.INTERNAL_SERVER_ERROR, data, errors });

response.bad = (res, data = null, errors = [httpStatus[http.BAD_REQUEST]]) =>
  res.status(http.BAD_REQUEST).json({ code: http.BAD_REQUEST, data, errors });

response.unauthorized = (
  res,
  data = null,
  errors = [httpStatus[http.UNAUTHORIZED]]
) =>
  res.status(http.UNAUTHORIZED).json({ code: http.UNAUTHORIZED, data, errors });

response.forbidden = (
  res,
  data = null,
  errors = [httpStatus[http.FORBIDDEN]]
) => res.status(http.FORBIDDEN).json({ code: http.FORBIDDEN, data, errors });

export default http;
