import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

import {
    Engine,
    Scene,
    Vector3,
    Vector2,
    HemisphericLight,
    ArcRotateCamera,
    SceneLoader,
    HighlightLayer,
    Color3,
    Mesh,
    StandardMaterial,
    PBRMaterial 
  } from '@babylonjs/core';

  var canvas = document.getElementById("renderCanvas");

  var engine = new BABYLON.Engine(canvas, true);
  const scene = new Scene(engine)
  scene.debugLayer.show();

  const camera = new ArcRotateCamera(
       'camera',      // 相机的名称
        Math.PI / 6,   // 水平旋转角度
        Math.PI / 4,   // 垂直旋转角度
        2000,          // 相机到目标点的距离
        new Vector3(0, 0, 0), // 目标点
        scene          // 相机所在的场景（刚刚创建的场景）
    )
  camera.attachControl(canvas, true); 
  const light = new HemisphericLight(
  'light',            // 光源的名称，用于标识这个光源
  new Vector3(1, 1, 0), // 光的方向，这是一个向量，表示光从 (1, 1, 0) 方向投射到场景中
  scene               // 光源所在的场景
  );
  light.intensity = 0.7; // 设置光照强度为 0.7
  SceneLoader.ImportMesh(
        '', // 要导入的特定网格的名称，空字符串表示导入所有网格
        '/model/', // 模型文件的路径
        'yy.gltf', // 模型文件的名称
        scene, // 要将模型导入到的目标场景
        function (meshes) { // 回调函数，处理加载完成后的操作
          // meshs是模型中的所有网格，是模型的基本组成后续要实现各种交互需要了解。
          // 一会的鼠标监听事件就写在这里
          console.log('模型已加载', meshes);
        })

  engine.runRenderLoop(function () {
    scene.render();
  });
  window.addEventListener('resize', function () {
    engine.resize();
  });
