import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

// Define the handle type for the component
export interface RoleModelHandle {
  pauseAnimation: () => void;
  resumeAnimation: () => void;
}

interface RoleModelProps {
  modelUrl?: string;
  className?: string;
}

// Define GLTF type
interface GLTF {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  scenes: THREE.Group[];
  cameras: THREE.Camera[];
  asset: any;
}

const RoleModel = forwardRef<RoleModelHandle, RoleModelProps>(({
  // Default model URL - this is a sample URL, replace with your actual model
  modelUrl = 'https://assets.codepen.io/1376857/RobotExpressive.glb',
  className = ''
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const animationsRef = useRef<THREE.AnimationClip[]>([]);
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isPausedRef = useRef<boolean>(false);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  
  // Animation states
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('Idle');
  
  // Animation names that might be in the model
  const possibleAnimations = [
    'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing',
    'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'
  ];

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    pauseAnimation: () => {
      isPausedRef.current = true;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      if (mixerRef.current) {
        mixerRef.current.timeScale = 0;
      }
    },
    resumeAnimation: () => {
      if (isPausedRef.current) {
        isPausedRef.current = false;
        if (mixerRef.current) {
          mixerRef.current.timeScale = 1;
        }
        animate();
      }
    }
  }));

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 4);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);

    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Add grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x555555, 0x333333);
    scene.add(gridHelper);

    // Load 3D model
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.5/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      modelUrl,
      (gltf: GLTF) => {
        const model = gltf.scene;
        model.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        
        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x = -center.x;
        model.position.y = -center.y;
        model.position.z = -center.z;
        
        // Adjust model position
        model.position.y = 0;
        
        // Add model to scene
        scene.add(model);
        modelRef.current = model;
        
        // Set up animation mixer
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;
        
        // Store animations
        animationsRef.current = gltf.animations;
        
        // Play default animation if available
        if (gltf.animations.length > 0) {
          // Find idle animation if it exists
          let idleAnimation = gltf.animations.find(
            (anim: THREE.AnimationClip) => possibleAnimations.some(name => 
              anim.name.toLowerCase().includes(name.toLowerCase())
            )
          );
          
          // If no named animation found, use the first one
          if (!idleAnimation) {
            idleAnimation = gltf.animations[0];
          }
          
          const action = mixer.clipAction(idleAnimation);
          action.play();
          activeActionRef.current = action;
          setCurrentAnimation(idleAnimation.name);
        }
        
        setIsLoaded(true);
      },
      (xhr: ProgressEvent) => {
        console.log(((xhr.loaded / xhr.total) * 100) + '% loaded');
      },
      (error: unknown) => {
        console.error('An error happened', error);
      }
    );

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Start animation loop
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [modelUrl]);

  // Animation loop
  const animate = () => {
    if (isPausedRef.current) return;

    const delta = clockRef.current.getDelta();
    
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    
    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    
    animationFrameId.current = requestAnimationFrame(animate);
  };

  // Set up scroll-based animations
  useEffect(() => {
    if (!isLoaded || !modelRef.current || !cameraRef.current || animationsRef.current.length === 0) return;

    // Create a timeline for camera movement
    const cameraTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Change animation based on scroll progress
          if (mixerRef.current && animationsRef.current.length > 0) {
            let newAnimation;
            
            // Select animation based on scroll progress
            if (progress < 0.2) {
              newAnimation = findAnimation('Idle') || animationsRef.current[0];
            } else if (progress < 0.4) {
              newAnimation = findAnimation('Walking') || animationsRef.current[0];
            } else if (progress < 0.6) {
              newAnimation = findAnimation('Running') || animationsRef.current[0];
            } else if (progress < 0.8) {
              newAnimation = findAnimation('Dance') || animationsRef.current[0];
            } else {
              newAnimation = findAnimation('Wave') || animationsRef.current[0];
            }
            
            // Change animation if different from current
            if (newAnimation && newAnimation.name !== currentAnimation) {
              changeAnimation(newAnimation);
            }
          }
        }
      }
    });

    // Animate camera position based on scroll
    cameraTimeline.to(cameraRef.current.position, {
      x: 3,
      y: 2,
      z: 2,
      duration: 1,
      ease: 'none'
    }, 0);
    
    // Animate camera rotation based on scroll
    cameraTimeline.to(cameraRef.current.rotation, {
      x: 0.1,
      y: 0.5,
      z: 0,
      duration: 1,
      ease: 'none'
    }, 0);
    
    // Animate model rotation based on scroll
    if (modelRef.current) {
      cameraTimeline.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 1,
        ease: 'none'
      }, 0);
    }

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded, currentAnimation]);

  // Helper function to find animation by name
  const findAnimation = (name: string) => {
    return animationsRef.current.find(anim => 
      anim.name.toLowerCase().includes(name.toLowerCase())
    );
  };

  // Helper function to change animation with crossfade
  const changeAnimation = (newClip: THREE.AnimationClip) => {
    if (!mixerRef.current) return;
    
    const previousAction = activeActionRef.current;
    const newAction = mixerRef.current.clipAction(newClip);
    
    if (previousAction !== newAction) {
      // Crossfade to new animation
      newAction.reset();
      newAction.setLoop(THREE.LoopRepeat, Infinity);
      newAction.play();
      
      if (previousAction) {
        newAction.crossFadeFrom(previousAction, 0.5, true);
      }
      
      activeActionRef.current = newAction;
      setCurrentAnimation(newClip.name);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`role-model-container w-full h-screen ${className}`}
      style={{ position: 'relative' }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          Loading 3D Model...
        </div>
      )}
    </div>
  );
});

export default RoleModel;
