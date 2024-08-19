/**
 * 编码类型
 */
declare type EncodingType = {
  encoding?: null | undefined
  flag?: string | undefined
} | null
/**
 * 依赖关系类型
 */
declare type Dependencies = {
  [moduleName: string]: string
}
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
  devDependencies?: Dependencies
  dependencies?: Dependencies
}
/**
 * 构造函数类型
 */
declare type ConstructorFnType = new (..._args: any[]) => any
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
   * 命令参数数组
   */
  args?: string[]
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
   * @param _option 参数
   * @returns
   */
  action: (_option) => void
  /**
   * 命令错误处理
   * @param _err 错误
   * @returns
   */
  exitOverride?: (_err) => void
}
