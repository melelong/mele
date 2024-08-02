import { ContainerInterface } from '@/types/interfaces/container.interface'

/**
 * 中间容器具体实现
 */
export class ContainerService implements ContainerInterface {
  readonly modules: Map<string, any> = new Map<string, any>()
  add<CT, MT>(
    _key: string,
    _constructor: new (..._args: any[]) => CT,
    _module?: new (..._args: any[]) => MT
  ): void {
    !_module
      ? this.modules.set(_key, new _constructor())
      : this.modules.set(_key, new _constructor(new _module()))
  }
  get<T>(_key: string): T {
    const module = this.modules.get(_key)
    if (!module) throw new Error(`${_key}模块没找到`)
    return module
  }
  delete(_key: string): void {
    this.modules.delete(_key)
  }
  forEach(_callbackfn: (_value: any, _key: string, _map: Map<string, any>) => void): void {
    this.modules.forEach(_callbackfn)
  }
}
