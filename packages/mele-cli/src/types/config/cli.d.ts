/**
 * 包管理器类型
 */
declare type PackageManagerType = {
  /**
   * 包管理器名称
   */
  name: string
  /**
   * 包管理器命令
   */
  cmd: {
    /**
     * 开发依赖安装命令
     */
    installD: string
    /**
     * 生产依赖安装命令
     */
    installS: string
    /**
     * 全局依赖安装命令
     */
    installG: string
    /**
     * 卸载命令
     */
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
   * 包管理器配置
   */
  packageManager: PackageManagerType[]
}
