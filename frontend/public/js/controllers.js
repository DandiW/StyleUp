var projectControllers=angular.module("projectControllers",[]);projectControllers.controller("FirstController",["$scope","CommonData",function($scope,CommonData){$(document).on("click",".navToggle",function(){$(this).hasClass("open")&&($(this).removeClass("open"),$("nav").removeClass("open"),console.log($(this).hasClass("open"))),0==$(this).hasClass("open")&&($(this).addClass("open"),$("nav").addClass("open"),console.log($(this).hasClass("open")))});var Slider=function(){var $container=$("#ps-container"),$contentwrapper=$container.children("div.ps-contentwrapper"),$items=$contentwrapper.children("div.ps-content"),itemsCount=$items.length,$slidewrapper=$container.children("div.ps-slidewrapper"),$slidescontainer=$slidewrapper.find("div.ps-slides"),$slides=$slidescontainer.children("div"),$navprev=$slidewrapper.find("nav > a.ps-prev"),$navnext=$slidewrapper.find("nav > a.ps-next"),current=0,isAnimating=!1,support=Modernizr.csstransitions,transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},transEndEventName=transEndEventNames[Modernizr.prefixed("transition")],init=function(){var $currentItem=$items.eq(current),$currentSlide=$slides.eq(current),initCSS={top:0,zIndex:999};$currentItem.css(initCSS),$currentSlide.css(initCSS),updateNavImages(),initEvents()},updateNavImages=function(){var configPrev=current>0?$slides.eq(current-1).css("background-image"):$slides.eq(itemsCount-1).css("background-image"),configNext=itemsCount-1>current?$slides.eq(current+1).css("background-image"):$slides.eq(0).css("background-image");$navprev.css("background-image",configPrev),$navnext.css("background-image",configNext)},initEvents=function(){$navprev.on("click",function(event){return isAnimating||slide("prev"),!1}),$navnext.on("click",function(event){return isAnimating||slide("next"),!1}),$items.on(transEndEventName,removeTransition),$slides.on(transEndEventName,removeTransition)},removeTransition=function(){isAnimating=!1,$(this).removeClass("ps-move")},slide=function(dir){isAnimating=!0;var $currentItem=$items.eq(current),$currentSlide=$slides.eq(current);"next"===dir?itemsCount-1>current?++current:current=0:"prev"===dir&&(current>0?--current:current=itemsCount-1);var $newItem=$items.eq(current),$newSlide=$slides.eq(current);$newItem.css({top:"next"===dir?"-100%":"100%",zIndex:999}),$newSlide.css({top:"next"===dir?"100%":"-100%",zIndex:999}),setTimeout(function(){$currentItem.addClass("ps-move").css({top:"next"===dir?"100%":"-100%",zIndex:1}),$currentSlide.addClass("ps-move").css({top:"next"===dir?"-100%":"100%",zIndex:1}),$newItem.addClass("ps-move").css("top",0),$newSlide.addClass("ps-move").css("top",0),support||(isAnimating=!1)},0),updateNavImages()};return{init:init}}();$(function(){Slider.init()})}]),projectControllers.controller("testController",["$scope","Upload","CommonData",function($scope,Upload,CommonData){}]),projectControllers.controller("loginController",["$scope","$location","CommonData",function($scope,$location,CommonData){$scope.showmsg=!1,$scope.show_error=!1,$scope.show_ok=!1,$scope.RedirectToHome=function(){$location.path("/home")},$scope.goAway=function(){$scope.show_error=!1,$scope.showmsg=!1},$scope.TrySignUp=function(){({name:$scope.signupName,email:$scope.signupEmail,password:$scope.signupPassword})},$scope.TrySignIn=function(){console.log($scope.loginEmail),CommonData.setUser($scope.loginEmail).then(function(data){console.log(CommonData.getUser()),$location.path("/home")})},$(document).on("click",".tabs .tab",function(){$(this).hasClass("signin")&&($(".tabs .tab").removeClass("active"),$(this).addClass("active"),$(".cont").hide(),$(".signin-cont").show()),$(this).hasClass("signup")&&($(".tabs .tab").removeClass("active"),$(this).addClass("active"),$(".cont").hide(),$(".signup-cont").show())}),$(document).on("mousemove",".container .bg",function(e){var amountMovedX=-1*e.pageX/30,amountMovedY=-1*e.pageY/9;$(this).css("background-position",amountMovedX+"px "+amountMovedY+"px")})}]),projectControllers.controller("profileController",["$scope","Upload","$window","CommonData","$routeParams","Users","Collections",function($scope,Uplaod,$window,CommonData,$routeParams,Users,Collections){var LoggedInUser=CommonData.getUser();console.log("logged in user"),console.log(LoggedInUser._id),console.log($window.sessionStorage.logged_in_user),null!=LoggedInUser&&($scope.navBarUserLoggedIn=!0),$scope.profile_owner=!1,$scope.collections=[],console.log($routeParams.id),Users.get().then(function(data){console.log(data.data);for(var i=0;i<data.data.length;i++)data.data[i]._id==$routeParams.id&&($scope.user=data.data[i]);return console.log($scope.user.profilePicUrl),LoggedInUser._id==$scope.user._id&&($scope.profile_owner=!0,console.log("same user")),Collections.get()}).then(function(data){console.log(data.data);for(var i=0;i<data.data.length;i++)for(var j=0;j<$scope.user.collections.length;j++)data.data[i]._id==$scope.user.collections[j]&&$scope.collections.push(data.data[i])}),$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[],$scope.showAlbum=function(index){$scope.shown_collection=$scope.collections[index],console.log("index"),console.log(index);for(var i=0;i<$scope.collections[index].items.length;i++)"Shirt"==$scope.collections[index].items[i].type||"Blouse"==$scope.collections[index].items[i].type||"Dress"==$scope.collections[index].items[i].type||"Coat"==$scope.collections[index].items[i].type?$scope.tops.push($scope.collections[index].items[i]):"Pants"==$scope.collections[index].items[i].type||"Skirt"==$scope.collections[index].items[i].type||"Shoes"==$scope.collections[index].items[i].type?$scope.bottoms.push($scope.collections[index].items[i]):"Accessory"==$scope.collections[index].items[i].type&&$scope.accessories.push($scope.collections[index].items[i]);console.log($scope.accessories),console.log($scope.tops),console.log($scope.bottoms),$scope.modal_show=!0},$scope.closeModal=function(){$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[]},$scope.CreateBoardModalShow=!1,$scope.IncrementItem=function(){$scope.picFiles.push(null),$scope.categories.push("Dress")},$scope.deleteFile=function(index){$scope.picFiles.splice(index,1)},$scope.submitCollectionForm=function(){console.log("categories"),console.log($scope.categories),console.log("picFiles"),console.log($scope.picFiles);for(var i=0;i<$scope.picFiles.length;i++)$scope.picFiles[i]||($scope.picFiles.splice(i,1),$scope.categories.splice(i,1));console.log($scope.picFiles[0]);var wholeimage=null;null!=$scope.cropper.croppedImage?wholeimage=$scope.cropper.croppedImage:null!=$scope.cropper.sourceImage&&(wholeimage=$scope.cropper.sourceImage)};var CreateBoardInitialSet=function(){$scope.cropper={},$scope.cropper.sourceImage=null,$scope.cropper.croppedImage=null,$scope.bounds={},$scope.bounds.left=0,$scope.bounds.right=0,$scope.bounds.top=0,$scope.bounds.bottom=0,$scope.picFiles=[null,null,null],$scope.categories=["Dress","Dress","Dress"]};$scope.showCreateBoard=function(){CreateBoardInitialSet(),$scope.CreateBoardModalShow=!0},$scope.closeCreateBoardModal=function(){$scope.CreateBoardModalShow=!1},$scope.uploadPic=function(file){Upload.upload({url:"upload/url",data:{file:file},method:"PUT"}).then(function(resp){console.log("Success "+resp.config.data.file.name+"uploaded. Response: "+resp.data)})},$scope.$watch("user.description",function(newVal,oldVal){newVal!==oldVal&&console.log("sthhhh")})}]);