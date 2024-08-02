import { PathOrFileDescriptor } from 'fs'

/**
 * 工具服务实现接口
 */
export interface UtilsInterface {
  /**
   * 读取文件内容
   * @param _path 文件路径
   * @param _encoding 编码
   */
  readFile(_path: PathOrFileDescriptor, _encoding: EncodingType): string
}
