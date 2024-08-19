import { Command, ParseOptions } from 'commander'

/**
 * 命令服务实现接口
 */
export interface CmdInterface {
  /**
   * 获取命令实例
   */
  get cmd(): Command
  /**
   * 添加命令信息
   * @param _info 命令信息
   */
  addInfo(_info: CommandInfo): void
  /**
   * 创建命令实例
   * @param _name 命令名称
   * @returns
   */
  create(_name?: string): Command
  /**
   * 设置命令版本号命令
   * @param _version 版本号
   */
  setVersion(_version: string): void
  /**
   * 设置命令帮助
   */
  setHelp(): void
  /**
   * 注册命令
   * @returns
   */
  register(): Command
  /**
   * 解析命令参数
   * @param _argv 参数数组
   * @param _parseOptions 解析配置
   */
  pare(_argv?: readonly string[], _parseOptions?: ParseOptions): void
}
