import { CLI_ENCODING_TYPE } from '@/constants/cli.const'
import { FileInterface } from '@/types/interfaces/file.interface'
import { PathOrFileDescriptor, readFileSync, WriteFileOptions, writeFileSync } from 'fs'
/**
 * 工具服务具体实现
 */
export class FileService implements FileInterface {
  static moduleName: string = 'FileService'
  readFile(_path: PathOrFileDescriptor, _encoding?: EncodingType): string {
    return _encoding
      ? (readFileSync(_path, _encoding) as unknown as string)
      : (readFileSync(_path, CLI_ENCODING_TYPE) as unknown as string)
  }
  writeFile(_path: PathOrFileDescriptor, _data: string, _options?: WriteFileOptions) {
    _options
      ? writeFileSync(_path, _data, _options)
      : writeFileSync(_path, _data, CLI_ENCODING_TYPE)
  }
}
