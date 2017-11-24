'use strict';

export class SocialHubHeader extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'closed'});
        
        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    height: 49px;
                    margin: 0;
                    padding: 0 13px 0 0;
                    background-color: #f3f3f3;
                    position: fixed;
                    width: 100%;
                    z-index: 905;
                    top: 0;
                    border-bottom: 1px solid rgba(0,0,0,.3);
                    box-shadow: -11px 12px 23px rgba(0,0,0,.1);
                }

                .sh-logo {
                    display: inline-block;
                    vertical-align: middle;
                    height: 49px;
                    /* float: left; */
                    width: 50px;
                }

                .sh-logo > img {
                    margin: 7px 0 0 7px;
                    max-width: 32px;
                }

                .sh-menu {
                    display: inline-block;
                }

                .h-menu > ul {
                    padding-left: 1px;
                    margin-top: 0;
                    margin-bottom: 9px;
                }
            </style>
            <span class="sh-logo">
                <img src="imgs/hub-icon-28061.png" alt="Social Hub!">
            </span>
            <span class="sh-menu">
                <slot name="menu-item"></slot>
            </span>
        `;
        this._logoElement = shadowRoot.querySelector('.sh-logo');
        this._menuElement = shadowRoot.querySelector('.sh-menu');
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
        const mnuItems = this.querySelectorAll('sh-menu-item');

        for (const mnu of mnuItems) {
            mnu.addEventListener('click', e => {
                e.preventDefault();

                const evtData = { detail: { resource: e.target.getAttribute('href') } };

                this.dispatchEvent( new CustomEvent('mnu-click', evtData) );

                return false;
            });
        }
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

customElements.define('sh-header', SocialHubHeader);