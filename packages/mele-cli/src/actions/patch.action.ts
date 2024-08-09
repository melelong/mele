import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConfigService } from '@/services/config.service'
import { ConsoleService } from '@/services/console.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/action.interface'
import { execSync } from 'child_process'
import inquirer from 'inquirer'
/**
 * patch 命令(中间容器 ActionModule )
 */
export class PatchAction implements ActionInterface {
  static moduleName: string = 'PatchAction'
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  private readonly configService: ConfigService
  private readonly consoleService: ConsoleService
  constructor(private readonly actionModule?: ActionModule) {
    if (actionModule) actionModule.allInjection(this)
  }
  init() {
    this.cmdService.addInfo(this.commandInfo)
  }
  get commandInfo(): CommandInfo {
    const config = this.configService.cliConfig
    return {
      name: 'patch',
      alias: ['p', 'pc'],
      desc: this.i18nService.t('CMD_PATCH_DESC'),
      action: async (_option) => {
        const spinner = this.consoleService.ora()
        try {
          // 收集信息
          // 补丁节点
          const questions1 = await inquirer.prompt({
            type: 'checkbox',
            name: 'dependency',
            message: this.i18nService.t('MSG_CMD_PATCH_1'),
            choices: config.patch.map((item) => ({
              name: item.nodeName,
              value: item.dependency
            })),
            validate: (answer) => {
              if (answer.length === 0) return this.i18nService.t('CMD_MELE_CHECKBOX_ONE')
              return true
            }
          })

          const dependency = questions1?.dependency.flat(+Infinity) as string[]
          // 包管理器
          const {
            packageManager: [name, install]
          } = await inquirer.prompt({
            type: 'list',
            name: 'packageManager',
            message: this.i18nService.t('CMD_MELE_PACKAGE_MANAGER'),
            choices: config.packageManager.map((item) => ({
              name: item.name,
              value: [item.name, item.cmd.install]
            }))
          })
          // 是否为Monorepo项目
          let isMonorepo: boolean
          if (name === 'pnpm') {
            const res = await inquirer.prompt({
              type: 'confirm',
              name: 'isMonorepo',
              default: false,
              message: this.i18nService.t('MSG_CMD_PATCH_2')
            })
            isMonorepo = res.isMonorepo
          }

          // 生成依赖版本
          const dep = dependency
            .map((item) => {
              const v = this.configService.cliDependency.dependency[item]
              if (v[this.configService.nodeV]) return v[this.configService.nodeV]
              const vv = Object.keys(v)
                .map((item) => +item)
                .sort((a, b) => b - a)
                .find((item) => this.configService.nodeV >= item)
              return v[vv]
            })
            .map((item, index) => ({
              ...item,
              name: dependency[index]
            }))
          // 安装命令
          const cmd = `${install} ${isMonorepo ? '-w' : ''} ${dep.map((item) => `${item.name}@${item.v}`).join(' ')}`
          console.log(cmd)
          // 执行安装命令
          spinner.start(this.i18nService.t('CMD_MELE_INSTALL_START'))
          execSync(cmd)
          spinner.stop()
          console.log(this.configService.dependentEnvInfo)
        } catch (e) {
          console.error(e)
          spinner.fail(this.i18nService.t('CMD_MELE_EXIT'))
        }
      }
    }
  }
}
