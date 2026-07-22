import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160/build/three.module.js';
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x87ceeb);
const camera=new THREE.PerspectiveCamera(75,innerWidth/innerHeight,0.1,1000);
const renderer=new THREE.WebGLRenderer();renderer.setSize(innerWidth,innerHeight);document.body.appendChild(renderer.domElement);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({color:0x44aa44}));floor.rotation.x=-Math.PI/2;scene.add(floor);
camera.position.set(0,2,5);
const keys={};addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true);addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);
function a(){requestAnimationFrame(a);if(keys.w)camera.position.z-=0.15;if(keys.s)camera.position.z+=0.15;if(keys.a)camera.position.x-=0.15;if(keys.d)camera.position.x+=0.15;renderer.render(scene,camera);}a();