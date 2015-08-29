/**
 * Created by Amir on 28/08/15.
 */

var Setup = Setup || {};

Setup.Test = function(){

    'use strict';

    var init = function(){
        console.log('Run Test module now!');
    };

    var resize = function(){
        console.log(window.innerWidth);
    };

    var publicAPI = {
        init: init,
        resize: resize
    };

    return publicAPI;

};
