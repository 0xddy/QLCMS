'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * index action logic
     * @return {} []
     */
    addAction() {

        if(!this.isPost()){

            return this.fail(233,'只允许POST请求');
        }



        console.log('indexAction logic')
    }


    indexAction(){



    }

    
}