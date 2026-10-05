import {mountScene} from '../../packages/platform/scene.js';
import {validateRuntime} from '../../packages/platform/runtime.js';

/** Preview references are presentation links, never installation dependencies.
 * Only exact published runtimes from this registry can run, in the same sandbox. */
export async function mountSceneReference(element:HTMLElement, manifest:any, registry:string, signal:AbortSignal, onProgress?:(progress:{value:number;message:string})=>void) {
  const errors=validateRuntime(manifest);if(errors.length)throw Error(errors.join(' '));
  const ref=manifest.preview;
  const response=await fetch(`${registry}/api/resolve?name=${encodeURIComponent(ref.package)}&version=${encodeURIComponent(ref.version)}`,{signal,credentials:'omit'});
  if(!response.ok)throw Error('The referenced preview scene is not published yet.');
  const resolved=await response.json();
  if(resolved.state!=='published'||resolved.manifest?.name!==ref.package||resolved.manifest?.version!==ref.version)throw Error('Preview identity does not match the requested release.');
  return mountScene(element,{manifest:resolved.manifest,focus:ref.focus,signal,onProgress,loadFile:async file=>{
    const fileResponse=await fetch(`${registry}/api/packages/${encodeURIComponent(resolved.package.id)}/versions/${encodeURIComponent(ref.version)}/files?path=${encodeURIComponent(file)}`,{signal,credentials:'omit'});
    if(!fileResponse.ok)throw Error('Preview resource could not be loaded.');return fileResponse.arrayBuffer();
  }});
}
