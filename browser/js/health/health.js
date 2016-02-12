app.controller('HealthCtrl', ['$uibModal', function ($scope, $uibModal, UserFactory) {
    $scope.animationsEnabled = true;

    $scope.showHealth = function () {
        console.log("this is the uibModal", $uibModal);
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/health/health.html',
            controller: 'OpenHealthCtrl',
            resolve: {
                user: function () {
                    return UserFactory.getUser();
                }
            }
        });
    };
}])
.controller('OpenHealthCtrl', ['$uibModalInstance', function ($scope, user, $uibModalInstance) {
    // set goals

    
    $scope.goalSteps = user.animal.stepsGoal;
    $scope.goalSleep = user.animal.sleepGoal;

    if (user.fitness === 'jawbone') {
        // visualize user's most recently updated steps for the day
        $scope.steps = user.jawbone.steps;

        // visualize user's most recently updated sleep for the day
        $scope.sleep = (user.jawbone.sleep/60).toFixed(1);
    }
    else if (user.fitness === 'fitbit') {
        // visualize user's most recently updated steps for the day
        $scope.steps = user.fitbit.steps;

        // visualize user's most recently updated sleep for the day
        $scope.sleep = (user.fitbit.sleep/60).toFixed(1);
    }

    var stepsDifference = ($scope.goalSteps - $scope.steps);
    $scope.stepsPercentDiff = ($scope.steps / $scope.goalSteps) * 100;

    var sleepDifference = ($scope.goalSleep - $scope.sleep).toFixed(1);

    $scope.sleepPercentDiff = ($scope.sleep / $scope.goalSleep) * 100;
    if ($scope.sleepPercentDiff > 100) {
        $scope.sleepPercentDiff = 0;
    }

    $scope.labels1 = ["stepped", "steps left"];
    $scope.labels2 = ["hours slept", "more sleep?"];
    $scope.stepsData = [$scope.steps, stepsDifference];
    $scope.sleepData = [$scope.sleep, sleepDifference];

    $scope.weighted = ((7 * $scope.stepsPercentDiff) + (3 * $scope.sleepPercentDiff)) / 10;
}]);