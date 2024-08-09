import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/action.interface'
/**
 * generate 命令(中间容器 ActionModule )
 */
export class GenerateAction implements ActionInterface {
  static moduleName: string = 'GenerateAction'
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  constructor(private readonly actionModule?: ActionModule) {
    if (actionModule) actionModule.allInjection(this)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    return {
      name: 'generate',
      alias: ['g'],
      desc: this.i18nService.t('CMD_GENERATE_DESC'),
      action(_option) {
        console.log(_option)
      }
    }
  }
}
