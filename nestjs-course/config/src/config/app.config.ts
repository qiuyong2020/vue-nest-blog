/**
 * 项目配置文件
 */
export default () => ({
  app: {
    name: '阿雷',
    isDev: process.env.NODE_ENV === 'development', //运行环境：开发或生产
  },
})
