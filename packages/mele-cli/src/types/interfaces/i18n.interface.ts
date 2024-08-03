import { I18n } from 'i18n'

/**
 * 国际化服务实现接口
 */
export interface I18nInterface {
  /**
   * 获取i18n实例
   */
  get i18n(): I18n
  /**
   *  读取配置
   */
  readConfig(): CliConfig
  /**
   * 初始化
   * @param _options 配置
   */
  _init(_options: i18n.ConfigurationOptions): I18n
  /**
   * 获取国际化语言列表
   * @param _path 路径
   */
  getLocales(_path: string): string[]
  /**
   * 翻译
   * @param _key 键
   */
  t(_key: string): string
}
