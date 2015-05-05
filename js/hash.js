define(function(require,exports){
    var $ = require('jquery');
    var curHash = window.location.hash.substring(1) || '/index';    
    var hashHandle = function(oLia,oSec,fn){        
        oSec.each(function(idx){
            if(oLia[idx].dataset.hash == curHash){
                fn(idx);
            }
            if(oSec[idx].dataset.hash == curHash){
                oSec.hide();                
                $(oSec[idx]).show();
            }
        });
        oLia.click(function(){
            var idx = $(this).parent().index();
            var tarHash = $(this)[0].dataset.hash;
            oSec.each(function(i){
                if(oSec[i].dataset.hash == tarHash){
                    oSec.hide();
                    $(oSec[i]).show();
                    window.location.hash = tarHash;
                }
            });
            fn(idx);
        });
    }
    exports.hashHandle = hashHandle;
});