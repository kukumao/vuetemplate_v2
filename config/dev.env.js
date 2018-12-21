'use strict'
module.exports = {
  NODE_ENV: '"development"',
  ENV_CONFIG: '"dev"',
  env_config: '"dev"',
  ASSETS_PUBLIC_PATH: '/s/xxx/',
  BASE_API: '"xxx"',
  HOST: '0.0.0.0',
  PORT: '9566',
  // 请求代理（使用fiddler更方便）
  PROXY_TABLE: {
    "http://localhost:9566/dev/": {
      target: 'http://xxx',
      pathRewrite: {
        '/dev/': '/',
        '/api/': '/'
      }
    }
  }
}