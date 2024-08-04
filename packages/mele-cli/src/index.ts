#!/usr/bin/env node

import '@formatjs/intl-segmenter/polyfill'
import 'core-js'
import { CreateAction } from '@/actions/create.action'
import { CLI_BG_STR, CLI_PACKAGE_JSON_PATH } from '@/constants/cli.const'
import { MainModule } from '@/modules/main.module'
import { FileService } from '@/services/file.service'
import { CmdService } from '@/services/cmd.service'
import { PatchAction } from '@/actions/patch.action'
import { CliInterface } from '@/types/interfaces/cli.interface'
import { LanguageAction } from '@/actions/language.action'
import { ConsoleService } from '@/services/console.service'
import { GenerateAction } from '@/actions/generate.action'
console.log(process.versions.node.split('.')[0])
/**
 * 脚手架
 */
class MeleCli implements CliInterface {
  private readonly fileService: FileService
  private readonly cmdService: CmdService
  private readonly consoleService: ConsoleService
  private readonly languageAction: LanguageAction
  private readonly createAction: CreateAction
  private readonly patchAction: PatchAction
  private readonly generateAction: GenerateAction
  constructor(private readonly mainModule?: MainModule) {
    // 方法1: 一个一个注入
    // 注入服务依赖(PS: 注入提供名用自己实现的moduleName，别用构造函数的静态属性name，打包成低版本后构造函数的静态属性name，就没有了，会导致注入不了)
    // this.fileService = mainModule.get(FileService.moduleName)
    // this.consoleService = mainModule.get(ConsoleService.moduleName)
    // this.cmdService = mainModule.get(CmdService.moduleName)
    // 注入命令动作依赖
    // this.languageAction = mainModule.get(LanguageAction.moduleName)
    // this.createAction = mainModule.get(CreateAction.moduleName)
    // this.patchAction = mainModule.get(PatchAction.moduleName)
    // 方法2: 注入全部依赖
    mainModule.allInjection(this)
    // 主命令初始化
    const { version } = this.cliInfo
    this.cmdService.setVersion(version)
    this.languageAction.init()
    this.createAction.init()
    this.patchAction.init()
    this.generateAction.init()
    this.cmdService.register()
    this.consoleService.paintBG(CLI_BG_STR)
    this.cmdService.pare()
  }
  get cliInfo() {
    return JSON.parse(this.fileService.readFile(CLI_PACKAGE_JSON_PATH)) as PackageJson
  }
}
new MeleCli(new MainModule())
