/**
 * 编码类型
 */
declare type EncodingType = {
  encoding?: null | undefined
  flag?: string | undefined
} | null
/**
 * package.json
 */
declare type PackageJson = {
  name: string
  version: string
  description: string
  author: string
  scripts?: {
    [scriptName: string]: string
  }
  devDependencies?: {
    [packageName: string]: string
  }
  dependencies?: {
    [packageName: string]: string
  }
}
/**
 * 模块集合类型
 */
declare type ModulesType = { [_moduleName: string]: any }
/**
 * cli.config.json
 */
declare type CliConfig = {
  /**
   * 国际化配置
   */
  i18n: i18n.ConfigurationOptions
}

/**
 * 命令信息
 */
declare type CommandInfo = {
  /**
   * 命令名称
   */
  name: string
  /**
   * 命令别名数组
   */
  alias?: string[]
  /**
   * 命令描述
   */
  desc: string
  /**
   * 命令选项数组
   */
  options?: {
    /**
     * 命令选项
     */
    option: string
    /**
     * 命令选项描述
     */
    desc: string
  }[]
  /**
   * 命令动作
   */
  action: (_option) => void
}
