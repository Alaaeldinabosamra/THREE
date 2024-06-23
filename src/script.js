import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// // Object
// const geometry = new THREE.BoxGeometry(1, 1, 1,3,3,3)
// const material = new THREE.MeshBasicMaterial({ 
//     color: 0x000065,
//     wireframe: true
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// // Object2
// const geometry2 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
// const material2 = new THREE.MeshBasicMaterial({ 
//     color: 0xff0000,
// })
// const mesh2 = new THREE.Mesh(geometry2, material2)
// scene.add(mesh2)

// Geometries
/**
 * All the following build in geometries inhreit from main class Geometry
 * BoxGeometry
 * PlaneGeometry
 * CircleGeometry
 * ConeGeometry
 * CylinderGeometry
 * RingGeometry
 * TorusGeometry
 * DodecahedronGeometry
 * OctahedronGeometry
 * TetrahedronGeometry
 * IcosahedronGeometry
 * SphereGeometry
 * ShapeGeometry
 * TubeGeometry
 * ExtrudeGeometry
 * LatheGeometry
 * TextGeometry
 */

// const geometry1 = new THREE.BoxGeometry(x,y,z, subdivision)
// subdivisions correspond to how much triangles should compose a face
// 1 = 2 triangles per face
// 2 = 8 triangles per face 
// we cant see these triangles 
// to can see it make wireframe: true in geo material

// const positionsArray = new Float32Array(9)

// positionsArray[0] = 0 
// positionsArray[1] = 0 
// positionsArray[2] = 0 

// positionsArray[3] = 0 
// positionsArray[4] = 1 
// positionsArray[5] = 0 

// positionsArray[6] = 1 
// positionsArray[7] = 0 
// positionsArray[8] = 0 

// // same like

// // const positionsArray = new Float32Array([
// //     0, 0, 0,
// //     0, 1, 0,
// //     1, 0, 0,
// // ])


// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

// const geometry = new THREE.BufferGeometry()
// // why position? because this the name of value that send the attribute inside the shaders 
// geometry.setAttribute('position', positionsAttribute)

// const material = new THREE.MeshBasicMaterial({ 
//     color: 0x000065,
//     wireframe: true,
// })
// const triangle = new THREE.Mesh(geometry, material)
// scene.add(triangle)


// create a bunch of triangles

const geometry = new THREE.BufferGeometry()
const count = 50
const positionsArray = new Float32Array( count * 3 * 3)

for(let i= 0; i< count * 3 * 3; i++)
{
    positionsArray[i] = Math.random() - 0.5
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)

const material = new THREE.MeshBasicMaterial({ 
    color: 0x000065,
    wireframe: true,
})
const triangle = new THREE.Mesh(geometry, material)
scene.add(triangle)

// const geometry = new THREE.PlaneGeometry(1,1)
// const material = new THREE.MeshBasicMaterial({ 
//     color: 0x000065,
//     // wireframe: true,
//     side: THREE.DoubleSide,
// })
// const plane = new THREE.Mesh(geometry, material)
// scene.add(plane)



// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Fullscreen
window.addEventListener("dblclick", () => {
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()