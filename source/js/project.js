/**
 * Created by Amir on 19/04/15.
 */
var winWidth = $(window).width();

function mainmenu() {

    $('.hit-menu').mouseover(function (e) {
        $('.dropdown-menu-list').each(function () {
            var $this = $('.has-child');
            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $('.dropdown-menu-list').slideUp();
            }
        });
    });

    //$('.menu-item').each(function(){
    //    $(this).mouseover(function (e) {
    //        $('.dropdown-menu-list').each(function () {
    //            var $this = $('.has-child');
    //            if ($this.hasClass('active')) {
    //                $this.removeClass('active');
    //                $('.dropdown-menu-list').addClass('.dropdown-menu-list-hide');
    //            }
    //        });
    //    });
    //});


    $('.has-child').mouseover(function () {
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
            $(this).find('.dropdown-menu-list').slideDown();
        }
    });

    //$('.search-link').click(function (e) {
    //    e.preventDefault();
    //    $('.tools-block .header-search').toggleClass('header-search-show');
    //});

    $('.mobile-nav-bar').append($('.tools-list-link').clone());
    $('.mobile-nav').append($('.list-links').clone());
}


function callMobileMenu() {
    $('.hamburger').click(function (e) {
        e.preventDefault();
        $('.mobile-nav').addClass('show-menu');
    });

    $('.icon-close-mobile-nav').click(function (e) {
        e.preventDefault();
        $('.mobile-nav').removeClass('show-menu');
    });

    $('.mobile-nav .has-child a.link-item').click(function (e) {
        e.preventDefault();
        $(this).parent().find('.dropdown-menu-list').toggle("fast");
        $(this).closest('.has-child').toggleClass('has-child-active');
    });

    $('.mobile-nav .has-child .parent-link').click(function (e) {
        e.preventDefault();
        $(this).find('.child-link').toggle("fast");
        $(this).closest('.parent-link').toggleClass('parent-link-active');
    });

    $('.mobile-nav').css('height', $(document).height());

}

function resetMobileMenu() {
    $('.mobile-nav').removeClass('show-menu');
}

$(document).ready(function () {
    mainmenu();
    callMobileMenu();
});

$(window).resize(function () {
    winWidth = $(window).width();
    resetMobileMenu();

    $('.mobile-nav').css('height', $(document).height());
});