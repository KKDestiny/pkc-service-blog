/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
export default class APIError extends Error {
  public name: string;
  public status: number;
  public detail: string;
  public code: string;
  public isOperational: boolean;

  constructor(message = "Internal Server Error", status = 500, detail = "", isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.detail = detail;
    this.message = message;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}
