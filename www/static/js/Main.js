/**
 * Created by admin on 2017/6/8.
 */

layui.use(['layer','form','laypage'], function () {
});


//登录页
//修改密码
var updatePwdFunc = function (v) {

    let email = $('input[name="email2"]').val();
    let vfCode = $('input[name="vf"]').val();
    let newpwd = $('input[name="newpwd"]').val();
    let newpwd2 = $('input[name="newpwd2"]').val();
    if (email == '') {
        showMsg('邮箱不能为空');
        return;
    }
    if (vfCode == '') {
        showMsg('验证码不能为空');
        return;
    }
    if (newpwd == '') {
        showMsg('密码不能为空');
        return;
    }
    if (newpwd2 == '') {
        showMsg('请重复输入密码');
        return;
    }
    if (newpwd != newpwd2) {
        showMsg('重复密码不一致');
        return;
    }
    if (newpwd.length < 6) {
        showMsg('密码不能少于6位');
        return;
    }

    let data = {
        email: email,
        password: newpwd,
        code: vfCode
    };

    $('i[name="ic_update"]').css('display', 'inline-block');
    updatePwdAjax(data, function (json) {

        if (json.errno == 0) {
            //成功
            showMsg(json.data);

        } else {
            showMsg(json.errmsg);
        }
        $('i[name="ic_update"]').css('display', 'none');
    });

};
//获取验证码
var getEmailCodeFunc = function (v) {
    let email = $('input[name="email2"]').val();
    if (email == '') {
        showMsg('邮箱不能为空');
        return;
    }

    $('i[name="ic_vf"]').css('display', 'inline-block');

    codeAjax(email, function (json) {
        if (json.errno == 0) {
            //获取成功 改变按钮状态
            $(v).attr('class', 'layui-btn layui-btn-disabled');
            $(v).attr('disabled', true);
            //倒计时
            setTime($(v)[0])
        } else {
            //发送邮件失败
            showMsg(json.errmsg);
        }
        $('i[name="ic_vf"]').css('display', 'none');

    });
};
var countdown = 60;
//验证码倒计时
function setTime(val) {
    if (countdown == 0) {
        $(val).attr("disabled", false);
        $(val).text('验证码');
        $(val).attr('class', 'layui-btn layui-btn-danger');
        countdown = 60;
        return;
    } else {
        $(val).attr("disabled", true);
        $(val).text("重新发送(" + countdown + ")");
        countdown--;
    }
    setTimeout(function () {
        setTime(val)
    }, 1000)
}
//-----------------------Ajax------------------------//
function updatePwdAjax(data, cb) {
    let url = '/api/user/password';
    $.post(url, data, cb);
}

function codeAjax(email, cb) {
    let url = '/api/user/email';
    $.post(url, {email: email}, cb);
}

function loginAjax(email, passsword, cb) {
    let url = '/api/user/login';
    let data = {email: email, password: passsword};
    $.post(url, data, cb);
}

//-----------------------END------------------------//
function showMsg(str) {
    layer.msg(str + '！');
}

//后台主页

//------ iframe -------
function updatePasswordFuc() {
    layer.open({
        type: 1,
        area: ['400px', '360px'],
        shadeClose: true, //点击遮罩关闭,
        title: '密码修改',
        content: '<div style="width: auto;height: auto;padding: 30px">' +
        '<ul class="ul2">' +
        '<li><input type="password" name="curpwd" placeholder="输入当前密码" class="layui-input"></li>' +
        '</li>' +
        '<li><input type="password" name="newpwd" placeholder="新密码" class="layui-input"></li>' +
        '<li><input type="password" name="newpwd2" placeholder="重复新密码" class="layui-input"></li> ' +
        '<li style="margin-top: 40px"><button onclick="javascript:updatePwdMainFunc(this)" type="button" class="layui-btn layui-btn-big layui-btn-danger" style="width: 100%">' +
        '<i name="ic_update" class="layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="display:none;margin-right: 10px">&#xe63d;</i>修改</button> </li>' +
        '</ul>' +
        '</div>',
        end: function () {


        }
    });
}

//修改密码click
function updatePwdMainFunc() {
    let oldpwd = $('input[name="curpwd"]').val();
    let newpwd = $('input[name="newpwd"]').val();
    let newpwd2 = $('input[name="newpwd2"]').val();
    if (isEmpty(oldpwd)) {
        layer.msg('密码不能为空');
        return;
    }
    if (isEmpty(newpwd)) {
        layer.msg('新密码不能为空');
        return;
    }
    if (newpwd2 != newpwd) {
        layer.msg('2次密码输入不正确');
        return;
    }
    if (oldpwd.length < 6 || newpwd.length < 6) {
        layer.msg('用户密码不能小于6位');
        return;
    }
    $('i[name="ic_update"]').css('display', 'inline-block');
    updateAjax({action: 'upwd', oldPwd: oldpwd, newPwd: newpwd}, function (json) {

        if (json.errno == 0) {
            layer.msg('修改密码成功，您需要重新登录。');
        } else {
            layer.msg(json.errmsg);
        }

        $('i[name="ic_update"]').css('display', 'none');
    });

}

function updateAjax(data, cb) {
    let url = '/api/user/update';
    $.post(url, data, cb);
}

function logoutFunc() {

    let alert = layer.confirm('您确定要退出当前登录状态吗？', {
        btn: ['退出', '取消'] //按钮
    }, function () {

        var loading = layer.load(1, {
            shade: [0.1, '#fff'] //0.1透明度的白色背景
        });
        updateAjax({action: 'logout'}, function (json) {
            if (json.errno == 0) {
                //退出成功
                console.log('user logout')
            } else {
                layer.msg(json.errmsg);
            }
            delCookie('token');
            layer.close(loading);
            location.href = '/user/login'

        });


    }, function () {
        layer.close(alert);
    });
}

//------- iframe end -------

function cdClick(n) {
    $('li[class="layui-nav-item top parent"] a').removeAttr('class');
    $('li[class="layui-nav-item top parent"]').attr('class', 'layui-nav-item')
    $('li[name="cli-' + n + '"]').attr('class', 'layui-nav-item top parent');
    $('li[name="cli-' + n + '"] a').attr('class', 'active');
}

var menuSubs = [[{name: '后台主页', url: '/admin/index/welcome'}], [{name: '条目管理', url: '/admin/content/video'}, {
    name: '分组管理',
    url: 'javascript:;'
}], [{name: '栏目管理', url: '/admin/class'}]];

function bindViews(o, i) {
    $(o).parent().find('li[class="layui-nav-item layui-this"]').attr('class', 'layui-nav-item');
    $(o).attr('class', 'layui-nav-item layui-this');
    //添加子节点
    $('#admin-menu-main li').remove();
    let item = menuSubs[i];
    let lni, act;
    for (let k = 0; k < item.length; k++) {

        if (k == 0) {
            lni = 'layui-nav-item top parent';
            act = 'class="active"';
        } else {
            lni = 'layui-nav-item';
            act = '';
        }
        let params = "cli-" + k;
        let liNode = '<li class="' + lni + '" onclick="javascript:cdClick(\'' + k + '\')" name="' + params + '" ><a href="' + item[k].url + '" target="main"  ' + act + '>' + item[k].name + '</a></li>';
        $('#admin-menu-main').append(liNode);
    }
}


function updateClassAjax(data,cb){
    let url = '/api/admin/class';
    $.post(url,data,cb);

}
