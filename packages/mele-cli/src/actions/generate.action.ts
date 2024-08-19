import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
/**
 * generate 命令具体实现(中间容器 ActionModule )
 */
export class GenerateAction implements ActionInterface {
  static moduleName: string = 'GenerateAction'
  readonly name: string = 'generate'
  readonly alias: string[] = ['g']
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
      desc: t('A_G_DESC', 'cyan') + t('(开发中...)', 'yellow'),
      action(_option) {
        console.log(_option)
      }
    }
  }
}
