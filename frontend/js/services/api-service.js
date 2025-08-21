app.service('ApiService', function($http, API_BASE_URL) {
    
    this.uploadDataset = function(file, datasetType) {
        var formData = new FormData();
        formData.append('File', file);
        formData.append('DatasetType', datasetType || 'numeric');
        
        return $http.post(API_BASE_URL + '/api/upload-dataset', formData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        });
    };

    this.getDateRange = function(request) {
        return $http.post(API_BASE_URL + '/api/date-range', request);
    };

    this.trainModel = function(request) {
        return $http.post(API_BASE_URL + '/api/train-model', request);
    };

    this.runSimulation = function(request) {
        return $http.post(API_BASE_URL + '/api/simulation', request);
    };
});
