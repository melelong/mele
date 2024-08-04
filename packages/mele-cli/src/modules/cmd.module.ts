import { ContainerService } from '@/services/container.service'
import { I18nService } from '@/services/i18n.service'
import { I18nModule } from '@/modules/i18n.module'
import { ConsoleService } from '@/services/console.service'
/**
 * 命令服务模块依赖容器
 */
export class CmdModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([[I18nService, I18nModule], [ConsoleService]])
  }
}
