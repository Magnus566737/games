import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff,4);
light.position.set(20,50,20);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff,1));

const floor = new THREE.Mesh(
new THREE.PlaneGeometry(500,500),
new THREE.MeshLambertMaterial({
color:0x4caf50
})
);

floor.rotation.x = -Math.PI/2;
scene.add(floor);

const targets = [];

for(let i=0;i<50;i++){

const cube = new THREE.Mesh(
new THREE.BoxGeometry(3,3,3),
new THREE.MeshLambertMaterial({
color:0xff3333
})
);

cube.position.set(
(Math.random()-0.5)*200,
1.5,
(Math.random()-0.5)*200
);

cube.health = 5;

scene.add(cube);
targets.push(cube);

}

camera.position.set(0,2,5);

const bullets = [];

const keys = {};

document.addEventListener("keydown",e=>{

keys[e.key.toLowerCase()] = true;

if(e.code==="Space" && grounded){

velocityY = 0.25;
grounded = false;

}

});

document.addEventListener("keyup",e=>{

keys[e.key.toLowerCase()] = false;

});

let yaw = 0;
let pitch = 0;

document.body.onclick = ()=>{

document.body.requestPointerLock();

};

document.addEventListener("mousemove",e=>{

if(document.pointerLockElement===document.body){

yaw -= e.movementX * 0.002;
pitch -= e.movementY * 0.002;

pitch = Math.max(
-Math.PI/2,
Math.min(Math.PI/2,pitch)
);

}

});

let velocityY = 0;
let grounded = true;

const gun = new THREE.Mesh(
new THREE.BoxGeometry(.3,.3,1),
new THREE.MeshStandardMaterial({
color:0x333333
})
);

gun.position.set(.5,-.4,-1);
camera.add(gun);
scene.add(camera);

function shoot(){

const bullet = new THREE.Mesh(
new THREE.SphereGeometry(.1,8,8),
new THREE.MeshBasicMaterial({
color:0xffff00
})
);

bullet.position.copy(camera.position);

const dir = new THREE.Vector3();
camera.getWorldDirection(dir);

bullet.velocity = dir.multiplyScalar(2);

scene.add(bullet);

bullets.push(bullet);

}

document.addEventListener("mousedown",shoot);

function animate(){

requestAnimationFrame(animate);

let speed = 0.15;

if(keys["shift"]){
speed = 0.3;
}

const forward = new THREE.Vector3(
Math.sin(yaw),
0,
Math.cos(yaw)
);

const right = new THREE.Vector3(
forward.z,
0,
-forward.x
);

if(keys["w"])
camera.position.add(
forward.clone().multiplyScalar(speed)
);

if(keys["s"])
camera.position.add(
forward.clone().multiplyScalar(-speed)
);

if(keys["a"])
camera.position.add(
right.clone().multiplyScalar(speed)
);

if(keys["d"])
camera.position.add(
right.clone().multiplyScalar(-speed)
);

velocityY -= 0.01;

camera.position.y += velocityY;

if(camera.position.y <= 2){

camera.position.y = 2;
velocityY = 0;
grounded = true;

}

camera.rotation.order = "YXZ";
camera.rotation.y = yaw;
camera.rotation.x = pitch;

for(let i=bullets.length-1;i>=0;i--){

const bullet = bullets[i];

bullet.position.add(bullet.velocity);

for(let j=targets.length-1;j>=0;j--){

const target = targets[j];

if(
bullet.position.distanceTo(
target.position
) < 1.8
){

target.health--;

scene.remove(bullet);
bullets.splice(i,1);

if(target.health<=0){

scene.remove(target);
targets.splice(j,1);

}

break;

}

}

if(
bullet.position.length() > 500
){

scene.remove(bullet);
bullets.splice(i,1);

}

}

renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect =
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

});
