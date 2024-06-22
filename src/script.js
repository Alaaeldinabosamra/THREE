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

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
// to get the viewport width and height, use window.innerWidth and window.innerHeight
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

// this for responsive and resize window
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Handle full Screen
 * we add full screen mode by double clicking anywhere listen to db click event
 */

window.addEventListener('dblclick', () => {
    // to make it in safari browser
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!document.fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitFullscreenElement){
            canvas.requestFullscreen()
        }
        
    }else {
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen){
            document.exitFullscreen()
        }
    }
})



/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
// controls.enabled = false // stop orbit controls
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // to see a better quality picture and vision


/**
 * Keyboard Events
 */

// window.addEventListener('keypress', (e) => {
//     let keyCode = e.code 
//     if(keyCode === "KeyR"){
//        console.log('You just press on key R')
//     }
// })

// check key code what i pressed

// window.addEventListener('keypress', (e) => {
//     alert(`you just press ${e.code} `)
// })

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Animations
    mesh.rotation.y = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()