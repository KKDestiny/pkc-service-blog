/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
export interface repoOptions {
  /**
   * 筛选查询条件
   */
  criteria?: Object;
  /**
   * 分页
   */
  page?: number;
  /**
   * 限制数量
   */
  limit?: number;
  /**
   * 筛选查询结果
   */
  select?: string;
}
