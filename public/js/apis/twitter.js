'use strict';

import { AbstractAPI } from './abstract.js';

export class TwitterAPI extends AbstractAPI {
    constructor() {
        super('twitter');
        
    }

    isLogedin() {
        return new Promise((resolve, reject) => {
            resolve(true);
        }); 
    }
}