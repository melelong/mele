import { PathOrFileDescriptor, WriteFileOptions } from 'fs'
/**
 * 路径类型
 */
export type PathType = {
  templatePath: string
  outputPath: string
}
/**
 * 依赖环境信息类型
 */
export type DependentEnvInfoType = {
  /**
   * 是否使用typescript
   */
  isTs: boolean
  /**
   * 是否使用prettier
   */
  isPrettier: boolean
  /**
   * 是否使用eslint
   */
  isEslint: boolean
}
/**
 * 文件服务实现接口
 */
export interface FileInterface {
  /**
   * 读取文件内容
   * @param _path 文件路径
   * @param _encoding 编码
   */
  readFile(_path: PathOrFileDescriptor, _encoding: EncodingType): string
  /**
   * 写入文件内容
   * @param _path 文件路径
   * @param _data 文件内容
   * @param _options 编码选项
   */
  writeFile(_path: PathOrFileDescriptor, _data: string, _options?: WriteFileOptions): void
  /**
   * 动态创建文件
   * @param _path 文件路径
   * @param _info 创建信息类型
   */
  dynamicWriteFile(_path: PathType, _info: DependentEnvInfoType): void
  /**
   * 当前运行命令的目录
   */
  get cwdPath(): string
  /**
   * 当前运行命令脚本文件所在的目录
   */
  get scriptDirPath(): string
  /**
   * 当前运行命令脚本文件路径
   */
  get scriptFilePath(): string
}
