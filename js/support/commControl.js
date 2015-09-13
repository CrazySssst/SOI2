/**
 * Created by 杜鹏宇 on 2015/7/23.
 */

//通信支持
CommControl = function () {
    this.appId = 'ahrxpnr9g6t01fd03iv5c8y69j5m1zo3oh3h12xoek336g2s';//应用id
    this.clientId = '';//客户端ID
    this.convName = '';//房间名称
    this.isHost = false;//是否主机
    this.rt = null;//通信对象
    this.room = null;//房间对象
}
//建立与服务器的通信
CommControl.prototype.run = function (username, battlefield, ishost) {
    this.clientId = username;
    this.convName = battlefield;
    this.isHost = ishost;
    // 创建实时通信实例
    this.rt = AV.realtime({
        appId: this.appId,
        clientId: this.clientId,
        // 是否开启 HTML 转义，SDK 层面开启防御 XSS
        encodeHTML: true
        // 是否开启服务器端认证
        // auth: authFun
    });

    game.commControl.work();

    this.rt.on('open', function () {
        if (game.commControl.isHost) {
            game.commControl.room = game.commControl.rt.room({
                // 人员的 id
                members: [
                    game.commControl.clientId
                ],
                // 默认名字
                name: game.commControl.convName,
                // 默认的属性，可以放 Conversation 的一些初始值等
                attr: {
                    test: 'SOI2'
                }
            }, function (obj) {
                var battlefield = new Battlefield();
                battlefield.set("roomName", game.commControl.convName);
                battlefield.set("roomId", obj.id);
                battlefield.save(null, {
                    success: function (data) {
                        // 成功保存之后，执行其他逻辑
                        game.commControl.room.count(function (num) {
                            if (num % 2 == 1)
                                game.userCamp = "R";
                            else
                                game.userCamp = "B";
                            console.log("战场建立成功，选择阵营为" + game.userCamp);
                        })
                    },
                    error: function (data, error) {
                        // 失败之后执行其他逻辑
                        // error 是 AV.Error 的实例，包含有错误码和描述信息.
                        alert('Failed to create new object, with error message: ' + error.message);
                    }
                });
            });
        } else {
            var query = new AV.Query(Battlefield);
            query.equalTo("roomName", game.commControl.convName);
            query.find({
                success: function (results) {
                    game.commControl.rt.room(results[0].attributes.roomId, function (object) {
                        game.commControl.room = object;
                        game.commControl.room.join(function () {
                            game.commControl.room.count(function (num) {
                                if (num % 2 == 1)
                                    game.userCamp = "R";
                                else
                                    game.userCamp = "B";
                                console.log("加入战场成功，选择阵营为" + game.userCamp);
                            })
                        });
                    })
                },
                error: function (error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        }
    })
}
//发送消息
CommControl.prototype.send = function (to, from, com, data) {
    // 向这个 Conversation 中发送消息
    this.room.send({
        to: to,
        from: from,
        command: com,
        data: data
    }, function (data) {
//        console.log('发送的消息服务端已收收到：', data);
    });
}
//获取成员信息
CommControl.prototype.getList = function () {
    // 获取当前 Conversation 中的成员信息
    this.room.list(function (data) {
        console.log('列出当前 Conversation 的成员列表：', data);
    });
}
//开启工作监听
CommControl.prototype.work = function () {
    // 监听连接断开
    this.rt.on('close', function () {
        alert('与战场连接断开');
        //window.location.href = "login.html";
    });

    // 监听所有用户加入的情况
    this.rt.on('join', function (data) {
        console.log('有用户加入某个当前用户在的 Conversation：', data);
        if (game.isHost) {
            game.commControl.send(data.initBy, "Server", "initMap", game.mapControl.data);
        }
    });

    // 监听所有用户离开的情况
    this.rt.on('left', function (data) {
        console.log('有用户离开某个当前用户在的 Conversation：', data);
    });

    // 监听所有 Conversation 中发送的消息
    this.rt.on('message', function (data) {
        console.log('某个当前用户在的 Conversation 接收到消息：', data);
        if (!game.isHost && data.msg.from == "Server") {
            if (data.msg.to == game.userName && data.msg.command == "initMap") {
                console.log("服务器通知初始化地图");
                game.mapControl.data = data.msg.data;
                game.mapControl.drawMap(game.scene);
            }
            if (data.msg.command == "updateTank"){
                game.tankControl.clientUpdate(data.msg.data);
            }
        }
        if (game.isHost && data.msg.to == "Server") {
            if (data.msg.command == "newTank"){
                var md = data.msg.data;
                game.tankControl.addTank(game.scene, game.userName, md.user, md.camp, md.position, md.type, game.isHost, game.commControl);
            }
            if (data.msg.command == "updateTankPosition"){
                game.tankControl.updateTankPosition(data.msg.from, data.msg.data);
            }
        }
    });
}