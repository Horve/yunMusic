define(function(require,exports){
    var commFun = (function(c){
        //格式化 时间
        function formatePlayTime(secNum){
            var mins = parseInt(parseInt(secNum)/60);
            var secs = parseInt(secNum)%60;
            return {m:mins,s:secs};
        }
        //范围约定
        function range(iNum,iMax,iMin){
            if(iNum > iMax){
                return iMax;
            }else if(iNum < iMin){
                return iMin;
            }else{
                return iNum;
            }
        }
        c = {
            formatTime : formatePlayTime,
            range : range
        }
        return c;
    })(commFun);
    exports.commFun = commFun;
});