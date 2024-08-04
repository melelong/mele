import { CreateAction } from '@/actions/create.action'
import { ContainerService } from '@/services/container.service'
import { FileService } from '@/services/file.service'
import { PatchAction } from '@/actions/patch.action'
import { CmdService } from '@/services/cmd.service'
import { LanguageAction } from '@/actions/language.action'
import { ConsoleService } from '@/services/console.service'
import { ActionModule } from '@/modules/action.module'
import { CmdModule } from '@/modules/cmd.module'
import { AddModuleArray } from '@/types/interfaces/container.interface'
import { GenerateAction } from '@/actions/generate.action'
/**
 * 主模块依赖容器
 */
export class MainModule extends ContainerService {
  constructor() {
    super()
    // 方法1: 全部添加
    const addModuleArray: AddModuleArray = [
      [FileService],
      [CmdService, CmdModule],
      [ConsoleService],
      [CreateAction, ActionModule],
      [LanguageAction, ActionModule],
      [PatchAction, ActionModule],
      [GenerateAction, ActionModule]
    ]
    this.allAdd(addModuleArray)
    // 方法2: 一个一个添加
    // 添加服务依赖
    // this.add(FileService.moduleName, FileService)
    // this.add(CmdService.moduleName, CmdService, CmdModule)
    // this.add(ConsoleService.moduleName, ConsoleService)
    // 添加命令动作依赖
    // this.add(CreateAction.moduleName, CreateAction, ActionModule)
    // this.add(LanguageAction.moduleName, LanguageAction, ActionModule)
    // this.add(PatchAction.moduleName, PatchAction, ActionModule)
  }
}
