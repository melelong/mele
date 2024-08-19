import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
import { join } from 'path'
// import sharp from 'sharp'
/**
 * zip 命令具体实现(中间容器 ActionModule )
 */
export class ZipAction implements ActionInterface {
  static moduleName: string = 'ZipAction'
  readonly name: string = 'zip'
  readonly alias: string[] = ['z']
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  constructor(private readonly actionModule?: ActionModule) {
    if (actionModule) actionModule.allInjection(this)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    const {
      name,
      alias,
      i18nService: { t }
    } = this
    return {
      name,
      alias,
      desc: t('A_Z_DESC', 'cyan') + t('(开发中...)', 'yellow'),
      action: async (_option) => {
        try {
          // const inputPath = join(process.cwd(), 'mountains_2.jpg')
          const outputPath = join(process.cwd(), 'mountains_zip.jpg')
          // sharp(inputPath)
          //   .jpeg({
          //     quality: 70
          //   })
          //   .toFile(outputPath)
          console.log('图片压缩完成:', outputPath)
          console.log(_option)
        } catch (e) {
          console.error('图片压缩出错:', e)
        }
      }
    }
  }
}
