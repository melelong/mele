export interface BootStrapInterface {
  /**
   * 版本号对比结果
   */
  get res(): boolean[]
  /**
   * 环境是否正确
   */
  get isOk(): boolean
  /**
   * 检查环境
   */
  check(): void
}
