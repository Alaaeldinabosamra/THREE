import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Particles
 * can be used to create stars,smoke,rain,dust,fire,etc.
 * you can have thousands f them with a reasonable frame rate
 * each particle is composed of a plane (two triangles) always facing the camera
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
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/textures/particles/4.png')
// for more find particles
// https://www.jenney.nl/assets/particle-pack


/**
 * Particles
 */
// geometry
// const particlesGeometry = new THREE.SphereGeometry(1,32,32)
// const particlesGeometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const particlesGeometry = new THREE.BufferGeometry();
const count = 1200

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for(let i = 0; i < count * 3; i++){
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
}

particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions,3)
)

particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors,3)
)


// material
// const particlesMaterial = new THREE.PointsMaterial({
//     size: 0.02,
//     sizeAttenuation: true,
//     color: "red"
// })
const particlesMaterial = new THREE.PointsMaterial()
particlesMaterial.size = 0.1
particlesMaterial.sizeAttenuation = true
particlesMaterial.color = new THREE.Color("#ff88cc")
// particlesMaterial.map = particleTexture
// to remove black edges we use alpha map instead of map
particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture
particlesMaterial.alphaTest = 0.001 // for more clearly edges
// particlesMaterial.depthTest = false // when drawing the webgl tests if what's being drawn is closer than what's already drawn
// depth have a problem with object it not care of it at all and display of all area the solutions
particlesMaterial.depthWrite = false

// make particles more bright it impact the performance
// particlesMaterial.blending = THREE.AdditiveBlending

particlesMaterial.vertexColors = true // mixing random colors with based color 

// points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles)


// Cube
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)



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
renderer.setClearColor('#111111')
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // animate objects

    // animate hole particles
    particles.rotation.y = elapsedTime  * 0.2

    // animate each particle => you should avoid this technic cuz updating the whole attribute on each frame is bad for performances
    for(let i = 0; i < count; i++){
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    // update transform to particles
    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()