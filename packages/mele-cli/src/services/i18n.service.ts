import { I18nInterface, TextColor } from '@/types/interfaces/services/i18n.interface'
import { readdirSync } from 'fs'
import { I18n } from 'i18n'
import { I18N_DIR_PATH } from '@/constants/i18n.const'
import { I18nModule } from '@/modules/i18n.module'
import { ConfigService } from './config.service'
import chalk from 'chalk'

/**
 * 国际化服务具体实现(中间容器 I18nModule )
 */
export class I18nService implements I18nInterface {
  static moduleName: string = 'I18nService'
  private readonly configService: ConfigService
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
  constructor(private readonly i18nModule?: I18nModule) {
    if (i18nModule) {
      i18nModule.allInjection(this)
      I18nService._defaultConfig.defaultLocale =
        this.configService.cliConfig.i18n.defaultLocale || 'en'
      I18nService._defaultConfig.locales = this.getLocales()
      this._init()
    }
  }
  get i18n(): I18n {
    return I18nService._i18n
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
  t(_key: string, _color?: TextColor): string {
    return _color ? chalk[_color](I18nService._i18n.__(_key)) : I18nService._i18n.__(_key)
  }
}
