import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import App from "./App/Application"
// initialize the scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')


// floor
const floorGeometry = new THREE.PlaneGeometry(22,30);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x49586f });
const floor = new THREE.Mesh(floorGeometry,floorMaterial)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = -0.5
scene.add(floor)

// shop
// walls
const wallsGeometry = new THREE.BoxGeometry(4,4,4);
const wallsMaterial = new THREE.MeshBasicMaterial({ color: "blue" ,side: THREE.DoubleSide});
const wallsMesh = new THREE.Mesh(wallsGeometry, wallsMaterial);
wallsMesh.position.set(0,1.2,-3) 
scene.add(wallsMesh);

// // roof
// const roofGeometry = new THREE.ConeGeometry( 3.5,1,4 ); 
// const roofMaterial = new THREE.MeshBasicMaterial( {color: 0xfffff0} );
// const roofMesh = new THREE.Mesh(roofGeometry,roofMaterial)
// roofMesh.position.set(0,1.5,0)
// scene.add(roofMesh)
// roof
const roofGeometry = new THREE.SphereGeometry(8.5,16,6,0,6.3,2.9,0.64 ); 
const roofMaterial = new THREE.MeshBasicMaterial( {color: 0xfffff0, side: THREE.DoubleSide} );
const roofMesh = new THREE.Mesh(roofGeometry,roofMaterial)
roofMesh.position.set(0,-4.8,-3)
roofMesh.rotation.x = - Math.PI * 1
scene.add(roofMesh)

// plane
const planeGeometry = new THREE.PlaneGeometry(2,3,18,18);
const planeMaterial = new THREE.MeshBasicMaterial({ color: "blue", wireframe: true });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh2 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh3 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh4 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh5 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh6 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh7 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh8 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh9 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh10 = new THREE.Mesh(planeGeometry, planeMaterial);
const planeMesh11 = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.position.set(0,1,-15)
planeMesh2.position.set(-2,1,-15)
planeMesh3.position.set(-4,1,-15)
planeMesh4.position.set(-6,1,-15)
planeMesh5.position.set(-8,1,-15)
planeMesh6.position.set(-10,1,-15)
planeMesh7.position.set(2,1,-15)
planeMesh8.position.set(4,1,-15)
planeMesh9.position.set(6,1,-15)
planeMesh10.position.set(8,1,-15)
planeMesh11.position.set(10,1,-15)
scene.add(planeMesh, planeMesh2, planeMesh3, planeMesh4,planeMesh5,planeMesh6,planeMesh7,planeMesh8,planeMesh9,planeMesh10,planeMesh11);





// TEXT
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/Silkscreen_Regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Alaa Eldin Abousamra',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        // textGeometry.computeBoundingBox()
        // // to center text
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5
        // )
        textGeometry.center()
        //https://github.com/nidorx/matcaps
        const textMaterial =  new THREE.MeshMatcapMaterial({matcap: matcapTexture})
        // textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry,textMaterial)
        text.position.set(0,3,-15)
        scene.add(text)
      }
    )
// cubeMesh.rotation.reorder('YXZ')

// cubeMesh.rotation.x = THREE.MathUtils.degToRad(45)
// cubeMesh.rotation.y = THREE.MathUtils.degToRad(90)
// cubeMesh.scale.x = 1
// cubeMesh.position.x = 1
// cubeMesh.position.y = 1

// const axesHelper = new THREE.AxesHelper(2);
// cubeMesh.add(axesHelper);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 14;
camera.position.y = 8;

const handleClick = () => {
 console.log('you double click')
//  camera.position.x = 4
//  camera.position.y = 4

}
window.addEventListener('dblclick', handleClick)


// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// clock
const clock = new THREE.Clock()
let previousTime = 0

// render the scene
const renderloop = () => {
  
  const currentTime = clock.getElapsedTime()
  const delta = currentTime -  previousTime
  previousTime = currentTime
  
  // cubeMesh.rotation.y  += THREE.MathUtils.degToRad(1) * delta * 20
  // planeMesh.rotation.y  -= THREE.MathUtils.degToRad(1) * delta * 20


  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
