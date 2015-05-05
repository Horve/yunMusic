define(function(require,exports){
    var $ = require('jquery');
    var commjs = require('commfun.js').commFun;
    var ctrl = {
        ply_btn : $('.play-bar .ply'),
        pre_btn : $('.play-bar .pre'),
        nxt_btn : $('.play-bar .nxt'),
        ply_min : $('.play-time .pmin'),
        ply_sec : $('.play-time .psec'),
        ply_bar : $('.play-bar .barcur'),
        bar_point : $('.play-bar .cur-point'),
        bar_bg : $('.play-bar .barbg')
    },
    playTimer = null,
    barTimer = null,
    barTotalWidth = ctrl.bar_bg.width(),
    totalPlayTime = 0,
    mplayerObj = null,
    curIdx = 0,
    slistLen = songInfo.length;
    //播放 暂停 keepState(boolean):初始化时是否保持播放状态
    function pauseOrplay(playerObj,totalTime,isKeepState){
        var plyState = ctrl.ply_btn.attr('ply-state');
        var kstate = isKeepState || false;
        if(!kstate){
            if(plyState == 'pause'){
                //启动播放           
                clearInterval(playTimer);  
                clearInterval(barTimer);           
                playerObj[0].play();
                ctrl.ply_btn.attr('ply-state','play').removeClass('css-pause').addClass('css-play');
                playTimer = setInterval(function(){
                    playedTime(playerObj,totalTime)
                },1000);            
                barTimer = setInterval(function(){
                    setPlayBar(playerObj,totalTime);
                },500);
            }else if(plyState == 'play'){
                //播放暂停            
                playerObj[0].pause();
                ctrl.ply_btn.attr('ply-state','pause').removeClass('css-play').addClass('css-pause');
                clearInterval(playTimer);
                clearInterval(barTimer);       
            }
        }else{
            if(plyState == 'play'){
                //启动播放           
                clearInterval(playTimer);  
                clearInterval(barTimer);           
                playerObj[0].play();
                ctrl.ply_btn.attr('ply-state','play').removeClass('css-pause').addClass('css-play');
                playTimer = setInterval(function(){
                    playedTime(playerObj,totalTime)
                },1000);            
                barTimer = setInterval(function(){
                    setPlayBar(playerObj,totalTime);
                },500);
            }
        }
    }
    //显示当前播放时间
    function playedTime(playerObj,totalTime,curPlayTime){
        var curPlayTime = curPlayTime || playerObj[0].currentTime;
        var pmins = commjs.formatTime(Math.round(curPlayTime)).m;
        var psecs = commjs.formatTime(Math.round(curPlayTime)).s;
        ctrl.ply_min.html(pmins < 10 ? "0" + pmins : pmins);
        ctrl.ply_sec.html(psecs < 10 ? "0" + psecs : psecs);
        if(playerObj[0].ended){
            clearInterval(playTimer);
            clearInterval(barTimer); 
            ctrl.ply_btn.attr('ply-state','pause').removeClass('css-play').addClass('css-pause');
        }
    }
    //设置播放进度条
    function setPlayBar(playerObj,totalTime){
        var curPlayTime = playerObj[0].currentTime;
        var barWidthPerc = (curPlayTime / totalTime).toFixed(2);
        ctrl.ply_bar.css('width',barWidthPerc * 100 + "%");
    }
    //播放相关按钮控制
    var playControl = function(playerObj,totalTime,isKeepState){
        pauseOrplay(playerObj,totalTime,isKeepState);
        ctrl.ply_btn.unbind().bind('click',function(){
            pauseOrplay(playerObj,totalTime);
        });
        ctrl.pre_btn.unbind().bind('click',function(){            
            curIdx--;
            if(curIdx < 0){
                curIdx = slistLen - 1;
            }
            require('toplayer.js').toplayer(window.songInfo[curIdx],mplayerObj,true);
        });
        ctrl.nxt_btn.unbind().bind('click',function(){
            curIdx++;
            if(curIdx > slistLen - 1){
                curIdx = 0;
            }
            require('toplayer.js').toplayer(window.songInfo[curIdx],mplayerObj,true);
        });
        totalPlayTime = totalTime;
        mplayerObj = playerObj;
    };
    //按下进度条point时触发的事件 1,进度条timer clear
    function mouseDownPlayHandle(){
        clearInterval(barTimer);
    }
    //松开进度条point时触发的事件 1,进度条timer恢复 2,设置播放器当前播放时间 3,音乐从当前时间开始播放
    function mouseUpPlayHandle(){
        var barCurWidth = ctrl.ply_bar.width();
        var curPercent = barCurWidth / barTotalWidth;
        var newPlayTime = Math.round(Math.round(totalPlayTime) * curPercent);
        playedTime(mplayerObj,totalPlayTime,newPlayTime);
        mplayerObj[0].currentTime = newPlayTime;
        barTimer = setInterval(function(){
            setPlayBar(mplayerObj,totalPlayTime);
        },500);
    }
    require('drag.js').dragHandle(ctrl.bar_point[0],ctrl.ply_bar[0],barTotalWidth,0,9,9,{mdHandle:mouseDownPlayHandle,muHandle:mouseUpPlayHandle});
    exports.init = playControl;
});