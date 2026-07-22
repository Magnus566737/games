import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(10,20,10);
scene.add(light);

const floor = new THREE.Mesh(
new THREE.PlaneGeometry(200,200),
new THREE.MeshLambertMaterial({color:0x44aa44})
);

floor.rotation.x = -Math.PI/2;
scene.add(floor);

for(let i=0;i<20;i++){

const box = new THREE.Mesh(
new THREE.BoxGeometry(2,2,2),
new THREE.MeshLambertMaterial({
color:Math.random()*0xffffff
})
);

box.position.set(
(Math.random()-0.5)*100,
1,
(Math.random()-0.5)*100
);

scene.add(box);
}

camera.position.set(0,2,5);

const keys = {};

document.addEventListener("keydown",(e)=>{
keys[e.key.toLowerCase()] = true;
});

document.addEventListener("keyup",(e)=>{
keys[e.key.toLowerCase()] = false;
});

function animate(){

requestAnimationFrame(animate);

if(keys["w"]) camera.position.z -= 0.15;
if(keys["s"]) camera.position.z += 0.15;
if(keys["a"]) camera.position.x -= 0.15;
if(keys["d"]) camera.position.x += 0.15;

renderer.render(scene,camera);
}

animate();
