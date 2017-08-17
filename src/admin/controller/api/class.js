'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {

        let _class = this.post();
        let _classId = _class['id'];
        if (_class['show'] != undefined) {
            if (_class['show'] != '1' && _class['show'] != '0') {
                _class['show'] = '1';
            }
        }
        if (think.isEmpty(_classId)) {
            //添加新数据
            try {
                _class['createAt'] = new Date().getTime();
                let classModel = this.model('class.remote');
                let insertId = await classModel.addClass(_class);
                return this.success({'insertId': insertId});
            } catch (e) {
                return this.fail(233, '添加数据失败' + e);
            }


        } else {
            //修改数据
            let classModel = this.model('class.remote');
            let data = await classModel.updateClass(_class);
            return this.success(data);
        }


    }

    async limitAction() {

        let page = this.post('page');
        let size = this.post('size');
        let _class = this.model('class.remote');
        let data = await _class.showClass({}, page, size);

        return this.success(data);
    }

    async deleteAction() {

        let ids = this.post('ids');
        let tempArr = ids.split('%');
        let _class = this.model('class.remote');

        try {
            await _class.startTrans();
            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i] != '') {
                    let data = await _class.deleteClass(tempArr[i]);
                }
            }
            await _class.commit();
            return this.success('删除成功');
        } catch (e) {
            await _class.rollback();
            return this.success('删除失败，操作已回滚');
        }

    }


}