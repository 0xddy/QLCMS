'use strict';

import Base from '../base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async limitAction() {

        let page = this.get('page');
        let size = this.get('size');
        let  _class = this.model('class');
        let data = await _class.showClass({show:1},page,size);

        return this.success(data);
    }

    async indexAction() {
        let  _class = this.model('class');
        let data = await _class.showAllClass({show:1});
        return this.success(data);
    }


}