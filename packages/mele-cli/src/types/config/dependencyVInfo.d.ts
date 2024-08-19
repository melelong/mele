/**
 * 配置文件类型
 */
declare type ConfigFileType = {
  /**
   * 文件名
   */
  name: string
  /**
   * 文件类型
   */
  type?: string
  /**
   * 输出路径
   */
  output: string
  /**
   * 模板列表
   */
  templates: string[]
}
/**
 * 版本类型
 */
declare type VersionType = {
  /**
   * 依赖名
   */
  name?: string
  /**
   * 版本号
   */
  v: string
  /**
   * 初始化命令
   */
  init?: string[]
  /**
   * 注入package.json的内容
   */
  pkgInject?: {
    [name: string]: any
  }
  /**
   * 依赖需要的配置文件
   */
  configFile?: ConfigFileType[]
}
/**
 * 依赖版本类型
 */
declare type DependencyVInfoType = {
  name: string
  v: {
    [version: string]: VersionType
  }
}
