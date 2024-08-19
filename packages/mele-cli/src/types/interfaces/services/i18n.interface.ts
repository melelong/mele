import { I18n } from 'i18n'
export type TextColor =
  | 'red'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white'
  | 'gray'
  | 'black'
  | 'bgRed'
  | 'bgGreen'
  | 'bgYellow'
  | 'bgBlue'
  | 'bgMagenta'
  | 'bgCyan'
  | 'bgWhite'
  | 'bgBlack'
/**
 * 国际化服务实现接口
 */
export interface I18nInterface {
  /**
   * 获取i18n实例
   */
  get i18n(): I18n
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
   * @param _color 颜色
   */
  t(_key: string, _color?: TextColor): string
}
