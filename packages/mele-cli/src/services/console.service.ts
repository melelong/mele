import { ConsoleInterface } from '@/types/interfaces/console.interface'
import { textSync, parseFont } from 'figlet'
import Banner3D from 'figlet/importable-fonts/Banner3-D.js'
import ora, { Options, Ora } from 'ora'
/**
 * 控制台服务具体实现
 */
export class ConsoleService implements ConsoleInterface {
  static moduleName: string = 'ConsoleService'
  /**
   * 背景字命令白名单
   */
  private static _BG_WhiteList: string[] = ['-h', '--help']
  paintBG(_str: string) {
    if (!this.isInWhitelist(ConsoleService._BG_WhiteList)) return
    parseFont('Banner3-D', Banner3D)
    const BG = textSync(_str, {
      font: 'Banner3-D',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
    console.log(`\r\n${BG}`)
  }
  addBGWhiteList(_opts: string[]): void {
    ConsoleService._BG_WhiteList = [...ConsoleService._BG_WhiteList, ..._opts]
  }
  isInWhitelist(_whiteList: string[]): boolean {
    console.log(process.argv)
    return process.argv.filter((item) => _whiteList.includes(item)).length !== 0
  }
  ora(_options?: string | Options): Ora {
    return _options ? ora(_options) : ora()
  }
}
