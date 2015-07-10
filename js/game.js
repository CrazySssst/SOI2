/**
 * Created by 杜鹏宇 on 2015/7/8.
 */

var SOI2 = {
    canvas: null,//网页画布
    engine: null,//游戏引擎

    scene: null,//场景
    camera: null,//相机
    light: null,//光照

    tank: null,//坦克

    //游戏初始化
    init: function () {
        this.canvas = document.getElementById("gameCanvas");
        this.engine = new BABYLON.Engine(this.canvas, true);

        this.scene = new BABYLON.Scene(this.engine);
        this.scene.gravity = new BABYLON.Vector3(0, -9.18, 0);
        this.scene.collisionsEnabled = true;

        this.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 7, 0), this.scene);
        this.camera.setTarget(new BABYLON.Vector3(0, 7, 10));
        this.camera.attachControl(this.canvas);
        this.camera.ellipsoid = new BABYLON.Vector3(1, 3.5, 1);
        this.camera.checkCollisions = true;
        this.camera.applyGravity = true;
        //使用按键WASD控制场景
        this.camera.keysUp = [87];
        this.camera.keysDown = [83];
        this.camera.keysLeft = [65];
        this.camera.keysRight = [68];
        this.camera.speed = 1;
        this.camera.inertia = 0.9;
        this.camera.angularSensibility = 5000;

        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);

        //鼠标锁定
        // On click event, request pointer lock
        this.canvas.addEventListener("click", function (evt) {
            if (SOI2.canvas.requestPointerLock
                || SOI2.canvas.msRequestPointerLock
                || SOI2.canvas.mozRequestPointerLock
                || SOI2.canvas.webkitRequestPointerLock) {
                SOI2.canvas.requestPointerLock();
            }
        }, false);
        // Event listener when the pointerlock is updated (or removed by pressing ESC for example).
        var pointerlockchange = function (event) {
            // If the user is alreday locked
            if (!(document.mozPointerLockElement === SOI2.canvas
                || document.webkitPointerLockElement === SOI2.canvas
                || document.msPointerLockElement === SOI2.canvas
                || document.pointerLockElement === SOI2.canvas)) {
                SOI2.camera.detachControl(SOI2.canvas);
            } else {
                SOI2.camera.attachControl(SOI2.canvas);
            }
        };
        document.addEventListener("pointerlockchange", pointerlockchange, false);
        document.addEventListener("mspointerlockchange", pointerlockchange, false);
        document.addEventListener("mozpointerlockchange", pointerlockchange, false);
        document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

        //加载游戏内容
        SOI2.load();
        //建立60FPS的游戏循环
        this.engine.runRenderLoop(function () {
            SOI2.update();
            SOI2.draw();
        });
    },

    //游戏内容加载
    load: function () {
        var ground = BABYLON.Mesh.CreateGround("ground", 500, 500, 2, this.scene);
        ground.checkCollisions = true;
        var materialPlane = new BABYLON.StandardMaterial("texturePlane", this.scene);
        materialPlane.diffuseTexture = new BABYLON.Texture("assets/image/grass.jpg", this.scene);
        materialPlane.diffuseTexture.uScale = 10;//Repeat 10 times on the Vertical Axes
        materialPlane.diffuseTexture.vScale = 10;//Repeat 10 times on the Horizontal Axes
        materialPlane.backFaceCulling = false;//Allways show the front and the back of an element
        ground.material = materialPlane;

        this.tank = new Tank(this.scene);
        this.tank.material = new BABYLON.StandardMaterial("tankMaterial", this.scene);
        this.tank.material.diffuseColor = new BABYLON.Color3(32 / 255, 178 / 255, 170 / 255);
    },

    //游戏逻辑更新
    update: function () {
        SOI2.tank.position.x = SOI2.camera.position.x;
        SOI2.tank.position.y = SOI2.camera.position.y - 4;
        SOI2.tank.position.z = SOI2.camera.position.z;
    },

    //游戏画面绘制
    draw: function () {
        SOI2.scene.render();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (BABYLON.Engine.isSupported()) {
        SOI2.init();
    } else {
        alert("您的浏览器无法运行游戏");
    }
}, false);

window.addEventListener("resize", function () {
    SOI2.engine.resize();
});