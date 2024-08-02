import { Command, ParseOptions } from 'commander'
import { CLI_DEFAULT_VERSION } from '@/constants/cli.const'
import { CmdInterface } from '@/types/interfaces/cmd.interface'
import { CMD_DEFAULT_NAME } from '@/constants/cmd.const'
/**
 * 命令服务具体实现
 */
export class CmdService implements CmdInterface {
  static cmd: Command = new Command(CMD_DEFAULT_NAME)
  static commandInfos: CommandInfo[] = []
  create(_name?: string): Command {
    return new Command(_name || CMD_DEFAULT_NAME)
  }
  setVersion(_version: string): void {
    CmdService.cmd.version(_version || CLI_DEFAULT_VERSION)
  }
  register(): Command {
    CmdService.commandInfos.forEach((_commandInfo) => {
      const { name, description, alias, action } = _commandInfo
      CmdService.cmd
        .command(name)
        .alias(alias)
        .description(description)
        .action((_option) => {
          action(_option)
        })
    })
    return CmdService.cmd
  }
  pare(_argv?: readonly string[], _parseOptions?: ParseOptions): void {
    const defaultArgv = process.argv
    _parseOptions
      ? CmdService.cmd.parse(_argv || defaultArgv, _parseOptions)
      : CmdService.cmd.parse(_argv || defaultArgv)
  }
}
