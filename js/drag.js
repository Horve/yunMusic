define(function(require,exports){
    var $ = require('jquery');
    var dragHandle = function(dragObj,actObj,maxWidth,minWidth,maxHeight,minHeight,callbackObj){
        var disX = 0,disY = 0,disW = 0,disH = 0;
        dragObj.onmousedown = function(e){
            var e  = e || window.event;
            disX = e.clientX;
            disY = e.clientY;
            disW = actObj.offsetWidth;
            disH = actObj.offsetHeight;
            if(callbackObj.mdHandle){
                callbackObj.mdHandle();
            }
            document.onmousemove = function(e){
                var e = e || window.event;
                var w = require('commfun.js').commFun.range(e.clientX - disX + disW,maxWidth,minWidth);
                var h = require('commfun.js').commFun.range(e.clientY - disY + disH,maxHeight,minHeight);
                actObj.style.width = w + "px";
                actObj.style.height = h + "px";
                return false;
            };
            document.onmouseup = function(){                
                document.onmousemove = null;
                document.onmouseup = null;
                if(callbackObj.muHandle){
                    callbackObj.muHandle();
                }
            };
        };
    };
    exports.dragHandle = dragHandle;
});