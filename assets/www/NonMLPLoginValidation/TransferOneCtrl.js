gulf.controller('TransferOneCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64,
  $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform,
  AppService, AddMechanicService, NonMlpServices) {

  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  $ionicPlatform.registerBackButtonAction(function () {

    ionic.Platform.exitApp();

  }, 100);


  try {
    if (AppService.enableTracking) {
      _paq.push(['setDocumentTitle', "Transfer One Page"]);
      _paq.push(['trackPageView']);
    }
  } catch (err) {
    console.log(err);
  }

  $scope.LoginProceed = function () {
    //$state.go('NonMlpHome');
    $state.go('NewLoginForMLPAndNonMLP');
  }
});