/**
 * 依赖类型
 */
declare type DependencyType = {
  name: string
  dep?: string[]
}
/**
 * 补丁节点类型
 */
declare type PatchNodeType = {
  /**
   * 节点名称
   */
  nodeName: string
  /**
   * 可能依赖的模块
   */
  dependency: DependencyType[]
}
/**
 * 补丁配置(patch.config.json)
 */
declare type PatchConfig = {
  patch: PatchNodeType[]
}
