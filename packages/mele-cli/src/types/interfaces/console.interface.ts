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
}
