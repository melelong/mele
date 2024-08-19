/**
 * 模块类型 [模块构造函数,模块依赖容器构造函数] | [模块构造函数]
 */
export type AddModule = [ModuleFnType, ContainerFnType] | [ModuleFnType]
/**
 * 模块构造函数类型
 */
export type ModuleFnType = {
  new (..._args: any[]): any
  moduleName: string
} & ThisType<any>
/**
 * 模块依赖容器构造函数类型
 */
export type ContainerFnType = ConstructorFnType
/**
 * 添加模块类型数组
 */
export type AddModuleArray = AddModule[]
/**
 * 容器服务实现接口
 */
export interface ContainerInterface {
  /**
   * 模块集合
   */
  readonly modules: Map<string, any>
  /**
   * 依赖列表
   */
  readonly dependencyList: string[]
  /**
   * 添加依赖
   * @param _key 依赖名
   * @param _moduleFn 模块构造函数
   * @param _containerFn 模块依赖容器构造函数
   */
  add<MT, CT>(
    _key: string,
    _moduleFn: new (..._args: any[]) => MT,
    _containerFn?: new (..._args: any[]) => CT
  ): void
  /**
   * 获取依赖
   * @param _key 依赖名
   * @returns
   */
  get(_key: string): any
  /**
   * 注入全部依赖(PS: 需要提前定义变量名(必须以构造函数名字的小写开头)，不然没有代码提示)
   * @example private readonly patchAction: PatchAction
   * @example private readonly 变量名: 构造函数
   * @param _module 模块实例
   */
  allInjection<MT>(_module: MT): void
  /**
   * 添加所有依赖
   * @param _addModuleList 添加依赖模块列表
   */
  allAdd(_addModuleList: AddModuleArray): void
}
