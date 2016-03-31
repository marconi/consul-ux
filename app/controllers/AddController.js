import toastr from 'toastr'

export default (app) => {
  app.controller('AddController', ($scope, consulService) => {
    $scope.key = null
    $scope.value = null
    $scope.isSubmitting = false

    $scope.create = () => {
      $scope.isSubmitting = true
      consulService.updateKey($scope.key, $scope.value)
        .then((resp) => {
          toastr.success('Key has been added')
          $scope.key = null
          $scope.value = null
        })
        .catch((resp) => {
          console.log('error adding key:', resp)
          toastr.error('Error adding key')
        })
        .finally(() => {
          $scope.isSubmitting = false
        })
    }

    $scope.cancel = () => {
      $scope.key = null
      $scope.value = null
      window.location = '#/stream'
    }
  })
}
