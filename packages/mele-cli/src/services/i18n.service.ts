import { CmdModule } from '@/modules/cmd.module'
import { I18nInterface } from '@/types/interfaces/i18n.interface'
import { readdirSync } from 'fs'
import { I18n } from 'i18n'
import { UtilsService } from '@/services/utils.service'
import { CLI_CONFIG_PATH } from '@/constants/cli.const'
import { I18N_DIR_PATH } from '@/constants/i18n.const'

/**
 * 国际化服务具体实现
 */
export class I18nService implements I18nInterface {
  static i18n: i18n.I18n = new I18n()
  static defaultConfig: i18n.ConfigurationOptions = {
    directory: I18N_DIR_PATH,
    objectNotation: true,
    updateFiles: false,
    api: {
      __: 'translate',
      __n: 'translateN'
    }
  }
  private readonly utilsService: UtilsService
  constructor(private readonly cmdModule: CmdModule) {
    this.utilsService = cmdModule.get(UtilsService.name)
    I18nService.defaultConfig.defaultLocale = this.readConfig().i18n.defaultLocale
    I18nService.defaultConfig.locales = this.getLocales()
  }
  readConfig() {
    return JSON.parse(this.utilsService.readFile(CLI_CONFIG_PATH)) as CliConfig
  }
  init(_options?: i18n.ConfigurationOptions): i18n.I18n {
    _options
      ? I18nService.i18n.configure(_options)
      : I18nService.i18n.configure(I18nService.defaultConfig)
    return I18nService.i18n
  }
  getLocales(): string[] {
    return readdirSync(I18N_DIR_PATH).map((item) => item.replace('.json', ''))
  }
}
