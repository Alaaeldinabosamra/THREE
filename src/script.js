import * as THREE from 'three'
import "./styles.css"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/**
 * Group objects
 */
const group = new THREE.Group()
// move objects together
group.position.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.set(-2,0,0)
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.set(2,0,0)
group.add(cube3)


/**
 * Position
 */
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
// mesh.position.set(0.7,-0.6,1)

/**
 * Scale
 */
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5i
// mesh.scale.set(2,0.5,0.5)

/**
 * Rotation
 * PI = 3.1459
 */
// هنا بتفرق اما نحرك الاكس الاول مش بيبقى في نفس المكان ف بنستخدم الفانكشن دى
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25


/**
 * Quaternion
 * also expresses a rotation, but in more mathematical way
 */




/**
 * Axes helper
 */
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(new THREE.Vector3(3,0,0))
// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

