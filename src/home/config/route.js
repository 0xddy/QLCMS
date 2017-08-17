/**
 * Created by admin on 2017/5/7.
 */

export default [

    ["api/class/:page/:size", {get: "home/api/class/limit"}],
    ["api/class", {get: "home/api/class"}],
    ["api/list/:page/:size", {post: "home/api/list/index"}]
];