'use strict';
/**
 * relation model
 */
export default class extends think.model.base {



    addVideo(video){
        //跨模块获取 user 模型实例
        let instance = this.model('video',{},'home');
        return instance.addVideo(video);

    }

    updateVideo(video){

        let instance = this.model('video',{},'home');
        return instance.updateVideo(video);
    }

    delVideo(id){

        let instance = this.model('video',{},'home');

        return instance.delVideo(id);
    }

    showVideo(where, order, page, size){
        let instance = this.model('video',{},'home');

        return instance.showAllList(where, order, page, size);

    }


}