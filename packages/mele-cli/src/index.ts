#!/usr/bin/env node

import '@formatjs/intl-segmenter/polyfill'
import 'core-js'
import { NewAction } from '@/actions/new.action'
import { CLI_BG_STR, CLI_NODE_V } from '@/constants/cli.const'
import { MainModule } from '@/modules/main.module'
import { ConfigService } from '@/services/config.service'
import { CmdService } from '@/services/cmd.service'
import { PatchAction } from '@/actions/patch.action'
import { LanguageAction } from '@/actions/language.action'
import { ConsoleService } from '@/services/console.service'
import { GenerateAction } from '@/actions/generate.action'
import { BootStrapInterface } from '@/types/interfaces/bootStrap.interface'
import { InfoAction } from '@/actions/info.action'
import { ZipAction } from './actions/zip.action'
/**
 * 启动
 */
class BootStrap implements BootStrapInterface {
  private readonly configService: ConfigService
  private readonly cmdService: CmdService
  private readonly consoleService: ConsoleService
  private readonly languageAction: LanguageAction
  private readonly newAction: NewAction
  private readonly patchAction: PatchAction
  private readonly infoAction: InfoAction
  private readonly generateAction: GenerateAction
  private readonly zipAction: ZipAction
  constructor(_mainModule: ConstructorFnType) {
    this.check()
    const mainModule = new _mainModule()
    // 方法1: 一个一个注入
    // 注入服务依赖(PS: 注入提供名用自己实现的moduleName，别用构造函数的静态属性name，打包成低版本后构造函数的静态属性name，就没有了，会导致注入不了)
    // this.configService = mainModule.get(ConfigService.moduleName)
    // this.consoleService = mainModule.get(ConsoleService.moduleName)
    // this.cmdService = mainModule.get(CmdService.moduleName)
    // 注入命令动作依赖
    // this.languageAction = mainModule.get(LanguageAction.moduleName)
    // this.newAction = mainModule.get(newAction.moduleName)
    // this.patchAction = mainModule.get(PatchAction.moduleName)
    // 方法2: 注入全部依赖
    mainModule.allInjection(this)
    // 主命令初始化
    const { version } = this.configService.cliInfo
    this.cmdService.setVersion(version)
    this.cmdService.setHelp()
    this.infoAction.init()
    this.languageAction.init()
    this.newAction.init()
    this.patchAction.init()
    this.generateAction.init()
    this.zipAction.init()
    this.cmdService.register()
    this.consoleService.paintBG(CLI_BG_STR)
    this.cmdService.pare()
  }
  get res() {
    return CLI_NODE_V.split('.').map((item, index) => {
      return Number(item) <= Number(process.versions.node.split('.')[index])
    })
  }
  get isOk() {
    if (this.res[0]) return true
    if (!this.res[1] || !this.res[2]) return false
  }
  check() {
    if (!this.isOk) {
      console.error(`当前node版本过低，请升级到${CLI_NODE_V}或者以上版本`)
      process.exit(1)
    }
  }
}
new BootStrap(MainModule)
