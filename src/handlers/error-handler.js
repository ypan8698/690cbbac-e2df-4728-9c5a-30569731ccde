const {MessageType} = require('../utils/constants.js') 
class ErrorHandler {
    error(err, message) {
        try {
          this._handleMessage(MessageType.Error, err, message)
        } catch (ignored) {}
      }
    
    warning(err, message) {
        try {
          this._handleMessage(MessageType.Warning, err, message)
        } catch (ignored) {}
      }
    
    _handleMessage(type, err, msg = '') {
        if (msg) {
          console.log(`ERROR: ${msg}`)
        }   
        if (err) {
          switch (type) {
            case MessageType.Warning:
              console.warn("WARNING:"+ err)
              break
            case MessageType.Error:
              console.error("ERROR:"+ err)
              break
            default:
              console.error("ERROR:"+ err)
          }
        }
      }
}

module.exports = ErrorHandler