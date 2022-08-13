type LineType = Partial<
  Pick<
    LineProps,
    | 'visible'
    | 'attach'
    | 'children'
    | 'key'
    | 'onUpdate'
    | 'position'
    | 'up'
    | 'scale'
    | 'rotation'
    | 'matrix'
    | 'quaternion'
    | 'layers'
    | 'dispose'
    | 'type'
    | 'id'
    | 'uuid'
    | 'name'
    | 'parent'
    | 'modelViewMatrix'
    | 'normalMatrix'
    | 'matrixWorld'
    | 'matrixAutoUpdate'
    | 'matrixWorldNeedsUpdate'
    | 'castShadow'
    | 'receiveShadow'
    | 'frustumCulled'
    | 'renderOrder'
    | 'animations'
    | 'userData'
    | 'customDepthMaterial'
    | 'customDistanceMaterial'
    | 'isObject3D'
    | 'onBeforeRender'
    | 'onAfterRender'
    | 'applyMatrix4'
    | 'applyQuaternion'
    | 'setRotationFromAxisAngle'
    | 'setRotationFromEuler'
    | 'setRotationFromMatrix'
    | 'setRotationFromQuaternion'
    | 'rotateOnAxis'
    | 'rotateOnWorldAxis'
    | 'rotateX'
    | 'rotateY'
    | 'rotateZ'
    | 'translateOnAxis'
    | 'translateX'
    | 'translateY'
    | 'translateZ'
    | 'localToWorld'
    | 'worldToLocal'
    | 'lookAt'
    | 'add'
    | 'remove'
    | 'removeFromParent'
    | 'clear'
    | 'getObjectById'
    | 'getObjectByName'
    | 'getObjectByProperty'
    | 'getWorldPosition'
    | 'getWorldQuaternion'
    | 'getWorldScale'
    | 'getWorldDirection'
    | 'raycast'
    | 'traverse'
    | 'traverseVisible'
    | 'traverseAncestors'
    | 'updateMatrix'
    | 'updateMatrixWorld'
    | 'updateWorldMatrix'
    | 'toJSON'
    | 'clone'
    | 'copy'
    | 'addEventListener'
    | 'hasEventListener'
    | 'removeEventListener'
    | 'dispatchEvent'
    | 'color'
    | keyof import('@react-three/fiber/dist/declarations/src/core/events').EventHandlers
    | 'transparent'
    | 'dashed'
    | 'points'
    | 'material'
    | 'fog'
    | 'opacity'
    | 'precision'
    | 'alphaTest'
    | 'alphaToCoverage'
    | 'blendDst'
    | 'blendDstAlpha'
    | 'blendEquation'
    | 'blendEquationAlpha'
    | 'blending'
    | 'blendSrc'
    | 'blendSrcAlpha'
    | 'clipIntersection'
    | 'clippingPlanes'
    | 'clipShadows'
    | 'colorWrite'
    | 'defines'
    | 'depthFunc'
    | 'depthTest'
    | 'depthWrite'
    | 'stencilWrite'
    | 'stencilFunc'
    | 'stencilRef'
    | 'stencilWriteMask'
    | 'stencilFuncMask'
    | 'stencilFail'
    | 'stencilZFail'
    | 'stencilZPass'
    | 'isMaterial'
    | 'needsUpdate'
    | 'polygonOffset'
    | 'polygonOffsetFactor'
    | 'polygonOffsetUnits'
    | 'premultipliedAlpha'
    | 'dithering'
    | 'side'
    | 'shadowSide'
    | 'toneMapped'
    | 'vertexColors'
    | 'version'
    | 'onBeforeCompile'
    | 'customProgramCacheKey'
    | 'setValues'
    | 'dashOffset'
    | 'dashScale'
    | 'dashSize'
    | 'gapSize'
    | 'linewidth'
    | 'resolution'
    | 'uniforms'
    | 'vertexShader'
    | 'fragmentShader'
    | 'wireframe'
    | 'wireframeLinewidth'
    | 'lights'
    | 'clipping'
    | 'extensions'
    | 'glslVersion'
    | 'format'
    | 'isLine2'
    | 'computeLineDistances'
    | 'geometry'
    | 'morphTargetInfluences'
    | 'morphTargetDictionary'
    | 'isMesh'
    | 'updateMorphTargets'
    | 'lineWidth'
    | 'derivatives'
    | 'defaultAttributeValues'
    | 'index0AttributeName'
    | 'uniformsNeedUpdate'
    | 'isShaderMaterial'
  >
>
// Polyhedron
type PolyhedronArgs = {
  vertices: [number, number, number][]
  indices: number[]
  indicesLines?: number[][]
  radius: number
  detail: number
}
type PolyhedronType = { radius?: number; detail?: number }
