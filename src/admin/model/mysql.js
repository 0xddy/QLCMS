'use strict';
/**
 * relation model
 */
export default class extends think.model.base {

    execute(sql) {
        return this.query(sql);
    }


}