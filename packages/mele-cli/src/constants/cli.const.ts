import { join } from 'path'

/**
 * 读取文件编码类型
 */
export const CLI_ENCODING_TYPE = 'utf-8' as unknown as EncodingType
/**
 * package.json路径
 */
export const CLI_PACKAGE_JSON_PATH = join(__dirname, '../package.json')
/**
 * 默认版本号
 */
export const CLI_DEFAULT_VERSION = '未知版本号'
/**
 * 配置文件路径
 */
export const CLI_CONFIG_PATH = join(__dirname, '/config/cli.config.json')
/**
 * 依赖版本映射文件路径
 */
export const CLI_DEPENDENCY_V_PATH = join(__dirname, '/config/dependency.v.json')
/**
 * 背景文字
 */
export const CLI_BG_STR = 'MELE-CLI'
/**
 * 脚手架最低支持的node版本
 */
export const CLI_NODE_V = '12.22.12'
