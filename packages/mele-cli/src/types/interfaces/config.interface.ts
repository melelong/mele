import { DependentEnvInfoType } from '@/types/interfaces/file.interface'

/**
 * 配置服务实现接口
 */
export interface ConfigInterface {
  /**
   * 脚手架信息
   */
  get cliInfo(): PackageJson
  /**
   * 脚手架配置
   */
  get cliConfig(): CliConfig
  /**
   * 脚手架依赖版本映射
   */
  get cliDependency(): DependencyV
  /**
   * 当前项目PackageJson
   */
  get projectPkj(): PackageJson
  /**
   * 当前项目node具体版本
   */
  get nodeVersion(): string
  /**
   * 当前项目node大版本
   */
  get nodeV(): number
  /**
   * 当前项目生产依赖
   */
  get prodDependencies(): Dependencies
  /**
   * 当前项目开发依赖
   */
  get devDependencies(): Dependencies
  /**
   * 当前项目依赖环境信息
   */
  get dependentEnvInfo(): DependentEnvInfoType
  /**
   * 更新脚手架配置
   * @param _config cli.config.json配置
   */
  updateConfig(_config: CliConfig): void
}
