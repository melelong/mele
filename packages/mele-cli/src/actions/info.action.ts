import {
  CLI_CONFIG_PATH,
  CLI_CONFIG_SCHEMA_PATH,
  CLI_DEPENDENCY_V_PATH,
  CLI_DEPENDENCY_V_SCHEMA_PATH,
  CLI_PATCH_CONFIG_PATH,
  CLI_PTACH_CONFIG_SCHEMA_PATH
} from '@/constants/cli.const'
import { FILE_SCRIPT_DIR_PATH, FILE_TEMPLATE_PATCH_PATH } from '@/constants/file.const'
import { I18N_DIR_PATH } from '@/constants/i18n.const'
import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConsoleService } from '@/services/console.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
/**
 * info 命令具体实现(中间容器 ActionModule )
 */
export class InfoAction implements ActionInterface {
  static moduleName: string = 'InfoAction'
  readonly name: string = 'info'
  readonly alias: string[] = ['i']
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  private readonly consoleService: ConsoleService
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
      desc: t('A_I_DESC', 'cyan'),
      action: () => {
        // 关于脚手架
        this.consoleService.info(`${t('A_I_A_CLI', 'bgCyan')}`)
        this.consoleService.info(`${t('A_I_NODE_V', 'cyan')}: ${process.version}`)
        this.consoleService.info(`${t('A_I_SCRIPT_DIR_PATH', 'cyan')}: ${FILE_SCRIPT_DIR_PATH}`)
        this.consoleService.info(`${t('A_I_CLI_CONFIG_PATH', 'cyan')}: ${CLI_CONFIG_PATH}`)
        this.consoleService.info(
          `${t('A_I_CLI_CONFIG_SCHEMA_PATH', 'cyan')}: ${CLI_CONFIG_SCHEMA_PATH}`
        )
        this.consoleService.info(`${t('A_I_DEPENDENCY_V_PATH', 'cyan')}: ${CLI_DEPENDENCY_V_PATH}`)
        this.consoleService.info(
          `${t('A_I_DEPENDENCY_V_SCHEMA_PATH', 'cyan')}: ${CLI_DEPENDENCY_V_SCHEMA_PATH}`
        )
        // 关于language命令
        this.consoleService.info(`${t('A_I_A_LANGUAGE', 'bgCyan')}`)
        this.consoleService.info(`${t('A_I_LANGUAGE_I18N', 'cyan')}: ${I18N_DIR_PATH}`)
        // 关于new命令
        this.consoleService.info(`${t('A_I_A_NEW', 'bgCyan')}`)
        this.consoleService.warn(`${t('开发中...', 'yellow')}`)
        // 关于patch命令
        this.consoleService.info(`${t('A_I_A_PATCH', 'bgCyan')}`)
        this.consoleService.info(`${t('A_I_PTACH_CONFIG_PATH', 'cyan')}: ${CLI_PATCH_CONFIG_PATH}`)
        this.consoleService.info(
          `${t('A_I_PTACH_CONFIG_SCHEMA_PATH', 'cyan')}: ${CLI_PTACH_CONFIG_SCHEMA_PATH}`
        )
        this.consoleService.info(
          `${t('A_I_FILE_TEMPLATE_PATCH_PATH', 'cyan')}: ${FILE_TEMPLATE_PATCH_PATH}`
        )
        // 关于generate命令
        this.consoleService.info(`${t('A_I_A_GENERATE', 'bgCyan')}`)
        this.consoleService.warn(`${t('开发中...', 'yellow')}`)
        // 关于zip命令
        this.consoleService.info(`${t('A_I_A_ZIP', 'bgCyan')}`)
        this.consoleService.warn(`${t('开发中...', 'yellow')}`)
      }
    }
  }
}
