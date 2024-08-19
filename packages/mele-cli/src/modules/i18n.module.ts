import { ConfigService } from '@/services/config.service'
import { ContainerService } from '@/services/container.service'
import { ConfigModule } from '@/modules/config.module'
/**
 * i18n服务模块依赖容器
 */
export class I18nModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([[ConfigService, ConfigModule]])
  }
}
