import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
/**
 * Ray Caster
 * usage examples
 * Detect if there is a wall in front of the player
 * Test if the laser gun hit something
 * Test if something is currently under the mouse to simulate mouse events
 * show an alert message if the spaceship is heading towards a planet
 */

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster()

// vector 3 the direction has to be normalized
const rayOrigin = new THREE.Vector3(-3, 0, 0)
const rayDirection = new THREE.Vector3(10,0,0)
rayDirection.normalize()


// we can use set() method to set the origin and the direction
raycaster.set(rayOrigin, rayDirection)

// cast a ray
// two options intersectObject() to test one object and intersectObjects() to test an array of objects

const intersect = raycaster.intersectObject(object2)
console.log(intersect)

const intersects = raycaster.intersectObjects([object1,object2,object3])
console.log(intersects)

/**
 * intersect object contains useful infos
 * distance => distance between the origin of the ray and the collision point
 * face => what face the geometry was hit by the ray
 * faceIndex => the index of that face
 * object => what object is concerned by the collision
 * point => a Vector3 of the exact position of the collision
 * uv => the UV coordinates in that geometry
 * hints: if we want to test things while they are moving, we have to do the test on each frame
 * we are going to animate the spheres and turn them blue when the ray intersects with them
 * 
 */



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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

/**
 * Mouse events with raycaster
 * we need the coordinates of the mouse but not in pixels
 * we need a vlaue that goes from -1 to 1 in horizontal and vertical axes
 *  we need to create a mouse variable with a vector2 and update it when the mouse is moving

*/
/**
 * Mouse cursor
 */

const mouse  = new THREE.Vector2();

const mousemove = (event) => {
    // this to make width and height goes from -1 to 1
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
}

window.addEventListener('mousemove', mousemove)

// const transformCamera = (event) => {
//     const objectsTest = [ object1 , object2, object3]
//     // const inters = raycaster.intersectObjects(objectsTest)
//     const inters = raycaster.intersectObject(object2)
//     const inters2 = raycaster.intersectObject(object1)
//     if( inters.length !== 0 ){
//         const info = document.querySelector('.info');
//         info.style.display = "block"
//         const exit = document.querySelector('.exit');
//         console.log(exit)
//         exit.addEventListener('click', (e) => {
//             e.stopPropagation()
//             info.style.display = 'none';
//         })
//     }
//     if ( inters2.length !== 0)
//     {
//         camera.position.x = -3
//         camera.position.y = 2
//         camera.position.z = 4
//     }
// }

// window.addEventListener('click', transformCamera)

window.addEventListener('click', () => {
    if(currentIntersect)
    {
        switch(currentIntersect.object)
        {
            case object1:
                console.log("click on object 1")
                break
            case object2:
                console.log("click on object 2")
                break
            case object3:
                console.log("click on object 3")
                break
        }
    //    if(currentIntersect.object === object1)
    //     {
    //         console.log("click on object 1")
    //         } 
    //     else if (currentIntersect.object === object2)
    //         {
    //         console.log("click on object 2")
    //         }
    //     else if (currentIntersect.object === object3)
    //         {
    //             console.log("click on object 3")
    //         }
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
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()


let currentIntersect = null
console.log(currentIntersect) 
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Animate objects

    // the value with multiplate inside brackets is to speed and out side is to spread the position
    object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5
    object2.position.y = Math.sin(elapsedTime * 0.8) * 1.5
    object3.position.y = Math.sin(elapsedTime * 1.4) * 1.5


     // // Cast a ray with mouse goes from -1 to 1
    //  use the setfromcamera() method to orient the ray in the right direction the rest is the same
    
    // must update each frame to listen to actions
    raycaster.setFromCamera(mouse, camera)

    // // Cast a ray with line goes from -3 to 1
    // const rayOrigin = new THREE.Vector3(-3,0,0)
    // const rayDirection = new THREE.Vector3(1,0,0)
    // rayDirection.normalize()

    // raycaster.set(rayOrigin, rayDirection)

    const objectToTest = [ object1 , object2, object3]
    const intersects = raycaster.intersectObjects(objectToTest)

    for(const object of objectToTest)
    {
        object.material.color.set('#ff0000')
    }

    for(const intersect of intersects)
    {
        intersect.object.material.color.set("#0000ff")
    }

    if(intersects.length)
    {
        if(currentIntersect === null)
        {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
        
    } else{
        if(currentIntersect)
            {
                console.log('mouse leave')
            }

        currentIntersect = null
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()