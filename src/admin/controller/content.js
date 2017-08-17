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


    videoAction() {
        return this.display();
    }

    groupAction() {
        return this.display();
    }


    async addAction() {

        let model = this.model('class.remote');
        let classModel = model.getClassModel();
        let data = await classModel.showAllClassAndHide({});
        this._class = JSON.stringify(data);
        return this.display();
    }

    async updateAction(){

        let model = this.model('class.remote');
        let classModel = model.getClassModel();
        let data = await classModel.showAllClassAndHide({});
        this._class = JSON.stringify(data);
        return this.display();

    }

    selectAction() {

        return this.display();

    }

}