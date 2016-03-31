import toastr from 'toastr'

export default (app) => {
  app.controller('StreamController', ($scope, $parse, consulService) => {
    $scope.rawKeys = []
    $scope.keys = []
    $scope.keyFilter = undefined // filter needs this initially

    // update
    $scope.editRowIndex = null
    $scope.editKey = null
    $scope.editValue = null
    $scope.isUpdating = false

    // append key
    $scope.appendRowIndex = null
    $scope.appendKeyPrefix = null
    $scope.appendKey = null
    $scope.appendValue = null
    $scope.isAppending = false

    if (!consulService.settings.address || !consulService.settings.token) {
      window.location = '#/settings'
      return
    }

    getKeys($scope, consulService)

    $scope.add = () => window.location = '#/add'

    $scope.showValue = (rowIndex, key, segmentIndex) => {
      const subkey = getSubkey(key, segmentIndex)
      $scope.editRowIndex = rowIndex
      $scope.editKey = subkey
      consulService.getValue(subkey)
        .then((resp) => {
          $scope.editValue = resp.data
        })
        .catch((resp) => {
          if (resp.status === 404) {
            $scope.editValue = null
          } else {
            console.log('error getting value:', resp)
            toastr.error('Error getting value for key')
          }
        })
    }

    $scope.isEditing = (rowIndex, key, segmentIndex, segment) => {
      const subkey = getSubkey(key, segmentIndex)
      return subkey === $scope.editKey && rowIndex === $scope.editRowIndex
    }

    $scope.editCancel = () => {
      $scope.editRowIndex = null
      $scope.editKey = null
      $scope.editValue = null
    }

    $scope.updateKey = (key, value) => {
      $scope.isUpdating = true
      consulService.updateKey(key, value)
        .then((resp) => {
          $scope.editCancel()
          getKeys($scope, consulService)
          toastr.success('Key has been updated')
        })
        .catch((resp) => {
          console.log('error updating key:', resp)
          toastr.error('Error updating key')
        })
        .finally(() => {
          $scope.isUpdating = false
        })
    }

    $scope.deleteKey = (key, segmentIndex) => {
      const subkey = getSubkey(key, segmentIndex)
      return consulService.deleteKey(subkey)
        .then((resp) => {
          getKeys($scope, consulService)
        })
        .catch((resp) => {
          console.log('error deleting key:', resp)
          toastr.error('Error deleting key')
        })
    }

    $scope.updateValue = (rowIndex, key, segmentIndex) => {
      $scope.appendRowIndex = rowIndex
      $scope.appendKeyPrefix = getSubkey(key, segmentIndex)
    }

    $scope.appendCancel = () => {
      $scope.appendRowIndex = null
      $scope.appendKeyPrefix = null
    }

    $scope.append = (keyPrefix, subkey, value) => {
      $scope.isAppending = true
      const key = `${keyPrefix}/${subkey}`
      consulService.updateKey(key, value)
        .then((resp) => {
          $scope.appendCancel()
          getKeys($scope, consulService)
          toastr.success('Key has been appended')
        })
        .catch((resp) => {
          console.log('error appending new key:', resp)
          toastr.error('Error appending new key')
        })
        .finally(() => {
          $scope.isAppending = false
        })
    }
  })
}

const getKeys = ($scope, consulService) => {
  consulService.getKeys()
    .then((resp) => {
      const keys = resp.data
      $scope.rawKeys = keys
      $scope.keys = []
      keys.map((key) => {
        $scope.keys.push(key.split('/'))
      })
    })
    .catch((resp) => {
      console.log('error getting keys:', resp)
      toastr.error('Error getting keys')
    })
}

const getSubkey = (key, segmentIndex) => key.slice(0, segmentIndex + 1).join('/')
