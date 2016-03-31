
export default (app) => {
  app.controller('SettingsController', ($scope, consulService) => {
    $scope.address = consulService.settings.address
    $scope.token = consulService.settings.token

    $scope.close = () => {
      consulService.updateSettings({
        address: $scope.address,
        token: $scope.token
      })
      window.location = '#/stream'
    }
  })
}
