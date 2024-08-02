/**
 * 容器服务实现接口
 */
export interface ContainerInterface {
  /**
   * 模块集合
   */
  readonly modules: Map<string, any>
  /**
   * 添加模块
   * @param _key 模块类名
   * @param _constructor 外部模块构造函数
   * @param _module 内部模块构造函数
   */
  add<CT, MT>(
    _key: string,
    _constructor: new (..._args: any[]) => CT,
    _module?: new (..._args: any[]) => MT
  ): void
  /**
   * 获取模块
   * @param _key 模块类名
   * @returns
   */
  get(_key: string): any
  /**
   * 删除模块
   * @param _key 模块类名
   */
  delete(_key: string): void
  /**
   * 遍历
   * @param _callbackfn 回调函数,同Map.forEach
   */
  forEach(_callbackfn: (_value: any, _key: string, _map: Map<string, any>) => void): void
}
