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

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
        var $button = $(this);
        var oldValue = $button.parent().find('input').val();
        if ($button.hasClass('inc')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        $button.parent().find('input').val(newVal);
        updateTotal();
    });

    /*-------------------
	Bổ sung hàm updateTotal() và các tương tác giỏ hàng
	--------------------- */
    function updateTotal() {
        var quantity = parseInt($('#quantity').val());
        if (isNaN(quantity) || quantity < 0) {
            quantity = 0;
        }
        var unitPrice = 76300;
        var subtotal = quantity * unitPrice;
        
        // Format theo định dạng tiền tệ VN đ
        var formattedTotal = subtotal.toLocaleString('vi-VN') + ' đ';
        
        $('#total').text(formattedTotal);
        
        // Cập nhật tổng phụ
        $('.shoping__checkout ul li:eq(0) span').text(formattedTotal);
        
        // Kiểm tra và áp dụng giảm giá
        var discountPercent = parseFloat($('.shoping__checkout').attr('data-discount')) || 0;
        var finalTotal = subtotal * (1 - discountPercent / 100);
        var formattedFinalTotal = Math.round(finalTotal).toLocaleString('vi-VN') + ' đ';
        
        $('.shoping__checkout ul li:eq(1) span').text(formattedFinalTotal);
        
        // Cập nhật số lượng trên giỏ hàng header
        $('.header__cart ul li:eq(1) span').text(quantity);
        $('.header__cart__price span').text(formattedFinalTotal);
        $('.humberger__menu__cart ul li:eq(1) span').text(quantity);
        $('.humberger__menu__cart .header__cart__price span').text(formattedFinalTotal);
    }

    // Gắn sự kiện thay đổi trực tiếp trên ô input
    $('#quantity').on('change keyup', function () {
        updateTotal();
    });

    // Xử lý nút áp dụng coupon mã giảm giá
    $('.shoping__discount form').on('submit', function (e) {
        e.preventDefault();
        var couponCode = $(this).find('input').val().trim().toUpperCase();
        if (couponCode === 'SONAHOTEL' || couponCode === 'GIAM10') {
            $('.shoping__checkout').attr('data-discount', 10);
            alert('Áp dụng mã giảm giá 10% (mã: ' + couponCode + ') thành công!');
        } else if (couponCode !== '') {
            alert('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
            $('.shoping__checkout').attr('data-discount', 0);
        }
        updateTotal();
    });

    // Xử lý nút tiến hành thanh toán
    $('.shoping__checkout .primary-btn').on('click', function (e) {
        e.preventDefault();
        var quantity = parseInt($('#quantity').val()) || 0;
        if (quantity === 0) {
            alert('Giỏ hàng của bạn đang trống! Hãy thêm sản phẩm trước khi thanh toán.');
            return;
        }
        var total = $('.shoping__checkout ul li:eq(1) span').text();
        alert('🎉 Đặt hàng thành công!\nCám ơn quý khách đã mua sắm tại BookStore.\nTổng hóa đơn thanh toán: ' + total);
    });

    // Xử lý nút xóa sản phẩm khỏi giỏ hàng
    $('.shoping__cart__item__close').on('click', function () {
        if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?')) {
            $(this).closest('tr').fadeOut(300, function() {
                $(this).remove();
                $('#quantity').val(0);
                updateTotal();
            });
        }
    });

    // Chạy cập nhật tổng tiền lúc tải trang
    $(document).ready(function() {
        updateTotal();
    });

})(jQuery);