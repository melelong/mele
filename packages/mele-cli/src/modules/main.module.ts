import { NewAction } from '@/actions/new.action'
import { ContainerService } from '@/services/container.service'
import { PatchAction } from '@/actions/patch.action'
import { CmdService } from '@/services/cmd.service'
import { LanguageAction } from '@/actions/language.action'
import { ConsoleService } from '@/services/console.service'
import { ActionModule } from '@/modules/action.module'
import { CmdModule } from '@/modules/cmd.module'
import { ConfigModule } from '@/modules/config.module'
import { AddModuleArray } from '@/types/interfaces/services/container.interface'
import { GenerateAction } from '@/actions/generate.action'
import { ConfigService } from '@/services/config.service'
import { InfoAction } from '@/actions/info.action'
import { ZipAction } from '@/actions/zip.action'
import { UiAction } from '@/actions/ui.action'
/**
 * 主模块依赖容器
 */
export class MainModule extends ContainerService {
  constructor() {
    super()
    // 方法1: 全部添加
    const addModuleArray: AddModuleArray = [
      [ConfigService, ConfigModule],
      [CmdService, CmdModule],
      [ConsoleService],
      [NewAction, ActionModule],
      [LanguageAction, ActionModule],
      [PatchAction, ActionModule],
      [InfoAction, ActionModule],
      [GenerateAction, ActionModule],
      [ZipAction, ActionModule],
      [UiAction, ActionModule]
    ]
    this.allAdd(addModuleArray)
    // 方法2: 一个一个添加
    // 添加服务依赖
    // this.add(ConfigService.moduleName, ConfigModule)
    // this.add(CmdService.moduleName, CmdService, CmdModule)
    // this.add(ConsoleService.moduleName, ConsoleService)
    // 添加命令动作依赖
    // this.add(NewAction.moduleName, NewAction, ActionModule)
    // this.add(LanguageAction.moduleName, LanguageAction, ActionModule)
    // this.add(PatchAction.moduleName, PatchAction, ActionModule)
  }
}
