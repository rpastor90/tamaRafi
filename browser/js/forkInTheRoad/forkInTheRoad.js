// app.config(function ($stateProvider) {
// 	$stateProvider.state('forkInTheRoad', {
// 		url: '/forkInTheRoad',
// 		template: '<img src="http://compellingparade.com/wp-content/uploads/2011/07/Fork_In_The_Road.jpg"/>',
// 		resolve: { 
// 			user: function(Session){
// 				console.log(Session, "Questioning rafi right now")
// 				return 'nonsense'
// 			}
// 		}
// 	})
// })

app.config(function ($stateProvider) {

    $stateProvider.state('forkInTheRoad', {
        url: '/forkInTheRoad',
        template: '<img src="http://compellingparade.com/wp-content/uploads/2011/07/Fork_In_The_Road.jpg"/>',
        controller: function(user, $state) {
     		console.log(user, "Please, finally work")
        	if (user.creature.kind){
        		$state.go('home')
        	} else {
        		$state.go('firstTimeUser')
        	}
        },
        resolve: {
        	user: function (AuthService, $state) {
        		return AuthService.getLoggedInUser()
        			.then(function (user) { 
        				return user;
        			});
        	}
        }
    });

});