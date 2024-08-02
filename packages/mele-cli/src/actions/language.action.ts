import { CmdModule } from '@/modules/cmd.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { UtilsService } from '@/services/utils.service'
import { ActionInterface } from '@/types/interfaces/action.interface'

export class LanguageAction implements ActionInterface {
  private readonly utilsService: UtilsService
  private readonly cmdService: CmdService
  constructor(private readonly cmdModule?: CmdModule) {
    this.utilsService = cmdModule.get(UtilsService.name)
    this.cmdService = cmdModule.get(CmdService.name)
  }
  init() {
    CmdService.commandInfos.push(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    return {
      name: 'language',
      alias: 'lang',
      description: I18nService.i18n.__('language_desc'),
      action(_option) {
        console.log(_option)
      }
    }
  }
}
