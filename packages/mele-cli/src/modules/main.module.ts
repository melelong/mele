import { CreateAction } from '@/actions/create.action'
import { ContainerService } from '@/services/container.service'
import { FileService } from '@/services/file.service'
import { PatchAction } from '@/actions/patch.action'
import { CmdService } from '@/services/cmd.service'
import { LanguageAction } from '@/actions/language.action'
import { ConsoleService } from '@/services/console.service'
import { ActionModule } from '@/modules/action.module'
import { CmdModule } from '@/modules/cmd.module'

/**
 * 主模块依赖容器
 */
export class MainModule extends ContainerService {
  constructor() {
    super()
    // 添加服务依赖
    this.add(FileService.moduleName, FileService)
    this.add(CmdService.moduleName, CmdService, CmdModule)
    this.add(ConsoleService.moduleName, ConsoleService)
    // 添加命令动作依赖
    this.add(CreateAction.moduleName, CreateAction, ActionModule)
    this.add(LanguageAction.moduleName, LanguageAction, ActionModule)
    this.add(PatchAction.moduleName, PatchAction, ActionModule)
    // console.log('MainModule', this.dependencyList)
  }
}
