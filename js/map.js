/**
 * Created by 杜鹏宇 on 2015/7/22.
 */

Map = function(){
    this.data = new Array();
}

Map.prototype.createRandomMap = function(){
    var TOTAL = 30;
    for (var i = 0; i < TOTAL; i++){
        var box = {
            size:Math.random() * 80 + 10,
            x:-400 + Math.random() * 800,
            z:-400 + Math.random() * 800
        }
        this.data[this.data.length] = box;
    }
}

Map.prototype.drawMap = function(scene){
    for (var i = 0; i < this.data.length; i++){
        var box = BABYLON.Mesh.CreateBox("mapbox" + i, this.data[i].size, scene);
        box.position.x = this.data[i].x;
        box.position.y = this.data[i].size / 2;
        box.position.z = this.data[i].z;
        box.checkCollisions = true;
        var material = new BABYLON.StandardMaterial("mapboxMaterial" + i, scene);
        material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        material.specularColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        box.material = material;
    }
}