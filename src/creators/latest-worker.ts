/** Keep at most one running job and the newest queued request. A quick sequence
 * of selections must not queue seconds of obsolete terrain work. */
export class LatestWorker<Input,Output>{
 private sequence=0;
 private active?:{id:number;input:Input;resolve:(value:Output|null)=>void;reject:(error:Error)=>void};
 private queued?:NonNullable<LatestWorker<Input,Output>['active']>;
 private disposed=false;
 private failure?:Error;
 constructor(private worker:Worker){
  worker.onmessage=({data})=>{const job=this.active;if(!job||data.id!==job.id)return;this.active=undefined;if(data.error)job.reject(new Error(data.error));else job.resolve(data.result);this.startQueued();};
  worker.onerror=event=>{event.preventDefault();this.failure=new Error(event.message||'Tile preparation failed.');this.active?.reject(this.failure);this.queued?.reject(this.failure);this.active=this.queued=undefined;worker.terminate();};
 }
 private startQueued(){if(this.active||!this.queued||this.disposed)return;this.active=this.queued;this.queued=undefined;this.worker.postMessage({id:this.active.id,input:this.active.input});}
 run(input:Input):Promise<Output|null>{
  if(this.disposed)return Promise.resolve(null);
  if(this.failure)return Promise.reject(this.failure);
  this.cancel();
  return new Promise((resolve,reject)=>{this.queued={id:++this.sequence,input,resolve,reject};this.startQueued();});
 }
 cancel(){this.active?.resolve(null);this.queued?.resolve(null);this.queued=undefined;}
 dispose(){this.disposed=true;this.cancel();this.worker.terminate();this.active=undefined;}
}
