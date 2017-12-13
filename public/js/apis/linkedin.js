'use strict';

import { AbstractAPI } from './abstract.js';

export class LinkedInAPI extends AbstractAPI {
    constructor() {
        super('linkedin');
        
    }

    isLogedin() {
        return new Promise((resolve, reject) => {
            resolve(true);
        }); 
    }
}