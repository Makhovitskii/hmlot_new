$(function() {


    //иконки удаления контента в инпутах
    $('[data-attr="field-wrapper"]').each(function() {

        var $inp = $(this).find('input'),
            $cle = $(this).find(".field-clear");

        $inp.on("input", function() {

            if ( $(this).val().length > 0 ) {

                $(this).closest('[data-attr="field-wrapper"]').addClass('is-active');

            }

            else{

                $(this).closest('[data-attr="field-wrapper"]').removeClass('is-active');
            }

        });

        $cle.on("touchstart click", function(e) {
            e.preventDefault();
            $inp.val("").trigger("input");
        });

    });



    $(".search-form").on('click', function (event) {


        $(this).addClass('is-active');

        $('.page-header__logo').addClass('is-active');

    });

    $(document).on('click', function (event) {

        if ( !$(event.target).closest('.search-form').length) {

            $(".search-form").removeClass('is-active');

            $(".page-header__logo").removeClass('is-active');

        }

    });


    $(window).on('resize', remoVisibleMenuProductCardMobile);
    remoVisibleMenuProductCardMobile();
    function remoVisibleMenuProductCardMobile() {
        if ( $(window).width() < 993 ) {
            $(".categories-menu--product-card").removeClass('is-active');
        }
    }

    // выбор города
    $(".city-drop__item").on('click', function () {

        var text = $(this).text();

        $(this).addClass('is-active').siblings().removeClass('is-active');

        $(this).closest('.city').find('.city-toggler__text').text(text);

        $(this).closest('.city-drop').removeClass('is-active');

        $(this).closest('.city').find('.city-toggler').removeClass('is-active');

    });


    $(".city-toggler").on('click', function () {

        $(this).toggleClass('is-active');

       $(this).next('.city-drop').toggleClass('is-active');

    });


    //закрытие выбора города при клике на любой елемент страницы, кроме самого выбора города
    $(document).on('click', function (event) {

        if ( !$(event.target).closest('.city').length) {
            $(".city-drop,.city-toggler").removeClass('is-active');
        }

    });


    //  сслайдер баннеров
    $("#js-banner-slider").slick({
        slidesToShow:3,
        slidesToScroll:1,
        prevArrow: '.banner-slider__control--prev',
        nextArrow: '.banner-slider__control--next',
    });


    //меню категорий
    $(".categories-menu-toggler").on('click', function () {

        $(this).toggleClass('is-active');

        if ( $("#categories-menu").hasClass('is-active') ) {
            $("#categories-menu").removeClass('is-active');
        }
        else{
            $("#categories-menu").addClass('is-active');
        }

    });


    $('.page-inner').not('.page-inner--product-card').on('click', function (event) {

        if ( !$(event.target).closest('.categories-menu-toggler, .categories-menu__list a').length) {
            $("#categories-menu,.categories-menu-toggler").removeClass('is-active');
        }

    });

    $("#cookies-msg").fadeIn();

    // сообщение о наличии куки
    $(".cookies-msg__assept-msg, .cookies-msg__close").on('click', function () {

        $("#cookies-msg").fadeOut();

    });

    $(document).on('click', function (event) {

        if ( !$(event.target).closest('#cookies-msg').length) {
            $("#cookies-msg").fadeOut();
        }

    });


    $(".test__item").on('click', function () {
       $(".test-drop").addClass('is-active');
    });


    $(window).on('resize',slideCategoriesSubpanel);

    slideCategoriesSubpanel();
    function slideCategoriesSubpanel() {

        if ( $(window).width() < 993 ) {

            $(".categories-menu__list a").on('click', function (event) {
                event.preventDefault();
                $(this).next('.categories-menu__list--subpanel').addClass('is-active');
            });

            $(".categories-menu__list-title").on('click', function () {

                $(this).closest('.categories-menu__list--subpanel').removeClass('is-active');

            })

        }

    };



//    форма логина

    $(".login-popup--type-1 .login-popup-form__input").on('input', function () {

        if ( $(this).val().length > 0) {

            $(this).closest('.login-popup-form').find('.login-popup-form__submit').attr('disabled', false);

           $(this).siblings('.login-popup-form__animated-icon').css('display', 'flex');


        }

        else{

            $(this).closest('.login-popup-form').find('.login-popup-form__submit').attr('disabled', true);

            $(this).siblings('.login-popup-form__animated-icon').css('display', 'none');

        }

    });


    $(".login-popup--type-1 .login-popup-form__submit").on('click', function () {

        $(this).closest('.login-popup').find('.login-popup-form__animated-icon').css('display', 'none');

        $(this).closest('.login-popup').find('.login-popup-form__authorization').fadeIn();

        $(this).css('opacity', '0');

    });



    //слайдер  на странице product-card

    productCardSlider();
    function productCardSlider() {

        var $status = $('.goods-item-preview__counter');

        $(".goods-item .goods-item-preview__header").on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;

            if ( slick.slideCount > 1 ) {

                $status.show();

                $status.text(i + ' / ' + slick.slideCount);

            }

        });

        $(".goods-item .goods-item-preview__header").slick({
            prevArrow: '.goods-item-preview__control--prev',
            nextArrow: '.goods-item-preview__control--next',
            fade: true,
        });


    }

    //скрытие одного из блоков в сайдбаре на странице reserve


    $(".reserve-aside__close").on('click', function () {

        $(this).closest('.reserve-aside__block').fadeOut();

    });


    // убрал поисковый бокс в селекте на селектах
    $('.form-control-select').select2(
        {
            minimumResultsForSearch: -1
        }
    );


    //фильтры на странице main-menu.html

    $(".filter__toggler").on('click', function() {

        var filter = $(this).closest('.filter');

        $(this).toggleClass('is-active').closest(filter).siblings().find('.filter__toggler').removeClass('is-active');

        filter.toggleClass('is-active').siblings().removeClass('is-active');

    });


    $(document).on('click', function (event) {

        if ( !$(event.target).closest('.filter').length) {

            $(".filter,.filter__toggler,[data-attr=field-wrapper]").removeClass('is-active');

            $(".filter-drop__input").val('');

        }

    });


    //фильтры на странице main-menu

    $('.filter-drop__select').on('select2:select', function (e) {

        var selected_element = $(e.currentTarget);
        select_val = selected_element.val(),
        filter = $(this).closest('.filter'),
        targetOutput = filter.find('.filter__toggler-val--select-target');

        targetOutput.text(select_val);

        filter.removeClass('is-active');

    }).on('select2:close', function() {

        var filter = $(this).closest('.filter'),
            filterToggler = filter.find('.filter__toggler')

        filter.removeClass('is-active');

        filterToggler.removeClass('is-active');

    });


    $(".filter-drop__field").on('keypress', function () {

        var inp = $(this).closest('.filter').find('.filter-drop__field').not( $(this) ),
            inputs = $(this).closest('.filter').find('.filter-drop__field');

        if ( $(this).val().length > 0 && inp.val().length > 0 && event.keyCode === 13 ) {

            $(this).blur();

            $(this).closest('.filter').find(".filter-drop__submit").trigger('click');

        }

    });


    $(".filter-drop__submit").on('click', function() {

        var inputs = $(this).closest('.filter').find('.filter-drop__input'),
            result = $(inputs).filter(function () {
            return $.trim($(this).val()).length == 0
        }).length == 0;

        if ( result ) {

            $(this).closest('.filter').find(".filter__toggler-val-item").each(function (i) {

                $(this).text( inputs.eq(i).val() );

                $(this).closest('.filter').removeClass('is-active');

                $(this).closest('.filter').find('.filter__toggler').removeClass('is-active');

                inputs.eq(i).val('');

                $(this).closest('.filter').find('[data-attr=field-wrapper]').removeClass('is-active');

            });

        }

        if ( $(this).closest('.filter--has-select').length ) {

            $(this).closest('.filter').removeClass('is-active');

            $(this).closest('.filter').find('.filter__toggler').removeClass('is-active');

        }

    });


    // работа с главным меню на странице main-menu. Показываем субменю при клике на любой айтем главного меню
    $(".main-menu__list").on('click', 'li', function () {

        $(this).closest('.main-menu').find('.main-menu-submenu').addClass('is-active');

    });


    //закрываем субменю главного меню (страница main-menu) при клике на стрелочку влево в верхнем углу субменю
    $(".main-menu-submenu__top").on('click', function () {

        $(this).closest('.main-menu-submenu').removeClass('is-active');

    });


    //фиксированное главное вертикальное меню при скролле на странице main-menu

    $(window).on('resize', stickyMainMenu);
    stickyMainMenu();
    function stickyMainMenu() {

        if ( $('#main-menu').length ) {

            var mainMenu = $('#main-menu'),
                mainMenuOffsetTop = $('#main-menu').offset().top,
                mainMenuWrapper = mainMenu.closest('.main-menu-wrapper'),
                mainMenuWrapperWidth = mainMenuWrapper.width();


            mainMenu.css('width', mainMenuWrapperWidth);

            $(window).on('scroll', function () {

                if ( $(this).scrollTop() >= mainMenuOffsetTop ) {

                    mainMenu.addClass('fixed');

                }

                else{

                    mainMenu.removeClass('fixed');

                }

            });

        }

    }


    //закрытия попапа с классом reserve-popup на странице favorites

    $(".reserve-popup__btn,.reserve-popup__close").on('click', function () {

        $.fancybox.close();

    });


    $("#phone-1").mask('+7 (000) 000-0000');
    $("#phone-2").mask('+7 (000) 000-0000');

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    loginPopup();
    function loginPopup() {

        var parent = $('.login-popup-type-2'),
            input = parent.find('.login-popup-form__input'),
            phoneInput = parent.find('.login-popup-form__input--phone'),
            emailInput = parent.find('.login-popup-form__input--email'),
            checkbox = parent.find('.login-popup-form__checkox-input'),
            submit = parent.find('.login-popup-form__submit'),
            submitText = submit.find('.login-popup-form__text'),
            submitIcon = parent.find('.login-popup-form__submit-icon'),
            smsBox = parent.find('.login-popup-form__input-wrapper-sms'),
            smsBoxInput = smsBox.find('.login-popup-form__input-wrapper-sms-input'),
            timerWrapper = parent.find('.login-popup__timer-wrapper'),
            timer = parent.find('.login-popup__timer');


        emailInput.on('input', function () {

            if ( $(this).val().length === 0) {

                submit.attr('disabled', true);

                $(this).removeClass('success');

            }

            if ( isEmail( $(this).val() ) ) {

                $(this).addClass('success');

            }

            if ( isEmail( $(this).val() ) && phoneInput.val().length === 17 ) {

                submit.attr('disabled', false);

            }

        }).on('change', function () {

            if ( $(this).val().length === 0 ) {

                $(".login-popup-tooltip--email-info").fadeIn().delay(2000).fadeOut();

                $(this).removeClass('success');

            }

            if ( !isEmail( $(this).val() ) ) {

                $(".login-popup-tooltip--email-error").fadeIn().delay(2000).fadeOut();

                $(this).val('');

                emailInput.focus();

                $(this).removeClass('success');

            }


        });


        phoneInput.on('input', function () {

            if ( isEmail( emailInput.val() ) && $(this).val().length === 17 ) {

                submit.attr('disabled', false);

            }

            if ( $(this).val().length === 17 ) {

                $(this).addClass('success');

            }

            else if ( !isEmail( emailInput.val() ) && $(this).val().length === 17 ) {

                $(".login-popup-tooltip--email-info").fadeIn().delay(2000).fadeOut();

            }

            else{

                submit.attr('disabled', true);

                $(this).removeClass('success');

            }

        });


        checkbox.on('change', function () {

            if ( $(this).is(':checked') && emailInput.hasClass('success') && phoneInput.hasClass('success') ) {

                submit.attr('disabled', false);

            }

            else{

                submit.attr('disabled', true);

            }

        });


        smsBoxInput.on('input', function () {


            if ( $(this).val().length === 4 && checkbox.is(':checked') ) {

                submit.attr('disabled', false);

                submit.addClass('is-active');

            }

            else{

                submit.attr('disabled', true);

            }

        });


        submit.on('click', function () {

            submitIcon.fadeIn();

            setTimeout(function () {

                if ( submit.hasClass('is-active') ) {

                    parent.addClass('is-success');

                }

                if ( parent.hasClass('is-success') ) {

                    setTimeout(function () {

                        parent.fadeOut(1000).removeClass('is-success');

                        $.fancybox.close();

                        smsBox.css('display', 'flex').hide();

                        input.val('');

                        submit.removeClass('is-active');

                    }, 1000);

                }

                submit.addClass('is-active');

                parent.addClass('is-active');

                submitIcon.fadeOut();

                smsBox.css('display', 'flex').hide().fadeIn();

                submit.attr('disabled', true);

                submitText.text('Отправить');

                $(timerWrapper).fadeIn();

                timer.timer({
                    countdown: true,
                    duration: '2m00s',
                    format:'%m:%S',
                    callback: function() {
                        $(".login-popup__timer-wrapper").fadeOut();
                    }
                });


            },1000);


        });


    }

    tabs();
    function tabs() {

        $(".tabs__list").on('click', 'li', function () {

            var target = $(this).attr('data-target');

            $(this).addClass('is-active').siblings().removeClass('is-active');

            $(target).addClass('is-active').siblings().removeClass('is-active');

        });

    }

    customSelects()
    function customSelects() {

        $(".select-toggler").on('click', function () {

            var select = $(this).closest('.select'),
                selectDrop = select.find('.select-drop');

            $(this).toggleClass('is-active');

            selectDrop.toggleClass('is-active');

            $(this).closest('body').find('.select-drop').not(selectDrop).removeClass('is-active');

        });


        $(".select-drop").on('click', 'li', function () {

            var text = $(this).text();

            $(this).addClass('is-active').siblings().removeClass('is-active');

            $(this).closest('.select').find('.add-product-item-select-toggler__text').text( text );

            $(this).closest('.select-drop').removeClass('is-active');

            $(this).closest('.select').find('.add-product-item-select-toggler').removeClass('is-active');

        });


        $(document).on('click', function (event) {

            if( !$(event.target).closest('.select').length ) {

                $(".select-drop").removeClass('is-active');

                $(".select-toggler").removeClass('is-active');

            }

        });

    }


    //иконка удаление текста в инпутах
    clearInputs();
    function clearInputs() {

        $('.form-control').each(function () {

            var clearBtn = $(this).siblings('.form-control-clear');

            $(this).on('input', function () {

                if ( $(this).val().length > 0 ) {

                    clearBtn.css('display', 'flex');

                }

                else{

                    clearBtn.css('display', 'none');

                }

            });

            clearBtn.on("touchstart click", function(e) {

                e.preventDefault();

                $(this).siblings('.form-control').val("").trigger("input");

            });

        });

    };


    function animateSpinnerInput() {

        var spinner = $(this).siblings('.spinner');

        if ( $(this).val().length > 0 ) {

            spinner.css('display', 'flex');

        }

        else{

            spinner.css('display', 'none');

        }

    }


    $(".account-login-form__field--email").on('input', animateSpinnerInput );


    $(".form-control--enter-link").on('click', function () {

        $(".account-login").addClass('is-active');

        $(this).addClass('is-hidden');
        
        if ( $(window).width() < 993 ) {

            $(body).css("overflow", "hidden");

        }

    });


    $(".account-login__close").on('click', function () { 

        $(this).closest('.account-login').removeClass('is-active');

        $(".form-control--enter-link").removeClass('is-hidden');

     });


    $(document).on('click', function (event) {

        if ( !$(event.target).closest('.account-login, .form-control--enter-link').length ) {

            $(".account-login").removeClass('is-active');

            $(".form-control--enter-link").removeClass('is-hidden');

        }

    });


    $('.account-items--left').infiniteslide({
        'speed': 40, //速さ　単位はpx/秒です。
        'direction': 'left', //up/down/left/rightから選択
        'pauseonhover': false, //マウスオーバーでストップ
        'responsive': true, //子要素の幅を%で指定しているとき
        'clone': 1 //子要素の複製回数
    });


    $('.account-items--right').infiniteslide({
        'speed': 40, //速さ　単位はpx/秒です。
        'direction': 'right', //up/down/left/rightから選択
        'pauseonhover': false, //マウスオーバーでストップ
        'responsive': true, //子要素の幅を%で指定しているとき
        'clone': 1 //子要素の複製回数
    });


    $("input[type='reset']").closest('.add-product').on('reset', function () {

        $(".add-product").find('.form-control-clear').hide();

    });


    function hideEmptyElements(elem) {

        var emptyElements = $(elem).filter(function() {

            return $.trim($(this).text()).length == 0;

        });

        emptyElements.hide();

    }

    hideEmptyElements('.goods-item-preview');


    $('[data-fancybox]').fancybox({

        touch: false

    });


});
