uniform sampler2D image0;
uniform sampler2D image1;
uniform vec2 mouse;
uniform vec4 resolution;  // xy: viewport size, zw: image aspect ratio
uniform float time;
uniform vec2 threshold;

varying vec2 vUv;
varying vec3 vPosition;

vec2 mirrored(vec2 v) {
  vec2 m = mod(v,2.);
  return mix(m,2.0 - m, step(1.0 ,m));
}

void main() {
    // 计算考虑分辨率的UV坐标
    vec2 uv = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    
   vec4 tex1 = texture2D(image1,mirrored(uv));
    vec2 fake3d = vec2(uv.x + (tex1.r - 0.5)*mouse.x/threshold.x, uv.y + (tex1.r - 0.5)*mouse.y/threshold.y);
    gl_FragColor = texture2D(image0,mirrored(fake3d));
} 