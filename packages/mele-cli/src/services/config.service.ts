import { ConfigModule } from '@/modules/config.module'
import { ConfigInterface, GConfigFileOptions } from '@/types/interfaces/services/config.interface'
import { FileService } from '@/services/file.service'
import {
  CLI_CONFIG_PATH,
  CLI_CONFIG_SCHEMA_PATH,
  CLI_DEPENDENCY_V_PATH,
  CLI_DEPENDENCY_V_SCHEMA_PATH,
  CLI_PACKAGE_JSON_PATH,
  CLI_PATCH_CONFIG_PATH,
  CLI_PTACH_CONFIG_SCHEMA_PATH
} from '@/constants/cli.const'
import { join } from 'path'
import { I18nService } from '@/services/i18n.service'
import { ConsoleService } from '@/services/console.service'
import { FILE_CWD_PATH, FILE_TEMPLATE_PATH } from '@/constants/file.const'
import Ajv from 'ajv'
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
      this.consoleService.log(CLI_PACKAGE_JSON_PATH)
      this.consoleService.error(this.i18nService.t('S_CF_CLI_INFO_NOT_FOUND', 'red'))
    }
  }
  get projectPkg(): PackageJson {
    try {
      return JSON.parse(this.fileService.readFile(this.projectPkgPath)) as PackageJson
    } catch {
      this.consoleService.log(this.projectPkgPath)
      this.consoleService.error(this.i18nService.t('S_CF_PJ_INFO_NOT_FOUND', 'red'))
    }
  }
  get projectPkgPath(): string {
    return join(FILE_CWD_PATH, 'package.json')
  }
  get nodeVersion(): string {
    return process.versions.node
  }
  get nodeV(): number {
    return Number(process.versions.node.split('.')[0])
  }
  get prodDependencies(): Dependencies {
    return this.projectPkg.dependencies
  }
  get devDependencies(): Dependencies {
    return this.projectPkg.devDependencies
  }
  get allDependencies(): Dependencies {
    return {
      ...this.devDependencies,
      ...this.prodDependencies
    }
  }
  get cliConfig(): CliConfig {
    try {
      const data = JSON.parse(this.fileService.readFile(CLI_CONFIG_PATH)) as CliConfig
      this.validateCliConfig(data)
      return data
    } catch {
      this.consoleService.log(CLI_CONFIG_PATH)
      this.consoleService.error(this.i18nService.t('S_CF_CLI_CONFIG_NOT_FOUND', 'red'))
    }
  }
  get patchConfig(): PatchConfig {
    try {
      const data = JSON.parse(this.fileService.readFile(CLI_PATCH_CONFIG_PATH)) as PatchConfig
      this.validatePatchConfig(data)
      return data
    } catch {
      this.consoleService.log(CLI_PATCH_CONFIG_PATH)
      this.consoleService.error(this.i18nService.t('S_CF_PATCH_CONFIG_NOT_FOUND', 'red'))
    }
  }
  getDependencyVConfig(_name: string): DependencyVInfoType {
    const path = join(CLI_DEPENDENCY_V_PATH, `${_name}.v.json`)
    try {
      const data = JSON.parse(this.fileService.readFile(path)) as DependencyVInfoType
      this.validateDependencyVConfig(data)
      return data
    } catch {
      this.consoleService.log(path)
      this.consoleService.error(this.i18nService.t('S_CF_DEPENDENCY_V_NOT_FOUND', 'red'))
    }
  }
  updateConfig(_config: CliConfig): void {
    this.fileService.writeFile(CLI_CONFIG_PATH, JSON.stringify(_config))
  }
  updateProjectPkg(_config: PackageJson): void {
    this.fileService.writeFile(this.projectPkgPath, JSON.stringify(_config))
  }
  GConfigFile(_options: GConfigFileOptions): void {
    const {
      configFile: { templates, output, name, type },
      data
    } = _options
    const path = `${output}/${name}${type && `.${type}`}`
    const inputPath = join(FILE_TEMPLATE_PATH, templates[0])
    const outputPath = join(FILE_CWD_PATH, path)
    this.fileService.dynamicWriteFile(inputPath, outputPath, data)
    this.consoleService.succeed(`${path} ${this.i18nService.t('S_CF_G_CONFIG_OK', 'green')}`)
  }
  getJsonValidate(_path: string) {
    try {
      const ajv = new Ajv()
      const schema = JSON.parse(this.fileService.readFile(_path))
      return ajv.compile(schema)
    } catch {
      this.consoleService.log(_path)
      this.consoleService.error(this.i18nService.t('S_CF_JSON_VALIDATE_NOT_FOUND', 'red'))
    }
  }
  validateCliConfig(_data: CliConfig): void {
    const validate = this.getJsonValidate(CLI_CONFIG_SCHEMA_PATH)
    if (!validate(_data))
      this.consoleService.error(this.i18nService.t('S_CF_VALIDATE_CLI_CONFIG_ERROR', 'red'))
  }
  validateDependencyVConfig(_data: DependencyVInfoType): void {
    const validate = this.getJsonValidate(CLI_DEPENDENCY_V_SCHEMA_PATH)
    if (!validate(_data))
      this.consoleService.error(this.i18nService.t('S_CF_VALIDATE_DEPENDENCY_V_ERROR', 'red'))
  }
  validatePatchConfig(_data: PatchConfig): void {
    const validate = this.getJsonValidate(CLI_PTACH_CONFIG_SCHEMA_PATH)
    if (!validate(_data))
      this.consoleService.error(this.i18nService.t('S_CF_VALIDATE_PATCH_CONFIG_ERROR', 'red'))
  }
}
