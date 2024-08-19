import { CmdService } from '@/services/cmd.service'
import { ContainerService } from '@/services/container.service'
import { CmdModule } from '@/modules/cmd.module'
import { ConsoleService } from '@/services/console.service'
import { ConfigService } from '@/services/config.service'
import { ConfigModule } from '@/modules/config.module'
import { I18nModule } from '@/modules/i18n.module'
import { I18nService } from '@/services/i18n.service'
// import { FileService } from '@/services/file.service'
/**
 * 命令动作模块依赖容器
 */
export class ActionModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([
      [CmdService, CmdModule],
      [ConfigService, ConfigModule],
      [I18nService, I18nModule],
      [ConsoleService]
      // [FileService]
    ])
  }
}
