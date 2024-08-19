import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConfigService } from '@/services/config.service'
import { ConsoleService } from '@/services/console.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
import inquirer from 'inquirer'
/**
 * language 命令具体实现(中间容器 ActionModule )
 */
export class LanguageAction implements ActionInterface {
  static moduleName: string = 'LanguageAction'
  readonly name: string = 'language'
  readonly alias: string[] = ['l', 'lang']
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
    const {
      name,
      alias,
      i18nService: { t, getLocales }
    } = this
    const choices = getLocales().map((item) => ({
      name: item,
      value: item
    }))
    const config = this.configService.cliConfig
    return {
      name,
      alias,
      desc: t('A_L_DESC', 'cyan'),
      action: async (_option) => {
        try {
          const { locale } = await inquirer.prompt({
            type: 'rawlist',
            name: 'locale',
            message: t('A_L_Q1', 'cyan'),
            choices
          })
          if (locale !== config.i18n.defaultLocale) {
            config.i18n.defaultLocale = locale
            this.configService.updateConfig(config)
          }
          this.consoleService.succeed(t('A_L_OK', 'green'))
        } catch {
          this.consoleService.error(t('A_L_EXIT', 'red'))
        }
      }
    }
  }
}
