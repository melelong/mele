import { CmdService } from '@/services/cmd.service'
import { ContainerService } from '@/services/container.service'
import { UtilsService } from '@/services/utils.service'
/**
 * 命令模块中间容器
 */
export class CmdModule extends ContainerService {
  constructor() {
    super()
    // 添加服务
    this.add(CmdService.name, CmdService)
    this.add(UtilsService.name, UtilsService)
  }
}
