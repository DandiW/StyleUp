var apiServices=angular.module("apiServices",[]),baseUrl="http://localhost:4000/api/";apiServices.factory("Users",function($http,$window,$q){return{register:function(user){return console.log(user),$http.post(baseUrl+"register",user)},login:function(user){var deferred=$q.defer();return $http.post(baseUrl+"login",user).success(function(data){$http.defaults.headers.common.Authorization=data.token,$window.localStorage.curUser=user.username,$window.localStorage.curToken=data.token,console.log($http.defaults.headers.common.Authorization),deferred.resolve(user)})["catch"](function(err){deferred.reject(err)}),deferred.promise},logout:function(){return $q(function(resolve){$window.localStorage.curUser="",$window.localStorage.curToken="",resolve("resolved")})},setProfilePic:function(image){console.log(image);var fd=new FormData;return fd.append("image",image),$http.defaults.headers.common.Authorization=$window.localStorage.curToken,$http.post(baseUrl+"profilePic/"+$window.localStorage.curUser,fd,{headers:{"Content-Type":void 0},transformRequest:angular.identity})},getProfilePicUrl:function(username){return baseUrl+"profilePic/"+username},getCurrent:function(){return $http.get(baseUrl+"user/"+$window.localStorage.curUser)},editCurrent:function(newUser){return $http.defaults.headers.common.Authorization=$window.localStorage.curToken,$http.put(baseUrl+"user/"+$window.localStorage.curUser,newUser)},deleteCurrent:function(){return $http.defaults.headers.common.Authorization=$window.localStorage.curToken,$http["delete"](baseUrl+"user/"+$window.localStorage.curUser)},getUser:function(username){return console.log(baseUrl+"user/"+username),$http.get(baseUrl+"user/"+username)},get:function(select_options){return $http.get(baseUrl+"users"+select_options)},addFavorite:function(collectionID){return $http.get(baseUrl+"user/"+$window.localStorage.curUser).then(function(data){return data.user.favorites.indexOf(collectionID)<0&&data.user.favorites.push(collectionID),$http.put(baseUrl+"user/"+$window.localStorage.curUser,data.user)})},removeFavorite:function(collectionID){return $http.get(baseUrl+"user/"+$window.localStorage.curUser).then(function(data){var index=data.user.favorites.indexOf(collectionID);return index>=0&&data.user.favorites.splice(index,1),$http.put(baseUrl+"user/"+$window.localStorage.curUser,data.user)})}}}),apiServices.factory("Collections",function($http,$window,$q){return{get:function(select_options){return $http.get(baseUrl+"collections"+select_options)},post:function(data){$http.defaults.headers.common.Authorization=$window.localStorage.curToken;var fd=new FormData;return fd.append("name",data.name),fd.append("image",data.image),console.log(data.image),$http.post(baseUrl+"collection",fd,{headers:{"Content-Type":void 0},transformRequest:angular.identity})},"delete":function(id){return $http.defaults.headers.common.Authorization=$window.localStorage.curToken,$http["delete"](baseUrl+"collection/"+id)},getOne:function(select_options){return $http.get(baseUrl+"collection/"+select_options)},put:function(id,data){return $http.defaults.headers.common.Authorization=$window.localStorage.curToken,$http.put(baseUrl+"collection/"+id,data)}}}),apiServices.factory("Items",function($http,$window,$q){return{get:function(id){return $http.get(baseUrl+"item/"+id)},post:function(type,image){var fd=new FormData;return fd.append("image",image),fd.append("type",type),$http.post(baseUrl+"item",fd,{headers:{"Content-Type":void 0},transformRequest:angular.identity})},put:function(id,name,type,image){var fd=new FormData;return fd.append("image",image),fd.append("name",name),fd.append("type",type),$http.put(baseUrl+"item/"+id,fd,{headers:{"Content-Type":void 0},transformRequest:angular.identity})},getItemImgUrl:function(id){return baseUrl+"itemImage/"+id},"delete":function(id){return $http["delete"](baseUrl+"item/"+id)}}});