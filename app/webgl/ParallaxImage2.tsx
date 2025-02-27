import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

interface ParallaxImageProps {
  imageOriginal: string;
  imageDepth: string;
  horizontalThreshold: number;
  verticalThreshold: number;
}

export default function ParallaxImage2({
  imageOriginal,
  imageDepth,
  horizontalThreshold,
  verticalThreshold
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameId = useRef<number | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    renderer: THREE.WebGLRenderer;
    material: THREE.ShaderMaterial;
    startTime: number;
    mouseX: number;
    mouseY: number;
    mouseTargetX: number;
    mouseTargetY: number;
    imageAspect: number;
    geometry: THREE.PlaneGeometry;
  } | null>(null);
  const gn = useRef(new GyroNorm())

  useEffect(() => {
    if (!containerRef.current || sceneRef.current) return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const startTime = new Date().getTime();

    // 创建场景
    const scene = new THREE.Scene();
    
    // 创建相机
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(windowWidth, windowHeight);
    const canvasDom = renderer.domElement;
    containerRef.current.appendChild(canvasDom);

    // 创建着色器材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        image0: { value: null },
        image1: { value: null },
        mouse: { value: new THREE.Vector2() },
        resolution: { value: new THREE.Vector4() },
        threshold: { value: new THREE.Vector2(horizontalThreshold, verticalThreshold) }
      },
      vertexShader: vertex,
      fragmentShader: fragment
    });

    // 创建平面几何体
    const geometry = new THREE.PlaneGeometry(2, 2);
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    sceneRef.current = {
      scene,
      camera,
      renderer,
      material,
      geometry,
      startTime,
      mouseX: 0,
      mouseY: 0,
      mouseTargetX: 0,
      mouseTargetY: 0,
      imageAspect: 1
    };

    // 加载纹理
    const textureLoader = new THREE.TextureLoader();
    Promise.all([
      new Promise<THREE.Texture>((resolve, reject) => 
        textureLoader.load(imageOriginal, resolve, undefined, reject)
      ),
      new Promise<THREE.Texture>((resolve, reject) => 
        textureLoader.load(imageDepth, resolve, undefined, reject)
      )
    ]).then(([texture0, texture1]) => {
      if (!sceneRef.current) return;
      sceneRef.current.material.uniforms.image0.value = texture0;
      sceneRef.current.material.uniforms.image1.value = texture1;
      sceneRef.current.imageAspect = texture0.image.height / texture0.image.width;
      handleResize();
      animate();
    }).catch(error => {
      console.error('Error loading textures:', error);
    });

    // 动画循环
    const animate = () => {
      if (!sceneRef.current) return;
      const {
        material,
        scene,
        camera,
        renderer,
        startTime,
        mouseTargetX,
        mouseTargetY
      } = sceneRef.current;

      const currentTime = (new Date().getTime() - startTime) / 1000;
      material.uniforms.time.value = currentTime;

      sceneRef.current.mouseX += (mouseTargetX - sceneRef.current.mouseX) * 0.05;
      sceneRef.current.mouseY += (mouseTargetY - sceneRef.current.mouseY) * 0.05;

      material.uniforms.mouse.value.set(sceneRef.current.mouseX, sceneRef.current.mouseY);

      renderer.render(scene, camera);
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // 处理窗口大小变化
    const handleResize = () => {
      if (!sceneRef.current) return;
      const { renderer, camera, material, imageAspect } = sceneRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);

      let a1, a2;
      if (height / width < imageAspect) {
        a1 = 1;
        a2 = (height / width) / imageAspect;
      } else {
        a1 = (width / height) * imageAspect;
        a2 = 1;
      }
      
      material.uniforms.resolution.value.set(width, height, a1, a2);
    };

    // 添加事件监听
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      const halfX = window.innerWidth / 2;
      const halfY = window.innerHeight / 2;

      sceneRef.current.mouseTargetX = (halfX - e.clientX) / halfX;
      sceneRef.current.mouseTargetY = (halfY - e.clientY) / halfY;
    };
    function clamp(number, lower, upper) {
      if (number === number) {
        if (upper !== undefined) {
          number = number <= upper ? number : upper;
        }
        if (lower !== undefined) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }

    const gyro =() => {

  
      const maxTilt = 15;
      
  
      const rotationCoef = 0.15;
  
      gn.current.init({ gravityNormalized: true }).then(function() {
        gn.current.start(function(data) {
  
          let y = data.do.gamma;
          let x = data.do.beta;
  
          sceneRef.current.mouseTargetY = clamp(x,-maxTilt, maxTilt)/maxTilt;
          sceneRef.current.mouseTargetX = -clamp(y,-maxTilt, maxTilt)/maxTilt;
  
        });
      }).catch(function(e) {
        console.log('not supported');
  
      });
  
    }
    gyro()
    window.addEventListener('resize', handleResize);
    document.addEventListener('mousemove', handleMouseMove);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (sceneRef.current) {
        const { renderer, material, geometry } = sceneRef.current;
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        canvasDom.remove();
        sceneRef.current = null;
      }
    };
  }, [imageOriginal, imageDepth, horizontalThreshold, verticalThreshold]);

  return (
    <div 
      ref={containerRef} 
      className="parallax-container" 
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    />
  );
}
