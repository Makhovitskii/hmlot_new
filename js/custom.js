/*
infiniteslide.js v2
version: 2.0.1
Author: T.Morimoto

Copyright 2017, T.Morimoto
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php

https://github.com/woodroots/infiniteslidev2
*/

(function($){
	$(function(){
		$.fn.infiniteslide = function(options){
			//option
			var settings = $.extend({
				'speed': 100, //速さ　単位はpx/秒です。
				'direction': 'left', //up/down/left/rightから選択
				'pauseonhover': true, //マウスオーバーでストップ
				'responsive': false, //子要素の幅を%で指定しているとき
				'clone': 1
			},options);
			
			var setCss = function(obj,direction){
				$(obj).wrap('<div class="infiniteslide_wrap"></div>').parent().css({
					overflow: 'hidden'
				});

				if(direction == 'up' || direction == 'down'){
					var d = 'column';
				} else {
					var d = 'row';
				}
								
				$(obj).css({
					display: 'flex',
					flexWrap: 'nowrap',
					alignItems: 'center',
					'-ms-flex-align': 'center',
					flexDirection: d
				}).children().css({
						flex: 'none',
						display: 'block'
					});
			}
			
			var setClone = function(obj,clone){
				var $clone = $(obj).children().clone().addClass('infiniteslide_clone');
				i = 1;
				while(i <= clone){
					$clone.clone().appendTo($(obj));
					i++;
				}
			}
			
			var getWidth = function(obj){
				w = 0;
				$(obj).children(':not(.infiniteslide_clone)').each(function(key,value){
					w = w + $(this).outerWidth(true);
				});
				return w;
			}
			var getHeight = function(obj){
				h = 0;
				$(obj).children(':not(.infiniteslide_clone)').each(function(key,value){
					h = h + $(this).outerHeight(true);
				});
				return h;
			}

			
			var getSpeed = function(l,s){
				return l / s;
			}
			var getNum = function(obj,direction){
				if(direction == 'up' || direction == 'down'){
					var num = getHeight(obj);
				} else {
					var num = getWidth(obj);
				}
				return num;
			}
			
			var getTranslate = function(num,direction){
				if(direction == 'up' || direction == 'down'){
					var i = '0,-' + num + 'px,0';
				} else {
					var i = '-' + num + 'px,0,0';
				}
				return i;
			}
			
			var setAnim = function(obj,id,direction,speed){
				var num = getNum(obj,direction);
				if(direction == 'up' || direction == 'down'){
					$(obj).parent('.infiniteslide_wrap').css({
						height: num + 'px'
					});
				}
				var i = getTranslate(num,direction);
				
				$(obj).attr('data-style','infiniteslide' + id);

				var css = '@keyframes infiniteslide' + id + '{' + 
								'from {transform:translate3d(0,0,0);}' + 
								'to {transform:translate3d(' + i + ');}' + 
							'}';
				$('<style />').attr('id','infiniteslide' + id + '_style')
				.html(css)
				.appendTo('head');
				
				if(direction == 'right' || direction == 'down'){
					var reverse = ' reverse';
				} else {
					var reverse = '';
				}
				
				$(obj).css({
					animation: 'infiniteslide' + id + ' ' + getSpeed(num,speed) + 's linear 0s infinite' + reverse
				});
			}
			var setStop = function(obj){
				$(obj).on('mouseenter',function(){
					$(this).css({
						animationPlayState: 'paused'
					});
				}).on('mouseleave',function(){
					$(this).css({
						animationPlayState: 'running'
					});
				});
			}
			
			var setResponsive = function(obj,direction){
					var num = getNum(obj,direction);
					var i = getTranslate(num,direction);
					return i;
				};
			
			
			
		
			return this.each(function(key,value){
				var $this = $(this);
				var num = Date.now() + Math.floor(10000*Math.random()).toString(16);
				if(settings.pauseonhover == true){
					setStop($this);
				}
				$(window).on('load',function(){
					setCss($this,settings.direction);
					setClone($this,settings.clone);
					setAnim($this,num,settings.direction,settings.speed);
					
					if(settings.responsive){
						$(window).on('resize',function(){
							var i = setResponsive($this,settings.direction);
							var styleid = $this.attr('data-style');
							var stylehtml = $('#' + styleid + '_style').html();
							
							var stylehtml_new = stylehtml.replace(/to {transform:translate3d\((.*?)\)/,'to {transform:translate3d(' + i + ')');
							$('#' + styleid + '_style').html(stylehtml_new);

						});
					}
				});
			});
			
		}
	});
})(jQuery);




$(".form-control--enter-link").on('click', function () {

	$(".account-login").addClass('is-active');

	$(this).addClass('is-hidden');

	if ( $(window).width() < 993 ) {

		$(body).css("overflow", "hidden");

	}

});


$(document).on('click', function (event) {

	if ( !$(event.target).closest('.account-login, .form-control--enter-link').length ) {

		$(".account-login").removeClass('is-active');

		$(".form-control--enter-link").removeClass('is-hidden');

	}

});

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


$(".account-login__close").on('click', function () { 

	$(this).closest('.account-login').removeClass('is-active');

	$(".form-control--enter-link").removeClass('is-hidden');

 });

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
	
	tabs();
    function tabs() {

        $(".tabs__list").on('click', 'li', function () {

            var target = $(this).attr('data-target');

            $(this).addClass('is-active').siblings().removeClass('is-active');

            $(target).addClass('is-active').siblings().removeClass('is-active');

        });

    }