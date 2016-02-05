app.controller('HealthCtrl', function($scope, $uibModal, UserFactory, AuthService) {
    $scope.animationsEnabled = true;

    $scope.showHealth = function() {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/health/health.html',
            controller: 'OpenHealthCtrl',
            resolve: {
                user: function(AuthService) {
                    return AuthService.getLoggedInUser();
                }
            }
        });
    };
})
.controller('OpenHealthCtrl', function($scope, user, $uibModalInstance) {

    if (user.jawbone !== undefined) { 
        // visualize user's most recently updated steps for the day
        $scope.steps = user.jawbone.steps;
        $scope.goalSteps = 10000;
        var stepsDifference = ($scope.goalSteps - $scope.steps);
        $scope.stepsPercentDiff = ($scope.steps / $scope.goalSteps) * 100;

        // visualize user's most recently updated sleep for the day
        $scope.sleep = user.jawbone.sleep;
        $scope.goalSleep = 480;
        var sleepDifference = ($scope.goalSleep - $scope.sleep);
        $scope.sleepPercentDiff = ($scope.sleep / $scope.goalSleep) * 100;
    }

    else if (user.fitbit !== undefined) {
        // visualize user's most recently updated steps for the day
        $scope.steps = user.fitbit.steps;
        $scope.goalSteps = 10000;
        var stepsDifference = ($scope.goalSteps - $scope.steps);
        $scope.stepsPercentDiff = ($scope.steps / $scope.goalSteps) * 100;

        // visualize user's most recently updated sleep for the day
        $scope.sleep = user.fitbit.sleep;
        $scope.goalSleep = 480;
        var sleepDifference = ($scope.goalSleep - $scope.sleep);
        $scope.sleepPercentDiff = ($scope.sleep / $scope.goalSleep) * 100;        
    }
    $scope.labels1 = ["stepped", "steps left"];
    $scope.labels2 = ["slept", "more sleep?"];
    $scope.stepsData = [$scope.steps, stepsDifference];
    $scope.sleepData = [$scope.sleep, sleepDifference];

})

// $scope.user = user;
// $scope.steps = user.jawbone.steps;
// $scope.goalSteps = 10000;
// var stepsDifference = ($scope.goalSteps - $scope.steps);
// if (stepsDifference < 0) {
//     stepsDifference = 0;
// }
// $scope.stepsPercentDiff = ($scope.steps / $scope.goalSteps) * 100;
// $scope.sleep = user.jawbone.sleep;
// $scope.goalSleep = 480;
// var sleepDifference = ($scope.goalSleep - $scope.sleep);
// if (sleepDifference < 0) {
//     sleepDifference = 0;
// }
// $scope.sleepPercentDiff = ($scope.sleep / $scope.goalSleep) * 100;

// $scope.stepsData = [{
//     value: $scope.steps,
//     color: "#F7464A",
//     highlight: "#FF5A5E",
//     label: 'STEPPED'
// }, {
//     value: stepsDifference,
//     color: "#46BFBD",
//     highlight: "#5AD3D1",
//     label: "LEFT TO GOAL"
// }];

// $scope.sleepData = [{
//     value: $scope.sleep,
//     color: "#F7464A",
//     highlight: "#FF5A5E",
//     label: 'SLEPT'
// }, {
//     value: sleepDifference,
//     color: "#46BFBD",
//     highlight: "#5AD3D1",
//     label: "LEFT TO GOAL"
// }];

// var doughnutOptions = {
//     //Boolean - Whether we should show a stroke on each segment
//     segmentShowStroke: true,
//     //String - The colour of each segment stroke
//     segmentStrokeColor: "#fff",
//     //Number - The width of each segment stroke
//     segmentStrokeWidth: 2,
//     //The percentage of the chart that we cut out of the middle.
//     percentageInnerCutout: 50,
//     //Boolean - Whether we should animate the chart 
//     animation: true,
//     //Number - Amount of animation steps
//     animationSteps: 100,
//     //String - Animation easing effect
//     animationEasing: "easeOutBounce",
//     //Boolean - Whether we animate the rotation of the Doughnut
//     animateRotate: true,
//     //Boolean - Whether we animate scaling the Doughnut from the centre
//     animateScale: true,
//     //Function - Will fire on animation completion.
//     onAnimationComplete: null
// }

// var doughnut1 = document.getElementById('doughnut1').getContext("2d")
// var doughnut2 = document.getElementById('doughnut2').getContext("2d")

// var myLine = new Chart(doughnut1).Doughnut($scope.stepsData, doughnutOptions);
// var myLine2 = new Chart(doughnut2).Doughnut($scope.sleepData, doughnutOptions);