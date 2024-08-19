import { ActionModule } from '@/modules/action.module'
import { CmdService } from '@/services/cmd.service'
import { ConfigService } from '@/services/config.service'
import { ConsoleService } from '@/services/console.service'
import { I18nService } from '@/services/i18n.service'
import { ActionInterface } from '@/types/interfaces/actions/action.interface'
import { ConditionInfoType } from '@/types/interfaces/services/file.interface'
import { PatchInterface, PatchNodeChoicesType } from '@/types/interfaces/actions/patch.interface'
import { execSync } from 'child_process'
import inquirer from 'inquirer'
import { Ora } from 'ora'
/**
 * patch 命令具体实现(中间容器 ActionModule )
 */
export class PatchAction implements ActionInterface, PatchInterface {
  static moduleName: string = 'PatchAction'
  readonly name: string = 'patch'
  readonly alias: string[] = ['p', 'pc']
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
  get QPatchNodeChoices(): PatchNodeChoicesType[] {
    return this.configService.patchConfig.patch
      .map((itme) => ({
        name: itme.nodeName,
        value: itme.dependency
      }))
      .filter(({ name }) => !this.configService.allDependencies[name])
  }
  async QPatchNode(_choices: PatchNodeChoicesType[]): Promise<DependencyType[]> {
    const { t } = this.i18nService
    const { dependency } = await inquirer.prompt({
      type: 'checkbox',
      name: 'dependency',
      message: t('A_P_Q1', 'cyan'),
      choices: _choices,
      validate: (answer) => {
        if (answer.length === 0) return t('MELE_CHECKBOX_ONE', 'red')
        return true
      }
    })
    const patchNode = dependency.flat(+Infinity) as DependencyType[]
    // 看看补丁深层依赖是否存在
    return patchNode.filter(({ dep }) => {
      // 没有深层依赖
      if (dep.length === 0) return true
      // 有深层依赖
      return (
        dep
          .map(
            (item) =>
              patchNode.map((item) => item.name).includes(item) ||
              this.configService.allDependencies[item]
          )
          .filter((item) => item).length === dep.length
      )
    })
  }
  async QPackageManager(): Promise<[string, string]> {
    const {
      packageManager: [name, install]
    } = await inquirer.prompt({
      type: 'list',
      name: 'packageManager',
      message: this.i18nService.t('MELE_PACKAGE_MANAGER', 'cyan'),
      choices: this.configService.cliConfig.packageManager.map((item) => ({
        name: item.name,
        value: [item.name, item.cmd.installD]
      }))
    })
    return [name, install]
  }
  GVersionInfo(_patchNodeInfo: DependencyType[]): VersionType[] {
    const { nodeV } = this.configService
    return _patchNodeInfo
      .map((item) => {
        const v = this.configService.getDependencyVConfig(item.name).v
        if (v[nodeV]) return v[nodeV]
        const vv = Object.keys(v)
          .map((item) => +item)
          .sort((a, b) => b - a)
          .find((item) => nodeV >= item)
        return v[vv]
      })
      .map((item, index) => ({
        ...item,
        name: _patchNodeInfo[index]['name']
      }))
  }
  GInstallCMD(_baseInstallCMD: string, _dep: VersionType[]): string {
    return `${_baseInstallCMD} ${_dep.map(({ name, v }) => `${name}@${v}`).join(' ')}`
  }
  GInitCMD(_dep: VersionType[]): string[] {
    return _dep
      .filter((item) => !!item.init)
      .map((item) => item.init)
      .flat(+Infinity) as string[]
  }
  GPJPkg(_dep: VersionType[]): PackageJson {
    const projectPkg = this.configService.projectPkg
    _dep.forEach(({ pkgInject }) => {
      if (!pkgInject) return
      if (pkgInject?.scripts)
        projectPkg.scripts = {
          ...projectPkg.scripts,
          ...pkgInject?.scripts
        }
    })
    return projectPkg
  }
  GConfigFilesInfo(_dep: VersionType[]): ConfigFileType[] {
    return _dep
      .map((item) => item.configFile)
      .flat(+Infinity)
      .filter((item) => !!item) as ConfigFileType[]
  }
  GConfigFilesData(): ConditionInfoType {
    return this.configService.allDependencies
  }
  RPkgInject(_PJPkg: PackageJson, _ora: Ora): void {
    const { t } = this.i18nService
    _ora.start(`${t('A_P_INJECT_START', 'green')}\n`)
    this.configService.updateProjectPkg(_PJPkg)
    _ora.stop()
    _ora.succeed(t('A_P_INJECT_OK', 'green'))
  }
  RInstallCMD(_installCMD: string, _ora: Ora): void {
    const { t } = this.i18nService
    _ora.start(`${t('A_P_INSTALL_START', 'green')}\n`)
    execSync(_installCMD, { stdio: 'inherit' })
    _ora.stop()
    _ora.succeed(t('A_P_INSTALL_OK', 'green'))
  }
  RInitCMD(_initCMD: string[], _ora: Ora): void {
    const { t } = this.i18nService
    _ora.start(t('A_P_INIT_START', 'green'))
    _initCMD.forEach((item: string) => execSync(item, { stdio: 'inherit' }))
    _ora.stop()
    _ora.succeed(t('A_P_INIT_OK', 'green'))
  }
  RConfigFile(
    _configFilesInfo: ConfigFileType[],
    _configFilesData: ConditionInfoType,
    _ora: Ora
  ): void {
    if (_configFilesInfo.length === 0) return
    _ora.start(`${this.i18nService.t('A_P_G_CONFIG_FILE_START', 'green')}\n`)
    _configFilesInfo.forEach((item) => {
      this.configService.GConfigFile({
        configFile: item,
        data: _configFilesData
      })
    })
    _ora.stop()
    _ora.succeed(this.i18nService.t('A_P_G_CONFIG_FILE_OK', 'green'))
  }
  get commandInfo(): CommandInfo {
    const {
      name,
      alias,
      i18nService: { t },
      consoleService: { ora }
    } = this
    return {
      name,
      alias,
      desc: t('A_P_DESC', 'cyan'),
      action: async (_option) => {
        const spinner = ora()
        try {
          // 当前项目暂时没有可以补丁的内容
          if (this.QPatchNodeChoices.length === 0)
            return this.consoleService.error(t('A_P_NOT_FOUND', 'red'))
          // 收集信息开始
          const patchNodeInfo = await this.QPatchNode(this.QPatchNodeChoices)
          const [, baseInstallCMD] = await this.QPackageManager()
          // 执行
          const dep = this.GVersionInfo(patchNodeInfo)
          const installCMD = this.GInstallCMD(baseInstallCMD, dep)
          const initCMD = this.GInitCMD(dep)
          this.RInstallCMD(installCMD, spinner)
          const PJPkg = this.GPJPkg(dep)
          this.RPkgInject(PJPkg, spinner)
          this.RInitCMD(initCMD, spinner)
          const configFileInfo = this.GConfigFilesInfo(dep)
          const data = this.GConfigFilesData()
          this.RConfigFile(configFileInfo, data, spinner)
        } catch (e) {
          this.consoleService.log(e)
          this.consoleService.error(t('MELE_EXIT'))
        }
      }
    }
  }
}
