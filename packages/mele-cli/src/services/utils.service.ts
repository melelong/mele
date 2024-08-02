import { CLI_ENCODING_TYPE } from '@/constants/cli.const'
import { UtilsInterface } from '@/types/interfaces/utils.interface'
import { PathOrFileDescriptor, readFileSync } from 'fs'
/**
 * 工具服务具体实现
 */
export class UtilsService implements UtilsInterface {
  readFile(_path: PathOrFileDescriptor, _encoding?: EncodingType): string {
    return _encoding
      ? (readFileSync(_path, _encoding) as unknown as string)
      : (readFileSync(_path, CLI_ENCODING_TYPE) as unknown as string)
  }
}
