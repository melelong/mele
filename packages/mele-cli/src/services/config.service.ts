import { ConfigModule } from '@/modules/config.module'
import { ConfigInterface } from '@/types/interfaces/config.interface'
import { FileService } from '@/services/file.service'
import {
  CLI_CONFIG_PATH,
  CLI_DEPENDENCY_V_PATH,
  CLI_PACKAGE_JSON_PATH
} from '@/constants/cli.const'
import { join } from 'path'
import { I18nService } from '@/services/i18n.service'
import { ConsoleService } from '@/services/console.service'
import { DependentEnvInfoType } from '@/types/interfaces/file.interface'
/**
 * 配置服务具体实现(中间容器 ConfigModule)
 */
export class ConfigService implements ConfigInterface {
  static moduleName: string = 'ConfigService'
  private readonly fileService: FileService
  private readonly i18nService: I18nService
  private readonly consoleService: ConsoleService
  constructor(private readonly configModule?: ConfigModule) {
    if (configModule) {
      configModule.allInjection(this)
    }
  }
  get cliInfo(): PackageJson {
    try {
      return JSON.parse(this.fileService.readFile(CLI_PACKAGE_JSON_PATH)) as PackageJson
    } catch {
      const spinner = this.consoleService.ora()
      spinner.fail(this.i18nService.t('MSG_CLI_INFO_NOT_FOUND'))
      process.exit(1)
    }
  }
  get projectPkj(): PackageJson {
    try {
      const path = join(this.fileService.cwdPath, 'package.json')
      return JSON.parse(this.fileService.readFile(path)) as PackageJson
    } catch {
      const spinner = this.consoleService.ora()
      spinner.fail(this.i18nService.t('MSG_PJ_INFO_NOT_FOUND'))
      process.exit(1)
    }
  }
  get nodeVersion(): string {
    return process.versions.node
  }
  get nodeV(): number {
    return Number(process.versions.node.split('.')[0])
  }
  get prodDependencies(): Dependencies {
    return this.projectPkj.dependencies
  }
  get devDependencies(): Dependencies {
    return this.projectPkj.devDependencies
  }
  get dependentEnvInfo(): DependentEnvInfoType {
    const isTs = !!this.devDependencies['typescript'] || !!this.prodDependencies['typescript']
    const isEslint = !!this.devDependencies['eslint'] || !!this.prodDependencies['eslint']
    const isPrettier = !!this.devDependencies['prettier'] || !!this.prodDependencies['prettier']
    return {
      isTs,
      isEslint,
      isPrettier
    }
  }
  get cliConfig(): CliConfig {
    try {
      return JSON.parse(this.fileService.readFile(CLI_CONFIG_PATH)) as CliConfig
    } catch {
      const spinner = this.consoleService.ora()
      spinner.fail(this.i18nService.t('MSG_CLI_CONFIG_NOT_FOUND'))
      process.exit(1)
    }
  }
  get cliDependency(): DependencyV {
    try {
      return JSON.parse(this.fileService.readFile(CLI_DEPENDENCY_V_PATH)) as DependencyV
    } catch {
      const spinner = this.consoleService.ora()
      spinner.fail(this.i18nService.t('MSG_CLI_DEPENDENCY_V_NOT_FOUND'))
      process.exit(1)
    }
  }
  updateConfig(_config: CliConfig): void {
    this.fileService.writeFile(CLI_CONFIG_PATH, JSON.stringify(_config))
  }
}
