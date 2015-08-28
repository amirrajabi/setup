/**
 * Created by Amir on 28/08/15.
 */

(function () {

    'use strict';

    var setup = new Setup.Test();
    setup.init();

    $('input').placeholder();

    $(window).resize(function(){
        setup.resize();
    });

})();
