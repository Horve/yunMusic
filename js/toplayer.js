define(function(require,exports){
    var $ = require('jquery');
    var commjs = require('commfun.js').commFun;
    var ttime = $('.ttime'),
        ptime = $('.ptime');
    //songInfo {songId:"",songName:"",songUrl:""}
    //格式化播放时间
    function formatePlayTime(secNum){
        var mins = parseInt(parseInt(secNum)/60);
        var secs = parseInt(secNum)%60;
        return {m:mins,s:secs};
    }
    //获取播放时间
    function getMusicTime(playerObj){ 
        return playerObj[0].duration;
    }
    var toplayer = function(songInfo,playerObj,isKeepState){
        $('.song-name').html(songInfo.songName);        
        $(playerObj).attr('src',songInfo.songUrl);
        var adObj = new Audio();
        adObj.src = songInfo.songUrl;
        adObj.addEventListener('canplay',function(){
            while(playerObj[0].duration){
                canPlayDo(playerObj,isKeepState);
                break;
            }
        },false);
    }
    function canPlayDo(playerObj,isKeepState){
        var ttimeObj = commjs.formatTime(getMusicTime(playerObj) || 0);
        var ttimeStr = (ttimeObj.m < 10 ? "0" + ttimeObj.m : ttimeObj.m) + ":" + (ttimeObj.s < 10 ? "0" + ttimeObj.s : ttimeObj.s);
        ttime.html(ttimeStr);
        require('playControl.js').init(playerObj,getMusicTime(playerObj),isKeepState);
    } 
    exports.toplayer = toplayer;
});