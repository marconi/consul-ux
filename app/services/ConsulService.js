
export default (app) => {
  app.factory('consulService', ($http) => {
    const settings = {
      address: null,
      token: null
    }

    const getKeys = () => {
      return $http.get(`${settings.address}/kv/?token=${settings.token}&keys`)
    }

    const updateSettings = ({address, token}) => {
      settings.address = address
      settings.token = token
    }

    const getValue = (key) => {
      return $http.get(`${settings.address}/kv/${key}?token=${settings.token}&raw`)
    }

    const updateKey = (key, value) => {
      return $http.put(`${settings.address}/kv/${key}?token=${settings.token}`, value)
    }

    const deleteKey = (key) => {
      return $http.delete(`${settings.address}/kv/${key}?token=${settings.token}&recurse`)
    }

    return {
      settings: settings,
      getKeys: getKeys,
      updateSettings: updateSettings,
      getValue: getValue,
      updateKey: updateKey,
      deleteKey: deleteKey
    }
  })
}
