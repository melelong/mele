import { I18n } from 'i18n'

/**
 * 国际化服务实现接口
 */
export interface I18nInterface {
  /**
   *  读取配置
   */
  readConfig(): CliConfig
  /**
   * 初始化
   * @param _options 配置
   */
  init(_options: i18n.ConfigurationOptions): I18n
  /**
   * 获取国际化语言列表
   * @param _path 路径
   */
  getLocales(_path: string): string[]
}
