/**
 * Created by 杜鹏宇 on 2015/9/7.
 */

//炮弹类
Shell = function () {
    this.object = null;//炮弹对象
    this.direction = new BABYLON.Vector3(0, 0, 0);//炮弹方向
    this.position = new BABYLON.Vector3(0, 0, 0);//炮弹位置
    this.own = "";//炮弹拥有者
    this.speed = 0;//炮弹速度
    this.damage = 0;//炮弹伤害
}

//创造炮弹
Shell.prototype.create = function (scene, position, direction, own, speed, damage) {
    this.object = BABYLON.Mesh.CreateBox("", 10.0, 1.0, scene);
    this.object.position = position;
    this.object.direction = direction;

    this.own = own;
    this.speed = speed;
    this.damage = damage;
}
//炮弹飞行
Shell.prototype.fly = function () {
    this.object.position.x += this.direction.x * this.speed;
    this.object.position.y += this.direction.y * this.speed;
    this.object.position.z += this.direction.z * this.speed;
}