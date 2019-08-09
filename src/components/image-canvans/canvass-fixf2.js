
import F2 from '@antv/f2'
import Taro from '@tarojs/taro'

export default function fixF2 (): any {
    if( ( !F2 ) || F2.TaroFixed){return F2}
    if (process.env.TARO_ENV !== 'h5') {
      function strLen(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
            len++;
          } else {
            len += 2;
          }
        }
        return len;
      }
      F2.Util.measureText = function(text, font, ctx) {
        if (!ctx) {
          let fontSize = 12;
          if (font) {
            fontSize = parseInt(font.split(' ')[3], 10);
          }
          fontSize /= 2;
          return {
            width: strLen(text) * fontSize
          };
        }
        ctx.font = font || '12px sans-serif';
        return ctx.measureText(text);
      };
      F2.Util.addEventListener = function (source, type, listener) {
        source.addListener(type, listener);
      };
      F2.Util.getStyle = function (el, property) {
        return el.currentStyle ? el.currentStyle[property] : undefined;
      };
      F2.Util.removeEventListener = function (source, type, listener) {
        source.removeListener(type, listener);
      };
      F2.Util.createEvent = function (event, chart) {
        const type = event.type;
        let x = 0;
        let y = 0;
        const touches = event.touches;
        if (touches && touches.length > 0) {
          x = touches[0].x;
          y = touches[0].y;
        }
        return {
          type,
          chart,
          x,
          y
        };
      };
      if(Taro && Taro.getSystemInfoSync){
        const systeamInfo = Taro.getSystemInfoSync();
        if(systeamInfo && systeamInfo.pixelRatio) {
          F2.Global.pixelRatio = systeamInfo.pixelRatio
        }
      }
    } else {
      F2.Global.pixelRatio = window.devicePixelRatio
    }
    F2.TaroFixed = true;
    return F2
  }