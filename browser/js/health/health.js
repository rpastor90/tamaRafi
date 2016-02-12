app.controller('HealthCtrl', function ($scope, $uibModal, UserFactory) {
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
})
.controller('OpenHealthCtrl', function ($scope, user) {
    // set goals

    
    $scope.goalSteps = user.animal.stepsGoal;
    $scope.goalSleep = user.animal.sleepGoal;

    // visualize user's most recently updated steps for the day
    $scope.steps = user[user.fitness].steps
    // visualize user's most recently updated sleep for the day
    $scope.sleep = (user[user.fitness].sleep/60).toFixed(1);

    var stepsDifference = ($scope.goalSteps - $scope.steps);
    $scope.stepsPercentDiff = ($scope.steps / $scope.goalSteps) * 100;

    var sleepDifference = ($scope.goalSleep - $scope.sleep).toFixed(1);

    $scope.sleepPercentDiff = ($scope.sleep / $scope.goalSleep) * 100;
    if ($scope.sleepPercentDiff > 100) {
        $scope.sleepPercentDiff = 0;
    }

    $scope.labels1 = ["stepped", "steps left"];
    $scope.labels2 = ["hours slept", "more sleep"];

    $scope.stepsData = [$scope.steps, stepsDifference];
    $scope.sleepData = [$scope.sleep, sleepDifference];

    $scope.weighted = ((7 * $scope.stepsPercentDiff) + (3 * $scope.sleepPercentDiff)) / 10;

    // The following is for the weekly data

    var fitness = user.fitness;

    // Get weekly steps and sleep from resolved user

    var weekSteps = user[fitness].weekSteps.map(function(stepObj) {
        return stepObj.steps;
    });
    var weekStepsLabels = user[fitness].weekSteps.map(function(stepObj) {
        return stepObj.date.split(" ")[0];
    });

    $scope.days = weekStepsLabels;
   
    var weekSleep = user[fitness].weekSleep.map(function(sleepObj) {
        return (sleepObj.minutes/60).toFixed(2);
    });
    var money = weekSteps.map(function(num) {
        return Math.floor(num/50);
    });
    var powerUps = user[fitness].weekSleep.map(function(sleepObj) {
        return (sleepObj.minutes/100).toFixed(2);
    });
    
    // keeping tracks of arrowing through health data
    $scope.onDisplay = 0;
    $scope.weekStepsData = [weekSteps, money];
    $scope.weekSleepData = [weekSleep, powerUps];
    // Setting labels
    $scope.series1 = ['Steps','Coins earned'];
    $scope.series2 = ['Sleep (in hours)', 'Tug-of-war pull-factor'];

    $('.health-area').css('background','url("http://i.imgur.com/BNpVeae.jpg")');
    $('.health-area').css('background-position','-150px -400px');
    $('.health-area').css('background-size','1000px');

    // Functions for arrowing through health data

    $scope.nextData = function() {
        $scope.onDisplay = ($scope.onDisplay >= 2) ? 2 : ($scope.onDisplay+1);
        $('.health-area').css({'background-image': 'none','background-color':'white'});
        
    };
     $scope.prevData = function() {
        $scope.onDisplay = ($scope.onDisplay <= 0) ? 0 : ($scope.onDisplay-1);
        if ($scope.onDisplay === 0){
            $('.health-area').css('background','url("http://i.imgur.com/BNpVeae.jpg")');
            $('.health-area').css('background-position','-150px -400px')
            $('.health-area').css('background-size','1000px');    
        };
        
    };
});
