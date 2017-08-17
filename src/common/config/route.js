/**
 * Created by admin on 2017/5/7.
 *
 * 这样写使用模块下的规则
 */
export default {
    admin: {
        reg: /^(admin|api\/admin)/ //命中 admin 模块的正则
    },
    user: {
        reg: /^(user|api\/user)/
    },
    home: { //默认走 home 模块

    }
}