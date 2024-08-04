import { PathOrFileDescriptor, WriteFileOptions } from 'fs'

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
