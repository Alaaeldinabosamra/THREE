import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

/**
 * 3D Models
 * many 3d model formats, each one responding to a problem
 * what data
 * weight
 * compression
 * compatibility
 * copyrights
 * etc
 * popular formats
 * obj
 * fbx
 * stl
 * ply
 * collada
 * 3ds
 * gltf
 * https://github.com/KhronosGroup/glTF-Sample-Models/tree/main/2.0
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Models
 */
const gltfLoader = new GLTFLoader()

// to can access in tick function
let mixer = null

gltfLoader.load(
    // '/models/alaaeldin/gltf-1.gltf',
    // '/models/alaaeldin/model.glb',
    // '/models/alaaeldin/model0.glb',
    // '/models/Duck/glTF/Duck.gltf',
    // '/models/FlightHelmet/glTF/FlightHelmet.gltf',
    '/models/Fox/glTF/Fox.gltf',
    (gltf) => {
        // scene.add(gltf.scene.children[0])
        
        // for multiple meshes loading we have more options
        
        // option 1
        // while(gltf.scene.children.length)
        // {
        //     scene.add(gltf.scene.children[0])
        // }
        
        // option 2
        // const children = [...gltf.scene.children]
        // for(const child of children)
        // {
        //     scene.add(child)
        // }
        
        // option 3 it add group meshes
        scene.add(gltf.scene)
        gltf.scene.position.set(-2,0,0)

        // scale for large models
        gltf.scene.scale.set(0.025, 0.025, 0.025)

        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])

        action.play()
    },
    () => {
        console.log('progress')
    },
    () => {
        console.log('error')
    }
)

//////////////////////////////////


const fbxLoader = new FBXLoader()

let fbxMixer = null

fbxLoader.load(
    '/models/alaaeldin/model1.fbx',
    (object) => {
        scene.add(object)
        
        // Animation
        // fbxMixer = new THREE.AnimationMixer(object)
        // const action = mixer.clipAction(object.animations[0])
        // console.log(fbxMixer)
        // action.play()
    },
    () => {
        console.log('progress')
    },
    () => {
        console.log('error')
    }
)

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: '#444444',
        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

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
camera.position.set(2, 2, 2)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // update mixer [Imported GLTF models]
    if(mixer !== null)
    {
        mixer.update(deltaTime)
    }
    // update mixer [Imported FBX models]
    if(fbxMixer !== null)
    {
        fbxMixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()