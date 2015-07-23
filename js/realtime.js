/**
 * Created by 杜鹏宇 on 2015/7/23.
 */

Realtime = function(){
    this.appId = 'ahrxpnr9g6t01fd03iv5c8y69j5m1zo3oh3h12xoek336g2s';
    this.clientId = '';
    this.realtimeObj = null;
    this.conversationObj = null;
}

Realtime.prototype.createRoom = function(){
    // 创建实时通信实例
    this.realtimeObj = AV.realtime({
        appId: this.appId,
        clientId: this.clientId,
        // 是否开启 HTML 转义，SDK 层面开启防御 XSS
        encodeHTML: true
        // 是否开启服务器端认证
        // auth: authFun
    });

    // 实时通信服务连接成功
    this.realtimeObj.on('open', function () {
        console.log('实时通信服务建立成功！');

        // 创建一个聊天室，conv 是 conversation 的缩写，也可以用 room 方法替换
        this.conversationObj = this.realtimeObj.conv({
            // 人员的 id
            members: [
                'LeanCloud02'
            ],
            // 默认名字
            name: 'LeanCloud-Room',
            // 默认的属性，可以放 Conversation 的一些初始值等
            attr: {
                test: 'testTitle'
            }
        }, function (data) {
            if (data) {
                console.log('Conversation 创建成功!', data);
            }
        });
    });
}

Realtime.prototype.work = function() {
// 当聊天断开时触发
    this.realtimeObj.on('close', function () {
        console.log('实时通信服务被断开！');
    });

// 接收断线或者网络状况不佳的事件（断网可测试）
    this.realtimeObj.on('reuse', function () {
        console.log('正在重新连接。。。');
    });

// 当 Conversation 被创建时触发，当然您可以使用回调函数来处理，不一定要监听这个事件
    this.realtimeObj.on('create', function (data) {

        // 向这个 Conversation 添加新的用户
        this.conversationObj.add([
            'LeanCloud03', 'LeanCloud04'
        ], function (data) {
            console.log('成功添加用户：', data);
        });

        // 从这个 Conversation 中删除用户
        this.conversationObj.remove('LeanCloud03', function (data) {
            console.log('成功删除用户：', data);
        });

        // 向这个 Conversation 中发送消息
        this.conversationObj.send({
            abc: 123
        }, function (data) {
            console.log('发送的消息服务端已收收到：', data);
        });

        setTimeout(function () {
            // 查看历史消息
            this.conversationObj.log(function (data) {
                console.log('查看当前 Conversation 最近的聊天记录：', data);
            });
        }, 2000);

        // 当前 Conversation 接收到消息
        this.conversationObj.receive(function (data) {
            console.log('当前 Conversation 收到消息：', data);
        });

        // 获取当前 Conversation 中的成员信息
        this.conversationObj.list(function (data) {
            console.log('列出当前 Conversation 的成员列表：', data);
        });

        // 取得当前 Conversation 中的人数
        this.conversationObj.count(function (num) {
            console.log('取得当前的用户数量：' + num);
        });
    });

// 监听所有用户加入的情况
    this.realtimeObj.on('join', function (data) {
        console.log('有用户加入某个当前用户在的 Conversation：', data);
    });

// 监听所有用户离开的情况
    this.realtimeObj.on('left', function (data) {
        console.log('有用户离开某个当前用户在的 Conversation：', data);
    });

// 监听所有 Conversation 中发送的消息
    this.realtimeObj.on('message', function (data) {
        console.log('某个当前用户在的 Conversation 接收到消息：', data);
    });
}