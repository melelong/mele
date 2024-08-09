import { CLI_ENCODING_TYPE } from '@/constants/cli.const'
import { DependentEnvInfoType, FileInterface, PathType } from '@/types/interfaces/file.interface'
import { PathOrFileDescriptor, readFileSync, WriteFileOptions, writeFileSync } from 'fs'
/**
 * 文件服务具体实现
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
  dynamicWriteFile(_path: PathType, _info: DependentEnvInfoType): void {
    console.log(_path)
    console.log(_info)
  }
  get cwdPath(): string {
    return process.cwd()
  }
  get scriptDirPath(): string {
    return __dirname
  }

  get scriptFilePath(): string {
    return __filename
  }
}
