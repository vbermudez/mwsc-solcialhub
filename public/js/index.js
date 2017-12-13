// ES6
import { SocialHubHeader } from './elements/header.js';
import { SocialHubMenuItem } from './elements/menu.js';
import { FacebookAPI } from './apis/facebook.js';
import { TwitterAPI } from './apis/twitter.js';
import { LinkedInAPI } from './apis/linkedin.js';
import { GitHubAPI } from './apis/github.js';

const fb = new FacebookAPI();
const tw = new TwitterAPI();
const li = new LinkedInAPI();
const gh = new GitHubAPI();

window.onload = function() {
    const header = document.querySelector('sh-header');

    header.addEventListener('mnu-click', e => {
        switch (e.detail.resource) {
            case '#facebook':
                fb.isLogedin().then(status => {
                    console.log('isLogedin() ->', status);
                });

                break;

            case '#twitter':
                tw.isLogedin().then(status => {
                    console.log('isLogedin() ->', status);
                });

                break;

            case '#linkedin':
                li.isLogedin().then(status => {
                    console.log('isLogedin() ->', status);
                });

                break;

            case '#github':
                gh.isLogedin().then(status => {
                    console.log('isLogedin() ->', status);
                });

                break;

            default:
                break;
        }
    });
};