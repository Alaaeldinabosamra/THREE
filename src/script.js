import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Textures
 * textures are images that will cover the surface of the geometries many types with many different effects
 * COLOR [most simple one , applied on the geometry]
 * ALPHA [Grayscale image => white part will visible , black part will not visible]
 * HIGHT (OR DISPLACEMENT) [Grayscale image, move the vertices to create some relief, need enough subdivision ]
 * NORMAL Texture [Add details about light, doesn't need sub division, the vertices won't move, lure the light about the face orientation, better performances that adding a height texture with a lot of sub division]
 * AMBIENT OCCLUSION [Grayscale image, Add fake shadows in crevices , not physically accurate, Helps to create contrast and see details]
 * METALNESS [Grayscale image, white is metallic, black is on-metallic, Mostly for reflection]
 * ROUGHNESS [Grayscale image, in duo with the metalness, white in rough , black is smooth, mostly for light dissipation] خشونة
 * those textures (especially the metalness and the roughness) follow the PBR principles
 * Physically Based Rendering
 * Many technics that tend to follow real-life directions to get realistic results
 * Becoming the standard for realistic renders
 * Many software, engines, and libraries are using it
 */

/**
 // the users will have to download the texture choose the right type of file
 * .jpg -- lossy compression but usually lighter
 *.png -- lossless compression but usually heavier
^^^ you can use compression websites and softwares like TinyPNG
note: the mipmapping will produce a half smaller version of the texture repeatedly until 1x1
because of that the texture width and height must be a power of 2
    512x512
    1024x1024
    512x2048
*/

/**
 * Textures with native js
 */
// const image = new Image()
// const image1 = new Image()

// // hint: we cannot use the image directly and we need transform it into a Texture 
// const texture = new THREE.Texture(image)
// // then use texture in material


// image.onload = () =>{
//    texture.needsUpdate = true
// }

// image.src = '/textures/door/color.jpg'

/**
 * Textures
 */

const loadingManager = new THREE.LoadingManager()

// loadingManager.onStart = () => {
//     console.log('onStart')
// }
// loadingManager.onLoad = () => {
//     console.log('onLoad')
// }
// loadingManager.onProgress = () => {
//     console.log('onProgress')
// }
// loadingManager.onError = () => {
//     console.log('onError')
// }

// one textureloader can load multiple images 
// in load method we can send 3 functions after the path load - progress - error
const textureLoader = new THREE.TextureLoader(loadingManager)
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const eyesTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
const chessTexture = textureLoader.load('/textures/checkerboard-8x8.png')
const logoTexture = textureLoader.load('/logos/logo-bg.png')

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
 
// eyesTexture.minFilter = THREE.NearestFilter

// we use generateMipmaps to reduce the frame rate 
chessTexture.generateMipmaps = false
chessTexture.minFilter = THREE.NearestFilter
chessTexture.magFilter = THREE.NearestFilter

// const texture = textureLoader.load(
//     '/textures/door/color.jpg',
//     () => 
//     {
//         console.log('load')
//     },
//     () => 
//     {
//         console.log('progress')
//     },
//     () => 
//     {
//         console.log('error')
//     },
// )

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object logo
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ map: logoTexture , color: 0xffffff , blending: true })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
// console.log(geometry.attributes.uv)
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
const material = new THREE.MeshBasicMaterial({ map: chessTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)





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
camera.position.x = 2
camera.position.y = 2
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()