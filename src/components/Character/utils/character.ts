import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<{ gltf: GLTF; mixer: THREE.AnimationMixer | null; actions: any } | null>((resolve, reject) => {
      try {
        loader.load(
          "/models/model.glb",
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);

            // Scale and position the Avaturn model to match the scene
            character.scale.set(14, 14, 14);
            // Drop the avatar down so its head (which is tall due to scale) aligns precisely with the parallel text (raised slightly at user request)
            character.position.set(0, -12, 0);

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            // Load GLB animations
            Promise.all([
              loader.loadAsync("/models/idle.glb"),
              loader.loadAsync("/models/run.glb")
            ]).then(([idleGltf, runGltf]) => {
              const idleClip = idleGltf.animations[0];
              const runClip = runGltf.animations[0];

              const mixer = new THREE.AnimationMixer(character);
              const actions = {
                idle: idleClip ? mixer.clipAction(idleClip) : null,
                run: runClip ? mixer.clipAction(runClip) : null
              };

              if (actions.run) {
                actions.run.play();
              } else if (actions.idle) {
                actions.idle.play();
              }

              setCharTimeline(character, camera);
              setAllTimeline();
              dracoLoader.dispose();

              resolve({ gltf, mixer, actions });
            }).catch(error => {
              console.error("Error loading GLB animations:", error);
              resolve({ gltf, mixer: null, actions: {} });
            });
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
