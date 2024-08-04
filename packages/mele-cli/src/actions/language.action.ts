import { CLI_CONFIG_PATH } from '@/constants/cli.const'
import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConsoleService } from '@/services/console.service'
import { FileService } from '@/services/file.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/action.interface'
import { LanguageInterface } from '@/types/interfaces/language.interface'
import rawlist from '@inquirer/rawlist'
/**
 * language 命令(中间容器 ActionModule )
 */
export class LanguageAction implements ActionInterface, LanguageInterface {
  static moduleName: string = 'LanguageAction'
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  private readonly fileService: FileService
  private readonly consoleService: ConsoleService
  constructor(private readonly actionModule?: ActionModule) {
    actionModule.allInjection(this)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    const choices = this.i18nService.getLocales().map((item) => ({
      name: item,
      value: item
    }))
    const config = this.i18nService.readConfig()
    return {
      name: 'language',
      alias: ['lang'],
      desc: this.i18nService.t('CMD_LANGUAGE_DESC'),
      action: async (_option) => {
        const spinner = this.consoleService.ora()
        try {
          const answers = await rawlist({
            message: this.i18nService.t('MSG_CMD_LANGUAGE_1'),
            choices
          })
          if (answers !== config.i18n.defaultLocale) {
            config.i18n.defaultLocale = answers
            this.fileService.writeFile(CLI_CONFIG_PATH, JSON.stringify(config))
          }
          spinner.succeed(this.i18nService.t('MSG_CMD_LANGUAGE_OK'))
        } catch {
          spinner.fail(this.i18nService.t('MSG_CMD_LANGUAGE_EXIT'))
        }
      }
    }
  }
}
