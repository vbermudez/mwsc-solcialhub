'use strict';

import { AbstractAPI } from './abstract.js';

export class GitHubAPI extends AbstractAPI {
    constructor() {
        super('github');
                
    }

    isLogedin() {
        return new Promise((resolve, reject) => {
            resolve(true);
        }); 
    }
}