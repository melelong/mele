import { PathLike, PathOrFileDescriptor, WriteFileOptions } from 'fs'
/**
 * 暴露给模板文件的条件
 */
export type ConditionInfoType = Dependencies
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
   * 路径是否存在
   * @param _path 路径
   */
  isExists(_path: PathLike): boolean
  /**
   * 动态创建文件
   * @param _inputPath 模板文件的路径
   * @param _outputPath 输出文件的路径
   * @param _data 暴露给模板文件的条件
   */
  dynamicWriteFile(_inputPath: string, _outputPath: string, _data: ConditionInfoType): void
}
