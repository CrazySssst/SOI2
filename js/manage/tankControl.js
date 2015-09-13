/**
 * Created by 杜鹏宇 on 2015/9/7.
 */

//坦克管理
TankControl = function () {
    this.myTank = null;
    this.tankList = new Array();
}

//添加坦克
TankControl.prototype.addTank = function (scene, username, user, camp, position, type, ishost, comm) {
    var tank = new Tank();
    tank.create(scene, user, camp, position, type);
    this.tankList[this.tankList.length] = tank;
    if (user == username) {
        this.myTank = tank;
        if (!ishost)
            comm.send("Server", username, "newTank", {user: user, camp: camp, position: position, type: type});
    }
}
//移动玩家坦克
TankControl.prototype.myTankMove = function (camera, comm, name, ishost) {
    this.myTank.position.x = camera.position.x;
    this.myTank.position.y = camera.position.y - 4;
    this.myTank.position.z = camera.position.z;
    if (!ishost && Math.random() * 6 < 1)
        comm.send("Server", name, "updateTankPosition", this.myTank.position);
}
//更新坦克位置
TankControl.prototype.updateTankPosition = function(user, position){
    for (var i = 0; i < this.tankList.length; i++){
        if (this.tankList[i].user == user){
            this.tankList[i].position = position;
            break;
        }
    }
}
//绘制坦克新的位置
TankControl.prototype.draw = function(){
    for (var i = 0; i < this.tankList.length; i++){
        this.tankList[i].object.position = this.tankList[i].position;
    }
}
//服务器更新数据
TankControl.prototype.serverUpdate = function(comm){
    var data = new Array();
    for (var i = 0; i < this.tankList.length; i++){
        data[i] = {
            user:this.tankList[i].user,
            camp:this.tankList[i].camp,
            position:this.tankList[i].position,
            type:this.tankList[i].type
        }
    }
    comm.send("All", "Server", "updateTank", data);
}
//客户端更新数据
TankControl.prototype.clientUpdate = function(data){
    for (var i = 0; i < data.length; i++){
        if (data[i].user == this.myTank.user)
            continue;
        var flag = false;
        for (var j = 0; j < this.tankList.length; j++){
            if (data[i].user == this.tankList[j].user){
                this.tankList[j].position = data[i].position;
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.addTank(game.scene, game.userName, data[i].user, data[i].camp, data[i].position, data[i].type, game.isHost, game.commControl);
        }
    }
}