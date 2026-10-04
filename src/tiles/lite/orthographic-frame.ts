import * as T from 'three';

/** Shift the composition, keeping the camera's real orbit target unchanged. */
export function setFrameOffset(camera:T.OrthographicCamera,width:number,height:number,offset:T.Vector2){
  if(offset.lengthSq()<1e-12)camera.clearViewOffset();
  else camera.setViewOffset(width,height,offset.x*width,offset.y*height,width,height);
}

export function frameOffset(camera:T.OrthographicCamera){
  const view=camera.view;
  return view?.enabled?new T.Vector2(view.offsetX/view.fullWidth,view.offsetY/view.fullHeight):new T.Vector2();
}

/** Equivalent centered-camera pose, so recorded frames preserve off-axis framing. */
export function framedTarget(camera:T.OrthographicCamera,target:T.Vector3){
  camera.updateMatrixWorld();
  const offset=frameOffset(camera);
  return target.clone()
    .addScaledVector(new T.Vector3().setFromMatrixColumn(camera.matrixWorld,0),offset.x*(camera.right-camera.left)/camera.zoom)
    .addScaledVector(new T.Vector3().setFromMatrixColumn(camera.matrixWorld,1),-offset.y*(camera.top-camera.bottom)/camera.zoom);
}
