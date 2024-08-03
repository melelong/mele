import { ContainerService } from '@/services/container.service'
import { FileService } from '@/services/file.service'
/**
 * i18n服务模块依赖容器
 */
export class I18nModule extends ContainerService {
  constructor() {
    super()
    // 添加服务依赖
    this.add(FileService.moduleName, FileService)
    // console.log('I18nModule', this.dependencyList)
  }
}
