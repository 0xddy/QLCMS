/**
 * Created by admin on 2017/5/12.
 */
'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {
    init(...args) {
        super.init(...args);
        this.pk = 'id';

        this.relation = {


            class: {
                type: think.model.HAS_ONE,
                key: 'class_id',
                fKey: 'id',
                field: 'id,title,show',
                relation: false
            }

        };

    }

    addVideo(video) {
        return this.add(video);
    }

    updateVideo(video) {

        return this.where({id: video['id']}).update(video);
    }

    async delVideo(id) {

        console.log('id---' + id);
        let a = {
            id: id
        };
        let where = {
            where: a
        };

        return this.setRelation(false).delete(where);
    }

    showList(where, order, page, size) {

        return this.fieldReverse(['path']).where(where).order(order).page(page, size).countSelect();
    }

    showAllList(where, order, page, size){

        console.log(where,order,page,size);

        return this.where(where).order(order).page(page, size).countSelect();
    }
}