import { ConsoleService } from '@/services/console.service'
import { ContainerService } from '@/services/container.service'
import { I18nService } from '@/services/i18n.service'
/**
 * 文件服务模块依赖容器
 */
export class FileModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([[ConsoleService], [I18nService]])
  }
}
