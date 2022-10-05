/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
export interface IAccount {
  /**
   * 姓名
   */
  name: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 是否激活
   */
  isActive: boolean;
  /**
   * 是否管理员
   */
  isAdmin: boolean;
}
