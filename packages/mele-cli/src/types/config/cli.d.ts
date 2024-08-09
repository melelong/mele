/**
 * 补丁节点类型
 */
declare type PatchNodeType = {
  /**
   * 节点名称
   */
  nodeName: string
  /**
   * 可能依赖的模块
   */
  dependency: string[]
}
/**
 * 包管理器类型
 */
declare type PackageManagerType = {
  name: string
  cmd: {
    install: string
    uninstall: string
  }
}
/**
 * cli.config.json
 */
declare type CliConfig = {
  /**
   * 国际化配置
   */
  i18n: i18n.ConfigurationOptions
  /**
   * 补丁配置
   */
  patch: PatchNodeType[]
  /**
   * 包管理器配置
   */
  packageManager: PackageManagerType[]
}
