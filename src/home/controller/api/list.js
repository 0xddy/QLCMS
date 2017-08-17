'use strict';

import Base from '../base.js';

export default class extends Base {
    /**
     * index action
     * 获取视频列表
     * @return {Promise} []
     */
    async indexAction() {
        let class_id = this.post('class_id');//分类id
        let is_group = this.post('is_group');//分组or内容
        let orderType = Number(this.post('order'));//排序规则
        let is_top = Number(this.post('is_top'));//是否只查询置顶
        let is_banner = Number(this.post('is_banner'));
        let like = this.post('like');//{title: ['like', '%welefen%']}
        let page = this.post('page');
        let size = this.post('size');

        let where = {};
        let order = {};
        //like查询
        if(!think.isEmpty(like)){
            try {
                where['title'] = ['like',like];
            } catch (e) {
                console.error(e)
            }
        }

        //指定获取某个分类下的内容
        if (!think.isEmpty(class_id)) {
            where['class_id'] = class_id;
        }
        //是筛选分组还是视频，为空则全部
        if (!think.isEmpty(is_group)) {
            where['is_group'] = is_group;
        }

        //排序规则
        if (orderType == 1) {
            //时间倒序
            order['time'] = 'DESC';
        } else if (orderType == -1) {
            //时间正序
            order['time'] = 'ASC';
        } else if (orderType == 2) {
            //热门倒序排序
            order['hot'] = 'DESC';
        } else if (orderType == -2) {
            order['hot'] = 'ASC';
        }
        //筛选置顶
        if (is_top == 1) {
            where['is_top'] = 1;
        }
        //是否是banner
        if (is_banner == 1) {
            where['is_banner'] = 1;
        }

        console.log(where);
        console.log(order);
        let video = this.model('video');
        let data = await video.showList(where, order, page, size);

        return this.success(data);
    }


}