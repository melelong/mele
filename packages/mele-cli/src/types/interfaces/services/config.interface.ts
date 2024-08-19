import { ConditionInfoType } from '@/types/interfaces/services/file.interface'
import { ValidateFunction } from 'ajv'

/**
 * 生成补丁配置文件的参数类型
 */
export type GConfigFileOptions = {
  configFile: ConfigFileType
  data: ConditionInfoType
}
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
   * patch命令配置
   */
  get patchConfig(): PatchConfig
  /**
   * 当前项目PackageJson内容
   */
  get projectPkg(): PackageJson
  /**
   * 当前项目PackageJson路径
   */
  get projectPkgPath(): string
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
   * 当前项目所有依赖
   */
  get allDependencies(): Dependencies
  /**
   * 获取依赖版本映射信息
   * @param _name 依赖名
   */
  getDependencyVConfig(_name: string): DependencyVInfoType
  /**
   * 更新脚手架配置
   * @param _config cli.config.json配置
   */
  updateConfig(_config: CliConfig): void
  /**
   * 更新当前项目package.json配置
   * @param _config package.json配置
   */
  updateProjectPkg(_config: PackageJson): void
  /**
   * 生成配置文件
   * @param _options 生成配置文件的参数
   */
  GConfigFile(_options: GConfigFileOptions): void
  /**
   * 获取json格式验证器
   * @param _path json格式验证文件路径
   */
  getJsonValidate(_path: string): ValidateFunction<any>
  /**
   * 验证cli.config.json格式
   * @param _data 验证数据
   */
  validateCliConfig(_data: CliConfig): void
  /**
   * 验证<依赖名>.v.json格式
   * @param _data 验证数据
   */
  validateDependencyVConfig(_data: DependencyVInfoType): void
  /**
   * 验证patch.config.json格式
   * @param _data 验证数据
   */
  validatePatchConfig(_data: PatchConfig): void
}
