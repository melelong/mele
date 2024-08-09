import { Command, ParseOptions } from 'commander'
import { CLI_DEFAULT_VERSION } from '@/constants/cli.const'
import { CmdInterface } from '@/types/interfaces/cmd.interface'
import { CMD_DEFAULT_NAME } from '@/constants/cmd.const'
import { I18nService } from '@/services/i18n.service'
import { CmdModule } from '@/modules/cmd.module'
import { ConsoleService } from '@/services/console.service'
/**
 * 命令服务具体实现(中间容器 CmdModule )
 */
export class CmdService implements CmdInterface {
  static moduleName: string = 'CmdService'
  /**
   * 主命令
   */
  private static _cmd: Command = new Command(CMD_DEFAULT_NAME)
  /**
   * 命令信息列表
   */
  private static _commandInfos: CommandInfo[] = []
  /**
   * 子命令列表
   */
  private static _commandList: Command[] = []
  private readonly i18nService: I18nService
  private readonly consoleService: ConsoleService
  constructor(private readonly cmdModule?: CmdModule) {
    if (cmdModule) {
      cmdModule.allInjection(this)
      // 设置命令用法信息
      CmdService._cmd.usage(`${this.i18nService.t('CMD_MELE_USAGE')}`)
      // 设置命令描述
      CmdService._cmd.description(this.i18nService.t('CMD_MELE_DESC'))
    }
  }
  get cmd(): Command {
    return CmdService._cmd
  }
  addInfo(_info: CommandInfo): void {
    CmdService._commandInfos.push(_info)
  }
  create(_name?: string): Command {
    return new Command(_name || CMD_DEFAULT_NAME)
  }
  setVersion(_version: string): void {
    const _opts = '-v, --version'
    CmdService._cmd.version(
      `v${_version || CLI_DEFAULT_VERSION}`,
      _opts,
      this.i18nService.t('CMD_VERSION_DESC')
    )
    // 加入背景字命令白名单
    // this.consoleService.addBGWhiteList(_opts.split(', '))
  }
  register(): Command {
    CmdService._commandInfos.forEach((_commandInfo) => {
      const { name, alias, options, desc, action } = _commandInfo
      // 子命令
      let sub_cmd = new Command(name)
      if (alias) sub_cmd = sub_cmd.aliases(alias)
      if (options) options.forEach((item) => (sub_cmd = sub_cmd.option(item.option, item.desc)))
      sub_cmd.description(desc).action(async (_option) => {
        await action(_option)
      })
      // 添加子命令列表
      CmdService._commandList.push(sub_cmd)
      // 添加子命令到主命令上
      CmdService._cmd.addCommand(sub_cmd, {})
    })
    return CmdService._cmd
  }
  pare(_argv?: readonly string[], _parseOptions?: ParseOptions): void {
    const defaultArgv = process.argv
    _parseOptions
      ? CmdService._cmd.parse(_argv || defaultArgv, _parseOptions)
      : CmdService._cmd.parse(_argv || defaultArgv)
  }
}
