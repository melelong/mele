import { I18nInterface } from '@/types/interfaces/i18n.interface'
import { readdirSync } from 'fs'
import { I18n } from 'i18n'
import { FileService } from '@/services/file.service'
import { CLI_CONFIG_PATH } from '@/constants/cli.const'
import { I18N_DIR_PATH } from '@/constants/i18n.const'
import { I18nModule } from '@/modules/i18n.module'

/**
 * 国际化服务具体实现(中间容器 I18nModule )
 */
export class I18nService implements I18nInterface {
  static moduleName: string = 'I18nService'
  private static _i18n: i18n.I18n = new I18n()
  private static _defaultConfig: i18n.ConfigurationOptions = {
    directory: I18N_DIR_PATH,
    objectNotation: true,
    updateFiles: false,
    api: {
      __: 'translate',
      __n: 'translateN'
    }
  }
  private readonly fileService: FileService
  constructor(private readonly i18nModule?: I18nModule) {
    // 注入依赖
    this.fileService = i18nModule.get(FileService.moduleName)
    I18nService._defaultConfig.defaultLocale = this.readConfig().i18n.defaultLocale
    I18nService._defaultConfig.locales = this.getLocales()
    this._init()
  }
  get i18n(): I18n {
    return I18nService._i18n
  }
  readConfig() {
    return JSON.parse(this.fileService.readFile(CLI_CONFIG_PATH)) as CliConfig
  }
  _init(_options?: i18n.ConfigurationOptions): i18n.I18n {
    _options
      ? I18nService._i18n.configure(_options)
      : I18nService._i18n.configure(I18nService._defaultConfig)
    return I18nService._i18n
  }
  getLocales(): string[] {
    return readdirSync(I18N_DIR_PATH).map((item) => item.replace('.json', ''))
  }
  t(_key: string): string {
    return I18nService._i18n.__(_key)
  }
}
