import { AddModuleArray, ContainerInterface } from '@/types/interfaces/services/container.interface'
/**
 * 容器服务具体实现(模块与依赖的中间容器)
 */
export class ContainerService implements ContainerInterface {
  static moduleName: string = 'ContainerService'
  readonly modules: Map<string, any> = new Map<string, any>()
  readonly dependencyList: string[] = []
  add<CT, MT>(
    _key: string,
    _moduleFn: new (..._args: any[]) => CT,
    _containerFn?: new (..._args: any[]) => MT
  ): void {
    _containerFn
      ? this.modules.set(_key, new _moduleFn(new _containerFn()))
      : this.modules.set(_key, new _moduleFn())
    // 添加到依赖列表
    this.dependencyList.push(_key)
  }
  get<T>(_key: string): T {
    const module = this.modules.get(_key)
    if (!module) throw new Error(`${_key}模块没找到`)
    return module
  }
  allInjection<MT>(_module: MT): void {
    this.dependencyList.forEach((moduleName: string) => {
      const _key = `${moduleName.charAt(0).toLocaleLowerCase()}${moduleName.slice(1)}`
      _module[_key] = this.get(moduleName)
    })
  }
  allAdd(_addModuleList: AddModuleArray): void {
    _addModuleList.forEach((module) => {
      module.length === 1
        ? this.add(module[0].moduleName, module[0])
        : this.add(module[0].moduleName, module[0], module[1])
    })
  }
}
