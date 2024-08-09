/**
 * 版本类型
 */
declare type VersionType = {
  /**
   * 版本号
   */
  v: string
  /**
   * 初始化命令
   */
  init?: string
  /**
   * 注入package.json的内容
   */
  pkgInject?: {
    [name: string]: any
  }
}
/**
 * 依赖版本映射类型
 */
declare type DependencyType = {
  [version: string]: VersionType
}
/**
 * dependency.v.json
 */
declare type DependencyV = {
  dependency: {
    [dependencyName: string]: DependencyType
  }
}
