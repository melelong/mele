import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConfigService } from '@/services/config.service'
import { ConsoleService } from '@/services/console.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/action.interface'
import inquirer from 'inquirer'
/**
 * language 命令(中间容器 ActionModule )
 */
export class LanguageAction implements ActionInterface {
  static moduleName: string = 'LanguageAction'
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  private readonly configService: ConfigService
  private readonly consoleService: ConsoleService
  constructor(private readonly actionModule?: ActionModule) {
    if (actionModule) actionModule.allInjection(this)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    const choices = this.i18nService.getLocales().map((item) => ({
      name: item,
      value: item
    }))
    const config = this.configService.cliConfig
    return {
      name: 'language',
      alias: ['l', 'lang'],
      desc: this.i18nService.t('CMD_LANGUAGE_DESC'),
      action: async (_option) => {
        const spinner = this.consoleService.ora()
        try {
          const { locale } = await inquirer.prompt({
            type: 'rawlist',
            name: 'locale',
            message: this.i18nService.t('MSG_CMD_LANGUAGE_1'),
            choices
          })
          if (locale !== config.i18n.defaultLocale) {
            config.i18n.defaultLocale = locale
            this.configService.updateConfig(config)
          }
          spinner.succeed(this.i18nService.t('MSG_CMD_LANGUAGE_OK'))
        } catch {
          spinner.fail(this.i18nService.t('MSG_CMD_LANGUAGE_EXIT'))
        }
      }
    }
  }
}
