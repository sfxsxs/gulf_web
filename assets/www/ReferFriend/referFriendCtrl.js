gulf.controller('referFriendCtrl', function ($scope, $ionicPopup, $rootScope, AddMechanicService, ReferFriendService, $state, ConverBase64, HeaderService, LoaderService, AppService) {

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    var area = userData.area_name;
    var city = userData.city_name;
    var state = userData.state_name;
    var usertype = userData.user_category;
    var mechtype = userData.user_type;
    var userId = userData.usr_pk_id;
    var referedby = userData.usd_firstname;


    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }

    $scope.refer = function () {
        $state.go('AddReferFriend');
    }


    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6" || role == "27") {
            $state.go('Dashboard');
        }
    }

    $scope.addMechanic = function () {
        $state.go('AddMechanic');
    }
    $scope.myProfile = function () {
        $state.go('MyProfile');
    }

    $scope.mechProfile = function () {
        $state.go('UpdateMechanicProfile');
    }

    $scope.couponCode = function () {
        $state.go('CouponCode');
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }
    $scope.referAFriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.gulfCorner = function () {
        $state.go('GulfCorner');
    }
    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus')
    }
    $scope.myorder = function () {
        $state.go('MyOrder');
    }
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        });
    }


    //header


    $scope.checkStatus = true;
    $scope.statusView = false;
    $scope.referFriend = function () {


        // $scope.type = "Referral";

        if ($scope.name != "" && $scope.mobileNo != "" && $scope.name != undefined && $scope.mobileNo != undefined) {
            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.name)) {
                $scope.name = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }
            var mob = ($scope.mobileNo).toString();
            if (mob.length == 10) {

                LoaderService.showLoading();
                AddMechanicService.Referfriend($rootScope.userID, $scope.mobileNo, $scope.name, referedby).then(function (result) {
                    LoaderService.hideLoading();
                    console.log("referctrl");
                    console.log(result);
                    var msg_code = result.message_code;
                    var show_msg = $scope.data.localAppLanguage[msg_code];
                    if (result != "") {
                        if (result.Status == true) {
                            console.log(result.Message);
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Success </b>',
                                template: show_msg
                            });
                            $state.go('MechanicHome');
                            // try {
                            //     TTS
                            //         .speak({
                            //                 text: "You have referred your friend successfully. ",
                            //                 locale: 'en-gb',
                            //                 rate: 0.95
                            //             }, function () {

                            //               //redirect to success screen

                            //             },
                            //             function (reason) {
                            //                 //redirect to success screen

                            //             });
                            // } catch (err) {
                            //    //redirect to success screen
                            // }

                        } else {
                            $ionicPopup.alert({
                                template: show_msg
                            });
                        }
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: "Something Went Wrong Please , Try Again"
                        });
                    }

                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: 'Please Enter valid Mobile Number'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                template: 'Please Enter mandatory Fields'
            });
        }
    }

    $scope.goToReferralStatus = function () {
        $state.go("CheckReferralStatus");
    }
    $scope.logicReport = function () {
        $('#LogicReport').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            "paging": false,
            "ordering": false,
            "info": false,
            "language": {
                "emptyTable": $scope.data.localAppLanguage.no_result_found
            },
            "ajax": {
                url: AppService.url + "api_r3/public/logicreport?state=" + state + "&city=" + city + "&area=" + area + "&usertype=" + usertype + "&mechtype=" + mechtype,
                "type": "GET",
                dataType: "json",
                contentType: "application/json",
                error: function (jqXHR, textStatus, errorThrown) {
                    var alertPopup = $ionicPopup.alert({
                        template: $scope.data.localAppLanguage.server_not_responding_please_try_after_sometime
                    });
                }

            },
            "columns": [
                {
                    "data": "interface"
                },
                {
                    "data": "code_type_vol_value"
                },
                {
                    "data": "no_of_days_vol"
                },
                {
                    "data": "points_earn_vol"
                },

                {
                    "data": "code_type_scan_value"
                },
                {
                    "data": "no_of_days_scan"
                },

                {
                    "data": "points_earn_scan"
                },
                {
                    "data": "code_type_vol_extended_value"
                },

                {
                    "data": "no_days_vol_extended"
                },
                {
                    "data": "points_earn_vol_extended"
                },
                {
                    "data": "code_type_scan_extended_value"
                },
                {
                    "data": "no_days_scan_extended"
                },


                {
                    "data": "points_earn_scan_extended"
                },













            ]

        });

    }
    $scope.logicReport();

    $scope.checkReferalStatus = function () {
        if ($scope.mobileNo == "" && $scope.mobileNo == null && $scope.mobileNo == undefined && $scope.name == "" && $scope.name == null && $scope.name == undefined) {
            $ionicPopup.alert({
                title: '<b> Error </b>',
                template: "Enter Valid Mobile Number"
            });
            return false;
        }
        if ($scope.mobileNo != null && $scope.mobileNo != "" && $scope.mobileNo != undefined) {
            $scope.mString = ($scope.mobileNo).toString();
            $scope.cmobileNo = ConverBase64.convertBase64($scope.mString);
        }

        $scope.checkStatus = false;
        $scope.statusView = true;
        var token = $rootScope.token;
        $('#ReferralSatusReport').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            "paging": false,
            "ordering": false,
            "info": false,
            "language": {
                "emptyTable": $scope.data.localAppLanguage.no_result_found
            },
            "ajax": {
                url: AppService.url + "api_r3/public/chkReffStatusByMech?userId=" + $rootScope.userID + "&mobile=" + $scope.cmobileNo + "&name=" + $scope.name + "&token=" + token,
                "type": "GET",
                dataType: "json",
                contentType: "application/json",
                error: function (jqXHR, textStatus, errorThrown) {
                    var alertPopup = $ionicPopup.alert({
                        template: $scope.data.localAppLanguage.server_not_responding_please_try_after_sometime
                    });
                }

            },
            "columns": [
                {
                    "data": "name"
                },
                {
                    "data": "mobile"
                },
                {
                    "data": "mec_status"
                }

            ]

        });


    }


    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Refer Friend Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})