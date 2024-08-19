import { ConsoleInterface } from '@/types/interfaces/services/console.interface'
import { textSync, parseFont } from 'figlet'
import Banner3D from 'figlet/importable-fonts/Banner3-D.js'
import ora, { Options, Ora } from 'ora'
import chalk from 'chalk'
/**
 * 控制台服务具体实现
 */
export class ConsoleService implements ConsoleInterface {
  static moduleName: string = 'ConsoleService'
  /**
   * 背景字命令白名单
   */
  private static _BG_WhiteList: string[] = ['-h', '--help', 'help', 'h']
  paintBG(_str: string) {
    // 不在白名单中
    if (!this.isInWhitelist(ConsoleService._BG_WhiteList)) return
    parseFont('Banner3-D', Banner3D)
    const BG = textSync(_str, {
      font: 'Banner3-D',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    })
    console.log(`\r\n${chalk.green(BG)}`)
  }
  addBGWhiteList(_opts: string[]): void {
    ConsoleService._BG_WhiteList = [...ConsoleService._BG_WhiteList, ..._opts]
  }
  isInWhitelist(_whiteList: string[]): boolean {
    return process.argv.length === 2 || _whiteList.includes(process.argv[2])
  }
  ora(_options?: string | Options): Ora {
    return _options ? ora(_options) : ora()
  }
  log(_text: string): void {
    console.log(chalk.gray(_text))
  }
  error(_text: string, _ora?: ora.Ora): void {
    _ora ? _ora.fail(_text) : this.ora().fail(_text)
    process.exit(1)
  }

  warn(_text: string, _ora?: ora.Ora): void {
    _ora ? _ora.warn(_text) : this.ora().warn(_text)
  }
  info(_text: string, _ora?: ora.Ora): void {
    _ora ? _ora.info(_text) : this.ora().info(_text)
  }
  succeed(_text: string, _ora?: ora.Ora): void {
    _ora ? _ora.succeed(_text) : this.ora().succeed(_text)
  }
}
