/**
 * Created by 杜鹏宇 on 2015/7/10.
 */

Tank = function(scene) {
    BABYLON.Mesh.call(this, "tank", scene);
    BABYLON.VertexData.CreateBox(6).applyToMesh(this, false);

    this.position = new BABYLON.Vector3(0, 3, 0);

    this.killed = false;
    this.speed = 1;
    this.moveLeft =false;
    this.moveRight = false;
    this.moveForward = false;
    this.moveBack = false;

//    this.initMovement();
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