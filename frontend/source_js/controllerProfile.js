

projectControllers.controller('profileController', ['$scope', 'Upload', '$window', '$location', 'CommonData', '$routeParams', 'Users', 'Collections' , function($scope, Uplaod, $window, $location, CommonData, $routeParams, Users, Collections ) {

/*

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; */

	Users.getCurrent().success(function(data) {
		var LoggedInUser = data.user;
		if (LoggedInUser != null) {
			$scope.navBarUserLoggedIn = true;
			$scope.profile_owner = LoggedInUser.username === $routeParams['username'];
		}
		$scope.collections = [];
		Users.getUser($routeParams['username']).then(function(data){
			console.log(data);
			$scope.user = data.data.user;
			$scope.profilePic = Users.getProfilePicUrl($scope.user.username);
		});
		return Collections.get();
	});

  /////end of to be deleted

  ///the right code for when we have the backend
/*
  angular.forEach( $scope.user.collections , function(value, i){
        promises.push(Collections.get($scope.user.collections[i]._id));

  return $q.all(promises);
  */

  ///end of the right code

//to be deleted when we have the backend
//   return Collections.get();
// //the end of to be deleted
// }).then(function(data){
//
//   ///with the backend, the code below could be replaced with getting specific ids from the server
//   console.log(data.data);
//   for (var i = 0 ; i < data.data.length; i++)
//   {
//     for (var j = 0 ; j < $scope.user.collections.length ; j++)
//       if (data.data[i]._id == $scope.user.collections[j])
//         $scope.collections.push(data.data[i]);
//   }
//
// });


$scope.modal_show = false;
$scope.tops = [];
$scope.bottoms = [];
$scope.accessories = [];


$scope.showAlbum = function(index) {

  $scope.shown_collection = $scope.collections[index];
  console.log ("index");
  console.log(index);

  for (var i = 0 ; i < $scope.collections[index].items.length ; i++)
  {
    if ($scope.collections[index].items[i].type == "Shirt" ||
   $scope.collections[index].items[i].type == "Blouse" ||
 $scope.collections[index].items[i].type == "Dress" ||
$scope.collections[index].items[i].type == "Coat" )
    $scope.tops.push($scope.collections[index].items[i]);

    else if ($scope.collections[index].items[i].type == "Pants" ||
   $scope.collections[index].items[i].type == "Skirt" ||
  $scope.collections[index].items[i].type == "Shoes" )
    $scope.bottoms.push($scope.collections[index].items[i]);

    else if ($scope.collections[index].items[i].type == "Accessory" )
      $scope.accessories.push($scope.collections[index].items[i]);
  }

  console.log($scope.accessories);
  console.log($scope.tops);
  console.log($scope.bottoms);

  $scope.modal_show = true;
}

$scope.closeModal = function (){

  $scope.modal_show = false;
  $scope.tops = [];
  $scope.bottoms = [];
  $scope.accessories = [];
}


  /////for createBoard
  $scope.CreateBoardModalShow = false;



$scope.IncrementItem = function()
{
  $scope.picFiles.push(null);
  $scope.categories.push("Dress");
}

$scope.deleteFile = function(index){
  $scope.picFiles.splice(index, 1);
}



$scope.submitCollectionForm = function() {

  console.log("categories");
  console.log($scope.categories);

  console.log("picFiles");
  console.log($scope.picFiles);

  for (var i = 0 ; i < $scope.picFiles.length ; i++)
    if (!$scope.picFiles[i])
      {
        $scope.picFiles.splice(i, 1);
        $scope.categories.splice(i, 1);
      }

      console.log($scope.picFiles[0]);

      var wholeimage = null;

      if ($scope.cropper.croppedImage != null)
          wholeimage = $scope.cropper.croppedImage;
      else if ($scope.cropper.sourceImage != null)
          wholeimage = $scope.cropper.sourceImage;


  /*
     if ($scope.picFiles && $scope.picFiles.length) {
       Upload.upload({ url: 'upload/url',
        data: {files: $scope.picFiles, categories: $scope.categories, wholeimg : wholeimage },
        method: 'POST'
      }).then(function(data){

       });
     }
     */

   }


   var CreateBoardInitialSet = function(){
     $scope.cropper = {};
     $scope.cropper.sourceImage = null;
     $scope.cropper.croppedImage   = null;
     $scope.bounds = {};
     $scope.bounds.left = 0;
     $scope.bounds.right = 0;
     $scope.bounds.top = 0;
     $scope.bounds.bottom = 0;

   $scope.picFiles = [null, null, null];
   $scope.categories = ["Dress", "Dress", "Dress"];
   }

   $scope.showCreateBoard = function(){

    CreateBoardInitialSet();
   $scope.CreateBoardModalShow = true;

   }

   $scope.closeCreateBoardModal = function(){

     $scope.CreateBoardModalShow = false;
   }


////TODO: check to see if that works with put
   $scope.uploadPic = function (file) {
        Upload.upload({
            url: 'upload/url',
            data: {file: file},
            method: 'PUT'
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        });
    };
////////


    $scope.$watch('user.description', function(newVal, oldVal) {
        if (newVal !== oldVal) {
          console.log("sthhhh");
          ///Users.put()
        }
      });


		$scope.searchTextChanged = function(){

			CommonData.setSearchText(angular.element( document.querySelector( '#search_input_text' )).val());
			$location.path('/search');
		}


}]);
