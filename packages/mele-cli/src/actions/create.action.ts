import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/action.interface'
/**
 * create 命令(中间容器 ActionModule )
 */
export class CreateAction implements ActionInterface {
  static moduleName: string = 'CreateAction'
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  constructor(private readonly actionModule?: ActionModule) {
    actionModule.allInjection(this)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    return {
      name: 'create <project>',
      alias: ['c', 'new'],
      desc: this.i18nService.t('CMD_CREATE_DESC'),
      action(_option) {
        console.log(_option)
      }
    }
  }
}
