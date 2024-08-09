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
 * lint-staged配置文件的模板路径
 */
export const LINT_STAGED_CONFIG_PATH = join(
  FILE_TEMPLATE_PATCH_PATH,
  'lint-staged/.lintstagedrc.json.ejs'
)
/**
 * 关于生成命令的模板路径
 */
export const FILE_TEMPLATE_GENERATE_PATH = join(FILE_TEMPLATE_PATH, 'generate')
