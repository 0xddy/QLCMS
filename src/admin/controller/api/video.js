'use strict';

import Base from './base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async addAction() {

        let title = this.post('title');
        let class_id = this.post('class_id');
        let time = this.post('time');
        let createTime = this.post('createTime');//主动选择时间
        let introduce = this.post('introduce');//介绍详情
        let status = this.post('status');//完结或者连载ing
        let hot = this.post('hot');//热度，访问
        let is_group = this.post('is_group');//是否是分组
        let group_id = this.post('group_id');//属于x分组
        let is_banner = this.post('is_banner');//是不是轮播
        let banner = this.post('banner');//轮动图片
        let logo = this.post('logo');//封面
        let onlion_play = this.post('online_play');//是否直链播放
        let extend = this.post('extend');//扩展字段
        let is_top = this.post('is_top');//是否推荐
        let path = this.post('path');//视频直链地址
        var video = {};
        if (think.isEmpty(createTime) || isNaN(createTime))
            createTime = new Date().getTime();
        video['createTime'] = createTime;
        video['time'] = time;
        video['class_id'] = class_id;
        video['title'] = title;
        video['introduce'] = introduce;
        if (!think.isEmpty(status))
            video['status'] = status;
        if (!think.isEmpty(hot))
            video['hot'] = hot;
        if (!think.isEmpty(is_group))
            video['is_group'] = is_group;
        if (!think.isEmpty(group_id))
            video['group_id'] = group_id;
        if (!think.isEmpty(is_banner))
            video['is_banner'] = is_banner;
        video['banner'] = banner;
        video['logo'] = logo;
        video['online_play'] = onlion_play;
        video['extend'] = extend;
        video['is_top'] = is_top;
        video['path'] = path;

        let model = this.model('video.remote');
        let insertId = await model.addVideo(video);

        return this.success(insertId);
    }

    async updateAction() {
        let video = this.post();
        let model = this.model('video.remote');
        let affectedRows = await model.updateVideo(video);
        return this.success(affectedRows);
    }


    async deleteAction() {

        let ids = this.post('ids');
        let tempArr = ids.split('%');
        let model = this.model('video.remote');

        try {
            await model.startTrans();
            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i] != '') {
                    let affectedRows = await model.delVideo(tempArr[i]);
                }
            }
            await model.commit();
            return this.success('删除成功');
        } catch (e) {
            await _class.rollback();
            return this.success('删除失败，操作已回滚');
        }

    }


    indexAction() {

        this.fail(233, '你好啊~~，你可能走错路了');
    }

    async listAction() {
        let vid = this.post('vid');
        let class_id = this.post('class_id');//分类id
        let is_group = this.post('is_group');//分组or内容
        let orderType = Number(this.post('order'));//排序规则
        let is_top = Number(this.post('is_top'));//是否只查询置顶
        let is_banner = Number(this.post('is_banner'));
        let keyword = this.post('keyword');
        let page = this.post('page');
        let size = this.post('size');
        let where = {};
        let order = {};
        //指定获取某个分类下的内容
        if (!think.isEmpty(class_id)) {
            where['class_id'] = class_id;
        }
        if (!think.isEmpty(keyword)) {
            where['title'] = ['like', keyword];
        }
        if(!think.isEmpty(vid)){
            where['id'] = vid;
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
        } else if (orderType == 3) {
            order['id'] = 'DESC';
        } else if (orderType == -3) {
            order['id'] = 'ASC';
        }
        //筛选置顶
        if (is_top == 1) {
            where['is_top'] = 1;
        }
        //是否是banner
        if (is_banner == 1) {
            where['is_banner'] = 1;
        }
        let video = this.model('video.remote');
        let data = await
            video.showVideo(where, order, page, size);
        return this.success(data);

    }


}