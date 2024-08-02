import { CreateAction } from '@/actions/create.action'
import { ContainerService } from '@/services/container.service'
import { UtilsService } from '@/services/utils.service'
import { PatchAction } from '@/actions/patch.action'
import { CmdService } from '@/services/cmd.service'
import { CmdModule } from '@/modules/cmd.module'
import { I18nService } from '@/services/i18n.service'
import { LanguageAction } from '@/actions/language.action'

/**
 * 主模块中间容器
 */
export class MainModule extends ContainerService {
  constructor() {
    super()
    // 添加服务依赖
    this.add(UtilsService.name, UtilsService)
    this.add(CmdService.name, CmdService)
    this.add(I18nService.name, I18nService, CmdModule)
    // 添加命令动作依赖
    this.add(CreateAction.name, CreateAction, CmdModule)
    this.add(LanguageAction.name, LanguageAction, CmdModule)
    this.add(PatchAction.name, PatchAction, CmdModule)
  }
}
