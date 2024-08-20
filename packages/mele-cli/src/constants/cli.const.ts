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
 * 配置目录路径
 */
export const CLI_CONFIG_DIR_PATH = join(__dirname, '../configs')
/**
 * 配置格式目录路径
 */
export const CLI_SCHEMAS_DIR_PATH = join(CLI_CONFIG_DIR_PATH, '/schemas')
/**
 * 脚手架配置文件格式验证文件路径
 */
export const CLI_CONFIG_SCHEMA_PATH = join(CLI_SCHEMAS_DIR_PATH, '/cli.config.schema.json')
/**
 * patch命令配置文件格式验证文件路径
 */
export const CLI_PTACH_CONFIG_SCHEMA_PATH = join(CLI_SCHEMAS_DIR_PATH, '/patch.config.schema.json')
/**
 * 依赖版本映射文件格式验证文件路径
 */
export const CLI_DEPENDENCY_V_SCHEMA_PATH = join(CLI_SCHEMAS_DIR_PATH, '/dependency.v.schema.json')
/**
 * 脚手架配置文件路径
 */
export const CLI_CONFIG_PATH = join(CLI_CONFIG_DIR_PATH, '/cli.config.json')
/**
 * 补丁配置文件路径
 */
export const CLI_PATCH_CONFIG_PATH = join(CLI_CONFIG_DIR_PATH, '/patch.config.json')
/**
 * 依赖版本映射文件目录路径
 */
export const CLI_DEPENDENCY_V_PATH = join(CLI_CONFIG_DIR_PATH, '/dependency')
/**
 * 背景文字
 */
export const CLI_BG_STR = 'MELE-CLI'
/**
 * 脚手架最低支持的node版本
 */
export const CLI_NODE_V = '12.22.12'
