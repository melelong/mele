import { CmdService } from '@/services/cmd.service'
import { ContainerService } from '@/services/container.service'
import { I18nService } from '@/services/i18n.service'
import { I18nModule } from '@/modules/i18n.module'
import { CmdModule } from '@/modules/cmd.module'
import { FileService } from '@/services/file.service'
import { ConsoleService } from '@/services/console.service'
/**
 * 命令动作模块依赖容器
 */
export class ActionModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([
      [CmdService, CmdModule],
      [I18nService, I18nModule],
      [FileService],
      [ConsoleService]
    ])
  }
}
