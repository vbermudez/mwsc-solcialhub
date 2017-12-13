'use strict';

/**
 * I know! Not really an abstract ... 
 * But a simple mechanism to force the "implementation" of a method!
 * 
 * @class
 */
export class AbstractAPI {
    /**
     * Empty constructor
     * 
     * @constructor
     * @param {string} type Just for info ... or logging ... 
     */
    constructor(type = 'none') {
        this.type = type;
    }

    /**
     * Must implement!
     * 
     * The promise should resolve with a ConnectionStatus class ...
     * 
     * @method
     * @returns a Promise object
     */
    isLogedin() {
        throw new Error('You have to implement the method isLogedin()!'); 
    }
}

/**
 * Response for connections status methods
 * 
 * @class
 */
export class ConnectionStatus {
    /**
     * Empty constructor
     * 
     * @constructor
     */
    constructor(connected = false, response = {}, type = 'none') {
        this.connected = connected;
        this.response = response;
        this.type = type;
    }
}
