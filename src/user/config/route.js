/**
 * Created by admin on 2017/5/7.
 *
 * 模块/路由/action
 *
 */

export default [

    ["api/user/email", {post: "user/api/tools/email"}],
    ['api/user/password',{post:'user/api/tools/password'}],
    //['api/user/login',{post:'user/api/login'}],
    //['api/user/update',{post:'user/api/update'}]
    [/^api\/user\/([\s\S]*)$/,'user/api/:1']


];