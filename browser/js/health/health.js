app.controller('HealthCtrl', function ($scope, $uibModal) {
    $scope.animationsEnabled = true;

    $scope.showHealth = function() {
        $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/js/health/health.html',
            controller: 'OpenHealthCtrl',
            resolve: {
                user: function (UserFactory) {
                    return UserFactory.getUser();
                }
            }
        });
    };
})
.controller('OpenHealthCtrl', function ($scope, user, $uibModalInstance) {
    $scope.onDisplay = 0;
    // set goals
    $scope.goalSteps = user.animal.stepsGoal;
    $scope.goalSleep = user.animal.sleepGoal;

    if (user.jawbone !== undefined) { 
        // visualize user's most recently updated steps for the day
        $scope.steps = user.jawbone.steps;

        // visualize user's most recently updated sleep for the day
        $scope.sleep = (user.jawbone.sleep/60).toFixed(1);
    }

    else if (user.fitbit !== undefined) {
        // visualize user's most recently updated steps for the day
        $scope.steps = user.fitbit.steps;

        // visualize user's most recently updated sleep for the day
        $scope.sleep = (user.fitbit.sleep/60).toFixed(1);
    }

    var stepsDifference = ($scope.goalSteps - $scope.steps);
    $scope.stepsPercentDiff = ($scope.steps / $scope.goalSteps) * 100;

    var sleepDifference = ($scope.goalSleep - $scope.sleep).toFixed(1);
    $scope.sleepPercentDiff = ($scope.sleep / $scope.goalSleep) * 100;

    $scope.labels1 = ["stepped", "steps left"];
    $scope.labels2 = ["hours slept", "more sleep?"];
    $scope.stepsData = [$scope.steps, stepsDifference];
    $scope.sleepData = [$scope.sleep, sleepDifference];

    $scope.weighted = ((7 * $scope.stepsPercentDiff) + (3 * $scope.sleepPercentDiff)) / 10;

// The following is for the weekly data
    $('#weekStepsChart')

    $scope.days = ["1","2","3","4","5","6","7"];
 
    var steps =[10000, 8000, 12000, 5000, 9000, 11500, 11125];
    var money = steps.map(function(num) {
        return (num/50);
    })
    // Chart.defaults.global.colours[1] = '#cc9900';
    $scope.weekSteps = [steps, money];
    $scope.weekSleep = [[400, 500, 480, 250, 300, 600, 640]];
    $scope.series = ['Steps','Coins earned']
    $scope.nextData = function() {
        Chart.defaults.global.colours[1] = "#97BBCD";
        console.log(Chart.defaults.global.colours)
        $scope.onDisplay = ($scope.onDisplay >= 2) ? 2 : ($scope.onDisplay+1);
        $('.health-area').css({'background-image': 'none','background-color':'white'});
        
    };
     $scope.prevData = function() {
        Chart.defaults.global.colours[1] = "#CDCDCD";
        $scope.onDisplay = ($scope.onDisplay <= 0) ? 0 : ($scope.onDisplay-1);
        if ($scope.onDisplay === 0){
            
            $('.health-area').css('background','url("http://i.imgur.com/BNpVeae.jpg")');
            $('.health-area').css('background-position','-150px -400px')
            $('.health-area').css('background-size','1000px');    
        }
        
    };

    $scope.chartHover = function() {
        console.log("hovered over chart")
    }

















})
