const moment = require('moment');

//Le doy por intermedio de esta funcion el formato al Mensaje de Chat
function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;