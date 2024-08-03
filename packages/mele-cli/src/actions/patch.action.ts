import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/action.interface'
/**
 * patch 命令(中间容器 ActionModule )
 */
export class PatchAction implements ActionInterface {
  static moduleName: string = 'PatchAction'
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  constructor(private readonly actionModule?: ActionModule) {
    // 注入依赖
    this.cmdService = actionModule.get(CmdService.moduleName)
    this.i18nService = actionModule.get(I18nService.moduleName)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    return {
      name: 'patch',
      alias: ['p', 'pp', 'p1'],
      desc: this.i18nService.t('CMD_PATCH_DESC'),
      action(_option) {
        console.log(_option)
      }
    }
  }
}
