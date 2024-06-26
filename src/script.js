import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
/**
 * to use arabic typefont
 * npm install troika-three-text
 * 
 */
// import {Text} from 'troika-three-text'
/**
 * Text 3D
 * we can convert a font with tools like https://gero3.github.io/facetype.js/
 * first we import facefont we want to use
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

// Axes helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture1 = textureLoader.load('/textures/matcaps/5.jpg')
/**
 * Fonts
 */
// const fontLoader = new FontLoader()
const fontLoader = new FontLoader()


fontLoader.load(
    // '/fonts/helvetiker_regular.typeface.json',
    // '/fonts/Chewy_Regular.typeface.json',
    // '/fonts/Lemonada_Regular.typeface.json',
    // '/fonts/MarheyLight_Regular.typeface.json',
    '/fonts/Silkscreen_Regular.typeface.json',
    (font) => {
        const textGeometry = new TextGeometry(
            'Hello Three Js !',
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
        scene.add(text)

        // create outside for loop for better performance and low time execute
        const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
        const donutMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture1})

        for(let i =0; i < 200; i++)
            {
                
                const donut = new THREE.Mesh(donutGeometry, donutMaterial)

                donut.position.x = (Math.random() - 0.5) * 10
                donut.position.y = (Math.random() - 0.5) * 10
                donut.position.z = (Math.random() - 0.5) * 10
  
                donut.rotation.x = Math.random() * Math.PI
                donut.rotation.y = Math.random() * Math.PI

                const scale = Math.random()
                donut.scale.set(scale,scale,scale)

                scene.add(donut)
            }
    }

    
)





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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()