import { ConsoleService } from '@/services/console.service'
import { ContainerService } from '@/services/container.service'
import { FileService } from '@/services/file.service'
import { I18nService } from '@/services/i18n.service'
/**
 * 配置服务模块依赖容器
 */
export class ConfigModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([[FileService], [I18nService], [ConsoleService]])
  }
}
