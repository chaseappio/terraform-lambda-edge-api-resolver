'use strict';

exports.handler = (event, context, callback) => {

    let path = require('path');
    let {readFileSync} = require('fs');

    const params = path.resolve('params.json');

    const configString = readFileSync(params).toString();
    const config = JSON.parse(configString);

    const request = event.Records[0].cf.request;

    request.headers['host'] = [{ key: 'host', value: config.host }];

    if(request.uri.startsWith(config.apiPath)){
        request.uri = request.uri.substring(config.apiPath.length);
    }

    callback(null,request);
};
