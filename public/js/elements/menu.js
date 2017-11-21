'use strict';

export class SocialHubMenuItem extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'closed'});

        shadowRoot.innerHTML = `
            <style>
                :host {
                    position: relative;
                    height: auto !important;
                    padding: 0 !important;
                    display: inline-block;
                    float: left;
                    overflow: visible;                    
                }

                .sh-menu-item {
                    text-decoration: none;
                }

                .sh-active {
                    
                }
            </style>
            <a href="#" class="sh-menu-item"></a>
        `;
        this._aElement = shadowRoot.querySelector('.sh-menu-item');
    }

    /**
     * Fires when an instance of the element is created.
     * 
     * @event
     */
    createdCallback() {
        
    }

    /**
     * Fires when the element is inserted into the DOM.
     * 
     * @event
     */
    connectedCallback() {
        const href = this.hasAttribute('href') ? 
                        this.getAttribute('href') : '#';
                        
        this._aElement.setAttribute('href', href);
        this._aElement.innerHTML = this.innerHTML;
        this.innerHTML = '';
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

customElements.define('sh-menu-item', SocialHubMenuItem);