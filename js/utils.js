var Utils = {
    getJson: function(options) {
        options['contentType'] = 'application/json; charset=utf-8';
        options['data'] = options.data;
        options['type'] = 'GET';

        return $.ajax(options);
    },
}

export default Utils;
