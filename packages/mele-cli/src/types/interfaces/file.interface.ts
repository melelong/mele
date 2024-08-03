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
  writeFile(_path: PathOrFileDescriptor, _data: string, _options?: WriteFileOptions): void
}
