export const sphereFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;
varying float vDisplacement;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(-vPosition);

  // Fresnel Rim Light calculation
  float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.5);

  // Color blending based on displacement & fresnel rim
  float mixFactorA = sin(vDisplacement * 3.14159 + uTime * 0.8) * 0.5 + 0.5;
  float mixFactorB = cos(vDisplacement * 2.0 - uTime * 0.5) * 0.5 + 0.5;

  vec3 baseColor = mix(uColorA, uColorB, mixFactorA);
  baseColor = mix(baseColor, uColorC, mixFactorB);

  // High contrast iridescent glow
  vec3 glowColor = mix(vec3(0.95, 0.6, 1.0), vec3(0.2, 0.85, 1.0), fresnel);
  vec3 finalColor = mix(baseColor, glowColor, fresnel * 0.85);

  // Add subtle specular highlight
  vec3 lightDir = normalize(vec3(1.0, 1.5, 2.0));
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);
  finalColor += vec3(spec * 0.4);

  gl_FragColor = vec4(finalColor, 0.92);
}
`;
