/**
 * 所有动作实现接口
 */
export interface ActionInterface {
  /**
   * 命令名称
   */
  readonly name: string
  /**
   * 命令别名
   */
  readonly alias: string[]
  /**
   * 命令参数
   */
  readonly args?: string[]
  /**
   * 初始化命令
   */
  init(): void
  /**
   * 命令信息
   */
  get commandInfo(): CommandInfo
}
