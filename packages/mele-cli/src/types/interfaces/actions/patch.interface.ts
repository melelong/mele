import { Ora } from 'ora'
import { ConditionInfoType } from '@/types/interfaces/services/file.interface'
export type PatchNodeChoicesType = {
  name: string
  value: DependencyType[]
}
/**
 * patch 命令实现接口
 */
export interface PatchInterface {
  /**
   * 获取补丁节点信息选项列表
   */
  get QPatchNodeChoices(): PatchNodeChoicesType[]
  /**
   * 获取补丁节点信息
   * @param _choices 选项列表
   * @returns 补丁依赖[ ]
   */
  QPatchNode(_choices: PatchNodeChoicesType[]): Promise<DependencyType[]>
  /**
   * 获取包管理器信息
   * @returns [包管理器名称, 包管理器安装命令]
   */
  QPackageManager(): Promise<[string, string]>
  /**
   * 生成各个依赖版本信息
   * @param _patchNodeInfo 补丁节点信息
   */
  GVersionInfo(_patchNodeInfo: DependencyType[]): VersionType[]
  /**
   * 生成安装命令
   * @param _baseInstallCMD 包管理器安装命令
   * @param _dep 各个依赖版本信息
   */
  GInstallCMD(_baseInstallCMD: string, _dep: VersionType[]): string
  /**
   * 生成初始化命令
   * @param _dep 各个依赖版本信息
   */
  GInitCMD(_dep: VersionType[]): string[]
  /**
   * 生成配置文件条件(当前项目的所有依赖)
   */
  GConfigFilesData(): ConditionInfoType
  /**
   * 生成注入信息后package.json的内容
   * @param _dep 各个依赖版本信息
   */
  GPJPkg(_dep: VersionType[]): PackageJson
  /**
   * 生成配置文件信息
   * @param _dep 各个依赖版本信息
   */
  GConfigFilesInfo(_dep: VersionType[]): ConfigFileType[]
  /**
   * 注入内容到当前项目package.json
   * @param _PJPkg 注入信息后package.json的内容
   * @param _ora ora实例
   */
  RPkgInject(_PJPkg: PackageJson, _ora: Ora): void
  /**
   * 运行安装命令
   * @param _installCMD 安装命令
   * @param _ora ora实例
   */
  RInstallCMD(_installCMD: string, _ora: Ora): void
  /**
   * 运行初始化命令
   * @param _initCMD 初始化命令
   * @param _ora ora实例
   */
  RInitCMD(_initCMD: string[], _ora: Ora): void
  /**
   * 创建依赖的配置文件
   * @param _dep 各个依赖版本信息
   * @param _ora ora实例
   */
  /**
   * 创建依赖的配置文件
   * @param _configFilesInfo 配置文件信息
   * @param _envInfo 当前项目环境信息
   * @param _ora ora实例
   */
  RConfigFile(_configFilesInfo: ConfigFileType[], _envInfo: ConditionInfoType, _ora: Ora): void
}
