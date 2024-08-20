import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
/**
 * ui 命令具体实现(中间容器 ActionModule )
 */
export class UiAction implements ActionInterface {
  static moduleName: string = 'UiAction'
  readonly name: string = 'ui'
  readonly alias: string[] = ['u']
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
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
      i18nService: { t }
    } = this
    return {
      name,
      alias,
      desc: t('A_U_DESC', 'cyan') + t('(开发中...)', 'yellow'),
      action: async (_option) => {
        try {
          console.log(_option)
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
}
