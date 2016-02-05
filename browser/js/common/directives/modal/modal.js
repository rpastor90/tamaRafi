app.controller('ModalCtrl', function ($scope, $uibModal, UserFactory, AuthService) {
	$scope.animationsEnabled = true;

	$scope.open = function () {
		$uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: '/js/common/directives/modal/modal.html',
			size: 'lg',
			controller: 'mInstanceCtrl'
		});
	};
})

.controller('mInstanceCtrl', function ($scope, $uibModalInstance) {
	$scope.close = function () {
		$uibModalInstance.close();
	}
})