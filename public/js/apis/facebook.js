'use strict';

import { AbstractAPI, ConnectionStatus } from './abstract.js';

export class FacebookAPI extends AbstractAPI {
    /**
     * You'll need to change the appId in order to work...
     * 
     * @constructor
     * @param {string} appId Facebook's API appId for your application.
     * @param {string} version Facebook's API version.
     */
    constructor(appId = '1357060867755099', version = 'v2.11') {
        super('facebook');

        window.fbAsyncInit = function() {
            FB.init({
                appId      : appId,
                cookie     : true,
                xfbml      : true,
                version    : version
            });
            
            FB.AppEvents.logPageView();      
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    /**
     * Checks if the user is logged to facebook ...
     * 
     * @method
     * @returns a Promise with a ConnectionStatus object.
     */
    isLogedin() {
        return new Promise((resolve, reject) => {
            FB.getLoginStatus(function(response) {
                const status = new ConnectionStatus(response.status === 'connected', response.authResponse || null, this.type);

                resolve(status);
                /* response example
                {
                    status: 'connected', // can be connected, not_authorized, unknown
                    authResponse: { // only included when status == 'connected'
                        accessToken: '...',
                        expiresIn:'...',
                        signedRequest:'...',
                        userID:'...'
                    }
                }
                */
            });
        });
    }
}