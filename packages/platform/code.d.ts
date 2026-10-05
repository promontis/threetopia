export interface CodeDiagnostic {code:string;severity:'error'|'warning';file?:string;line?:number;message:string}
export interface ModuleInspection {imports:{specifier:string;line:number;kind:string}[];exports:{name:string;line:number}[];signals:{code:string;line:number}[];diagnostics:CodeDiagnostic[]}
export const CODE_EXT:RegExp;
export const JAVASCRIPT_EXT:RegExp;
export const MAX_CODE_BYTES:number;
export function inspectModule(source:string,file:string,options?:{sourceType?:string;sourceLanguages?:boolean}):ModuleInspection;
export function relativeImport(file:string,specifier:string):string|null;
export function dependencyName(specifier:string):string;
export function validateCodeFiles(files:Map<string,Uint8Array|string>,manifest?:any):{diagnostics:CodeDiagnostic[];modules:number;executed:false};
