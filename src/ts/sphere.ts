
//three modules 
import * as THREE from 'three';
import {
	EventDispatcher,
	MOUSE,
	Quaternion,
	Spherical,
	TOUCH,
	Vector2,
	Vector3,
	Plane,
	Ray,
	MathUtils,
    LinearFilter,
	Mesh,
	NearestFilter,
	OrthographicCamera,
	PlaneGeometry,
	RGBAFormat,
	Scene,
	ShaderMaterial,
    ShaderLib,
	StereoCamera,
	WebGLRenderTarget
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader.js';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// font zone
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';



// global vars
let container;
let mouseX = 0;
let mouseY = 0;
let windowHeight = window.innerHeight;
let windowWidth = window.innerWidth;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let scene = new THREE.Scene();
let sceneReady = false;
let renderer: any;
// let isRendering = true;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
const videos = document.querySelectorAll('#video');
const videoColorsArray: { colorHex: string }[] = [];
const colorImages = document.querySelectorAll('#colorImages');
let vertexArray: Array<{x: number, y: number, z: number}> = [];
let targetVertices: Array<{x: number, y: number, z: number}> = [];
let planeTextures: THREE.Texture[] = [];
let planes = [] as  any;
let buttonMesh;
let selColorObj = videoColorsArray[0];
const cameras = [] as any;
let camera1 = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
camera1.position.z = .001;
let camera2 = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
camera2.position.z = .001;
let camera3 = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
camera3.position.z = .001;
cameras.push(camera1, camera2, camera3);
let cameraArrayPosition = 0;
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
var planeGeometry = new THREE.PlaneGeometry( 5, 2.5, 6, 6 );
let sphereCount;
let numOfTextures = 12;

let video, texture, material, mesh;
let composer: any, control, effect;
let uniforms;
let shaderMaterial: any;
// font zone





// escape button
document.addEventListener('keydown', handleKeyPress);
function handleKeyPress(event: KeyboardEvent): void {
  if (event.key === 'X' || event.key === 'x') {
    window.location.href = '/index.html';
  }
}
// escape button


init();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    renderer.autoClear = true;
    container.appendChild(renderer.domElement);

    scene.background = new THREE.Color('#000000');
    directionalLight.position.set(1, 1, 1);
    scene.add(ambientLight, directionalLight);

    // outer background sphere 

    // var outerSphere = new THREE.Mesh(
    //     new THREE.SphereGeometry( 12, 12, 12 ), // (radius, width segements, height segments)
    //     new THREE.MeshBasicMaterial({
    //         color: 0xff00ff,
    //         transparent: true,
    //         opacity: 0,
    //         wireframe: true,
    //         side: THREE.BackSide,
    //     })
    // );
    // scene.add(outerSphere);
			
    // video positioning sphere creation
    var sphere = new THREE.Mesh(

        new THREE.SphereGeometry( 10, 10, 8), // (radius, width segements, height segments)
        new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0,
            wireframe: false,
        })
    );
    scene.add(sphere);


    if (
        sphere &&
        sphere.geometry &&
        sphere.geometry.attributes &&
        sphere.geometry.attributes.position
    ) {
        sphereCount = sphere.geometry.attributes.position.count;
    } else {
        console.error("The sphere geometry does not have position attributes.");
        return;
    }

    for (let i = 0; i < sphereCount; i++) {
        const positionAttribute = sphere.geometry.attributes.position;
    if (positionAttribute) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        const z = positionAttribute.getZ(i);
        vertexArray.push({x: x, y: y, z: z});
    } else {
        console.error("Position attribute is undefined.");
    }
    }
    for (let i = 0; i < sphereCount; i++) {
        if (vertexArray[i] !== undefined && vertexArray[i].y >= -5 && vertexArray[i].y <= 5) {
            targetVertices.push(vertexArray[i]);
        }
    }
    targetVertices.sort((a, b) => {
        return a.z - b.z;
    });

    videos.forEach((video) => {
        let videoElement = video as HTMLVideoElement;
        let texture = new THREE.VideoTexture(videoElement);
        texture.colorSpace = THREE.SRGBColorSpace;
        planeTextures.push(texture);
        videoElement.play();
    });

    // // video colors function
    // function calculateAverageColor(data: Uint8ClampedArray): { r: number; g: number; b: number } {
    //     let r = 0, g = 0, b = 0;
    //     for (let i = 0; i < data.length; i += 4) {
    //         r += data[i];
    //         g += data[i + 1];
    //         b += data[i + 2];
    //     }
    //     const pixelCount = data.length / 4;
    //     return { r: Math.floor(r / pixelCount), g: Math.floor(g / pixelCount), b: Math.floor(b / pixelCount) };
    // }
    
    // async function waitForAllImagesToProcess(imageUrls: string[]): Promise<void> {
        
    //     const promises = imageUrls.map(async (url) => {
    //         return new Promise<void>((resolve, reject) => {
    //             const image = new Image();
    //             image.src = url;
    
    //             image.onload = () => {
    //                 const canvas = document.createElement('canvas');
    //                 const context = canvas.getContext('2d')!;
    //                 if (!context) {
    //                     reject(new Error('Failed to get canvas context.'));
    //                     return;
    //                 }
    
    //                 canvas.width = image.naturalWidth || image.clientWidth;
    //                 canvas.height = image.naturalHeight || image.clientHeight;
    
    //                 context.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    //                 const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    //                 const data = imageData.data;
    
    //                 const { r, g, b } = calculateAverageColor(data);
    //                 const colorHex = '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
    //                 videoColorsArray.push({ colorHex });
    
    //                 resolve();
    //             };
    
    //             image.onerror = (error) => {
    //                 console.error(`Failed to load image ${url}: `, error);
    //                 reject(error);
    //             };
    //         });
    //     });
    
    //     try {
    //         await Promise.all(promises);
    //         console.log(videoColorsArray);
    //     } catch (error) {
    //         console.error('Error processing images:', error);
    //     }
    // }
    
    // const imageUrls = Array.from(colorImages).map(img => img.src);
    
    // waitForAllImagesToProcess(imageUrls);
    
    // video colors function
    
    // Font loading and TextGeometry creation
    const loader = new FontLoader();
    loader.load('assets/helvetiker_regular.typeface.json', (font) => {

        const line1Geometry = new TextGeometry('CLICK HERE', {
            font: font,
            size: 0.4,
            depth: 0.1,
            curveSegments: 4,
            bevelEnabled: false
        });

        const line2Geometry = new TextGeometry('TO EXIT', {
            font: font,
            size: 0.4,
            depth: 0.1,
            curveSegments: 4,
            bevelEnabled: false
        });

        // Compute bounding boxes
        line1Geometry.computeBoundingBox();
        line2Geometry.computeBoundingBox();

        const line1Height = line1Geometry.boundingBox.max.y - line1Geometry.boundingBox.min.y;
        const line2Height = line2Geometry.boundingBox.max.y - line2Geometry.boundingBox.min.y;
        const totalTextHeight = line1Height + line2Height;

        // Button dimensions
        const buttonWidth = 5;
        const buttonHeight = 2.5;
        const buttonDepth = 0.2;

        // Calculate vertical spacing
        const availableVerticalSpace = buttonHeight - totalTextHeight;
        const verticalSpacing = availableVerticalSpace / 3; // top, middle, and bottom spacing

        // Calculate horizontal centering
        const line1Width = line1Geometry.boundingBox.max.x - line1Geometry.boundingBox.min.x;
        const line2Width = line2Geometry.boundingBox.max.x - line2Geometry.boundingBox.min.x;

        // Position lines
        line1Geometry.translate(
            -line1Width / 2, // Center horizontally
            buttonHeight / 2 - verticalSpacing - line1Height, // Top spacing
            0
        );
        line2Geometry.translate(
            -line2Width / 2, // Center horizontally
            -buttonHeight / 2 + verticalSpacing, // Bottom spacing
            0
        );

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const line1Mesh = new THREE.Mesh(line1Geometry, textMaterial);
        const line2Mesh = new THREE.Mesh(line2Geometry, textMaterial);

        // Group the text lines
        const textGroup = new THREE.Group();
        textGroup.add(line1Mesh);
        textGroup.add(line2Mesh);

        // Create button geometry
        const buttonRadius = 0.1;
        const buttonSegments = 1;
        const buttonGeometry = new RoundedBoxGeometry(buttonWidth, buttonHeight, buttonDepth, buttonSegments, buttonRadius);
        const buttonMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            emissive: 0xffffff,  // Add this line
            emissiveIntensity: .45,  // Adjust intensity as needed
            metalness: 0,
            roughness: 0,
            transmission: 1,
            thickness: 0.5,
            clearcoat: 1,
            clearcoatRoughness: 0,
            ior: 1.5,
            envMapIntensity: 1
          });
        buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);

        // Position text slightly in front of the button
        textGroup.position.z = buttonDepth / 2 + 0.01;

        // Create a group to hold both text and button
        const group = new THREE.Group();
        group.add(buttonMesh);
        group.add(textGroup);

        // Position the group at the first vertex position
        if (targetVertices.length > 0) {
            group.position.copy(targetVertices[0]);
            group.lookAt(cameras[cameraArrayPosition].position);
            
            scene.add(group);
            planes.push(group);
        }

        // Now create the rest of the planes, starting from index 1
        for (let i = 1; i < numOfTextures; i++) {
            const planeMaterial = new THREE.MeshBasicMaterial({ map: planeTextures[i-1] });
            var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

            planeMesh.position.copy(targetVertices[i]);
            planeMesh.lookAt(cameras[cameraArrayPosition].position);

            scene.add(planeMesh);
            planes.push(planeMesh);
        }
    });

    

    // Postprocessing
    renderer.render(scene, cameras[cameraArrayPosition]);

    // const renderPass = new RenderPass(scene, cameras[cameraArrayPosition]);
    // // const outputPass = new OutputPass();

    // composer = new EffectComposer(renderer);

    // composer.addPass(renderPass);
    // composer.addPass(outputPass);

    window.addEventListener('resize', onWindowResize);
    // document.addEventListener( 'mousemove', onDocumentMouseMove );
    window.addEventListener('mousemove', onMouseMove);
    sceneReady = true;
    // document.addEventListener( 'touchmove', onDocumentTouchMove );
}

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        cameras[cameraArrayPosition]!.aspect = window.innerWidth / window.innerHeight;
        cameras[cameraArrayPosition]!.updateProjectionMatrix();

        renderer!.setSize(window.innerWidth, window.innerHeight);
        composer!.setSize(window.innerWidth, window.innerHeight);

        // shaderMaterial.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    }

    // touchmove

    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    let initialTouchX: number, initialTouchY: number;
    let dragging = false;
    let touchX = 0;
    let touchY = 0;
    const horizontalSpeed = 0.005;
    const verticalSpeed = 0.005;
    const decelerationRate = 0.80;
    const decelThreshold = 0.02;
    let deltaX, deltaY;

    if (isTouchDevice) {
        window.addEventListener('touchstart', onTouchStart);
        window.addEventListener('touchmove', onTouchMove);
        window.addEventListener('touchend', onTouchEnd);
    }

    function onTouchStart(event: TouchEvent) {
        if (event.touches.length !== 1) return;
        initialTouchX = event.touches[0]!.clientX;
        initialTouchY = event.touches[0]!.clientY;
        dragging = true;
        touchX = 0;
        touchY = 0;
    }

    function onTouchMove(event: TouchEvent) {
        if (!dragging) return;
        deltaX = event.touches[0]!.clientX - initialTouchX;
        deltaY = event.touches[0]!.clientY - initialTouchY;
        const adjustedDeltaX = deltaX * horizontalSpeed;
        const adjustedDeltaY = deltaY * verticalSpeed;
        if (dragging) {
            touchX += adjustedDeltaX;
            touchY += adjustedDeltaY;
        }
        console.log(touchX);
        console.log(touchY);
    }

    function onTouchEnd() {
        dragging = false;
        let shouldStartLoop = true;
        function loop() {
            if (!shouldStartLoop) return;
                touchX *= decelerationRate;
                touchY *= decelerationRate;
                if (Math.abs(touchX) <= decelThreshold && Math.abs(touchY) <= decelThreshold) {
                    touchX = 0;
                    touchY = 0;
                    shouldStartLoop = false;
                } else {
                    setTimeout(loop, 50);
                }
        }
        loop();
    }

    // touchmove

    // mousemove
    let rotationX = 0;
    let rotationY = 0;
    // clamp
    let maxRotationX = Math.PI * 0.25;
    let maxRotationY = Math.PI * 0.1;
    const mouseHorizontalSpeed = 0.02;
    const mouseVerticalSpeed = 0.02;

    function onMouseMove(event: MouseEvent) {
        let mouseX = 0.5 - (event.clientX / window.innerWidth);
        let mouseY = 0.5 - (event.clientY / window.innerHeight);
        rotationX = Math.max( -maxRotationY, Math.min(maxRotationY, mouseY * 2 * maxRotationY));
        rotationY = Math.max( -maxRotationX, Math.min( maxRotationX, mouseX * 2 * maxRotationX ));
    }

    function animate() {
        // if (!isRendering) return;
        let curCam = cameras[cameraArrayPosition];

        if (isTouchDevice) {
        curCam.rotation.y += ( touchX * -0.0009 );
        curCam.rotation.x += ( touchY * -0.0009 );
        }

        curCam.rotation.y += (rotationY - curCam.rotation.y) * mouseVerticalSpeed;
        curCam.rotation.x += (rotationX - curCam.rotation.x) * mouseHorizontalSpeed;

        renderer!.render( scene!, curCam);
        if (sceneReady) {
            raycasterFunc();
        }
    }

    function updateCameraFOV() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            if (window.matchMedia("(orientation: portrait)").matches) { // Portrait mode
                cameraArrayPosition = 1;
            } else { // Landscape mode
                cameraArrayPosition = 2;
            }
        } else { // Desktop
            cameraArrayPosition = 0;
        }
    }
        updateCameraFOV();
        screen.orientation.addEventListener("change", updateCameraFOV);

    // function clamp(value, minClamp, maxClamp) {
    //     return Math.min(maxClamp, Math.max(minClamp, value));
    // }

    let isButtonHovered = false;
    
    let isMouseDown = false;
    let e: Event;
    document.addEventListener('mousedown', (e) => { 
        isMouseDown = true;
        e.preventDefault();
    });
    document.addEventListener('mouseup', () => {
         isMouseDown = false; 
    });


    function raycasterFunc() {
        if (!buttonMesh) {
            return;
        }
            
        raycaster.setFromCamera(mouse, cameras[cameraArrayPosition]);
        const buttonIntersects = raycaster.intersectObject(buttonMesh);
        const isCurrentlyHovered = buttonIntersects.length > 0;

        if (isCurrentlyHovered !== isButtonHovered) {
            isButtonHovered = isCurrentlyHovered;
            if (isButtonHovered) {
                
                buttonMesh.material.emissiveIntensity = 0.7;
            } else {
                buttonMesh.material.emissiveIntensity = 0.45;
            }
        }

        if (isCurrentlyHovered && isMouseDown) {
            window.location.href = 'index.html';
        }
    
    }
