// ES6
import { SocialHubHeader } from './elements/header.js';
import { SocialHubMenuItem } from './elements/menu.js';

// FACEBOOK API
window.fbAsyncInit = function() {
    FB.init({
        appId      : '1357060867755099', // You'll need to change by your own!
        cookie     : true,
        xfbml      : true,
        version    : 'v2.11'
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
// FACEBOOK API

function isLogedin() {
    FB.getLoginStatus(function(response) {
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
        console.log(response);
    });
}

window.onload = function() {
    const header = document.querySelector('sh-header');

    header.addEventListener('mnu-click', e => {
        switch (e.detail.resource) {
            case '#facebook':
                isLogedin();

                break;

            default:
                break;
        }
    });
};