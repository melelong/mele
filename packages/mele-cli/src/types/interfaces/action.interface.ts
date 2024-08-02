/**
 * 所有动作实现接口
 */
export interface ActionInterface {
  /**
   * 初始化命令
   */
  init(): void
  /**
   * 命令信息
   */
  get commandInfo(): CommandInfo
}
