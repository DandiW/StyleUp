$(document).on("click",".tabs .tab",function(){$(this).hasClass("signin")&&($(".tabs .tab").removeClass("active"),$(this).addClass("active"),$(".cont").hide(),$(".signin-cont").show()),$(this).hasClass("signup")&&($(".tabs .tab").removeClass("active"),$(this).addClass("active"),$(".cont").hide(),$(".signup-cont").show())}),$(document).on("mousemove",".container .bg",function(e){var amountMovedX=-1*e.pageX/30,amountMovedY=-1*e.pageY/9;$(this).css("background-position",amountMovedX+"px "+amountMovedY+"px")});var Slider=function(){var $container=$("#ps-container"),$contentwrapper=$container.children("div.ps-contentwrapper"),$items=$contentwrapper.children("div.ps-content"),itemsCount=$items.length,$slidewrapper=$container.children("div.ps-slidewrapper"),$slidescontainer=$slidewrapper.find("div.ps-slides"),$slides=$slidescontainer.children("div"),$navprev=$slidewrapper.find("nav > a.ps-prev"),$navnext=$slidewrapper.find("nav > a.ps-next"),current=0,isAnimating=!1,support=Modernizr.csstransitions,transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},transEndEventName=transEndEventNames[Modernizr.prefixed("transition")],init=function(){console.log("work");var $currentItem=$items.eq(current),$currentSlide=$slides.eq(current),initCSS={top:0,zIndex:999};$currentItem.css(initCSS),$currentSlide.css(initCSS),updateNavImages(),initEvents()},updateNavImages=function(){console.log("work2");var configPrev=current>0?$slides.eq(current-1).css("background-image"):$slides.eq(itemsCount-1).css("background-image"),configNext=itemsCount-1>current?$slides.eq(current+1).css("background-image"):$slides.eq(0).css("background-image");$navprev.css("background-image",configPrev),$navnext.css("background-image",configNext)},initEvents=function(){console.log("work3"),$navprev.on("click",function(event){return isAnimating||slide("prev"),!1}),$navnext.on("click",function(event){return isAnimating||slide("next"),!1}),$items.on(transEndEventName,removeTransition),$slides.on(transEndEventName,removeTransition)},removeTransition=function(){isAnimating=!1,$(this).removeClass("ps-move")},slide=function(dir){isAnimating=!0;var $currentItem=$items.eq(current),$currentSlide=$slides.eq(current);"next"===dir?itemsCount-1>current?++current:current=0:"prev"===dir&&(current>0?--current:current=itemsCount-1);var $newItem=$items.eq(current),$newSlide=$slides.eq(current);$newItem.css({top:"next"===dir?"-100%":"100%",zIndex:999}),$newSlide.css({top:"next"===dir?"100%":"-100%",zIndex:999}),setTimeout(function(){$currentItem.addClass("ps-move").css({top:"next"===dir?"100%":"-100%",zIndex:1}),$currentSlide.addClass("ps-move").css({top:"next"===dir?"-100%":"100%",zIndex:1}),$newItem.addClass("ps-move").css("top",0),$newSlide.addClass("ps-move").css("top",0),support||(isAnimating=!1)},0),updateNavImages()};return{init:init}}();