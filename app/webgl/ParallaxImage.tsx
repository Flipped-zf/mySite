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

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  imageOriginal,
  imageDepth,
  horizontalThreshold,
  verticalThreshold
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketch = useRef<Sketch | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      sketch.current = new Sketch({
        container: containerRef.current,
        imageOriginal,
        imageDepth,
        horizontalThreshold,
        verticalThreshold
      });
    }

    return () => {
      // 清理代码
      if (sketch.current) {
        // 移除事件监听器等
        window.removeEventListener('resize', () => sketch.current?.resize());
        sketch.current.dispose();
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
};

class Sketch {
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private material!: THREE.ShaderMaterial;
  private container: HTMLElement;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private mouseTargetX: number = 0;
  private mouseTargetY: number = 0;
  private windowWidth: number;
  private windowHeight: number;
  private startTime: number;
  private imageAspect: number = 1;
  private maxTilt: number = 15;
  private isActive = true;

  constructor({
    container,
    imageOriginal,
    imageDepth,
    horizontalThreshold,
    verticalThreshold
  }: {
    container: HTMLElement;
    imageOriginal: string;
    imageDepth: string;
    horizontalThreshold: number;
    verticalThreshold: number;
  }) {
    this.container = container;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.startTime = new Date().getTime();

    this.init(horizontalThreshold, verticalThreshold);
    this.loadTextures(imageOriginal, imageDepth);
    this.addEventListeners();
    this.initGyro();
  }

  private init(horizontalThreshold: number, verticalThreshold: number) {
    // 创建场景
    this.scene = new THREE.Scene();
    
    // 创建相机
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.camera.position.z = 1;

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.windowWidth, this.windowHeight);
    this.container.appendChild(this.renderer.domElement);

    // 创建着色器材质
    this.material = new THREE.ShaderMaterial({
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
    const plane = new THREE.Mesh(geometry, this.material);
        // 创建立方体
        const geometry2 = new THREE.BoxGeometry();
        const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry2, material);
        this.scene.add(cube);
    
    this.scene.add(plane);


  }

   loadTextures(imageOriginal: string, imageDepth: string) {
    const textureLoader = new THREE.TextureLoader();
    
    Promise.all([
      new Promise<THREE.Texture>((resolve, reject) => 
        textureLoader.load(imageOriginal, resolve, undefined, reject)
      ),
      new Promise<THREE.Texture>((resolve, reject) => 
        textureLoader.load(imageDepth, resolve, undefined, reject)
      )
    ]).then(([texture0, texture1]) => {
      this.material.uniforms.image0.value = texture0;
      this.material.uniforms.image1.value = texture1;
      
      this.imageAspect = texture0.image.height / texture0.image.width;
      this.resize();
      this.render();
    }).catch(error => {
      console.error('Error loading textures:', error);
    });
  }

    resize () {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.renderer.setSize(this.windowWidth, this.windowHeight);

    let a1, a2;
    if (this.windowHeight / this.windowWidth < this.imageAspect) {
      a1 = 1;
      a2 = (this.windowHeight / this.windowWidth) / this.imageAspect;
    } else {
      a1 = (this.windowWidth / this.windowHeight) * this.imageAspect;
      a2 = 1;
    }
    
    this.material.uniforms.resolution.value.set(
      this.windowWidth,
      this.windowHeight,
      a1,
      a2
    );
  }

   addEventListeners() {
     window.addEventListener('resize', () => {
      this.resize()
    });
    
    document.addEventListener('mousemove', (e) => {
      const halfX = this.windowWidth / 2;
      const halfY = this.windowHeight / 2;

      this.mouseTargetX = (halfX - e.clientX) / halfX;
      this.mouseTargetY = (halfY - e.clientY) / halfY;
    });
  }

   initGyro() {
    const gn = new GyroNorm();
    
    gn.init({ gravityNormalized: true }).then(() => {
      gn.start((data:any) => {
        const y = data.do.gamma;
        const x = data.do.beta;

        this.mouseTargetY = clamp(x, -this.maxTilt, this.maxTilt) / this.maxTilt;
        this.mouseTargetX = -clamp(y, -this.maxTilt, this.maxTilt) / this.maxTilt;
      });
    }).catch((e: Error) => {
      console.log('Gyroscope not supported:', e.message);
    });
  }

  render() {
    if (!this.isActive) return;

    const currentTime = (new Date().getTime() - this.startTime) / 1000;
    this.material.uniforms.time.value = currentTime;

    this.mouseX += (this.mouseTargetX - this.mouseX) * 0.05;
    this.mouseY += (this.mouseTargetY - this.mouseY) * 0.05;

    this.material.uniforms.mouse.value.set(this.mouseX, this.mouseY);

    requestAnimationFrame(() => this.render());
    this.renderer.render(this.scene, this.camera);
  }

    dispose() {
    this.isActive = false;
    // 清理Three.js资源
    this.scene.remove(...this.scene.children);
    this.material.dispose();
    this.renderer.dispose();
  }
}

function clamp(number: number, lower: number, upper: number): number {
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

export default ParallaxImage; 