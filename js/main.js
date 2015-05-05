define(function(require,exports){
    var $ = require('jquery');
    var oLia = $('.hd-ul li a');
    var oSec = $('section');
    function setMenu(index){
        oLia.parent().eq(index).addClass('cur').siblings().removeClass('cur');
    }
    require('hash.js').hashHandle(oLia,oSec,setMenu);
    var playerObj = $("#mPlayer");
    //var songInfo = {songId:"1002",songName:"不顾一切地活着",songUrl:"./mp3/1001.mp3"};
    require('toplayer.js').toplayer(songInfo[0],playerObj,true);
});