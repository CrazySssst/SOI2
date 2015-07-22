/**
 * Created by 杜鹏宇 on 2015/7/10.
 */

Tank = function(scene) {
    BABYLON.Mesh.call(this, "tank", scene);
    BABYLON.VertexData.CreateBox(6).applyToMesh(this, false);

    this.position = new BABYLON.Vector3(0, 3, 0);//坦克位置
    this.life = 100;//生命值

    this.attackDamage = 30;//攻击伤害
    this.rotateSpeed = 5000;//旋转速度
    this.bulletSpeed = 50;//炮弹速度
    this.attackSpeed = 5;//攻击速度
    this.moveSpeed = 1;//坦克速度
    this.protectDamage = 10;//防御减伤
}

Tank.prototype = Object.create(BABYLON.Mesh.prototype);
Tank.prototype.constructor = Tank;

//Tank.prototype.initMovement = function() {
//    // When a key is pressed, set the movement
//    var onKeyDown = function(evt) {
//        SOI2.tank.moveRight = false;
//        SOI2.tank.moveLeft = false;
//        SOI2.tank.moveForward =false;
//        SOI2.tank.moveBack = false;
//        if (evt.keyCode == 65) SOI2.tank.moveLeft = true;
//        if (evt.keyCode == 68) SOI2.tank.moveRight = true;
//        if (evt.keyCode == 87) SOI2.tank.moveForward = true;
//        if (evt.keyCode == 83) SOI2.tank.moveBack = true;
//    };
//
//    // On key up, reset the movement
//    var onKeyUp = function(evt) {
//        SOI2.tank.moveRight = false;
//        SOI2.tank.moveLeft = false;
//        SOI2.tank.moveForward =false;
//        SOI2.tank.moveBack = false;
//    };
//
//    // Register events with the right Babylon function
//    BABYLON.Tools.RegisterTopRootEvents([{
//        name: "keydown",
//        handler: onKeyDown
//    }, {
//        name: "keyup",
//        handler: onKeyUp
//    }]);
//};
//
//Tank.prototype.move = function() {
//    if (SOI2.tank.moveRight) {
//        SOI2.tank.position.x += SOI2.tank.speed;
//    }
//    if (SOI2.tank.moveLeft) {
//        SOI2.tank.position.x -= SOI2.tank.speed;
//    }
//    if (SOI2.tank.moveForward) {
//        SOI2.tank.position.z += SOI2.tank.speed;
//    }
//    if (SOI2.tank.moveBack) {
//        SOI2.tank.position.z -= SOI2.tank.speed;
//    }
//};