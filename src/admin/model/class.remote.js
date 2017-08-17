/**
 * Created by admin on 2017/6/3.
 */
export default class extends think.model.base {

    updateClass(_class) {
        //跨模块获取 class 模型实例
        let instance = this.model('class',{},'home');
        return instance.updateClass(_class);

    }

    showClass(where,page,size) {
        //跨模块获取 class 模型实例
        let instance = this.model('class',{},'home');
        return instance.showClass(where,page,size);

    }

    deleteClass(id){

        let instance = this.model('class',{},'home');
        return instance.deleteClass(id);

    }

    addClass(data){

        let instance = this.model('class',{},'home');
        return instance.addClass(data);

    }

    getClassModel(){

        return this.model('class',{},'home');
    }


}