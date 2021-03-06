export class Utils {
    /**
    * 生成随机Id
    */
     public static getUuid() {
       let s:any = [];
       const hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
       for (let i = 0; i < 36; i++) {
         s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
       }
       s[14] = "4"
       s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
       s[8] = s[13] = s[18] = s[23] = "-"
       let uuid = s.join("")
       return uuid
     }
  
    /**
     * 防抖
     * @param {Function} func
     * @param {number} wait
     * @param {boolean} immediate
     * @return {*}
     */
     public static debounce(
      func: Function,
      wait: number,
      immediate: boolean = false
    ) {
      let timeout: any, args: any, context: any, timestamp: number, result: any
  
      const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp
  
        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
          timeout = setTimeout(later, wait - last)
        } else {
          timeout = null
          // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
          if (!immediate) {
            result = func.apply(context, args)
            if (!timeout) context = args = null
          }
        }
      }
      return  (...args: any) => {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
          result = func.apply(context, args)
          context = args = null
        }
        return result
      }
    }
 }
 