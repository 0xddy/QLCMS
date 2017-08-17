'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {

        return this.display();
    }

    updateAction(){

        this.id = this.get('id');
        this.title = this.get('title');
        this.status = this.get('status');
        return this.display();

    }

    addAction(){
        return this.display();
    }

}