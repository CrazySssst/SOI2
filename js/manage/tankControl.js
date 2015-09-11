/**
 * Created by 杜鹏宇 on 2015/9/7.
 */

//坦克管理
TankControl = function () {
    this.myTank = null;
    this.tankList = new Array();
}

//添加坦克
TankControl.prototype.addTank = function (scene, username, user, camp, position, type) {
    var tank = new Tank();
    tank.create(scene, user, camp, position, type);
    this.tankList[this.tankList.length] = tank;
    if (user == username) {
        this.myTank = tank;
    }
}
//移动玩家坦克
TankControl.prototype.myTankMove = function(camera){
    this.myTank.position.x = camera.position.x;
    this.myTank.position.y = camera.position.y - 4;
    this.myTank.position.z = camera.position.z;
}