import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConsoleService } from '@/services/console.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
import { NewInterface } from '@/types/interfaces/actions/new.interface'
import { CommanderError } from 'commander'
/**
 * new 命令具体实现(中间容器 ActionModule )
 */
export class NewAction implements ActionInterface, NewInterface {
  static moduleName: string = 'NewAction'
  readonly name: string = 'new'
  readonly alias: string[] = ['n']
  readonly args = ['<project>']
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
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
      args,
      i18nService: { t }
    } = this
    return {
      name,
      alias,
      desc: t('A_N_DESC', 'cyan') + t('(开发中...)', 'yellow'),
      args,
      exitOverride: (_err: CommanderError) => {
        this.consoleService.error(
          _err.code === 'commander.missingArgument' ? t('A_N_ERROR', 'red') : _err?.message
        )
        process.exit(1)
      },
      action: async (_option) => {
        console.log(_option)
      }
    }
  }
}
