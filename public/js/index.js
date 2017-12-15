// ES6
import { SocialHubHeader } from './elements/header.js';
import { SocialHubMenuItem } from './elements/menu.js';
import { FacebookAPI } from './apis/facebook.js';
import { TwitterAPI } from './apis/twitter.js';
import { LinkedInAPI } from './apis/linkedin.js';
import { GitHubAPI } from './apis/github.js';
import { Database, ObjectStore, ObjectStoreSpec } from './db/indexeddb.js';

const fb = new FacebookAPI();
const tw = new TwitterAPI();
const li = new LinkedInAPI();
const gh = new GitHubAPI();
const osSpec = new ObjectStoreSpec('facebookAPI', { keyPath: 'userID' });

window.onload = function() {
    const header = document.querySelector('sh-header');

    header.addEventListener('mnu-click', e => {
        switch (e.detail.resource) {
            case '#facebook':
                fb.isLogedin().then(status => {
                    console.log('isLogedin() ->', status);

                    if (!status.connected) {
                        return fb.login({ scope: 'public_profile,email' })
                    }

                    return status;
                }).then(status => {
                    console.log('login() ->', status);

                    if (status.connected) {
                        return Database.open('MWSC-SOLCIALHUB', 1, osSpec).then(db => {
                            return [db, status.response];
                        });
                    }

                    return [false, false];
                }).then(result => {
                    const [db, obj] = result;

                    if (db) {
                        return db.objectStore('facebookAPI').put(obj);
                    }

                    return false;
                }).then(resp => {
                    console.log('Record inserted:', resp);
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