app.controller('DateRangeController', function($scope, ApiService) {
    $scope.training = { startDate: '', endDate: '' };
    $scope.testing = { startDate: '', endDate: '' };
    $scope.simulation = { startDate: '', endDate: '' };
    $scope.busy = false;
    $scope.ok = false;

    $scope.validate = function() {
        $scope.busy = true;
        
        var body = {
            trainingStart: $scope.training.startDate,
            trainingEnd: $scope.training.endDate,
            testingStart: $scope.testing.startDate,
            testingEnd: $scope.testing.endDate,
            simulationStart: $scope.simulation.startDate,
            simulationEnd: $scope.simulation.endDate,
            datasetType: 'numeric'
        };

        // For now, we'll simulate the validation since the endpoint might be different
        // In a real scenario, you would call the API
        setTimeout(function() {
            $scope.$apply(function() {
                $scope.ok = true;
                $scope.busy = false;
            });
        }, 1000);

        // Uncomment this when the API endpoint is available
        /*
        ApiService.getDateRange(body)
            .then(function(response) {
                if (response.data.success) {
                    $scope.ok = true;
                } else {
                    alert(response.data.message || 'Validation failed');
                    $scope.ok = false;
                }
            })
            .catch(function(error) {
                alert(error.data?.message || 'Validation failed');
                $scope.ok = false;
            })
            .finally(function() {
                $scope.busy = false;
            });
        */
    };

    $scope.nextStep = function() {
        if ($scope.ok) {
            $scope.$parent.nextStep();
        }
    };

    $scope.previousStep = function() {
        $scope.$parent.previousStep();
    };
});
