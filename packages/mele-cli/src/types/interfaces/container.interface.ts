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
  add<CT, MT>(
    _key: string,
    _moduleFn: new (..._args: any[]) => CT,
    _containerFn?: new (..._args: any[]) => MT
  ): void
  /**
   * 获取依赖
   * @param _key 依赖名
   * @returns
   */
  get(_key: string): any
  /**
   * 自动注入依赖(但是没有代码提示)
   * @param _module 模块实例
   */
  autoInjection<MT>(_module: MT): void
}
