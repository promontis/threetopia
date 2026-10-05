// The approved host designs. Dimensions use world metres; the map is
// the same host at MAP_SCALE. Buildings belong to the creator, never this kit.
export const DESIGNS=[
 {id:'tropical-inlet',title:'Tropical inlet',family:'tropical',base:'bay-coast',kind:'inlet',wet:[0,1],rivers:[],regions:[[-78,-35,101]],description:'A turquoise inlet, pale sand, mangrove roots and palm-lined rock gardens.'},
 {id:'alpine-pass',title:'Alpine pass',family:'alpine',base:'pass-highland',kind:'alpine',wet:[],rivers:[],regions:[[12,4,103]],description:'An open alpine meadow between sculpted granite shoulders and evergreen groves.'},
 {id:'desert-oasis',title:'Desert oasis',family:'dunes',base:'oasis-dunes',kind:'oasis',wet:[],rivers:[],regions:[[-70,-10,105]],description:'Warm sandstone, wind-shaped dunes and palms around a clear spring.'},
 {id:'tidal-wetland',title:'Tidal wetland',family:'wetland',base:'fork-wetland',kind:'wetland',floor:12,wet:[],rivers:[0,2,4],regions:[[-103,0,69],[55,-115,54]],description:'Winding tidal creeks, mangrove islands and short timber crossings.'},
 {id:'autumn-woodland',title:'Autumn woodland',family:'autumn',base:'commons-meadow',kind:'woodland',wet:[],rivers:[],regions:[[18,5,124]],description:'An open woodland clearing surrounded by amber trees, mossy stones and branching paths.'},
 {id:'basalt-coast',title:'Basalt coast',family:'basalt',base:'headland-volcanic',kind:'basalt',wet:[0,1,2],rivers:[],regions:[[-65,-43,108]],description:'Dark columnar cliffs above a deep cove, with weathered pines and hardy shrubs.'},
 {id:'sakura-river',title:'Sakura river',family:'blossom',base:'river-blossom',kind:'sakura',wet:[],rivers:[0,3],regions:[[-28,-131,66],[30,129,64]],description:'Cherry-lined riverbanks, a red arched bridge and two open temple gardens.'},
 {id:'sheltered-marina',title:'Sheltered marina',family:'coast',base:'harbor-urban',kind:'marina',wet:[0,1],rivers:[],regions:[[-109,0,94]],description:'A protected harbor with timber pontoons, a boulder breakwater and an open waterfront plot.'},
 {id:'canal-quarter',title:'Canal quarter',family:'urban',base:'canal-urban',kind:'canal',wet:[],rivers:[0,3],regions:[[0,-130,67],[0,130,67]],description:'A navigable canal between clean stone quays, a masonry bridge and tree-lined streets.'},
 {id:'coastal-terraces',title:'Coastal terraces',family:'limestone',base:'headland-coast',kind:'terraces',wet:[0,1,2],rivers:[],regions:[[-55,-60,99,49]],description:'Limestone terraces, broad stairs, cypress trees and a small rocky cove.'},
 {id:'industrial-docks',title:'Industrial docks',family:'industrial',base:'harbor-industrial',kind:'docks',wet:[0,1],rivers:[],regions:[[-103,-8,90]],description:'A concrete working quay with cargo stacks, fenders, service rails and deep harbor water.'},
 {id:'garden-boulevard',title:'Garden boulevard',family:'urban',base:'commons-meadow',kind:'boulevard',wet:[],rivers:[],regions:[[-128,-132,54],[128,-132,54],[107,135,56]],description:'An asphalt boulevard, generous paved plots, rain gardens and planted sidewalks.'},
 {id:'circuit-deck',title:'Circuit deck',family:'scifi',base:'skyport-scifi',kind:'circuit',floating:true,wet:[0,1,2,3,4,5],rivers:[],floor:84,regions:[[0,0,154,84]],description:'A charcoal floating deck with an oval race loop, teleport pads and cyan ring engines.'},
 {id:'neon-docks',title:'Neon docks',family:'scifi',base:'skyport-scifi',kind:'neon',floating:true,wet:[0,1,2,3,4,5],rivers:[],floor:84,regions:[[-31,-30,137,84]],description:'An asymmetric suspended dock, a service road and a broad open city deck.'},
 {id:'sky-terraces',title:'Sky terraces',family:'scifi',base:'skyport-scifi',kind:'sky',floating:true,wet:[0,1,2,3,4,5],rivers:[],floor:108,regions:[[-81,-78,86,108],[92,128,52,74]],description:'Two floating city terraces joined by a wide supported ramp, with pocket gardens.'},
 {id:'open-water',title:'Open water',family:'water',base:'skyport-scifi',kind:'water',wet:[0,1,2,3,4,5],rivers:[],floor:0,regions:[[0,0,190]],description:'Uninterrupted open sea on all six sides, with a submerged seabed and a water-level build area for floating creations.'},
];
export const DESIGN_STYLES={
 tropical:{title:'Tropical',land:'#769052',sand:'#e2d4af',rock:'#92958a',path:'#dbca9e'},
 alpine:{title:'Alpine',land:'#839265',sand:'#bcb696',rock:'#92928b',path:'#c9b890'},
 autumn:{title:'Autumn',land:'#8a9261',sand:'#b8a482',rock:'#898d7b',path:'#c9b38d'},
 limestone:{title:'Limestone',land:'#cabf9d',sand:'#dfd0ac',rock:'#b4ae96',path:'#e1d5b7'},
 water:{title:'Water',land:'#579f9d',sand:'#c8d7cf',rock:'#879b99',path:'#c8d7cf'},
};
export const DESIGN_VARIANTS=DESIGNS.map(d=>({id:d.id,layout:d.id,family:d.family,title:d.title,description:d.description,orientation:0,color:DESIGN_STYLES[d.family]?.land||'#8b9b7a'}));
export const designFor=tile=>DESIGNS.find(d=>d.id===tile.recipe.id||d.id===tile.variant);
