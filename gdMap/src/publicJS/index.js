// 用一个或多个其他对象来扩展一个对象，返回被扩展的对象。
import extend from './extend'
// 使用过滤函数过滤数组元素。
import grep from './grep'
// 测试对象是否为数组。
import isArray from './isArray'
// 测试对象是否为空。（包含空对象，空数组）
import isEmpty from './isEmpty'
// 测试对象是否是空对象（不包含任何属性）。
import isEmptyObject from './isEmptyObject'
// 测试对象是否为函数。
import isFunction from './isFunction'
// 测试对象是否是纯粹的对象（通过 "{}" 或者 "new Object" 创建的）。
import isPlainObject from './isPlainObject'
// 检测obj的数据类型。
import {type} from './type'
// 合并两个数组
import merge from './merge'
// 数组去重
import unique from './unique'
// 确定它的参数是否是一个数字。
import isNumeric from './isNumeric'
// 去掉字符串起始和结尾的空格。
import trim from './trim'
// 色段取值。
import GradientColor from './gradientColor'

export {
    extend,
    grep,
    isArray,
    isEmpty,
    isEmptyObject,
    isFunction,
    isPlainObject,
    type,
    merge,
    unique,
    isNumeric,
    trim,
    GradientColor
}
