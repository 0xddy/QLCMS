'use strict';
/**
 * Created by admin on 2017/5/11.
 */

export default class extends think.model.relation {

    init(...args) {
        super.init(...args);
        this.pk = 'id'; //将主键字段设置为 id
    }


    showClass(where, page, size) {

        return this.where(where).page(page, size).order('id DESC').countSelect();
    }

    showAllClass(where) {

        return this.where(where).order('id DESC').select();
    }

    //显示全部数据包括隐藏的
    showAllClassAndHide(where) {
        return this.where(where).order('id DESC').countSelect();
    }

    updateClass(_class) {
        _class['updateAt'] = new Date().getTime();
        return this.where({id: _class['id']}).update(_class);
    }

    deleteClass(id){

        return this.where({id: id}).delete();
    }

    addClass(data){

        return this.add(data);
    }

}