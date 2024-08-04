import { ContainerService } from '@/services/container.service'
import { FileService } from '@/services/file.service'
/**
 * i18n服务模块依赖容器
 */
export class I18nModule extends ContainerService {
  constructor() {
    super()
    this.allAdd([[FileService]])
  }
}
