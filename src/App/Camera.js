import * as THREE from  'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sizesStore } from './Utils/Store';

import App from './Application'

class Camera {
    constructor() {
        this.app = new App()
        this.canvas = this.app.canvas
        
        this.sizesStore = sizesStore

        this.sizes = sizesStore.getState()

        this.setInstance()
        this.setControls()
        this.setResizeLister()
    }

    setInstance() {
        // initalize camera
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            0.1,
            200
        )
        this.instance.position.z = 5
    }
    setControls() {
        this.controls = new OrbitControls(this.instance,this.canvas);
        this.controls.enableDamping = true
    }
    setResizeLister() {
        this.sizesStore.subscribe((sizes) =>{
            this.instance.aspect = sizes.width / sizes.height
            this.instance.updateProjectionMatrix()
        })
    }
    loop () {
        this.controls.update()

    }
}

export default Camera