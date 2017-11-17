'use strict';

export class SocialHubHeader extends HTMLElement {
    constructor() {
        super();
    }

    /**
     * Fires when an instance of the element is created.
     * 
     * @event
     */
    createdCallback() {
        this.innerHTML = `<span class="social-hub-logo">
            <img src="imgs/hub-icon-28061.png" alt="Social Hub!">
        </span>
        <span class="social-hub-menu"></span>`;
    }

    /**
     * Fires when the element is inserted into the DOM.
     * 
     * @event
     */
    connectedCallback() {
        
    }

    /**
     * Fires when the element is removed from the DOM.
     * 
     * @event
     */
    disconnectedCallback() {

    }

    /**
     * Fires when an attribute of the element is added, removed, updated, or replaced.
     * 
     * @event
     */
    attributeChangedCallback() {

    }
}

document.registerElement("social-hub-header", SocialHubHeader);