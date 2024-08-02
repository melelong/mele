#!/usr/bin/env node

import { CreateAction } from '@/actions/create.action'
import { CLI_PACKAGE_JSON_PATH } from '@/constants/cli.const'
import { MainModule } from '@/modules/main.module'
import { UtilsService } from '@/services/utils.service'
import { CmdService } from '@/services/cmd.service'
import { PatchAction } from '@/actions/patch.action'
import { CliInterface } from '@/types/interfaces/cli.interface'
import { I18nService } from '@/services/i18n.service'
import { LanguageAction } from '@/actions/language.action'
/**
 * 脚手架启动
 */
class MeleCli implements CliInterface {
  private readonly utilsService: UtilsService
  private readonly cmdService: CmdService
  private readonly i18nService: I18nService
  private readonly createAction: CreateAction
  private readonly languageAction: LanguageAction
  private readonly patchAction: PatchAction
  constructor(private readonly mainModule: MainModule) {
    // 注入服务
    this.utilsService = mainModule.get(UtilsService.name)
    this.cmdService = mainModule.get(CmdService.name)
    this.i18nService = mainModule.get(I18nService.name)
    // 注入命令动作
    this.createAction = mainModule.get(CreateAction.name)
    this.languageAction = mainModule.get(LanguageAction.name)
    this.patchAction = mainModule.get(PatchAction.name)
    this.i18nService.init()
    // 脚手架信息
    const { version } = this.cliInfo
    // 命令实例
    const cli = CmdService.cmd
    // 设置命令版本号
    this.cmdService.setVersion(version)
    // 设置命令描述
    cli.description(I18nService.i18n.__('mele_desc'))
    // 初始化命令动作
    this.createAction.init()
    this.languageAction.init()
    this.patchAction.init()
    // 注册命令
    this.cmdService.register()
    // 解析命令参数
    this.cmdService.pare()
  }

  get cliInfo() {
    return JSON.parse(this.utilsService.readFile(CLI_PACKAGE_JSON_PATH)) as PackageJson
  }
}
new MeleCli(new MainModule())
