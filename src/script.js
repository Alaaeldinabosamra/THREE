import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
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
 * Lights
 * adding lights is as simple as adding meshes
 * we instatiate with the right class and add it the secne
 * ---AmbientLight (color, intensity) =>الإضاءة المحيطة
 * ---DirectionalLight(color, intensity) => الإضاءة المتجهه
 * ---HemisphereLight(color [sky color],ground color,intensity)
 * ---PointLight(color, intensity, distance, decay)
 * ---RectAreaLight(color,intensity,width,height)
 * ---SpotLight(color,intensity,distance,angle,penumbra,decay) 
 */
// do light in all three experience
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01)

// do light in the direction which we position on
const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)

// red from sky will apply from top and blue from bottom and between them mix of blue and red => purple
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

// we have a small point and this point spreads in every directions.
// third parameter Distance is used for how fast it fades with distance and decay
const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2)
pointLight.position.x = 1
pointLight.position.y = -0.5
pointLight.position.z = 1
scene.add(pointLight)

// works like the big reactangle lights you can see on photoshoot set
// it mix between a directional light and a diffuse light
// This light works only with MeshStandardMaterial and MeshPhysicalMaterial
const rectAreaLight = new THREE.RectAreaLight(0x4c00ff,2,1,1);
rectAreaLight.position.set(-1.5,0,1.5)
rectAreaLight.lookAt(new THREE.Vector3()) // look to center default value (0,0,0)
scene.add(rectAreaLight)

// spotlight is like a flashlight its a cone of light starting a point and oriented in the direction
// penumbra to fade the edges of the light circle 
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI *0.1,0.25,1)
spotLight.position.set(0,2,3)
scene.add(spotLight)

spotLight.target.position.x = -0.75
scene.add(spotLight.target)

 
/**
 * minimal cost
 * ambient light
 * hemisphere light
 */
/**
 * moderate cost
 * directional light
 * point light
 */
/**
 * high cost
 * spot light
 * rectArea light
 */

/**
 * BAKING
 * the idea is to bake the light into the texture
 */

//Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1)
scene.add(hemisphereLightHelper)

const directionsLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1)
scene.add(directionsLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight, 0.1)
scene.add(spotLightHelper)

window.requestAnimationFrame(() => {
    spotLightHelper.update()
})

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

window.requestAnimationFrame(() => {
    rectAreaLightHelper.position.copy(rectAreaLight.position)
    // quaternion for rotation move
    rectAreaLightHelper.quaternion.copy(rectAreaLight.quaternion)
    // rectAreaLightHelper.position.x = rectAreaLight.position.x
    // rectAreaLightHelper.position.y = rectAreaLight.position.y
    // rectAreaLightHelper.position.z = rectAreaLight.position.z
    rectAreaLightHelper.update()
})

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()