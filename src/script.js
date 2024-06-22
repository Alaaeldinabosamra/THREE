import './style.css'
import * as THREE from 'three'

// we import it manually from controls file
// we use it without calling a THREE
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Controls
 * 1. Device orientation controls 
 * will automatically retrieve the device orientation if you device, os and browser allow it and rotate the camera accordingly
 * useful it to create immersive universes or VR experience
 * 2. FLY controls
 * enable moving the camera like if you were on a spaceship
 * you can rotate on all 3 axes, go forward and go backward
 * 3. first person controls
 * is like fly control but with a fixed up axis does nt work like fps games
 * 4. pointer lock controls
 * use the pointer lock javascript api hard to use and almost only handles the pointer lock and camera rotation
 * 5. orbit controls
 * orbit controls similar to the controls we made with more features
 * 6. trackball controls
 * is like orbitcontrols without the vertical angle limit
 * 7. transform controls
 * has nothing to do with the camera
 * 8. drag controls
 * has nothing to do with the camera
 */



/**
 * Cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) =>{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
    console.log(event.clientX , event.clientY)
})


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// camera is an abstract class
// THREE.[---]Camera(field of view, ASPECT RATIO, Near, Far)
/**
 * field of view => vertical vision angle(video-1.mp4) , in degrees
 * the width of the render divided by the height of the render
 * Near and far the third and fourth parameters correspond to how close and how far the camera can see
 * any object or part of the object closer than near of further than far will no show up popular vales of near and far is 0.1 and 100
 */
/**
 * instead of a field of view, we provide how far the camera can see i  each direction (left,right,top,bottom) then near and far
 */
// const camera = new THREE.OrthographicCamera(-1 *aspectRatio,1 *aspectRatio    ,1,-1,0.1,100)
// camera.position.x = 2
// camera.position.y = 2
// camera.position.z = 2
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.PerspectiveCamera(75, aspectRatio , 0.1 , 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

/**
 *   ArrayCamera render the scene from multiple cameras on specific ares of the render
*/
/**
 * Stereo camera render the scene through two cameras that mimic the eyes top create a parallax effect
 */
/**
 * the CubeCamera do 6 renders, each one facing a different direction
 * can render the surrounding for things like environment map, reflection or shadow map.
 */
/**
 * ORTHOGRAPHIC camera
 * render the scene without perspective
 */
/**
 * PERSPECTIVE camera
 * render the scene with perspective
 */

/**
 * Controls
 */
 const controls = new OrbitControls(camera, canvas)

//  controls.target.y = 1
//  controls.update()

// DAMPING control 
// the damping with smooth the animation by adding some kind of acceleration and friction
// to enable the damping switch the enableDamping property to true
controls.enableDamping = true
// then we update controls inside tick function to enable damping every frame




// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// keyword control

// const rButton= window.addEventListener('on')

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    // // Update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()