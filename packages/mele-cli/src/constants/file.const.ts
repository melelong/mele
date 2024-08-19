import { join } from 'path'
/**
 * 模板路径
 */
export const FILE_TEMPLATE_PATH = join(__dirname, 'templates')
/**
 * 关于补丁命令的模板路径
 */
export const FILE_TEMPLATE_PATCH_PATH = join(FILE_TEMPLATE_PATH, 'patch')
/**
 * 关于生成命令的模板路径
 */
export const FILE_TEMPLATE_GENERATE_PATH = join(FILE_TEMPLATE_PATH, 'generate')
/**
 * 当前运行命令的目录
 */
export const FILE_CWD_PATH = process.cwd()
/**
 * 当前运行命令脚本文件所在的目录
 */
export const FILE_SCRIPT_DIR_PATH = __dirname
/**
 * 当前运行命令脚本文件路径
 */
export const FILE_SCRIPT_FILE_PATH = __filename
