import { Options, Ora } from 'ora'

/**
 * 控制台服务实现接口
 */
export interface ConsoleInterface {
  /**
   * 绘制背景字
   * @param _str 字符串
   */
  paintBG(_str: string): void
  /**
   * 添加背景字命令白名单
   * @param _opts 选项数组
   */
  addBGWhiteList(_opts: string[]): void
  /**
   * 是否在白名单内
   * @param _whiteList 白名单
   */
  isInWhitelist(_whiteList: string[]): boolean
  /**
   * ora实例
   * @param _options ora配置
   */
  ora(_options?: string | Options): Ora
  /**
   * 一般信息(无图标)
   * @param _text 文本
   */
  log(_text: string): void
  /**
   * 错误信息(有图标)
   * @param _text 文本
   * @param _ora ora实例
   */
  error(_text: string, _ora?: Ora): void
  /**
   * 警告信息(有图标)
   * @param _text 文本
   * @param _ora ora实例
   */
  warn(_text: string, _ora?: Ora): void
  /**
   * 一般信息(有图标)
   * @param _text 文本
   * @param _ora ora实例
   */
  info(_text: string, _ora?: Ora): void
  /**
   * 成功信息(有图标)
   * @param _text 文本
   * @param _ora ora实例
   */
  succeed(_text: string, _ora?: Ora): void
}
