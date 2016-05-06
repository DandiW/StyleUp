var projectControllers=angular.module("projectControllers",[]);projectControllers.controller("homeController",["$scope","Users","Collections","$location","CommonData",function($scope,Users,Collections,$location,CommonData){$scope.logOut=function(){Users.logout().then(function(data){$scope.navBarUserLoggedIn=!1})},$scope.searchTextChanged=function(){CommonData.setSearchText(angular.element(document.querySelector("#search_input_text")).val()),$location.path("/search")},Users.getCurrent().success(function(data){$scope.LoggedInUser=data.user,null!=$scope.LoggedInUser&&($scope.navBarUserLoggedIn=!0)}),Collections.get("").success(function(data){$scope.collections=_.sampleSize(data.collections,6)}),$scope.collections=[],$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[],$scope.showAlbum=function(index){$scope.shown_collection=$scope.collections[index],console.log("index"),console.log(index);for(var i=0;i<$scope.collections[index].items.length;i++)"Shirt"==$scope.collections[index].items[i].type||"Blouse"==$scope.collections[index].items[i].type||"Dress"==$scope.collections[index].items[i].type||"Coat"==$scope.collections[index].items[i].type?$scope.tops.push($scope.collections[index].items[i]):"Pants"==$scope.collections[index].items[i].type||"Skirt"==$scope.collections[index].items[i].type||"Shoes"==$scope.collections[index].items[i].type?$scope.bottoms.push($scope.collections[index].items[i]):"Accessory"==$scope.collections[index].items[i].type&&$scope.accessories.push($scope.collections[index].items[i]);console.log($scope.accessories),console.log($scope.tops),console.log($scope.bottoms),$scope.modal_show=!0},$scope.closeModal=function(){$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[]}}]),projectControllers.controller("loginController",["$scope","$location","Users",function($scope,$location,Users){$scope.showmsg=!1,$scope.show_error=!1,$scope.show_ok=!1,$scope.user={},$scope.msg="",$scope.RedirectToHome=function(){$location.path("/home")},$scope.goAway=function(){$scope.show_error=!1,$scope.showmsg=!1},$scope.TrySignUp=function(){Users.register($scope.user).success(function(data){Users.login($scope.user).then(function(data){$location.path("/home")})}).error(function(err){$scope.msg="User already exists",$scope.showmsg=!0})},$scope.TrySignIn=function(){console.log("signing in"),Users.login($scope.user).then(function(data){console.log("redirecting"),$location.path("/home")})["catch"](function(err){$scope.msg="Invalid login",$scope.showmsg=!0})},$(document).on("click",".tabs .tab",function(){$(this).hasClass("signin")&&($(".tabs .tab").removeClass("active"),$(this).addClass("active"),$(".cont").hide(),$(".signin-cont").show()),$(this).hasClass("signup")&&($(".tabs .tab").removeClass("active"),$(this).addClass("active"),$(".cont").hide(),$(".signup-cont").show())}),$(document).on("mousemove",".container .bg",function(e){var amountMovedX=-1*e.pageX/30,amountMovedY=-1*e.pageY/9;$(this).css("background-position",amountMovedX+"px "+amountMovedY+"px")})}]),projectControllers.controller("profileController",["$scope","Upload","$window","$location","CommonData","$routeParams","Users","Collections","Items","$q",function($scope,Upload,$window,$location,CommonData,$routeParams,Users,Collections,Items,$q){$scope.logOut=function(){Users.logout().then(function(data){$scope.navBarUserLoggedIn=!1,$location.path("/home")})},Users.getCurrent().success(function(data){$scope.LoggedInUser=data.user,null!=$scope.LoggedInUser&&($scope.navBarUserLoggedIn=!0,$scope.profile_owner=$scope.LoggedInUser.username===$routeParams.username)}).error(function(data){$scope.LoggedInUser=null,$scope.navBarUserLoggedIn=!1,$scope.profile_owner=!1}),$scope.collections=[],$scope.collectionsImages=[],Users.getUser($routeParams.username).then(function(data){return console.log("here's the user"),console.log(data),$scope.user=data.data.user,$scope.profilePic=Users.getProfilePicUrl($scope.user.username),console.log($scope.user.collections),Collections.get("")}).then(function(data){console.log("user collections"),console.log($scope.user.collections),console.log("all collections"),console.log(data.data.collections);for(var i=0;i<data.data.collections.length;i++)for(var j=0;j<$scope.user.collections.length;j++)data.data.collections[i]._id==$scope.user.collections[j]&&($scope.collections.push(data.data.collections[i]),console.log(Collections.getCollectionsPicUrl(data.data.collections[i]._id)),$scope.collectionsImages.push(Collections.getCollectionsPicUrl(data.data.collections[i]._id)));console.log($scope.collections)});$scope.modal_show=!1,$scope.collection_name="",$scope.tops=[],$scope.bottoms=[],$scope.accessories=[],$scope.showAlbum=function(index){$scope.shown_collection=$scope.collections[index],console.log("index"),console.log(index);var items=[],promises=[];$scope.shown_collection.items.forEach(function(item){promises.push(Items.get(item))}),$q.all(promises).then(function(data){console.log("data",data),data.forEach(function(result){items.push(result.data.item),"Shirt"==result.data.item.type||"Blouse"==result.data.item.type||"Dress"==result.data.item.type||"Coat"==result.data.item.type?$scope.tops.push(result.data.item):"Pants"==result.data.item.type||"Skirt"==result.data.item.type||"Shoes"==result.data.item.type?$scope.bottoms.push(result.data.item):"Accessory"==result.data.item.type&&$scope.accessories.push(result.data.item)})}),console.log($scope.accessories),console.log($scope.tops),console.log($scope.bottoms),$scope.modal_show=!0},$scope.imageUrl=function(id){return console.log("id",id),Items.getItemsPicUrl(id)},$scope.closeModal=function(){$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[]},$scope.CreateBoardModalShow=!1,$scope.IncrementItem=function(){$scope.picFiles.push(null),$scope.categories.push("Dress")},$scope.deleteFile=function(index){$scope.picFiles.splice(index,1)},$scope.submitCollectionForm=function(){for(var i=0;i<$scope.picFiles.length;i++)var wholeimage=null;$scope.cropper.croppedImage?$scope.cropper.sourceImage||(wholeimage=$scope.cropper.sourceImage):wholeimage=$scope.cropper.croppedImage;for(var promises=[],i=0;i<$scope.categories.length;i++){var cat=$scope.categories[i],pic=$scope.picFiles[i];null!=pic&&promises.push(Items.post(cat,pic))}var itemIds=[];$q.all(promises).then(function(data){console.log("data",data),data.forEach(function(result){itemIds.push(result.data._id)});var img=null==$scope.cropper.croppedImage?null:Upload.dataUrltoBlob($scope.cropper.croppedImage),newCollection={name:$scope.collection_name,items:itemIds,image:img};console.log(newCollection),Collections.post(newCollection).then(function(collectionResult){var id=collectionResult.data._id;Users.getCurrent().success(function(userResult){userResult.user.collections.push(id),console.log(userResult.user),Users.editCurrent(userResult.user).success(function(editResult){$scope.collections.push(collectionResult.data),$scope.collectionsImages.push(Collections.getCollectionsPicUrl(collectionResult.data._id)),$scope.CreateBoardModalShow=!1,$scope.collection_name="",$scope.categories=[],$scope.picFiles=[]})})})})["catch"](function(err){console.log(err)})};var CreateBoardInitialSet=function(){$scope.cropper={},$scope.cropper.sourceImage=null,$scope.cropper.croppedImage=null,$scope.bounds={},$scope.bounds.left=0,$scope.bounds.right=0,$scope.bounds.top=0,$scope.bounds.bottom=0,$scope.picFiles=[null,null,null],$scope.categories=["Dress","Dress","Dress"]};$scope.showCreateBoard=function(){CreateBoardInitialSet(),$scope.CreateBoardModalShow=!0},$scope.closeCreateBoardModal=function(){$scope.CreateBoardModalShow=!1},$scope.newProfPic={},$scope.uploadPic=function(file){Users.setProfilePic(file.files[0]).then(function(data){$scope.profilePic=$scope.profilePic+"?"+(new Date).getTime()})},$scope.$watch("user.description",function(newVal,oldVal){newVal!==oldVal&&console.log("sthhhh")}),$scope.searchTextChanged=function(){CommonData.setSearchText(angular.element(document.querySelector("#search_input_text")).val()),$location.path("/search")}}]),projectControllers.controller("searchController",["$scope","$window","$location","CommonData","$routeParams","Users","Collections","$q",function($scope,$window,$location,CommonData,$routeParams,Users,Collections,$q){Users.getCurrent().success(function(data){$scope.LoggedInUser=data.user,null!=$scope.LoggedInUser&&($scope.navBarUserLoggedIn=!0)}),$scope.logOut=function(){Users.logout().then(function(data){$scope.navBarUserLoggedIn=!1})},$scope.collections=[],$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[],$scope.showAlbum=function(index){$scope.shown_collection=$scope.collections[index],console.log("index"),console.log(index);for(var i=0;i<$scope.collections[index].items.length;i++)"Shirt"==$scope.collections[index].items[i].type||"Blouse"==$scope.collections[index].items[i].type||"Dress"==$scope.collections[index].items[i].type||"Coat"==$scope.collections[index].items[i].type?$scope.tops.push($scope.collections[index].items[i]):"Pants"==$scope.collections[index].items[i].type||"Skirt"==$scope.collections[index].items[i].type||"Shoes"==$scope.collections[index].items[i].type?$scope.bottoms.push($scope.collections[index].items[i]):"Accessory"==$scope.collections[index].items[i].type&&$scope.accessories.push($scope.collections[index].items[i]);console.log($scope.accessories),console.log($scope.tops),console.log($scope.bottoms),$scope.modal_show=!0},$scope.closeModal=function(){$scope.modal_show=!1,$scope.tops=[],$scope.bottoms=[],$scope.accessories=[]},$scope.searchTextChanged=function(search_term){var promises=[];console.log(search_term),Collections.get('?where={"name":/'+search_term+"/i}").then(function(data){return $scope.collections=data.data.collections,Users.get('?where={ "$or": [{"name":/'+search_term+'/i}, {"description":/'+search_term+"/i }]}")}).then(function(data){return $scope.user_items=data.data.users,console.log($scope.user_items),angular.forEach($scope.user_items,function(value,i){promises.push(Users.getProfilePicUrl($scope.user_items[i].username))}),$q.all(promises)}).then(function(data){$scope.profile_pics=data,console.log($scope.profile_pics)})},CommonData.getSearchText().then(function(data){console.log("data"),console.log(data),$scope.search_text=data,$scope.searchTextChanged(data)})}]);