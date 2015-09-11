/**
 * Created by 杜鹏宇 on 2015/9/10.
 */

//坦克类
Tank = function () {
    this.user = "";//玩家名称
    this.camp = "";//玩家阵营
    this.position = new BABYLON.Vector3(0, 0, 0);//坦克位置
    this.type = "";//坦克类型
    this.life = 100;//生命值
    this.live = true;//存活标记
    this.object = null;//坦克模型

    this.attackDamage = 0;//攻击伤害
    this.shellSpeed = 0;//炮弹速度
    this.shootSpeed = 0;//攻击速度
    this.rotateSpeed = 0;//旋转速度
    this.moveSpeed = 0;//坦克速度
    this.protectDamage = 0;//防御减伤
}

//创造坦克
Tank.prototype.create = function (scene, user, camp, position, type) {
    this.user = user;
    this.camp = camp;
    this.position = position;
    this.type = type;
    this.life = 100;
    this.live = true;
    //根据不同类型设置不同坦克参数
    if (this.type == "tankA") {
        this.attackDamage = 30;//攻击伤害
        this.shellSpeed = 40;//炮弹速度
        this.shootSpeed = 3;//攻击速度
        this.rotateSpeed = 5000;//旋转速度
        this.moveSpeed = 4;//坦克速度
        this.protectDamage = 7;//防御减伤
    } else if (this.type == "tankB") {
        this.attackDamage = 50;//攻击伤害
        this.shellSpeed = 60;//炮弹速度
        this.shootSpeed = 4;//攻击速度
        this.rotateSpeed = 7000;//旋转速度
        this.moveSpeed = 2;//坦克速度
        this.protectDamage = 15;//防御减伤
    } else {
        this.attackDamage = 70;//攻击伤害
        this.shellSpeed = 80;//炮弹速度
        this.shootSpeed = 6;//攻击速度
        this.rotateSpeed = 9000;//旋转速度
        this.moveSpeed = 1;//坦克速度
        this.protectDamage = 0;//防御减伤
    }
    //加载坦克模型
    this.object = BABYLON.Mesh.CreateBox(this.user, 6.0, scene);
    this.object.position = position;
    var material = new BABYLON.StandardMaterial("tankMaterial", scene);
    if (this.camp == "Red"){
        material.diffuseColor = new BABYLON.Color3(255 / 255, 10 / 255, 10 / 255);
    }else{
        material.diffuseColor = new BABYLON.Color3(32 / 255, 178 / 255, 170 / 255);
    }
    this.object.material = material;
}
//坦克被攻击
Tank.prototype.beAttacked = function (damage) {
    this.life = this.life - damage + this.protectDamage;
    if (this.life <= 0) {
        this.live = false;
        alert("阵亡");
    }
}
//坦克移动
Tank.prototype.move = function (position) {
    this.position = position;
}