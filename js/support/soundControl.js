/**
 * Created by 杜鹏宇 on 2015/9/7.
 */

//声音支持
SoundControl = function () {

}

//播放背景音乐
SoundControl.prototype.playBackgroundMusic = function (scene) {
    var music = new BABYLON.Sound("Fighting", "../asset/music/fight/fight01.mp3", scene, null, { loop: true, autoplay: true});
}