import { CLI_ENCODING_TYPE } from '@/constants/cli.const'
import { ConditionInfoType, FileInterface } from '@/types/interfaces/services/file.interface'
import {
  existsSync,
  PathLike,
  PathOrFileDescriptor,
  readFileSync,
  WriteFileOptions,
  writeFileSync
} from 'fs'
import { ConsoleService } from '@/services/console.service'
import { FileModule } from '@/modules/file.module'
import { I18nService } from '@/services/i18n.service'
import { render } from 'ejs'
/**
 * 文件服务具体实现
 */
export class FileService implements FileInterface {
  static moduleName: string = 'FileService'
  private readonly consoleService: ConsoleService
  private readonly i18nService: I18nService
  constructor(private readonly fileModule?: FileModule) {
    if (fileModule) fileModule.allInjection(this)
  }
  readFile(_path: PathOrFileDescriptor, _encoding?: EncodingType): string {
    try {
      return _encoding
        ? (readFileSync(_path, _encoding) as unknown as string)
        : (readFileSync(_path, CLI_ENCODING_TYPE) as unknown as string)
    } catch {
      this.consoleService.log(_path as string)
      this.consoleService.error(this.i18nService.t('S_F_READ_ERROR', 'red'))
    }
  }
  writeFile(_path: PathOrFileDescriptor, _data: string, _options?: WriteFileOptions) {
    try {
      _options
        ? writeFileSync(_path, _data, _options)
        : writeFileSync(_path, _data, CLI_ENCODING_TYPE)
    } catch {
      this.consoleService.log(_path as string)
      this.consoleService.error(this.i18nService.t('S_F_WRITE_ERROR', 'red'))
    }
  }
  dynamicWriteFile(_inputPath: string, _outputPath: string, _data: ConditionInfoType): void {
    try {
      const content = this.readFile(_inputPath)
      const ejs = render(content, _data)
      this.writeFile(_outputPath, ejs)
    } catch {
      this.consoleService.log(_inputPath)
      this.consoleService.log(_outputPath)
      this.consoleService.error(this.i18nService.t('S_F_DYNAMIC_WRITE_ERROR', 'red'))
    }
  }
  isExists(_path: PathLike): boolean {
    return existsSync(_path)
  }
}
