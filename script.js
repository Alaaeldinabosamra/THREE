import * as THREE from 'three'




// Scene
const scene = new THREE.Scene()


// Red Cube
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({ color: "red" })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// Sizes
const sizes = {
    width: 800,
    height: 600,
}

//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// position camera
camera.position.z = 3
scene.add(camera)


// Renderer
// to retrieve the canvas we created in the HTML file
const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width,sizes.height)

renderer.render(scene, camera)
