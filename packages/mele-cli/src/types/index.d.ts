/**
 * 编码
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
   * 命令别名
   */
  alias: string
  /**
   * 命令描述
   */
  description: string
  /**
   * 命令动作
   */
  action: (_option) => void
}
