'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.featured__controls li').on('click', function () {
            $('.featured__controls li').removeClass('active');
            $(this).addClass('active');
        });
        if ($('.featured__filter').length > 0) {
            var containerEl = document.querySelector('.featured__filter');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    //Humberger Menu
    $(".humberger__open").on('click', function () {
        $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").addClass("active");
        $("body").addClass("over_hid");
    });

    $(".humberger__menu__overlay").on('click', function () {
        $(".humberger__menu__wrapper").removeClass("show__humberger__menu__wrapper");
        $(".humberger__menu__overlay").removeClass("active");
        $("body").removeClass("over_hid");
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });


    $('.hero__categories__all').on('click', function(){
        $('.hero__categories ul').slideToggle(400);
    });

    /*---------------------------------
        Product Details Pic Slider
    ----------------------------------*/
    $(".product__details__pic__slider").owlCarousel({
        loop: true,
        margin: 20,
        items: 4,
        dots: true,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
		Single Product
	--------------------*/
    $('.product__details__pic__slider img').on('click', function () {

        var imgurl = $(this).data('imgbigurl');
        var bigImg = $('.product__details__pic__item--large').attr('src');
        if (imgurl != bigImg) {
            $('.product__details__pic__item--large').attr({
                src: imgurl
            });
        }
    });

    // Xử lý nút Thêm giỏ hàng
    $('.product__details__text .primary-btn').on('click', function (e) {
        e.preventDefault();
        var quantity = parseInt($('.pro-qty input').val()) || 1;
        var productName = $('.product__details__text h3').text();
        alert('🛒 Đã thêm ' + quantity + ' x "' + productName + '" vào giỏ hàng thành công!');
        
        // Cập nhật số lượng giỏ hàng trên header
        var currentCartCount = parseInt($('.header__cart ul li:eq(1) span').text()) || 3;
        var newCount = currentCartCount + quantity;
        $('.header__cart ul li:eq(1) span').text(newCount);
        $('.humberger__menu__cart ul li:eq(1) span').text(newCount);
        
        var currentPriceText = $('.product__details__price').text().replace(/[^\d]/g, '');
        var price = parseFloat(currentPriceText) || 76300;
        var totalCartPrice = newCount * price;
        var formattedPrice = totalCartPrice.toLocaleString('vi-VN') + ' đ';
        $('.header__cart__price span').text(formattedPrice);
        $('.humberger__menu__cart .header__cart__price span').text(formattedPrice);
    });

    // Xử lý nút Yêu thích (Heart icon)
    $('.product__details__text .heart-icon').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).css('color', '#dd2222');
            alert('❤️ Đã thêm sản phẩm vào danh sách yêu thích!');
            $('.header__cart ul li:eq(0) span').text(2);
            $('.humberger__menu__cart ul li:eq(0) span').text(2);
        } else {
            $(this).css('color', '#6f6f6f');
            alert('💔 Đã xóa sản phẩm khỏi danh sách yêu thích.');
            $('.header__cart ul li:eq(0) span').text(1);
            $('.humberger__menu__cart ul li:eq(0) span').text(1);
        }
    });

    // Hỗ trợ nút Quantity change trên Product Detail page
    var detailProQty = $('.product__details__quantity .pro-qty');
    if (detailProQty.find('.qtybtn').length === 0) {
        detailProQty.prepend('<span class="dec qtybtn">-</span>');
        detailProQty.append('<span class="inc qtybtn">+</span>');
        
        detailProQty.on('click', '.qtybtn', function () {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            var newVal = 1;
            if ($button.hasClass('inc')) {
                newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue > 1) {
                    newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find('input').val(newVal);
        });
    }

})(jQuery);