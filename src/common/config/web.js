/**
 * Created by admin on 2017/5/10.
 *
 * 网站的配置
 *
 */


export default {
    title: '大伟哥CMS', //网标题
    description: '一个不可描述的网站', //网站介绍
    keywords: '大伟哥', //网站关键词

    //在线发邮件账号配置
    nodemailer: {
        email: '1121744186@qq.com',
        password: 'aeiwgtcwzmzxjied',
        server: 'smtp.qq.com'
    },

    scs: {
        bucket: 'bt2016',
        aws_access_key_id: '2rm72b5NaG3zI8jmZLOq',
        aws_secret_access_key: 'd45dbe6f189494b4ab1b1d40747d4cb62ead543c',
        upload_dir: 'upload'//上传文件的目录结尾不要添加/
    }
}