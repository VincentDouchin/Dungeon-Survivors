(function(){const A=document.createElement("link").relList;if(A&&A.supports&&A.supports("modulepreload"))return;for(const C of document.querySelectorAll('link[rel="modulepreload"]'))g(C);new MutationObserver(C=>{for(const B of C)if(B.type==="childList")for(const E of B.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&g(E)}).observe(document,{childList:!0,subtree:!0});function I(C){const B={};return C.integrity&&(B.integrity=C.integrity),C.referrerpolicy&&(B.referrerPolicy=C.referrerpolicy),C.crossorigin==="use-credentials"?B.credentials="include":C.crossorigin==="anonymous"?B.credentials="omit":B.credentials="same-origin",B}function g(C){if(C.ep)return;C.ep=!0;const B=I(C);fetch(C.href,B)}})();const tB=new class{coroutines=[];add(i){const A=i();A.next();const I={generator:A,state:"running"};return this.coroutines.push(I),I}run(){for(let i=this.coroutines.length-1;i>=0;i--){if(this.coroutines[i].state=="stopped")return;const{done:A}=this.coroutines[i].generator.next();A&&this.coroutines.splice(i,1)}}stop(){this.coroutines.forEach(i=>{i.state="stopped"})}resume(){this.coroutines.forEach(i=>{i.state="running"})}},lB=new class{rafHandle=0;accumulatedTime=0;currentTime=0;timeStep=1e3/60;state;states=new Map;cycle=i=>{if(!this.state)return;this.rafHandle=window.requestAnimationFrame(this.cycle),this.accumulatedTime+=i-this.currentTime,this.currentTime=i;let A=!1;for(this.accumulatedTime>60&&(this.accumulatedTime=this.timeStep);this.accumulatedTime>=this.timeStep;)tB.run(),this.state.update(),A=!0,this.accumulatedTime-=this.timeStep;A&&this.state.render()};start(){this.rafHandle=window.requestAnimationFrame(this.cycle)}stop(){window.cancelAnimationFrame(this.rafHandle)}addState(i,A){this.states.set(i,A)}setState(i,A){this.state&&this.state.unset(),this.state=this.states.get(i),this.state?.set(A)}},ug={DELETEENTITY:"deleteEntity",XP:"xp",CAMERAMOVE:"cemaraMove"};class qe{subscribers={};subscribe(A,I){this.subscribers[A]||(this.subscribers[A]=[]),this.subscribers[A].push(I)}unsubscribe(A,I){if(this.subscribers[A]){const g=this.subscribers[A].indexOf(I);g!==-1&&this.subscribers[A].splice(g,1)}}publish(A,I){this.subscribers[A]&&this.subscribers[A].forEach(g=>g(I))}}const eI=new class{components=new Map;systems=[];entities=new Map;eventBus=new qe;registerEntity(i){this.entities.set(i.id,i)}getEntityById(i){return this.entities.get(i)}getEntitiesAndComponents(i){const A=this.components.get(i.name);return A?Array.from(A.entries()):[]}registerSystem(i){this.systems.push(new i)}updateSystems(){this.systems.forEach(i=>{const I=[...this.components.get(i.target.name).keys()].map(g=>this.getEntityById(g));i.update(I)})}unRegisterSystems(){this.systems=[]}};class Pg{target;static register(){eI.registerSystem(this)}constructor(A){this.target=A}}class LI{static register(){eI.components.set(this.name,new Map)}save(){return JSON.stringify(this)}destroy(){}}class ZI{parentId=null;id;childrenIds=[];get children(){return this.childrenIds.map(A=>eI.getEntityById(A))}addChildren(A){return A.parentId=this.id,this.childrenIds.push(A.id),eI.eventBus.subscribe(ug.DELETEENTITY,I=>{this.removeChildren(I)}),A}removeChildren(A){this.childrenIds.includes(A.id)&&this.childrenIds.splice(this.childrenIds.indexOf(A.id),1)}constructor(){this.id=window.crypto.randomUUID(),eI.registerEntity(this)}addComponent(A){return A.bind&&A.bind(this.id),eI.components.get(A.constructor.name)?.set(this.id,A),A}get parent(){return this.parentId?eI.getEntityById(this.parentId):null}getComponent(A){return eI.components.get(A.name)?.get(this.id)}destroy(){eI.eventBus.publish(ug.DELETEENTITY,this),this.childrenIds.forEach(A=>eI.getEntityById(A).destroy()),eI.components.forEach(A=>{!A.has(this.id)||(A.get(this.id)?.destroy(),A.delete(this.id))}),eI.entities.delete(this.id)}}let h;const II=new Array(32).fill(void 0);function tI(i){return II[i]}II.push(void 0,null,!0,!1);let ZB=II.length;function sE(i){const A=tI(i);return function(I){I<36||(II[I]=ZB,ZB=I)}(i),A}function NI(i){ZB===II.length&&II.push(II.length+1);const A=ZB;return ZB=II[A],II[A]=i,A}function LA(i){return i==null}let CE=new Float64Array;function nE(){return CE.byteLength===0&&(CE=new Float64Array(h.memory.buffer)),CE}let BE=new Int32Array;function cI(){return BE.byteLength===0&&(BE=new Int32Array(h.memory.buffer)),BE}const ue=new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0});ue.decode();let QE=new Uint8Array;function Le(i,A){return ue.decode((QE.byteLength===0&&(QE=new Uint8Array(h.memory.buffer)),QE).subarray(i,i+A))}function H(i,A){if(!(i instanceof A))throw new Error(`expected instance of ${A.name}`);return i.ptr}let EE=new Float32Array;function CC(){return EE.byteLength===0&&(EE=new Float32Array(h.memory.buffer)),EE}let DI=32;function SI(i){if(DI==1)throw new Error("out of js stack");return II[--DI]=i,DI}function At(i,A){return CC().subarray(i/4,i/4+A)}let iE=new Uint32Array;function Ye(){return iE.byteLength===0&&(iE=new Uint32Array(h.memory.buffer)),iE}let lg=0;function eC(i,A){const I=A(4*i.length);return CC().set(i,I/4),lg=i.length,I}function It(i,A){const I=A(4*i.length);return Ye().set(i,I/4),lg=i.length,I}function $E(i,A){try{return i.apply(this,A)}catch(I){h.__wbindgen_exn_store(NI(I))}}Object.freeze({Revolute:0,0:"Revolute",Fixed:1,1:"Fixed",Prismatic:2,2:"Prismatic",Generic:3,3:"Generic"}),Object.freeze({AccelerationBased:0,0:"AccelerationBased",ForceBased:1,1:"ForceBased"});const RE=Object.freeze({X:0,0:"X",Y:1,1:"Y",AngX:2,2:"AngX"});Object.freeze({Dynamic:0,0:"Dynamic",Fixed:1,1:"Fixed",KinematicPositionBased:2,2:"KinematicPositionBased",KinematicVelocityBased:3,3:"KinematicVelocityBased"}),Object.freeze({Vertex:0,0:"Vertex",Face:1,1:"Face",Unknown:2,2:"Unknown"}),Object.freeze({Ball:0,0:"Ball",Cuboid:1,1:"Cuboid",Capsule:2,2:"Capsule",Segment:3,3:"Segment",Polyline:4,4:"Polyline",Triangle:5,5:"Triangle",TriMesh:6,6:"TriMesh",HeightField:7,7:"HeightField",Compound:8,8:"Compound",ConvexPolygon:9,9:"ConvexPolygon",RoundCuboid:10,10:"RoundCuboid",RoundTriangle:11,11:"RoundTriangle",RoundConvexPolygon:12,12:"RoundConvexPolygon",HalfSpace:13,13:"HalfSpace"});class EC{static __wrap(A){const I=Object.create(EC.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawbroadphase_free(A)}constructor(){const A=h.rawbroadphase_new();return EC.__wrap(A)}}class eB{static __wrap(A){const I=Object.create(eB.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawccdsolver_free(A)}constructor(){const A=h.rawccdsolver_new();return eB.__wrap(A)}}class XB{static __wrap(A){const I=Object.create(XB.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawcharactercollision_free(A)}constructor(){const A=h.rawcharactercollision_new();return XB.__wrap(A)}handle(){return h.rawcharactercollision_handle(this.ptr)}translationApplied(){const A=h.rawcharactercollision_translationApplied(this.ptr);return CA.__wrap(A)}translationRemaining(){const A=h.rawcharactercollision_translationRemaining(this.ptr);return CA.__wrap(A)}toi(){return h.rawcharactercollision_toi(this.ptr)}worldWitness1(){const A=h.rawcharactercollision_worldWitness1(this.ptr);return CA.__wrap(A)}worldWitness2(){const A=h.rawcharactercollision_worldWitness2(this.ptr);return CA.__wrap(A)}worldNormal1(){const A=h.rawcharactercollision_worldNormal1(this.ptr);return CA.__wrap(A)}worldNormal2(){const A=h.rawcharactercollision_worldNormal2(this.ptr);return CA.__wrap(A)}}class yI{static __wrap(A){const I=Object.create(yI.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawcolliderset_free(A)}coTranslation(A){const I=h.rawcolliderset_coTranslation(this.ptr,A);return CA.__wrap(I)}coRotation(A){const I=h.rawcolliderset_coRotation(this.ptr,A);return gI.__wrap(I)}coSetTranslation(A,I,g){h.rawcolliderset_coSetTranslation(this.ptr,A,I,g)}coSetTranslationWrtParent(A,I,g){h.rawcolliderset_coSetTranslationWrtParent(this.ptr,A,I,g)}coSetRotation(A,I){h.rawcolliderset_coSetRotation(this.ptr,A,I)}coSetRotationWrtParent(A,I){h.rawcolliderset_coSetRotationWrtParent(this.ptr,A,I)}coIsSensor(A){return h.rawcolliderset_coIsSensor(this.ptr,A)!==0}coShapeType(A){return h.rawcolliderset_coShapeType(this.ptr,A)>>>0}coHalfspaceNormal(A){const I=h.rawcolliderset_coHalfspaceNormal(this.ptr,A);return I===0?void 0:CA.__wrap(I)}coHalfExtents(A){const I=h.rawcolliderset_coHalfExtents(this.ptr,A);return I===0?void 0:CA.__wrap(I)}coRadius(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coRadius(C,this.ptr,A);var I=cI()[C/4+0],g=CC()[C/4+1];return I===0?void 0:g}finally{h.__wbindgen_add_to_stack_pointer(16)}}coHalfHeight(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coHalfHeight(C,this.ptr,A);var I=cI()[C/4+0],g=CC()[C/4+1];return I===0?void 0:g}finally{h.__wbindgen_add_to_stack_pointer(16)}}coRoundRadius(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coRoundRadius(C,this.ptr,A);var I=cI()[C/4+0],g=CC()[C/4+1];return I===0?void 0:g}finally{h.__wbindgen_add_to_stack_pointer(16)}}coVertices(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coVertices(C,this.ptr,A);var I=cI()[C/4+0],g=cI()[C/4+1];let B;return I!==0&&(B=At(I,g).slice(),h.__wbindgen_free(I,4*g)),B}finally{h.__wbindgen_add_to_stack_pointer(16)}}coIndices(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coIndices(C,this.ptr,A);var I=cI()[C/4+0],g=cI()[C/4+1];let B;return I!==0&&(B=function(E,Q){return Ye().subarray(E/4,E/4+Q)}(I,g).slice(),h.__wbindgen_free(I,4*g)),B}finally{h.__wbindgen_add_to_stack_pointer(16)}}coHeightfieldHeights(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coHeightfieldHeights(C,this.ptr,A);var I=cI()[C/4+0],g=cI()[C/4+1];let B;return I!==0&&(B=At(I,g).slice(),h.__wbindgen_free(I,4*g)),B}finally{h.__wbindgen_add_to_stack_pointer(16)}}coHeightfieldScale(A){const I=h.rawcolliderset_coHeightfieldScale(this.ptr,A);return I===0?void 0:CA.__wrap(I)}coParent(A){try{const C=h.__wbindgen_add_to_stack_pointer(-16);h.rawcolliderset_coParent(C,this.ptr,A);var I=cI()[C/4+0],g=nE()[C/8+1];return I===0?void 0:g}finally{h.__wbindgen_add_to_stack_pointer(16)}}coFriction(A){return h.rawcolliderset_coFriction(this.ptr,A)}coRestitution(A){return h.rawcolliderset_coRestitution(this.ptr,A)}coDensity(A){return h.rawcolliderset_coDensity(this.ptr,A)}coMass(A){return h.rawcolliderset_coMass(this.ptr,A)}coVolume(A){return h.rawcolliderset_coVolume(this.ptr,A)}coCollisionGroups(A){return h.rawcolliderset_coCollisionGroups(this.ptr,A)>>>0}coSolverGroups(A){return h.rawcolliderset_coSolverGroups(this.ptr,A)>>>0}coActiveHooks(A){return h.rawcolliderset_coActiveHooks(this.ptr,A)>>>0}coActiveCollisionTypes(A){return h.rawcolliderset_coActiveCollisionTypes(this.ptr,A)}coActiveEvents(A){return h.rawcolliderset_coActiveEvents(this.ptr,A)>>>0}coContactForceEventThreshold(A){return h.rawcolliderset_coContactForceEventThreshold(this.ptr,A)}coContainsPoint(A,I){return H(I,CA),h.rawcolliderset_coContainsPoint(this.ptr,A,I.ptr)!==0}coCastShape(A,I,g,C,B,E,Q,o){H(I,CA),H(g,bA),H(C,CA),H(B,gI),H(E,CA);const t=h.rawcolliderset_coCastShape(this.ptr,A,I.ptr,g.ptr,C.ptr,B.ptr,E.ptr,Q,o);return t===0?void 0:JE.__wrap(t)}coCastCollider(A,I,g,C,B,E){H(I,CA),H(C,CA);const Q=h.rawcolliderset_coCastCollider(this.ptr,A,I.ptr,g,C.ptr,B,E);return Q===0?void 0:UE.__wrap(Q)}coIntersectsShape(A,I,g,C){return H(I,bA),H(g,CA),H(C,gI),h.rawcolliderset_coIntersectsShape(this.ptr,A,I.ptr,g.ptr,C.ptr)!==0}coContactShape(A,I,g,C,B){H(I,bA),H(g,CA),H(C,gI);const E=h.rawcolliderset_coContactShape(this.ptr,A,I.ptr,g.ptr,C.ptr,B);return E===0?void 0:AQ.__wrap(E)}coContactCollider(A,I,g){const C=h.rawcolliderset_coContactCollider(this.ptr,A,I,g);return C===0?void 0:AQ.__wrap(C)}coProjectPoint(A,I,g){H(I,CA);const C=h.rawcolliderset_coProjectPoint(this.ptr,A,I.ptr,g);return NE.__wrap(C)}coIntersectsRay(A,I,g,C){return H(I,CA),H(g,CA),h.rawcolliderset_coIntersectsRay(this.ptr,A,I.ptr,g.ptr,C)!==0}coCastRay(A,I,g,C,B){return H(I,CA),H(g,CA),h.rawcolliderset_coCastRay(this.ptr,A,I.ptr,g.ptr,C,B)}coCastRayAndGetNormal(A,I,g,C,B){H(I,CA),H(g,CA);const E=h.rawcolliderset_coCastRayAndGetNormal(this.ptr,A,I.ptr,g.ptr,C,B);return E===0?void 0:dE.__wrap(E)}coSetSensor(A,I){h.rawcolliderset_coSetSensor(this.ptr,A,I)}coSetRestitution(A,I){h.rawcolliderset_coSetRestitution(this.ptr,A,I)}coSetFriction(A,I){h.rawcolliderset_coSetFriction(this.ptr,A,I)}coFrictionCombineRule(A){return h.rawcolliderset_coFrictionCombineRule(this.ptr,A)>>>0}coSetFrictionCombineRule(A,I){h.rawcolliderset_coSetFrictionCombineRule(this.ptr,A,I)}coRestitutionCombineRule(A){return h.rawcolliderset_coRestitutionCombineRule(this.ptr,A)>>>0}coSetRestitutionCombineRule(A,I){h.rawcolliderset_coSetRestitutionCombineRule(this.ptr,A,I)}coSetCollisionGroups(A,I){h.rawcolliderset_coSetCollisionGroups(this.ptr,A,I)}coSetSolverGroups(A,I){h.rawcolliderset_coSetSolverGroups(this.ptr,A,I)}coSetActiveHooks(A,I){h.rawcolliderset_coSetActiveHooks(this.ptr,A,I)}coSetActiveEvents(A,I){h.rawcolliderset_coSetActiveEvents(this.ptr,A,I)}coSetActiveCollisionTypes(A,I){h.rawcolliderset_coSetActiveCollisionTypes(this.ptr,A,I)}coSetShape(A,I){H(I,bA),h.rawcolliderset_coSetShape(this.ptr,A,I.ptr)}coSetContactForceEventThreshold(A,I){h.rawcolliderset_coSetContactForceEventThreshold(this.ptr,A,I)}coSetDensity(A,I){h.rawcolliderset_coSetDensity(this.ptr,A,I)}coSetMass(A,I){h.rawcolliderset_coSetMass(this.ptr,A,I)}coSetMassProperties(A,I,g,C){H(g,CA),h.rawcolliderset_coSetMassProperties(this.ptr,A,I,g.ptr,C)}constructor(){const A=h.rawcolliderset_new();return yI.__wrap(A)}len(){return h.rawcolliderset_len(this.ptr)>>>0}contains(A){return h.rawcolliderset_contains(this.ptr,A)!==0}createCollider(A,I,g,C,B,E,Q,o,t,e,a,s,D,c,r,n,l,G,S,k,M,K){try{const d=h.__wbindgen_add_to_stack_pointer(-16);H(A,bA),H(I,CA),H(g,gI),H(E,CA),H(K,kI),h.rawcolliderset_createCollider(d,this.ptr,A.ptr,I.ptr,g.ptr,C,B,E.ptr,Q,o,t,e,a,s,D,c,r,n,l,G,S,k,M,K.ptr);var U=cI()[d/4+0],w=nE()[d/8+1];return U===0?void 0:w}finally{h.__wbindgen_add_to_stack_pointer(16)}}remove(A,I,g,C){H(I,Rg),H(g,kI),h.rawcolliderset_remove(this.ptr,A,I.ptr,g.ptr,C)}isHandleValid(A){return h.rawcolliderset_contains(this.ptr,A)!==0}forEachColliderHandle(A){try{h.rawcolliderset_forEachColliderHandle(this.ptr,SI(A))}finally{II[DI++]=void 0}}}class Eo{static __wrap(A){const I=Object.create(Eo.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawcontactforceevent_free(A)}collider1(){return h.rawcharactercollision_handle(this.ptr)}collider2(){return h.rawcontactforceevent_collider2(this.ptr)}total_force(){const A=h.rawcontactforceevent_total_force(this.ptr);return CA.__wrap(A)}total_force_magnitude(){return h.rawcontactforceevent_total_force_magnitude(this.ptr)}max_force_direction(){const A=h.rawcontactforceevent_max_force_direction(this.ptr);return CA.__wrap(A)}max_force_magnitude(){return h.rawcontactforceevent_max_force_magnitude(this.ptr)}}class io{static __wrap(A){const I=Object.create(io.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawcontactmanifold_free(A)}normal(){const A=h.rawcontactmanifold_normal(this.ptr);return CA.__wrap(A)}local_n1(){const A=h.rawcontactmanifold_local_n1(this.ptr);return CA.__wrap(A)}local_n2(){const A=h.rawcontactmanifold_local_n2(this.ptr);return CA.__wrap(A)}subshape1(){return h.rawcontactmanifold_subshape1(this.ptr)>>>0}subshape2(){return h.rawcontactmanifold_subshape2(this.ptr)>>>0}num_contacts(){return h.rawcontactmanifold_num_contacts(this.ptr)>>>0}contact_local_p1(A){const I=h.rawcontactmanifold_contact_local_p1(this.ptr,A);return I===0?void 0:CA.__wrap(I)}contact_local_p2(A){const I=h.rawcontactmanifold_contact_local_p2(this.ptr,A);return I===0?void 0:CA.__wrap(I)}contact_dist(A){return h.rawcontactmanifold_contact_dist(this.ptr,A)}contact_fid1(A){return h.rawcontactmanifold_contact_fid1(this.ptr,A)>>>0}contact_fid2(A){return h.rawcontactmanifold_contact_fid2(this.ptr,A)>>>0}contact_impulse(A){return h.rawcontactmanifold_contact_impulse(this.ptr,A)}contact_tangent_impulse(A){return h.rawcontactmanifold_contact_tangent_impulse(this.ptr,A)}num_solver_contacts(){return h.rawcontactmanifold_num_solver_contacts(this.ptr)>>>0}solver_contact_point(A){const I=h.rawcontactmanifold_solver_contact_point(this.ptr,A);return I===0?void 0:CA.__wrap(I)}solver_contact_dist(A){return h.rawcontactmanifold_solver_contact_dist(this.ptr,A)}solver_contact_friction(A){return h.rawcontactmanifold_solver_contact_friction(this.ptr,A)}solver_contact_restitution(A){return h.rawcontactmanifold_solver_contact_restitution(this.ptr,A)}solver_contact_tangent_velocity(A){const I=h.rawcontactmanifold_solver_contact_tangent_velocity(this.ptr,A);return CA.__wrap(I)}}class oo{static __wrap(A){const I=Object.create(oo.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawcontactpair_free(A)}collider1(){return h.rawcontactpair_collider1(this.ptr)}collider2(){return h.rawcontactpair_collider2(this.ptr)}numContactManifolds(){return h.rawcontactpair_numContactManifolds(this.ptr)>>>0}contactManifold(A){const I=h.rawcontactpair_contactManifold(this.ptr,A);return I===0?void 0:io.__wrap(I)}}class DE{static __wrap(A){const I=Object.create(DE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawdebugrenderpipeline_free(A)}constructor(){const A=h.rawdebugrenderpipeline_new();return DE.__wrap(A)}vertices(){return sE(h.rawdebugrenderpipeline_vertices(this.ptr))}colors(){return sE(h.rawdebugrenderpipeline_colors(this.ptr))}render(A,I,g,C,B){H(A,kI),H(I,yI),H(g,Lg),H(C,Yg),H(B,Og),h.rawdebugrenderpipeline_render(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr)}}class to{static __wrap(A){const I=Object.create(to.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawdeserializedworld_free(A)}takeGravity(){const A=h.rawdeserializedworld_takeGravity(this.ptr);return A===0?void 0:CA.__wrap(A)}takeIntegrationParameters(){const A=h.rawdeserializedworld_takeIntegrationParameters(this.ptr);return A===0?void 0:iC.__wrap(A)}takeIslandManager(){const A=h.rawdeserializedworld_takeIslandManager(this.ptr);return A===0?void 0:Rg.__wrap(A)}takeBroadPhase(){const A=h.rawdeserializedworld_takeBroadPhase(this.ptr);return A===0?void 0:EC.__wrap(A)}takeNarrowPhase(){const A=h.rawdeserializedworld_takeNarrowPhase(this.ptr);return A===0?void 0:Og.__wrap(A)}takeBodies(){const A=h.rawdeserializedworld_takeBodies(this.ptr);return A===0?void 0:kI.__wrap(A)}takeColliders(){const A=h.rawdeserializedworld_takeColliders(this.ptr);return A===0?void 0:yI.__wrap(A)}takeImpulseJoints(){const A=h.rawdeserializedworld_takeImpulseJoints(this.ptr);return A===0?void 0:Lg.__wrap(A)}takeMultibodyJoints(){const A=h.rawdeserializedworld_takeMultibodyJoints(this.ptr);return A===0?void 0:Yg.__wrap(A)}}class zB{static __wrap(A){const I=Object.create(zB.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_raweventqueue_free(A)}constructor(A){const I=h.raweventqueue_new(A);return zB.__wrap(I)}drainCollisionEvents(A){try{h.raweventqueue_drainCollisionEvents(this.ptr,SI(A))}finally{II[DI++]=void 0}}drainContactForceEvents(A){try{h.raweventqueue_drainContactForceEvents(this.ptr,SI(A))}finally{II[DI++]=void 0}}clear(){h.raweventqueue_clear(this.ptr)}}class fg{static __wrap(A){const I=Object.create(fg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawgenericjoint_free(A)}static prismatic(A,I,g,C,B,E){H(A,CA),H(I,CA),H(g,CA);const Q=h.rawgenericjoint_prismatic(A.ptr,I.ptr,g.ptr,C,B,E);return Q===0?void 0:fg.__wrap(Q)}static fixed(A,I,g,C){H(A,CA),H(I,gI),H(g,CA),H(C,gI);const B=h.rawgenericjoint_fixed(A.ptr,I.ptr,g.ptr,C.ptr);return fg.__wrap(B)}static revolute(A,I){H(A,CA),H(I,CA);const g=h.rawgenericjoint_revolute(A.ptr,I.ptr);return g===0?void 0:fg.__wrap(g)}}class Lg{static __wrap(A){const I=Object.create(Lg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawimpulsejointset_free(A)}jointType(A){return h.rawimpulsejointset_jointType(this.ptr,A)>>>0}jointBodyHandle1(A){return h.rawimpulsejointset_jointBodyHandle1(this.ptr,A)}jointBodyHandle2(A){return h.rawimpulsejointset_jointBodyHandle2(this.ptr,A)}jointFrameX1(A){const I=h.rawimpulsejointset_jointFrameX1(this.ptr,A);return gI.__wrap(I)}jointFrameX2(A){const I=h.rawimpulsejointset_jointFrameX2(this.ptr,A);return gI.__wrap(I)}jointAnchor1(A){const I=h.rawimpulsejointset_jointAnchor1(this.ptr,A);return CA.__wrap(I)}jointAnchor2(A){const I=h.rawimpulsejointset_jointAnchor2(this.ptr,A);return CA.__wrap(I)}jointSetAnchor1(A,I){H(I,CA),h.rawimpulsejointset_jointSetAnchor1(this.ptr,A,I.ptr)}jointSetAnchor2(A,I){H(I,CA),h.rawimpulsejointset_jointSetAnchor2(this.ptr,A,I.ptr)}jointContactsEnabled(A){return h.rawimpulsejointset_jointContactsEnabled(this.ptr,A)!==0}jointSetContactsEnabled(A,I){h.rawimpulsejointset_jointSetContactsEnabled(this.ptr,A,I)}jointLimitsEnabled(A,I){return h.rawimpulsejointset_jointLimitsEnabled(this.ptr,A,I)!==0}jointLimitsMin(A,I){return h.rawimpulsejointset_jointLimitsMin(this.ptr,A,I)}jointLimitsMax(A,I){return h.rawimpulsejointset_jointLimitsMax(this.ptr,A,I)}jointSetLimits(A,I,g,C){h.rawimpulsejointset_jointSetLimits(this.ptr,A,I,g,C)}jointConfigureMotorModel(A,I,g){h.rawimpulsejointset_jointConfigureMotorModel(this.ptr,A,I,g)}jointConfigureMotorVelocity(A,I,g,C){h.rawimpulsejointset_jointConfigureMotorVelocity(this.ptr,A,I,g,C)}jointConfigureMotorPosition(A,I,g,C,B){h.rawimpulsejointset_jointConfigureMotorPosition(this.ptr,A,I,g,C,B)}jointConfigureMotor(A,I,g,C,B,E){h.rawimpulsejointset_jointConfigureMotor(this.ptr,A,I,g,C,B,E)}constructor(){const A=h.rawimpulsejointset_new();return Lg.__wrap(A)}createJoint(A,I,g,C){return H(A,fg),h.rawimpulsejointset_createJoint(this.ptr,A.ptr,I,g,C)}remove(A,I){h.rawimpulsejointset_remove(this.ptr,A,I)}len(){return h.rawimpulsejointset_len(this.ptr)>>>0}contains(A){return h.rawimpulsejointset_contains(this.ptr,A)!==0}forEachJointHandle(A){try{h.rawimpulsejointset_forEachJointHandle(this.ptr,SI(A))}finally{II[DI++]=void 0}}forEachJointAttachedToRigidBody(A,I){try{h.rawimpulsejointset_forEachJointAttachedToRigidBody(this.ptr,A,SI(I))}finally{II[DI++]=void 0}}}class iC{static __wrap(A){const I=Object.create(iC.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawintegrationparameters_free(A)}constructor(){const A=h.rawintegrationparameters_new();return iC.__wrap(A)}get dt(){return h.rawintegrationparameters_dt(this.ptr)}get erp(){return h.rawintegrationparameters_erp(this.ptr)}get allowedLinearError(){return h.rawintegrationparameters_allowedLinearError(this.ptr)}get predictionDistance(){return h.rawintegrationparameters_predictionDistance(this.ptr)}get maxVelocityIterations(){return h.rawintegrationparameters_maxVelocityIterations(this.ptr)>>>0}get maxVelocityFrictionIterations(){return h.rawintegrationparameters_maxVelocityFrictionIterations(this.ptr)>>>0}get maxStabilizationIterations(){return h.rawintegrationparameters_maxStabilizationIterations(this.ptr)>>>0}get minIslandSize(){return h.rawintegrationparameters_minIslandSize(this.ptr)>>>0}get maxCcdSubsteps(){return h.rawintegrationparameters_maxCcdSubsteps(this.ptr)>>>0}set dt(A){h.rawintegrationparameters_set_dt(this.ptr,A)}set erp(A){h.rawintegrationparameters_set_erp(this.ptr,A)}set allowedLinearError(A){h.rawintegrationparameters_set_allowedLinearError(this.ptr,A)}set predictionDistance(A){h.rawintegrationparameters_set_predictionDistance(this.ptr,A)}set maxVelocityIterations(A){h.rawintegrationparameters_set_maxVelocityIterations(this.ptr,A)}set maxVelocityFrictionIterations(A){h.rawintegrationparameters_set_maxVelocityFrictionIterations(this.ptr,A)}set maxStabilizationIterations(A){h.rawintegrationparameters_set_maxStabilizationIterations(this.ptr,A)}set minIslandSize(A){h.rawintegrationparameters_set_minIslandSize(this.ptr,A)}set maxCcdSubsteps(A){h.rawintegrationparameters_set_maxCcdSubsteps(this.ptr,A)}}class Rg{static __wrap(A){const I=Object.create(Rg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawislandmanager_free(A)}constructor(){const A=h.rawislandmanager_new();return Rg.__wrap(A)}forEachActiveRigidBodyHandle(A){try{h.rawislandmanager_forEachActiveRigidBodyHandle(this.ptr,SI(A))}finally{II[DI++]=void 0}}}class rE{static __wrap(A){const I=Object.create(rE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawkinematiccharactercontroller_free(A)}constructor(A){const I=h.rawkinematiccharactercontroller_new(A);return rE.__wrap(I)}up(){const A=h.rawkinematiccharactercontroller_up(this.ptr);return CA.__wrap(A)}setUp(A){H(A,CA),h.rawkinematiccharactercontroller_setUp(this.ptr,A.ptr)}offset(){return h.rawkinematiccharactercontroller_offset(this.ptr)}setOffset(A){h.rawkinematiccharactercontroller_setOffset(this.ptr,A)}slideEnabled(){return h.rawkinematiccharactercontroller_slideEnabled(this.ptr)!==0}setSlideEnabled(A){h.rawkinematiccharactercontroller_setSlideEnabled(this.ptr,A)}autostepMaxHeight(){try{const g=h.__wbindgen_add_to_stack_pointer(-16);h.rawkinematiccharactercontroller_autostepMaxHeight(g,this.ptr);var A=cI()[g/4+0],I=CC()[g/4+1];return A===0?void 0:I}finally{h.__wbindgen_add_to_stack_pointer(16)}}autostepMinWidth(){try{const g=h.__wbindgen_add_to_stack_pointer(-16);h.rawkinematiccharactercontroller_autostepMinWidth(g,this.ptr);var A=cI()[g/4+0],I=CC()[g/4+1];return A===0?void 0:I}finally{h.__wbindgen_add_to_stack_pointer(16)}}autostepIncludesDynamicBodies(){const A=h.rawkinematiccharactercontroller_autostepIncludesDynamicBodies(this.ptr);return A===16777215?void 0:A!==0}autostepEnabled(){return h.rawkinematiccharactercontroller_autostepEnabled(this.ptr)!==0}enableAutostep(A,I,g){h.rawkinematiccharactercontroller_enableAutostep(this.ptr,A,I,g)}disableAutostep(){h.rawkinematiccharactercontroller_disableAutostep(this.ptr)}maxSlopeClimbAngle(){return h.rawkinematiccharactercontroller_maxSlopeClimbAngle(this.ptr)}setMaxSlopeClimbAngle(A){h.rawkinematiccharactercontroller_setMaxSlopeClimbAngle(this.ptr,A)}minSlopeSlideAngle(){return h.rawkinematiccharactercontroller_minSlopeSlideAngle(this.ptr)}setMinSlopeSlideAngle(A){h.rawkinematiccharactercontroller_setMinSlopeSlideAngle(this.ptr,A)}snapToGroundDistance(){try{const g=h.__wbindgen_add_to_stack_pointer(-16);h.rawkinematiccharactercontroller_snapToGroundDistance(g,this.ptr);var A=cI()[g/4+0],I=CC()[g/4+1];return A===0?void 0:I}finally{h.__wbindgen_add_to_stack_pointer(16)}}enableSnapToGround(A){h.rawkinematiccharactercontroller_enableSnapToGround(this.ptr,A)}disableSnapToGround(){h.rawkinematiccharactercontroller_disableSnapToGround(this.ptr)}snapToGroundEnabled(){return h.rawkinematiccharactercontroller_snapToGroundEnabled(this.ptr)!==0}computeColliderMovement(A,I,g,C,B,E,Q,o,t,e,a){try{H(I,kI),H(g,yI),H(C,$B),H(E,CA),h.rawkinematiccharactercontroller_computeColliderMovement(this.ptr,A,I.ptr,g.ptr,C.ptr,B,E.ptr,Q,!LA(o),LA(o)?0:o,t,!LA(e),LA(e)?0:e,SI(a))}finally{II[DI++]=void 0}}computedMovement(){const A=h.rawkinematiccharactercontroller_computedMovement(this.ptr);return CA.__wrap(A)}computedGrounded(){return h.rawkinematiccharactercontroller_computedGrounded(this.ptr)!==0}numComputedCollisions(){return h.rawkinematiccharactercontroller_numComputedCollisions(this.ptr)>>>0}computedCollision(A,I){return H(I,XB),h.rawkinematiccharactercontroller_computedCollision(this.ptr,A,I.ptr)!==0}}class Yg{static __wrap(A){const I=Object.create(Yg.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawmultibodyjointset_free(A)}jointType(A){return h.rawmultibodyjointset_jointType(this.ptr,A)>>>0}jointFrameX1(A){const I=h.rawmultibodyjointset_jointFrameX1(this.ptr,A);return gI.__wrap(I)}jointFrameX2(A){const I=h.rawmultibodyjointset_jointFrameX2(this.ptr,A);return gI.__wrap(I)}jointAnchor1(A){const I=h.rawmultibodyjointset_jointAnchor1(this.ptr,A);return CA.__wrap(I)}jointAnchor2(A){const I=h.rawmultibodyjointset_jointAnchor2(this.ptr,A);return CA.__wrap(I)}jointContactsEnabled(A){return h.rawmultibodyjointset_jointContactsEnabled(this.ptr,A)!==0}jointSetContactsEnabled(A,I){h.rawmultibodyjointset_jointSetContactsEnabled(this.ptr,A,I)}jointLimitsEnabled(A,I){return h.rawmultibodyjointset_jointLimitsEnabled(this.ptr,A,I)!==0}jointLimitsMin(A,I){return h.rawmultibodyjointset_jointLimitsMin(this.ptr,A,I)}jointLimitsMax(A,I){return h.rawmultibodyjointset_jointLimitsMax(this.ptr,A,I)}constructor(){const A=h.rawmultibodyjointset_new();return Yg.__wrap(A)}createJoint(A,I,g,C){return H(A,fg),h.rawmultibodyjointset_createJoint(this.ptr,A.ptr,I,g,C)}remove(A,I){h.rawmultibodyjointset_remove(this.ptr,A,I)}contains(A){return h.rawmultibodyjointset_contains(this.ptr,A)!==0}forEachJointHandle(A){try{h.rawmultibodyjointset_forEachJointHandle(this.ptr,SI(A))}finally{II[DI++]=void 0}}forEachJointAttachedToRigidBody(A,I){try{h.rawmultibodyjointset_forEachJointAttachedToRigidBody(this.ptr,A,SI(I))}finally{II[DI++]=void 0}}}class Og{static __wrap(A){const I=Object.create(Og.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawnarrowphase_free(A)}constructor(){const A=h.rawnarrowphase_new();return Og.__wrap(A)}contacts_with(A,I){h.rawnarrowphase_contacts_with(this.ptr,A,NI(I))}contact_pair(A,I){const g=h.rawnarrowphase_contact_pair(this.ptr,A,I);return g===0?void 0:oo.__wrap(g)}intersections_with(A,I){h.rawnarrowphase_intersections_with(this.ptr,A,NI(I))}intersection_pair(A,I){return h.rawnarrowphase_intersection_pair(this.ptr,A,I)!==0}}class hE{static __wrap(A){const I=Object.create(hE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawphysicspipeline_free(A)}constructor(){const A=h.rawphysicspipeline_new();return hE.__wrap(A)}step(A,I,g,C,B,E,Q,o,t,e){H(A,CA),H(I,iC),H(g,Rg),H(C,EC),H(B,Og),H(E,kI),H(Q,yI),H(o,Lg),H(t,Yg),H(e,eB),h.rawphysicspipeline_step(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E.ptr,Q.ptr,o.ptr,t.ptr,e.ptr)}stepWithEvents(A,I,g,C,B,E,Q,o,t,e,a,s,D,c){H(A,CA),H(I,iC),H(g,Rg),H(C,EC),H(B,Og),H(E,kI),H(Q,yI),H(o,Lg),H(t,Yg),H(e,eB),H(a,zB),h.rawphysicspipeline_stepWithEvents(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E.ptr,Q.ptr,o.ptr,t.ptr,e.ptr,a.ptr,NI(s),NI(D),NI(c))}}class cE{static __wrap(A){const I=Object.create(cE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawpointcolliderprojection_free(A)}colliderHandle(){return h.rawcharactercollision_handle(this.ptr)}point(){const A=h.rawpointcolliderprojection_point(this.ptr);return CA.__wrap(A)}isInside(){return h.rawpointcolliderprojection_isInside(this.ptr)!==0}featureType(){return h.rawpointcolliderprojection_featureType(this.ptr)>>>0}featureId(){try{const g=h.__wbindgen_add_to_stack_pointer(-16);h.rawpointcolliderprojection_featureId(g,this.ptr);var A=cI()[g/4+0],I=cI()[g/4+1];return A===0?void 0:I>>>0}finally{h.__wbindgen_add_to_stack_pointer(16)}}}class NE{static __wrap(A){const I=Object.create(NE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawpointprojection_free(A)}point(){const A=h.rawkinematiccharactercontroller_up(this.ptr);return CA.__wrap(A)}isInside(){return h.rawpointprojection_isInside(this.ptr)!==0}}class $B{static __wrap(A){const I=Object.create($B.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawquerypipeline_free(A)}constructor(){const A=h.rawquerypipeline_new();return $B.__wrap(A)}update(A,I,g){H(A,Rg),H(I,kI),H(g,yI),h.rawquerypipeline_update(this.ptr,A.ptr,I.ptr,g.ptr)}castRay(A,I,g,C,B,E,Q,o,t,e,a){try{H(A,kI),H(I,yI),H(g,CA),H(C,CA);const s=h.rawquerypipeline_castRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,E,Q,!LA(o),LA(o)?0:o,!LA(t),LA(t)?0:t,!LA(e),LA(e)?0:e,SI(a));return s===0?void 0:eo.__wrap(s)}finally{II[DI++]=void 0}}castRayAndGetNormal(A,I,g,C,B,E,Q,o,t,e,a){try{H(A,kI),H(I,yI),H(g,CA),H(C,CA);const s=h.rawquerypipeline_castRayAndGetNormal(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,E,Q,!LA(o),LA(o)?0:o,!LA(t),LA(t)?0:t,!LA(e),LA(e)?0:e,SI(a));return s===0?void 0:KE.__wrap(s)}finally{II[DI++]=void 0}}intersectionsWithRay(A,I,g,C,B,E,Q,o,t,e,a,s){try{H(A,kI),H(I,yI),H(g,CA),H(C,CA),h.rawquerypipeline_intersectionsWithRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,E,SI(Q),o,!LA(t),LA(t)?0:t,!LA(e),LA(e)?0:e,!LA(a),LA(a)?0:a,SI(s))}finally{II[DI++]=void 0,II[DI++]=void 0}}intersectionWithShape(A,I,g,C,B,E,Q,o,t,e){try{const D=h.__wbindgen_add_to_stack_pointer(-16);H(A,kI),H(I,yI),H(g,CA),H(C,gI),H(B,bA),h.rawquerypipeline_intersectionWithShape(D,this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E,!LA(Q),LA(Q)?0:Q,!LA(o),LA(o)?0:o,!LA(t),LA(t)?0:t,SI(e));var a=cI()[D/4+0],s=nE()[D/8+1];return a===0?void 0:s}finally{h.__wbindgen_add_to_stack_pointer(16),II[DI++]=void 0}}projectPoint(A,I,g,C,B,E,Q,o,t){try{H(A,kI),H(I,yI),H(g,CA);const e=h.rawquerypipeline_projectPoint(this.ptr,A.ptr,I.ptr,g.ptr,C,B,!LA(E),LA(E)?0:E,!LA(Q),LA(Q)?0:Q,!LA(o),LA(o)?0:o,SI(t));return e===0?void 0:cE.__wrap(e)}finally{II[DI++]=void 0}}projectPointAndGetFeature(A,I,g,C,B,E,Q,o){try{H(A,kI),H(I,yI),H(g,CA);const t=h.rawquerypipeline_projectPointAndGetFeature(this.ptr,A.ptr,I.ptr,g.ptr,C,!LA(B),LA(B)?0:B,!LA(E),LA(E)?0:E,!LA(Q),LA(Q)?0:Q,SI(o));return t===0?void 0:cE.__wrap(t)}finally{II[DI++]=void 0}}intersectionsWithPoint(A,I,g,C,B,E,Q,o,t){try{H(A,kI),H(I,yI),H(g,CA),h.rawquerypipeline_intersectionsWithPoint(this.ptr,A.ptr,I.ptr,g.ptr,SI(C),B,!LA(E),LA(E)?0:E,!LA(Q),LA(Q)?0:Q,!LA(o),LA(o)?0:o,SI(t))}finally{II[DI++]=void 0,II[DI++]=void 0}}castShape(A,I,g,C,B,E,Q,o,t,e,a,s,D){try{H(A,kI),H(I,yI),H(g,CA),H(C,gI),H(B,CA),H(E,bA);const c=h.rawquerypipeline_castShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E.ptr,Q,o,t,!LA(e),LA(e)?0:e,!LA(a),LA(a)?0:a,!LA(s),LA(s)?0:s,SI(D));return c===0?void 0:UE.__wrap(c)}finally{II[DI++]=void 0}}intersectionsWithShape(A,I,g,C,B,E,Q,o,t,e,a){try{H(A,kI),H(I,yI),H(g,CA),H(C,gI),H(B,bA),h.rawquerypipeline_intersectionsWithShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,SI(E),Q,!LA(o),LA(o)?0:o,!LA(t),LA(t)?0:t,!LA(e),LA(e)?0:e,SI(a))}finally{II[DI++]=void 0,II[DI++]=void 0}}collidersWithAabbIntersectingAabb(A,I,g){try{H(A,CA),H(I,CA),h.rawquerypipeline_collidersWithAabbIntersectingAabb(this.ptr,A.ptr,I.ptr,SI(g))}finally{II[DI++]=void 0}}}class KE{static __wrap(A){const I=Object.create(KE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawraycolliderintersection_free(A)}colliderHandle(){return h.rawcharactercollision_handle(this.ptr)}normal(){const A=h.rawraycolliderintersection_normal(this.ptr);return CA.__wrap(A)}toi(){return h.rawraycolliderintersection_toi(this.ptr)}featureType(){return h.rawpointcolliderprojection_featureType(this.ptr)>>>0}featureId(){try{const g=h.__wbindgen_add_to_stack_pointer(-16);h.rawpointcolliderprojection_featureId(g,this.ptr);var A=cI()[g/4+0],I=cI()[g/4+1];return A===0?void 0:I>>>0}finally{h.__wbindgen_add_to_stack_pointer(16)}}}class eo{static __wrap(A){const I=Object.create(eo.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawraycollidertoi_free(A)}colliderHandle(){return h.rawcharactercollision_handle(this.ptr)}toi(){return h.rawraycolliderintersection_toi(this.ptr)}}class dE{static __wrap(A){const I=Object.create(dE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawrayintersection_free(A)}normal(){const A=h.rawrayintersection_normal(this.ptr);return CA.__wrap(A)}toi(){return h.rawintegrationparameters_dt(this.ptr)}featureType(){return h.rawrayintersection_featureType(this.ptr)>>>0}featureId(){try{const g=h.__wbindgen_add_to_stack_pointer(-16);h.rawrayintersection_featureId(g,this.ptr);var A=cI()[g/4+0],I=cI()[g/4+1];return A===0?void 0:I>>>0}finally{h.__wbindgen_add_to_stack_pointer(16)}}}class kI{static __wrap(A){const I=Object.create(kI.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawrigidbodyset_free(A)}rbTranslation(A){const I=h.rawrigidbodyset_rbTranslation(this.ptr,A);return CA.__wrap(I)}rbRotation(A){const I=h.rawrigidbodyset_rbRotation(this.ptr,A);return gI.__wrap(I)}rbSleep(A){h.rawrigidbodyset_rbSleep(this.ptr,A)}rbIsSleeping(A){return h.rawrigidbodyset_rbIsSleeping(this.ptr,A)!==0}rbIsMoving(A){return h.rawrigidbodyset_rbIsMoving(this.ptr,A)!==0}rbNextTranslation(A){const I=h.rawrigidbodyset_rbNextTranslation(this.ptr,A);return CA.__wrap(I)}rbNextRotation(A){const I=h.rawrigidbodyset_rbNextRotation(this.ptr,A);return gI.__wrap(I)}rbSetTranslation(A,I,g,C){h.rawrigidbodyset_rbSetTranslation(this.ptr,A,I,g,C)}rbSetRotation(A,I,g){h.rawrigidbodyset_rbSetRotation(this.ptr,A,I,g)}rbSetLinvel(A,I,g){H(I,CA),h.rawrigidbodyset_rbSetLinvel(this.ptr,A,I.ptr,g)}rbSetAngvel(A,I,g){h.rawrigidbodyset_rbSetAngvel(this.ptr,A,I,g)}rbSetNextKinematicTranslation(A,I,g){h.rawrigidbodyset_rbSetNextKinematicTranslation(this.ptr,A,I,g)}rbSetNextKinematicRotation(A,I){h.rawrigidbodyset_rbSetNextKinematicRotation(this.ptr,A,I)}rbRecomputeMassPropertiesFromColliders(A,I){H(I,yI),h.rawrigidbodyset_rbRecomputeMassPropertiesFromColliders(this.ptr,A,I.ptr)}rbSetAdditionalMass(A,I,g){h.rawrigidbodyset_rbSetAdditionalMass(this.ptr,A,I,g)}rbSetAdditionalMassProperties(A,I,g,C,B){H(g,CA),h.rawrigidbodyset_rbSetAdditionalMassProperties(this.ptr,A,I,g.ptr,C,B)}rbLinvel(A){const I=h.rawrigidbodyset_rbLinvel(this.ptr,A);return CA.__wrap(I)}rbAngvel(A){return h.rawrigidbodyset_rbAngvel(this.ptr,A)}rbLockTranslations(A,I,g){h.rawrigidbodyset_rbLockTranslations(this.ptr,A,I,g)}rbSetEnabledTranslations(A,I,g,C){h.rawrigidbodyset_rbSetEnabledTranslations(this.ptr,A,I,g,C)}rbLockRotations(A,I,g){h.rawrigidbodyset_rbLockRotations(this.ptr,A,I,g)}rbDominanceGroup(A){return h.rawrigidbodyset_rbDominanceGroup(this.ptr,A)}rbSetDominanceGroup(A,I){h.rawrigidbodyset_rbSetDominanceGroup(this.ptr,A,I)}rbEnableCcd(A,I){h.rawrigidbodyset_rbEnableCcd(this.ptr,A,I)}rbMass(A){return h.rawrigidbodyset_rbMass(this.ptr,A)}rbWakeUp(A){h.rawrigidbodyset_rbWakeUp(this.ptr,A)}rbIsCcdEnabled(A){return h.rawrigidbodyset_rbIsCcdEnabled(this.ptr,A)!==0}rbNumColliders(A){return h.rawrigidbodyset_rbNumColliders(this.ptr,A)>>>0}rbCollider(A,I){return h.rawrigidbodyset_rbCollider(this.ptr,A,I)}rbBodyType(A){return h.rawrigidbodyset_rbBodyType(this.ptr,A)>>>0}rbSetBodyType(A,I){h.rawrigidbodyset_rbSetBodyType(this.ptr,A,I)}rbIsFixed(A){return h.rawrigidbodyset_rbIsFixed(this.ptr,A)!==0}rbIsKinematic(A){return h.rawrigidbodyset_rbIsKinematic(this.ptr,A)!==0}rbIsDynamic(A){return h.rawrigidbodyset_rbIsDynamic(this.ptr,A)!==0}rbLinearDamping(A){return h.rawrigidbodyset_rbLinearDamping(this.ptr,A)}rbAngularDamping(A){return h.rawrigidbodyset_rbAngularDamping(this.ptr,A)}rbSetLinearDamping(A,I){h.rawrigidbodyset_rbSetLinearDamping(this.ptr,A,I)}rbSetAngularDamping(A,I){h.rawrigidbodyset_rbSetAngularDamping(this.ptr,A,I)}rbGravityScale(A){return h.rawrigidbodyset_rbGravityScale(this.ptr,A)}rbSetGravityScale(A,I,g){h.rawrigidbodyset_rbSetGravityScale(this.ptr,A,I,g)}rbResetForces(A,I){h.rawrigidbodyset_rbResetForces(this.ptr,A,I)}rbResetTorques(A,I){h.rawrigidbodyset_rbResetTorques(this.ptr,A,I)}rbAddForce(A,I,g){H(I,CA),h.rawrigidbodyset_rbAddForce(this.ptr,A,I.ptr,g)}rbApplyImpulse(A,I,g){H(I,CA),h.rawrigidbodyset_rbApplyImpulse(this.ptr,A,I.ptr,g)}rbAddTorque(A,I,g){h.rawrigidbodyset_rbAddTorque(this.ptr,A,I,g)}rbApplyTorqueImpulse(A,I,g){h.rawrigidbodyset_rbApplyTorqueImpulse(this.ptr,A,I,g)}rbAddForceAtPoint(A,I,g,C){H(I,CA),H(g,CA),h.rawrigidbodyset_rbAddForceAtPoint(this.ptr,A,I.ptr,g.ptr,C)}rbApplyImpulseAtPoint(A,I,g,C){H(I,CA),H(g,CA),h.rawrigidbodyset_rbApplyImpulseAtPoint(this.ptr,A,I.ptr,g.ptr,C)}rbUserData(A){return h.rawrigidbodyset_rbUserData(this.ptr,A)>>>0}rbSetUserData(A,I){h.rawrigidbodyset_rbSetUserData(this.ptr,A,I)}constructor(){const A=h.rawrigidbodyset_new();return kI.__wrap(A)}createRigidBody(A,I,g,C,B,E,Q,o,t,e,a,s,D,c,r,n,l,G,S){return H(A,CA),H(I,gI),H(E,CA),H(Q,CA),h.rawrigidbodyset_createRigidBody(this.ptr,A.ptr,I.ptr,g,C,B,E.ptr,Q.ptr,o,t,e,a,s,D,c,r,n,l,G,S)}remove(A,I,g,C,B){H(I,Rg),H(g,yI),H(C,Lg),H(B,Yg),h.rawrigidbodyset_remove(this.ptr,A,I.ptr,g.ptr,C.ptr,B.ptr)}len(){return h.rawrigidbodyset_len(this.ptr)>>>0}contains(A){return h.rawrigidbodyset_contains(this.ptr,A)!==0}forEachRigidBodyHandle(A){try{h.rawrigidbodyset_forEachRigidBodyHandle(this.ptr,SI(A))}finally{II[DI++]=void 0}}}class gI{static __wrap(A){const I=Object.create(gI.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawrotation_free(A)}static identity(){const A=h.rawrotation_identity();return gI.__wrap(A)}static fromAngle(A){const I=h.rawrotation_fromAngle(A);return gI.__wrap(I)}get im(){return h.rawrotation_im(this.ptr)}get re(){return h.rawintegrationparameters_dt(this.ptr)}get angle(){return h.rawrotation_angle(this.ptr)}}class wE{static __wrap(A){const I=Object.create(wE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawserializationpipeline_free(A)}constructor(){const A=h.rawserializationpipeline_new();return wE.__wrap(A)}serializeAll(A,I,g,C,B,E,Q,o,t){return H(A,CA),H(I,iC),H(g,Rg),H(C,EC),H(B,Og),H(E,kI),H(Q,yI),H(o,Lg),H(t,Yg),sE(h.rawserializationpipeline_serializeAll(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E.ptr,Q.ptr,o.ptr,t.ptr))}deserializeAll(A){const I=h.rawserializationpipeline_deserializeAll(this.ptr,NI(A));return I===0?void 0:to.__wrap(I)}}class bA{static __wrap(A){const I=Object.create(bA.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawshape_free(A)}static cuboid(A,I){const g=h.rawshape_cuboid(A,I);return bA.__wrap(g)}static roundCuboid(A,I,g){const C=h.rawshape_roundCuboid(A,I,g);return bA.__wrap(C)}static ball(A){const I=h.rawshape_ball(A);return bA.__wrap(I)}static halfspace(A){H(A,CA);const I=h.rawshape_halfspace(A.ptr);return bA.__wrap(I)}static capsule(A,I){const g=h.rawshape_capsule(A,I);return bA.__wrap(g)}static polyline(A,I){const g=eC(A,h.__wbindgen_malloc),C=lg,B=It(I,h.__wbindgen_malloc),E=lg,Q=h.rawshape_polyline(g,C,B,E);return bA.__wrap(Q)}static trimesh(A,I){const g=eC(A,h.__wbindgen_malloc),C=lg,B=It(I,h.__wbindgen_malloc),E=lg,Q=h.rawshape_trimesh(g,C,B,E);return bA.__wrap(Q)}static heightfield(A,I){const g=eC(A,h.__wbindgen_malloc),C=lg;H(I,CA);const B=h.rawshape_heightfield(g,C,I.ptr);return bA.__wrap(B)}static segment(A,I){H(A,CA),H(I,CA);const g=h.rawshape_segment(A.ptr,I.ptr);return bA.__wrap(g)}static triangle(A,I,g){H(A,CA),H(I,CA),H(g,CA);const C=h.rawshape_triangle(A.ptr,I.ptr,g.ptr);return bA.__wrap(C)}static roundTriangle(A,I,g,C){H(A,CA),H(I,CA),H(g,CA);const B=h.rawshape_roundTriangle(A.ptr,I.ptr,g.ptr,C);return bA.__wrap(B)}static convexHull(A){const I=eC(A,h.__wbindgen_malloc),g=lg,C=h.rawshape_convexHull(I,g);return C===0?void 0:bA.__wrap(C)}static roundConvexHull(A,I){const g=eC(A,h.__wbindgen_malloc),C=lg,B=h.rawshape_roundConvexHull(g,C,I);return B===0?void 0:bA.__wrap(B)}static convexPolyline(A){const I=eC(A,h.__wbindgen_malloc),g=lg,C=h.rawshape_convexPolyline(I,g);return C===0?void 0:bA.__wrap(C)}static roundConvexPolyline(A,I){const g=eC(A,h.__wbindgen_malloc),C=lg,B=h.rawshape_roundConvexPolyline(g,C,I);return B===0?void 0:bA.__wrap(B)}castShape(A,I,g,C,B,E,Q,o,t){H(A,CA),H(I,gI),H(g,CA),H(C,bA),H(B,CA),H(E,gI),H(Q,CA);const e=h.rawshape_castShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E.ptr,Q.ptr,o,t);return e===0?void 0:JE.__wrap(e)}intersectsShape(A,I,g,C,B){return H(A,CA),H(I,gI),H(g,bA),H(C,CA),H(B,gI),h.rawshape_intersectsShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr)!==0}contactShape(A,I,g,C,B,E){H(A,CA),H(I,gI),H(g,bA),H(C,CA),H(B,gI);const Q=h.rawshape_contactShape(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B.ptr,E);return Q===0?void 0:AQ.__wrap(Q)}containsPoint(A,I,g){return H(A,CA),H(I,gI),H(g,CA),h.rawshape_containsPoint(this.ptr,A.ptr,I.ptr,g.ptr)!==0}projectPoint(A,I,g,C){H(A,CA),H(I,gI),H(g,CA);const B=h.rawshape_projectPoint(this.ptr,A.ptr,I.ptr,g.ptr,C);return NE.__wrap(B)}intersectsRay(A,I,g,C,B){return H(A,CA),H(I,gI),H(g,CA),H(C,CA),h.rawshape_intersectsRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B)!==0}castRay(A,I,g,C,B,E){return H(A,CA),H(I,gI),H(g,CA),H(C,CA),h.rawshape_castRay(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,E)}castRayAndGetNormal(A,I,g,C,B,E){H(A,CA),H(I,gI),H(g,CA),H(C,CA);const Q=h.rawshape_castRayAndGetNormal(this.ptr,A.ptr,I.ptr,g.ptr,C.ptr,B,E);return Q===0?void 0:dE.__wrap(Q)}}class UE{static __wrap(A){const I=Object.create(UE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawshapecollidertoi_free(A)}colliderHandle(){return h.rawcharactercollision_handle(this.ptr)}toi(){return h.rawraycolliderintersection_toi(this.ptr)}witness1(){const A=h.rawraycolliderintersection_normal(this.ptr);return CA.__wrap(A)}witness2(){const A=h.rawshapecollidertoi_witness2(this.ptr);return CA.__wrap(A)}normal1(){const A=h.rawcontactforceevent_max_force_direction(this.ptr);return CA.__wrap(A)}normal2(){const A=h.rawshapecollidertoi_normal2(this.ptr);return CA.__wrap(A)}}class AQ{static __wrap(A){const I=Object.create(AQ.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawshapecontact_free(A)}distance(){return h.rawintegrationparameters_predictionDistance(this.ptr)}point1(){const A=h.rawkinematiccharactercontroller_up(this.ptr);return CA.__wrap(A)}point2(){const A=h.rawshapecontact_point2(this.ptr);return CA.__wrap(A)}normal1(){const A=h.rawshapecontact_normal1(this.ptr);return CA.__wrap(A)}normal2(){const A=h.rawshapecontact_normal2(this.ptr);return CA.__wrap(A)}}class JE{static __wrap(A){const I=Object.create(JE.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawshapetoi_free(A)}toi(){return h.rawintegrationparameters_dt(this.ptr)}witness1(){const A=h.rawrayintersection_normal(this.ptr);return CA.__wrap(A)}witness2(){const A=h.rawshapetoi_witness2(this.ptr);return CA.__wrap(A)}normal1(){const A=h.rawshapetoi_normal1(this.ptr);return CA.__wrap(A)}normal2(){const A=h.rawshapetoi_normal2(this.ptr);return CA.__wrap(A)}}class CA{static __wrap(A){const I=Object.create(CA.prototype);return I.ptr=A,I}__destroy_into_raw(){const A=this.ptr;return this.ptr=0,A}free(){const A=this.__destroy_into_raw();h.__wbg_rawvector_free(A)}static zero(){const A=h.rawvector_zero();return CA.__wrap(A)}constructor(A,I){const g=h.rawvector_new(A,I);return CA.__wrap(g)}get x(){return h.rawintegrationparameters_dt(this.ptr)}set x(A){h.rawintegrationparameters_set_dt(this.ptr,A)}get y(){return h.rawrotation_im(this.ptr)}set y(A){h.rawvector_set_y(this.ptr,A)}xy(){const A=h.rawvector_xy(this.ptr);return CA.__wrap(A)}yx(){const A=h.rawvector_yx(this.ptr);return CA.__wrap(A)}}async function He(i){i===void 0&&(i=new URL("rapier_wasm2d_bg.wasm","<deleted>"));const A=function(){const C={wbg:{}};return C.wbg.__wbindgen_object_drop_ref=function(B){sE(B)},C.wbg.__wbindgen_number_new=function(B){return NI(B)},C.wbg.__wbindgen_number_get=function(B,E){const Q=tI(E),o=typeof Q=="number"?Q:void 0;nE()[B/8+1]=LA(o)?0:o,cI()[B/4+0]=!LA(o)},C.wbg.__wbindgen_boolean_get=function(B){const E=tI(B);return typeof E=="boolean"?E?1:0:2},C.wbg.__wbindgen_is_function=function(B){return typeof tI(B)=="function"},C.wbg.__wbg_rawraycolliderintersection_new=function(B){return NI(KE.__wrap(B))},C.wbg.__wbg_rawcontactforceevent_new=function(B){return NI(Eo.__wrap(B))},C.wbg.__wbg_call_168da88779e35f61=function(){return $E(function(B,E,Q){return NI(tI(B).call(tI(E),tI(Q)))},arguments)},C.wbg.__wbg_call_3999bee59e9f7719=function(){return $E(function(B,E,Q,o){return NI(tI(B).call(tI(E),tI(Q),tI(o)))},arguments)},C.wbg.__wbg_call_e1f72c051cdab859=function(){return $E(function(B,E,Q,o,t){return NI(tI(B).call(tI(E),tI(Q),tI(o),tI(t)))},arguments)},C.wbg.__wbg_bind_10dfe70e95d2a480=function(B,E,Q,o){return NI(tI(B).bind(tI(E),tI(Q),tI(o)))},C.wbg.__wbg_buffer_3f3d764d4747d564=function(B){return NI(tI(B).buffer)},C.wbg.__wbg_newwithbyteoffsetandlength_d9aa266703cb98be=function(B,E,Q){return NI(new Uint8Array(tI(B),E>>>0,Q>>>0))},C.wbg.__wbg_new_8c3f0052272a457a=function(B){return NI(new Uint8Array(tI(B)))},C.wbg.__wbg_set_83db9690f9353e79=function(B,E,Q){tI(B).set(tI(E),Q>>>0)},C.wbg.__wbg_length_9e1ae1900cb0fbd5=function(B){return tI(B).length},C.wbg.__wbg_newwithbyteoffsetandlength_be22e5fcf4f69ab4=function(B,E,Q){return NI(new Float32Array(tI(B),E>>>0,Q>>>0))},C.wbg.__wbg_set_0e0314cf6675c1b9=function(B,E,Q){tI(B).set(tI(E),Q>>>0)},C.wbg.__wbg_length_9a2deed95d22668d=function(B){return tI(B).length},C.wbg.__wbg_newwithlength_a7168e4a1e8f5e12=function(B){return NI(new Float32Array(B>>>0))},C.wbg.__wbindgen_throw=function(B,E){throw new Error(Le(B,E))},C.wbg.__wbindgen_memory=function(){return NI(h.memory)},C}();(typeof i=="string"||typeof Request=="function"&&i instanceof Request||typeof URL=="function"&&i instanceof URL)&&(i=fetch(i));const{instance:I,module:g}=await async function(C,B){if(typeof Response=="function"&&C instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(C,B)}catch(Q){if(C.headers.get("Content-Type")=="application/wasm")throw Q;console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",Q)}const E=await C.arrayBuffer();return await WebAssembly.instantiate(E,B)}{const E=await WebAssembly.instantiate(C,B);return E instanceof WebAssembly.Instance?{instance:E,module:C}:E}}(await i,A);return function(C,B){return h=C.exports,He.__wbindgen_wasm_module=B,EE=new Float32Array,CE=new Float64Array,BE=new Int32Array,iE=new Uint32Array,QE=new Uint8Array,h}(I,g)}class ao{constructor(A,I){this.x=A,this.y=I}}class AA{static new(A,I){return new ao(A,I)}static zeros(){return AA.new(0,0)}static fromRaw(A){if(!A)return null;let I=AA.new(A.x,A.y);return A.free(),I}static intoRaw(A){return new CA(A.x,A.y)}static copy(A,I){A.x=I.x,A.y=I.y}}class nI{static identity(){return 0}static fromRaw(A){if(!A)return null;let I=A.angle;return A.free(),I}static intoRaw(A){return gI.fromAngle(A)}}var Sg,_I,xi,IQ,aB,sI,GE,wC,Ti,lE,bi,vi;(function(i){i[i.Dynamic=0]="Dynamic",i[i.Fixed=1]="Fixed",i[i.KinematicPositionBased=2]="KinematicPositionBased",i[i.KinematicVelocityBased=3]="KinematicVelocityBased"})(Sg||(Sg={}));class Wi{constructor(A,I,g){this.rawSet=A,this.colliderSet=I,this.handle=g}finalizeDeserialization(A){this.colliderSet=A}isValid(){return this.rawSet.contains(this.handle)}lockTranslations(A,I){return this.rawSet.rbLockTranslations(this.handle,A,I)}lockRotations(A,I){return this.rawSet.rbLockRotations(this.handle,A,I)}setEnabledTranslations(A,I,g){return this.rawSet.rbSetEnabledTranslations(this.handle,A,I,g)}restrictTranslations(A,I,g){this.setEnabledTranslations(A,A,g)}dominanceGroup(){return this.rawSet.rbDominanceGroup(this.handle)}setDominanceGroup(A){this.rawSet.rbSetDominanceGroup(this.handle,A)}enableCcd(A){this.rawSet.rbEnableCcd(this.handle,A)}translation(){let A=this.rawSet.rbTranslation(this.handle);return AA.fromRaw(A)}rotation(){let A=this.rawSet.rbRotation(this.handle);return nI.fromRaw(A)}nextTranslation(){let A=this.rawSet.rbNextTranslation(this.handle);return AA.fromRaw(A)}nextRotation(){let A=this.rawSet.rbNextRotation(this.handle);return nI.fromRaw(A)}setTranslation(A,I){this.rawSet.rbSetTranslation(this.handle,A.x,A.y,I)}setLinvel(A,I){let g=AA.intoRaw(A);this.rawSet.rbSetLinvel(this.handle,g,I),g.free()}gravityScale(){return this.rawSet.rbGravityScale(this.handle)}setGravityScale(A,I){this.rawSet.rbSetGravityScale(this.handle,A,I)}setRotation(A,I){this.rawSet.rbSetRotation(this.handle,A,I)}setAngvel(A,I){this.rawSet.rbSetAngvel(this.handle,A,I)}setNextKinematicTranslation(A){this.rawSet.rbSetNextKinematicTranslation(this.handle,A.x,A.y)}setNextKinematicRotation(A){this.rawSet.rbSetNextKinematicRotation(this.handle,A)}linvel(){return AA.fromRaw(this.rawSet.rbLinvel(this.handle))}angvel(){return this.rawSet.rbAngvel(this.handle)}mass(){return this.rawSet.rbMass(this.handle)}sleep(){this.rawSet.rbSleep(this.handle)}wakeUp(){this.rawSet.rbWakeUp(this.handle)}isCcdEnabled(){return this.rawSet.rbIsCcdEnabled(this.handle)}numColliders(){return this.rawSet.rbNumColliders(this.handle)}collider(A){return this.colliderSet.get(this.rawSet.rbCollider(this.handle,A))}bodyType(){return this.rawSet.rbBodyType(this.handle)}setBodyType(A){return this.rawSet.rbSetBodyType(this.handle,A)}isSleeping(){return this.rawSet.rbIsSleeping(this.handle)}isMoving(){return this.rawSet.rbIsMoving(this.handle)}isFixed(){return this.rawSet.rbIsFixed(this.handle)}isKinematic(){return this.rawSet.rbIsKinematic(this.handle)}isDynamic(){return this.rawSet.rbIsDynamic(this.handle)}linearDamping(){return this.rawSet.rbLinearDamping(this.handle)}angularDamping(){return this.rawSet.rbAngularDamping(this.handle)}setLinearDamping(A){this.rawSet.rbSetLinearDamping(this.handle,A)}recomputeMassPropertiesFromColliders(){this.rawSet.rbRecomputeMassPropertiesFromColliders(this.handle,this.colliderSet.raw)}setAdditionalMass(A,I){this.rawSet.rbSetAdditionalMass(this.handle,A,I)}setAdditionalMassProperties(A,I,g,C){let B=AA.intoRaw(I);this.rawSet.rbSetAdditionalMassProperties(this.handle,A,B,g,C),B.free()}setAngularDamping(A){this.rawSet.rbSetAngularDamping(this.handle,A)}resetForces(A){this.rawSet.rbResetForces(this.handle,A)}resetTorques(A){this.rawSet.rbResetTorques(this.handle,A)}addForce(A,I){const g=AA.intoRaw(A);this.rawSet.rbAddForce(this.handle,g,I),g.free()}applyImpulse(A,I){const g=AA.intoRaw(A);this.rawSet.rbApplyImpulse(this.handle,g,I),g.free()}addTorque(A,I){this.rawSet.rbAddTorque(this.handle,A,I)}applyTorqueImpulse(A,I){this.rawSet.rbApplyTorqueImpulse(this.handle,A,I)}addForceAtPoint(A,I,g){const C=AA.intoRaw(A),B=AA.intoRaw(I);this.rawSet.rbAddForceAtPoint(this.handle,C,B,g),C.free(),B.free()}applyImpulseAtPoint(A,I,g){const C=AA.intoRaw(A),B=AA.intoRaw(I);this.rawSet.rbApplyImpulseAtPoint(this.handle,C,B,g),C.free(),B.free()}}class yg{constructor(A){this.status=A,this.translation=AA.zeros(),this.rotation=nI.identity(),this.gravityScale=1,this.linvel=AA.zeros(),this.mass=0,this.massOnly=!1,this.centerOfMass=AA.zeros(),this.translationsEnabledX=!0,this.translationsEnabledY=!0,this.angvel=0,this.principalAngularInertia=0,this.rotationsEnabled=!0,this.linearDamping=0,this.angularDamping=0,this.canSleep=!0,this.sleeping=!1,this.ccdEnabled=!1,this.dominanceGroup=0}static dynamic(){return new yg(Sg.Dynamic)}static kinematicPositionBased(){return new yg(Sg.KinematicPositionBased)}static kinematicVelocityBased(){return new yg(Sg.KinematicVelocityBased)}static fixed(){return new yg(Sg.Fixed)}static newDynamic(){return new yg(Sg.Dynamic)}static newKinematicPositionBased(){return new yg(Sg.KinematicPositionBased)}static newKinematicVelocityBased(){return new yg(Sg.KinematicVelocityBased)}static newStatic(){return new yg(Sg.Fixed)}setDominanceGroup(A){return this.dominanceGroup=A,this}setTranslation(A,I){if(typeof A!="number"||typeof I!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:A,y:I},this}setRotation(A){return this.rotation=A,this}setGravityScale(A){return this.gravityScale=A,this}setAdditionalMass(A){return this.mass=A,this.massOnly=!0,this}setLinvel(A,I){if(typeof A!="number"||typeof I!="number")throw TypeError("The linvel components must be numbers.");return this.linvel={x:A,y:I},this}setAngvel(A){return this.angvel=A,this}setAdditionalMassProperties(A,I,g){return this.mass=A,AA.copy(this.centerOfMass,I),this.principalAngularInertia=g,this.massOnly=!1,this}enabledTranslations(A,I){return this.translationsEnabledX=A,this.translationsEnabledY=I,this}restrictTranslations(A,I){return this.enabledTranslations(A,I)}lockTranslations(){return this.restrictTranslations(!1,!1)}lockRotations(){return this.rotationsEnabled=!1,this}setLinearDamping(A){return this.linearDamping=A,this}setAngularDamping(A){return this.angularDamping=A,this}setCanSleep(A){return this.canSleep=A,this}setSleeping(A){return this.sleeping=A,this}setCcdEnabled(A){return this.ccdEnabled=A,this}setUserData(A){return this.userData=A,this}}class pE{constructor(){this.fconv=new Float64Array(1),this.uconv=new Uint32Array(this.fconv.buffer),this.data=new Array,this.size=0}set(A,I){let g=this.index(A);for(;this.data.length<=g;)this.data.push(null);this.data[g]==null&&(this.size+=1),this.data[g]=I}len(){return this.size}delete(A){let I=this.index(A);I<this.data.length&&(this.data[I]!=null&&(this.size-=1),this.data[I]=null)}clear(){this.data=new Array}get(A){let I=this.index(A);return I<this.data.length?this.data[I]:null}forEach(A){for(const I of this.data)I!=null&&A(I)}getAll(){return this.data.filter(A=>A!=null)}index(A){return this.fconv[0]=A,this.uconv[0]}}class me{constructor(A){this.raw=A||new kI,this.map=new pE,A&&A.forEachRigidBodyHandle(I=>{this.map.set(I,new Wi(A,null,I))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}finalizeDeserialization(A){this.map.forEach(I=>I.finalizeDeserialization(A))}createRigidBody(A,I){let g=AA.intoRaw(I.translation),C=nI.intoRaw(I.rotation),B=AA.intoRaw(I.linvel),E=AA.intoRaw(I.centerOfMass),Q=this.raw.createRigidBody(g,C,I.gravityScale,I.mass,I.massOnly,E,B,I.angvel,I.principalAngularInertia,I.translationsEnabledX,I.translationsEnabledY,I.rotationsEnabled,I.linearDamping,I.angularDamping,I.status,I.canSleep,I.sleeping,I.ccdEnabled,I.dominanceGroup);g.free(),C.free(),B.free(),E.free();const o=new Wi(this.raw,A,Q);return o.userData=I.userData,this.map.set(Q,o),o}remove(A,I,g,C,B){for(let E=0;E<this.raw.rbNumColliders(A);E+=1)g.unmap(this.raw.rbCollider(A,E));C.forEachJointHandleAttachedToRigidBody(A,E=>C.unmap(E)),B.forEachJointHandleAttachedToRigidBody(A,E=>B.unmap(E)),this.raw.remove(A,I.raw,g.raw,C.raw,B.raw),this.map.delete(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}get(A){return this.map.get(A)}forEach(A){this.map.forEach(A)}forEachActiveRigidBody(A,I){A.forEachActiveRigidBodyHandle(g=>{I(this.get(g))})}getAll(){return this.map.getAll()}}class xe{constructor(A){this.raw=A||new iC}free(){this.raw.free(),this.raw=void 0}get dt(){return this.raw.dt}get erp(){return this.raw.erp}get allowedLinearError(){return this.raw.allowedLinearError}get predictionDistance(){return this.raw.predictionDistance}get maxVelocityIterations(){return this.raw.maxVelocityIterations}get maxVelocityFrictionIterations(){return this.raw.maxVelocityFrictionIterations}get maxStabilizationIterations(){return this.raw.maxStabilizationIterations}get minIslandSize(){return this.raw.minIslandSize}get maxCcdSubsteps(){return this.raw.maxCcdSubsteps}set dt(A){this.raw.dt=A}set erp(A){this.raw.erp=A}set allowedLinearError(A){this.raw.allowedLinearError=A}set predictionDistance(A){this.raw.predictionDistance=A}set maxVelocityIterations(A){this.raw.maxVelocityIterations=A}set maxVelocityFrictionIterations(A){this.raw.maxVelocityFrictionIterations=A}set maxStabilizationIterations(A){this.raw.maxStabilizationIterations=A}set minIslandSize(A){this.raw.minIslandSize=A}set maxCcdSubsteps(A){this.raw.maxCcdSubsteps=A}}(function(i){i[i.Revolute=0]="Revolute",i[i.Fixed=1]="Fixed",i[i.Prismatic=2]="Prismatic"})(_I||(_I={})),function(i){i[i.AccelerationBased=0]="AccelerationBased",i[i.ForceBased=1]="ForceBased"}(xi||(xi={}));class RC{constructor(A,I,g){this.rawSet=A,this.bodySet=I,this.handle=g}static newTyped(A,I,g){switch(A.jointType(g)){case _I.Revolute:return new ve(A,I,g);case _I.Prismatic:return new be(A,I,g);case _I.Fixed:return new Te(A,I,g);default:return new RC(A,I,g)}}finalizeDeserialization(A){this.bodySet=A}isValid(){return this.rawSet.contains(this.handle)}body1(){return this.bodySet.get(this.rawSet.jointBodyHandle1(this.handle))}body2(){return this.bodySet.get(this.rawSet.jointBodyHandle2(this.handle))}type(){return this.rawSet.jointType(this.handle)}anchor1(){return AA.fromRaw(this.rawSet.jointAnchor1(this.handle))}anchor2(){return AA.fromRaw(this.rawSet.jointAnchor2(this.handle))}setAnchor1(A){const I=AA.intoRaw(A);this.rawSet.jointSetAnchor1(this.handle,I),I.free()}setAnchor2(A){const I=AA.intoRaw(A);this.rawSet.jointSetAnchor2(this.handle,I),I.free()}setContactsEnabled(A){this.rawSet.jointSetContactsEnabled(this.handle,A)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}}class so extends RC{limitsEnabled(){return this.rawSet.jointLimitsEnabled(this.handle,this.rawAxis())}limitsMin(){return this.rawSet.jointLimitsMin(this.handle,this.rawAxis())}limitsMax(){return this.rawSet.jointLimitsMax(this.handle,this.rawAxis())}setLimits(A,I){this.rawSet.jointSetLimits(this.handle,this.rawAxis(),A,I)}configureMotorModel(A){this.rawSet.jointConfigureMotorModel(this.handle,this.rawAxis(),A)}configureMotorVelocity(A,I){this.rawSet.jointConfigureMotorVelocity(this.handle,this.rawAxis(),A,I)}configureMotorPosition(A,I,g){this.rawSet.jointConfigureMotorPosition(this.handle,this.rawAxis(),A,I,g)}configureMotor(A,I,g,C){this.rawSet.jointConfigureMotor(this.handle,this.rawAxis(),A,I,g,C)}}class Te extends RC{}class be extends so{rawAxis(){return RE.X}}class ve extends so{rawAxis(){return RE.AngX}}class yC{constructor(){}static fixed(A,I,g,C){let B=new yC;return B.anchor1=A,B.anchor2=g,B.frame1=I,B.frame2=C,B.jointType=_I.Fixed,B}static revolute(A,I){let g=new yC;return g.anchor1=A,g.anchor2=I,g.jointType=_I.Revolute,g}static prismatic(A,I,g){let C=new yC;return C.anchor1=A,C.anchor2=I,C.axis=g,C.jointType=_I.Prismatic,C}intoRaw(){let A,I,g=AA.intoRaw(this.anchor1),C=AA.intoRaw(this.anchor2),B=!1,E=0,Q=0;switch(this.jointType){case _I.Fixed:let o=nI.intoRaw(this.frame1),t=nI.intoRaw(this.frame2);I=fg.fixed(g,o,C,t),o.free(),t.free();break;case _I.Prismatic:A=AA.intoRaw(this.axis),this.limitsEnabled&&(B=!0,E=this.limits[0],Q=this.limits[1]),I=fg.prismatic(g,C,A,B,E,Q),A.free();break;case _I.Revolute:I=fg.revolute(g,C)}return g.free(),C.free(),I}}class We{constructor(A){this.raw=A||new Lg,this.map=new pE,A&&A.forEachJointHandle(I=>{this.map.set(I,RC.newTyped(A,null,I))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}finalizeDeserialization(A){this.map.forEach(I=>I.finalizeDeserialization(A))}createJoint(A,I,g,C,B){const E=I.intoRaw(),Q=this.raw.createJoint(E,g,C,B);E.free();let o=RC.newTyped(this.raw,A,Q);return this.map.set(Q,o),o}remove(A,I){this.raw.remove(A,I),this.unmap(A)}forEachJointHandleAttachedToRigidBody(A,I){this.raw.forEachJointAttachedToRigidBody(A,I)}unmap(A){this.map.delete(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}get(A){return this.map.get(A)}forEach(A){this.map.forEach(A)}getAll(){return this.map.getAll()}}class NC{constructor(A,I){this.rawSet=A,this.handle=I}static newTyped(A,I){switch(A.jointType(I)){case _I.Revolute:return new Pe(A,I);case _I.Prismatic:return new _e(A,I);case _I.Fixed:return new Oe(A,I);default:return new NC(A,I)}}isValid(){return this.rawSet.contains(this.handle)}setContactsEnabled(A){this.rawSet.jointSetContactsEnabled(this.handle,A)}contactsEnabled(){return this.rawSet.jointContactsEnabled(this.handle)}}class no extends NC{}class Oe extends NC{}class _e extends no{rawAxis(){return RE.X}}class Pe extends no{rawAxis(){return RE.AngX}}class Ze{constructor(A){this.raw=A||new Yg,this.map=new pE,A&&A.forEachJointHandle(I=>{this.map.set(I,NC.newTyped(this.raw,I))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}createJoint(A,I,g,C){const B=A.intoRaw(),E=this.raw.createJoint(B,I,g,C);B.free();let Q=NC.newTyped(this.raw,E);return this.map.set(E,Q),Q}remove(A,I){this.raw.remove(A,I),this.map.delete(A)}unmap(A){this.map.delete(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}get(A){return this.map.get(A)}forEach(A){this.map.forEach(A)}forEachJointHandleAttachedToRigidBody(A,I){this.raw.forEachJointAttachedToRigidBody(A,I)}getAll(){return this.map.getAll()}}(function(i){i[i.Average=0]="Average",i[i.Min=1]="Min",i[i.Multiply=2]="Multiply",i[i.Max=3]="Max"})(IQ||(IQ={}));class Ve{constructor(A){this.raw=A||new eB}free(){this.raw.free(),this.raw=void 0}}class je{constructor(A){this.raw=A||new Rg}free(){this.raw.free(),this.raw=void 0}forEachActiveRigidBodyHandle(A){this.raw.forEachActiveRigidBodyHandle(A)}}class Xe{constructor(A){this.raw=A||new EC}free(){this.raw.free(),this.raw=void 0}}class ze{constructor(A){this.raw=A||new Og,this.tempManifold=new $e(null)}free(){this.raw.free(),this.raw=void 0}contactsWith(A,I){this.raw.contacts_with(A,I)}intersectionsWith(A,I){this.raw.intersections_with(A,I)}contactPair(A,I,g){const C=this.raw.contact_pair(A,I);if(C){const B=C.collider1()!=A;let E;for(E=0;E<C.numContactManifolds();++E)this.tempManifold.raw=C.contactManifold(E),this.tempManifold.raw&&g(this.tempManifold,B),this.tempManifold.free();C.free()}}intersectionPair(A,I){return this.raw.intersection_pair(A,I)}}class $e{constructor(A){this.raw=A}free(){this.raw.free(),this.raw=void 0}normal(){return AA.fromRaw(this.raw.normal())}localNormal1(){return AA.fromRaw(this.raw.local_n1())}localNormal2(){return AA.fromRaw(this.raw.local_n2())}subshape1(){return this.raw.subshape1()}subshape2(){return this.raw.subshape2()}numContacts(){return this.raw.num_contacts()}localContactPoint1(A){return AA.fromRaw(this.raw.contact_local_p1(A))}localContactPoint2(A){return AA.fromRaw(this.raw.contact_local_p2(A))}contactDist(A){return this.raw.contact_dist(A)}contactFid1(A){return this.raw.contact_fid1(A)}contactFid2(A){return this.raw.contact_fid2(A)}contactImpulse(A){return this.raw.contact_impulse(A)}contactTangentImpulse(A){return this.raw.contact_tangent_impulse(A)}numSolverContacts(){return this.raw.num_solver_contacts()}solverContactPoint(A){return AA.fromRaw(this.raw.solver_contact_point(A))}solverContactDist(A){return this.raw.solver_contact_dist(A)}solverContactFriction(A){return this.raw.solver_contact_friction(A)}solverContactRestitution(A){return this.raw.solver_contact_restitution(A)}solverContactTangentVelocity(A){return AA.fromRaw(this.raw.solver_contact_tangent_velocity(A))}}class sB{constructor(A,I,g,C,B){this.distance=A,this.point1=I,this.point2=g,this.normal1=C,this.normal2=B}static fromRaw(A){if(!A)return null;const I=new sB(A.distance(),AA.fromRaw(A.point1()),AA.fromRaw(A.point2()),AA.fromRaw(A.normal1()),AA.fromRaw(A.normal2()));return A.free(),I}}(function(i){i[i.Vertex=0]="Vertex",i[i.Face=1]="Face",i[i.Unknown=2]="Unknown"})(aB||(aB={}));class eQ{constructor(A,I){this.point=A,this.isInside=I}static fromRaw(A){if(!A)return null;const I=new eQ(AA.fromRaw(A.point()),A.isInside());return A.free(),I}}class gQ{constructor(A,I,g,C,B){this.featureType=aB.Unknown,this.featureId=void 0,this.collider=A,this.point=I,this.isInside=g,B!==void 0&&(this.featureId=B),C!==void 0&&(this.featureType=C)}static fromRaw(A,I){if(!I)return null;const g=new gQ(A.get(I.colliderHandle()),AA.fromRaw(I.point()),I.isInside(),I.featureType(),I.featureId());return I.free(),g}}class Bs{constructor(A,I){this.origin=A,this.dir=I}pointAt(A){return{x:this.origin.x+this.dir.x*A,y:this.origin.y+this.dir.y*A}}}class aQ{constructor(A,I,g,C){this.featureType=aB.Unknown,this.featureId=void 0,this.toi=A,this.normal=I,C!==void 0&&(this.featureId=C),g!==void 0&&(this.featureType=g)}static fromRaw(A){if(!A)return null;const I=new aQ(A.toi(),AA.fromRaw(A.normal()),A.featureType(),A.featureId());return A.free(),I}}class CQ{constructor(A,I,g,C,B){this.featureType=aB.Unknown,this.featureId=void 0,this.collider=A,this.toi=I,this.normal=g,B!==void 0&&(this.featureId=B),C!==void 0&&(this.featureType=C)}static fromRaw(A,I){if(!I)return null;const g=new CQ(A.get(I.colliderHandle()),I.toi(),AA.fromRaw(I.normal()),I.featureType(),I.featureId());return I.free(),g}}class fE{constructor(A,I){this.collider=A,this.toi=I}static fromRaw(A,I){if(!I)return null;const g=new fE(A.get(I.colliderHandle()),I.toi());return I.free(),g}}class SB{constructor(A,I,g,C,B){this.toi=A,this.witness1=I,this.witness2=g,this.normal1=C,this.normal2=B}static fromRaw(A,I){if(!I)return null;const g=new SB(I.toi(),AA.fromRaw(I.witness1()),AA.fromRaw(I.witness2()),AA.fromRaw(I.normal1()),AA.fromRaw(I.normal2()));return I.free(),g}}class sQ extends SB{constructor(A,I,g,C,B,E){super(I,g,C,B,E),this.collider=A}static fromRaw(A,I){if(!I)return null;const g=new sQ(A.get(I.colliderHandle()),I.toi(),AA.fromRaw(I.witness1()),AA.fromRaw(I.witness2()),AA.fromRaw(I.normal1()),AA.fromRaw(I.normal2()));return I.free(),g}}class VI{static fromRaw(A,I){const g=A.coShapeType(I);let C,B,E,Q,o,t,e;switch(g){case sI.Ball:return new Do(A.coRadius(I));case sI.Cuboid:return C=A.coHalfExtents(I),new ho(C.x,C.y);case sI.RoundCuboid:return C=A.coHalfExtents(I),B=A.coRoundRadius(I),new co(C.x,C.y,B);case sI.Capsule:return o=A.coHalfHeight(I),t=A.coRadius(I),new wo(o,t);case sI.Segment:return E=A.coVertices(I),new Go(AA.new(E[0],E[1]),AA.new(E[2],E[3]));case sI.Polyline:return E=A.coVertices(I),Q=A.coIndices(I),new yo(E,Q);case sI.Triangle:return E=A.coVertices(I),new lo(AA.new(E[0],E[1]),AA.new(E[2],E[3]),AA.new(E[4],E[5]));case sI.RoundTriangle:return E=A.coVertices(I),B=A.coRoundRadius(I),new So(AA.new(E[0],E[1]),AA.new(E[2],E[3]),AA.new(E[4],E[5]),B);case sI.HalfSpace:return e=AA.fromRaw(A.coHalfspaceNormal(I)),new ro(e);case sI.TriMesh:return E=A.coVertices(I),Q=A.coIndices(I),new ko(E,Q);case sI.HeightField:const a=A.coHeightfieldScale(I),s=A.coHeightfieldHeights(I);return new Mo(s,a);case sI.ConvexPolygon:return E=A.coVertices(I),new SE(E,!1);case sI.RoundConvexPolygon:return E=A.coVertices(I),B=A.coRoundRadius(I),new yE(E,B,!1);default:throw new Error("unknown shape type: "+g)}}castShape(A,I,g,C,B,E,Q,o,t){let e=AA.intoRaw(A),a=nI.intoRaw(I),s=AA.intoRaw(g),D=AA.intoRaw(B),c=nI.intoRaw(E),r=AA.intoRaw(Q),n=this.intoRaw(),l=C.intoRaw(),G=SB.fromRaw(null,n.castShape(e,a,s,l,D,c,r,o,t));return e.free(),a.free(),s.free(),D.free(),c.free(),r.free(),n.free(),l.free(),G}intersectsShape(A,I,g,C,B){let E=AA.intoRaw(A),Q=nI.intoRaw(I),o=AA.intoRaw(C),t=nI.intoRaw(B),e=this.intoRaw(),a=g.intoRaw(),s=e.intersectsShape(E,Q,a,o,t);return E.free(),Q.free(),o.free(),t.free(),e.free(),a.free(),s}contactShape(A,I,g,C,B,E){let Q=AA.intoRaw(A),o=nI.intoRaw(I),t=AA.intoRaw(C),e=nI.intoRaw(B),a=this.intoRaw(),s=g.intoRaw(),D=sB.fromRaw(a.contactShape(Q,o,s,t,e,E));return Q.free(),o.free(),t.free(),e.free(),a.free(),s.free(),D}containsPoint(A,I,g){let C=AA.intoRaw(A),B=nI.intoRaw(I),E=AA.intoRaw(g),Q=this.intoRaw(),o=Q.containsPoint(C,B,E);return C.free(),B.free(),E.free(),Q.free(),o}projectPoint(A,I,g,C){let B=AA.intoRaw(A),E=nI.intoRaw(I),Q=AA.intoRaw(g),o=this.intoRaw(),t=eQ.fromRaw(o.projectPoint(B,E,Q,C));return B.free(),E.free(),Q.free(),o.free(),t}intersectsRay(A,I,g,C){let B=AA.intoRaw(I),E=nI.intoRaw(g),Q=AA.intoRaw(A.origin),o=AA.intoRaw(A.dir),t=this.intoRaw(),e=t.intersectsRay(B,E,Q,o,C);return B.free(),E.free(),Q.free(),o.free(),t.free(),e}castRay(A,I,g,C,B){let E=AA.intoRaw(I),Q=nI.intoRaw(g),o=AA.intoRaw(A.origin),t=AA.intoRaw(A.dir),e=this.intoRaw(),a=e.castRay(E,Q,o,t,C,B);return E.free(),Q.free(),o.free(),t.free(),e.free(),a}castRayAndGetNormal(A,I,g,C,B){let E=AA.intoRaw(I),Q=nI.intoRaw(g),o=AA.intoRaw(A.origin),t=AA.intoRaw(A.dir),e=this.intoRaw(),a=aQ.fromRaw(e.castRayAndGetNormal(E,Q,o,t,C,B));return E.free(),Q.free(),o.free(),t.free(),e.free(),a}}(function(i){i[i.Ball=0]="Ball",i[i.Cuboid=1]="Cuboid",i[i.Capsule=2]="Capsule",i[i.Segment=3]="Segment",i[i.Polyline=4]="Polyline",i[i.Triangle=5]="Triangle",i[i.TriMesh=6]="TriMesh",i[i.HeightField=7]="HeightField",i[i.ConvexPolygon=9]="ConvexPolygon",i[i.RoundCuboid=10]="RoundCuboid",i[i.RoundTriangle=11]="RoundTriangle",i[i.RoundConvexPolygon=12]="RoundConvexPolygon",i[i.HalfSpace=13]="HalfSpace"})(sI||(sI={}));class Do extends VI{constructor(A){super(),this.type=sI.Ball,this.radius=A}intoRaw(){return bA.ball(this.radius)}}class ro extends VI{constructor(A){super(),this.type=sI.HalfSpace,this.normal=A}intoRaw(){let A=AA.intoRaw(this.normal),I=bA.halfspace(A);return A.free(),I}}class ho extends VI{constructor(A,I){super(),this.type=sI.Cuboid,this.halfExtents=AA.new(A,I)}intoRaw(){return bA.cuboid(this.halfExtents.x,this.halfExtents.y)}}class co extends VI{constructor(A,I,g){super(),this.type=sI.RoundCuboid,this.halfExtents=AA.new(A,I),this.borderRadius=g}intoRaw(){return bA.roundCuboid(this.halfExtents.x,this.halfExtents.y,this.borderRadius)}}class wo extends VI{constructor(A,I){super(),this.type=sI.Capsule,this.halfHeight=A,this.radius=I}intoRaw(){return bA.capsule(this.halfHeight,this.radius)}}class Go extends VI{constructor(A,I){super(),this.type=sI.Segment,this.a=A,this.b=I}intoRaw(){let A=AA.intoRaw(this.a),I=AA.intoRaw(this.b),g=bA.segment(A,I);return A.free(),I.free(),g}}class lo extends VI{constructor(A,I,g){super(),this.type=sI.Triangle,this.a=A,this.b=I,this.c=g}intoRaw(){let A=AA.intoRaw(this.a),I=AA.intoRaw(this.b),g=AA.intoRaw(this.c),C=bA.triangle(A,I,g);return A.free(),I.free(),g.free(),C}}class So extends VI{constructor(A,I,g,C){super(),this.type=sI.RoundTriangle,this.a=A,this.b=I,this.c=g,this.borderRadius=C}intoRaw(){let A=AA.intoRaw(this.a),I=AA.intoRaw(this.b),g=AA.intoRaw(this.c),C=bA.roundTriangle(A,I,g,this.borderRadius);return A.free(),I.free(),g.free(),C}}class yo extends VI{constructor(A,I){super(),this.type=sI.Polyline,this.vertices=A,this.indices=I??new Uint32Array(0)}intoRaw(){return bA.polyline(this.vertices,this.indices)}}class ko extends VI{constructor(A,I){super(),this.type=sI.TriMesh,this.vertices=A,this.indices=I}intoRaw(){return bA.trimesh(this.vertices,this.indices)}}class SE extends VI{constructor(A,I){super(),this.type=sI.ConvexPolygon,this.vertices=A,this.skipConvexHullComputation=!!I}intoRaw(){return this.skipConvexHullComputation?bA.convexPolyline(this.vertices):bA.convexHull(this.vertices)}}class yE extends VI{constructor(A,I,g){super(),this.type=sI.RoundConvexPolygon,this.vertices=A,this.borderRadius=I,this.skipConvexHullComputation=!!g}intoRaw(){return this.skipConvexHullComputation?bA.roundConvexPolyline(this.vertices,this.borderRadius):bA.roundConvexHull(this.vertices,this.borderRadius)}}class Mo extends VI{constructor(A,I){super(),this.type=sI.HeightField,this.heights=A,this.scale=I}intoRaw(){let A=AA.intoRaw(this.scale),I=bA.heightfield(this.heights,A);return A.free(),I}}(function(i){i[i.DYNAMIC_DYNAMIC=1]="DYNAMIC_DYNAMIC",i[i.DYNAMIC_KINEMATIC=12]="DYNAMIC_KINEMATIC",i[i.DYNAMIC_FIXED=2]="DYNAMIC_FIXED",i[i.KINEMATIC_KINEMATIC=52224]="KINEMATIC_KINEMATIC",i[i.KINEMATIC_FIXED=8704]="KINEMATIC_FIXED",i[i.FIXED_FIXED=32]="FIXED_FIXED",i[i.DEFAULT=15]="DEFAULT",i[i.ALL=60943]="ALL"})(GE||(GE={}));class Oi{constructor(A,I,g,C){this.colliderSet=A,this.handle=I,this._parent=g,this._shape=C}finalizeDeserialization(A){this.handle!=null&&(this._parent=A.get(this.colliderSet.raw.coParent(this.handle)))}ensureShapeIsCached(){this._shape||(this._shape=VI.fromRaw(this.colliderSet.raw,this.handle))}get shape(){return this.ensureShapeIsCached(),this._shape}isValid(){return this.colliderSet.raw.contains(this.handle)}translation(){return AA.fromRaw(this.colliderSet.raw.coTranslation(this.handle))}rotation(){return nI.fromRaw(this.colliderSet.raw.coRotation(this.handle))}isSensor(){return this.colliderSet.raw.coIsSensor(this.handle)}setSensor(A){this.colliderSet.raw.coSetSensor(this.handle,A)}setShape(A){let I=A.intoRaw();this.colliderSet.raw.coSetShape(this.handle,I),I.free(),this._shape=A}setRestitution(A){this.colliderSet.raw.coSetRestitution(this.handle,A)}setFriction(A){this.colliderSet.raw.coSetFriction(this.handle,A)}frictionCombineRule(){return this.colliderSet.raw.coFrictionCombineRule(this.handle)}setFrictionCombineRule(A){this.colliderSet.raw.coSetFrictionCombineRule(this.handle,A)}restitutionCombineRule(){return this.colliderSet.raw.coRestitutionCombineRule(this.handle)}setRestitutionCombineRule(A){this.colliderSet.raw.coSetRestitutionCombineRule(this.handle,A)}setCollisionGroups(A){this.colliderSet.raw.coSetCollisionGroups(this.handle,A)}setSolverGroups(A){this.colliderSet.raw.coSetSolverGroups(this.handle,A)}activeHooks(){return this.colliderSet.raw.coActiveHooks(this.handle)}setActiveHooks(A){this.colliderSet.raw.coSetActiveHooks(this.handle,A)}activeEvents(){return this.colliderSet.raw.coActiveEvents(this.handle)}setActiveEvents(A){this.colliderSet.raw.coSetActiveEvents(this.handle,A)}activeCollisionTypes(){return this.colliderSet.raw.coActiveCollisionTypes(this.handle)}setContactForceEventThreshold(A){return this.colliderSet.raw.coSetContactForceEventThreshold(this.handle,A)}contactForceEventThreshold(){return this.colliderSet.raw.coContactForceEventThreshold(this.handle)}setActiveCollisionTypes(A){this.colliderSet.raw.coSetActiveCollisionTypes(this.handle,A)}setDensity(A){this.colliderSet.raw.coSetDensity(this.handle,A)}setMass(A){this.colliderSet.raw.coSetMass(this.handle,A)}setMassProperties(A,I,g){let C=AA.intoRaw(I);this.colliderSet.raw.coSetMassProperties(this.handle,A,C,g),C.free()}setTranslation(A){this.colliderSet.raw.coSetTranslation(this.handle,A.x,A.y)}setTranslationWrtParent(A){this.colliderSet.raw.coSetTranslationWrtParent(this.handle,A.x,A.y)}setRotation(A){this.colliderSet.raw.coSetRotation(this.handle,A)}setRotationWrtParent(A){this.colliderSet.raw.coSetRotationWrtParent(this.handle,A)}shapeType(){return this.colliderSet.raw.coShapeType(this.handle)}halfExtents(){return AA.fromRaw(this.colliderSet.raw.coHalfExtents(this.handle))}radius(){return this.colliderSet.raw.coRadius(this.handle)}roundRadius(){return this.colliderSet.raw.coRoundRadius(this.handle)}halfHeight(){return this.colliderSet.raw.coHalfHeight(this.handle)}vertices(){return this.colliderSet.raw.coVertices(this.handle)}indices(){return this.colliderSet.raw.coIndices(this.handle)}heightfieldHeights(){return this.colliderSet.raw.coHeightfieldHeights(this.handle)}heightfieldScale(){let A=this.colliderSet.raw.coHeightfieldScale(this.handle);return AA.fromRaw(A)}parent(){return this._parent}friction(){return this.colliderSet.raw.coFriction(this.handle)}restitution(){return this.colliderSet.raw.coRestitution(this.handle)}density(){return this.colliderSet.raw.coDensity(this.handle)}mass(){return this.colliderSet.raw.coMass(this.handle)}volume(){return this.colliderSet.raw.coVolume(this.handle)}collisionGroups(){return this.colliderSet.raw.coCollisionGroups(this.handle)}solverGroups(){return this.colliderSet.raw.coSolverGroups(this.handle)}containsPoint(A){let I=AA.intoRaw(A),g=this.colliderSet.raw.coContainsPoint(this.handle,I);return I.free(),g}projectPoint(A,I){let g=AA.intoRaw(A),C=eQ.fromRaw(this.colliderSet.raw.coProjectPoint(this.handle,g,I));return g.free(),C}intersectsRay(A,I){let g=AA.intoRaw(A.origin),C=AA.intoRaw(A.dir),B=this.colliderSet.raw.coIntersectsRay(this.handle,g,C,I);return g.free(),C.free(),B}castShape(A,I,g,C,B,E,Q){let o=AA.intoRaw(A),t=AA.intoRaw(g),e=nI.intoRaw(C),a=AA.intoRaw(B),s=I.intoRaw(),D=SB.fromRaw(this.colliderSet,this.colliderSet.raw.coCastShape(this.handle,o,s,t,e,a,E,Q));return o.free(),t.free(),e.free(),a.free(),s.free(),D}castCollider(A,I,g,C,B){let E=AA.intoRaw(A),Q=AA.intoRaw(g),o=sQ.fromRaw(this.colliderSet,this.colliderSet.raw.coCastCollider(this.handle,E,I.handle,Q,C,B));return E.free(),Q.free(),o}intersectsShape(A,I,g){let C=AA.intoRaw(I),B=nI.intoRaw(g),E=A.intoRaw(),Q=this.colliderSet.raw.coIntersectsShape(this.handle,E,C,B);return C.free(),B.free(),E.free(),Q}contactShape(A,I,g,C){let B=AA.intoRaw(I),E=nI.intoRaw(g),Q=A.intoRaw(),o=sB.fromRaw(this.colliderSet.raw.coContactShape(this.handle,Q,B,E,C));return B.free(),E.free(),Q.free(),o}contactCollider(A,I){return sB.fromRaw(this.colliderSet.raw.coContactCollider(this.handle,A.handle,I))}castRay(A,I,g){let C=AA.intoRaw(A.origin),B=AA.intoRaw(A.dir),E=this.colliderSet.raw.coCastRay(this.handle,C,B,I,g);return C.free(),B.free(),E}castRayAndGetNormal(A,I,g){let C=AA.intoRaw(A.origin),B=AA.intoRaw(A.dir),E=aQ.fromRaw(this.colliderSet.raw.coCastRayAndGetNormal(this.handle,C,B,I,g));return C.free(),B.free(),E}}(function(i){i[i.Density=0]="Density",i[i.Mass=1]="Mass",i[i.MassProps=2]="MassProps"})(wC||(wC={}));class uI{constructor(A){this.shape=A,this.massPropsMode=wC.Density,this.density=1,this.friction=.5,this.restitution=0,this.rotation=nI.identity(),this.translation=AA.zeros(),this.isSensor=!1,this.collisionGroups=4294967295,this.solverGroups=4294967295,this.frictionCombineRule=IQ.Average,this.restitutionCombineRule=IQ.Average,this.activeCollisionTypes=GE.DEFAULT,this.activeEvents=0,this.activeHooks=0,this.mass=0,this.centerOfMass=AA.zeros(),this.contactForceEventThreshold=0,this.principalAngularInertia=0,this.rotationsEnabled=!0}static ball(A){const I=new Do(A);return new uI(I)}static capsule(A,I){const g=new wo(A,I);return new uI(g)}static segment(A,I){const g=new Go(A,I);return new uI(g)}static triangle(A,I,g){const C=new lo(A,I,g);return new uI(C)}static roundTriangle(A,I,g,C){const B=new So(A,I,g,C);return new uI(B)}static polyline(A,I){const g=new yo(A,I);return new uI(g)}static trimesh(A,I){const g=new ko(A,I);return new uI(g)}static cuboid(A,I){const g=new ho(A,I);return new uI(g)}static roundCuboid(A,I,g){const C=new co(A,I,g);return new uI(C)}static halfspace(A){const I=new ro(A);return new uI(I)}static heightfield(A,I){const g=new Mo(A,I);return new uI(g)}static convexHull(A){const I=new SE(A,!1);return new uI(I)}static convexPolyline(A){const I=new SE(A,!0);return new uI(I)}static roundConvexHull(A,I){const g=new yE(A,I,!1);return new uI(g)}static roundConvexPolyline(A,I){const g=new yE(A,I,!0);return new uI(g)}setTranslation(A,I){if(typeof A!="number"||typeof I!="number")throw TypeError("The translation components must be numbers.");return this.translation={x:A,y:I},this}setRotation(A){return this.rotation=A,this}setSensor(A){return this.isSensor=A,this}setDensity(A){return this.massPropsMode=wC.Density,this.density=A,this}setMass(A){return this.massPropsMode=wC.Mass,this.mass=A,this}setMassProperties(A,I,g){return this.massPropsMode=wC.MassProps,this.mass=A,AA.copy(this.centerOfMass,I),this.principalAngularInertia=g,this}setRestitution(A){return this.restitution=A,this}setFriction(A){return this.friction=A,this}setFrictionCombineRule(A){return this.frictionCombineRule=A,this}setRestitutionCombineRule(A){return this.restitutionCombineRule=A,this}setCollisionGroups(A){return this.collisionGroups=A,this}setSolverGroups(A){return this.solverGroups=A,this}setActiveHooks(A){return this.activeHooks=A,this}setActiveEvents(A){return this.activeEvents=A,this}setActiveCollisionTypes(A){return this.activeCollisionTypes=A,this}setContactForceEventThreshold(A){return this.contactForceEventThreshold=A,this}}class Aa{constructor(A){this.raw=A||new yI,this.map=new pE,A&&A.forEachColliderHandle(I=>{this.map.set(I,new Oi(this,I,null))})}free(){this.raw.free(),this.raw=void 0,this.map.clear(),this.map=void 0}castClosure(A){return I=>A?A(this.get(I)):void 0}finalizeDeserialization(A){this.map.forEach(I=>I.finalizeDeserialization(A))}createCollider(A,I,g){let C=g!=null&&g!=null;if(C&&isNaN(g))throw Error("Cannot create a collider with a parent rigid-body handle that is not a number.");let B=I.shape.intoRaw(),E=AA.intoRaw(I.translation),Q=nI.intoRaw(I.rotation),o=AA.intoRaw(I.centerOfMass),t=this.raw.createCollider(B,E,Q,I.massPropsMode,I.mass,o,I.principalAngularInertia,I.density,I.friction,I.restitution,I.frictionCombineRule,I.restitutionCombineRule,I.isSensor,I.collisionGroups,I.solverGroups,I.activeCollisionTypes,I.activeHooks,I.activeEvents,I.contactForceEventThreshold,C,C?g:0,A.raw);B.free(),E.free(),Q.free(),o.free();let e=C?A.get(g):null,a=new Oi(this,t,e,I.shape);return this.map.set(t,a),a}remove(A,I,g,C){this.raw.remove(A,I.raw,g.raw,C),this.unmap(A)}unmap(A){this.map.delete(A)}get(A){return this.map.get(A)}len(){return this.map.len()}contains(A){return this.get(A)!=null}forEach(A){this.map.forEach(A)}getAll(){return this.map.getAll()}}class Ia{constructor(A){this.raw=A||new hE}free(){this.raw.free(),this.raw=void 0}step(A,I,g,C,B,E,Q,o,t,e,a,s){let D=AA.intoRaw(A);a?this.raw.stepWithEvents(D,I.raw,g.raw,C.raw,B.raw,E.raw,Q.raw,o.raw,t.raw,e.raw,a.raw,s,s?s.filterContactPair:null,s?s.filterIntersectionPair:null):this.raw.step(D,I.raw,g.raw,C.raw,B.raw,E.raw,Q.raw,o.raw,t.raw,e.raw),D.free()}}(function(i){i[i.EXCLUDE_FIXED=1]="EXCLUDE_FIXED",i[i.EXCLUDE_KINEMATIC=2]="EXCLUDE_KINEMATIC",i[i.EXCLUDE_DYNAMIC=4]="EXCLUDE_DYNAMIC",i[i.EXCLUDE_SENSORS=8]="EXCLUDE_SENSORS",i[i.EXCLUDE_SOLIDS=16]="EXCLUDE_SOLIDS",i[i.ONLY_DYNAMIC=3]="ONLY_DYNAMIC",i[i.ONLY_KINEMATIC=5]="ONLY_KINEMATIC",i[i.ONLY_FIXED=6]="ONLY_FIXED"})(Ti||(Ti={}));class ga{constructor(A){this.raw=A||new $B}free(){this.raw.free(),this.raw=void 0}update(A,I,g){this.raw.update(A.raw,I.raw,g.raw)}castRay(A,I,g,C,B,E,Q,o,t,e){let a=AA.intoRaw(g.origin),s=AA.intoRaw(g.dir),D=fE.fromRaw(I,this.raw.castRay(A.raw,I.raw,a,s,C,B,E,Q,o,t,e));return a.free(),s.free(),D}castRayAndGetNormal(A,I,g,C,B,E,Q,o,t,e){let a=AA.intoRaw(g.origin),s=AA.intoRaw(g.dir),D=CQ.fromRaw(I,this.raw.castRayAndGetNormal(A.raw,I.raw,a,s,C,B,E,Q,o,t,e));return a.free(),s.free(),D}intersectionsWithRay(A,I,g,C,B,E,Q,o,t,e,a){let s=AA.intoRaw(g.origin),D=AA.intoRaw(g.dir);this.raw.intersectionsWithRay(A.raw,I.raw,s,D,C,B,c=>E(CQ.fromRaw(I,c)),Q,o,t,e,a),s.free(),D.free()}intersectionWithShape(A,I,g,C,B,E,Q,o,t,e){let a=AA.intoRaw(g),s=nI.intoRaw(C),D=B.intoRaw(),c=this.raw.intersectionWithShape(A.raw,I.raw,a,s,D,E,Q,o,t,e);return a.free(),s.free(),D.free(),c}projectPoint(A,I,g,C,B,E,Q,o,t){let e=AA.intoRaw(g),a=gQ.fromRaw(I,this.raw.projectPoint(A.raw,I.raw,e,C,B,E,Q,o,t));return e.free(),a}projectPointAndGetFeature(A,I,g,C,B,E,Q,o){let t=AA.intoRaw(g),e=gQ.fromRaw(I,this.raw.projectPointAndGetFeature(A.raw,I.raw,t,C,B,E,Q,o));return t.free(),e}intersectionsWithPoint(A,I,g,C,B,E,Q,o,t){let e=AA.intoRaw(g);this.raw.intersectionsWithPoint(A.raw,I.raw,e,C,B,E,Q,o,t),e.free()}castShape(A,I,g,C,B,E,Q,o,t,e,a,s,D){let c=AA.intoRaw(g),r=nI.intoRaw(C),n=AA.intoRaw(B),l=E.intoRaw(),G=sQ.fromRaw(I,this.raw.castShape(A.raw,I.raw,c,r,n,l,Q,o,t,e,a,s,D));return c.free(),r.free(),n.free(),l.free(),G}intersectionsWithShape(A,I,g,C,B,E,Q,o,t,e,a){let s=AA.intoRaw(g),D=nI.intoRaw(C),c=B.intoRaw();this.raw.intersectionsWithShape(A.raw,I.raw,s,D,c,E,Q,o,t,e,a),s.free(),D.free(),c.free()}collidersWithAabbIntersectingAabb(A,I,g){let C=AA.intoRaw(A),B=AA.intoRaw(I);this.raw.collidersWithAabbIntersectingAabb(C,B,g),C.free(),B.free()}}class _i{constructor(A){this.raw=A||new wE}free(){this.raw.free(),this.raw=void 0}serializeAll(A,I,g,C,B,E,Q,o,t){let e=AA.intoRaw(A);const a=this.raw.serializeAll(e,I.raw,g.raw,C.raw,B.raw,E.raw,Q.raw,o.raw,t.raw);return e.free(),a}deserializeAll(A){return nQ.fromRaw(this.raw.deserializeAll(A))}}class Ca{constructor(A,I){this.vertices=A,this.colors=I}}class Ba{constructor(A){this.raw=A||new DE}free(){this.raw.free(),this.raw=void 0,this.vertices=void 0,this.colors=void 0}render(A,I,g,C,B){this.raw.render(A.raw,I.raw,g.raw,C.raw,B.raw),this.vertices=this.raw.vertices(),this.colors=this.raw.colors()}}class Qa{}class Ea{constructor(A,I,g,C,B){this.params=I,this.bodies=g,this.colliders=C,this.queries=B,this.raw=new rE(A),this.rawCharacterCollision=new XB,this._applyImpulsesToDynamicBodies=!1,this._characterMass=null}free(){this.raw&&(this.raw.free(),this.rawCharacterCollision.free()),this.raw=void 0,this.rawCharacterCollision=void 0}up(){return this.raw.up()}setUp(A){let I=AA.intoRaw(A);return this.raw.setUp(I)}applyImpulsesToDynamicBodies(){return this._applyImpulsesToDynamicBodies}setApplyImpulsesToDynamicBodies(A){this._applyImpulsesToDynamicBodies=A}characterMass(){return this._characterMass}setCharacterMass(A){this._characterMass=A}offset(){return this.raw.offset()}setOffset(A){this.raw.setOffset(A)}slideEnabled(){return this.raw.slideEnabled()}setSlideEnabled(A){this.raw.setSlideEnabled(A)}autostepMaxHeight(){return this.raw.autostepMaxHeight()}autostepMinWidth(){return this.raw.autostepMinWidth()}autostepIncludesDynamicBodies(){return this.raw.autostepIncludesDynamicBodies()}autostepEnabled(){return this.raw.autostepEnabled()}enableAutostep(A,I,g){this.raw.enableAutostep(A,I,g)}disableAutostep(){return this.raw.disableAutostep()}maxSlopeClimbAngle(){return this.raw.maxSlopeClimbAngle()}setMaxSlopeClimbAngle(A){this.raw.setMaxSlopeClimbAngle(A)}minSlopeSlideAngle(){return this.raw.minSlopeSlideAngle()}setMinSlopeSlideAngle(A){this.raw.setMinSlopeSlideAngle(A)}snapToGroundDistance(){return this.raw.snapToGroundDistance()}enableSnapToGround(A){this.raw.enableSnapToGround(A)}disableSnapToGround(){this.raw.disableSnapToGround()}snapToGroundEnabled(){return this.raw.snapToGroundEnabled()}computeColliderMovement(A,I,g,C,B){let E=AA.intoRaw(I);this.raw.computeColliderMovement(this.params.dt,this.bodies.raw,this.colliders.raw,this.queries.raw,A.handle,E,this._applyImpulsesToDynamicBodies,this._characterMass,g,C,this.colliders.castClosure(B)),E.free()}computedMovement(){return AA.fromRaw(this.raw.computedMovement())}computedGrounded(){return this.raw.computedGrounded()}numComputedCollisions(){return this.raw.numComputedCollisions()}computedCollision(A,I){if(!this.raw.computedCollision(A,this.rawCharacterCollision))return null;{let g=this.rawCharacterCollision;(I=I??new Qa).translationApplied=AA.fromRaw(g.translationApplied()),I.translationRemaining=AA.fromRaw(g.translationRemaining()),I.toi=g.toi(),I.witness1=AA.fromRaw(g.worldWitness1()),I.witness2=AA.fromRaw(g.worldWitness2()),I.normal1=AA.fromRaw(g.worldNormal1()),I.normal2=AA.fromRaw(g.worldNormal2())}}}class nQ{constructor(A,I,g,C,B,E,Q,o,t,e,a,s,D,c){this.gravity=A,this.integrationParameters=new xe(I),this.islands=new je(g),this.broadPhase=new Xe(C),this.narrowPhase=new ze(B),this.bodies=new me(E),this.colliders=new Aa(Q),this.impulseJoints=new We(o),this.multibodyJoints=new Ze(t),this.ccdSolver=new Ve(e),this.queryPipeline=new ga(a),this.physicsPipeline=new Ia(s),this.serializationPipeline=new _i(D),this.debugRenderPipeline=new Ba(c),this.characterControllers=new Set,this.impulseJoints.finalizeDeserialization(this.bodies),this.bodies.finalizeDeserialization(this.colliders),this.colliders.finalizeDeserialization(this.bodies)}free(){this.integrationParameters.free(),this.islands.free(),this.broadPhase.free(),this.narrowPhase.free(),this.bodies.free(),this.colliders.free(),this.impulseJoints.free(),this.multibodyJoints.free(),this.ccdSolver.free(),this.queryPipeline.free(),this.physicsPipeline.free(),this.serializationPipeline.free(),this.debugRenderPipeline.free(),this.characterControllers.forEach(A=>A.free()),this.integrationParameters=void 0,this.islands=void 0,this.broadPhase=void 0,this.narrowPhase=void 0,this.bodies=void 0,this.colliders=void 0,this.ccdSolver=void 0,this.impulseJoints=void 0,this.multibodyJoints=void 0,this.queryPipeline=void 0,this.physicsPipeline=void 0,this.serializationPipeline=void 0,this.debugRenderPipeline=void 0,this.characterControllers=void 0}static fromRaw(A){return A?new nQ(AA.fromRaw(A.takeGravity()),A.takeIntegrationParameters(),A.takeIslandManager(),A.takeBroadPhase(),A.takeNarrowPhase(),A.takeBodies(),A.takeColliders(),A.takeImpulseJoints(),A.takeMultibodyJoints()):null}takeSnapshot(){return this.serializationPipeline.serializeAll(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints)}static restoreSnapshot(A){return new _i().deserializeAll(A)}debugRender(){return this.debugRenderPipeline.render(this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints,this.narrowPhase),new Ca(this.debugRenderPipeline.vertices,this.debugRenderPipeline.colors)}step(A,I){this.physicsPipeline.step(this.gravity,this.integrationParameters,this.islands,this.broadPhase,this.narrowPhase,this.bodies,this.colliders,this.impulseJoints,this.multibodyJoints,this.ccdSolver,A,I),this.queryPipeline.update(this.islands,this.bodies,this.colliders)}get timestep(){return this.integrationParameters.dt}set timestep(A){this.integrationParameters.dt=A}get maxVelocityIterations(){return this.integrationParameters.maxVelocityIterations}set maxVelocityIterations(A){this.integrationParameters.maxVelocityIterations=A}get maxVelocityFrictionIterations(){return this.integrationParameters.maxVelocityFrictionIterations}set maxVelocityFrictionIterations(A){this.integrationParameters.maxVelocityFrictionIterations=A}get maxStabilizationIterations(){return this.integrationParameters.maxStabilizationIterations}set maxStabilizationIterations(A){this.integrationParameters.maxStabilizationIterations=A}createRigidBody(A){return this.bodies.createRigidBody(this.colliders,A)}createCharacterController(A){let I=new Ea(A,this.integrationParameters,this.bodies,this.colliders,this.queryPipeline);return this.characterControllers.add(I),I}removeCharacterController(A){this.characterControllers.delete(A),A.free()}createCollider(A,I){let g=I?I.handle:void 0;return this.colliders.createCollider(this.bodies,A,g)}createImpulseJoint(A,I,g,C){return this.impulseJoints.createJoint(this.bodies,A,I.handle,g.handle,C)}createMultibodyJoint(A,I,g,C){return this.multibodyJoints.createJoint(A,I.handle,g.handle,C)}getRigidBody(A){return this.bodies.get(A)}getCollider(A){return this.colliders.get(A)}getImpulseJoint(A){return this.impulseJoints.get(A)}getMultibodyJoint(A){return this.multibodyJoints.get(A)}removeRigidBody(A){this.bodies&&this.bodies.remove(A.handle,this.islands,this.colliders,this.impulseJoints,this.multibodyJoints)}removeCollider(A,I){this.colliders&&this.colliders.remove(A.handle,this.islands,this.bodies,I)}removeImpulseJoint(A,I){this.impulseJoints&&this.impulseJoints.remove(A.handle,I)}removeMultibodyJoint(A,I){this.impulseJoints&&this.multibodyJoints.remove(A.handle,I)}forEachCollider(A){this.colliders.forEach(A)}forEachRigidBody(A){this.bodies.forEach(A)}forEachActiveRigidBody(A){this.bodies.forEachActiveRigidBody(this.islands,A)}castRay(A,I,g,C,B,E,Q,o){return this.queryPipeline.castRay(this.bodies,this.colliders,A,I,g,C,B,E?E.handle:null,Q?Q.handle:null,this.colliders.castClosure(o))}castRayAndGetNormal(A,I,g,C,B,E,Q,o){return this.queryPipeline.castRayAndGetNormal(this.bodies,this.colliders,A,I,g,C,B,E?E.handle:null,Q?Q.handle:null,this.colliders.castClosure(o))}intersectionsWithRay(A,I,g,C,B,E,Q,o,t){this.queryPipeline.intersectionsWithRay(this.bodies,this.colliders,A,I,g,C,B,E,Q?Q.handle:null,o?o.handle:null,this.colliders.castClosure(t))}intersectionWithShape(A,I,g,C,B,E,Q,o){let t=this.queryPipeline.intersectionWithShape(this.bodies,this.colliders,A,I,g,C,B,E?E.handle:null,Q?Q.handle:null,this.colliders.castClosure(o));return t!=null?this.colliders.get(t):null}projectPoint(A,I,g,C,B,E,Q){return this.queryPipeline.projectPoint(this.bodies,this.colliders,A,I,g,C,B?B.handle:null,E?E.handle:null,this.colliders.castClosure(Q))}projectPointAndGetFeature(A,I,g,C,B,E){return this.queryPipeline.projectPointAndGetFeature(this.bodies,this.colliders,A,I,g,C?C.handle:null,B?B.handle:null,this.colliders.castClosure(E))}intersectionsWithPoint(A,I,g,C,B,E,Q){this.queryPipeline.intersectionsWithPoint(this.bodies,this.colliders,A,this.colliders.castClosure(I),g,C,B?B.handle:null,E?E.handle:null,this.colliders.castClosure(Q))}castShape(A,I,g,C,B,E,Q,o,t,e,a){return this.queryPipeline.castShape(this.bodies,this.colliders,A,I,g,C,B,E,Q,o,t?t.handle:null,e?e.handle:null,this.colliders.castClosure(a))}intersectionsWithShape(A,I,g,C,B,E,Q,o,t){this.queryPipeline.intersectionsWithShape(this.bodies,this.colliders,A,I,g,this.colliders.castClosure(C),B,E,Q?Q.handle:null,o?o.handle:null,this.colliders.castClosure(t))}collidersWithAabbIntersectingAabb(A,I,g){this.queryPipeline.collidersWithAabbIntersectingAabb(A,I,this.colliders.castClosure(g))}contactsWith(A,I){this.narrowPhase.contactsWith(A.handle,this.colliders.castClosure(I))}intersectionsWith(A,I){this.narrowPhase.intersectionsWith(A.handle,this.colliders.castClosure(I))}contactPair(A,I,g){this.narrowPhase.contactPair(A.handle,I.handle,g)}intersectionPair(A,I){return this.narrowPhase.intersectionPair(A.handle,I.handle)}}(function(i){i[i.COLLISION_EVENTS=1]="COLLISION_EVENTS",i[i.CONTACT_FORCE_EVENTS=2]="CONTACT_FORCE_EVENTS"})(lE||(lE={}));class ia{free(){this.raw.free(),this.raw=void 0}collider1(){return this.raw.collider1()}collider2(){return this.raw.collider2()}totalForce(){return AA.fromRaw(this.raw.total_force())}totalForceMagnitude(){return this.raw.total_force_magnitude()}maxForceDirection(){return AA.fromRaw(this.raw.max_force_direction())}maxForceMagnitude(){return this.raw.max_force_magnitude()}}class Qs{constructor(A,I){this.raw=I||new zB(A)}free(){this.raw.free(),this.raw=void 0}drainCollisionEvents(A){this.raw.drainCollisionEvents(A)}drainContactForceEvents(A){let I=new ia;this.raw.drainContactForceEvents(g=>{I.raw=g,A(I),I.free()})}clear(){this.raw.clear()}}/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Fo="148",Ds=0,Ct=1,rs=2,oa=1,hs=2,_B=3,oC=0,ig=1,DQ=2,qQ=3,BC=0,iB=1,Bt=2,Qt=3,Et=4,cs=5,BB=100,ws=101,Gs=102,it=103,ot=104,ls=200,Ss=201,ys=202,ks=203,ta=204,ea=205,Ms=206,Fs=207,Rs=208,Ns=209,Ks=210,ds=0,Us=1,Js=2,Pi=3,ps=4,fs=5,qs=6,us=7,Ro=0,Ls=1,Ys=2,Wg=0,Hs=1,ms=2,xs=3,Ts=4,bs=5,aa=300,nB=301,DB=302,Zi=303,Vi=304,qE=306,BQ=1e3,kg=1001,ji=1002,mI=1003,tt=1004,Ii=1005,zI=1006,vs=1007,QQ=1008,KC=1009,Ws=1010,Os=1011,sa=1012,_s=1013,GC=1014,lC=1015,EQ=1016,Ps=1017,Zs=1018,oB=1020,Vs=1021,js=1022,Mg=1023,Xs=1024,zs=1025,kC=1026,rB=1027,$s=1028,An=1029,In=1030,gn=1031,Cn=1033,gi=33776,Ci=33777,Bi=33778,Qi=33779,et=35840,at=35841,st=35842,nt=35843,Bn=36196,Dt=37492,rt=37496,ht=37808,ct=37809,wt=37810,Gt=37811,lt=37812,St=37813,yt=37814,kt=37815,Mt=37816,Ft=37817,Rt=37818,Nt=37819,Kt=37820,dt=37821,Ut=36492,dC=3e3,hI=3001,Qn=3200,na=3201,Da=0,En=1,Ug="srgb",iQ="srgb-linear",Ei=7680,on=519,Jt=35044,pt="300 es",Xi=1035;class yB{addEventListener(A,I){this._listeners===void 0&&(this._listeners={});const g=this._listeners;g[A]===void 0&&(g[A]=[]),g[A].indexOf(I)===-1&&g[A].push(I)}hasEventListener(A,I){if(this._listeners===void 0)return!1;const g=this._listeners;return g[A]!==void 0&&g[A].indexOf(I)!==-1}removeEventListener(A,I){if(this._listeners===void 0)return;const C=this._listeners[A];if(C!==void 0){const B=C.indexOf(I);B!==-1&&C.splice(B,1)}}dispatchEvent(A){if(this._listeners===void 0)return;const g=this._listeners[A.type];if(g!==void 0){A.target=this;const C=g.slice(0);for(let B=0,E=C.length;B<E;B++)C[B].call(this,A);A.target=null}}}const bI=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ii=Math.PI/180,ft=180/Math.PI;function rQ(){const i=Math.random()*4294967295|0,A=Math.random()*4294967295|0,I=Math.random()*4294967295|0,g=Math.random()*4294967295|0;return(bI[i&255]+bI[i>>8&255]+bI[i>>16&255]+bI[i>>24&255]+"-"+bI[A&255]+bI[A>>8&255]+"-"+bI[A>>16&15|64]+bI[A>>24&255]+"-"+bI[I&63|128]+bI[I>>8&255]+"-"+bI[I>>16&255]+bI[I>>24&255]+bI[g&255]+bI[g>>8&255]+bI[g>>16&255]+bI[g>>24&255]).toLowerCase()}function Eg(i,A,I){return Math.max(A,Math.min(I,i))}function tn(i,A){return(i%A+A)%A}function oi(i,A,I){return(1-I)*i+I*A}function qt(i){return(i&i-1)===0&&i!==0}function zi(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function uQ(i,A){switch(A.constructor){case Float32Array:return i;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Cg(i,A){switch(A.constructor){case Float32Array:return i;case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class AI{constructor(A=0,I=0){AI.prototype.isVector2=!0,this.x=A,this.y=I}get width(){return this.x}set width(A){this.x=A}get height(){return this.y}set height(A){this.y=A}set(A,I){return this.x=A,this.y=I,this}setScalar(A){return this.x=A,this.y=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setComponent(A,I){switch(A){case 0:this.x=I;break;case 1:this.y=I;break;default:throw new Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y)}copy(A){return this.x=A.x,this.y=A.y,this}add(A){return this.x+=A.x,this.y+=A.y,this}addScalar(A){return this.x+=A,this.y+=A,this}addVectors(A,I){return this.x=A.x+I.x,this.y=A.y+I.y,this}addScaledVector(A,I){return this.x+=A.x*I,this.y+=A.y*I,this}sub(A){return this.x-=A.x,this.y-=A.y,this}subScalar(A){return this.x-=A,this.y-=A,this}subVectors(A,I){return this.x=A.x-I.x,this.y=A.y-I.y,this}multiply(A){return this.x*=A.x,this.y*=A.y,this}multiplyScalar(A){return this.x*=A,this.y*=A,this}divide(A){return this.x/=A.x,this.y/=A.y,this}divideScalar(A){return this.multiplyScalar(1/A)}applyMatrix3(A){const I=this.x,g=this.y,C=A.elements;return this.x=C[0]*I+C[3]*g+C[6],this.y=C[1]*I+C[4]*g+C[7],this}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this}clamp(A,I){return this.x=Math.max(A.x,Math.min(I.x,this.x)),this.y=Math.max(A.y,Math.min(I.y,this.y)),this}clampScalar(A,I){return this.x=Math.max(A,Math.min(I,this.x)),this.y=Math.max(A,Math.min(I,this.y)),this}clampLength(A,I){const g=this.length();return this.divideScalar(g||1).multiplyScalar(Math.max(A,Math.min(I,g)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(A){return this.x*A.x+this.y*A.y}cross(A){return this.x*A.y-this.y*A.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(A){return Math.sqrt(this.distanceToSquared(A))}distanceToSquared(A){const I=this.x-A.x,g=this.y-A.y;return I*I+g*g}manhattanDistanceTo(A){return Math.abs(this.x-A.x)+Math.abs(this.y-A.y)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,I){return this.x+=(A.x-this.x)*I,this.y+=(A.y-this.y)*I,this}lerpVectors(A,I,g){return this.x=A.x+(I.x-A.x)*g,this.y=A.y+(I.y-A.y)*g,this}equals(A){return A.x===this.x&&A.y===this.y}fromArray(A,I=0){return this.x=A[I],this.y=A[I+1],this}toArray(A=[],I=0){return A[I]=this.x,A[I+1]=this.y,A}fromBufferAttribute(A,I){return this.x=A.getX(I),this.y=A.getY(I),this}rotateAround(A,I){const g=Math.cos(I),C=Math.sin(I),B=this.x-A.x,E=this.y-A.y;return this.x=B*g-E*C+A.x,this.y=B*C+E*g+A.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $I{constructor(){$I.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(A,I,g,C,B,E,Q,o,t){const e=this.elements;return e[0]=A,e[1]=C,e[2]=Q,e[3]=I,e[4]=B,e[5]=o,e[6]=g,e[7]=E,e[8]=t,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(A){const I=this.elements,g=A.elements;return I[0]=g[0],I[1]=g[1],I[2]=g[2],I[3]=g[3],I[4]=g[4],I[5]=g[5],I[6]=g[6],I[7]=g[7],I[8]=g[8],this}extractBasis(A,I,g){return A.setFromMatrix3Column(this,0),I.setFromMatrix3Column(this,1),g.setFromMatrix3Column(this,2),this}setFromMatrix4(A){const I=A.elements;return this.set(I[0],I[4],I[8],I[1],I[5],I[9],I[2],I[6],I[10]),this}multiply(A){return this.multiplyMatrices(this,A)}premultiply(A){return this.multiplyMatrices(A,this)}multiplyMatrices(A,I){const g=A.elements,C=I.elements,B=this.elements,E=g[0],Q=g[3],o=g[6],t=g[1],e=g[4],a=g[7],s=g[2],D=g[5],c=g[8],r=C[0],n=C[3],l=C[6],G=C[1],S=C[4],k=C[7],M=C[2],K=C[5],U=C[8];return B[0]=E*r+Q*G+o*M,B[3]=E*n+Q*S+o*K,B[6]=E*l+Q*k+o*U,B[1]=t*r+e*G+a*M,B[4]=t*n+e*S+a*K,B[7]=t*l+e*k+a*U,B[2]=s*r+D*G+c*M,B[5]=s*n+D*S+c*K,B[8]=s*l+D*k+c*U,this}multiplyScalar(A){const I=this.elements;return I[0]*=A,I[3]*=A,I[6]*=A,I[1]*=A,I[4]*=A,I[7]*=A,I[2]*=A,I[5]*=A,I[8]*=A,this}determinant(){const A=this.elements,I=A[0],g=A[1],C=A[2],B=A[3],E=A[4],Q=A[5],o=A[6],t=A[7],e=A[8];return I*E*e-I*Q*t-g*B*e+g*Q*o+C*B*t-C*E*o}invert(){const A=this.elements,I=A[0],g=A[1],C=A[2],B=A[3],E=A[4],Q=A[5],o=A[6],t=A[7],e=A[8],a=e*E-Q*t,s=Q*o-e*B,D=t*B-E*o,c=I*a+g*s+C*D;if(c===0)return this.set(0,0,0,0,0,0,0,0,0);const r=1/c;return A[0]=a*r,A[1]=(C*t-e*g)*r,A[2]=(Q*g-C*E)*r,A[3]=s*r,A[4]=(e*I-C*o)*r,A[5]=(C*B-Q*I)*r,A[6]=D*r,A[7]=(g*o-t*I)*r,A[8]=(E*I-g*B)*r,this}transpose(){let A;const I=this.elements;return A=I[1],I[1]=I[3],I[3]=A,A=I[2],I[2]=I[6],I[6]=A,A=I[5],I[5]=I[7],I[7]=A,this}getNormalMatrix(A){return this.setFromMatrix4(A).invert().transpose()}transposeIntoArray(A){const I=this.elements;return A[0]=I[0],A[1]=I[3],A[2]=I[6],A[3]=I[1],A[4]=I[4],A[5]=I[7],A[6]=I[2],A[7]=I[5],A[8]=I[8],this}setUvTransform(A,I,g,C,B,E,Q){const o=Math.cos(B),t=Math.sin(B);return this.set(g*o,g*t,-g*(o*E+t*Q)+E+A,-C*t,C*o,-C*(-t*E+o*Q)+Q+I,0,0,1),this}scale(A,I){return this.premultiply(ti.makeScale(A,I)),this}rotate(A){return this.premultiply(ti.makeRotation(-A)),this}translate(A,I){return this.premultiply(ti.makeTranslation(A,I)),this}makeTranslation(A,I){return this.set(1,0,A,0,1,I,0,0,1),this}makeRotation(A){const I=Math.cos(A),g=Math.sin(A);return this.set(I,-g,0,g,I,0,0,0,1),this}makeScale(A,I){return this.set(A,0,0,0,I,0,0,0,1),this}equals(A){const I=this.elements,g=A.elements;for(let C=0;C<9;C++)if(I[C]!==g[C])return!1;return!0}fromArray(A,I=0){for(let g=0;g<9;g++)this.elements[g]=A[g+I];return this}toArray(A=[],I=0){const g=this.elements;return A[I]=g[0],A[I+1]=g[1],A[I+2]=g[2],A[I+3]=g[3],A[I+4]=g[4],A[I+5]=g[5],A[I+6]=g[6],A[I+7]=g[7],A[I+8]=g[8],A}clone(){return new this.constructor().fromArray(this.elements)}}const ti=new $I;function ra(i){for(let A=i.length-1;A>=0;--A)if(i[A]>=65535)return!0;return!1}function kE(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function MC(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function oE(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ei={[Ug]:{[iQ]:MC},[iQ]:{[Ug]:oE}},WI={legacyMode:!0,get workingColorSpace(){return iQ},set workingColorSpace(i){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(i,A,I){if(this.legacyMode||A===I||!A||!I)return i;if(ei[A]&&ei[A][I]!==void 0){const g=ei[A][I];return i.r=g(i.r),i.g=g(i.g),i.b=g(i.b),i}throw new Error("Unsupported color space conversion.")},fromWorkingColorSpace:function(i,A){return this.convert(i,this.workingColorSpace,A)},toWorkingColorSpace:function(i,A){return this.convert(i,A,this.workingColorSpace)}},ha={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},dI={r:0,g:0,b:0},cg={h:0,s:0,l:0},LQ={h:0,s:0,l:0};function ai(i,A,I){return I<0&&(I+=1),I>1&&(I-=1),I<1/6?i+(A-i)*6*I:I<1/2?A:I<2/3?i+(A-i)*6*(2/3-I):i}function YQ(i,A){return A.r=i.r,A.g=i.g,A.b=i.b,A}class $A{constructor(A,I,g){return this.isColor=!0,this.r=1,this.g=1,this.b=1,I===void 0&&g===void 0?this.set(A):this.setRGB(A,I,g)}set(A){return A&&A.isColor?this.copy(A):typeof A=="number"?this.setHex(A):typeof A=="string"&&this.setStyle(A),this}setScalar(A){return this.r=A,this.g=A,this.b=A,this}setHex(A,I=Ug){return A=Math.floor(A),this.r=(A>>16&255)/255,this.g=(A>>8&255)/255,this.b=(A&255)/255,WI.toWorkingColorSpace(this,I),this}setRGB(A,I,g,C=WI.workingColorSpace){return this.r=A,this.g=I,this.b=g,WI.toWorkingColorSpace(this,C),this}setHSL(A,I,g,C=WI.workingColorSpace){if(A=tn(A,1),I=Eg(I,0,1),g=Eg(g,0,1),I===0)this.r=this.g=this.b=g;else{const B=g<=.5?g*(1+I):g+I-g*I,E=2*g-B;this.r=ai(E,B,A+1/3),this.g=ai(E,B,A),this.b=ai(E,B,A-1/3)}return WI.toWorkingColorSpace(this,C),this}setStyle(A,I=Ug){function g(B){B!==void 0&&parseFloat(B)<1&&console.warn("THREE.Color: Alpha component of "+A+" will be ignored.")}let C;if(C=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(A)){let B;const E=C[1],Q=C[2];switch(E){case"rgb":case"rgba":if(B=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Q))return this.r=Math.min(255,parseInt(B[1],10))/255,this.g=Math.min(255,parseInt(B[2],10))/255,this.b=Math.min(255,parseInt(B[3],10))/255,WI.toWorkingColorSpace(this,I),g(B[4]),this;if(B=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Q))return this.r=Math.min(100,parseInt(B[1],10))/100,this.g=Math.min(100,parseInt(B[2],10))/100,this.b=Math.min(100,parseInt(B[3],10))/100,WI.toWorkingColorSpace(this,I),g(B[4]),this;break;case"hsl":case"hsla":if(B=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(Q)){const o=parseFloat(B[1])/360,t=parseFloat(B[2])/100,e=parseFloat(B[3])/100;return g(B[4]),this.setHSL(o,t,e,I)}break}}else if(C=/^\#([A-Fa-f\d]+)$/.exec(A)){const B=C[1],E=B.length;if(E===3)return this.r=parseInt(B.charAt(0)+B.charAt(0),16)/255,this.g=parseInt(B.charAt(1)+B.charAt(1),16)/255,this.b=parseInt(B.charAt(2)+B.charAt(2),16)/255,WI.toWorkingColorSpace(this,I),this;if(E===6)return this.r=parseInt(B.charAt(0)+B.charAt(1),16)/255,this.g=parseInt(B.charAt(2)+B.charAt(3),16)/255,this.b=parseInt(B.charAt(4)+B.charAt(5),16)/255,WI.toWorkingColorSpace(this,I),this}return A&&A.length>0?this.setColorName(A,I):this}setColorName(A,I=Ug){const g=ha[A.toLowerCase()];return g!==void 0?this.setHex(g,I):console.warn("THREE.Color: Unknown color "+A),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(A){return this.r=A.r,this.g=A.g,this.b=A.b,this}copySRGBToLinear(A){return this.r=MC(A.r),this.g=MC(A.g),this.b=MC(A.b),this}copyLinearToSRGB(A){return this.r=oE(A.r),this.g=oE(A.g),this.b=oE(A.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(A=Ug){return WI.fromWorkingColorSpace(YQ(this,dI),A),Eg(dI.r*255,0,255)<<16^Eg(dI.g*255,0,255)<<8^Eg(dI.b*255,0,255)<<0}getHexString(A=Ug){return("000000"+this.getHex(A).toString(16)).slice(-6)}getHSL(A,I=WI.workingColorSpace){WI.fromWorkingColorSpace(YQ(this,dI),I);const g=dI.r,C=dI.g,B=dI.b,E=Math.max(g,C,B),Q=Math.min(g,C,B);let o,t;const e=(Q+E)/2;if(Q===E)o=0,t=0;else{const a=E-Q;switch(t=e<=.5?a/(E+Q):a/(2-E-Q),E){case g:o=(C-B)/a+(C<B?6:0);break;case C:o=(B-g)/a+2;break;case B:o=(g-C)/a+4;break}o/=6}return A.h=o,A.s=t,A.l=e,A}getRGB(A,I=WI.workingColorSpace){return WI.fromWorkingColorSpace(YQ(this,dI),I),A.r=dI.r,A.g=dI.g,A.b=dI.b,A}getStyle(A=Ug){return WI.fromWorkingColorSpace(YQ(this,dI),A),A!==Ug?`color(${A} ${dI.r} ${dI.g} ${dI.b})`:`rgb(${dI.r*255|0},${dI.g*255|0},${dI.b*255|0})`}offsetHSL(A,I,g){return this.getHSL(cg),cg.h+=A,cg.s+=I,cg.l+=g,this.setHSL(cg.h,cg.s,cg.l),this}add(A){return this.r+=A.r,this.g+=A.g,this.b+=A.b,this}addColors(A,I){return this.r=A.r+I.r,this.g=A.g+I.g,this.b=A.b+I.b,this}addScalar(A){return this.r+=A,this.g+=A,this.b+=A,this}sub(A){return this.r=Math.max(0,this.r-A.r),this.g=Math.max(0,this.g-A.g),this.b=Math.max(0,this.b-A.b),this}multiply(A){return this.r*=A.r,this.g*=A.g,this.b*=A.b,this}multiplyScalar(A){return this.r*=A,this.g*=A,this.b*=A,this}lerp(A,I){return this.r+=(A.r-this.r)*I,this.g+=(A.g-this.g)*I,this.b+=(A.b-this.b)*I,this}lerpColors(A,I,g){return this.r=A.r+(I.r-A.r)*g,this.g=A.g+(I.g-A.g)*g,this.b=A.b+(I.b-A.b)*g,this}lerpHSL(A,I){this.getHSL(cg),A.getHSL(LQ);const g=oi(cg.h,LQ.h,I),C=oi(cg.s,LQ.s,I),B=oi(cg.l,LQ.l,I);return this.setHSL(g,C,B),this}equals(A){return A.r===this.r&&A.g===this.g&&A.b===this.b}fromArray(A,I=0){return this.r=A[I],this.g=A[I+1],this.b=A[I+2],this}toArray(A=[],I=0){return A[I]=this.r,A[I+1]=this.g,A[I+2]=this.b,A}fromBufferAttribute(A,I){return this.r=A.getX(I),this.g=A.getY(I),this.b=A.getZ(I),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}$A.NAMES=ha;let vC;class ca{static getDataURL(A){if(/^data:/i.test(A.src)||typeof HTMLCanvasElement>"u")return A.src;let I;if(A instanceof HTMLCanvasElement)I=A;else{vC===void 0&&(vC=kE("canvas")),vC.width=A.width,vC.height=A.height;const g=vC.getContext("2d");A instanceof ImageData?g.putImageData(A,0,0):g.drawImage(A,0,0,A.width,A.height),I=vC}return I.width>2048||I.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",A),I.toDataURL("image/jpeg",.6)):I.toDataURL("image/png")}static sRGBToLinear(A){if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap){const I=kE("canvas");I.width=A.width,I.height=A.height;const g=I.getContext("2d");g.drawImage(A,0,0,A.width,A.height);const C=g.getImageData(0,0,A.width,A.height),B=C.data;for(let E=0;E<B.length;E++)B[E]=MC(B[E]/255)*255;return g.putImageData(C,0,0),I}else if(A.data){const I=A.data.slice(0);for(let g=0;g<I.length;g++)I instanceof Uint8Array||I instanceof Uint8ClampedArray?I[g]=Math.floor(MC(I[g]/255)*255):I[g]=MC(I[g]);return{data:I,width:A.width,height:A.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),A}}class wa{constructor(A=null){this.isSource=!0,this.uuid=rQ(),this.data=A,this.version=0}set needsUpdate(A){A===!0&&this.version++}toJSON(A){const I=A===void 0||typeof A=="string";if(!I&&A.images[this.uuid]!==void 0)return A.images[this.uuid];const g={uuid:this.uuid,url:""},C=this.data;if(C!==null){let B;if(Array.isArray(C)){B=[];for(let E=0,Q=C.length;E<Q;E++)C[E].isDataTexture?B.push(si(C[E].image)):B.push(si(C[E]))}else B=si(C);g.url=B}return I||(A.images[this.uuid]=g),g}}function si(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ca.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let en=0;class PI extends yB{constructor(A=PI.DEFAULT_IMAGE,I=PI.DEFAULT_MAPPING,g=kg,C=kg,B=zI,E=QQ,Q=Mg,o=KC,t=PI.DEFAULT_ANISOTROPY,e=dC){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:en++}),this.uuid=rQ(),this.name="",this.source=new wa(A),this.mipmaps=[],this.mapping=I,this.wrapS=g,this.wrapT=C,this.magFilter=B,this.minFilter=E,this.anisotropy=t,this.format=Q,this.internalFormat=null,this.type=o,this.offset=new AI(0,0),this.repeat=new AI(1,1),this.center=new AI(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $I,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=e,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(A){this.source.data=A}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(A){return this.name=A.name,this.source=A.source,this.mipmaps=A.mipmaps.slice(0),this.mapping=A.mapping,this.wrapS=A.wrapS,this.wrapT=A.wrapT,this.magFilter=A.magFilter,this.minFilter=A.minFilter,this.anisotropy=A.anisotropy,this.format=A.format,this.internalFormat=A.internalFormat,this.type=A.type,this.offset.copy(A.offset),this.repeat.copy(A.repeat),this.center.copy(A.center),this.rotation=A.rotation,this.matrixAutoUpdate=A.matrixAutoUpdate,this.matrix.copy(A.matrix),this.generateMipmaps=A.generateMipmaps,this.premultiplyAlpha=A.premultiplyAlpha,this.flipY=A.flipY,this.unpackAlignment=A.unpackAlignment,this.encoding=A.encoding,this.userData=JSON.parse(JSON.stringify(A.userData)),this.needsUpdate=!0,this}toJSON(A){const I=A===void 0||typeof A=="string";if(!I&&A.textures[this.uuid]!==void 0)return A.textures[this.uuid];const g={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(A).uuid,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(g.userData=this.userData),I||(A.textures[this.uuid]=g),g}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(A){if(this.mapping!==aa)return A;if(A.applyMatrix3(this.matrix),A.x<0||A.x>1)switch(this.wrapS){case BQ:A.x=A.x-Math.floor(A.x);break;case kg:A.x=A.x<0?0:1;break;case ji:Math.abs(Math.floor(A.x)%2)===1?A.x=Math.ceil(A.x)-A.x:A.x=A.x-Math.floor(A.x);break}if(A.y<0||A.y>1)switch(this.wrapT){case BQ:A.y=A.y-Math.floor(A.y);break;case kg:A.y=A.y<0?0:1;break;case ji:Math.abs(Math.floor(A.y)%2)===1?A.y=Math.ceil(A.y)-A.y:A.y=A.y-Math.floor(A.y);break}return this.flipY&&(A.y=1-A.y),A}set needsUpdate(A){A===!0&&(this.version++,this.source.needsUpdate=!0)}}PI.DEFAULT_IMAGE=null;PI.DEFAULT_MAPPING=aa;PI.DEFAULT_ANISOTROPY=1;class rI{constructor(A=0,I=0,g=0,C=1){rI.prototype.isVector4=!0,this.x=A,this.y=I,this.z=g,this.w=C}get width(){return this.z}set width(A){this.z=A}get height(){return this.w}set height(A){this.w=A}set(A,I,g,C){return this.x=A,this.y=I,this.z=g,this.w=C,this}setScalar(A){return this.x=A,this.y=A,this.z=A,this.w=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setZ(A){return this.z=A,this}setW(A){return this.w=A,this}setComponent(A,I){switch(A){case 0:this.x=I;break;case 1:this.y=I;break;case 2:this.z=I;break;case 3:this.w=I;break;default:throw new Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(A){return this.x=A.x,this.y=A.y,this.z=A.z,this.w=A.w!==void 0?A.w:1,this}add(A){return this.x+=A.x,this.y+=A.y,this.z+=A.z,this.w+=A.w,this}addScalar(A){return this.x+=A,this.y+=A,this.z+=A,this.w+=A,this}addVectors(A,I){return this.x=A.x+I.x,this.y=A.y+I.y,this.z=A.z+I.z,this.w=A.w+I.w,this}addScaledVector(A,I){return this.x+=A.x*I,this.y+=A.y*I,this.z+=A.z*I,this.w+=A.w*I,this}sub(A){return this.x-=A.x,this.y-=A.y,this.z-=A.z,this.w-=A.w,this}subScalar(A){return this.x-=A,this.y-=A,this.z-=A,this.w-=A,this}subVectors(A,I){return this.x=A.x-I.x,this.y=A.y-I.y,this.z=A.z-I.z,this.w=A.w-I.w,this}multiply(A){return this.x*=A.x,this.y*=A.y,this.z*=A.z,this.w*=A.w,this}multiplyScalar(A){return this.x*=A,this.y*=A,this.z*=A,this.w*=A,this}applyMatrix4(A){const I=this.x,g=this.y,C=this.z,B=this.w,E=A.elements;return this.x=E[0]*I+E[4]*g+E[8]*C+E[12]*B,this.y=E[1]*I+E[5]*g+E[9]*C+E[13]*B,this.z=E[2]*I+E[6]*g+E[10]*C+E[14]*B,this.w=E[3]*I+E[7]*g+E[11]*C+E[15]*B,this}divideScalar(A){return this.multiplyScalar(1/A)}setAxisAngleFromQuaternion(A){this.w=2*Math.acos(A.w);const I=Math.sqrt(1-A.w*A.w);return I<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=A.x/I,this.y=A.y/I,this.z=A.z/I),this}setAxisAngleFromRotationMatrix(A){let I,g,C,B;const o=A.elements,t=o[0],e=o[4],a=o[8],s=o[1],D=o[5],c=o[9],r=o[2],n=o[6],l=o[10];if(Math.abs(e-s)<.01&&Math.abs(a-r)<.01&&Math.abs(c-n)<.01){if(Math.abs(e+s)<.1&&Math.abs(a+r)<.1&&Math.abs(c+n)<.1&&Math.abs(t+D+l-3)<.1)return this.set(1,0,0,0),this;I=Math.PI;const S=(t+1)/2,k=(D+1)/2,M=(l+1)/2,K=(e+s)/4,U=(a+r)/4,w=(c+n)/4;return S>k&&S>M?S<.01?(g=0,C=.707106781,B=.707106781):(g=Math.sqrt(S),C=K/g,B=U/g):k>M?k<.01?(g=.707106781,C=0,B=.707106781):(C=Math.sqrt(k),g=K/C,B=w/C):M<.01?(g=.707106781,C=.707106781,B=0):(B=Math.sqrt(M),g=U/B,C=w/B),this.set(g,C,B,I),this}let G=Math.sqrt((n-c)*(n-c)+(a-r)*(a-r)+(s-e)*(s-e));return Math.abs(G)<.001&&(G=1),this.x=(n-c)/G,this.y=(a-r)/G,this.z=(s-e)/G,this.w=Math.acos((t+D+l-1)/2),this}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this.z=Math.min(this.z,A.z),this.w=Math.min(this.w,A.w),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this.z=Math.max(this.z,A.z),this.w=Math.max(this.w,A.w),this}clamp(A,I){return this.x=Math.max(A.x,Math.min(I.x,this.x)),this.y=Math.max(A.y,Math.min(I.y,this.y)),this.z=Math.max(A.z,Math.min(I.z,this.z)),this.w=Math.max(A.w,Math.min(I.w,this.w)),this}clampScalar(A,I){return this.x=Math.max(A,Math.min(I,this.x)),this.y=Math.max(A,Math.min(I,this.y)),this.z=Math.max(A,Math.min(I,this.z)),this.w=Math.max(A,Math.min(I,this.w)),this}clampLength(A,I){const g=this.length();return this.divideScalar(g||1).multiplyScalar(Math.max(A,Math.min(I,g)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(A){return this.x*A.x+this.y*A.y+this.z*A.z+this.w*A.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,I){return this.x+=(A.x-this.x)*I,this.y+=(A.y-this.y)*I,this.z+=(A.z-this.z)*I,this.w+=(A.w-this.w)*I,this}lerpVectors(A,I,g){return this.x=A.x+(I.x-A.x)*g,this.y=A.y+(I.y-A.y)*g,this.z=A.z+(I.z-A.z)*g,this.w=A.w+(I.w-A.w)*g,this}equals(A){return A.x===this.x&&A.y===this.y&&A.z===this.z&&A.w===this.w}fromArray(A,I=0){return this.x=A[I],this.y=A[I+1],this.z=A[I+2],this.w=A[I+3],this}toArray(A=[],I=0){return A[I]=this.x,A[I+1]=this.y,A[I+2]=this.z,A[I+3]=this.w,A}fromBufferAttribute(A,I){return this.x=A.getX(I),this.y=A.getY(I),this.z=A.getZ(I),this.w=A.getW(I),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class UC extends yB{constructor(A=1,I=1,g={}){super(),this.isWebGLRenderTarget=!0,this.width=A,this.height=I,this.depth=1,this.scissor=new rI(0,0,A,I),this.scissorTest=!1,this.viewport=new rI(0,0,A,I);const C={width:A,height:I,depth:1};this.texture=new PI(C,g.mapping,g.wrapS,g.wrapT,g.magFilter,g.minFilter,g.format,g.type,g.anisotropy,g.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=g.generateMipmaps!==void 0?g.generateMipmaps:!1,this.texture.internalFormat=g.internalFormat!==void 0?g.internalFormat:null,this.texture.minFilter=g.minFilter!==void 0?g.minFilter:zI,this.depthBuffer=g.depthBuffer!==void 0?g.depthBuffer:!0,this.stencilBuffer=g.stencilBuffer!==void 0?g.stencilBuffer:!1,this.depthTexture=g.depthTexture!==void 0?g.depthTexture:null,this.samples=g.samples!==void 0?g.samples:0}setSize(A,I,g=1){(this.width!==A||this.height!==I||this.depth!==g)&&(this.width=A,this.height=I,this.depth=g,this.texture.image.width=A,this.texture.image.height=I,this.texture.image.depth=g,this.dispose()),this.viewport.set(0,0,A,I),this.scissor.set(0,0,A,I)}clone(){return new this.constructor().copy(this)}copy(A){this.width=A.width,this.height=A.height,this.depth=A.depth,this.viewport.copy(A.viewport),this.texture=A.texture.clone(),this.texture.isRenderTargetTexture=!0;const I=Object.assign({},A.texture.image);return this.texture.source=new wa(I),this.depthBuffer=A.depthBuffer,this.stencilBuffer=A.stencilBuffer,A.depthTexture!==null&&(this.depthTexture=A.depthTexture.clone()),this.samples=A.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ga extends PI{constructor(A=null,I=1,g=1,C=1){super(null),this.isDataArrayTexture=!0,this.image={data:A,width:I,height:g,depth:C},this.magFilter=mI,this.minFilter=mI,this.wrapR=kg,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class an extends PI{constructor(A=null,I=1,g=1,C=1){super(null),this.isData3DTexture=!0,this.image={data:A,width:I,height:g,depth:C},this.magFilter=mI,this.minFilter=mI,this.wrapR=kg,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hQ{constructor(A=0,I=0,g=0,C=1){this.isQuaternion=!0,this._x=A,this._y=I,this._z=g,this._w=C}static slerpFlat(A,I,g,C,B,E,Q){let o=g[C+0],t=g[C+1],e=g[C+2],a=g[C+3];const s=B[E+0],D=B[E+1],c=B[E+2],r=B[E+3];if(Q===0){A[I+0]=o,A[I+1]=t,A[I+2]=e,A[I+3]=a;return}if(Q===1){A[I+0]=s,A[I+1]=D,A[I+2]=c,A[I+3]=r;return}if(a!==r||o!==s||t!==D||e!==c){let n=1-Q;const l=o*s+t*D+e*c+a*r,G=l>=0?1:-1,S=1-l*l;if(S>Number.EPSILON){const M=Math.sqrt(S),K=Math.atan2(M,l*G);n=Math.sin(n*K)/M,Q=Math.sin(Q*K)/M}const k=Q*G;if(o=o*n+s*k,t=t*n+D*k,e=e*n+c*k,a=a*n+r*k,n===1-Q){const M=1/Math.sqrt(o*o+t*t+e*e+a*a);o*=M,t*=M,e*=M,a*=M}}A[I]=o,A[I+1]=t,A[I+2]=e,A[I+3]=a}static multiplyQuaternionsFlat(A,I,g,C,B,E){const Q=g[C],o=g[C+1],t=g[C+2],e=g[C+3],a=B[E],s=B[E+1],D=B[E+2],c=B[E+3];return A[I]=Q*c+e*a+o*D-t*s,A[I+1]=o*c+e*s+t*a-Q*D,A[I+2]=t*c+e*D+Q*s-o*a,A[I+3]=e*c-Q*a-o*s-t*D,A}get x(){return this._x}set x(A){this._x=A,this._onChangeCallback()}get y(){return this._y}set y(A){this._y=A,this._onChangeCallback()}get z(){return this._z}set z(A){this._z=A,this._onChangeCallback()}get w(){return this._w}set w(A){this._w=A,this._onChangeCallback()}set(A,I,g,C){return this._x=A,this._y=I,this._z=g,this._w=C,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(A){return this._x=A.x,this._y=A.y,this._z=A.z,this._w=A.w,this._onChangeCallback(),this}setFromEuler(A,I){const g=A._x,C=A._y,B=A._z,E=A._order,Q=Math.cos,o=Math.sin,t=Q(g/2),e=Q(C/2),a=Q(B/2),s=o(g/2),D=o(C/2),c=o(B/2);switch(E){case"XYZ":this._x=s*e*a+t*D*c,this._y=t*D*a-s*e*c,this._z=t*e*c+s*D*a,this._w=t*e*a-s*D*c;break;case"YXZ":this._x=s*e*a+t*D*c,this._y=t*D*a-s*e*c,this._z=t*e*c-s*D*a,this._w=t*e*a+s*D*c;break;case"ZXY":this._x=s*e*a-t*D*c,this._y=t*D*a+s*e*c,this._z=t*e*c+s*D*a,this._w=t*e*a-s*D*c;break;case"ZYX":this._x=s*e*a-t*D*c,this._y=t*D*a+s*e*c,this._z=t*e*c-s*D*a,this._w=t*e*a+s*D*c;break;case"YZX":this._x=s*e*a+t*D*c,this._y=t*D*a+s*e*c,this._z=t*e*c-s*D*a,this._w=t*e*a-s*D*c;break;case"XZY":this._x=s*e*a-t*D*c,this._y=t*D*a-s*e*c,this._z=t*e*c+s*D*a,this._w=t*e*a+s*D*c;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+E)}return I!==!1&&this._onChangeCallback(),this}setFromAxisAngle(A,I){const g=I/2,C=Math.sin(g);return this._x=A.x*C,this._y=A.y*C,this._z=A.z*C,this._w=Math.cos(g),this._onChangeCallback(),this}setFromRotationMatrix(A){const I=A.elements,g=I[0],C=I[4],B=I[8],E=I[1],Q=I[5],o=I[9],t=I[2],e=I[6],a=I[10],s=g+Q+a;if(s>0){const D=.5/Math.sqrt(s+1);this._w=.25/D,this._x=(e-o)*D,this._y=(B-t)*D,this._z=(E-C)*D}else if(g>Q&&g>a){const D=2*Math.sqrt(1+g-Q-a);this._w=(e-o)/D,this._x=.25*D,this._y=(C+E)/D,this._z=(B+t)/D}else if(Q>a){const D=2*Math.sqrt(1+Q-g-a);this._w=(B-t)/D,this._x=(C+E)/D,this._y=.25*D,this._z=(o+e)/D}else{const D=2*Math.sqrt(1+a-g-Q);this._w=(E-C)/D,this._x=(B+t)/D,this._y=(o+e)/D,this._z=.25*D}return this._onChangeCallback(),this}setFromUnitVectors(A,I){let g=A.dot(I)+1;return g<Number.EPSILON?(g=0,Math.abs(A.x)>Math.abs(A.z)?(this._x=-A.y,this._y=A.x,this._z=0,this._w=g):(this._x=0,this._y=-A.z,this._z=A.y,this._w=g)):(this._x=A.y*I.z-A.z*I.y,this._y=A.z*I.x-A.x*I.z,this._z=A.x*I.y-A.y*I.x,this._w=g),this.normalize()}angleTo(A){return 2*Math.acos(Math.abs(Eg(this.dot(A),-1,1)))}rotateTowards(A,I){const g=this.angleTo(A);if(g===0)return this;const C=Math.min(1,I/g);return this.slerp(A,C),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(A){return this._x*A._x+this._y*A._y+this._z*A._z+this._w*A._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let A=this.length();return A===0?(this._x=0,this._y=0,this._z=0,this._w=1):(A=1/A,this._x=this._x*A,this._y=this._y*A,this._z=this._z*A,this._w=this._w*A),this._onChangeCallback(),this}multiply(A){return this.multiplyQuaternions(this,A)}premultiply(A){return this.multiplyQuaternions(A,this)}multiplyQuaternions(A,I){const g=A._x,C=A._y,B=A._z,E=A._w,Q=I._x,o=I._y,t=I._z,e=I._w;return this._x=g*e+E*Q+C*t-B*o,this._y=C*e+E*o+B*Q-g*t,this._z=B*e+E*t+g*o-C*Q,this._w=E*e-g*Q-C*o-B*t,this._onChangeCallback(),this}slerp(A,I){if(I===0)return this;if(I===1)return this.copy(A);const g=this._x,C=this._y,B=this._z,E=this._w;let Q=E*A._w+g*A._x+C*A._y+B*A._z;if(Q<0?(this._w=-A._w,this._x=-A._x,this._y=-A._y,this._z=-A._z,Q=-Q):this.copy(A),Q>=1)return this._w=E,this._x=g,this._y=C,this._z=B,this;const o=1-Q*Q;if(o<=Number.EPSILON){const D=1-I;return this._w=D*E+I*this._w,this._x=D*g+I*this._x,this._y=D*C+I*this._y,this._z=D*B+I*this._z,this.normalize(),this._onChangeCallback(),this}const t=Math.sqrt(o),e=Math.atan2(t,Q),a=Math.sin((1-I)*e)/t,s=Math.sin(I*e)/t;return this._w=E*a+this._w*s,this._x=g*a+this._x*s,this._y=C*a+this._y*s,this._z=B*a+this._z*s,this._onChangeCallback(),this}slerpQuaternions(A,I,g){return this.copy(A).slerp(I,g)}random(){const A=Math.random(),I=Math.sqrt(1-A),g=Math.sqrt(A),C=2*Math.PI*Math.random(),B=2*Math.PI*Math.random();return this.set(I*Math.cos(C),g*Math.sin(B),g*Math.cos(B),I*Math.sin(C))}equals(A){return A._x===this._x&&A._y===this._y&&A._z===this._z&&A._w===this._w}fromArray(A,I=0){return this._x=A[I],this._y=A[I+1],this._z=A[I+2],this._w=A[I+3],this._onChangeCallback(),this}toArray(A=[],I=0){return A[I]=this._x,A[I+1]=this._y,A[I+2]=this._z,A[I+3]=this._w,A}fromBufferAttribute(A,I){return this._x=A.getX(I),this._y=A.getY(I),this._z=A.getZ(I),this._w=A.getW(I),this}_onChange(A){return this._onChangeCallback=A,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(A=0,I=0,g=0){j.prototype.isVector3=!0,this.x=A,this.y=I,this.z=g}set(A,I,g){return g===void 0&&(g=this.z),this.x=A,this.y=I,this.z=g,this}setScalar(A){return this.x=A,this.y=A,this.z=A,this}setX(A){return this.x=A,this}setY(A){return this.y=A,this}setZ(A){return this.z=A,this}setComponent(A,I){switch(A){case 0:this.x=I;break;case 1:this.y=I;break;case 2:this.z=I;break;default:throw new Error("index is out of range: "+A)}return this}getComponent(A){switch(A){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+A)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(A){return this.x=A.x,this.y=A.y,this.z=A.z,this}add(A){return this.x+=A.x,this.y+=A.y,this.z+=A.z,this}addScalar(A){return this.x+=A,this.y+=A,this.z+=A,this}addVectors(A,I){return this.x=A.x+I.x,this.y=A.y+I.y,this.z=A.z+I.z,this}addScaledVector(A,I){return this.x+=A.x*I,this.y+=A.y*I,this.z+=A.z*I,this}sub(A){return this.x-=A.x,this.y-=A.y,this.z-=A.z,this}subScalar(A){return this.x-=A,this.y-=A,this.z-=A,this}subVectors(A,I){return this.x=A.x-I.x,this.y=A.y-I.y,this.z=A.z-I.z,this}multiply(A){return this.x*=A.x,this.y*=A.y,this.z*=A.z,this}multiplyScalar(A){return this.x*=A,this.y*=A,this.z*=A,this}multiplyVectors(A,I){return this.x=A.x*I.x,this.y=A.y*I.y,this.z=A.z*I.z,this}applyEuler(A){return this.applyQuaternion(ut.setFromEuler(A))}applyAxisAngle(A,I){return this.applyQuaternion(ut.setFromAxisAngle(A,I))}applyMatrix3(A){const I=this.x,g=this.y,C=this.z,B=A.elements;return this.x=B[0]*I+B[3]*g+B[6]*C,this.y=B[1]*I+B[4]*g+B[7]*C,this.z=B[2]*I+B[5]*g+B[8]*C,this}applyNormalMatrix(A){return this.applyMatrix3(A).normalize()}applyMatrix4(A){const I=this.x,g=this.y,C=this.z,B=A.elements,E=1/(B[3]*I+B[7]*g+B[11]*C+B[15]);return this.x=(B[0]*I+B[4]*g+B[8]*C+B[12])*E,this.y=(B[1]*I+B[5]*g+B[9]*C+B[13])*E,this.z=(B[2]*I+B[6]*g+B[10]*C+B[14])*E,this}applyQuaternion(A){const I=this.x,g=this.y,C=this.z,B=A.x,E=A.y,Q=A.z,o=A.w,t=o*I+E*C-Q*g,e=o*g+Q*I-B*C,a=o*C+B*g-E*I,s=-B*I-E*g-Q*C;return this.x=t*o+s*-B+e*-Q-a*-E,this.y=e*o+s*-E+a*-B-t*-Q,this.z=a*o+s*-Q+t*-E-e*-B,this}project(A){return this.applyMatrix4(A.matrixWorldInverse).applyMatrix4(A.projectionMatrix)}unproject(A){return this.applyMatrix4(A.projectionMatrixInverse).applyMatrix4(A.matrixWorld)}transformDirection(A){const I=this.x,g=this.y,C=this.z,B=A.elements;return this.x=B[0]*I+B[4]*g+B[8]*C,this.y=B[1]*I+B[5]*g+B[9]*C,this.z=B[2]*I+B[6]*g+B[10]*C,this.normalize()}divide(A){return this.x/=A.x,this.y/=A.y,this.z/=A.z,this}divideScalar(A){return this.multiplyScalar(1/A)}min(A){return this.x=Math.min(this.x,A.x),this.y=Math.min(this.y,A.y),this.z=Math.min(this.z,A.z),this}max(A){return this.x=Math.max(this.x,A.x),this.y=Math.max(this.y,A.y),this.z=Math.max(this.z,A.z),this}clamp(A,I){return this.x=Math.max(A.x,Math.min(I.x,this.x)),this.y=Math.max(A.y,Math.min(I.y,this.y)),this.z=Math.max(A.z,Math.min(I.z,this.z)),this}clampScalar(A,I){return this.x=Math.max(A,Math.min(I,this.x)),this.y=Math.max(A,Math.min(I,this.y)),this.z=Math.max(A,Math.min(I,this.z)),this}clampLength(A,I){const g=this.length();return this.divideScalar(g||1).multiplyScalar(Math.max(A,Math.min(I,g)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(A){return this.x*A.x+this.y*A.y+this.z*A.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(A){return this.normalize().multiplyScalar(A)}lerp(A,I){return this.x+=(A.x-this.x)*I,this.y+=(A.y-this.y)*I,this.z+=(A.z-this.z)*I,this}lerpVectors(A,I,g){return this.x=A.x+(I.x-A.x)*g,this.y=A.y+(I.y-A.y)*g,this.z=A.z+(I.z-A.z)*g,this}cross(A){return this.crossVectors(this,A)}crossVectors(A,I){const g=A.x,C=A.y,B=A.z,E=I.x,Q=I.y,o=I.z;return this.x=C*o-B*Q,this.y=B*E-g*o,this.z=g*Q-C*E,this}projectOnVector(A){const I=A.lengthSq();if(I===0)return this.set(0,0,0);const g=A.dot(this)/I;return this.copy(A).multiplyScalar(g)}projectOnPlane(A){return ni.copy(this).projectOnVector(A),this.sub(ni)}reflect(A){return this.sub(ni.copy(A).multiplyScalar(2*this.dot(A)))}angleTo(A){const I=Math.sqrt(this.lengthSq()*A.lengthSq());if(I===0)return Math.PI/2;const g=this.dot(A)/I;return Math.acos(Eg(g,-1,1))}distanceTo(A){return Math.sqrt(this.distanceToSquared(A))}distanceToSquared(A){const I=this.x-A.x,g=this.y-A.y,C=this.z-A.z;return I*I+g*g+C*C}manhattanDistanceTo(A){return Math.abs(this.x-A.x)+Math.abs(this.y-A.y)+Math.abs(this.z-A.z)}setFromSpherical(A){return this.setFromSphericalCoords(A.radius,A.phi,A.theta)}setFromSphericalCoords(A,I,g){const C=Math.sin(I)*A;return this.x=C*Math.sin(g),this.y=Math.cos(I)*A,this.z=C*Math.cos(g),this}setFromCylindrical(A){return this.setFromCylindricalCoords(A.radius,A.theta,A.y)}setFromCylindricalCoords(A,I,g){return this.x=A*Math.sin(I),this.y=g,this.z=A*Math.cos(I),this}setFromMatrixPosition(A){const I=A.elements;return this.x=I[12],this.y=I[13],this.z=I[14],this}setFromMatrixScale(A){const I=this.setFromMatrixColumn(A,0).length(),g=this.setFromMatrixColumn(A,1).length(),C=this.setFromMatrixColumn(A,2).length();return this.x=I,this.y=g,this.z=C,this}setFromMatrixColumn(A,I){return this.fromArray(A.elements,I*4)}setFromMatrix3Column(A,I){return this.fromArray(A.elements,I*3)}setFromEuler(A){return this.x=A._x,this.y=A._y,this.z=A._z,this}equals(A){return A.x===this.x&&A.y===this.y&&A.z===this.z}fromArray(A,I=0){return this.x=A[I],this.y=A[I+1],this.z=A[I+2],this}toArray(A=[],I=0){return A[I]=this.x,A[I+1]=this.y,A[I+2]=this.z,A}fromBufferAttribute(A,I){return this.x=A.getX(I),this.y=A.getY(I),this.z=A.getZ(I),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const A=(Math.random()-.5)*2,I=Math.random()*Math.PI*2,g=Math.sqrt(1-A**2);return this.x=g*Math.cos(I),this.y=g*Math.sin(I),this.z=A,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ni=new j,ut=new hQ;class kB{constructor(A=new j(1/0,1/0,1/0),I=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=A,this.max=I}set(A,I){return this.min.copy(A),this.max.copy(I),this}setFromArray(A){let I=1/0,g=1/0,C=1/0,B=-1/0,E=-1/0,Q=-1/0;for(let o=0,t=A.length;o<t;o+=3){const e=A[o],a=A[o+1],s=A[o+2];e<I&&(I=e),a<g&&(g=a),s<C&&(C=s),e>B&&(B=e),a>E&&(E=a),s>Q&&(Q=s)}return this.min.set(I,g,C),this.max.set(B,E,Q),this}setFromBufferAttribute(A){let I=1/0,g=1/0,C=1/0,B=-1/0,E=-1/0,Q=-1/0;for(let o=0,t=A.count;o<t;o++){const e=A.getX(o),a=A.getY(o),s=A.getZ(o);e<I&&(I=e),a<g&&(g=a),s<C&&(C=s),e>B&&(B=e),a>E&&(E=a),s>Q&&(Q=s)}return this.min.set(I,g,C),this.max.set(B,E,Q),this}setFromPoints(A){this.makeEmpty();for(let I=0,g=A.length;I<g;I++)this.expandByPoint(A[I]);return this}setFromCenterAndSize(A,I){const g=aC.copy(I).multiplyScalar(.5);return this.min.copy(A).sub(g),this.max.copy(A).add(g),this}setFromObject(A,I=!1){return this.makeEmpty(),this.expandByObject(A,I)}clone(){return new this.constructor().copy(this)}copy(A){return this.min.copy(A.min),this.max.copy(A.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(A){return this.isEmpty()?A.set(0,0,0):A.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(A){return this.isEmpty()?A.set(0,0,0):A.subVectors(this.max,this.min)}expandByPoint(A){return this.min.min(A),this.max.max(A),this}expandByVector(A){return this.min.sub(A),this.max.add(A),this}expandByScalar(A){return this.min.addScalar(-A),this.max.addScalar(A),this}expandByObject(A,I=!1){A.updateWorldMatrix(!1,!1);const g=A.geometry;if(g!==void 0)if(I&&g.attributes!=null&&g.attributes.position!==void 0){const B=g.attributes.position;for(let E=0,Q=B.count;E<Q;E++)aC.fromBufferAttribute(B,E).applyMatrix4(A.matrixWorld),this.expandByPoint(aC)}else g.boundingBox===null&&g.computeBoundingBox(),Di.copy(g.boundingBox),Di.applyMatrix4(A.matrixWorld),this.union(Di);const C=A.children;for(let B=0,E=C.length;B<E;B++)this.expandByObject(C[B],I);return this}containsPoint(A){return!(A.x<this.min.x||A.x>this.max.x||A.y<this.min.y||A.y>this.max.y||A.z<this.min.z||A.z>this.max.z)}containsBox(A){return this.min.x<=A.min.x&&A.max.x<=this.max.x&&this.min.y<=A.min.y&&A.max.y<=this.max.y&&this.min.z<=A.min.z&&A.max.z<=this.max.z}getParameter(A,I){return I.set((A.x-this.min.x)/(this.max.x-this.min.x),(A.y-this.min.y)/(this.max.y-this.min.y),(A.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(A){return!(A.max.x<this.min.x||A.min.x>this.max.x||A.max.y<this.min.y||A.min.y>this.max.y||A.max.z<this.min.z||A.min.z>this.max.z)}intersectsSphere(A){return this.clampPoint(A.center,aC),aC.distanceToSquared(A.center)<=A.radius*A.radius}intersectsPlane(A){let I,g;return A.normal.x>0?(I=A.normal.x*this.min.x,g=A.normal.x*this.max.x):(I=A.normal.x*this.max.x,g=A.normal.x*this.min.x),A.normal.y>0?(I+=A.normal.y*this.min.y,g+=A.normal.y*this.max.y):(I+=A.normal.y*this.max.y,g+=A.normal.y*this.min.y),A.normal.z>0?(I+=A.normal.z*this.min.z,g+=A.normal.z*this.max.z):(I+=A.normal.z*this.max.z,g+=A.normal.z*this.min.z),I<=-A.constant&&g>=-A.constant}intersectsTriangle(A){if(this.isEmpty())return!1;this.getCenter(LB),HQ.subVectors(this.max,LB),WC.subVectors(A.a,LB),OC.subVectors(A.b,LB),_C.subVectors(A.c,LB),zg.subVectors(OC,WC),$g.subVectors(_C,OC),sC.subVectors(WC,_C);let I=[0,-zg.z,zg.y,0,-$g.z,$g.y,0,-sC.z,sC.y,zg.z,0,-zg.x,$g.z,0,-$g.x,sC.z,0,-sC.x,-zg.y,zg.x,0,-$g.y,$g.x,0,-sC.y,sC.x,0];return!ri(I,WC,OC,_C,HQ)||(I=[1,0,0,0,1,0,0,0,1],!ri(I,WC,OC,_C,HQ))?!1:(mQ.crossVectors(zg,$g),I=[mQ.x,mQ.y,mQ.z],ri(I,WC,OC,_C,HQ))}clampPoint(A,I){return I.copy(A).clamp(this.min,this.max)}distanceToPoint(A){return aC.copy(A).clamp(this.min,this.max).sub(A).length()}getBoundingSphere(A){return this.getCenter(A.center),A.radius=this.getSize(aC).length()*.5,A}intersect(A){return this.min.max(A.min),this.max.min(A.max),this.isEmpty()&&this.makeEmpty(),this}union(A){return this.min.min(A.min),this.max.max(A.max),this}applyMatrix4(A){return this.isEmpty()?this:(Hg[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(A),Hg[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(A),Hg[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(A),Hg[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(A),Hg[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(A),Hg[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(A),Hg[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(A),Hg[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(A),this.setFromPoints(Hg),this)}translate(A){return this.min.add(A),this.max.add(A),this}equals(A){return A.min.equals(this.min)&&A.max.equals(this.max)}}const Hg=[new j,new j,new j,new j,new j,new j,new j,new j],aC=new j,Di=new kB,WC=new j,OC=new j,_C=new j,zg=new j,$g=new j,sC=new j,LB=new j,HQ=new j,mQ=new j,nC=new j;function ri(i,A,I,g,C){for(let B=0,E=i.length-3;B<=E;B+=3){nC.fromArray(i,B);const Q=C.x*Math.abs(nC.x)+C.y*Math.abs(nC.y)+C.z*Math.abs(nC.z),o=A.dot(nC),t=I.dot(nC),e=g.dot(nC);if(Math.max(-Math.max(o,t,e),Math.min(o,t,e))>Q)return!1}return!0}const sn=new kB,YB=new j,hi=new j;class uE{constructor(A=new j,I=-1){this.center=A,this.radius=I}set(A,I){return this.center.copy(A),this.radius=I,this}setFromPoints(A,I){const g=this.center;I!==void 0?g.copy(I):sn.setFromPoints(A).getCenter(g);let C=0;for(let B=0,E=A.length;B<E;B++)C=Math.max(C,g.distanceToSquared(A[B]));return this.radius=Math.sqrt(C),this}copy(A){return this.center.copy(A.center),this.radius=A.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(A){return A.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(A){return A.distanceTo(this.center)-this.radius}intersectsSphere(A){const I=this.radius+A.radius;return A.center.distanceToSquared(this.center)<=I*I}intersectsBox(A){return A.intersectsSphere(this)}intersectsPlane(A){return Math.abs(A.distanceToPoint(this.center))<=this.radius}clampPoint(A,I){const g=this.center.distanceToSquared(A);return I.copy(A),g>this.radius*this.radius&&(I.sub(this.center).normalize(),I.multiplyScalar(this.radius).add(this.center)),I}getBoundingBox(A){return this.isEmpty()?(A.makeEmpty(),A):(A.set(this.center,this.center),A.expandByScalar(this.radius),A)}applyMatrix4(A){return this.center.applyMatrix4(A),this.radius=this.radius*A.getMaxScaleOnAxis(),this}translate(A){return this.center.add(A),this}expandByPoint(A){if(this.isEmpty())return this.center.copy(A),this.radius=0,this;YB.subVectors(A,this.center);const I=YB.lengthSq();if(I>this.radius*this.radius){const g=Math.sqrt(I),C=(g-this.radius)*.5;this.center.addScaledVector(YB,C/g),this.radius+=C}return this}union(A){return A.isEmpty()?this:this.isEmpty()?(this.copy(A),this):(this.center.equals(A.center)===!0?this.radius=Math.max(this.radius,A.radius):(hi.subVectors(A.center,this.center).setLength(A.radius),this.expandByPoint(YB.copy(A.center).add(hi)),this.expandByPoint(YB.copy(A.center).sub(hi))),this)}equals(A){return A.center.equals(this.center)&&A.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mg=new j,ci=new j,xQ=new j,AC=new j,wi=new j,TQ=new j,Gi=new j;class nn{constructor(A=new j,I=new j(0,0,-1)){this.origin=A,this.direction=I}set(A,I){return this.origin.copy(A),this.direction.copy(I),this}copy(A){return this.origin.copy(A.origin),this.direction.copy(A.direction),this}at(A,I){return I.copy(this.direction).multiplyScalar(A).add(this.origin)}lookAt(A){return this.direction.copy(A).sub(this.origin).normalize(),this}recast(A){return this.origin.copy(this.at(A,mg)),this}closestPointToPoint(A,I){I.subVectors(A,this.origin);const g=I.dot(this.direction);return g<0?I.copy(this.origin):I.copy(this.direction).multiplyScalar(g).add(this.origin)}distanceToPoint(A){return Math.sqrt(this.distanceSqToPoint(A))}distanceSqToPoint(A){const I=mg.subVectors(A,this.origin).dot(this.direction);return I<0?this.origin.distanceToSquared(A):(mg.copy(this.direction).multiplyScalar(I).add(this.origin),mg.distanceToSquared(A))}distanceSqToSegment(A,I,g,C){ci.copy(A).add(I).multiplyScalar(.5),xQ.copy(I).sub(A).normalize(),AC.copy(this.origin).sub(ci);const B=A.distanceTo(I)*.5,E=-this.direction.dot(xQ),Q=AC.dot(this.direction),o=-AC.dot(xQ),t=AC.lengthSq(),e=Math.abs(1-E*E);let a,s,D,c;if(e>0)if(a=E*o-Q,s=E*Q-o,c=B*e,a>=0)if(s>=-c)if(s<=c){const r=1/e;a*=r,s*=r,D=a*(a+E*s+2*Q)+s*(E*a+s+2*o)+t}else s=B,a=Math.max(0,-(E*s+Q)),D=-a*a+s*(s+2*o)+t;else s=-B,a=Math.max(0,-(E*s+Q)),D=-a*a+s*(s+2*o)+t;else s<=-c?(a=Math.max(0,-(-E*B+Q)),s=a>0?-B:Math.min(Math.max(-B,-o),B),D=-a*a+s*(s+2*o)+t):s<=c?(a=0,s=Math.min(Math.max(-B,-o),B),D=s*(s+2*o)+t):(a=Math.max(0,-(E*B+Q)),s=a>0?B:Math.min(Math.max(-B,-o),B),D=-a*a+s*(s+2*o)+t);else s=E>0?-B:B,a=Math.max(0,-(E*s+Q)),D=-a*a+s*(s+2*o)+t;return g&&g.copy(this.direction).multiplyScalar(a).add(this.origin),C&&C.copy(xQ).multiplyScalar(s).add(ci),D}intersectSphere(A,I){mg.subVectors(A.center,this.origin);const g=mg.dot(this.direction),C=mg.dot(mg)-g*g,B=A.radius*A.radius;if(C>B)return null;const E=Math.sqrt(B-C),Q=g-E,o=g+E;return Q<0&&o<0?null:Q<0?this.at(o,I):this.at(Q,I)}intersectsSphere(A){return this.distanceSqToPoint(A.center)<=A.radius*A.radius}distanceToPlane(A){const I=A.normal.dot(this.direction);if(I===0)return A.distanceToPoint(this.origin)===0?0:null;const g=-(this.origin.dot(A.normal)+A.constant)/I;return g>=0?g:null}intersectPlane(A,I){const g=this.distanceToPlane(A);return g===null?null:this.at(g,I)}intersectsPlane(A){const I=A.distanceToPoint(this.origin);return I===0||A.normal.dot(this.direction)*I<0}intersectBox(A,I){let g,C,B,E,Q,o;const t=1/this.direction.x,e=1/this.direction.y,a=1/this.direction.z,s=this.origin;return t>=0?(g=(A.min.x-s.x)*t,C=(A.max.x-s.x)*t):(g=(A.max.x-s.x)*t,C=(A.min.x-s.x)*t),e>=0?(B=(A.min.y-s.y)*e,E=(A.max.y-s.y)*e):(B=(A.max.y-s.y)*e,E=(A.min.y-s.y)*e),g>E||B>C||((B>g||isNaN(g))&&(g=B),(E<C||isNaN(C))&&(C=E),a>=0?(Q=(A.min.z-s.z)*a,o=(A.max.z-s.z)*a):(Q=(A.max.z-s.z)*a,o=(A.min.z-s.z)*a),g>o||Q>C)||((Q>g||g!==g)&&(g=Q),(o<C||C!==C)&&(C=o),C<0)?null:this.at(g>=0?g:C,I)}intersectsBox(A){return this.intersectBox(A,mg)!==null}intersectTriangle(A,I,g,C,B){wi.subVectors(I,A),TQ.subVectors(g,A),Gi.crossVectors(wi,TQ);let E=this.direction.dot(Gi),Q;if(E>0){if(C)return null;Q=1}else if(E<0)Q=-1,E=-E;else return null;AC.subVectors(this.origin,A);const o=Q*this.direction.dot(TQ.crossVectors(AC,TQ));if(o<0)return null;const t=Q*this.direction.dot(wi.cross(AC));if(t<0||o+t>E)return null;const e=-Q*AC.dot(Gi);return e<0?null:this.at(e/E,B)}applyMatrix4(A){return this.origin.applyMatrix4(A),this.direction.transformDirection(A),this}equals(A){return A.origin.equals(this.origin)&&A.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class MI{constructor(){MI.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(A,I,g,C,B,E,Q,o,t,e,a,s,D,c,r,n){const l=this.elements;return l[0]=A,l[4]=I,l[8]=g,l[12]=C,l[1]=B,l[5]=E,l[9]=Q,l[13]=o,l[2]=t,l[6]=e,l[10]=a,l[14]=s,l[3]=D,l[7]=c,l[11]=r,l[15]=n,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new MI().fromArray(this.elements)}copy(A){const I=this.elements,g=A.elements;return I[0]=g[0],I[1]=g[1],I[2]=g[2],I[3]=g[3],I[4]=g[4],I[5]=g[5],I[6]=g[6],I[7]=g[7],I[8]=g[8],I[9]=g[9],I[10]=g[10],I[11]=g[11],I[12]=g[12],I[13]=g[13],I[14]=g[14],I[15]=g[15],this}copyPosition(A){const I=this.elements,g=A.elements;return I[12]=g[12],I[13]=g[13],I[14]=g[14],this}setFromMatrix3(A){const I=A.elements;return this.set(I[0],I[3],I[6],0,I[1],I[4],I[7],0,I[2],I[5],I[8],0,0,0,0,1),this}extractBasis(A,I,g){return A.setFromMatrixColumn(this,0),I.setFromMatrixColumn(this,1),g.setFromMatrixColumn(this,2),this}makeBasis(A,I,g){return this.set(A.x,I.x,g.x,0,A.y,I.y,g.y,0,A.z,I.z,g.z,0,0,0,0,1),this}extractRotation(A){const I=this.elements,g=A.elements,C=1/PC.setFromMatrixColumn(A,0).length(),B=1/PC.setFromMatrixColumn(A,1).length(),E=1/PC.setFromMatrixColumn(A,2).length();return I[0]=g[0]*C,I[1]=g[1]*C,I[2]=g[2]*C,I[3]=0,I[4]=g[4]*B,I[5]=g[5]*B,I[6]=g[6]*B,I[7]=0,I[8]=g[8]*E,I[9]=g[9]*E,I[10]=g[10]*E,I[11]=0,I[12]=0,I[13]=0,I[14]=0,I[15]=1,this}makeRotationFromEuler(A){const I=this.elements,g=A.x,C=A.y,B=A.z,E=Math.cos(g),Q=Math.sin(g),o=Math.cos(C),t=Math.sin(C),e=Math.cos(B),a=Math.sin(B);if(A.order==="XYZ"){const s=E*e,D=E*a,c=Q*e,r=Q*a;I[0]=o*e,I[4]=-o*a,I[8]=t,I[1]=D+c*t,I[5]=s-r*t,I[9]=-Q*o,I[2]=r-s*t,I[6]=c+D*t,I[10]=E*o}else if(A.order==="YXZ"){const s=o*e,D=o*a,c=t*e,r=t*a;I[0]=s+r*Q,I[4]=c*Q-D,I[8]=E*t,I[1]=E*a,I[5]=E*e,I[9]=-Q,I[2]=D*Q-c,I[6]=r+s*Q,I[10]=E*o}else if(A.order==="ZXY"){const s=o*e,D=o*a,c=t*e,r=t*a;I[0]=s-r*Q,I[4]=-E*a,I[8]=c+D*Q,I[1]=D+c*Q,I[5]=E*e,I[9]=r-s*Q,I[2]=-E*t,I[6]=Q,I[10]=E*o}else if(A.order==="ZYX"){const s=E*e,D=E*a,c=Q*e,r=Q*a;I[0]=o*e,I[4]=c*t-D,I[8]=s*t+r,I[1]=o*a,I[5]=r*t+s,I[9]=D*t-c,I[2]=-t,I[6]=Q*o,I[10]=E*o}else if(A.order==="YZX"){const s=E*o,D=E*t,c=Q*o,r=Q*t;I[0]=o*e,I[4]=r-s*a,I[8]=c*a+D,I[1]=a,I[5]=E*e,I[9]=-Q*e,I[2]=-t*e,I[6]=D*a+c,I[10]=s-r*a}else if(A.order==="XZY"){const s=E*o,D=E*t,c=Q*o,r=Q*t;I[0]=o*e,I[4]=-a,I[8]=t*e,I[1]=s*a+r,I[5]=E*e,I[9]=D*a-c,I[2]=c*a-D,I[6]=Q*e,I[10]=r*a+s}return I[3]=0,I[7]=0,I[11]=0,I[12]=0,I[13]=0,I[14]=0,I[15]=1,this}makeRotationFromQuaternion(A){return this.compose(Dn,A,rn)}lookAt(A,I,g){const C=this.elements;return Bg.subVectors(A,I),Bg.lengthSq()===0&&(Bg.z=1),Bg.normalize(),IC.crossVectors(g,Bg),IC.lengthSq()===0&&(Math.abs(g.z)===1?Bg.x+=1e-4:Bg.z+=1e-4,Bg.normalize(),IC.crossVectors(g,Bg)),IC.normalize(),bQ.crossVectors(Bg,IC),C[0]=IC.x,C[4]=bQ.x,C[8]=Bg.x,C[1]=IC.y,C[5]=bQ.y,C[9]=Bg.y,C[2]=IC.z,C[6]=bQ.z,C[10]=Bg.z,this}multiply(A){return this.multiplyMatrices(this,A)}premultiply(A){return this.multiplyMatrices(A,this)}multiplyMatrices(A,I){const g=A.elements,C=I.elements,B=this.elements,E=g[0],Q=g[4],o=g[8],t=g[12],e=g[1],a=g[5],s=g[9],D=g[13],c=g[2],r=g[6],n=g[10],l=g[14],G=g[3],S=g[7],k=g[11],M=g[15],K=C[0],U=C[4],w=C[8],d=C[12],L=C[1],X=C[5],u=C[9],q=C[13],J=C[2],m=C[6],P=C[10],iA=C[14],V=C[3],b=C[7],v=C[11],N=C[15];return B[0]=E*K+Q*L+o*J+t*V,B[4]=E*U+Q*X+o*m+t*b,B[8]=E*w+Q*u+o*P+t*v,B[12]=E*d+Q*q+o*iA+t*N,B[1]=e*K+a*L+s*J+D*V,B[5]=e*U+a*X+s*m+D*b,B[9]=e*w+a*u+s*P+D*v,B[13]=e*d+a*q+s*iA+D*N,B[2]=c*K+r*L+n*J+l*V,B[6]=c*U+r*X+n*m+l*b,B[10]=c*w+r*u+n*P+l*v,B[14]=c*d+r*q+n*iA+l*N,B[3]=G*K+S*L+k*J+M*V,B[7]=G*U+S*X+k*m+M*b,B[11]=G*w+S*u+k*P+M*v,B[15]=G*d+S*q+k*iA+M*N,this}multiplyScalar(A){const I=this.elements;return I[0]*=A,I[4]*=A,I[8]*=A,I[12]*=A,I[1]*=A,I[5]*=A,I[9]*=A,I[13]*=A,I[2]*=A,I[6]*=A,I[10]*=A,I[14]*=A,I[3]*=A,I[7]*=A,I[11]*=A,I[15]*=A,this}determinant(){const A=this.elements,I=A[0],g=A[4],C=A[8],B=A[12],E=A[1],Q=A[5],o=A[9],t=A[13],e=A[2],a=A[6],s=A[10],D=A[14],c=A[3],r=A[7],n=A[11],l=A[15];return c*(+B*o*a-C*t*a-B*Q*s+g*t*s+C*Q*D-g*o*D)+r*(+I*o*D-I*t*s+B*E*s-C*E*D+C*t*e-B*o*e)+n*(+I*t*a-I*Q*D-B*E*a+g*E*D+B*Q*e-g*t*e)+l*(-C*Q*e-I*o*a+I*Q*s+C*E*a-g*E*s+g*o*e)}transpose(){const A=this.elements;let I;return I=A[1],A[1]=A[4],A[4]=I,I=A[2],A[2]=A[8],A[8]=I,I=A[6],A[6]=A[9],A[9]=I,I=A[3],A[3]=A[12],A[12]=I,I=A[7],A[7]=A[13],A[13]=I,I=A[11],A[11]=A[14],A[14]=I,this}setPosition(A,I,g){const C=this.elements;return A.isVector3?(C[12]=A.x,C[13]=A.y,C[14]=A.z):(C[12]=A,C[13]=I,C[14]=g),this}invert(){const A=this.elements,I=A[0],g=A[1],C=A[2],B=A[3],E=A[4],Q=A[5],o=A[6],t=A[7],e=A[8],a=A[9],s=A[10],D=A[11],c=A[12],r=A[13],n=A[14],l=A[15],G=a*n*t-r*s*t+r*o*D-Q*n*D-a*o*l+Q*s*l,S=c*s*t-e*n*t-c*o*D+E*n*D+e*o*l-E*s*l,k=e*r*t-c*a*t+c*Q*D-E*r*D-e*Q*l+E*a*l,M=c*a*o-e*r*o-c*Q*s+E*r*s+e*Q*n-E*a*n,K=I*G+g*S+C*k+B*M;if(K===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/K;return A[0]=G*U,A[1]=(r*s*B-a*n*B-r*C*D+g*n*D+a*C*l-g*s*l)*U,A[2]=(Q*n*B-r*o*B+r*C*t-g*n*t-Q*C*l+g*o*l)*U,A[3]=(a*o*B-Q*s*B-a*C*t+g*s*t+Q*C*D-g*o*D)*U,A[4]=S*U,A[5]=(e*n*B-c*s*B+c*C*D-I*n*D-e*C*l+I*s*l)*U,A[6]=(c*o*B-E*n*B-c*C*t+I*n*t+E*C*l-I*o*l)*U,A[7]=(E*s*B-e*o*B+e*C*t-I*s*t-E*C*D+I*o*D)*U,A[8]=k*U,A[9]=(c*a*B-e*r*B-c*g*D+I*r*D+e*g*l-I*a*l)*U,A[10]=(E*r*B-c*Q*B+c*g*t-I*r*t-E*g*l+I*Q*l)*U,A[11]=(e*Q*B-E*a*B-e*g*t+I*a*t+E*g*D-I*Q*D)*U,A[12]=M*U,A[13]=(e*r*C-c*a*C+c*g*s-I*r*s-e*g*n+I*a*n)*U,A[14]=(c*Q*C-E*r*C-c*g*o+I*r*o+E*g*n-I*Q*n)*U,A[15]=(E*a*C-e*Q*C+e*g*o-I*a*o-E*g*s+I*Q*s)*U,this}scale(A){const I=this.elements,g=A.x,C=A.y,B=A.z;return I[0]*=g,I[4]*=C,I[8]*=B,I[1]*=g,I[5]*=C,I[9]*=B,I[2]*=g,I[6]*=C,I[10]*=B,I[3]*=g,I[7]*=C,I[11]*=B,this}getMaxScaleOnAxis(){const A=this.elements,I=A[0]*A[0]+A[1]*A[1]+A[2]*A[2],g=A[4]*A[4]+A[5]*A[5]+A[6]*A[6],C=A[8]*A[8]+A[9]*A[9]+A[10]*A[10];return Math.sqrt(Math.max(I,g,C))}makeTranslation(A,I,g){return this.set(1,0,0,A,0,1,0,I,0,0,1,g,0,0,0,1),this}makeRotationX(A){const I=Math.cos(A),g=Math.sin(A);return this.set(1,0,0,0,0,I,-g,0,0,g,I,0,0,0,0,1),this}makeRotationY(A){const I=Math.cos(A),g=Math.sin(A);return this.set(I,0,g,0,0,1,0,0,-g,0,I,0,0,0,0,1),this}makeRotationZ(A){const I=Math.cos(A),g=Math.sin(A);return this.set(I,-g,0,0,g,I,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(A,I){const g=Math.cos(I),C=Math.sin(I),B=1-g,E=A.x,Q=A.y,o=A.z,t=B*E,e=B*Q;return this.set(t*E+g,t*Q-C*o,t*o+C*Q,0,t*Q+C*o,e*Q+g,e*o-C*E,0,t*o-C*Q,e*o+C*E,B*o*o+g,0,0,0,0,1),this}makeScale(A,I,g){return this.set(A,0,0,0,0,I,0,0,0,0,g,0,0,0,0,1),this}makeShear(A,I,g,C,B,E){return this.set(1,g,B,0,A,1,E,0,I,C,1,0,0,0,0,1),this}compose(A,I,g){const C=this.elements,B=I._x,E=I._y,Q=I._z,o=I._w,t=B+B,e=E+E,a=Q+Q,s=B*t,D=B*e,c=B*a,r=E*e,n=E*a,l=Q*a,G=o*t,S=o*e,k=o*a,M=g.x,K=g.y,U=g.z;return C[0]=(1-(r+l))*M,C[1]=(D+k)*M,C[2]=(c-S)*M,C[3]=0,C[4]=(D-k)*K,C[5]=(1-(s+l))*K,C[6]=(n+G)*K,C[7]=0,C[8]=(c+S)*U,C[9]=(n-G)*U,C[10]=(1-(s+r))*U,C[11]=0,C[12]=A.x,C[13]=A.y,C[14]=A.z,C[15]=1,this}decompose(A,I,g){const C=this.elements;let B=PC.set(C[0],C[1],C[2]).length();const E=PC.set(C[4],C[5],C[6]).length(),Q=PC.set(C[8],C[9],C[10]).length();this.determinant()<0&&(B=-B),A.x=C[12],A.y=C[13],A.z=C[14],wg.copy(this);const t=1/B,e=1/E,a=1/Q;return wg.elements[0]*=t,wg.elements[1]*=t,wg.elements[2]*=t,wg.elements[4]*=e,wg.elements[5]*=e,wg.elements[6]*=e,wg.elements[8]*=a,wg.elements[9]*=a,wg.elements[10]*=a,I.setFromRotationMatrix(wg),g.x=B,g.y=E,g.z=Q,this}makePerspective(A,I,g,C,B,E){const Q=this.elements,o=2*B/(I-A),t=2*B/(g-C),e=(I+A)/(I-A),a=(g+C)/(g-C),s=-(E+B)/(E-B),D=-2*E*B/(E-B);return Q[0]=o,Q[4]=0,Q[8]=e,Q[12]=0,Q[1]=0,Q[5]=t,Q[9]=a,Q[13]=0,Q[2]=0,Q[6]=0,Q[10]=s,Q[14]=D,Q[3]=0,Q[7]=0,Q[11]=-1,Q[15]=0,this}makeOrthographic(A,I,g,C,B,E){const Q=this.elements,o=1/(I-A),t=1/(g-C),e=1/(E-B),a=(I+A)*o,s=(g+C)*t,D=(E+B)*e;return Q[0]=2*o,Q[4]=0,Q[8]=0,Q[12]=-a,Q[1]=0,Q[5]=2*t,Q[9]=0,Q[13]=-s,Q[2]=0,Q[6]=0,Q[10]=-2*e,Q[14]=-D,Q[3]=0,Q[7]=0,Q[11]=0,Q[15]=1,this}equals(A){const I=this.elements,g=A.elements;for(let C=0;C<16;C++)if(I[C]!==g[C])return!1;return!0}fromArray(A,I=0){for(let g=0;g<16;g++)this.elements[g]=A[g+I];return this}toArray(A=[],I=0){const g=this.elements;return A[I]=g[0],A[I+1]=g[1],A[I+2]=g[2],A[I+3]=g[3],A[I+4]=g[4],A[I+5]=g[5],A[I+6]=g[6],A[I+7]=g[7],A[I+8]=g[8],A[I+9]=g[9],A[I+10]=g[10],A[I+11]=g[11],A[I+12]=g[12],A[I+13]=g[13],A[I+14]=g[14],A[I+15]=g[15],A}}const PC=new j,wg=new MI,Dn=new j(0,0,0),rn=new j(1,1,1),IC=new j,bQ=new j,Bg=new j,Lt=new MI,Yt=new hQ;class cQ{constructor(A=0,I=0,g=0,C=cQ.DefaultOrder){this.isEuler=!0,this._x=A,this._y=I,this._z=g,this._order=C}get x(){return this._x}set x(A){this._x=A,this._onChangeCallback()}get y(){return this._y}set y(A){this._y=A,this._onChangeCallback()}get z(){return this._z}set z(A){this._z=A,this._onChangeCallback()}get order(){return this._order}set order(A){this._order=A,this._onChangeCallback()}set(A,I,g,C=this._order){return this._x=A,this._y=I,this._z=g,this._order=C,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(A){return this._x=A._x,this._y=A._y,this._z=A._z,this._order=A._order,this._onChangeCallback(),this}setFromRotationMatrix(A,I=this._order,g=!0){const C=A.elements,B=C[0],E=C[4],Q=C[8],o=C[1],t=C[5],e=C[9],a=C[2],s=C[6],D=C[10];switch(I){case"XYZ":this._y=Math.asin(Eg(Q,-1,1)),Math.abs(Q)<.9999999?(this._x=Math.atan2(-e,D),this._z=Math.atan2(-E,B)):(this._x=Math.atan2(s,t),this._z=0);break;case"YXZ":this._x=Math.asin(-Eg(e,-1,1)),Math.abs(e)<.9999999?(this._y=Math.atan2(Q,D),this._z=Math.atan2(o,t)):(this._y=Math.atan2(-a,B),this._z=0);break;case"ZXY":this._x=Math.asin(Eg(s,-1,1)),Math.abs(s)<.9999999?(this._y=Math.atan2(-a,D),this._z=Math.atan2(-E,t)):(this._y=0,this._z=Math.atan2(o,B));break;case"ZYX":this._y=Math.asin(-Eg(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(s,D),this._z=Math.atan2(o,B)):(this._x=0,this._z=Math.atan2(-E,t));break;case"YZX":this._z=Math.asin(Eg(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-e,t),this._y=Math.atan2(-a,B)):(this._x=0,this._y=Math.atan2(Q,D));break;case"XZY":this._z=Math.asin(-Eg(E,-1,1)),Math.abs(E)<.9999999?(this._x=Math.atan2(s,t),this._y=Math.atan2(Q,B)):(this._x=Math.atan2(-e,D),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+I)}return this._order=I,g===!0&&this._onChangeCallback(),this}setFromQuaternion(A,I,g){return Lt.makeRotationFromQuaternion(A),this.setFromRotationMatrix(Lt,I,g)}setFromVector3(A,I=this._order){return this.set(A.x,A.y,A.z,I)}reorder(A){return Yt.setFromEuler(this),this.setFromQuaternion(Yt,A)}equals(A){return A._x===this._x&&A._y===this._y&&A._z===this._z&&A._order===this._order}fromArray(A){return this._x=A[0],this._y=A[1],this._z=A[2],A[3]!==void 0&&(this._order=A[3]),this._onChangeCallback(),this}toArray(A=[],I=0){return A[I]=this._x,A[I+1]=this._y,A[I+2]=this._z,A[I+3]=this._order,A}_onChange(A){return this._onChangeCallback=A,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}toVector3(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")}}cQ.DefaultOrder="XYZ";cQ.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];class la{constructor(){this.mask=1}set(A){this.mask=(1<<A|0)>>>0}enable(A){this.mask|=1<<A|0}enableAll(){this.mask=-1}toggle(A){this.mask^=1<<A|0}disable(A){this.mask&=~(1<<A|0)}disableAll(){this.mask=0}test(A){return(this.mask&A.mask)!==0}isEnabled(A){return(this.mask&(1<<A|0))!==0}}let hn=0;const Ht=new j,ZC=new hQ,xg=new MI,vQ=new j,HB=new j,cn=new j,wn=new hQ,mt=new j(1,0,0),xt=new j(0,1,0),Tt=new j(0,0,1),Gn={type:"added"},bt={type:"removed"};class Ag extends yB{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hn++}),this.uuid=rQ(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ag.DefaultUp.clone();const A=new j,I=new cQ,g=new hQ,C=new j(1,1,1);function B(){g.setFromEuler(I,!1)}function E(){I.setFromQuaternion(g,void 0,!1)}I._onChange(B),g._onChange(E),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:A},rotation:{configurable:!0,enumerable:!0,value:I},quaternion:{configurable:!0,enumerable:!0,value:g},scale:{configurable:!0,enumerable:!0,value:C},modelViewMatrix:{value:new MI},normalMatrix:{value:new $I}}),this.matrix=new MI,this.matrixWorld=new MI,this.matrixAutoUpdate=Ag.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=Ag.DefaultMatrixWorldAutoUpdate,this.layers=new la,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(A){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(A),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(A){return this.quaternion.premultiply(A),this}setRotationFromAxisAngle(A,I){this.quaternion.setFromAxisAngle(A,I)}setRotationFromEuler(A){this.quaternion.setFromEuler(A,!0)}setRotationFromMatrix(A){this.quaternion.setFromRotationMatrix(A)}setRotationFromQuaternion(A){this.quaternion.copy(A)}rotateOnAxis(A,I){return ZC.setFromAxisAngle(A,I),this.quaternion.multiply(ZC),this}rotateOnWorldAxis(A,I){return ZC.setFromAxisAngle(A,I),this.quaternion.premultiply(ZC),this}rotateX(A){return this.rotateOnAxis(mt,A)}rotateY(A){return this.rotateOnAxis(xt,A)}rotateZ(A){return this.rotateOnAxis(Tt,A)}translateOnAxis(A,I){return Ht.copy(A).applyQuaternion(this.quaternion),this.position.add(Ht.multiplyScalar(I)),this}translateX(A){return this.translateOnAxis(mt,A)}translateY(A){return this.translateOnAxis(xt,A)}translateZ(A){return this.translateOnAxis(Tt,A)}localToWorld(A){return this.updateWorldMatrix(!0,!1),A.applyMatrix4(this.matrixWorld)}worldToLocal(A){return this.updateWorldMatrix(!0,!1),A.applyMatrix4(xg.copy(this.matrixWorld).invert())}lookAt(A,I,g){A.isVector3?vQ.copy(A):vQ.set(A,I,g);const C=this.parent;this.updateWorldMatrix(!0,!1),HB.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xg.lookAt(HB,vQ,this.up):xg.lookAt(vQ,HB,this.up),this.quaternion.setFromRotationMatrix(xg),C&&(xg.extractRotation(C.matrixWorld),ZC.setFromRotationMatrix(xg),this.quaternion.premultiply(ZC.invert()))}add(A){if(arguments.length>1){for(let I=0;I<arguments.length;I++)this.add(arguments[I]);return this}return A===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",A),this):(A&&A.isObject3D?(A.parent!==null&&A.parent.remove(A),A.parent=this,this.children.push(A),A.dispatchEvent(Gn)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",A),this)}remove(A){if(arguments.length>1){for(let g=0;g<arguments.length;g++)this.remove(arguments[g]);return this}const I=this.children.indexOf(A);return I!==-1&&(A.parent=null,this.children.splice(I,1),A.dispatchEvent(bt)),this}removeFromParent(){const A=this.parent;return A!==null&&A.remove(this),this}clear(){for(let A=0;A<this.children.length;A++){const I=this.children[A];I.parent=null,I.dispatchEvent(bt)}return this.children.length=0,this}attach(A){return this.updateWorldMatrix(!0,!1),xg.copy(this.matrixWorld).invert(),A.parent!==null&&(A.parent.updateWorldMatrix(!0,!1),xg.multiply(A.parent.matrixWorld)),A.applyMatrix4(xg),this.add(A),A.updateWorldMatrix(!1,!0),this}getObjectById(A){return this.getObjectByProperty("id",A)}getObjectByName(A){return this.getObjectByProperty("name",A)}getObjectByProperty(A,I){if(this[A]===I)return this;for(let g=0,C=this.children.length;g<C;g++){const E=this.children[g].getObjectByProperty(A,I);if(E!==void 0)return E}}getObjectsByProperty(A,I){let g=[];this[A]===I&&g.push(this);for(let C=0,B=this.children.length;C<B;C++){const E=this.children[C].getObjectsByProperty(A,I);E.length>0&&(g=g.concat(E))}return g}getWorldPosition(A){return this.updateWorldMatrix(!0,!1),A.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(A){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(HB,A,cn),A}getWorldScale(A){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(HB,wn,A),A}getWorldDirection(A){this.updateWorldMatrix(!0,!1);const I=this.matrixWorld.elements;return A.set(I[8],I[9],I[10]).normalize()}raycast(){}traverse(A){A(this);const I=this.children;for(let g=0,C=I.length;g<C;g++)I[g].traverse(A)}traverseVisible(A){if(this.visible===!1)return;A(this);const I=this.children;for(let g=0,C=I.length;g<C;g++)I[g].traverseVisible(A)}traverseAncestors(A){const I=this.parent;I!==null&&(A(I),I.traverseAncestors(A))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(A){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||A)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,A=!0);const I=this.children;for(let g=0,C=I.length;g<C;g++){const B=I[g];(B.matrixWorldAutoUpdate===!0||A===!0)&&B.updateMatrixWorld(A)}}updateWorldMatrix(A,I){const g=this.parent;if(A===!0&&g!==null&&g.matrixWorldAutoUpdate===!0&&g.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),I===!0){const C=this.children;for(let B=0,E=C.length;B<E;B++){const Q=C[B];Q.matrixWorldAutoUpdate===!0&&Q.updateWorldMatrix(!1,!0)}}}toJSON(A){const I=A===void 0||typeof A=="string",g={};I&&(A={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},g.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const C={};C.uuid=this.uuid,C.type=this.type,this.name!==""&&(C.name=this.name),this.castShadow===!0&&(C.castShadow=!0),this.receiveShadow===!0&&(C.receiveShadow=!0),this.visible===!1&&(C.visible=!1),this.frustumCulled===!1&&(C.frustumCulled=!1),this.renderOrder!==0&&(C.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(C.userData=this.userData),C.layers=this.layers.mask,C.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(C.matrixAutoUpdate=!1),this.isInstancedMesh&&(C.type="InstancedMesh",C.count=this.count,C.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(C.instanceColor=this.instanceColor.toJSON()));function B(Q,o){return Q[o.uuid]===void 0&&(Q[o.uuid]=o.toJSON(A)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?C.background=this.background.toJSON():this.background.isTexture&&(C.background=this.background.toJSON(A).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(C.environment=this.environment.toJSON(A).uuid);else if(this.isMesh||this.isLine||this.isPoints){C.geometry=B(A.geometries,this.geometry);const Q=this.geometry.parameters;if(Q!==void 0&&Q.shapes!==void 0){const o=Q.shapes;if(Array.isArray(o))for(let t=0,e=o.length;t<e;t++){const a=o[t];B(A.shapes,a)}else B(A.shapes,o)}}if(this.isSkinnedMesh&&(C.bindMode=this.bindMode,C.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(B(A.skeletons,this.skeleton),C.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const Q=[];for(let o=0,t=this.material.length;o<t;o++)Q.push(B(A.materials,this.material[o]));C.material=Q}else C.material=B(A.materials,this.material);if(this.children.length>0){C.children=[];for(let Q=0;Q<this.children.length;Q++)C.children.push(this.children[Q].toJSON(A).object)}if(this.animations.length>0){C.animations=[];for(let Q=0;Q<this.animations.length;Q++){const o=this.animations[Q];C.animations.push(B(A.animations,o))}}if(I){const Q=E(A.geometries),o=E(A.materials),t=E(A.textures),e=E(A.images),a=E(A.shapes),s=E(A.skeletons),D=E(A.animations),c=E(A.nodes);Q.length>0&&(g.geometries=Q),o.length>0&&(g.materials=o),t.length>0&&(g.textures=t),e.length>0&&(g.images=e),a.length>0&&(g.shapes=a),s.length>0&&(g.skeletons=s),D.length>0&&(g.animations=D),c.length>0&&(g.nodes=c)}return g.object=C,g;function E(Q){const o=[];for(const t in Q){const e=Q[t];delete e.metadata,o.push(e)}return o}}clone(A){return new this.constructor().copy(this,A)}copy(A,I=!0){if(this.name=A.name,this.up.copy(A.up),this.position.copy(A.position),this.rotation.order=A.rotation.order,this.quaternion.copy(A.quaternion),this.scale.copy(A.scale),this.matrix.copy(A.matrix),this.matrixWorld.copy(A.matrixWorld),this.matrixAutoUpdate=A.matrixAutoUpdate,this.matrixWorldNeedsUpdate=A.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=A.matrixWorldAutoUpdate,this.layers.mask=A.layers.mask,this.visible=A.visible,this.castShadow=A.castShadow,this.receiveShadow=A.receiveShadow,this.frustumCulled=A.frustumCulled,this.renderOrder=A.renderOrder,this.userData=JSON.parse(JSON.stringify(A.userData)),I===!0)for(let g=0;g<A.children.length;g++){const C=A.children[g];this.add(C.clone())}return this}}Ag.DefaultUp=new j(0,1,0);Ag.DefaultMatrixAutoUpdate=!0;Ag.DefaultMatrixWorldAutoUpdate=!0;const Gg=new j,Tg=new j,li=new j,bg=new j,VC=new j,jC=new j,vt=new j,Si=new j,yi=new j,ki=new j;class vg{constructor(A=new j,I=new j,g=new j){this.a=A,this.b=I,this.c=g}static getNormal(A,I,g,C){C.subVectors(g,I),Gg.subVectors(A,I),C.cross(Gg);const B=C.lengthSq();return B>0?C.multiplyScalar(1/Math.sqrt(B)):C.set(0,0,0)}static getBarycoord(A,I,g,C,B){Gg.subVectors(C,I),Tg.subVectors(g,I),li.subVectors(A,I);const E=Gg.dot(Gg),Q=Gg.dot(Tg),o=Gg.dot(li),t=Tg.dot(Tg),e=Tg.dot(li),a=E*t-Q*Q;if(a===0)return B.set(-2,-1,-1);const s=1/a,D=(t*o-Q*e)*s,c=(E*e-Q*o)*s;return B.set(1-D-c,c,D)}static containsPoint(A,I,g,C){return this.getBarycoord(A,I,g,C,bg),bg.x>=0&&bg.y>=0&&bg.x+bg.y<=1}static getUV(A,I,g,C,B,E,Q,o){return this.getBarycoord(A,I,g,C,bg),o.set(0,0),o.addScaledVector(B,bg.x),o.addScaledVector(E,bg.y),o.addScaledVector(Q,bg.z),o}static isFrontFacing(A,I,g,C){return Gg.subVectors(g,I),Tg.subVectors(A,I),Gg.cross(Tg).dot(C)<0}set(A,I,g){return this.a.copy(A),this.b.copy(I),this.c.copy(g),this}setFromPointsAndIndices(A,I,g,C){return this.a.copy(A[I]),this.b.copy(A[g]),this.c.copy(A[C]),this}setFromAttributeAndIndices(A,I,g,C){return this.a.fromBufferAttribute(A,I),this.b.fromBufferAttribute(A,g),this.c.fromBufferAttribute(A,C),this}clone(){return new this.constructor().copy(this)}copy(A){return this.a.copy(A.a),this.b.copy(A.b),this.c.copy(A.c),this}getArea(){return Gg.subVectors(this.c,this.b),Tg.subVectors(this.a,this.b),Gg.cross(Tg).length()*.5}getMidpoint(A){return A.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(A){return vg.getNormal(this.a,this.b,this.c,A)}getPlane(A){return A.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(A,I){return vg.getBarycoord(A,this.a,this.b,this.c,I)}getUV(A,I,g,C,B){return vg.getUV(A,this.a,this.b,this.c,I,g,C,B)}containsPoint(A){return vg.containsPoint(A,this.a,this.b,this.c)}isFrontFacing(A){return vg.isFrontFacing(this.a,this.b,this.c,A)}intersectsBox(A){return A.intersectsTriangle(this)}closestPointToPoint(A,I){const g=this.a,C=this.b,B=this.c;let E,Q;VC.subVectors(C,g),jC.subVectors(B,g),Si.subVectors(A,g);const o=VC.dot(Si),t=jC.dot(Si);if(o<=0&&t<=0)return I.copy(g);yi.subVectors(A,C);const e=VC.dot(yi),a=jC.dot(yi);if(e>=0&&a<=e)return I.copy(C);const s=o*a-e*t;if(s<=0&&o>=0&&e<=0)return E=o/(o-e),I.copy(g).addScaledVector(VC,E);ki.subVectors(A,B);const D=VC.dot(ki),c=jC.dot(ki);if(c>=0&&D<=c)return I.copy(B);const r=D*t-o*c;if(r<=0&&t>=0&&c<=0)return Q=t/(t-c),I.copy(g).addScaledVector(jC,Q);const n=e*c-D*a;if(n<=0&&a-e>=0&&D-c>=0)return vt.subVectors(B,C),Q=(a-e)/(a-e+(D-c)),I.copy(C).addScaledVector(vt,Q);const l=1/(n+r+s);return E=r*l,Q=s*l,I.copy(g).addScaledVector(VC,E).addScaledVector(jC,Q)}equals(A){return A.a.equals(this.a)&&A.b.equals(this.b)&&A.c.equals(this.c)}}let ln=0;class wQ extends yB{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ln++}),this.uuid=rQ(),this.name="",this.type="Material",this.blending=iB,this.side=oC,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=ta,this.blendDst=ea,this.blendEquation=BB,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Pi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=on,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(A){this._alphaTest>0!=A>0&&this.version++,this._alphaTest=A}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(A){if(A!==void 0)for(const I in A){const g=A[I];if(g===void 0){console.warn("THREE.Material: '"+I+"' parameter is undefined.");continue}const C=this[I];if(C===void 0){console.warn("THREE."+this.type+": '"+I+"' is not a property of this material.");continue}C&&C.isColor?C.set(g):C&&C.isVector3&&g&&g.isVector3?C.copy(g):this[I]=g}}toJSON(A){const I=A===void 0||typeof A=="string";I&&(A={textures:{},images:{}});const g={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};g.uuid=this.uuid,g.type=this.type,this.name!==""&&(g.name=this.name),this.color&&this.color.isColor&&(g.color=this.color.getHex()),this.roughness!==void 0&&(g.roughness=this.roughness),this.metalness!==void 0&&(g.metalness=this.metalness),this.sheen!==void 0&&(g.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(g.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(g.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(g.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(g.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(g.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(g.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(g.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(g.shininess=this.shininess),this.clearcoat!==void 0&&(g.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(g.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(g.clearcoatMap=this.clearcoatMap.toJSON(A).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(g.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(A).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(g.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(A).uuid,g.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(g.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(g.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(g.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(g.iridescenceMap=this.iridescenceMap.toJSON(A).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(g.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(A).uuid),this.map&&this.map.isTexture&&(g.map=this.map.toJSON(A).uuid),this.matcap&&this.matcap.isTexture&&(g.matcap=this.matcap.toJSON(A).uuid),this.alphaMap&&this.alphaMap.isTexture&&(g.alphaMap=this.alphaMap.toJSON(A).uuid),this.lightMap&&this.lightMap.isTexture&&(g.lightMap=this.lightMap.toJSON(A).uuid,g.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(g.aoMap=this.aoMap.toJSON(A).uuid,g.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(g.bumpMap=this.bumpMap.toJSON(A).uuid,g.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(g.normalMap=this.normalMap.toJSON(A).uuid,g.normalMapType=this.normalMapType,g.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(g.displacementMap=this.displacementMap.toJSON(A).uuid,g.displacementScale=this.displacementScale,g.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(g.roughnessMap=this.roughnessMap.toJSON(A).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(g.metalnessMap=this.metalnessMap.toJSON(A).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(g.emissiveMap=this.emissiveMap.toJSON(A).uuid),this.specularMap&&this.specularMap.isTexture&&(g.specularMap=this.specularMap.toJSON(A).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(g.specularIntensityMap=this.specularIntensityMap.toJSON(A).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(g.specularColorMap=this.specularColorMap.toJSON(A).uuid),this.envMap&&this.envMap.isTexture&&(g.envMap=this.envMap.toJSON(A).uuid,this.combine!==void 0&&(g.combine=this.combine)),this.envMapIntensity!==void 0&&(g.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(g.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(g.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(g.gradientMap=this.gradientMap.toJSON(A).uuid),this.transmission!==void 0&&(g.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(g.transmissionMap=this.transmissionMap.toJSON(A).uuid),this.thickness!==void 0&&(g.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(g.thicknessMap=this.thicknessMap.toJSON(A).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(g.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(g.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(g.size=this.size),this.shadowSide!==null&&(g.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(g.sizeAttenuation=this.sizeAttenuation),this.blending!==iB&&(g.blending=this.blending),this.side!==oC&&(g.side=this.side),this.vertexColors&&(g.vertexColors=!0),this.opacity<1&&(g.opacity=this.opacity),this.transparent===!0&&(g.transparent=this.transparent),g.depthFunc=this.depthFunc,g.depthTest=this.depthTest,g.depthWrite=this.depthWrite,g.colorWrite=this.colorWrite,g.stencilWrite=this.stencilWrite,g.stencilWriteMask=this.stencilWriteMask,g.stencilFunc=this.stencilFunc,g.stencilRef=this.stencilRef,g.stencilFuncMask=this.stencilFuncMask,g.stencilFail=this.stencilFail,g.stencilZFail=this.stencilZFail,g.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(g.rotation=this.rotation),this.polygonOffset===!0&&(g.polygonOffset=!0),this.polygonOffsetFactor!==0&&(g.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(g.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(g.linewidth=this.linewidth),this.dashSize!==void 0&&(g.dashSize=this.dashSize),this.gapSize!==void 0&&(g.gapSize=this.gapSize),this.scale!==void 0&&(g.scale=this.scale),this.dithering===!0&&(g.dithering=!0),this.alphaTest>0&&(g.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(g.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(g.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(g.wireframe=this.wireframe),this.wireframeLinewidth>1&&(g.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(g.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(g.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(g.flatShading=this.flatShading),this.visible===!1&&(g.visible=!1),this.toneMapped===!1&&(g.toneMapped=!1),this.fog===!1&&(g.fog=!1),Object.keys(this.userData).length>0&&(g.userData=this.userData);function C(B){const E=[];for(const Q in B){const o=B[Q];delete o.metadata,E.push(o)}return E}if(I){const B=C(A.textures),E=C(A.images);B.length>0&&(g.textures=B),E.length>0&&(g.images=E)}return g}clone(){return new this.constructor().copy(this)}copy(A){this.name=A.name,this.blending=A.blending,this.side=A.side,this.vertexColors=A.vertexColors,this.opacity=A.opacity,this.transparent=A.transparent,this.blendSrc=A.blendSrc,this.blendDst=A.blendDst,this.blendEquation=A.blendEquation,this.blendSrcAlpha=A.blendSrcAlpha,this.blendDstAlpha=A.blendDstAlpha,this.blendEquationAlpha=A.blendEquationAlpha,this.depthFunc=A.depthFunc,this.depthTest=A.depthTest,this.depthWrite=A.depthWrite,this.stencilWriteMask=A.stencilWriteMask,this.stencilFunc=A.stencilFunc,this.stencilRef=A.stencilRef,this.stencilFuncMask=A.stencilFuncMask,this.stencilFail=A.stencilFail,this.stencilZFail=A.stencilZFail,this.stencilZPass=A.stencilZPass,this.stencilWrite=A.stencilWrite;const I=A.clippingPlanes;let g=null;if(I!==null){const C=I.length;g=new Array(C);for(let B=0;B!==C;++B)g[B]=I[B].clone()}return this.clippingPlanes=g,this.clipIntersection=A.clipIntersection,this.clipShadows=A.clipShadows,this.shadowSide=A.shadowSide,this.colorWrite=A.colorWrite,this.precision=A.precision,this.polygonOffset=A.polygonOffset,this.polygonOffsetFactor=A.polygonOffsetFactor,this.polygonOffsetUnits=A.polygonOffsetUnits,this.dithering=A.dithering,this.alphaTest=A.alphaTest,this.alphaToCoverage=A.alphaToCoverage,this.premultipliedAlpha=A.premultipliedAlpha,this.visible=A.visible,this.toneMapped=A.toneMapped,this.userData=JSON.parse(JSON.stringify(A.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(A){A===!0&&this.version++}}class LE extends wQ{constructor(A){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $A(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ro,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.lightMap=A.lightMap,this.lightMapIntensity=A.lightMapIntensity,this.aoMap=A.aoMap,this.aoMapIntensity=A.aoMapIntensity,this.specularMap=A.specularMap,this.alphaMap=A.alphaMap,this.envMap=A.envMap,this.combine=A.combine,this.reflectivity=A.reflectivity,this.refractionRatio=A.refractionRatio,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.wireframeLinecap=A.wireframeLinecap,this.wireframeLinejoin=A.wireframeLinejoin,this.fog=A.fog,this}}const RI=new j,WQ=new AI;class Fg{constructor(A,I,g=!1){if(Array.isArray(A))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=A,this.itemSize=I,this.count=A!==void 0?A.length/I:0,this.normalized=g,this.usage=Jt,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(A){A===!0&&this.version++}setUsage(A){return this.usage=A,this}copy(A){return this.name=A.name,this.array=new A.array.constructor(A.array),this.itemSize=A.itemSize,this.count=A.count,this.normalized=A.normalized,this.usage=A.usage,this}copyAt(A,I,g){A*=this.itemSize,g*=I.itemSize;for(let C=0,B=this.itemSize;C<B;C++)this.array[A+C]=I.array[g+C];return this}copyArray(A){return this.array.set(A),this}applyMatrix3(A){if(this.itemSize===2)for(let I=0,g=this.count;I<g;I++)WQ.fromBufferAttribute(this,I),WQ.applyMatrix3(A),this.setXY(I,WQ.x,WQ.y);else if(this.itemSize===3)for(let I=0,g=this.count;I<g;I++)RI.fromBufferAttribute(this,I),RI.applyMatrix3(A),this.setXYZ(I,RI.x,RI.y,RI.z);return this}applyMatrix4(A){for(let I=0,g=this.count;I<g;I++)RI.fromBufferAttribute(this,I),RI.applyMatrix4(A),this.setXYZ(I,RI.x,RI.y,RI.z);return this}applyNormalMatrix(A){for(let I=0,g=this.count;I<g;I++)RI.fromBufferAttribute(this,I),RI.applyNormalMatrix(A),this.setXYZ(I,RI.x,RI.y,RI.z);return this}transformDirection(A){for(let I=0,g=this.count;I<g;I++)RI.fromBufferAttribute(this,I),RI.transformDirection(A),this.setXYZ(I,RI.x,RI.y,RI.z);return this}set(A,I=0){return this.array.set(A,I),this}getX(A){let I=this.array[A*this.itemSize];return this.normalized&&(I=uQ(I,this.array)),I}setX(A,I){return this.normalized&&(I=Cg(I,this.array)),this.array[A*this.itemSize]=I,this}getY(A){let I=this.array[A*this.itemSize+1];return this.normalized&&(I=uQ(I,this.array)),I}setY(A,I){return this.normalized&&(I=Cg(I,this.array)),this.array[A*this.itemSize+1]=I,this}getZ(A){let I=this.array[A*this.itemSize+2];return this.normalized&&(I=uQ(I,this.array)),I}setZ(A,I){return this.normalized&&(I=Cg(I,this.array)),this.array[A*this.itemSize+2]=I,this}getW(A){let I=this.array[A*this.itemSize+3];return this.normalized&&(I=uQ(I,this.array)),I}setW(A,I){return this.normalized&&(I=Cg(I,this.array)),this.array[A*this.itemSize+3]=I,this}setXY(A,I,g){return A*=this.itemSize,this.normalized&&(I=Cg(I,this.array),g=Cg(g,this.array)),this.array[A+0]=I,this.array[A+1]=g,this}setXYZ(A,I,g,C){return A*=this.itemSize,this.normalized&&(I=Cg(I,this.array),g=Cg(g,this.array),C=Cg(C,this.array)),this.array[A+0]=I,this.array[A+1]=g,this.array[A+2]=C,this}setXYZW(A,I,g,C,B){return A*=this.itemSize,this.normalized&&(I=Cg(I,this.array),g=Cg(g,this.array),C=Cg(C,this.array),B=Cg(B,this.array)),this.array[A+0]=I,this.array[A+1]=g,this.array[A+2]=C,this.array[A+3]=B,this}onUpload(A){return this.onUploadCallback=A,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const A={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(A.name=this.name),this.usage!==Jt&&(A.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(A.updateRange=this.updateRange),A}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Sa extends Fg{constructor(A,I,g){super(new Uint16Array(A),I,g)}}class ya extends Fg{constructor(A,I,g){super(new Uint32Array(A),I,g)}}class QC extends Fg{constructor(A,I,g){super(new Float32Array(A),I,g)}}let Sn=0;const tg=new MI,Mi=new Ag,XC=new j,Qg=new kB,mB=new kB,qI=new j;class Zg extends yB{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sn++}),this.uuid=rQ(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(A){return Array.isArray(A)?this.index=new(ra(A)?ya:Sa)(A,1):this.index=A,this}getAttribute(A){return this.attributes[A]}setAttribute(A,I){return this.attributes[A]=I,this}deleteAttribute(A){return delete this.attributes[A],this}hasAttribute(A){return this.attributes[A]!==void 0}addGroup(A,I,g=0){this.groups.push({start:A,count:I,materialIndex:g})}clearGroups(){this.groups=[]}setDrawRange(A,I){this.drawRange.start=A,this.drawRange.count=I}applyMatrix4(A){const I=this.attributes.position;I!==void 0&&(I.applyMatrix4(A),I.needsUpdate=!0);const g=this.attributes.normal;if(g!==void 0){const B=new $I().getNormalMatrix(A);g.applyNormalMatrix(B),g.needsUpdate=!0}const C=this.attributes.tangent;return C!==void 0&&(C.transformDirection(A),C.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(A){return tg.makeRotationFromQuaternion(A),this.applyMatrix4(tg),this}rotateX(A){return tg.makeRotationX(A),this.applyMatrix4(tg),this}rotateY(A){return tg.makeRotationY(A),this.applyMatrix4(tg),this}rotateZ(A){return tg.makeRotationZ(A),this.applyMatrix4(tg),this}translate(A,I,g){return tg.makeTranslation(A,I,g),this.applyMatrix4(tg),this}scale(A,I,g){return tg.makeScale(A,I,g),this.applyMatrix4(tg),this}lookAt(A){return Mi.lookAt(A),Mi.updateMatrix(),this.applyMatrix4(Mi.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(XC).negate(),this.translate(XC.x,XC.y,XC.z),this}setFromPoints(A){const I=[];for(let g=0,C=A.length;g<C;g++){const B=A[g];I.push(B.x,B.y,B.z||0)}return this.setAttribute("position",new QC(I,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kB);const A=this.attributes.position,I=this.morphAttributes.position;if(A&&A.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(A!==void 0){if(this.boundingBox.setFromBufferAttribute(A),I)for(let g=0,C=I.length;g<C;g++){const B=I[g];Qg.setFromBufferAttribute(B),this.morphTargetsRelative?(qI.addVectors(this.boundingBox.min,Qg.min),this.boundingBox.expandByPoint(qI),qI.addVectors(this.boundingBox.max,Qg.max),this.boundingBox.expandByPoint(qI)):(this.boundingBox.expandByPoint(Qg.min),this.boundingBox.expandByPoint(Qg.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new uE);const A=this.attributes.position,I=this.morphAttributes.position;if(A&&A.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new j,1/0);return}if(A){const g=this.boundingSphere.center;if(Qg.setFromBufferAttribute(A),I)for(let B=0,E=I.length;B<E;B++){const Q=I[B];mB.setFromBufferAttribute(Q),this.morphTargetsRelative?(qI.addVectors(Qg.min,mB.min),Qg.expandByPoint(qI),qI.addVectors(Qg.max,mB.max),Qg.expandByPoint(qI)):(Qg.expandByPoint(mB.min),Qg.expandByPoint(mB.max))}Qg.getCenter(g);let C=0;for(let B=0,E=A.count;B<E;B++)qI.fromBufferAttribute(A,B),C=Math.max(C,g.distanceToSquared(qI));if(I)for(let B=0,E=I.length;B<E;B++){const Q=I[B],o=this.morphTargetsRelative;for(let t=0,e=Q.count;t<e;t++)qI.fromBufferAttribute(Q,t),o&&(XC.fromBufferAttribute(A,t),qI.add(XC)),C=Math.max(C,g.distanceToSquared(qI))}this.boundingSphere.radius=Math.sqrt(C),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const A=this.index,I=this.attributes;if(A===null||I.position===void 0||I.normal===void 0||I.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const g=A.array,C=I.position.array,B=I.normal.array,E=I.uv.array,Q=C.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fg(new Float32Array(4*Q),4));const o=this.getAttribute("tangent").array,t=[],e=[];for(let L=0;L<Q;L++)t[L]=new j,e[L]=new j;const a=new j,s=new j,D=new j,c=new AI,r=new AI,n=new AI,l=new j,G=new j;function S(L,X,u){a.fromArray(C,L*3),s.fromArray(C,X*3),D.fromArray(C,u*3),c.fromArray(E,L*2),r.fromArray(E,X*2),n.fromArray(E,u*2),s.sub(a),D.sub(a),r.sub(c),n.sub(c);const q=1/(r.x*n.y-n.x*r.y);!isFinite(q)||(l.copy(s).multiplyScalar(n.y).addScaledVector(D,-r.y).multiplyScalar(q),G.copy(D).multiplyScalar(r.x).addScaledVector(s,-n.x).multiplyScalar(q),t[L].add(l),t[X].add(l),t[u].add(l),e[L].add(G),e[X].add(G),e[u].add(G))}let k=this.groups;k.length===0&&(k=[{start:0,count:g.length}]);for(let L=0,X=k.length;L<X;++L){const u=k[L],q=u.start,J=u.count;for(let m=q,P=q+J;m<P;m+=3)S(g[m+0],g[m+1],g[m+2])}const M=new j,K=new j,U=new j,w=new j;function d(L){U.fromArray(B,L*3),w.copy(U);const X=t[L];M.copy(X),M.sub(U.multiplyScalar(U.dot(X))).normalize(),K.crossVectors(w,X);const q=K.dot(e[L])<0?-1:1;o[L*4]=M.x,o[L*4+1]=M.y,o[L*4+2]=M.z,o[L*4+3]=q}for(let L=0,X=k.length;L<X;++L){const u=k[L],q=u.start,J=u.count;for(let m=q,P=q+J;m<P;m+=3)d(g[m+0]),d(g[m+1]),d(g[m+2])}}computeVertexNormals(){const A=this.index,I=this.getAttribute("position");if(I!==void 0){let g=this.getAttribute("normal");if(g===void 0)g=new Fg(new Float32Array(I.count*3),3),this.setAttribute("normal",g);else for(let s=0,D=g.count;s<D;s++)g.setXYZ(s,0,0,0);const C=new j,B=new j,E=new j,Q=new j,o=new j,t=new j,e=new j,a=new j;if(A)for(let s=0,D=A.count;s<D;s+=3){const c=A.getX(s+0),r=A.getX(s+1),n=A.getX(s+2);C.fromBufferAttribute(I,c),B.fromBufferAttribute(I,r),E.fromBufferAttribute(I,n),e.subVectors(E,B),a.subVectors(C,B),e.cross(a),Q.fromBufferAttribute(g,c),o.fromBufferAttribute(g,r),t.fromBufferAttribute(g,n),Q.add(e),o.add(e),t.add(e),g.setXYZ(c,Q.x,Q.y,Q.z),g.setXYZ(r,o.x,o.y,o.z),g.setXYZ(n,t.x,t.y,t.z)}else for(let s=0,D=I.count;s<D;s+=3)C.fromBufferAttribute(I,s+0),B.fromBufferAttribute(I,s+1),E.fromBufferAttribute(I,s+2),e.subVectors(E,B),a.subVectors(C,B),e.cross(a),g.setXYZ(s+0,e.x,e.y,e.z),g.setXYZ(s+1,e.x,e.y,e.z),g.setXYZ(s+2,e.x,e.y,e.z);this.normalizeNormals(),g.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeBufferGeometries() instead."),this}normalizeNormals(){const A=this.attributes.normal;for(let I=0,g=A.count;I<g;I++)qI.fromBufferAttribute(A,I),qI.normalize(),A.setXYZ(I,qI.x,qI.y,qI.z)}toNonIndexed(){function A(Q,o){const t=Q.array,e=Q.itemSize,a=Q.normalized,s=new t.constructor(o.length*e);let D=0,c=0;for(let r=0,n=o.length;r<n;r++){Q.isInterleavedBufferAttribute?D=o[r]*Q.data.stride+Q.offset:D=o[r]*e;for(let l=0;l<e;l++)s[c++]=t[D++]}return new Fg(s,e,a)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const I=new Zg,g=this.index.array,C=this.attributes;for(const Q in C){const o=C[Q],t=A(o,g);I.setAttribute(Q,t)}const B=this.morphAttributes;for(const Q in B){const o=[],t=B[Q];for(let e=0,a=t.length;e<a;e++){const s=t[e],D=A(s,g);o.push(D)}I.morphAttributes[Q]=o}I.morphTargetsRelative=this.morphTargetsRelative;const E=this.groups;for(let Q=0,o=E.length;Q<o;Q++){const t=E[Q];I.addGroup(t.start,t.count,t.materialIndex)}return I}toJSON(){const A={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(A.uuid=this.uuid,A.type=this.type,this.name!==""&&(A.name=this.name),Object.keys(this.userData).length>0&&(A.userData=this.userData),this.parameters!==void 0){const o=this.parameters;for(const t in o)o[t]!==void 0&&(A[t]=o[t]);return A}A.data={attributes:{}};const I=this.index;I!==null&&(A.data.index={type:I.array.constructor.name,array:Array.prototype.slice.call(I.array)});const g=this.attributes;for(const o in g){const t=g[o];A.data.attributes[o]=t.toJSON(A.data)}const C={};let B=!1;for(const o in this.morphAttributes){const t=this.morphAttributes[o],e=[];for(let a=0,s=t.length;a<s;a++){const D=t[a];e.push(D.toJSON(A.data))}e.length>0&&(C[o]=e,B=!0)}B&&(A.data.morphAttributes=C,A.data.morphTargetsRelative=this.morphTargetsRelative);const E=this.groups;E.length>0&&(A.data.groups=JSON.parse(JSON.stringify(E)));const Q=this.boundingSphere;return Q!==null&&(A.data.boundingSphere={center:Q.center.toArray(),radius:Q.radius}),A}clone(){return new this.constructor().copy(this)}copy(A){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const I={};this.name=A.name;const g=A.index;g!==null&&this.setIndex(g.clone(I));const C=A.attributes;for(const t in C){const e=C[t];this.setAttribute(t,e.clone(I))}const B=A.morphAttributes;for(const t in B){const e=[],a=B[t];for(let s=0,D=a.length;s<D;s++)e.push(a[s].clone(I));this.morphAttributes[t]=e}this.morphTargetsRelative=A.morphTargetsRelative;const E=A.groups;for(let t=0,e=E.length;t<e;t++){const a=E[t];this.addGroup(a.start,a.count,a.materialIndex)}const Q=A.boundingBox;Q!==null&&(this.boundingBox=Q.clone());const o=A.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=A.drawRange.start,this.drawRange.count=A.drawRange.count,this.userData=A.userData,A.parameters!==void 0&&(this.parameters=Object.assign({},A.parameters)),this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wt=new MI,zC=new nn,Fi=new uE,xB=new j,TB=new j,bB=new j,Ri=new j,OQ=new j,_Q=new AI,PQ=new AI,ZQ=new AI,Ni=new j,VQ=new j;class ng extends Ag{constructor(A=new Zg,I=new LE){super(),this.isMesh=!0,this.type="Mesh",this.geometry=A,this.material=I,this.updateMorphTargets()}copy(A,I){return super.copy(A,I),A.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=A.morphTargetInfluences.slice()),A.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},A.morphTargetDictionary)),this.material=A.material,this.geometry=A.geometry,this}updateMorphTargets(){const I=this.geometry.morphAttributes,g=Object.keys(I);if(g.length>0){const C=I[g[0]];if(C!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let B=0,E=C.length;B<E;B++){const Q=C[B].name||String(B);this.morphTargetInfluences.push(0),this.morphTargetDictionary[Q]=B}}}}getVertexPosition(A,I){const g=this.geometry,C=g.attributes.position,B=g.morphAttributes.position,E=g.morphTargetsRelative;I.fromBufferAttribute(C,A);const Q=this.morphTargetInfluences;if(B&&Q){OQ.set(0,0,0);for(let o=0,t=B.length;o<t;o++){const e=Q[o],a=B[o];e!==0&&(Ri.fromBufferAttribute(a,A),E?OQ.addScaledVector(Ri,e):OQ.addScaledVector(Ri.sub(I),e))}I.add(OQ)}return this.isSkinnedMesh&&this.boneTransform(A,I),I}raycast(A,I){const g=this.geometry,C=this.material,B=this.matrixWorld;if(C===void 0||(g.boundingSphere===null&&g.computeBoundingSphere(),Fi.copy(g.boundingSphere),Fi.applyMatrix4(B),A.ray.intersectsSphere(Fi)===!1)||(Wt.copy(B).invert(),zC.copy(A.ray).applyMatrix4(Wt),g.boundingBox!==null&&zC.intersectsBox(g.boundingBox)===!1))return;let E;const Q=g.index,o=g.attributes.position,t=g.attributes.uv,e=g.attributes.uv2,a=g.groups,s=g.drawRange;if(Q!==null)if(Array.isArray(C))for(let D=0,c=a.length;D<c;D++){const r=a[D],n=C[r.materialIndex],l=Math.max(r.start,s.start),G=Math.min(Q.count,Math.min(r.start+r.count,s.start+s.count));for(let S=l,k=G;S<k;S+=3){const M=Q.getX(S),K=Q.getX(S+1),U=Q.getX(S+2);E=jQ(this,n,A,zC,t,e,M,K,U),E&&(E.faceIndex=Math.floor(S/3),E.face.materialIndex=r.materialIndex,I.push(E))}}else{const D=Math.max(0,s.start),c=Math.min(Q.count,s.start+s.count);for(let r=D,n=c;r<n;r+=3){const l=Q.getX(r),G=Q.getX(r+1),S=Q.getX(r+2);E=jQ(this,C,A,zC,t,e,l,G,S),E&&(E.faceIndex=Math.floor(r/3),I.push(E))}}else if(o!==void 0)if(Array.isArray(C))for(let D=0,c=a.length;D<c;D++){const r=a[D],n=C[r.materialIndex],l=Math.max(r.start,s.start),G=Math.min(o.count,Math.min(r.start+r.count,s.start+s.count));for(let S=l,k=G;S<k;S+=3){const M=S,K=S+1,U=S+2;E=jQ(this,n,A,zC,t,e,M,K,U),E&&(E.faceIndex=Math.floor(S/3),E.face.materialIndex=r.materialIndex,I.push(E))}}else{const D=Math.max(0,s.start),c=Math.min(o.count,s.start+s.count);for(let r=D,n=c;r<n;r+=3){const l=r,G=r+1,S=r+2;E=jQ(this,C,A,zC,t,e,l,G,S),E&&(E.faceIndex=Math.floor(r/3),I.push(E))}}}}function yn(i,A,I,g,C,B,E,Q){let o;if(A.side===ig?o=g.intersectTriangle(E,B,C,!0,Q):o=g.intersectTriangle(C,B,E,A.side===oC,Q),o===null)return null;VQ.copy(Q),VQ.applyMatrix4(i.matrixWorld);const t=I.ray.origin.distanceTo(VQ);return t<I.near||t>I.far?null:{distance:t,point:VQ.clone(),object:i}}function jQ(i,A,I,g,C,B,E,Q,o){i.getVertexPosition(E,xB),i.getVertexPosition(Q,TB),i.getVertexPosition(o,bB);const t=yn(i,A,I,g,xB,TB,bB,Ni);if(t){C&&(_Q.fromBufferAttribute(C,E),PQ.fromBufferAttribute(C,Q),ZQ.fromBufferAttribute(C,o),t.uv=vg.getUV(Ni,xB,TB,bB,_Q,PQ,ZQ,new AI)),B&&(_Q.fromBufferAttribute(B,E),PQ.fromBufferAttribute(B,Q),ZQ.fromBufferAttribute(B,o),t.uv2=vg.getUV(Ni,xB,TB,bB,_Q,PQ,ZQ,new AI));const e={a:E,b:Q,c:o,normal:new j,materialIndex:0};vg.getNormal(xB,TB,bB,e.normal),t.face=e}return t}class GQ extends Zg{constructor(A=1,I=1,g=1,C=1,B=1,E=1){super(),this.type="BoxGeometry",this.parameters={width:A,height:I,depth:g,widthSegments:C,heightSegments:B,depthSegments:E};const Q=this;C=Math.floor(C),B=Math.floor(B),E=Math.floor(E);const o=[],t=[],e=[],a=[];let s=0,D=0;c("z","y","x",-1,-1,g,I,A,E,B,0),c("z","y","x",1,-1,g,I,-A,E,B,1),c("x","z","y",1,1,A,g,I,C,E,2),c("x","z","y",1,-1,A,g,-I,C,E,3),c("x","y","z",1,-1,A,I,g,C,B,4),c("x","y","z",-1,-1,A,I,-g,C,B,5),this.setIndex(o),this.setAttribute("position",new QC(t,3)),this.setAttribute("normal",new QC(e,3)),this.setAttribute("uv",new QC(a,2));function c(r,n,l,G,S,k,M,K,U,w,d){const L=k/U,X=M/w,u=k/2,q=M/2,J=K/2,m=U+1,P=w+1;let iA=0,V=0;const b=new j;for(let v=0;v<P;v++){const N=v*X-q;for(let p=0;p<m;p++){const Z=p*L-u;b[r]=Z*G,b[n]=N*S,b[l]=J,t.push(b.x,b.y,b.z),b[r]=0,b[n]=0,b[l]=K>0?1:-1,e.push(b.x,b.y,b.z),a.push(p/U),a.push(1-v/w),iA+=1}}for(let v=0;v<w;v++)for(let N=0;N<U;N++){const p=s+N+m*v,Z=s+N+m*(v+1),O=s+(N+1)+m*(v+1),W=s+(N+1)+m*v;o.push(p,Z,W),o.push(Z,O,W),V+=6}Q.addGroup(D,V,d),D+=V,s+=iA}}static fromJSON(A){return new GQ(A.width,A.height,A.depth,A.widthSegments,A.heightSegments,A.depthSegments)}}function hB(i){const A={};for(const I in i){A[I]={};for(const g in i[I]){const C=i[I][g];C&&(C.isColor||C.isMatrix3||C.isMatrix4||C.isVector2||C.isVector3||C.isVector4||C.isTexture||C.isQuaternion)?A[I][g]=C.clone():Array.isArray(C)?A[I][g]=C.slice():A[I][g]=C}}return A}function OI(i){const A={};for(let I=0;I<i.length;I++){const g=hB(i[I]);for(const C in g)A[C]=g[C]}return A}function kn(i){const A=[];for(let I=0;I<i.length;I++)A.push(i[I].clone());return A}function ka(i){return i.getRenderTarget()===null&&i.outputEncoding===hI?Ug:iQ}const Ma={clone:hB,merge:OI};var Mn=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fn=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class JC extends wQ{constructor(A){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mn,this.fragmentShader=Fn,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,A!==void 0&&this.setValues(A)}copy(A){return super.copy(A),this.fragmentShader=A.fragmentShader,this.vertexShader=A.vertexShader,this.uniforms=hB(A.uniforms),this.uniformsGroups=kn(A.uniformsGroups),this.defines=Object.assign({},A.defines),this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.fog=A.fog,this.lights=A.lights,this.clipping=A.clipping,this.extensions=Object.assign({},A.extensions),this.glslVersion=A.glslVersion,this}toJSON(A){const I=super.toJSON(A);I.glslVersion=this.glslVersion,I.uniforms={};for(const C in this.uniforms){const E=this.uniforms[C].value;E&&E.isTexture?I.uniforms[C]={type:"t",value:E.toJSON(A).uuid}:E&&E.isColor?I.uniforms[C]={type:"c",value:E.getHex()}:E&&E.isVector2?I.uniforms[C]={type:"v2",value:E.toArray()}:E&&E.isVector3?I.uniforms[C]={type:"v3",value:E.toArray()}:E&&E.isVector4?I.uniforms[C]={type:"v4",value:E.toArray()}:E&&E.isMatrix3?I.uniforms[C]={type:"m3",value:E.toArray()}:E&&E.isMatrix4?I.uniforms[C]={type:"m4",value:E.toArray()}:I.uniforms[C]={value:E}}Object.keys(this.defines).length>0&&(I.defines=this.defines),I.vertexShader=this.vertexShader,I.fragmentShader=this.fragmentShader;const g={};for(const C in this.extensions)this.extensions[C]===!0&&(g[C]=!0);return Object.keys(g).length>0&&(I.extensions=g),I}}class Fa extends Ag{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new MI,this.projectionMatrix=new MI,this.projectionMatrixInverse=new MI}copy(A,I){return super.copy(A,I),this.matrixWorldInverse.copy(A.matrixWorldInverse),this.projectionMatrix.copy(A.projectionMatrix),this.projectionMatrixInverse.copy(A.projectionMatrixInverse),this}getWorldDirection(A){this.updateWorldMatrix(!0,!1);const I=this.matrixWorld.elements;return A.set(-I[8],-I[9],-I[10]).normalize()}updateMatrixWorld(A){super.updateMatrixWorld(A),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(A,I){super.updateWorldMatrix(A,I),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class sg extends Fa{constructor(A=50,I=1,g=.1,C=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=A,this.zoom=1,this.near=g,this.far=C,this.focus=10,this.aspect=I,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(A,I){return super.copy(A,I),this.fov=A.fov,this.zoom=A.zoom,this.near=A.near,this.far=A.far,this.focus=A.focus,this.aspect=A.aspect,this.view=A.view===null?null:Object.assign({},A.view),this.filmGauge=A.filmGauge,this.filmOffset=A.filmOffset,this}setFocalLength(A){const I=.5*this.getFilmHeight()/A;this.fov=ft*2*Math.atan(I),this.updateProjectionMatrix()}getFocalLength(){const A=Math.tan(ii*.5*this.fov);return .5*this.getFilmHeight()/A}getEffectiveFOV(){return ft*2*Math.atan(Math.tan(ii*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(A,I,g,C,B,E){this.aspect=A/I,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=A,this.view.fullHeight=I,this.view.offsetX=g,this.view.offsetY=C,this.view.width=B,this.view.height=E,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const A=this.near;let I=A*Math.tan(ii*.5*this.fov)/this.zoom,g=2*I,C=this.aspect*g,B=-.5*C;const E=this.view;if(this.view!==null&&this.view.enabled){const o=E.fullWidth,t=E.fullHeight;B+=E.offsetX*C/o,I-=E.offsetY*g/t,C*=E.width/o,g*=E.height/t}const Q=this.filmOffset;Q!==0&&(B+=A*Q/this.getFilmWidth()),this.projectionMatrix.makePerspective(B,B+C,I,I-g,A,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(A){const I=super.toJSON(A);return I.object.fov=this.fov,I.object.zoom=this.zoom,I.object.near=this.near,I.object.far=this.far,I.object.focus=this.focus,I.object.aspect=this.aspect,this.view!==null&&(I.object.view=Object.assign({},this.view)),I.object.filmGauge=this.filmGauge,I.object.filmOffset=this.filmOffset,I}}const $C=-90,AB=1;class Rn extends Ag{constructor(A,I,g){super(),this.type="CubeCamera",this.renderTarget=g;const C=new sg($C,AB,A,I);C.layers=this.layers,C.up.set(0,1,0),C.lookAt(1,0,0),this.add(C);const B=new sg($C,AB,A,I);B.layers=this.layers,B.up.set(0,1,0),B.lookAt(-1,0,0),this.add(B);const E=new sg($C,AB,A,I);E.layers=this.layers,E.up.set(0,0,-1),E.lookAt(0,1,0),this.add(E);const Q=new sg($C,AB,A,I);Q.layers=this.layers,Q.up.set(0,0,1),Q.lookAt(0,-1,0),this.add(Q);const o=new sg($C,AB,A,I);o.layers=this.layers,o.up.set(0,1,0),o.lookAt(0,0,1),this.add(o);const t=new sg($C,AB,A,I);t.layers=this.layers,t.up.set(0,1,0),t.lookAt(0,0,-1),this.add(t)}update(A,I){this.parent===null&&this.updateMatrixWorld();const g=this.renderTarget,[C,B,E,Q,o,t]=this.children,e=A.getRenderTarget(),a=A.toneMapping,s=A.xr.enabled;A.toneMapping=Wg,A.xr.enabled=!1;const D=g.texture.generateMipmaps;g.texture.generateMipmaps=!1,A.setRenderTarget(g,0),A.render(I,C),A.setRenderTarget(g,1),A.render(I,B),A.setRenderTarget(g,2),A.render(I,E),A.setRenderTarget(g,3),A.render(I,Q),A.setRenderTarget(g,4),A.render(I,o),g.texture.generateMipmaps=D,A.setRenderTarget(g,5),A.render(I,t),A.setRenderTarget(e),A.toneMapping=a,A.xr.enabled=s,g.texture.needsPMREMUpdate=!0}}class Ra extends PI{constructor(A,I,g,C,B,E,Q,o,t,e){A=A!==void 0?A:[],I=I!==void 0?I:nB,super(A,I,g,C,B,E,Q,o,t,e),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(A){this.image=A}}class Nn extends UC{constructor(A=1,I={}){super(A,A,I),this.isWebGLCubeRenderTarget=!0;const g={width:A,height:A,depth:1},C=[g,g,g,g,g,g];this.texture=new Ra(C,I.mapping,I.wrapS,I.wrapT,I.magFilter,I.minFilter,I.format,I.type,I.anisotropy,I.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=I.generateMipmaps!==void 0?I.generateMipmaps:!1,this.texture.minFilter=I.minFilter!==void 0?I.minFilter:zI}fromEquirectangularTexture(A,I){this.texture.type=I.type,this.texture.encoding=I.encoding,this.texture.generateMipmaps=I.generateMipmaps,this.texture.minFilter=I.minFilter,this.texture.magFilter=I.magFilter;const g={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},C=new GQ(5,5,5),B=new JC({name:"CubemapFromEquirect",uniforms:hB(g.uniforms),vertexShader:g.vertexShader,fragmentShader:g.fragmentShader,side:ig,blending:BC});B.uniforms.tEquirect.value=I;const E=new ng(C,B),Q=I.minFilter;return I.minFilter===QQ&&(I.minFilter=zI),new Rn(1,10,this).update(A,E),I.minFilter=Q,E.geometry.dispose(),E.material.dispose(),this}clear(A,I,g,C){const B=A.getRenderTarget();for(let E=0;E<6;E++)A.setRenderTarget(this,E),A.clear(I,g,C);A.setRenderTarget(B)}}const Ki=new j,Kn=new j,dn=new $I;class rC{constructor(A=new j(1,0,0),I=0){this.isPlane=!0,this.normal=A,this.constant=I}set(A,I){return this.normal.copy(A),this.constant=I,this}setComponents(A,I,g,C){return this.normal.set(A,I,g),this.constant=C,this}setFromNormalAndCoplanarPoint(A,I){return this.normal.copy(A),this.constant=-I.dot(this.normal),this}setFromCoplanarPoints(A,I,g){const C=Ki.subVectors(g,I).cross(Kn.subVectors(A,I)).normalize();return this.setFromNormalAndCoplanarPoint(C,A),this}copy(A){return this.normal.copy(A.normal),this.constant=A.constant,this}normalize(){const A=1/this.normal.length();return this.normal.multiplyScalar(A),this.constant*=A,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(A){return this.normal.dot(A)+this.constant}distanceToSphere(A){return this.distanceToPoint(A.center)-A.radius}projectPoint(A,I){return I.copy(this.normal).multiplyScalar(-this.distanceToPoint(A)).add(A)}intersectLine(A,I){const g=A.delta(Ki),C=this.normal.dot(g);if(C===0)return this.distanceToPoint(A.start)===0?I.copy(A.start):null;const B=-(A.start.dot(this.normal)+this.constant)/C;return B<0||B>1?null:I.copy(g).multiplyScalar(B).add(A.start)}intersectsLine(A){const I=this.distanceToPoint(A.start),g=this.distanceToPoint(A.end);return I<0&&g>0||g<0&&I>0}intersectsBox(A){return A.intersectsPlane(this)}intersectsSphere(A){return A.intersectsPlane(this)}coplanarPoint(A){return A.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(A,I){const g=I||dn.getNormalMatrix(A),C=this.coplanarPoint(Ki).applyMatrix4(A),B=this.normal.applyMatrix3(g).normalize();return this.constant=-C.dot(B),this}translate(A){return this.constant-=A.dot(this.normal),this}equals(A){return A.normal.equals(this.normal)&&A.constant===this.constant}clone(){return new this.constructor().copy(this)}}const IB=new uE,XQ=new j;class No{constructor(A=new rC,I=new rC,g=new rC,C=new rC,B=new rC,E=new rC){this.planes=[A,I,g,C,B,E]}set(A,I,g,C,B,E){const Q=this.planes;return Q[0].copy(A),Q[1].copy(I),Q[2].copy(g),Q[3].copy(C),Q[4].copy(B),Q[5].copy(E),this}copy(A){const I=this.planes;for(let g=0;g<6;g++)I[g].copy(A.planes[g]);return this}setFromProjectionMatrix(A){const I=this.planes,g=A.elements,C=g[0],B=g[1],E=g[2],Q=g[3],o=g[4],t=g[5],e=g[6],a=g[7],s=g[8],D=g[9],c=g[10],r=g[11],n=g[12],l=g[13],G=g[14],S=g[15];return I[0].setComponents(Q-C,a-o,r-s,S-n).normalize(),I[1].setComponents(Q+C,a+o,r+s,S+n).normalize(),I[2].setComponents(Q+B,a+t,r+D,S+l).normalize(),I[3].setComponents(Q-B,a-t,r-D,S-l).normalize(),I[4].setComponents(Q-E,a-e,r-c,S-G).normalize(),I[5].setComponents(Q+E,a+e,r+c,S+G).normalize(),this}intersectsObject(A){const I=A.geometry;return I.boundingSphere===null&&I.computeBoundingSphere(),IB.copy(I.boundingSphere).applyMatrix4(A.matrixWorld),this.intersectsSphere(IB)}intersectsSprite(A){return IB.center.set(0,0,0),IB.radius=.7071067811865476,IB.applyMatrix4(A.matrixWorld),this.intersectsSphere(IB)}intersectsSphere(A){const I=this.planes,g=A.center,C=-A.radius;for(let B=0;B<6;B++)if(I[B].distanceToPoint(g)<C)return!1;return!0}intersectsBox(A){const I=this.planes;for(let g=0;g<6;g++){const C=I[g];if(XQ.x=C.normal.x>0?A.max.x:A.min.x,XQ.y=C.normal.y>0?A.max.y:A.min.y,XQ.z=C.normal.z>0?A.max.z:A.min.z,C.distanceToPoint(XQ)<0)return!1}return!0}containsPoint(A){const I=this.planes;for(let g=0;g<6;g++)if(I[g].distanceToPoint(A)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Na(){let i=null,A=!1,I=null,g=null;function C(B,E){I(B,E),g=i.requestAnimationFrame(C)}return{start:function(){A!==!0&&I!==null&&(g=i.requestAnimationFrame(C),A=!0)},stop:function(){i.cancelAnimationFrame(g),A=!1},setAnimationLoop:function(B){I=B},setContext:function(B){i=B}}}function Un(i,A){const I=A.isWebGL2,g=new WeakMap;function C(t,e){const a=t.array,s=t.usage,D=i.createBuffer();i.bindBuffer(e,D),i.bufferData(e,a,s),t.onUploadCallback();let c;if(a instanceof Float32Array)c=5126;else if(a instanceof Uint16Array)if(t.isFloat16BufferAttribute)if(I)c=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else c=5123;else if(a instanceof Int16Array)c=5122;else if(a instanceof Uint32Array)c=5125;else if(a instanceof Int32Array)c=5124;else if(a instanceof Int8Array)c=5120;else if(a instanceof Uint8Array)c=5121;else if(a instanceof Uint8ClampedArray)c=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+a);return{buffer:D,type:c,bytesPerElement:a.BYTES_PER_ELEMENT,version:t.version}}function B(t,e,a){const s=e.array,D=e.updateRange;i.bindBuffer(a,t),D.count===-1?i.bufferSubData(a,0,s):(I?i.bufferSubData(a,D.offset*s.BYTES_PER_ELEMENT,s,D.offset,D.count):i.bufferSubData(a,D.offset*s.BYTES_PER_ELEMENT,s.subarray(D.offset,D.offset+D.count)),D.count=-1),e.onUploadCallback()}function E(t){return t.isInterleavedBufferAttribute&&(t=t.data),g.get(t)}function Q(t){t.isInterleavedBufferAttribute&&(t=t.data);const e=g.get(t);e&&(i.deleteBuffer(e.buffer),g.delete(t))}function o(t,e){if(t.isGLBufferAttribute){const s=g.get(t);(!s||s.version<t.version)&&g.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version});return}t.isInterleavedBufferAttribute&&(t=t.data);const a=g.get(t);a===void 0?g.set(t,C(t,e)):a.version<t.version&&(B(a.buffer,t,e),a.version=t.version)}return{get:E,remove:Q,update:o}}class pC extends Zg{constructor(A=1,I=1,g=1,C=1){super(),this.type="PlaneGeometry",this.parameters={width:A,height:I,widthSegments:g,heightSegments:C};const B=A/2,E=I/2,Q=Math.floor(g),o=Math.floor(C),t=Q+1,e=o+1,a=A/Q,s=I/o,D=[],c=[],r=[],n=[];for(let l=0;l<e;l++){const G=l*s-E;for(let S=0;S<t;S++){const k=S*a-B;c.push(k,-G,0),r.push(0,0,1),n.push(S/Q),n.push(1-l/o)}}for(let l=0;l<o;l++)for(let G=0;G<Q;G++){const S=G+t*l,k=G+t*(l+1),M=G+1+t*(l+1),K=G+1+t*l;D.push(S,k,K),D.push(k,M,K)}this.setIndex(D),this.setAttribute("position",new QC(c,3)),this.setAttribute("normal",new QC(r,3)),this.setAttribute("uv",new QC(n,2))}static fromJSON(A){return new pC(A.width,A.height,A.widthSegments,A.heightSegments)}}var Jn=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,pn=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fn=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,qn=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,un=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ln=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Yn="vec3 transformed = vec3( position );",Hn=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mn=`vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
#ifdef USE_IRIDESCENCE
	vec3 BRDF_GGX_Iridescence( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 f0, const in float f90, const in float iridescence, const in vec3 iridescenceFresnel, const in float roughness ) {
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = mix( F_Schlick( f0, f90, dotVH ), iridescenceFresnel, iridescence );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif`,xn=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Tn=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bn=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,vn=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Wn=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,On=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_n=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pn=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zn=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Vn=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,jn=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,Xn=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,zn=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$n=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,AD=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,ID=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gD=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,CD="gl_FragColor = linearToOutputTexel( gl_FragColor );",BD=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,QD=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ED=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,iD=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oD=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,tD=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,eD=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,aD=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,sD=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nD=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,DD=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rD=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vUv2 );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,hD=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cD=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wD=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,GD=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( PHYSICALLY_CORRECT_LIGHTS )
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#else
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lD=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,SD=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yD=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kD=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,MD=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,FD=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULARINTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vUv ).a;
		#endif
		#ifdef USE_SPECULARCOLORMAP
			specularColorFactor *= texture2D( specularColorMap, vUv ).rgb;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEENCOLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEENROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vUv ).a;
	#endif
#endif`,RD=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	#ifdef USE_IRIDESCENCE
		reflectedLight.directSpecular += irradiance * BRDF_GGX_Iridescence( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness );
	#else
		reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularF90, material.roughness );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ND=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,KD=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dD=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,UD=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,JD=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pD=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,fD=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,qD=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uD=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,LD=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,YD=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,HD=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mD=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xD=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,TD=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,bD=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,vD=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,WD=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,OD=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_D=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,PD=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ZD=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,VD=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,jD=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,XD=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,zD=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,$D=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ar=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ir=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,gr=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cr=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Br=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qr=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Er=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ir=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,or=`#if NUM_SPOT_LIGHT_COORDS > 0
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
  uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,tr=`#if NUM_SPOT_LIGHT_COORDS > 0
  uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
  varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,er=`#if defined( USE_SHADOWMAP ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_COORDS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,ar=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sr=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nr=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,Dr=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rr=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hr=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cr=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wr=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gr=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lr=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Sr=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		#ifdef texture2DLodEXT
			return texture2DLodEXT( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#else
			return texture2D( transmissionSamplerMap, fragCoord.xy, framebufferLod );
		#endif
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,yr=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,kr=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,Mr=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,Fr=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,Rr=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,Nr=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,Kr=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dr=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ur=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Jr=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pr=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,fr=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qr=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ur=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Lr=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Yr=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Hr=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,mr=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xr=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,Tr=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,br=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,vr=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wr=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Or=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_r=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pr=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Zr=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vr=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jr=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xr=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zr=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$r=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ah=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULARINTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
	#ifdef USE_SPECULARCOLORMAP
		uniform sampler2D specularColorMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEENCOLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEENROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <bsdfs>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ih=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gh=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ch=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Bh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qh=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eh=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ih=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oh=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,_A={alphamap_fragment:Jn,alphamap_pars_fragment:pn,alphatest_fragment:fn,alphatest_pars_fragment:qn,aomap_fragment:un,aomap_pars_fragment:Ln,begin_vertex:Yn,beginnormal_vertex:Hn,bsdfs:mn,iridescence_fragment:xn,bumpmap_pars_fragment:Tn,clipping_planes_fragment:bn,clipping_planes_pars_fragment:vn,clipping_planes_pars_vertex:Wn,clipping_planes_vertex:On,color_fragment:_n,color_pars_fragment:Pn,color_pars_vertex:Zn,color_vertex:Vn,common:jn,cube_uv_reflection_fragment:Xn,defaultnormal_vertex:zn,displacementmap_pars_vertex:$n,displacementmap_vertex:AD,emissivemap_fragment:ID,emissivemap_pars_fragment:gD,encodings_fragment:CD,encodings_pars_fragment:BD,envmap_fragment:QD,envmap_common_pars_fragment:ED,envmap_pars_fragment:iD,envmap_pars_vertex:oD,envmap_physical_pars_fragment:lD,envmap_vertex:tD,fog_vertex:eD,fog_pars_vertex:aD,fog_fragment:sD,fog_pars_fragment:nD,gradientmap_pars_fragment:DD,lightmap_fragment:rD,lightmap_pars_fragment:hD,lights_lambert_fragment:cD,lights_lambert_pars_fragment:wD,lights_pars_begin:GD,lights_toon_fragment:SD,lights_toon_pars_fragment:yD,lights_phong_fragment:kD,lights_phong_pars_fragment:MD,lights_physical_fragment:FD,lights_physical_pars_fragment:RD,lights_fragment_begin:ND,lights_fragment_maps:KD,lights_fragment_end:dD,logdepthbuf_fragment:UD,logdepthbuf_pars_fragment:JD,logdepthbuf_pars_vertex:pD,logdepthbuf_vertex:fD,map_fragment:qD,map_pars_fragment:uD,map_particle_fragment:LD,map_particle_pars_fragment:YD,metalnessmap_fragment:HD,metalnessmap_pars_fragment:mD,morphcolor_vertex:xD,morphnormal_vertex:TD,morphtarget_pars_vertex:bD,morphtarget_vertex:vD,normal_fragment_begin:WD,normal_fragment_maps:OD,normal_pars_fragment:_D,normal_pars_vertex:PD,normal_vertex:ZD,normalmap_pars_fragment:VD,clearcoat_normal_fragment_begin:jD,clearcoat_normal_fragment_maps:XD,clearcoat_pars_fragment:zD,iridescence_pars_fragment:$D,output_fragment:Ar,packing:Ir,premultiplied_alpha_fragment:gr,project_vertex:Cr,dithering_fragment:Br,dithering_pars_fragment:Qr,roughnessmap_fragment:Er,roughnessmap_pars_fragment:ir,shadowmap_pars_fragment:or,shadowmap_pars_vertex:tr,shadowmap_vertex:er,shadowmask_pars_fragment:ar,skinbase_vertex:sr,skinning_pars_vertex:nr,skinning_vertex:Dr,skinnormal_vertex:rr,specularmap_fragment:hr,specularmap_pars_fragment:cr,tonemapping_fragment:wr,tonemapping_pars_fragment:Gr,transmission_fragment:lr,transmission_pars_fragment:Sr,uv_pars_fragment:yr,uv_pars_vertex:kr,uv_vertex:Mr,uv2_pars_fragment:Fr,uv2_pars_vertex:Rr,uv2_vertex:Nr,worldpos_vertex:Kr,background_vert:dr,background_frag:Ur,backgroundCube_vert:Jr,backgroundCube_frag:pr,cube_vert:fr,cube_frag:qr,depth_vert:ur,depth_frag:Lr,distanceRGBA_vert:Yr,distanceRGBA_frag:Hr,equirect_vert:mr,equirect_frag:xr,linedashed_vert:Tr,linedashed_frag:br,meshbasic_vert:vr,meshbasic_frag:Wr,meshlambert_vert:Or,meshlambert_frag:_r,meshmatcap_vert:Pr,meshmatcap_frag:Zr,meshnormal_vert:Vr,meshnormal_frag:jr,meshphong_vert:Xr,meshphong_frag:zr,meshphysical_vert:$r,meshphysical_frag:Ah,meshtoon_vert:Ih,meshtoon_frag:gh,points_vert:Ch,points_frag:Bh,shadow_vert:Qh,shadow_frag:Eh,sprite_vert:ih,sprite_frag:oh},NA={common:{diffuse:{value:new $A(16777215)},opacity:{value:1},map:{value:null},uvTransform:{value:new $I},uv2Transform:{value:new $I},alphaMap:{value:null},alphaTest:{value:0}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new AI(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $A(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $A(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new $I}},sprite:{diffuse:{value:new $A(16777215)},opacity:{value:1},center:{value:new AI(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new $I}}},pg={basic:{uniforms:OI([NA.common,NA.specularmap,NA.envmap,NA.aomap,NA.lightmap,NA.fog]),vertexShader:_A.meshbasic_vert,fragmentShader:_A.meshbasic_frag},lambert:{uniforms:OI([NA.common,NA.specularmap,NA.envmap,NA.aomap,NA.lightmap,NA.emissivemap,NA.bumpmap,NA.normalmap,NA.displacementmap,NA.fog,NA.lights,{emissive:{value:new $A(0)}}]),vertexShader:_A.meshlambert_vert,fragmentShader:_A.meshlambert_frag},phong:{uniforms:OI([NA.common,NA.specularmap,NA.envmap,NA.aomap,NA.lightmap,NA.emissivemap,NA.bumpmap,NA.normalmap,NA.displacementmap,NA.fog,NA.lights,{emissive:{value:new $A(0)},specular:{value:new $A(1118481)},shininess:{value:30}}]),vertexShader:_A.meshphong_vert,fragmentShader:_A.meshphong_frag},standard:{uniforms:OI([NA.common,NA.envmap,NA.aomap,NA.lightmap,NA.emissivemap,NA.bumpmap,NA.normalmap,NA.displacementmap,NA.roughnessmap,NA.metalnessmap,NA.fog,NA.lights,{emissive:{value:new $A(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_A.meshphysical_vert,fragmentShader:_A.meshphysical_frag},toon:{uniforms:OI([NA.common,NA.aomap,NA.lightmap,NA.emissivemap,NA.bumpmap,NA.normalmap,NA.displacementmap,NA.gradientmap,NA.fog,NA.lights,{emissive:{value:new $A(0)}}]),vertexShader:_A.meshtoon_vert,fragmentShader:_A.meshtoon_frag},matcap:{uniforms:OI([NA.common,NA.bumpmap,NA.normalmap,NA.displacementmap,NA.fog,{matcap:{value:null}}]),vertexShader:_A.meshmatcap_vert,fragmentShader:_A.meshmatcap_frag},points:{uniforms:OI([NA.points,NA.fog]),vertexShader:_A.points_vert,fragmentShader:_A.points_frag},dashed:{uniforms:OI([NA.common,NA.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_A.linedashed_vert,fragmentShader:_A.linedashed_frag},depth:{uniforms:OI([NA.common,NA.displacementmap]),vertexShader:_A.depth_vert,fragmentShader:_A.depth_frag},normal:{uniforms:OI([NA.common,NA.bumpmap,NA.normalmap,NA.displacementmap,{opacity:{value:1}}]),vertexShader:_A.meshnormal_vert,fragmentShader:_A.meshnormal_frag},sprite:{uniforms:OI([NA.sprite,NA.fog]),vertexShader:_A.sprite_vert,fragmentShader:_A.sprite_frag},background:{uniforms:{uvTransform:{value:new $I},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_A.background_vert,fragmentShader:_A.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:_A.backgroundCube_vert,fragmentShader:_A.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_A.cube_vert,fragmentShader:_A.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_A.equirect_vert,fragmentShader:_A.equirect_frag},distanceRGBA:{uniforms:OI([NA.common,NA.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_A.distanceRGBA_vert,fragmentShader:_A.distanceRGBA_frag},shadow:{uniforms:OI([NA.lights,NA.fog,{color:{value:new $A(0)},opacity:{value:1}}]),vertexShader:_A.shadow_vert,fragmentShader:_A.shadow_frag}};pg.physical={uniforms:OI([pg.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new AI(1,1)},clearcoatNormalMap:{value:null},iridescence:{value:0},iridescenceMap:{value:null},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},sheen:{value:0},sheenColor:{value:new $A(0)},sheenColorMap:{value:null},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},transmission:{value:0},transmissionMap:{value:null},transmissionSamplerSize:{value:new AI},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:0},attenuationColor:{value:new $A(0)},specularIntensity:{value:1},specularIntensityMap:{value:null},specularColor:{value:new $A(1,1,1)},specularColorMap:{value:null}}]),vertexShader:_A.meshphysical_vert,fragmentShader:_A.meshphysical_frag};const zQ={r:0,b:0,g:0};function th(i,A,I,g,C,B,E){const Q=new $A(0);let o=B===!0?0:1,t,e,a=null,s=0,D=null;function c(n,l){let G=!1,S=l.isScene===!0?l.background:null;S&&S.isTexture&&(S=(l.backgroundBlurriness>0?I:A).get(S));const k=i.xr,M=k.getSession&&k.getSession();M&&M.environmentBlendMode==="additive"&&(S=null),S===null?r(Q,o):S&&S.isColor&&(r(S,1),G=!0),(i.autoClear||G)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),S&&(S.isCubeTexture||S.mapping===qE)?(e===void 0&&(e=new ng(new GQ(1,1,1),new JC({name:"BackgroundCubeMaterial",uniforms:hB(pg.backgroundCube.uniforms),vertexShader:pg.backgroundCube.vertexShader,fragmentShader:pg.backgroundCube.fragmentShader,side:ig,depthTest:!1,depthWrite:!1,fog:!1})),e.geometry.deleteAttribute("normal"),e.geometry.deleteAttribute("uv"),e.onBeforeRender=function(K,U,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(e.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),C.update(e)),e.material.uniforms.envMap.value=S,e.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,e.material.uniforms.backgroundBlurriness.value=l.backgroundBlurriness,e.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,e.material.toneMapped=S.encoding!==hI,(a!==S||s!==S.version||D!==i.toneMapping)&&(e.material.needsUpdate=!0,a=S,s=S.version,D=i.toneMapping),e.layers.enableAll(),n.unshift(e,e.geometry,e.material,0,0,null)):S&&S.isTexture&&(t===void 0&&(t=new ng(new pC(2,2),new JC({name:"BackgroundMaterial",uniforms:hB(pg.background.uniforms),vertexShader:pg.background.vertexShader,fragmentShader:pg.background.fragmentShader,side:oC,depthTest:!1,depthWrite:!1,fog:!1})),t.geometry.deleteAttribute("normal"),Object.defineProperty(t.material,"map",{get:function(){return this.uniforms.t2D.value}}),C.update(t)),t.material.uniforms.t2D.value=S,t.material.uniforms.backgroundIntensity.value=l.backgroundIntensity,t.material.toneMapped=S.encoding!==hI,S.matrixAutoUpdate===!0&&S.updateMatrix(),t.material.uniforms.uvTransform.value.copy(S.matrix),(a!==S||s!==S.version||D!==i.toneMapping)&&(t.material.needsUpdate=!0,a=S,s=S.version,D=i.toneMapping),t.layers.enableAll(),n.unshift(t,t.geometry,t.material,0,0,null))}function r(n,l){n.getRGB(zQ,ka(i)),g.buffers.color.setClear(zQ.r,zQ.g,zQ.b,l,E)}return{getClearColor:function(){return Q},setClearColor:function(n,l=1){Q.set(n),o=l,r(Q,o)},getClearAlpha:function(){return o},setClearAlpha:function(n){o=n,r(Q,o)},render:c}}function eh(i,A,I,g){const C=i.getParameter(34921),B=g.isWebGL2?null:A.get("OES_vertex_array_object"),E=g.isWebGL2||B!==null,Q={},o=n(null);let t=o,e=!1;function a(J,m,P,iA,V){let b=!1;if(E){const v=r(iA,P,m);t!==v&&(t=v,D(t.object)),b=l(J,iA,P,V),b&&G(J,iA,P,V)}else{const v=m.wireframe===!0;(t.geometry!==iA.id||t.program!==P.id||t.wireframe!==v)&&(t.geometry=iA.id,t.program=P.id,t.wireframe=v,b=!0)}V!==null&&I.update(V,34963),(b||e)&&(e=!1,w(J,m,P,iA),V!==null&&i.bindBuffer(34963,I.get(V).buffer))}function s(){return g.isWebGL2?i.createVertexArray():B.createVertexArrayOES()}function D(J){return g.isWebGL2?i.bindVertexArray(J):B.bindVertexArrayOES(J)}function c(J){return g.isWebGL2?i.deleteVertexArray(J):B.deleteVertexArrayOES(J)}function r(J,m,P){const iA=P.wireframe===!0;let V=Q[J.id];V===void 0&&(V={},Q[J.id]=V);let b=V[m.id];b===void 0&&(b={},V[m.id]=b);let v=b[iA];return v===void 0&&(v=n(s()),b[iA]=v),v}function n(J){const m=[],P=[],iA=[];for(let V=0;V<C;V++)m[V]=0,P[V]=0,iA[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:P,attributeDivisors:iA,object:J,attributes:{},index:null}}function l(J,m,P,iA){const V=t.attributes,b=m.attributes;let v=0;const N=P.getAttributes();for(const p in N)if(N[p].location>=0){const O=V[p];let W=b[p];if(W===void 0&&(p==="instanceMatrix"&&J.instanceMatrix&&(W=J.instanceMatrix),p==="instanceColor"&&J.instanceColor&&(W=J.instanceColor)),O===void 0||O.attribute!==W||W&&O.data!==W.data)return!0;v++}return t.attributesNum!==v||t.index!==iA}function G(J,m,P,iA){const V={},b=m.attributes;let v=0;const N=P.getAttributes();for(const p in N)if(N[p].location>=0){let O=b[p];O===void 0&&(p==="instanceMatrix"&&J.instanceMatrix&&(O=J.instanceMatrix),p==="instanceColor"&&J.instanceColor&&(O=J.instanceColor));const W={};W.attribute=O,O&&O.data&&(W.data=O.data),V[p]=W,v++}t.attributes=V,t.attributesNum=v,t.index=iA}function S(){const J=t.newAttributes;for(let m=0,P=J.length;m<P;m++)J[m]=0}function k(J){M(J,0)}function M(J,m){const P=t.newAttributes,iA=t.enabledAttributes,V=t.attributeDivisors;P[J]=1,iA[J]===0&&(i.enableVertexAttribArray(J),iA[J]=1),V[J]!==m&&((g.isWebGL2?i:A.get("ANGLE_instanced_arrays"))[g.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](J,m),V[J]=m)}function K(){const J=t.newAttributes,m=t.enabledAttributes;for(let P=0,iA=m.length;P<iA;P++)m[P]!==J[P]&&(i.disableVertexAttribArray(P),m[P]=0)}function U(J,m,P,iA,V,b){g.isWebGL2===!0&&(P===5124||P===5125)?i.vertexAttribIPointer(J,m,P,V,b):i.vertexAttribPointer(J,m,P,iA,V,b)}function w(J,m,P,iA){if(g.isWebGL2===!1&&(J.isInstancedMesh||iA.isInstancedBufferGeometry)&&A.get("ANGLE_instanced_arrays")===null)return;S();const V=iA.attributes,b=P.getAttributes(),v=m.defaultAttributeValues;for(const N in b){const p=b[N];if(p.location>=0){let Z=V[N];if(Z===void 0&&(N==="instanceMatrix"&&J.instanceMatrix&&(Z=J.instanceMatrix),N==="instanceColor"&&J.instanceColor&&(Z=J.instanceColor)),Z!==void 0){const O=Z.normalized,W=Z.itemSize,Y=I.get(Z);if(Y===void 0)continue;const QA=Y.buffer,z=Y.type,eA=Y.bytesPerElement;if(Z.isInterleavedBufferAttribute){const tA=Z.data,hA=tA.stride,EA=Z.offset;if(tA.isInstancedInterleavedBuffer){for(let kA=0;kA<p.locationSize;kA++)M(p.location+kA,tA.meshPerAttribute);J.isInstancedMesh!==!0&&iA._maxInstanceCount===void 0&&(iA._maxInstanceCount=tA.meshPerAttribute*tA.count)}else for(let kA=0;kA<p.locationSize;kA++)k(p.location+kA);i.bindBuffer(34962,QA);for(let kA=0;kA<p.locationSize;kA++)U(p.location+kA,W/p.locationSize,z,O,hA*eA,(EA+W/p.locationSize*kA)*eA)}else{if(Z.isInstancedBufferAttribute){for(let tA=0;tA<p.locationSize;tA++)M(p.location+tA,Z.meshPerAttribute);J.isInstancedMesh!==!0&&iA._maxInstanceCount===void 0&&(iA._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let tA=0;tA<p.locationSize;tA++)k(p.location+tA);i.bindBuffer(34962,QA);for(let tA=0;tA<p.locationSize;tA++)U(p.location+tA,W/p.locationSize,z,O,W*eA,W/p.locationSize*tA*eA)}}else if(v!==void 0){const O=v[N];if(O!==void 0)switch(O.length){case 2:i.vertexAttrib2fv(p.location,O);break;case 3:i.vertexAttrib3fv(p.location,O);break;case 4:i.vertexAttrib4fv(p.location,O);break;default:i.vertexAttrib1fv(p.location,O)}}}}K()}function d(){u();for(const J in Q){const m=Q[J];for(const P in m){const iA=m[P];for(const V in iA)c(iA[V].object),delete iA[V];delete m[P]}delete Q[J]}}function L(J){if(Q[J.id]===void 0)return;const m=Q[J.id];for(const P in m){const iA=m[P];for(const V in iA)c(iA[V].object),delete iA[V];delete m[P]}delete Q[J.id]}function X(J){for(const m in Q){const P=Q[m];if(P[J.id]===void 0)continue;const iA=P[J.id];for(const V in iA)c(iA[V].object),delete iA[V];delete P[J.id]}}function u(){q(),e=!0,t!==o&&(t=o,D(t.object))}function q(){o.geometry=null,o.program=null,o.wireframe=!1}return{setup:a,reset:u,resetDefaultState:q,dispose:d,releaseStatesOfGeometry:L,releaseStatesOfProgram:X,initAttributes:S,enableAttribute:k,disableUnusedAttributes:K}}function ah(i,A,I,g){const C=g.isWebGL2;let B;function E(t){B=t}function Q(t,e){i.drawArrays(B,t,e),I.update(e,B,1)}function o(t,e,a){if(a===0)return;let s,D;if(C)s=i,D="drawArraysInstanced";else if(s=A.get("ANGLE_instanced_arrays"),D="drawArraysInstancedANGLE",s===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}s[D](B,t,e,a),I.update(e,B,a)}this.setMode=E,this.render=Q,this.renderInstances=o}function sh(i,A,I){let g;function C(){if(g!==void 0)return g;if(A.has("EXT_texture_filter_anisotropic")===!0){const U=A.get("EXT_texture_filter_anisotropic");g=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else g=0;return g}function B(U){if(U==="highp"){if(i.getShaderPrecisionFormat(35633,36338).precision>0&&i.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(35633,36337).precision>0&&i.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const E=typeof WebGL2RenderingContext<"u"&&i instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&i instanceof WebGL2ComputeRenderingContext;let Q=I.precision!==void 0?I.precision:"highp";const o=B(Q);o!==Q&&(console.warn("THREE.WebGLRenderer:",Q,"not supported, using",o,"instead."),Q=o);const t=E||A.has("WEBGL_draw_buffers"),e=I.logarithmicDepthBuffer===!0,a=i.getParameter(34930),s=i.getParameter(35660),D=i.getParameter(3379),c=i.getParameter(34076),r=i.getParameter(34921),n=i.getParameter(36347),l=i.getParameter(36348),G=i.getParameter(36349),S=s>0,k=E||A.has("OES_texture_float"),M=S&&k,K=E?i.getParameter(36183):0;return{isWebGL2:E,drawBuffers:t,getMaxAnisotropy:C,getMaxPrecision:B,precision:Q,logarithmicDepthBuffer:e,maxTextures:a,maxVertexTextures:s,maxTextureSize:D,maxCubemapSize:c,maxAttributes:r,maxVertexUniforms:n,maxVaryings:l,maxFragmentUniforms:G,vertexTextures:S,floatFragmentTextures:k,floatVertexTextures:M,maxSamples:K}}function nh(i){const A=this;let I=null,g=0,C=!1,B=!1;const E=new rC,Q=new $I,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(a,s,D){const c=a.length!==0||s||g!==0||C;return C=s,I=e(a,D,0),g=a.length,c},this.beginShadows=function(){B=!0,e(null)},this.endShadows=function(){B=!1,t()},this.setState=function(a,s,D){const c=a.clippingPlanes,r=a.clipIntersection,n=a.clipShadows,l=i.get(a);if(!C||c===null||c.length===0||B&&!n)B?e(null):t();else{const G=B?0:g,S=G*4;let k=l.clippingState||null;o.value=k,k=e(c,s,S,D);for(let M=0;M!==S;++M)k[M]=I[M];l.clippingState=k,this.numIntersection=r?this.numPlanes:0,this.numPlanes+=G}};function t(){o.value!==I&&(o.value=I,o.needsUpdate=g>0),A.numPlanes=g,A.numIntersection=0}function e(a,s,D,c){const r=a!==null?a.length:0;let n=null;if(r!==0){if(n=o.value,c!==!0||n===null){const l=D+r*4,G=s.matrixWorldInverse;Q.getNormalMatrix(G),(n===null||n.length<l)&&(n=new Float32Array(l));for(let S=0,k=D;S!==r;++S,k+=4)E.copy(a[S]).applyMatrix4(G,Q),E.normal.toArray(n,k),n[k+3]=E.constant}o.value=n,o.needsUpdate=!0}return A.numPlanes=r,A.numIntersection=0,n}}function Dh(i){let A=new WeakMap;function I(E,Q){return Q===Zi?E.mapping=nB:Q===Vi&&(E.mapping=DB),E}function g(E){if(E&&E.isTexture&&E.isRenderTargetTexture===!1){const Q=E.mapping;if(Q===Zi||Q===Vi)if(A.has(E)){const o=A.get(E).texture;return I(o,E.mapping)}else{const o=E.image;if(o&&o.height>0){const t=new Nn(o.height/2);return t.fromEquirectangularTexture(i,E),A.set(E,t),E.addEventListener("dispose",C),I(t.texture,E.mapping)}else return null}}return E}function C(E){const Q=E.target;Q.removeEventListener("dispose",C);const o=A.get(Q);o!==void 0&&(A.delete(Q),o.dispose())}function B(){A=new WeakMap}return{get:g,dispose:B}}class Ka extends Fa{constructor(A=-1,I=1,g=1,C=-1,B=.1,E=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=A,this.right=I,this.top=g,this.bottom=C,this.near=B,this.far=E,this.updateProjectionMatrix()}copy(A,I){return super.copy(A,I),this.left=A.left,this.right=A.right,this.top=A.top,this.bottom=A.bottom,this.near=A.near,this.far=A.far,this.zoom=A.zoom,this.view=A.view===null?null:Object.assign({},A.view),this}setViewOffset(A,I,g,C,B,E){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=A,this.view.fullHeight=I,this.view.offsetX=g,this.view.offsetY=C,this.view.width=B,this.view.height=E,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const A=(this.right-this.left)/(2*this.zoom),I=(this.top-this.bottom)/(2*this.zoom),g=(this.right+this.left)/2,C=(this.top+this.bottom)/2;let B=g-A,E=g+A,Q=C+I,o=C-I;if(this.view!==null&&this.view.enabled){const t=(this.right-this.left)/this.view.fullWidth/this.zoom,e=(this.top-this.bottom)/this.view.fullHeight/this.zoom;B+=t*this.view.offsetX,E=B+t*this.view.width,Q-=e*this.view.offsetY,o=Q-e*this.view.height}this.projectionMatrix.makeOrthographic(B,E,Q,o,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(A){const I=super.toJSON(A);return I.object.zoom=this.zoom,I.object.left=this.left,I.object.right=this.right,I.object.top=this.top,I.object.bottom=this.bottom,I.object.near=this.near,I.object.far=this.far,this.view!==null&&(I.object.view=Object.assign({},this.view)),I}}const QB=4,Ot=[.125,.215,.35,.446,.526,.582],cC=20,di=new Ka,_t=new $A;let Ui=null;const hC=(1+Math.sqrt(5))/2,gB=1/hC,Pt=[new j(1,1,1),new j(-1,1,1),new j(1,1,-1),new j(-1,1,-1),new j(0,hC,gB),new j(0,hC,-gB),new j(gB,0,hC),new j(-gB,0,hC),new j(hC,gB,0),new j(-hC,gB,0)];class Zt{constructor(A){this._renderer=A,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(A,I=0,g=.1,C=100){Ui=this._renderer.getRenderTarget(),this._setSize(256);const B=this._allocateTargets();return B.depthBuffer=!0,this._sceneToCubeUV(A,g,C,B),I>0&&this._blur(B,0,0,I),this._applyPMREM(B),this._cleanup(B),B}fromEquirectangular(A,I=null){return this._fromTexture(A,I)}fromCubemap(A,I=null){return this._fromTexture(A,I)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xt(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jt(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(A){this._lodMax=Math.floor(Math.log2(A)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let A=0;A<this._lodPlanes.length;A++)this._lodPlanes[A].dispose()}_cleanup(A){this._renderer.setRenderTarget(Ui),A.scissorTest=!1,$Q(A,0,0,A.width,A.height)}_fromTexture(A,I){A.mapping===nB||A.mapping===DB?this._setSize(A.image.length===0?16:A.image[0].width||A.image[0].image.width):this._setSize(A.image.width/4),Ui=this._renderer.getRenderTarget();const g=I||this._allocateTargets();return this._textureToCubeUV(A,g),this._applyPMREM(g),this._cleanup(g),g}_allocateTargets(){const A=3*Math.max(this._cubeSize,112),I=4*this._cubeSize,g={magFilter:zI,minFilter:zI,generateMipmaps:!1,type:EQ,format:Mg,encoding:dC,depthBuffer:!1},C=Vt(A,I,g);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==A){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vt(A,I,g);const{_lodMax:B}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=rh(B)),this._blurMaterial=hh(B,A,I)}return C}_compileMaterial(A){const I=new ng(this._lodPlanes[0],A);this._renderer.compile(I,di)}_sceneToCubeUV(A,I,g,C){const Q=new sg(90,1,I,g),o=[1,-1,1,1,1,1],t=[1,1,1,-1,-1,-1],e=this._renderer,a=e.autoClear,s=e.toneMapping;e.getClearColor(_t),e.toneMapping=Wg,e.autoClear=!1;const D=new LE({name:"PMREM.Background",side:ig,depthWrite:!1,depthTest:!1}),c=new ng(new GQ,D);let r=!1;const n=A.background;n?n.isColor&&(D.color.copy(n),A.background=null,r=!0):(D.color.copy(_t),r=!0);for(let l=0;l<6;l++){const G=l%3;G===0?(Q.up.set(0,o[l],0),Q.lookAt(t[l],0,0)):G===1?(Q.up.set(0,0,o[l]),Q.lookAt(0,t[l],0)):(Q.up.set(0,o[l],0),Q.lookAt(0,0,t[l]));const S=this._cubeSize;$Q(C,G*S,l>2?S:0,S,S),e.setRenderTarget(C),r&&e.render(c,Q),e.render(A,Q)}c.geometry.dispose(),c.material.dispose(),e.toneMapping=s,e.autoClear=a,A.background=n}_textureToCubeUV(A,I){const g=this._renderer,C=A.mapping===nB||A.mapping===DB;C?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xt()),this._cubemapMaterial.uniforms.flipEnvMap.value=A.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jt());const B=C?this._cubemapMaterial:this._equirectMaterial,E=new ng(this._lodPlanes[0],B),Q=B.uniforms;Q.envMap.value=A;const o=this._cubeSize;$Q(I,0,0,3*o,2*o),g.setRenderTarget(I),g.render(E,di)}_applyPMREM(A){const I=this._renderer,g=I.autoClear;I.autoClear=!1;for(let C=1;C<this._lodPlanes.length;C++){const B=Math.sqrt(this._sigmas[C]*this._sigmas[C]-this._sigmas[C-1]*this._sigmas[C-1]),E=Pt[(C-1)%Pt.length];this._blur(A,C-1,C,B,E)}I.autoClear=g}_blur(A,I,g,C,B){const E=this._pingPongRenderTarget;this._halfBlur(A,E,I,g,C,"latitudinal",B),this._halfBlur(E,A,g,g,C,"longitudinal",B)}_halfBlur(A,I,g,C,B,E,Q){const o=this._renderer,t=this._blurMaterial;E!=="latitudinal"&&E!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const e=3,a=new ng(this._lodPlanes[C],t),s=t.uniforms,D=this._sizeLods[g]-1,c=isFinite(B)?Math.PI/(2*D):2*Math.PI/(2*cC-1),r=B/c,n=isFinite(B)?1+Math.floor(e*r):cC;n>cC&&console.warn(`sigmaRadians, ${B}, is too large and will clip, as it requested ${n} samples when the maximum is set to ${cC}`);const l=[];let G=0;for(let U=0;U<cC;++U){const w=U/r,d=Math.exp(-w*w/2);l.push(d),U===0?G+=d:U<n&&(G+=2*d)}for(let U=0;U<l.length;U++)l[U]=l[U]/G;s.envMap.value=A.texture,s.samples.value=n,s.weights.value=l,s.latitudinal.value=E==="latitudinal",Q&&(s.poleAxis.value=Q);const{_lodMax:S}=this;s.dTheta.value=c,s.mipInt.value=S-g;const k=this._sizeLods[C],M=3*k*(C>S-QB?C-S+QB:0),K=4*(this._cubeSize-k);$Q(I,M,K,3*k,2*k),o.setRenderTarget(I),o.render(a,di)}}function rh(i){const A=[],I=[],g=[];let C=i;const B=i-QB+1+Ot.length;for(let E=0;E<B;E++){const Q=Math.pow(2,C);I.push(Q);let o=1/Q;E>i-QB?o=Ot[E-i+QB-1]:E===0&&(o=0),g.push(o);const t=1/(Q-2),e=-t,a=1+t,s=[e,e,a,e,a,a,e,e,a,a,e,a],D=6,c=6,r=3,n=2,l=1,G=new Float32Array(r*c*D),S=new Float32Array(n*c*D),k=new Float32Array(l*c*D);for(let K=0;K<D;K++){const U=K%3*2/3-1,w=K>2?0:-1,d=[U,w,0,U+2/3,w,0,U+2/3,w+1,0,U,w,0,U+2/3,w+1,0,U,w+1,0];G.set(d,r*c*K),S.set(s,n*c*K);const L=[K,K,K,K,K,K];k.set(L,l*c*K)}const M=new Zg;M.setAttribute("position",new Fg(G,r)),M.setAttribute("uv",new Fg(S,n)),M.setAttribute("faceIndex",new Fg(k,l)),A.push(M),C>QB&&C--}return{lodPlanes:A,sizeLods:I,sigmas:g}}function Vt(i,A,I){const g=new UC(i,A,I);return g.texture.mapping=qE,g.texture.name="PMREM.cubeUv",g.scissorTest=!0,g}function $Q(i,A,I,g,C){i.viewport.set(A,I,g,C),i.scissor.set(A,I,g,C)}function hh(i,A,I){const g=new Float32Array(cC),C=new j(0,1,0);return new JC({name:"SphericalGaussianBlur",defines:{n:cC,CUBEUV_TEXEL_WIDTH:1/A,CUBEUV_TEXEL_HEIGHT:1/I,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:g},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:C}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:BC,depthTest:!1,depthWrite:!1})}function jt(){return new JC({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:BC,depthTest:!1,depthWrite:!1})}function Xt(){return new JC({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ko(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:BC,depthTest:!1,depthWrite:!1})}function Ko(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function ch(i){let A=new WeakMap,I=null;function g(Q){if(Q&&Q.isTexture){const o=Q.mapping,t=o===Zi||o===Vi,e=o===nB||o===DB;if(t||e)if(Q.isRenderTargetTexture&&Q.needsPMREMUpdate===!0){Q.needsPMREMUpdate=!1;let a=A.get(Q);return I===null&&(I=new Zt(i)),a=t?I.fromEquirectangular(Q,a):I.fromCubemap(Q,a),A.set(Q,a),a.texture}else{if(A.has(Q))return A.get(Q).texture;{const a=Q.image;if(t&&a&&a.height>0||e&&a&&C(a)){I===null&&(I=new Zt(i));const s=t?I.fromEquirectangular(Q):I.fromCubemap(Q);return A.set(Q,s),Q.addEventListener("dispose",B),s.texture}else return null}}}return Q}function C(Q){let o=0;const t=6;for(let e=0;e<t;e++)Q[e]!==void 0&&o++;return o===t}function B(Q){const o=Q.target;o.removeEventListener("dispose",B);const t=A.get(o);t!==void 0&&(A.delete(o),t.dispose())}function E(){A=new WeakMap,I!==null&&(I.dispose(),I=null)}return{get:g,dispose:E}}function wh(i){const A={};function I(g){if(A[g]!==void 0)return A[g];let C;switch(g){case"WEBGL_depth_texture":C=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":C=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":C=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":C=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:C=i.getExtension(g)}return A[g]=C,C}return{has:function(g){return I(g)!==null},init:function(g){g.isWebGL2?I("EXT_color_buffer_float"):(I("WEBGL_depth_texture"),I("OES_texture_float"),I("OES_texture_half_float"),I("OES_texture_half_float_linear"),I("OES_standard_derivatives"),I("OES_element_index_uint"),I("OES_vertex_array_object"),I("ANGLE_instanced_arrays")),I("OES_texture_float_linear"),I("EXT_color_buffer_half_float"),I("WEBGL_multisampled_render_to_texture")},get:function(g){const C=I(g);return C===null&&console.warn("THREE.WebGLRenderer: "+g+" extension not supported."),C}}}function Gh(i,A,I,g){const C={},B=new WeakMap;function E(a){const s=a.target;s.index!==null&&A.remove(s.index);for(const c in s.attributes)A.remove(s.attributes[c]);s.removeEventListener("dispose",E),delete C[s.id];const D=B.get(s);D&&(A.remove(D),B.delete(s)),g.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,I.memory.geometries--}function Q(a,s){return C[s.id]===!0||(s.addEventListener("dispose",E),C[s.id]=!0,I.memory.geometries++),s}function o(a){const s=a.attributes;for(const c in s)A.update(s[c],34962);const D=a.morphAttributes;for(const c in D){const r=D[c];for(let n=0,l=r.length;n<l;n++)A.update(r[n],34962)}}function t(a){const s=[],D=a.index,c=a.attributes.position;let r=0;if(D!==null){const G=D.array;r=D.version;for(let S=0,k=G.length;S<k;S+=3){const M=G[S+0],K=G[S+1],U=G[S+2];s.push(M,K,K,U,U,M)}}else{const G=c.array;r=c.version;for(let S=0,k=G.length/3-1;S<k;S+=3){const M=S+0,K=S+1,U=S+2;s.push(M,K,K,U,U,M)}}const n=new(ra(s)?ya:Sa)(s,1);n.version=r;const l=B.get(a);l&&A.remove(l),B.set(a,n)}function e(a){const s=B.get(a);if(s){const D=a.index;D!==null&&s.version<D.version&&t(a)}else t(a);return B.get(a)}return{get:Q,update:o,getWireframeAttribute:e}}function lh(i,A,I,g){const C=g.isWebGL2;let B;function E(s){B=s}let Q,o;function t(s){Q=s.type,o=s.bytesPerElement}function e(s,D){i.drawElements(B,D,Q,s*o),I.update(D,B,1)}function a(s,D,c){if(c===0)return;let r,n;if(C)r=i,n="drawElementsInstanced";else if(r=A.get("ANGLE_instanced_arrays"),n="drawElementsInstancedANGLE",r===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}r[n](B,D,Q,s*o,c),I.update(D,B,c)}this.setMode=E,this.setIndex=t,this.render=e,this.renderInstances=a}function Sh(i){const A={geometries:0,textures:0},I={frame:0,calls:0,triangles:0,points:0,lines:0};function g(B,E,Q){switch(I.calls++,E){case 4:I.triangles+=Q*(B/3);break;case 1:I.lines+=Q*(B/2);break;case 3:I.lines+=Q*(B-1);break;case 2:I.lines+=Q*B;break;case 0:I.points+=Q*B;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",E);break}}function C(){I.frame++,I.calls=0,I.triangles=0,I.points=0,I.lines=0}return{memory:A,render:I,programs:null,autoReset:!0,reset:C,update:g}}function yh(i,A){return i[0]-A[0]}function kh(i,A){return Math.abs(A[1])-Math.abs(i[1])}function Mh(i,A,I){const g={},C=new Float32Array(8),B=new WeakMap,E=new rI,Q=[];for(let t=0;t<8;t++)Q[t]=[t,0];function o(t,e,a,s){const D=t.morphTargetInfluences;if(A.isWebGL2===!0){const c=e.morphAttributes.position||e.morphAttributes.normal||e.morphAttributes.color,r=c!==void 0?c.length:0;let n=B.get(e);if(n===void 0||n.count!==r){let m=function(){q.dispose(),B.delete(e),e.removeEventListener("dispose",m)};n!==void 0&&n.texture.dispose();const S=e.morphAttributes.position!==void 0,k=e.morphAttributes.normal!==void 0,M=e.morphAttributes.color!==void 0,K=e.morphAttributes.position||[],U=e.morphAttributes.normal||[],w=e.morphAttributes.color||[];let d=0;S===!0&&(d=1),k===!0&&(d=2),M===!0&&(d=3);let L=e.attributes.position.count*d,X=1;L>A.maxTextureSize&&(X=Math.ceil(L/A.maxTextureSize),L=A.maxTextureSize);const u=new Float32Array(L*X*4*r),q=new Ga(u,L,X,r);q.type=lC,q.needsUpdate=!0;const J=d*4;for(let P=0;P<r;P++){const iA=K[P],V=U[P],b=w[P],v=L*X*4*P;for(let N=0;N<iA.count;N++){const p=N*J;S===!0&&(E.fromBufferAttribute(iA,N),u[v+p+0]=E.x,u[v+p+1]=E.y,u[v+p+2]=E.z,u[v+p+3]=0),k===!0&&(E.fromBufferAttribute(V,N),u[v+p+4]=E.x,u[v+p+5]=E.y,u[v+p+6]=E.z,u[v+p+7]=0),M===!0&&(E.fromBufferAttribute(b,N),u[v+p+8]=E.x,u[v+p+9]=E.y,u[v+p+10]=E.z,u[v+p+11]=b.itemSize===4?E.w:1)}}n={count:r,texture:q,size:new AI(L,X)},B.set(e,n),e.addEventListener("dispose",m)}let l=0;for(let S=0;S<D.length;S++)l+=D[S];const G=e.morphTargetsRelative?1:1-l;s.getUniforms().setValue(i,"morphTargetBaseInfluence",G),s.getUniforms().setValue(i,"morphTargetInfluences",D),s.getUniforms().setValue(i,"morphTargetsTexture",n.texture,I),s.getUniforms().setValue(i,"morphTargetsTextureSize",n.size)}else{const c=D===void 0?0:D.length;let r=g[e.id];if(r===void 0||r.length!==c){r=[];for(let k=0;k<c;k++)r[k]=[k,0];g[e.id]=r}for(let k=0;k<c;k++){const M=r[k];M[0]=k,M[1]=D[k]}r.sort(kh);for(let k=0;k<8;k++)k<c&&r[k][1]?(Q[k][0]=r[k][0],Q[k][1]=r[k][1]):(Q[k][0]=Number.MAX_SAFE_INTEGER,Q[k][1]=0);Q.sort(yh);const n=e.morphAttributes.position,l=e.morphAttributes.normal;let G=0;for(let k=0;k<8;k++){const M=Q[k],K=M[0],U=M[1];K!==Number.MAX_SAFE_INTEGER&&U?(n&&e.getAttribute("morphTarget"+k)!==n[K]&&e.setAttribute("morphTarget"+k,n[K]),l&&e.getAttribute("morphNormal"+k)!==l[K]&&e.setAttribute("morphNormal"+k,l[K]),C[k]=U,G+=U):(n&&e.hasAttribute("morphTarget"+k)===!0&&e.deleteAttribute("morphTarget"+k),l&&e.hasAttribute("morphNormal"+k)===!0&&e.deleteAttribute("morphNormal"+k),C[k]=0)}const S=e.morphTargetsRelative?1:1-G;s.getUniforms().setValue(i,"morphTargetBaseInfluence",S),s.getUniforms().setValue(i,"morphTargetInfluences",C)}}return{update:o}}function Fh(i,A,I,g){let C=new WeakMap;function B(o){const t=g.render.frame,e=o.geometry,a=A.get(o,e);return C.get(a)!==t&&(A.update(a),C.set(a,t)),o.isInstancedMesh&&(o.hasEventListener("dispose",Q)===!1&&o.addEventListener("dispose",Q),I.update(o.instanceMatrix,34962),o.instanceColor!==null&&I.update(o.instanceColor,34962)),a}function E(){C=new WeakMap}function Q(o){const t=o.target;t.removeEventListener("dispose",Q),I.remove(t.instanceMatrix),t.instanceColor!==null&&I.remove(t.instanceColor)}return{update:B,dispose:E}}const da=new PI,Ua=new Ga,Ja=new an,pa=new Ra,zt=[],$t=[],Ae=new Float32Array(16),Ie=new Float32Array(9),ge=new Float32Array(4);function MB(i,A,I){const g=i[0];if(g<=0||g>0)return i;const C=A*I;let B=zt[C];if(B===void 0&&(B=new Float32Array(C),zt[C]=B),A!==0){g.toArray(B,0);for(let E=1,Q=0;E!==A;++E)Q+=I,i[E].toArray(B,Q)}return B}function UI(i,A){if(i.length!==A.length)return!1;for(let I=0,g=i.length;I<g;I++)if(i[I]!==A[I])return!1;return!0}function JI(i,A){for(let I=0,g=A.length;I<g;I++)i[I]=A[I]}function YE(i,A){let I=$t[A];I===void 0&&(I=new Int32Array(A),$t[A]=I);for(let g=0;g!==A;++g)I[g]=i.allocateTextureUnit();return I}function Rh(i,A){const I=this.cache;I[0]!==A&&(i.uniform1f(this.addr,A),I[0]=A)}function Nh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y)&&(i.uniform2f(this.addr,A.x,A.y),I[0]=A.x,I[1]=A.y);else{if(UI(I,A))return;i.uniform2fv(this.addr,A),JI(I,A)}}function Kh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z)&&(i.uniform3f(this.addr,A.x,A.y,A.z),I[0]=A.x,I[1]=A.y,I[2]=A.z);else if(A.r!==void 0)(I[0]!==A.r||I[1]!==A.g||I[2]!==A.b)&&(i.uniform3f(this.addr,A.r,A.g,A.b),I[0]=A.r,I[1]=A.g,I[2]=A.b);else{if(UI(I,A))return;i.uniform3fv(this.addr,A),JI(I,A)}}function dh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z||I[3]!==A.w)&&(i.uniform4f(this.addr,A.x,A.y,A.z,A.w),I[0]=A.x,I[1]=A.y,I[2]=A.z,I[3]=A.w);else{if(UI(I,A))return;i.uniform4fv(this.addr,A),JI(I,A)}}function Uh(i,A){const I=this.cache,g=A.elements;if(g===void 0){if(UI(I,A))return;i.uniformMatrix2fv(this.addr,!1,A),JI(I,A)}else{if(UI(I,g))return;ge.set(g),i.uniformMatrix2fv(this.addr,!1,ge),JI(I,g)}}function Jh(i,A){const I=this.cache,g=A.elements;if(g===void 0){if(UI(I,A))return;i.uniformMatrix3fv(this.addr,!1,A),JI(I,A)}else{if(UI(I,g))return;Ie.set(g),i.uniformMatrix3fv(this.addr,!1,Ie),JI(I,g)}}function ph(i,A){const I=this.cache,g=A.elements;if(g===void 0){if(UI(I,A))return;i.uniformMatrix4fv(this.addr,!1,A),JI(I,A)}else{if(UI(I,g))return;Ae.set(g),i.uniformMatrix4fv(this.addr,!1,Ae),JI(I,g)}}function fh(i,A){const I=this.cache;I[0]!==A&&(i.uniform1i(this.addr,A),I[0]=A)}function qh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y)&&(i.uniform2i(this.addr,A.x,A.y),I[0]=A.x,I[1]=A.y);else{if(UI(I,A))return;i.uniform2iv(this.addr,A),JI(I,A)}}function uh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z)&&(i.uniform3i(this.addr,A.x,A.y,A.z),I[0]=A.x,I[1]=A.y,I[2]=A.z);else{if(UI(I,A))return;i.uniform3iv(this.addr,A),JI(I,A)}}function Lh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z||I[3]!==A.w)&&(i.uniform4i(this.addr,A.x,A.y,A.z,A.w),I[0]=A.x,I[1]=A.y,I[2]=A.z,I[3]=A.w);else{if(UI(I,A))return;i.uniform4iv(this.addr,A),JI(I,A)}}function Yh(i,A){const I=this.cache;I[0]!==A&&(i.uniform1ui(this.addr,A),I[0]=A)}function Hh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y)&&(i.uniform2ui(this.addr,A.x,A.y),I[0]=A.x,I[1]=A.y);else{if(UI(I,A))return;i.uniform2uiv(this.addr,A),JI(I,A)}}function mh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z)&&(i.uniform3ui(this.addr,A.x,A.y,A.z),I[0]=A.x,I[1]=A.y,I[2]=A.z);else{if(UI(I,A))return;i.uniform3uiv(this.addr,A),JI(I,A)}}function xh(i,A){const I=this.cache;if(A.x!==void 0)(I[0]!==A.x||I[1]!==A.y||I[2]!==A.z||I[3]!==A.w)&&(i.uniform4ui(this.addr,A.x,A.y,A.z,A.w),I[0]=A.x,I[1]=A.y,I[2]=A.z,I[3]=A.w);else{if(UI(I,A))return;i.uniform4uiv(this.addr,A),JI(I,A)}}function Th(i,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(i.uniform1i(this.addr,C),g[0]=C),I.setTexture2D(A||da,C)}function bh(i,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(i.uniform1i(this.addr,C),g[0]=C),I.setTexture3D(A||Ja,C)}function vh(i,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(i.uniform1i(this.addr,C),g[0]=C),I.setTextureCube(A||pa,C)}function Wh(i,A,I){const g=this.cache,C=I.allocateTextureUnit();g[0]!==C&&(i.uniform1i(this.addr,C),g[0]=C),I.setTexture2DArray(A||Ua,C)}function Oh(i){switch(i){case 5126:return Rh;case 35664:return Nh;case 35665:return Kh;case 35666:return dh;case 35674:return Uh;case 35675:return Jh;case 35676:return ph;case 5124:case 35670:return fh;case 35667:case 35671:return qh;case 35668:case 35672:return uh;case 35669:case 35673:return Lh;case 5125:return Yh;case 36294:return Hh;case 36295:return mh;case 36296:return xh;case 35678:case 36198:case 36298:case 36306:case 35682:return Th;case 35679:case 36299:case 36307:return bh;case 35680:case 36300:case 36308:case 36293:return vh;case 36289:case 36303:case 36311:case 36292:return Wh}}function _h(i,A){i.uniform1fv(this.addr,A)}function Ph(i,A){const I=MB(A,this.size,2);i.uniform2fv(this.addr,I)}function Zh(i,A){const I=MB(A,this.size,3);i.uniform3fv(this.addr,I)}function Vh(i,A){const I=MB(A,this.size,4);i.uniform4fv(this.addr,I)}function jh(i,A){const I=MB(A,this.size,4);i.uniformMatrix2fv(this.addr,!1,I)}function Xh(i,A){const I=MB(A,this.size,9);i.uniformMatrix3fv(this.addr,!1,I)}function zh(i,A){const I=MB(A,this.size,16);i.uniformMatrix4fv(this.addr,!1,I)}function $h(i,A){i.uniform1iv(this.addr,A)}function Ac(i,A){i.uniform2iv(this.addr,A)}function Ic(i,A){i.uniform3iv(this.addr,A)}function gc(i,A){i.uniform4iv(this.addr,A)}function Cc(i,A){i.uniform1uiv(this.addr,A)}function Bc(i,A){i.uniform2uiv(this.addr,A)}function Qc(i,A){i.uniform3uiv(this.addr,A)}function Ec(i,A){i.uniform4uiv(this.addr,A)}function ic(i,A,I){const g=this.cache,C=A.length,B=YE(I,C);UI(g,B)||(i.uniform1iv(this.addr,B),JI(g,B));for(let E=0;E!==C;++E)I.setTexture2D(A[E]||da,B[E])}function oc(i,A,I){const g=this.cache,C=A.length,B=YE(I,C);UI(g,B)||(i.uniform1iv(this.addr,B),JI(g,B));for(let E=0;E!==C;++E)I.setTexture3D(A[E]||Ja,B[E])}function tc(i,A,I){const g=this.cache,C=A.length,B=YE(I,C);UI(g,B)||(i.uniform1iv(this.addr,B),JI(g,B));for(let E=0;E!==C;++E)I.setTextureCube(A[E]||pa,B[E])}function ec(i,A,I){const g=this.cache,C=A.length,B=YE(I,C);UI(g,B)||(i.uniform1iv(this.addr,B),JI(g,B));for(let E=0;E!==C;++E)I.setTexture2DArray(A[E]||Ua,B[E])}function ac(i){switch(i){case 5126:return _h;case 35664:return Ph;case 35665:return Zh;case 35666:return Vh;case 35674:return jh;case 35675:return Xh;case 35676:return zh;case 5124:case 35670:return $h;case 35667:case 35671:return Ac;case 35668:case 35672:return Ic;case 35669:case 35673:return gc;case 5125:return Cc;case 36294:return Bc;case 36295:return Qc;case 36296:return Ec;case 35678:case 36198:case 36298:case 36306:case 35682:return ic;case 35679:case 36299:case 36307:return oc;case 35680:case 36300:case 36308:case 36293:return tc;case 36289:case 36303:case 36311:case 36292:return ec}}class sc{constructor(A,I,g){this.id=A,this.addr=g,this.cache=[],this.setValue=Oh(I.type)}}class nc{constructor(A,I,g){this.id=A,this.addr=g,this.cache=[],this.size=I.size,this.setValue=ac(I.type)}}class Dc{constructor(A){this.id=A,this.seq=[],this.map={}}setValue(A,I,g){const C=this.seq;for(let B=0,E=C.length;B!==E;++B){const Q=C[B];Q.setValue(A,I[Q.id],g)}}}const Ji=/(\w+)(\])?(\[|\.)?/g;function Ce(i,A){i.seq.push(A),i.map[A.id]=A}function rc(i,A,I){const g=i.name,C=g.length;for(Ji.lastIndex=0;;){const B=Ji.exec(g),E=Ji.lastIndex;let Q=B[1];const o=B[2]==="]",t=B[3];if(o&&(Q=Q|0),t===void 0||t==="["&&E+2===C){Ce(I,t===void 0?new sc(Q,i,A):new nc(Q,i,A));break}else{let a=I.map[Q];a===void 0&&(a=new Dc(Q),Ce(I,a)),I=a}}}class tE{constructor(A,I){this.seq=[],this.map={};const g=A.getProgramParameter(I,35718);for(let C=0;C<g;++C){const B=A.getActiveUniform(I,C),E=A.getUniformLocation(I,B.name);rc(B,E,this)}}setValue(A,I,g,C){const B=this.map[I];B!==void 0&&B.setValue(A,g,C)}setOptional(A,I,g){const C=I[g];C!==void 0&&this.setValue(A,g,C)}static upload(A,I,g,C){for(let B=0,E=I.length;B!==E;++B){const Q=I[B],o=g[Q.id];o.needsUpdate!==!1&&Q.setValue(A,o.value,C)}}static seqWithValue(A,I){const g=[];for(let C=0,B=A.length;C!==B;++C){const E=A[C];E.id in I&&g.push(E)}return g}}function Be(i,A,I){const g=i.createShader(A);return i.shaderSource(g,I),i.compileShader(g),g}let hc=0;function cc(i,A){const I=i.split(`
`),g=[],C=Math.max(A-6,0),B=Math.min(A+6,I.length);for(let E=C;E<B;E++){const Q=E+1;g.push(`${Q===A?">":" "} ${Q}: ${I[E]}`)}return g.join(`
`)}function wc(i){switch(i){case dC:return["Linear","( value )"];case hI:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",i),["Linear","( value )"]}}function Qe(i,A,I){const g=i.getShaderParameter(A,35713),C=i.getShaderInfoLog(A).trim();if(g&&C==="")return"";const B=/ERROR: 0:(\d+)/.exec(C);if(B){const E=parseInt(B[1]);return I.toUpperCase()+`

`+C+`

`+cc(i.getShaderSource(A),E)}else return C}function Gc(i,A){const I=wc(A);return"vec4 "+i+"( vec4 value ) { return LinearTo"+I[0]+I[1]+"; }"}function lc(i,A){let I;switch(A){case Hs:I="Linear";break;case ms:I="Reinhard";break;case xs:I="OptimizedCineon";break;case Ts:I="ACESFilmic";break;case bs:I="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",A),I="Linear"}return"vec3 "+i+"( vec3 color ) { return "+I+"ToneMapping( color ); }"}function Sc(i){return[i.extensionDerivatives||!!i.envMapCubeUVHeight||i.bumpMap||i.tangentSpaceNormalMap||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(PB).join(`
`)}function yc(i){const A=[];for(const I in i){const g=i[I];g!==!1&&A.push("#define "+I+" "+g)}return A.join(`
`)}function kc(i,A){const I={},g=i.getProgramParameter(A,35721);for(let C=0;C<g;C++){const B=i.getActiveAttrib(A,C),E=B.name;let Q=1;B.type===35674&&(Q=2),B.type===35675&&(Q=3),B.type===35676&&(Q=4),I[E]={type:B.type,location:i.getAttribLocation(A,E),locationSize:Q}}return I}function PB(i){return i!==""}function Ee(i,A){const I=A.numSpotLightShadows+A.numSpotLightMaps-A.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,A.numDirLights).replace(/NUM_SPOT_LIGHTS/g,A.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,A.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,I).replace(/NUM_RECT_AREA_LIGHTS/g,A.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,A.numPointLights).replace(/NUM_HEMI_LIGHTS/g,A.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,A.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,A.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,A.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,A.numPointLightShadows)}function ie(i,A){return i.replace(/NUM_CLIPPING_PLANES/g,A.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,A.numClippingPlanes-A.numClipIntersection)}const Mc=/^[ \t]*#include +<([\w\d./]+)>/gm;function $i(i){return i.replace(Mc,Fc)}function Fc(i,A){const I=_A[A];if(I===void 0)throw new Error("Can not resolve #include <"+A+">");return $i(I)}const Rc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oe(i){return i.replace(Rc,Nc)}function Nc(i,A,I,g){let C="";for(let B=parseInt(A);B<parseInt(I);B++)C+=g.replace(/\[\s*i\s*\]/g,"[ "+B+" ]").replace(/UNROLLED_LOOP_INDEX/g,B);return C}function te(i){let A="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?A+=`
#define HIGH_PRECISION`:i.precision==="mediump"?A+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(A+=`
#define LOW_PRECISION`),A}function Kc(i){let A="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===oa?A="SHADOWMAP_TYPE_PCF":i.shadowMapType===hs?A="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===_B&&(A="SHADOWMAP_TYPE_VSM"),A}function dc(i){let A="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case nB:case DB:A="ENVMAP_TYPE_CUBE";break;case qE:A="ENVMAP_TYPE_CUBE_UV";break}return A}function Uc(i){let A="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case DB:A="ENVMAP_MODE_REFRACTION";break}return A}function Jc(i){let A="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ro:A="ENVMAP_BLENDING_MULTIPLY";break;case Ls:A="ENVMAP_BLENDING_MIX";break;case Ys:A="ENVMAP_BLENDING_ADD";break}return A}function pc(i){const A=i.envMapCubeUVHeight;if(A===null)return null;const I=Math.log2(A)-2,g=1/A;return{texelWidth:1/(3*Math.max(Math.pow(2,I),7*16)),texelHeight:g,maxMip:I}}function fc(i,A,I,g){const C=i.getContext(),B=I.defines;let E=I.vertexShader,Q=I.fragmentShader;const o=Kc(I),t=dc(I),e=Uc(I),a=Jc(I),s=pc(I),D=I.isWebGL2?"":Sc(I),c=yc(B),r=C.createProgram();let n,l,G=I.glslVersion?"#version "+I.glslVersion+`
`:"";I.isRawShaderMaterial?(n=[c].filter(PB).join(`
`),n.length>0&&(n+=`
`),l=[D,c].filter(PB).join(`
`),l.length>0&&(l+=`
`)):(n=[te(I),"#define SHADER_NAME "+I.shaderName,c,I.instancing?"#define USE_INSTANCING":"",I.instancingColor?"#define USE_INSTANCING_COLOR":"",I.supportsVertexTextures?"#define VERTEX_TEXTURES":"",I.useFog&&I.fog?"#define USE_FOG":"",I.useFog&&I.fogExp2?"#define FOG_EXP2":"",I.map?"#define USE_MAP":"",I.envMap?"#define USE_ENVMAP":"",I.envMap?"#define "+e:"",I.lightMap?"#define USE_LIGHTMAP":"",I.aoMap?"#define USE_AOMAP":"",I.emissiveMap?"#define USE_EMISSIVEMAP":"",I.bumpMap?"#define USE_BUMPMAP":"",I.normalMap?"#define USE_NORMALMAP":"",I.normalMap&&I.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",I.normalMap&&I.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",I.clearcoatMap?"#define USE_CLEARCOATMAP":"",I.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",I.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",I.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",I.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",I.displacementMap&&I.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",I.specularMap?"#define USE_SPECULARMAP":"",I.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",I.specularColorMap?"#define USE_SPECULARCOLORMAP":"",I.roughnessMap?"#define USE_ROUGHNESSMAP":"",I.metalnessMap?"#define USE_METALNESSMAP":"",I.alphaMap?"#define USE_ALPHAMAP":"",I.transmission?"#define USE_TRANSMISSION":"",I.transmissionMap?"#define USE_TRANSMISSIONMAP":"",I.thicknessMap?"#define USE_THICKNESSMAP":"",I.sheenColorMap?"#define USE_SHEENCOLORMAP":"",I.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",I.vertexTangents?"#define USE_TANGENT":"",I.vertexColors?"#define USE_COLOR":"",I.vertexAlphas?"#define USE_COLOR_ALPHA":"",I.vertexUvs?"#define USE_UV":"",I.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",I.flatShading?"#define FLAT_SHADED":"",I.skinning?"#define USE_SKINNING":"",I.morphTargets?"#define USE_MORPHTARGETS":"",I.morphNormals&&I.flatShading===!1?"#define USE_MORPHNORMALS":"",I.morphColors&&I.isWebGL2?"#define USE_MORPHCOLORS":"",I.morphTargetsCount>0&&I.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",I.morphTargetsCount>0&&I.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+I.morphTextureStride:"",I.morphTargetsCount>0&&I.isWebGL2?"#define MORPHTARGETS_COUNT "+I.morphTargetsCount:"",I.doubleSided?"#define DOUBLE_SIDED":"",I.flipSided?"#define FLIP_SIDED":"",I.shadowMapEnabled?"#define USE_SHADOWMAP":"",I.shadowMapEnabled?"#define "+o:"",I.sizeAttenuation?"#define USE_SIZEATTENUATION":"",I.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",I.logarithmicDepthBuffer&&I.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(PB).join(`
`),l=[D,te(I),"#define SHADER_NAME "+I.shaderName,c,I.useFog&&I.fog?"#define USE_FOG":"",I.useFog&&I.fogExp2?"#define FOG_EXP2":"",I.map?"#define USE_MAP":"",I.matcap?"#define USE_MATCAP":"",I.envMap?"#define USE_ENVMAP":"",I.envMap?"#define "+t:"",I.envMap?"#define "+e:"",I.envMap?"#define "+a:"",s?"#define CUBEUV_TEXEL_WIDTH "+s.texelWidth:"",s?"#define CUBEUV_TEXEL_HEIGHT "+s.texelHeight:"",s?"#define CUBEUV_MAX_MIP "+s.maxMip+".0":"",I.lightMap?"#define USE_LIGHTMAP":"",I.aoMap?"#define USE_AOMAP":"",I.emissiveMap?"#define USE_EMISSIVEMAP":"",I.bumpMap?"#define USE_BUMPMAP":"",I.normalMap?"#define USE_NORMALMAP":"",I.normalMap&&I.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",I.normalMap&&I.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",I.clearcoat?"#define USE_CLEARCOAT":"",I.clearcoatMap?"#define USE_CLEARCOATMAP":"",I.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",I.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",I.iridescence?"#define USE_IRIDESCENCE":"",I.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",I.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",I.specularMap?"#define USE_SPECULARMAP":"",I.specularIntensityMap?"#define USE_SPECULARINTENSITYMAP":"",I.specularColorMap?"#define USE_SPECULARCOLORMAP":"",I.roughnessMap?"#define USE_ROUGHNESSMAP":"",I.metalnessMap?"#define USE_METALNESSMAP":"",I.alphaMap?"#define USE_ALPHAMAP":"",I.alphaTest?"#define USE_ALPHATEST":"",I.sheen?"#define USE_SHEEN":"",I.sheenColorMap?"#define USE_SHEENCOLORMAP":"",I.sheenRoughnessMap?"#define USE_SHEENROUGHNESSMAP":"",I.transmission?"#define USE_TRANSMISSION":"",I.transmissionMap?"#define USE_TRANSMISSIONMAP":"",I.thicknessMap?"#define USE_THICKNESSMAP":"",I.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",I.vertexTangents?"#define USE_TANGENT":"",I.vertexColors||I.instancingColor?"#define USE_COLOR":"",I.vertexAlphas?"#define USE_COLOR_ALPHA":"",I.vertexUvs?"#define USE_UV":"",I.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",I.gradientMap?"#define USE_GRADIENTMAP":"",I.flatShading?"#define FLAT_SHADED":"",I.doubleSided?"#define DOUBLE_SIDED":"",I.flipSided?"#define FLIP_SIDED":"",I.shadowMapEnabled?"#define USE_SHADOWMAP":"",I.shadowMapEnabled?"#define "+o:"",I.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",I.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",I.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",I.logarithmicDepthBuffer&&I.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",I.toneMapping!==Wg?"#define TONE_MAPPING":"",I.toneMapping!==Wg?_A.tonemapping_pars_fragment:"",I.toneMapping!==Wg?lc("toneMapping",I.toneMapping):"",I.dithering?"#define DITHERING":"",I.opaque?"#define OPAQUE":"",_A.encodings_pars_fragment,Gc("linearToOutputTexel",I.outputEncoding),I.useDepthPacking?"#define DEPTH_PACKING "+I.depthPacking:"",`
`].filter(PB).join(`
`)),E=$i(E),E=Ee(E,I),E=ie(E,I),Q=$i(Q),Q=Ee(Q,I),Q=ie(Q,I),E=oe(E),Q=oe(Q),I.isWebGL2&&I.isRawShaderMaterial!==!0&&(G=`#version 300 es
`,n=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+n,l=["#define varying in",I.glslVersion===pt?"":"layout(location = 0) out highp vec4 pc_fragColor;",I.glslVersion===pt?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+l);const S=G+n+E,k=G+l+Q,M=Be(C,35633,S),K=Be(C,35632,k);if(C.attachShader(r,M),C.attachShader(r,K),I.index0AttributeName!==void 0?C.bindAttribLocation(r,0,I.index0AttributeName):I.morphTargets===!0&&C.bindAttribLocation(r,0,"position"),C.linkProgram(r),i.debug.checkShaderErrors){const d=C.getProgramInfoLog(r).trim(),L=C.getShaderInfoLog(M).trim(),X=C.getShaderInfoLog(K).trim();let u=!0,q=!0;if(C.getProgramParameter(r,35714)===!1){u=!1;const J=Qe(C,M,"vertex"),m=Qe(C,K,"fragment");console.error("THREE.WebGLProgram: Shader Error "+C.getError()+" - VALIDATE_STATUS "+C.getProgramParameter(r,35715)+`

Program Info Log: `+d+`
`+J+`
`+m)}else d!==""?console.warn("THREE.WebGLProgram: Program Info Log:",d):(L===""||X==="")&&(q=!1);q&&(this.diagnostics={runnable:u,programLog:d,vertexShader:{log:L,prefix:n},fragmentShader:{log:X,prefix:l}})}C.deleteShader(M),C.deleteShader(K);let U;this.getUniforms=function(){return U===void 0&&(U=new tE(C,r)),U};let w;return this.getAttributes=function(){return w===void 0&&(w=kc(C,r)),w},this.destroy=function(){g.releaseStatesOfProgram(this),C.deleteProgram(r),this.program=void 0},this.name=I.shaderName,this.id=hc++,this.cacheKey=A,this.usedTimes=1,this.program=r,this.vertexShader=M,this.fragmentShader=K,this}let qc=0;class uc{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(A){const I=A.vertexShader,g=A.fragmentShader,C=this._getShaderStage(I),B=this._getShaderStage(g),E=this._getShaderCacheForMaterial(A);return E.has(C)===!1&&(E.add(C),C.usedTimes++),E.has(B)===!1&&(E.add(B),B.usedTimes++),this}remove(A){const I=this.materialCache.get(A);for(const g of I)g.usedTimes--,g.usedTimes===0&&this.shaderCache.delete(g.code);return this.materialCache.delete(A),this}getVertexShaderID(A){return this._getShaderStage(A.vertexShader).id}getFragmentShaderID(A){return this._getShaderStage(A.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(A){const I=this.materialCache;let g=I.get(A);return g===void 0&&(g=new Set,I.set(A,g)),g}_getShaderStage(A){const I=this.shaderCache;let g=I.get(A);return g===void 0&&(g=new Lc(A),I.set(A,g)),g}}class Lc{constructor(A){this.id=qc++,this.code=A,this.usedTimes=0}}function Yc(i,A,I,g,C,B,E){const Q=new la,o=new uc,t=[],e=C.isWebGL2,a=C.logarithmicDepthBuffer,s=C.vertexTextures;let D=C.precision;const c={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function r(w,d,L,X,u){const q=X.fog,J=u.geometry,m=w.isMeshStandardMaterial?X.environment:null,P=(w.isMeshStandardMaterial?I:A).get(w.envMap||m),iA=!!P&&P.mapping===qE?P.image.height:null,V=c[w.type];w.precision!==null&&(D=C.getMaxPrecision(w.precision),D!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",D,"instead."));const b=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,v=b!==void 0?b.length:0;let N=0;J.morphAttributes.position!==void 0&&(N=1),J.morphAttributes.normal!==void 0&&(N=2),J.morphAttributes.color!==void 0&&(N=3);let p,Z,O,W;if(V){const hA=pg[V];p=hA.vertexShader,Z=hA.fragmentShader}else p=w.vertexShader,Z=w.fragmentShader,o.update(w),O=o.getVertexShaderID(w),W=o.getFragmentShaderID(w);const Y=i.getRenderTarget(),QA=w.alphaTest>0,z=w.clearcoat>0,eA=w.iridescence>0;return{isWebGL2:e,shaderID:V,shaderName:w.type,vertexShader:p,fragmentShader:Z,defines:w.defines,customVertexShaderID:O,customFragmentShaderID:W,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:D,instancing:u.isInstancedMesh===!0,instancingColor:u.isInstancedMesh===!0&&u.instanceColor!==null,supportsVertexTextures:s,outputEncoding:Y===null?i.outputEncoding:Y.isXRRenderTarget===!0?Y.texture.encoding:dC,map:!!w.map,matcap:!!w.matcap,envMap:!!P,envMapMode:P&&P.mapping,envMapCubeUVHeight:iA,lightMap:!!w.lightMap,aoMap:!!w.aoMap,emissiveMap:!!w.emissiveMap,bumpMap:!!w.bumpMap,normalMap:!!w.normalMap,objectSpaceNormalMap:w.normalMapType===En,tangentSpaceNormalMap:w.normalMapType===Da,decodeVideoTexture:!!w.map&&w.map.isVideoTexture===!0&&w.map.encoding===hI,clearcoat:z,clearcoatMap:z&&!!w.clearcoatMap,clearcoatRoughnessMap:z&&!!w.clearcoatRoughnessMap,clearcoatNormalMap:z&&!!w.clearcoatNormalMap,iridescence:eA,iridescenceMap:eA&&!!w.iridescenceMap,iridescenceThicknessMap:eA&&!!w.iridescenceThicknessMap,displacementMap:!!w.displacementMap,roughnessMap:!!w.roughnessMap,metalnessMap:!!w.metalnessMap,specularMap:!!w.specularMap,specularIntensityMap:!!w.specularIntensityMap,specularColorMap:!!w.specularColorMap,opaque:w.transparent===!1&&w.blending===iB,alphaMap:!!w.alphaMap,alphaTest:QA,gradientMap:!!w.gradientMap,sheen:w.sheen>0,sheenColorMap:!!w.sheenColorMap,sheenRoughnessMap:!!w.sheenRoughnessMap,transmission:w.transmission>0,transmissionMap:!!w.transmissionMap,thicknessMap:!!w.thicknessMap,combine:w.combine,vertexTangents:!!w.normalMap&&!!J.attributes.tangent,vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,vertexUvs:!!w.map||!!w.bumpMap||!!w.normalMap||!!w.specularMap||!!w.alphaMap||!!w.emissiveMap||!!w.roughnessMap||!!w.metalnessMap||!!w.clearcoatMap||!!w.clearcoatRoughnessMap||!!w.clearcoatNormalMap||!!w.iridescenceMap||!!w.iridescenceThicknessMap||!!w.displacementMap||!!w.transmissionMap||!!w.thicknessMap||!!w.specularIntensityMap||!!w.specularColorMap||!!w.sheenColorMap||!!w.sheenRoughnessMap,uvsVertexOnly:!(!!w.map||!!w.bumpMap||!!w.normalMap||!!w.specularMap||!!w.alphaMap||!!w.emissiveMap||!!w.roughnessMap||!!w.metalnessMap||!!w.clearcoatNormalMap||!!w.iridescenceMap||!!w.iridescenceThicknessMap||w.transmission>0||!!w.transmissionMap||!!w.thicknessMap||!!w.specularIntensityMap||!!w.specularColorMap||w.sheen>0||!!w.sheenColorMap||!!w.sheenRoughnessMap)&&!!w.displacementMap,fog:!!q,useFog:w.fog===!0,fogExp2:q&&q.isFogExp2,flatShading:!!w.flatShading,sizeAttenuation:w.sizeAttenuation,logarithmicDepthBuffer:a,skinning:u.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:v,morphTextureStride:N,numDirLights:d.directional.length,numPointLights:d.point.length,numSpotLights:d.spot.length,numSpotLightMaps:d.spotLightMap.length,numRectAreaLights:d.rectArea.length,numHemiLights:d.hemi.length,numDirLightShadows:d.directionalShadowMap.length,numPointLightShadows:d.pointShadowMap.length,numSpotLightShadows:d.spotShadowMap.length,numSpotLightShadowsWithMaps:d.numSpotLightShadowsWithMaps,numClippingPlanes:E.numPlanes,numClipIntersection:E.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:w.toneMapped?i.toneMapping:Wg,physicallyCorrectLights:i.physicallyCorrectLights,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===DQ,flipSided:w.side===ig,useDepthPacking:!!w.depthPacking,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:w.extensions&&w.extensions.derivatives,extensionFragDepth:w.extensions&&w.extensions.fragDepth,extensionDrawBuffers:w.extensions&&w.extensions.drawBuffers,extensionShaderTextureLOD:w.extensions&&w.extensions.shaderTextureLOD,rendererExtensionFragDepth:e||g.has("EXT_frag_depth"),rendererExtensionDrawBuffers:e||g.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:e||g.has("EXT_shader_texture_lod"),customProgramCacheKey:w.customProgramCacheKey()}}function n(w){const d=[];if(w.shaderID?d.push(w.shaderID):(d.push(w.customVertexShaderID),d.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)d.push(L),d.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(l(d,w),G(d,w),d.push(i.outputEncoding)),d.push(w.customProgramCacheKey),d.join()}function l(w,d){w.push(d.precision),w.push(d.outputEncoding),w.push(d.envMapMode),w.push(d.envMapCubeUVHeight),w.push(d.combine),w.push(d.vertexUvs),w.push(d.fogExp2),w.push(d.sizeAttenuation),w.push(d.morphTargetsCount),w.push(d.morphAttributeCount),w.push(d.numDirLights),w.push(d.numPointLights),w.push(d.numSpotLights),w.push(d.numSpotLightMaps),w.push(d.numHemiLights),w.push(d.numRectAreaLights),w.push(d.numDirLightShadows),w.push(d.numPointLightShadows),w.push(d.numSpotLightShadows),w.push(d.numSpotLightShadowsWithMaps),w.push(d.shadowMapType),w.push(d.toneMapping),w.push(d.numClippingPlanes),w.push(d.numClipIntersection),w.push(d.depthPacking)}function G(w,d){Q.disableAll(),d.isWebGL2&&Q.enable(0),d.supportsVertexTextures&&Q.enable(1),d.instancing&&Q.enable(2),d.instancingColor&&Q.enable(3),d.map&&Q.enable(4),d.matcap&&Q.enable(5),d.envMap&&Q.enable(6),d.lightMap&&Q.enable(7),d.aoMap&&Q.enable(8),d.emissiveMap&&Q.enable(9),d.bumpMap&&Q.enable(10),d.normalMap&&Q.enable(11),d.objectSpaceNormalMap&&Q.enable(12),d.tangentSpaceNormalMap&&Q.enable(13),d.clearcoat&&Q.enable(14),d.clearcoatMap&&Q.enable(15),d.clearcoatRoughnessMap&&Q.enable(16),d.clearcoatNormalMap&&Q.enable(17),d.iridescence&&Q.enable(18),d.iridescenceMap&&Q.enable(19),d.iridescenceThicknessMap&&Q.enable(20),d.displacementMap&&Q.enable(21),d.specularMap&&Q.enable(22),d.roughnessMap&&Q.enable(23),d.metalnessMap&&Q.enable(24),d.gradientMap&&Q.enable(25),d.alphaMap&&Q.enable(26),d.alphaTest&&Q.enable(27),d.vertexColors&&Q.enable(28),d.vertexAlphas&&Q.enable(29),d.vertexUvs&&Q.enable(30),d.vertexTangents&&Q.enable(31),d.uvsVertexOnly&&Q.enable(32),w.push(Q.mask),Q.disableAll(),d.fog&&Q.enable(0),d.useFog&&Q.enable(1),d.flatShading&&Q.enable(2),d.logarithmicDepthBuffer&&Q.enable(3),d.skinning&&Q.enable(4),d.morphTargets&&Q.enable(5),d.morphNormals&&Q.enable(6),d.morphColors&&Q.enable(7),d.premultipliedAlpha&&Q.enable(8),d.shadowMapEnabled&&Q.enable(9),d.physicallyCorrectLights&&Q.enable(10),d.doubleSided&&Q.enable(11),d.flipSided&&Q.enable(12),d.useDepthPacking&&Q.enable(13),d.dithering&&Q.enable(14),d.specularIntensityMap&&Q.enable(15),d.specularColorMap&&Q.enable(16),d.transmission&&Q.enable(17),d.transmissionMap&&Q.enable(18),d.thicknessMap&&Q.enable(19),d.sheen&&Q.enable(20),d.sheenColorMap&&Q.enable(21),d.sheenRoughnessMap&&Q.enable(22),d.decodeVideoTexture&&Q.enable(23),d.opaque&&Q.enable(24),w.push(Q.mask)}function S(w){const d=c[w.type];let L;if(d){const X=pg[d];L=Ma.clone(X.uniforms)}else L=w.uniforms;return L}function k(w,d){let L;for(let X=0,u=t.length;X<u;X++){const q=t[X];if(q.cacheKey===d){L=q,++L.usedTimes;break}}return L===void 0&&(L=new fc(i,d,w,B),t.push(L)),L}function M(w){if(--w.usedTimes===0){const d=t.indexOf(w);t[d]=t[t.length-1],t.pop(),w.destroy()}}function K(w){o.remove(w)}function U(){o.dispose()}return{getParameters:r,getProgramCacheKey:n,getUniforms:S,acquireProgram:k,releaseProgram:M,releaseShaderCache:K,programs:t,dispose:U}}function Hc(){let i=new WeakMap;function A(B){let E=i.get(B);return E===void 0&&(E={},i.set(B,E)),E}function I(B){i.delete(B)}function g(B,E,Q){i.get(B)[E]=Q}function C(){i=new WeakMap}return{get:A,remove:I,update:g,dispose:C}}function mc(i,A){return i.groupOrder!==A.groupOrder?i.groupOrder-A.groupOrder:i.renderOrder!==A.renderOrder?i.renderOrder-A.renderOrder:i.material.id!==A.material.id?i.material.id-A.material.id:i.z!==A.z?i.z-A.z:i.id-A.id}function ee(i,A){return i.groupOrder!==A.groupOrder?i.groupOrder-A.groupOrder:i.renderOrder!==A.renderOrder?i.renderOrder-A.renderOrder:i.z!==A.z?A.z-i.z:i.id-A.id}function ae(){const i=[];let A=0;const I=[],g=[],C=[];function B(){A=0,I.length=0,g.length=0,C.length=0}function E(a,s,D,c,r,n){let l=i[A];return l===void 0?(l={id:a.id,object:a,geometry:s,material:D,groupOrder:c,renderOrder:a.renderOrder,z:r,group:n},i[A]=l):(l.id=a.id,l.object=a,l.geometry=s,l.material=D,l.groupOrder=c,l.renderOrder=a.renderOrder,l.z=r,l.group=n),A++,l}function Q(a,s,D,c,r,n){const l=E(a,s,D,c,r,n);D.transmission>0?g.push(l):D.transparent===!0?C.push(l):I.push(l)}function o(a,s,D,c,r,n){const l=E(a,s,D,c,r,n);D.transmission>0?g.unshift(l):D.transparent===!0?C.unshift(l):I.unshift(l)}function t(a,s){I.length>1&&I.sort(a||mc),g.length>1&&g.sort(s||ee),C.length>1&&C.sort(s||ee)}function e(){for(let a=A,s=i.length;a<s;a++){const D=i[a];if(D.id===null)break;D.id=null,D.object=null,D.geometry=null,D.material=null,D.group=null}}return{opaque:I,transmissive:g,transparent:C,init:B,push:Q,unshift:o,finish:e,sort:t}}function xc(){let i=new WeakMap;function A(g,C){const B=i.get(g);let E;return B===void 0?(E=new ae,i.set(g,[E])):C>=B.length?(E=new ae,B.push(E)):E=B[C],E}function I(){i=new WeakMap}return{get:A,dispose:I}}function Tc(){const i={};return{get:function(A){if(i[A.id]!==void 0)return i[A.id];let I;switch(A.type){case"DirectionalLight":I={direction:new j,color:new $A};break;case"SpotLight":I={position:new j,direction:new j,color:new $A,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":I={position:new j,color:new $A,distance:0,decay:0};break;case"HemisphereLight":I={direction:new j,skyColor:new $A,groundColor:new $A};break;case"RectAreaLight":I={color:new $A,position:new j,halfWidth:new j,halfHeight:new j};break}return i[A.id]=I,I}}}function bc(){const i={};return{get:function(A){if(i[A.id]!==void 0)return i[A.id];let I;switch(A.type){case"DirectionalLight":I={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new AI};break;case"SpotLight":I={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new AI};break;case"PointLight":I={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new AI,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[A.id]=I,I}}}let vc=0;function Wc(i,A){return(A.castShadow?2:0)-(i.castShadow?2:0)+(A.map?1:0)-(i.map?1:0)}function Oc(i,A){const I=new Tc,g=bc(),C={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let e=0;e<9;e++)C.probe.push(new j);const B=new j,E=new MI,Q=new MI;function o(e,a){let s=0,D=0,c=0;for(let X=0;X<9;X++)C.probe[X].set(0,0,0);let r=0,n=0,l=0,G=0,S=0,k=0,M=0,K=0,U=0,w=0;e.sort(Wc);const d=a!==!0?Math.PI:1;for(let X=0,u=e.length;X<u;X++){const q=e[X],J=q.color,m=q.intensity,P=q.distance,iA=q.shadow&&q.shadow.map?q.shadow.map.texture:null;if(q.isAmbientLight)s+=J.r*m*d,D+=J.g*m*d,c+=J.b*m*d;else if(q.isLightProbe)for(let V=0;V<9;V++)C.probe[V].addScaledVector(q.sh.coefficients[V],m);else if(q.isDirectionalLight){const V=I.get(q);if(V.color.copy(q.color).multiplyScalar(q.intensity*d),q.castShadow){const b=q.shadow,v=g.get(q);v.shadowBias=b.bias,v.shadowNormalBias=b.normalBias,v.shadowRadius=b.radius,v.shadowMapSize=b.mapSize,C.directionalShadow[r]=v,C.directionalShadowMap[r]=iA,C.directionalShadowMatrix[r]=q.shadow.matrix,k++}C.directional[r]=V,r++}else if(q.isSpotLight){const V=I.get(q);V.position.setFromMatrixPosition(q.matrixWorld),V.color.copy(J).multiplyScalar(m*d),V.distance=P,V.coneCos=Math.cos(q.angle),V.penumbraCos=Math.cos(q.angle*(1-q.penumbra)),V.decay=q.decay,C.spot[l]=V;const b=q.shadow;if(q.map&&(C.spotLightMap[U]=q.map,U++,b.updateMatrices(q),q.castShadow&&w++),C.spotLightMatrix[l]=b.matrix,q.castShadow){const v=g.get(q);v.shadowBias=b.bias,v.shadowNormalBias=b.normalBias,v.shadowRadius=b.radius,v.shadowMapSize=b.mapSize,C.spotShadow[l]=v,C.spotShadowMap[l]=iA,K++}l++}else if(q.isRectAreaLight){const V=I.get(q);V.color.copy(J).multiplyScalar(m),V.halfWidth.set(q.width*.5,0,0),V.halfHeight.set(0,q.height*.5,0),C.rectArea[G]=V,G++}else if(q.isPointLight){const V=I.get(q);if(V.color.copy(q.color).multiplyScalar(q.intensity*d),V.distance=q.distance,V.decay=q.decay,q.castShadow){const b=q.shadow,v=g.get(q);v.shadowBias=b.bias,v.shadowNormalBias=b.normalBias,v.shadowRadius=b.radius,v.shadowMapSize=b.mapSize,v.shadowCameraNear=b.camera.near,v.shadowCameraFar=b.camera.far,C.pointShadow[n]=v,C.pointShadowMap[n]=iA,C.pointShadowMatrix[n]=q.shadow.matrix,M++}C.point[n]=V,n++}else if(q.isHemisphereLight){const V=I.get(q);V.skyColor.copy(q.color).multiplyScalar(m*d),V.groundColor.copy(q.groundColor).multiplyScalar(m*d),C.hemi[S]=V,S++}}G>0&&(A.isWebGL2||i.has("OES_texture_float_linear")===!0?(C.rectAreaLTC1=NA.LTC_FLOAT_1,C.rectAreaLTC2=NA.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(C.rectAreaLTC1=NA.LTC_HALF_1,C.rectAreaLTC2=NA.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),C.ambient[0]=s,C.ambient[1]=D,C.ambient[2]=c;const L=C.hash;(L.directionalLength!==r||L.pointLength!==n||L.spotLength!==l||L.rectAreaLength!==G||L.hemiLength!==S||L.numDirectionalShadows!==k||L.numPointShadows!==M||L.numSpotShadows!==K||L.numSpotMaps!==U)&&(C.directional.length=r,C.spot.length=l,C.rectArea.length=G,C.point.length=n,C.hemi.length=S,C.directionalShadow.length=k,C.directionalShadowMap.length=k,C.pointShadow.length=M,C.pointShadowMap.length=M,C.spotShadow.length=K,C.spotShadowMap.length=K,C.directionalShadowMatrix.length=k,C.pointShadowMatrix.length=M,C.spotLightMatrix.length=K+U-w,C.spotLightMap.length=U,C.numSpotLightShadowsWithMaps=w,L.directionalLength=r,L.pointLength=n,L.spotLength=l,L.rectAreaLength=G,L.hemiLength=S,L.numDirectionalShadows=k,L.numPointShadows=M,L.numSpotShadows=K,L.numSpotMaps=U,C.version=vc++)}function t(e,a){let s=0,D=0,c=0,r=0,n=0;const l=a.matrixWorldInverse;for(let G=0,S=e.length;G<S;G++){const k=e[G];if(k.isDirectionalLight){const M=C.directional[s];M.direction.setFromMatrixPosition(k.matrixWorld),B.setFromMatrixPosition(k.target.matrixWorld),M.direction.sub(B),M.direction.transformDirection(l),s++}else if(k.isSpotLight){const M=C.spot[c];M.position.setFromMatrixPosition(k.matrixWorld),M.position.applyMatrix4(l),M.direction.setFromMatrixPosition(k.matrixWorld),B.setFromMatrixPosition(k.target.matrixWorld),M.direction.sub(B),M.direction.transformDirection(l),c++}else if(k.isRectAreaLight){const M=C.rectArea[r];M.position.setFromMatrixPosition(k.matrixWorld),M.position.applyMatrix4(l),Q.identity(),E.copy(k.matrixWorld),E.premultiply(l),Q.extractRotation(E),M.halfWidth.set(k.width*.5,0,0),M.halfHeight.set(0,k.height*.5,0),M.halfWidth.applyMatrix4(Q),M.halfHeight.applyMatrix4(Q),r++}else if(k.isPointLight){const M=C.point[D];M.position.setFromMatrixPosition(k.matrixWorld),M.position.applyMatrix4(l),D++}else if(k.isHemisphereLight){const M=C.hemi[n];M.direction.setFromMatrixPosition(k.matrixWorld),M.direction.transformDirection(l),n++}}}return{setup:o,setupView:t,state:C}}function se(i,A){const I=new Oc(i,A),g=[],C=[];function B(){g.length=0,C.length=0}function E(a){g.push(a)}function Q(a){C.push(a)}function o(a){I.setup(g,a)}function t(a){I.setupView(g,a)}return{init:B,state:{lightsArray:g,shadowsArray:C,lights:I},setupLights:o,setupLightsView:t,pushLight:E,pushShadow:Q}}function _c(i,A){let I=new WeakMap;function g(B,E=0){const Q=I.get(B);let o;return Q===void 0?(o=new se(i,A),I.set(B,[o])):E>=Q.length?(o=new se(i,A),Q.push(o)):o=Q[E],o}function C(){I=new WeakMap}return{get:g,dispose:C}}class fa extends wQ{constructor(A){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qn,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(A)}copy(A){return super.copy(A),this.depthPacking=A.depthPacking,this.map=A.map,this.alphaMap=A.alphaMap,this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this}}class qa extends wQ{constructor(A){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.referencePosition=new j,this.nearDistance=1,this.farDistance=1e3,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(A)}copy(A){return super.copy(A),this.referencePosition.copy(A.referencePosition),this.nearDistance=A.nearDistance,this.farDistance=A.farDistance,this.map=A.map,this.alphaMap=A.alphaMap,this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this}}const Pc=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zc=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Vc(i,A,I){let g=new No;const C=new AI,B=new AI,E=new rI,Q=new fa({depthPacking:na}),o=new qa,t={},e=I.maxTextureSize,a={0:ig,1:oC,2:DQ},s=new JC({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new AI},radius:{value:4}},vertexShader:Pc,fragmentShader:Zc}),D=s.clone();D.defines.HORIZONTAL_PASS=1;const c=new Zg;c.setAttribute("position",new Fg(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const r=new ng(c,s),n=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=oa,this.render=function(k,M,K){if(n.enabled===!1||n.autoUpdate===!1&&n.needsUpdate===!1||k.length===0)return;const U=i.getRenderTarget(),w=i.getActiveCubeFace(),d=i.getActiveMipmapLevel(),L=i.state;L.setBlending(BC),L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);for(let X=0,u=k.length;X<u;X++){const q=k[X],J=q.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;C.copy(J.mapSize);const m=J.getFrameExtents();if(C.multiply(m),B.copy(J.mapSize),(C.x>e||C.y>e)&&(C.x>e&&(B.x=Math.floor(e/m.x),C.x=B.x*m.x,J.mapSize.x=B.x),C.y>e&&(B.y=Math.floor(e/m.y),C.y=B.y*m.y,J.mapSize.y=B.y)),J.map===null){const iA=this.type!==_B?{minFilter:mI,magFilter:mI}:{};J.map=new UC(C.x,C.y,iA),J.map.texture.name=q.name+".shadowMap",J.camera.updateProjectionMatrix()}i.setRenderTarget(J.map),i.clear();const P=J.getViewportCount();for(let iA=0;iA<P;iA++){const V=J.getViewport(iA);E.set(B.x*V.x,B.y*V.y,B.x*V.z,B.y*V.w),L.viewport(E),J.updateMatrices(q,iA),g=J.getFrustum(),S(M,K,J.camera,q,this.type)}J.isPointLightShadow!==!0&&this.type===_B&&l(J,K),J.needsUpdate=!1}n.needsUpdate=!1,i.setRenderTarget(U,w,d)};function l(k,M){const K=A.update(r);s.defines.VSM_SAMPLES!==k.blurSamples&&(s.defines.VSM_SAMPLES=k.blurSamples,D.defines.VSM_SAMPLES=k.blurSamples,s.needsUpdate=!0,D.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new UC(C.x,C.y)),s.uniforms.shadow_pass.value=k.map.texture,s.uniforms.resolution.value=k.mapSize,s.uniforms.radius.value=k.radius,i.setRenderTarget(k.mapPass),i.clear(),i.renderBufferDirect(M,null,K,s,r,null),D.uniforms.shadow_pass.value=k.mapPass.texture,D.uniforms.resolution.value=k.mapSize,D.uniforms.radius.value=k.radius,i.setRenderTarget(k.map),i.clear(),i.renderBufferDirect(M,null,K,D,r,null)}function G(k,M,K,U,w,d){let L=null;const X=K.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(X!==void 0)L=X;else if(L=K.isPointLight===!0?o:Q,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const u=L.uuid,q=M.uuid;let J=t[u];J===void 0&&(J={},t[u]=J);let m=J[q];m===void 0&&(m=L.clone(),J[q]=m),L=m}return L.visible=M.visible,L.wireframe=M.wireframe,d===_B?L.side=M.shadowSide!==null?M.shadowSide:M.side:L.side=M.shadowSide!==null?M.shadowSide:a[M.side],L.alphaMap=M.alphaMap,L.alphaTest=M.alphaTest,L.map=M.map,L.clipShadows=M.clipShadows,L.clippingPlanes=M.clippingPlanes,L.clipIntersection=M.clipIntersection,L.displacementMap=M.displacementMap,L.displacementScale=M.displacementScale,L.displacementBias=M.displacementBias,L.wireframeLinewidth=M.wireframeLinewidth,L.linewidth=M.linewidth,K.isPointLight===!0&&L.isMeshDistanceMaterial===!0&&(L.referencePosition.setFromMatrixPosition(K.matrixWorld),L.nearDistance=U,L.farDistance=w),L}function S(k,M,K,U,w){if(k.visible===!1)return;if(k.layers.test(M.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&w===_B)&&(!k.frustumCulled||g.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,k.matrixWorld);const X=A.update(k),u=k.material;if(Array.isArray(u)){const q=X.groups;for(let J=0,m=q.length;J<m;J++){const P=q[J],iA=u[P.materialIndex];if(iA&&iA.visible){const V=G(k,iA,U,K.near,K.far,w);i.renderBufferDirect(K,null,X,V,k,P)}}}else if(u.visible){const q=G(k,u,U,K.near,K.far,w);i.renderBufferDirect(K,null,X,q,k,null)}}const L=k.children;for(let X=0,u=L.length;X<u;X++)S(L[X],M,K,U,w)}}function jc(i,A,I){const g=I.isWebGL2;function C(){let f=!1;const IA=new rI;let nA=null;const KA=new rI(0,0,0,0);return{setMask:function(fA){nA!==fA&&!f&&(i.colorMask(fA,fA,fA,fA),nA=fA)},setLocked:function(fA){f=fA},setClear:function(fA,ZA,BI,EI,iI){iI===!0&&(fA*=EI,ZA*=EI,BI*=EI),IA.set(fA,ZA,BI,EI),KA.equals(IA)===!1&&(i.clearColor(fA,ZA,BI,EI),KA.copy(IA))},reset:function(){f=!1,nA=null,KA.set(-1,0,0,0)}}}function B(){let f=!1,IA=null,nA=null,KA=null;return{setTest:function(fA){fA?QA(2929):z(2929)},setMask:function(fA){IA!==fA&&!f&&(i.depthMask(fA),IA=fA)},setFunc:function(fA){if(nA!==fA){switch(fA){case ds:i.depthFunc(512);break;case Us:i.depthFunc(519);break;case Js:i.depthFunc(513);break;case Pi:i.depthFunc(515);break;case ps:i.depthFunc(514);break;case fs:i.depthFunc(518);break;case qs:i.depthFunc(516);break;case us:i.depthFunc(517);break;default:i.depthFunc(515)}nA=fA}},setLocked:function(fA){f=fA},setClear:function(fA){KA!==fA&&(i.clearDepth(fA),KA=fA)},reset:function(){f=!1,IA=null,nA=null,KA=null}}}function E(){let f=!1,IA=null,nA=null,KA=null,fA=null,ZA=null,BI=null,EI=null,iI=null;return{setTest:function(oI){f||(oI?QA(2960):z(2960))},setMask:function(oI){IA!==oI&&!f&&(i.stencilMask(oI),IA=oI)},setFunc:function(oI,QI,zA){(nA!==oI||KA!==QI||fA!==zA)&&(i.stencilFunc(oI,QI,zA),nA=oI,KA=QI,fA=zA)},setOp:function(oI,QI,zA){(ZA!==oI||BI!==QI||EI!==zA)&&(i.stencilOp(oI,QI,zA),ZA=oI,BI=QI,EI=zA)},setLocked:function(oI){f=oI},setClear:function(oI){iI!==oI&&(i.clearStencil(oI),iI=oI)},reset:function(){f=!1,IA=null,nA=null,KA=null,fA=null,ZA=null,BI=null,EI=null,iI=null}}}const Q=new C,o=new B,t=new E,e=new WeakMap,a=new WeakMap;let s={},D={},c=new WeakMap,r=[],n=null,l=!1,G=null,S=null,k=null,M=null,K=null,U=null,w=null,d=!1,L=null,X=null,u=null,q=null,J=null;const m=i.getParameter(35661);let P=!1,iA=0;const V=i.getParameter(7938);V.indexOf("WebGL")!==-1?(iA=parseFloat(/^WebGL (\d)/.exec(V)[1]),P=iA>=1):V.indexOf("OpenGL ES")!==-1&&(iA=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),P=iA>=2);let b=null,v={};const N=i.getParameter(3088),p=i.getParameter(2978),Z=new rI().fromArray(N),O=new rI().fromArray(p);function W(f,IA,nA){const KA=new Uint8Array(4),fA=i.createTexture();i.bindTexture(f,fA),i.texParameteri(f,10241,9728),i.texParameteri(f,10240,9728);for(let ZA=0;ZA<nA;ZA++)i.texImage2D(IA+ZA,0,6408,1,1,0,6408,5121,KA);return fA}const Y={};Y[3553]=W(3553,3553,1),Y[34067]=W(34067,34069,6),Q.setClear(0,0,0,1),o.setClear(1),t.setClear(0),QA(2929),o.setFunc(Pi),dA(!1),YA(Ct),QA(2884),HA(BC);function QA(f){s[f]!==!0&&(i.enable(f),s[f]=!0)}function z(f){s[f]!==!1&&(i.disable(f),s[f]=!1)}function eA(f,IA){return D[f]!==IA?(i.bindFramebuffer(f,IA),D[f]=IA,g&&(f===36009&&(D[36160]=IA),f===36160&&(D[36009]=IA)),!0):!1}function tA(f,IA){let nA=r,KA=!1;if(f)if(nA=c.get(IA),nA===void 0&&(nA=[],c.set(IA,nA)),f.isWebGLMultipleRenderTargets){const fA=f.texture;if(nA.length!==fA.length||nA[0]!==36064){for(let ZA=0,BI=fA.length;ZA<BI;ZA++)nA[ZA]=36064+ZA;nA.length=fA.length,KA=!0}}else nA[0]!==36064&&(nA[0]=36064,KA=!0);else nA[0]!==1029&&(nA[0]=1029,KA=!0);KA&&(I.isWebGL2?i.drawBuffers(nA):A.get("WEBGL_draw_buffers").drawBuffersWEBGL(nA))}function hA(f){return n!==f?(i.useProgram(f),n=f,!0):!1}const EA={[BB]:32774,[ws]:32778,[Gs]:32779};if(g)EA[it]=32775,EA[ot]=32776;else{const f=A.get("EXT_blend_minmax");f!==null&&(EA[it]=f.MIN_EXT,EA[ot]=f.MAX_EXT)}const kA={[ls]:0,[Ss]:1,[ys]:768,[ta]:770,[Ks]:776,[Rs]:774,[Ms]:772,[ks]:769,[ea]:771,[Ns]:775,[Fs]:773};function HA(f,IA,nA,KA,fA,ZA,BI,EI){if(f===BC){l===!0&&(z(3042),l=!1);return}if(l===!1&&(QA(3042),l=!0),f!==cs){if(f!==G||EI!==d){if((S!==BB||K!==BB)&&(i.blendEquation(32774),S=BB,K=BB),EI)switch(f){case iB:i.blendFuncSeparate(1,771,1,771);break;case Bt:i.blendFunc(1,1);break;case Qt:i.blendFuncSeparate(0,769,0,1);break;case Et:i.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",f);break}else switch(f){case iB:i.blendFuncSeparate(770,771,1,771);break;case Bt:i.blendFunc(770,1);break;case Qt:i.blendFuncSeparate(0,769,0,1);break;case Et:i.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",f);break}k=null,M=null,U=null,w=null,G=f,d=EI}return}fA=fA||IA,ZA=ZA||nA,BI=BI||KA,(IA!==S||fA!==K)&&(i.blendEquationSeparate(EA[IA],EA[fA]),S=IA,K=fA),(nA!==k||KA!==M||ZA!==U||BI!==w)&&(i.blendFuncSeparate(kA[nA],kA[KA],kA[ZA],kA[BI]),k=nA,M=KA,U=ZA,w=BI),G=f,d=!1}function yA(f,IA){f.side===DQ?z(2884):QA(2884);let nA=f.side===ig;IA&&(nA=!nA),dA(nA),f.blending===iB&&f.transparent===!1?HA(BC):HA(f.blending,f.blendEquation,f.blendSrc,f.blendDst,f.blendEquationAlpha,f.blendSrcAlpha,f.blendDstAlpha,f.premultipliedAlpha),o.setFunc(f.depthFunc),o.setTest(f.depthTest),o.setMask(f.depthWrite),Q.setMask(f.colorWrite);const KA=f.stencilWrite;t.setTest(KA),KA&&(t.setMask(f.stencilWriteMask),t.setFunc(f.stencilFunc,f.stencilRef,f.stencilFuncMask),t.setOp(f.stencilFail,f.stencilZFail,f.stencilZPass)),FA(f.polygonOffset,f.polygonOffsetFactor,f.polygonOffsetUnits),f.alphaToCoverage===!0?QA(32926):z(32926)}function dA(f){L!==f&&(f?i.frontFace(2304):i.frontFace(2305),L=f)}function YA(f){f!==Ds?(QA(2884),f!==X&&(f===Ct?i.cullFace(1029):f===rs?i.cullFace(1028):i.cullFace(1032))):z(2884),X=f}function DA(f){f!==u&&(P&&i.lineWidth(f),u=f)}function FA(f,IA,nA){f?(QA(32823),(q!==IA||J!==nA)&&(i.polygonOffset(IA,nA),q=IA,J=nA)):z(32823)}function UA(f){f?QA(3089):z(3089)}function rA(f){f===void 0&&(f=33984+m-1),b!==f&&(i.activeTexture(f),b=f)}function F(f,IA,nA){nA===void 0&&(b===null?nA=33984+m-1:nA=b);let KA=v[nA];KA===void 0&&(KA={type:void 0,texture:void 0},v[nA]=KA),(KA.type!==f||KA.texture!==IA)&&(b!==nA&&(i.activeTexture(nA),b=nA),i.bindTexture(f,IA||Y[f]),KA.type=f,KA.texture=IA)}function y(){const f=v[b];f!==void 0&&f.type!==void 0&&(i.bindTexture(f.type,null),f.type=void 0,f.texture=void 0)}function x(){try{i.compressedTexImage2D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function aA(){try{i.texSubImage2D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function cA(){try{i.texSubImage3D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function GA(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function sA(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function gA(){try{i.texStorage2D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function JA(){try{i.texStorage3D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function lA(){try{i.texImage2D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function MA(){try{i.texImage3D.apply(i,arguments)}catch(f){console.error("THREE.WebGLState:",f)}}function SA(f){Z.equals(f)===!1&&(i.scissor(f.x,f.y,f.z,f.w),Z.copy(f))}function wA(f){O.equals(f)===!1&&(i.viewport(f.x,f.y,f.z,f.w),O.copy(f))}function uA(f,IA){let nA=a.get(IA);nA===void 0&&(nA=new WeakMap,a.set(IA,nA));let KA=nA.get(f);KA===void 0&&(KA=i.getUniformBlockIndex(IA,f.name),nA.set(f,KA))}function mA(f,IA){const KA=a.get(IA).get(f);e.get(IA)!==KA&&(i.uniformBlockBinding(IA,KA,f.__bindingPointIndex),e.set(IA,KA))}function PA(){i.disable(3042),i.disable(2884),i.disable(2929),i.disable(32823),i.disable(3089),i.disable(2960),i.disable(32926),i.blendEquation(32774),i.blendFunc(1,0),i.blendFuncSeparate(1,0,1,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(513),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(519,0,4294967295),i.stencilOp(7680,7680,7680),i.clearStencil(0),i.cullFace(1029),i.frontFace(2305),i.polygonOffset(0,0),i.activeTexture(33984),i.bindFramebuffer(36160,null),g===!0&&(i.bindFramebuffer(36009,null),i.bindFramebuffer(36008,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),s={},b=null,v={},D={},c=new WeakMap,r=[],n=null,l=!1,G=null,S=null,k=null,M=null,K=null,U=null,w=null,d=!1,L=null,X=null,u=null,q=null,J=null,Z.set(0,0,i.canvas.width,i.canvas.height),O.set(0,0,i.canvas.width,i.canvas.height),Q.reset(),o.reset(),t.reset()}return{buffers:{color:Q,depth:o,stencil:t},enable:QA,disable:z,bindFramebuffer:eA,drawBuffers:tA,useProgram:hA,setBlending:HA,setMaterial:yA,setFlipSided:dA,setCullFace:YA,setLineWidth:DA,setPolygonOffset:FA,setScissorTest:UA,activeTexture:rA,bindTexture:F,unbindTexture:y,compressedTexImage2D:x,compressedTexImage3D:$,texImage2D:lA,texImage3D:MA,updateUBOMapping:uA,uniformBlockBinding:mA,texStorage2D:gA,texStorage3D:JA,texSubImage2D:aA,texSubImage3D:cA,compressedTexSubImage2D:GA,compressedTexSubImage3D:sA,scissor:SA,viewport:wA,reset:PA}}function Xc(i,A,I,g,C,B,E){const Q=C.isWebGL2,o=C.maxTextures,t=C.maxCubemapSize,e=C.maxTextureSize,a=C.maxSamples,s=A.has("WEBGL_multisampled_render_to_texture")?A.get("WEBGL_multisampled_render_to_texture"):null,D=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new WeakMap;let r;const n=new WeakMap;let l=!1;try{l=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function G(F,y){return l?new OffscreenCanvas(F,y):kE("canvas")}function S(F,y,x,$){let aA=1;if((F.width>$||F.height>$)&&(aA=$/Math.max(F.width,F.height)),aA<1||y===!0)if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap){const cA=y?zi:Math.floor,GA=cA(aA*F.width),sA=cA(aA*F.height);r===void 0&&(r=G(GA,sA));const gA=x?G(GA,sA):r;return gA.width=GA,gA.height=sA,gA.getContext("2d").drawImage(F,0,0,GA,sA),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+F.width+"x"+F.height+") to ("+GA+"x"+sA+")."),gA}else return"data"in F&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+F.width+"x"+F.height+")."),F;return F}function k(F){return qt(F.width)&&qt(F.height)}function M(F){return Q?!1:F.wrapS!==kg||F.wrapT!==kg||F.minFilter!==mI&&F.minFilter!==zI}function K(F,y){return F.generateMipmaps&&y&&F.minFilter!==mI&&F.minFilter!==zI}function U(F){i.generateMipmap(F)}function w(F,y,x,$,aA=!1){if(Q===!1)return y;if(F!==null){if(i[F]!==void 0)return i[F];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let cA=y;return y===6403&&(x===5126&&(cA=33326),x===5131&&(cA=33325),x===5121&&(cA=33321)),y===33319&&(x===5126&&(cA=33328),x===5131&&(cA=33327),x===5121&&(cA=33323)),y===6408&&(x===5126&&(cA=34836),x===5131&&(cA=34842),x===5121&&(cA=$===hI&&aA===!1?35907:32856),x===32819&&(cA=32854),x===32820&&(cA=32855)),(cA===33325||cA===33326||cA===33327||cA===33328||cA===34842||cA===34836)&&A.get("EXT_color_buffer_float"),cA}function d(F,y,x){return K(F,x)===!0||F.isFramebufferTexture&&F.minFilter!==mI&&F.minFilter!==zI?Math.log2(Math.max(y.width,y.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?y.mipmaps.length:1}function L(F){return F===mI||F===tt||F===Ii?9728:9729}function X(F){const y=F.target;y.removeEventListener("dispose",X),q(y),y.isVideoTexture&&c.delete(y)}function u(F){const y=F.target;y.removeEventListener("dispose",u),m(y)}function q(F){const y=g.get(F);if(y.__webglInit===void 0)return;const x=F.source,$=n.get(x);if($){const aA=$[y.__cacheKey];aA.usedTimes--,aA.usedTimes===0&&J(F),Object.keys($).length===0&&n.delete(x)}g.remove(F)}function J(F){const y=g.get(F);i.deleteTexture(y.__webglTexture);const x=F.source,$=n.get(x);delete $[y.__cacheKey],E.memory.textures--}function m(F){const y=F.texture,x=g.get(F),$=g.get(y);if($.__webglTexture!==void 0&&(i.deleteTexture($.__webglTexture),E.memory.textures--),F.depthTexture&&F.depthTexture.dispose(),F.isWebGLCubeRenderTarget)for(let aA=0;aA<6;aA++)i.deleteFramebuffer(x.__webglFramebuffer[aA]),x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[aA]);else{if(i.deleteFramebuffer(x.__webglFramebuffer),x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let aA=0;aA<x.__webglColorRenderbuffer.length;aA++)x.__webglColorRenderbuffer[aA]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[aA]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}if(F.isWebGLMultipleRenderTargets)for(let aA=0,cA=y.length;aA<cA;aA++){const GA=g.get(y[aA]);GA.__webglTexture&&(i.deleteTexture(GA.__webglTexture),E.memory.textures--),g.remove(y[aA])}g.remove(y),g.remove(F)}let P=0;function iA(){P=0}function V(){const F=P;return F>=o&&console.warn("THREE.WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+o),P+=1,F}function b(F){const y=[];return y.push(F.wrapS),y.push(F.wrapT),y.push(F.wrapR||0),y.push(F.magFilter),y.push(F.minFilter),y.push(F.anisotropy),y.push(F.internalFormat),y.push(F.format),y.push(F.type),y.push(F.generateMipmaps),y.push(F.premultiplyAlpha),y.push(F.flipY),y.push(F.unpackAlignment),y.push(F.encoding),y.join()}function v(F,y){const x=g.get(F);if(F.isVideoTexture&&UA(F),F.isRenderTargetTexture===!1&&F.version>0&&x.__version!==F.version){const $=F.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{z(x,F,y);return}}I.bindTexture(3553,x.__webglTexture,33984+y)}function N(F,y){const x=g.get(F);if(F.version>0&&x.__version!==F.version){z(x,F,y);return}I.bindTexture(35866,x.__webglTexture,33984+y)}function p(F,y){const x=g.get(F);if(F.version>0&&x.__version!==F.version){z(x,F,y);return}I.bindTexture(32879,x.__webglTexture,33984+y)}function Z(F,y){const x=g.get(F);if(F.version>0&&x.__version!==F.version){eA(x,F,y);return}I.bindTexture(34067,x.__webglTexture,33984+y)}const O={[BQ]:10497,[kg]:33071,[ji]:33648},W={[mI]:9728,[tt]:9984,[Ii]:9986,[zI]:9729,[vs]:9985,[QQ]:9987};function Y(F,y,x){if(x?(i.texParameteri(F,10242,O[y.wrapS]),i.texParameteri(F,10243,O[y.wrapT]),(F===32879||F===35866)&&i.texParameteri(F,32882,O[y.wrapR]),i.texParameteri(F,10240,W[y.magFilter]),i.texParameteri(F,10241,W[y.minFilter])):(i.texParameteri(F,10242,33071),i.texParameteri(F,10243,33071),(F===32879||F===35866)&&i.texParameteri(F,32882,33071),(y.wrapS!==kg||y.wrapT!==kg)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(F,10240,L(y.magFilter)),i.texParameteri(F,10241,L(y.minFilter)),y.minFilter!==mI&&y.minFilter!==zI&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.has("EXT_texture_filter_anisotropic")===!0){const $=A.get("EXT_texture_filter_anisotropic");if(y.magFilter===mI||y.minFilter!==Ii&&y.minFilter!==QQ||y.type===lC&&A.has("OES_texture_float_linear")===!1||Q===!1&&y.type===EQ&&A.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||g.get(y).__currentAnisotropy)&&(i.texParameterf(F,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,C.getMaxAnisotropy())),g.get(y).__currentAnisotropy=y.anisotropy)}}function QA(F,y){let x=!1;F.__webglInit===void 0&&(F.__webglInit=!0,y.addEventListener("dispose",X));const $=y.source;let aA=n.get($);aA===void 0&&(aA={},n.set($,aA));const cA=b(y);if(cA!==F.__cacheKey){aA[cA]===void 0&&(aA[cA]={texture:i.createTexture(),usedTimes:0},E.memory.textures++,x=!0),aA[cA].usedTimes++;const GA=aA[F.__cacheKey];GA!==void 0&&(aA[F.__cacheKey].usedTimes--,GA.usedTimes===0&&J(y)),F.__cacheKey=cA,F.__webglTexture=aA[cA].texture}return x}function z(F,y,x){let $=3553;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=35866),y.isData3DTexture&&($=32879);const aA=QA(F,y),cA=y.source;I.bindTexture($,F.__webglTexture,33984+x);const GA=g.get(cA);if(cA.version!==GA.__version||aA===!0){I.activeTexture(33984+x),i.pixelStorei(37440,y.flipY),i.pixelStorei(37441,y.premultiplyAlpha),i.pixelStorei(3317,y.unpackAlignment),i.pixelStorei(37443,0);const sA=M(y)&&k(y.image)===!1;let gA=S(y.image,sA,!1,e);gA=rA(y,gA);const JA=k(gA)||Q,lA=B.convert(y.format,y.encoding);let MA=B.convert(y.type),SA=w(y.internalFormat,lA,MA,y.encoding,y.isVideoTexture);Y($,y,JA);let wA;const uA=y.mipmaps,mA=Q&&y.isVideoTexture!==!0,PA=GA.__version===void 0||aA===!0,f=d(y,gA,JA);if(y.isDepthTexture)SA=6402,Q?y.type===lC?SA=36012:y.type===GC?SA=33190:y.type===oB?SA=35056:SA=33189:y.type===lC&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===kC&&SA===6402&&y.type!==sa&&y.type!==GC&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=GC,MA=B.convert(y.type)),y.format===rB&&SA===6402&&(SA=34041,y.type!==oB&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=oB,MA=B.convert(y.type))),PA&&(mA?I.texStorage2D(3553,1,SA,gA.width,gA.height):I.texImage2D(3553,0,SA,gA.width,gA.height,0,lA,MA,null));else if(y.isDataTexture)if(uA.length>0&&JA){mA&&PA&&I.texStorage2D(3553,f,SA,uA[0].width,uA[0].height);for(let IA=0,nA=uA.length;IA<nA;IA++)wA=uA[IA],mA?I.texSubImage2D(3553,IA,0,0,wA.width,wA.height,lA,MA,wA.data):I.texImage2D(3553,IA,SA,wA.width,wA.height,0,lA,MA,wA.data);y.generateMipmaps=!1}else mA?(PA&&I.texStorage2D(3553,f,SA,gA.width,gA.height),I.texSubImage2D(3553,0,0,0,gA.width,gA.height,lA,MA,gA.data)):I.texImage2D(3553,0,SA,gA.width,gA.height,0,lA,MA,gA.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){mA&&PA&&I.texStorage3D(35866,f,SA,uA[0].width,uA[0].height,gA.depth);for(let IA=0,nA=uA.length;IA<nA;IA++)wA=uA[IA],y.format!==Mg?lA!==null?mA?I.compressedTexSubImage3D(35866,IA,0,0,0,wA.width,wA.height,gA.depth,lA,wA.data,0,0):I.compressedTexImage3D(35866,IA,SA,wA.width,wA.height,gA.depth,0,wA.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mA?I.texSubImage3D(35866,IA,0,0,0,wA.width,wA.height,gA.depth,lA,MA,wA.data):I.texImage3D(35866,IA,SA,wA.width,wA.height,gA.depth,0,lA,MA,wA.data)}else{mA&&PA&&I.texStorage2D(3553,f,SA,uA[0].width,uA[0].height);for(let IA=0,nA=uA.length;IA<nA;IA++)wA=uA[IA],y.format!==Mg?lA!==null?mA?I.compressedTexSubImage2D(3553,IA,0,0,wA.width,wA.height,lA,wA.data):I.compressedTexImage2D(3553,IA,SA,wA.width,wA.height,0,wA.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):mA?I.texSubImage2D(3553,IA,0,0,wA.width,wA.height,lA,MA,wA.data):I.texImage2D(3553,IA,SA,wA.width,wA.height,0,lA,MA,wA.data)}else if(y.isDataArrayTexture)mA?(PA&&I.texStorage3D(35866,f,SA,gA.width,gA.height,gA.depth),I.texSubImage3D(35866,0,0,0,0,gA.width,gA.height,gA.depth,lA,MA,gA.data)):I.texImage3D(35866,0,SA,gA.width,gA.height,gA.depth,0,lA,MA,gA.data);else if(y.isData3DTexture)mA?(PA&&I.texStorage3D(32879,f,SA,gA.width,gA.height,gA.depth),I.texSubImage3D(32879,0,0,0,0,gA.width,gA.height,gA.depth,lA,MA,gA.data)):I.texImage3D(32879,0,SA,gA.width,gA.height,gA.depth,0,lA,MA,gA.data);else if(y.isFramebufferTexture){if(PA)if(mA)I.texStorage2D(3553,f,SA,gA.width,gA.height);else{let IA=gA.width,nA=gA.height;for(let KA=0;KA<f;KA++)I.texImage2D(3553,KA,SA,IA,nA,0,lA,MA,null),IA>>=1,nA>>=1}}else if(uA.length>0&&JA){mA&&PA&&I.texStorage2D(3553,f,SA,uA[0].width,uA[0].height);for(let IA=0,nA=uA.length;IA<nA;IA++)wA=uA[IA],mA?I.texSubImage2D(3553,IA,0,0,lA,MA,wA):I.texImage2D(3553,IA,SA,lA,MA,wA);y.generateMipmaps=!1}else mA?(PA&&I.texStorage2D(3553,f,SA,gA.width,gA.height),I.texSubImage2D(3553,0,0,0,lA,MA,gA)):I.texImage2D(3553,0,SA,lA,MA,gA);K(y,JA)&&U($),GA.__version=cA.version,y.onUpdate&&y.onUpdate(y)}F.__version=y.version}function eA(F,y,x){if(y.image.length!==6)return;const $=QA(F,y),aA=y.source;I.bindTexture(34067,F.__webglTexture,33984+x);const cA=g.get(aA);if(aA.version!==cA.__version||$===!0){I.activeTexture(33984+x),i.pixelStorei(37440,y.flipY),i.pixelStorei(37441,y.premultiplyAlpha),i.pixelStorei(3317,y.unpackAlignment),i.pixelStorei(37443,0);const GA=y.isCompressedTexture||y.image[0].isCompressedTexture,sA=y.image[0]&&y.image[0].isDataTexture,gA=[];for(let IA=0;IA<6;IA++)!GA&&!sA?gA[IA]=S(y.image[IA],!1,!0,t):gA[IA]=sA?y.image[IA].image:y.image[IA],gA[IA]=rA(y,gA[IA]);const JA=gA[0],lA=k(JA)||Q,MA=B.convert(y.format,y.encoding),SA=B.convert(y.type),wA=w(y.internalFormat,MA,SA,y.encoding),uA=Q&&y.isVideoTexture!==!0,mA=cA.__version===void 0||$===!0;let PA=d(y,JA,lA);Y(34067,y,lA);let f;if(GA){uA&&mA&&I.texStorage2D(34067,PA,wA,JA.width,JA.height);for(let IA=0;IA<6;IA++){f=gA[IA].mipmaps;for(let nA=0;nA<f.length;nA++){const KA=f[nA];y.format!==Mg?MA!==null?uA?I.compressedTexSubImage2D(34069+IA,nA,0,0,KA.width,KA.height,MA,KA.data):I.compressedTexImage2D(34069+IA,nA,wA,KA.width,KA.height,0,KA.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):uA?I.texSubImage2D(34069+IA,nA,0,0,KA.width,KA.height,MA,SA,KA.data):I.texImage2D(34069+IA,nA,wA,KA.width,KA.height,0,MA,SA,KA.data)}}}else{f=y.mipmaps,uA&&mA&&(f.length>0&&PA++,I.texStorage2D(34067,PA,wA,gA[0].width,gA[0].height));for(let IA=0;IA<6;IA++)if(sA){uA?I.texSubImage2D(34069+IA,0,0,0,gA[IA].width,gA[IA].height,MA,SA,gA[IA].data):I.texImage2D(34069+IA,0,wA,gA[IA].width,gA[IA].height,0,MA,SA,gA[IA].data);for(let nA=0;nA<f.length;nA++){const fA=f[nA].image[IA].image;uA?I.texSubImage2D(34069+IA,nA+1,0,0,fA.width,fA.height,MA,SA,fA.data):I.texImage2D(34069+IA,nA+1,wA,fA.width,fA.height,0,MA,SA,fA.data)}}else{uA?I.texSubImage2D(34069+IA,0,0,0,MA,SA,gA[IA]):I.texImage2D(34069+IA,0,wA,MA,SA,gA[IA]);for(let nA=0;nA<f.length;nA++){const KA=f[nA];uA?I.texSubImage2D(34069+IA,nA+1,0,0,MA,SA,KA.image[IA]):I.texImage2D(34069+IA,nA+1,wA,MA,SA,KA.image[IA])}}}K(y,lA)&&U(34067),cA.__version=aA.version,y.onUpdate&&y.onUpdate(y)}F.__version=y.version}function tA(F,y,x,$,aA){const cA=B.convert(x.format,x.encoding),GA=B.convert(x.type),sA=w(x.internalFormat,cA,GA,x.encoding);g.get(y).__hasExternalTextures||(aA===32879||aA===35866?I.texImage3D(aA,0,sA,y.width,y.height,y.depth,0,cA,GA,null):I.texImage2D(aA,0,sA,y.width,y.height,0,cA,GA,null)),I.bindFramebuffer(36160,F),FA(y)?s.framebufferTexture2DMultisampleEXT(36160,$,aA,g.get(x).__webglTexture,0,DA(y)):(aA===3553||aA>=34069&&aA<=34074)&&i.framebufferTexture2D(36160,$,aA,g.get(x).__webglTexture,0),I.bindFramebuffer(36160,null)}function hA(F,y,x){if(i.bindRenderbuffer(36161,F),y.depthBuffer&&!y.stencilBuffer){let $=33189;if(x||FA(y)){const aA=y.depthTexture;aA&&aA.isDepthTexture&&(aA.type===lC?$=36012:aA.type===GC&&($=33190));const cA=DA(y);FA(y)?s.renderbufferStorageMultisampleEXT(36161,cA,$,y.width,y.height):i.renderbufferStorageMultisample(36161,cA,$,y.width,y.height)}else i.renderbufferStorage(36161,$,y.width,y.height);i.framebufferRenderbuffer(36160,36096,36161,F)}else if(y.depthBuffer&&y.stencilBuffer){const $=DA(y);x&&FA(y)===!1?i.renderbufferStorageMultisample(36161,$,35056,y.width,y.height):FA(y)?s.renderbufferStorageMultisampleEXT(36161,$,35056,y.width,y.height):i.renderbufferStorage(36161,34041,y.width,y.height),i.framebufferRenderbuffer(36160,33306,36161,F)}else{const $=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let aA=0;aA<$.length;aA++){const cA=$[aA],GA=B.convert(cA.format,cA.encoding),sA=B.convert(cA.type),gA=w(cA.internalFormat,GA,sA,cA.encoding),JA=DA(y);x&&FA(y)===!1?i.renderbufferStorageMultisample(36161,JA,gA,y.width,y.height):FA(y)?s.renderbufferStorageMultisampleEXT(36161,JA,gA,y.width,y.height):i.renderbufferStorage(36161,gA,y.width,y.height)}}i.bindRenderbuffer(36161,null)}function EA(F,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(I.bindFramebuffer(36160,F),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!g.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),v(y.depthTexture,0);const $=g.get(y.depthTexture).__webglTexture,aA=DA(y);if(y.depthTexture.format===kC)FA(y)?s.framebufferTexture2DMultisampleEXT(36160,36096,3553,$,0,aA):i.framebufferTexture2D(36160,36096,3553,$,0);else if(y.depthTexture.format===rB)FA(y)?s.framebufferTexture2DMultisampleEXT(36160,33306,3553,$,0,aA):i.framebufferTexture2D(36160,33306,3553,$,0);else throw new Error("Unknown depthTexture format")}function kA(F){const y=g.get(F),x=F.isWebGLCubeRenderTarget===!0;if(F.depthTexture&&!y.__autoAllocateDepthBuffer){if(x)throw new Error("target.depthTexture not supported in Cube render targets");EA(y.__webglFramebuffer,F)}else if(x){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)I.bindFramebuffer(36160,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]=i.createRenderbuffer(),hA(y.__webglDepthbuffer[$],F,!1)}else I.bindFramebuffer(36160,y.__webglFramebuffer),y.__webglDepthbuffer=i.createRenderbuffer(),hA(y.__webglDepthbuffer,F,!1);I.bindFramebuffer(36160,null)}function HA(F,y,x){const $=g.get(F);y!==void 0&&tA($.__webglFramebuffer,F,F.texture,36064,3553),x!==void 0&&kA(F)}function yA(F){const y=F.texture,x=g.get(F),$=g.get(y);F.addEventListener("dispose",u),F.isWebGLMultipleRenderTargets!==!0&&($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=y.version,E.memory.textures++);const aA=F.isWebGLCubeRenderTarget===!0,cA=F.isWebGLMultipleRenderTargets===!0,GA=k(F)||Q;if(aA){x.__webglFramebuffer=[];for(let sA=0;sA<6;sA++)x.__webglFramebuffer[sA]=i.createFramebuffer()}else{if(x.__webglFramebuffer=i.createFramebuffer(),cA)if(C.drawBuffers){const sA=F.texture;for(let gA=0,JA=sA.length;gA<JA;gA++){const lA=g.get(sA[gA]);lA.__webglTexture===void 0&&(lA.__webglTexture=i.createTexture(),E.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(Q&&F.samples>0&&FA(F)===!1){const sA=cA?y:[y];x.__webglMultisampledFramebuffer=i.createFramebuffer(),x.__webglColorRenderbuffer=[],I.bindFramebuffer(36160,x.__webglMultisampledFramebuffer);for(let gA=0;gA<sA.length;gA++){const JA=sA[gA];x.__webglColorRenderbuffer[gA]=i.createRenderbuffer(),i.bindRenderbuffer(36161,x.__webglColorRenderbuffer[gA]);const lA=B.convert(JA.format,JA.encoding),MA=B.convert(JA.type),SA=w(JA.internalFormat,lA,MA,JA.encoding,F.isXRRenderTarget===!0),wA=DA(F);i.renderbufferStorageMultisample(36161,wA,SA,F.width,F.height),i.framebufferRenderbuffer(36160,36064+gA,36161,x.__webglColorRenderbuffer[gA])}i.bindRenderbuffer(36161,null),F.depthBuffer&&(x.__webglDepthRenderbuffer=i.createRenderbuffer(),hA(x.__webglDepthRenderbuffer,F,!0)),I.bindFramebuffer(36160,null)}}if(aA){I.bindTexture(34067,$.__webglTexture),Y(34067,y,GA);for(let sA=0;sA<6;sA++)tA(x.__webglFramebuffer[sA],F,y,36064,34069+sA);K(y,GA)&&U(34067),I.unbindTexture()}else if(cA){const sA=F.texture;for(let gA=0,JA=sA.length;gA<JA;gA++){const lA=sA[gA],MA=g.get(lA);I.bindTexture(3553,MA.__webglTexture),Y(3553,lA,GA),tA(x.__webglFramebuffer,F,lA,36064+gA,3553),K(lA,GA)&&U(3553)}I.unbindTexture()}else{let sA=3553;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(Q?sA=F.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),I.bindTexture(sA,$.__webglTexture),Y(sA,y,GA),tA(x.__webglFramebuffer,F,y,36064,sA),K(y,GA)&&U(sA),I.unbindTexture()}F.depthBuffer&&kA(F)}function dA(F){const y=k(F)||Q,x=F.isWebGLMultipleRenderTargets===!0?F.texture:[F.texture];for(let $=0,aA=x.length;$<aA;$++){const cA=x[$];if(K(cA,y)){const GA=F.isWebGLCubeRenderTarget?34067:3553,sA=g.get(cA).__webglTexture;I.bindTexture(GA,sA),U(GA),I.unbindTexture()}}}function YA(F){if(Q&&F.samples>0&&FA(F)===!1){const y=F.isWebGLMultipleRenderTargets?F.texture:[F.texture],x=F.width,$=F.height;let aA=16384;const cA=[],GA=F.stencilBuffer?33306:36096,sA=g.get(F),gA=F.isWebGLMultipleRenderTargets===!0;if(gA)for(let JA=0;JA<y.length;JA++)I.bindFramebuffer(36160,sA.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+JA,36161,null),I.bindFramebuffer(36160,sA.__webglFramebuffer),i.framebufferTexture2D(36009,36064+JA,3553,null,0);I.bindFramebuffer(36008,sA.__webglMultisampledFramebuffer),I.bindFramebuffer(36009,sA.__webglFramebuffer);for(let JA=0;JA<y.length;JA++){cA.push(36064+JA),F.depthBuffer&&cA.push(GA);const lA=sA.__ignoreDepthValues!==void 0?sA.__ignoreDepthValues:!1;if(lA===!1&&(F.depthBuffer&&(aA|=256),F.stencilBuffer&&(aA|=1024)),gA&&i.framebufferRenderbuffer(36008,36064,36161,sA.__webglColorRenderbuffer[JA]),lA===!0&&(i.invalidateFramebuffer(36008,[GA]),i.invalidateFramebuffer(36009,[GA])),gA){const MA=g.get(y[JA]).__webglTexture;i.framebufferTexture2D(36009,36064,3553,MA,0)}i.blitFramebuffer(0,0,x,$,0,0,x,$,aA,9728),D&&i.invalidateFramebuffer(36008,cA)}if(I.bindFramebuffer(36008,null),I.bindFramebuffer(36009,null),gA)for(let JA=0;JA<y.length;JA++){I.bindFramebuffer(36160,sA.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(36160,36064+JA,36161,sA.__webglColorRenderbuffer[JA]);const lA=g.get(y[JA]).__webglTexture;I.bindFramebuffer(36160,sA.__webglFramebuffer),i.framebufferTexture2D(36009,36064+JA,3553,lA,0)}I.bindFramebuffer(36009,sA.__webglMultisampledFramebuffer)}}function DA(F){return Math.min(a,F.samples)}function FA(F){const y=g.get(F);return Q&&F.samples>0&&A.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function UA(F){const y=E.render.frame;c.get(F)!==y&&(c.set(F,y),F.update())}function rA(F,y){const x=F.encoding,$=F.format,aA=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||F.format===Xi||x!==dC&&(x===hI?Q===!1?A.has("EXT_sRGB")===!0&&$===Mg?(F.format=Xi,F.minFilter=zI,F.generateMipmaps=!1):y=ca.sRGBToLinear(y):($!==Mg||aA!==KC)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",x)),y}this.allocateTextureUnit=V,this.resetTextureUnits=iA,this.setTexture2D=v,this.setTexture2DArray=N,this.setTexture3D=p,this.setTextureCube=Z,this.rebindTextures=HA,this.setupRenderTarget=yA,this.updateRenderTargetMipmap=dA,this.updateMultisampleRenderTarget=YA,this.setupDepthRenderbuffer=kA,this.setupFrameBufferTexture=tA,this.useMultisampledRTT=FA}function zc(i,A,I){const g=I.isWebGL2;function C(B,E=null){let Q;if(B===KC)return 5121;if(B===Ps)return 32819;if(B===Zs)return 32820;if(B===Ws)return 5120;if(B===Os)return 5122;if(B===sa)return 5123;if(B===_s)return 5124;if(B===GC)return 5125;if(B===lC)return 5126;if(B===EQ)return g?5131:(Q=A.get("OES_texture_half_float"),Q!==null?Q.HALF_FLOAT_OES:null);if(B===Vs)return 6406;if(B===Mg)return 6408;if(B===Xs)return 6409;if(B===zs)return 6410;if(B===kC)return 6402;if(B===rB)return 34041;if(B===js)return console.warn("THREE.WebGLRenderer: THREE.RGBFormat has been removed. Use THREE.RGBAFormat instead. https://github.com/mrdoob/three.js/pull/23228"),6408;if(B===Xi)return Q=A.get("EXT_sRGB"),Q!==null?Q.SRGB_ALPHA_EXT:null;if(B===$s)return 6403;if(B===An)return 36244;if(B===In)return 33319;if(B===gn)return 33320;if(B===Cn)return 36249;if(B===gi||B===Ci||B===Bi||B===Qi)if(E===hI)if(Q=A.get("WEBGL_compressed_texture_s3tc_srgb"),Q!==null){if(B===gi)return Q.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(B===Ci)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(B===Bi)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(B===Qi)return Q.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(Q=A.get("WEBGL_compressed_texture_s3tc"),Q!==null){if(B===gi)return Q.COMPRESSED_RGB_S3TC_DXT1_EXT;if(B===Ci)return Q.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(B===Bi)return Q.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(B===Qi)return Q.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(B===et||B===at||B===st||B===nt)if(Q=A.get("WEBGL_compressed_texture_pvrtc"),Q!==null){if(B===et)return Q.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(B===at)return Q.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(B===st)return Q.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(B===nt)return Q.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(B===Bn)return Q=A.get("WEBGL_compressed_texture_etc1"),Q!==null?Q.COMPRESSED_RGB_ETC1_WEBGL:null;if(B===Dt||B===rt)if(Q=A.get("WEBGL_compressed_texture_etc"),Q!==null){if(B===Dt)return E===hI?Q.COMPRESSED_SRGB8_ETC2:Q.COMPRESSED_RGB8_ETC2;if(B===rt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:Q.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(B===ht||B===ct||B===wt||B===Gt||B===lt||B===St||B===yt||B===kt||B===Mt||B===Ft||B===Rt||B===Nt||B===Kt||B===dt)if(Q=A.get("WEBGL_compressed_texture_astc"),Q!==null){if(B===ht)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:Q.COMPRESSED_RGBA_ASTC_4x4_KHR;if(B===ct)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:Q.COMPRESSED_RGBA_ASTC_5x4_KHR;if(B===wt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:Q.COMPRESSED_RGBA_ASTC_5x5_KHR;if(B===Gt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:Q.COMPRESSED_RGBA_ASTC_6x5_KHR;if(B===lt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:Q.COMPRESSED_RGBA_ASTC_6x6_KHR;if(B===St)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:Q.COMPRESSED_RGBA_ASTC_8x5_KHR;if(B===yt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:Q.COMPRESSED_RGBA_ASTC_8x6_KHR;if(B===kt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:Q.COMPRESSED_RGBA_ASTC_8x8_KHR;if(B===Mt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:Q.COMPRESSED_RGBA_ASTC_10x5_KHR;if(B===Ft)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:Q.COMPRESSED_RGBA_ASTC_10x6_KHR;if(B===Rt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:Q.COMPRESSED_RGBA_ASTC_10x8_KHR;if(B===Nt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:Q.COMPRESSED_RGBA_ASTC_10x10_KHR;if(B===Kt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:Q.COMPRESSED_RGBA_ASTC_12x10_KHR;if(B===dt)return E===hI?Q.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:Q.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(B===Ut)if(Q=A.get("EXT_texture_compression_bptc"),Q!==null){if(B===Ut)return E===hI?Q.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:Q.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;return B===oB?g?34042:(Q=A.get("WEBGL_depth_texture"),Q!==null?Q.UNSIGNED_INT_24_8_WEBGL:null):i[B]!==void 0?i[B]:null}return{convert:C}}class $c extends sg{constructor(A=[]){super(),this.isArrayCamera=!0,this.cameras=A}}class AE extends Ag{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Aw={type:"move"};class pi{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new AE,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new AE,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new AE,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(A){return this._targetRay!==null&&this._targetRay.dispatchEvent(A),this._grip!==null&&this._grip.dispatchEvent(A),this._hand!==null&&this._hand.dispatchEvent(A),this}connect(A){if(A&&A.hand){const I=this._hand;if(I)for(const g of A.hand.values())this._getHandJoint(I,g)}return this.dispatchEvent({type:"connected",data:A}),this}disconnect(A){return this.dispatchEvent({type:"disconnected",data:A}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(A,I,g){let C=null,B=null,E=null;const Q=this._targetRay,o=this._grip,t=this._hand;if(A&&I.session.visibilityState!=="visible-blurred"){if(t&&A.hand){E=!0;for(const r of A.hand.values()){const n=I.getJointPose(r,g),l=this._getHandJoint(t,r);n!==null&&(l.matrix.fromArray(n.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.jointRadius=n.radius),l.visible=n!==null}const e=t.joints["index-finger-tip"],a=t.joints["thumb-tip"],s=e.position.distanceTo(a.position),D=.02,c=.005;t.inputState.pinching&&s>D+c?(t.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:A.handedness,target:this})):!t.inputState.pinching&&s<=D-c&&(t.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:A.handedness,target:this}))}else o!==null&&A.gripSpace&&(B=I.getPose(A.gripSpace,g),B!==null&&(o.matrix.fromArray(B.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),B.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(B.linearVelocity)):o.hasLinearVelocity=!1,B.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(B.angularVelocity)):o.hasAngularVelocity=!1));Q!==null&&(C=I.getPose(A.targetRaySpace,g),C===null&&B!==null&&(C=B),C!==null&&(Q.matrix.fromArray(C.transform.matrix),Q.matrix.decompose(Q.position,Q.rotation,Q.scale),C.linearVelocity?(Q.hasLinearVelocity=!0,Q.linearVelocity.copy(C.linearVelocity)):Q.hasLinearVelocity=!1,C.angularVelocity?(Q.hasAngularVelocity=!0,Q.angularVelocity.copy(C.angularVelocity)):Q.hasAngularVelocity=!1,this.dispatchEvent(Aw)))}return Q!==null&&(Q.visible=C!==null),o!==null&&(o.visible=B!==null),t!==null&&(t.visible=E!==null),this}_getHandJoint(A,I){if(A.joints[I.jointName]===void 0){const g=new AE;g.matrixAutoUpdate=!1,g.visible=!1,A.joints[I.jointName]=g,A.add(g)}return A.joints[I.jointName]}}class Iw extends PI{constructor(A,I,g,C,B,E,Q,o,t,e){if(e=e!==void 0?e:kC,e!==kC&&e!==rB)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");g===void 0&&e===kC&&(g=GC),g===void 0&&e===rB&&(g=oB),super(null,C,B,E,Q,o,e,g,t),this.isDepthTexture=!0,this.image={width:A,height:I},this.magFilter=Q!==void 0?Q:mI,this.minFilter=o!==void 0?o:mI,this.flipY=!1,this.generateMipmaps=!1}}class gw extends yB{constructor(A,I){super();const g=this;let C=null,B=1,E=null,Q="local-floor",o=null,t=null,e=null,a=null,s=null,D=null;const c=I.getContextAttributes();let r=null,n=null;const l=[],G=[],S=new Set,k=new Map,M=new sg;M.layers.enable(1),M.viewport=new rI;const K=new sg;K.layers.enable(2),K.viewport=new rI;const U=[M,K],w=new $c;w.layers.enable(1),w.layers.enable(2);let d=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let p=l[N];return p===void 0&&(p=new pi,l[N]=p),p.getTargetRaySpace()},this.getControllerGrip=function(N){let p=l[N];return p===void 0&&(p=new pi,l[N]=p),p.getGripSpace()},this.getHand=function(N){let p=l[N];return p===void 0&&(p=new pi,l[N]=p),p.getHandSpace()};function X(N){const p=G.indexOf(N.inputSource);if(p===-1)return;const Z=l[p];Z!==void 0&&Z.dispatchEvent({type:N.type,data:N.inputSource})}function u(){C.removeEventListener("select",X),C.removeEventListener("selectstart",X),C.removeEventListener("selectend",X),C.removeEventListener("squeeze",X),C.removeEventListener("squeezestart",X),C.removeEventListener("squeezeend",X),C.removeEventListener("end",u),C.removeEventListener("inputsourceschange",q);for(let N=0;N<l.length;N++){const p=G[N];p!==null&&(G[N]=null,l[N].disconnect(p))}d=null,L=null,A.setRenderTarget(r),s=null,a=null,e=null,C=null,n=null,v.stop(),g.isPresenting=!1,g.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){B=N,g.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){Q=N,g.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return o||E},this.setReferenceSpace=function(N){o=N},this.getBaseLayer=function(){return a!==null?a:s},this.getBinding=function(){return e},this.getFrame=function(){return D},this.getSession=function(){return C},this.setSession=async function(N){if(C=N,C!==null){if(r=A.getRenderTarget(),C.addEventListener("select",X),C.addEventListener("selectstart",X),C.addEventListener("selectend",X),C.addEventListener("squeeze",X),C.addEventListener("squeezestart",X),C.addEventListener("squeezeend",X),C.addEventListener("end",u),C.addEventListener("inputsourceschange",q),c.xrCompatible!==!0&&await I.makeXRCompatible(),C.renderState.layers===void 0||A.capabilities.isWebGL2===!1){const p={antialias:C.renderState.layers===void 0?c.antialias:!0,alpha:c.alpha,depth:c.depth,stencil:c.stencil,framebufferScaleFactor:B};s=new XRWebGLLayer(C,I,p),C.updateRenderState({baseLayer:s}),n=new UC(s.framebufferWidth,s.framebufferHeight,{format:Mg,type:KC,encoding:A.outputEncoding,stencilBuffer:c.stencil})}else{let p=null,Z=null,O=null;c.depth&&(O=c.stencil?35056:33190,p=c.stencil?rB:kC,Z=c.stencil?oB:GC);const W={colorFormat:32856,depthFormat:O,scaleFactor:B};e=new XRWebGLBinding(C,I),a=e.createProjectionLayer(W),C.updateRenderState({layers:[a]}),n=new UC(a.textureWidth,a.textureHeight,{format:Mg,type:KC,depthTexture:new Iw(a.textureWidth,a.textureHeight,Z,void 0,void 0,void 0,void 0,void 0,void 0,p),stencilBuffer:c.stencil,encoding:A.outputEncoding,samples:c.antialias?4:0});const Y=A.properties.get(n);Y.__ignoreDepthValues=a.ignoreDepthValues}n.isXRRenderTarget=!0,this.setFoveation(1),o=null,E=await C.requestReferenceSpace(Q),v.setContext(C),v.start(),g.isPresenting=!0,g.dispatchEvent({type:"sessionstart"})}};function q(N){for(let p=0;p<N.removed.length;p++){const Z=N.removed[p],O=G.indexOf(Z);O>=0&&(G[O]=null,l[O].disconnect(Z))}for(let p=0;p<N.added.length;p++){const Z=N.added[p];let O=G.indexOf(Z);if(O===-1){for(let Y=0;Y<l.length;Y++)if(Y>=G.length){G.push(Z),O=Y;break}else if(G[Y]===null){G[Y]=Z,O=Y;break}if(O===-1)break}const W=l[O];W&&W.connect(Z)}}const J=new j,m=new j;function P(N,p,Z){J.setFromMatrixPosition(p.matrixWorld),m.setFromMatrixPosition(Z.matrixWorld);const O=J.distanceTo(m),W=p.projectionMatrix.elements,Y=Z.projectionMatrix.elements,QA=W[14]/(W[10]-1),z=W[14]/(W[10]+1),eA=(W[9]+1)/W[5],tA=(W[9]-1)/W[5],hA=(W[8]-1)/W[0],EA=(Y[8]+1)/Y[0],kA=QA*hA,HA=QA*EA,yA=O/(-hA+EA),dA=yA*-hA;p.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(dA),N.translateZ(yA),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const YA=QA+yA,DA=z+yA,FA=kA-dA,UA=HA+(O-dA),rA=eA*z/DA*YA,F=tA*z/DA*YA;N.projectionMatrix.makePerspective(FA,UA,rA,F,YA,DA)}function iA(N,p){p===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(p.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(C===null)return;w.near=K.near=M.near=N.near,w.far=K.far=M.far=N.far,(d!==w.near||L!==w.far)&&(C.updateRenderState({depthNear:w.near,depthFar:w.far}),d=w.near,L=w.far);const p=N.parent,Z=w.cameras;iA(w,p);for(let W=0;W<Z.length;W++)iA(Z[W],p);w.matrixWorld.decompose(w.position,w.quaternion,w.scale),N.matrix.copy(w.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale);const O=N.children;for(let W=0,Y=O.length;W<Y;W++)O[W].updateMatrixWorld(!0);Z.length===2?P(w,M,K):w.projectionMatrix.copy(M.projectionMatrix)},this.getCamera=function(){return w},this.getFoveation=function(){if(a!==null)return a.fixedFoveation;if(s!==null)return s.fixedFoveation},this.setFoveation=function(N){a!==null&&(a.fixedFoveation=N),s!==null&&s.fixedFoveation!==void 0&&(s.fixedFoveation=N)},this.getPlanes=function(){return S};let V=null;function b(N,p){if(t=p.getViewerPose(o||E),D=p,t!==null){const Z=t.views;s!==null&&(A.setRenderTargetFramebuffer(n,s.framebuffer),A.setRenderTarget(n));let O=!1;Z.length!==w.cameras.length&&(w.cameras.length=0,O=!0);for(let W=0;W<Z.length;W++){const Y=Z[W];let QA=null;if(s!==null)QA=s.getViewport(Y);else{const eA=e.getViewSubImage(a,Y);QA=eA.viewport,W===0&&(A.setRenderTargetTextures(n,eA.colorTexture,a.ignoreDepthValues?void 0:eA.depthStencilTexture),A.setRenderTarget(n))}let z=U[W];z===void 0&&(z=new sg,z.layers.enable(W),z.viewport=new rI,U[W]=z),z.matrix.fromArray(Y.transform.matrix),z.projectionMatrix.fromArray(Y.projectionMatrix),z.viewport.set(QA.x,QA.y,QA.width,QA.height),W===0&&w.matrix.copy(z.matrix),O===!0&&w.cameras.push(z)}}for(let Z=0;Z<l.length;Z++){const O=G[Z],W=l[Z];O!==null&&W!==void 0&&W.update(O,p,o||E)}if(V&&V(N,p),p.detectedPlanes){g.dispatchEvent({type:"planesdetected",data:p.detectedPlanes});let Z=null;for(const O of S)p.detectedPlanes.has(O)||(Z===null&&(Z=[]),Z.push(O));if(Z!==null)for(const O of Z)S.delete(O),k.delete(O),g.dispatchEvent({type:"planeremoved",data:O});for(const O of p.detectedPlanes)if(!S.has(O))S.add(O),k.set(O,p.lastChangedTime),g.dispatchEvent({type:"planeadded",data:O});else{const W=k.get(O);O.lastChangedTime>W&&(k.set(O,O.lastChangedTime),g.dispatchEvent({type:"planechanged",data:O}))}}D=null}const v=new Na;v.setAnimationLoop(b),this.setAnimationLoop=function(N){V=N},this.dispose=function(){}}}function Cw(i,A){function I(r,n){n.color.getRGB(r.fogColor.value,ka(i)),n.isFog?(r.fogNear.value=n.near,r.fogFar.value=n.far):n.isFogExp2&&(r.fogDensity.value=n.density)}function g(r,n,l,G,S){n.isMeshBasicMaterial||n.isMeshLambertMaterial?C(r,n):n.isMeshToonMaterial?(C(r,n),e(r,n)):n.isMeshPhongMaterial?(C(r,n),t(r,n)):n.isMeshStandardMaterial?(C(r,n),a(r,n),n.isMeshPhysicalMaterial&&s(r,n,S)):n.isMeshMatcapMaterial?(C(r,n),D(r,n)):n.isMeshDepthMaterial?C(r,n):n.isMeshDistanceMaterial?(C(r,n),c(r,n)):n.isMeshNormalMaterial?C(r,n):n.isLineBasicMaterial?(B(r,n),n.isLineDashedMaterial&&E(r,n)):n.isPointsMaterial?Q(r,n,l,G):n.isSpriteMaterial?o(r,n):n.isShadowMaterial?(r.color.value.copy(n.color),r.opacity.value=n.opacity):n.isShaderMaterial&&(n.uniformsNeedUpdate=!1)}function C(r,n){r.opacity.value=n.opacity,n.color&&r.diffuse.value.copy(n.color),n.emissive&&r.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),n.map&&(r.map.value=n.map),n.alphaMap&&(r.alphaMap.value=n.alphaMap),n.bumpMap&&(r.bumpMap.value=n.bumpMap,r.bumpScale.value=n.bumpScale,n.side===ig&&(r.bumpScale.value*=-1)),n.displacementMap&&(r.displacementMap.value=n.displacementMap,r.displacementScale.value=n.displacementScale,r.displacementBias.value=n.displacementBias),n.emissiveMap&&(r.emissiveMap.value=n.emissiveMap),n.normalMap&&(r.normalMap.value=n.normalMap,r.normalScale.value.copy(n.normalScale),n.side===ig&&r.normalScale.value.negate()),n.specularMap&&(r.specularMap.value=n.specularMap),n.alphaTest>0&&(r.alphaTest.value=n.alphaTest);const l=A.get(n).envMap;if(l&&(r.envMap.value=l,r.flipEnvMap.value=l.isCubeTexture&&l.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=n.reflectivity,r.ior.value=n.ior,r.refractionRatio.value=n.refractionRatio),n.lightMap){r.lightMap.value=n.lightMap;const k=i.physicallyCorrectLights!==!0?Math.PI:1;r.lightMapIntensity.value=n.lightMapIntensity*k}n.aoMap&&(r.aoMap.value=n.aoMap,r.aoMapIntensity.value=n.aoMapIntensity);let G;n.map?G=n.map:n.specularMap?G=n.specularMap:n.displacementMap?G=n.displacementMap:n.normalMap?G=n.normalMap:n.bumpMap?G=n.bumpMap:n.roughnessMap?G=n.roughnessMap:n.metalnessMap?G=n.metalnessMap:n.alphaMap?G=n.alphaMap:n.emissiveMap?G=n.emissiveMap:n.clearcoatMap?G=n.clearcoatMap:n.clearcoatNormalMap?G=n.clearcoatNormalMap:n.clearcoatRoughnessMap?G=n.clearcoatRoughnessMap:n.iridescenceMap?G=n.iridescenceMap:n.iridescenceThicknessMap?G=n.iridescenceThicknessMap:n.specularIntensityMap?G=n.specularIntensityMap:n.specularColorMap?G=n.specularColorMap:n.transmissionMap?G=n.transmissionMap:n.thicknessMap?G=n.thicknessMap:n.sheenColorMap?G=n.sheenColorMap:n.sheenRoughnessMap&&(G=n.sheenRoughnessMap),G!==void 0&&(G.isWebGLRenderTarget&&(G=G.texture),G.matrixAutoUpdate===!0&&G.updateMatrix(),r.uvTransform.value.copy(G.matrix));let S;n.aoMap?S=n.aoMap:n.lightMap&&(S=n.lightMap),S!==void 0&&(S.isWebGLRenderTarget&&(S=S.texture),S.matrixAutoUpdate===!0&&S.updateMatrix(),r.uv2Transform.value.copy(S.matrix))}function B(r,n){r.diffuse.value.copy(n.color),r.opacity.value=n.opacity}function E(r,n){r.dashSize.value=n.dashSize,r.totalSize.value=n.dashSize+n.gapSize,r.scale.value=n.scale}function Q(r,n,l,G){r.diffuse.value.copy(n.color),r.opacity.value=n.opacity,r.size.value=n.size*l,r.scale.value=G*.5,n.map&&(r.map.value=n.map),n.alphaMap&&(r.alphaMap.value=n.alphaMap),n.alphaTest>0&&(r.alphaTest.value=n.alphaTest);let S;n.map?S=n.map:n.alphaMap&&(S=n.alphaMap),S!==void 0&&(S.matrixAutoUpdate===!0&&S.updateMatrix(),r.uvTransform.value.copy(S.matrix))}function o(r,n){r.diffuse.value.copy(n.color),r.opacity.value=n.opacity,r.rotation.value=n.rotation,n.map&&(r.map.value=n.map),n.alphaMap&&(r.alphaMap.value=n.alphaMap),n.alphaTest>0&&(r.alphaTest.value=n.alphaTest);let l;n.map?l=n.map:n.alphaMap&&(l=n.alphaMap),l!==void 0&&(l.matrixAutoUpdate===!0&&l.updateMatrix(),r.uvTransform.value.copy(l.matrix))}function t(r,n){r.specular.value.copy(n.specular),r.shininess.value=Math.max(n.shininess,1e-4)}function e(r,n){n.gradientMap&&(r.gradientMap.value=n.gradientMap)}function a(r,n){r.roughness.value=n.roughness,r.metalness.value=n.metalness,n.roughnessMap&&(r.roughnessMap.value=n.roughnessMap),n.metalnessMap&&(r.metalnessMap.value=n.metalnessMap),A.get(n).envMap&&(r.envMapIntensity.value=n.envMapIntensity)}function s(r,n,l){r.ior.value=n.ior,n.sheen>0&&(r.sheenColor.value.copy(n.sheenColor).multiplyScalar(n.sheen),r.sheenRoughness.value=n.sheenRoughness,n.sheenColorMap&&(r.sheenColorMap.value=n.sheenColorMap),n.sheenRoughnessMap&&(r.sheenRoughnessMap.value=n.sheenRoughnessMap)),n.clearcoat>0&&(r.clearcoat.value=n.clearcoat,r.clearcoatRoughness.value=n.clearcoatRoughness,n.clearcoatMap&&(r.clearcoatMap.value=n.clearcoatMap),n.clearcoatRoughnessMap&&(r.clearcoatRoughnessMap.value=n.clearcoatRoughnessMap),n.clearcoatNormalMap&&(r.clearcoatNormalScale.value.copy(n.clearcoatNormalScale),r.clearcoatNormalMap.value=n.clearcoatNormalMap,n.side===ig&&r.clearcoatNormalScale.value.negate())),n.iridescence>0&&(r.iridescence.value=n.iridescence,r.iridescenceIOR.value=n.iridescenceIOR,r.iridescenceThicknessMinimum.value=n.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum.value=n.iridescenceThicknessRange[1],n.iridescenceMap&&(r.iridescenceMap.value=n.iridescenceMap),n.iridescenceThicknessMap&&(r.iridescenceThicknessMap.value=n.iridescenceThicknessMap)),n.transmission>0&&(r.transmission.value=n.transmission,r.transmissionSamplerMap.value=l.texture,r.transmissionSamplerSize.value.set(l.width,l.height),n.transmissionMap&&(r.transmissionMap.value=n.transmissionMap),r.thickness.value=n.thickness,n.thicknessMap&&(r.thicknessMap.value=n.thicknessMap),r.attenuationDistance.value=n.attenuationDistance,r.attenuationColor.value.copy(n.attenuationColor)),r.specularIntensity.value=n.specularIntensity,r.specularColor.value.copy(n.specularColor),n.specularIntensityMap&&(r.specularIntensityMap.value=n.specularIntensityMap),n.specularColorMap&&(r.specularColorMap.value=n.specularColorMap)}function D(r,n){n.matcap&&(r.matcap.value=n.matcap)}function c(r,n){r.referencePosition.value.copy(n.referencePosition),r.nearDistance.value=n.nearDistance,r.farDistance.value=n.farDistance}return{refreshFogUniforms:I,refreshMaterialUniforms:g}}function Bw(i,A,I,g){let C={},B={},E=[];const Q=I.isWebGL2?i.getParameter(35375):0;function o(G,S){const k=S.program;g.uniformBlockBinding(G,k)}function t(G,S){let k=C[G.id];k===void 0&&(c(G),k=e(G),C[G.id]=k,G.addEventListener("dispose",n));const M=S.program;g.updateUBOMapping(G,M);const K=A.render.frame;B[G.id]!==K&&(s(G),B[G.id]=K)}function e(G){const S=a();G.__bindingPointIndex=S;const k=i.createBuffer(),M=G.__size,K=G.usage;return i.bindBuffer(35345,k),i.bufferData(35345,M,K),i.bindBuffer(35345,null),i.bindBufferBase(35345,S,k),k}function a(){for(let G=0;G<Q;G++)if(E.indexOf(G)===-1)return E.push(G),G;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function s(G){const S=C[G.id],k=G.uniforms,M=G.__cache;i.bindBuffer(35345,S);for(let K=0,U=k.length;K<U;K++){const w=k[K];if(D(w,K,M)===!0){const d=w.__offset,L=Array.isArray(w.value)?w.value:[w.value];let X=0;for(let u=0;u<L.length;u++){const q=L[u],J=r(q);typeof q=="number"?(w.__data[0]=q,i.bufferSubData(35345,d+X,w.__data)):q.isMatrix3?(w.__data[0]=q.elements[0],w.__data[1]=q.elements[1],w.__data[2]=q.elements[2],w.__data[3]=q.elements[0],w.__data[4]=q.elements[3],w.__data[5]=q.elements[4],w.__data[6]=q.elements[5],w.__data[7]=q.elements[0],w.__data[8]=q.elements[6],w.__data[9]=q.elements[7],w.__data[10]=q.elements[8],w.__data[11]=q.elements[0]):(q.toArray(w.__data,X),X+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(35345,d,w.__data)}}i.bindBuffer(35345,null)}function D(G,S,k){const M=G.value;if(k[S]===void 0){if(typeof M=="number")k[S]=M;else{const K=Array.isArray(M)?M:[M],U=[];for(let w=0;w<K.length;w++)U.push(K[w].clone());k[S]=U}return!0}else if(typeof M=="number"){if(k[S]!==M)return k[S]=M,!0}else{const K=Array.isArray(k[S])?k[S]:[k[S]],U=Array.isArray(M)?M:[M];for(let w=0;w<K.length;w++){const d=K[w];if(d.equals(U[w])===!1)return d.copy(U[w]),!0}}return!1}function c(G){const S=G.uniforms;let k=0;const M=16;let K=0;for(let U=0,w=S.length;U<w;U++){const d=S[U],L={boundary:0,storage:0},X=Array.isArray(d.value)?d.value:[d.value];for(let u=0,q=X.length;u<q;u++){const J=X[u],m=r(J);L.boundary+=m.boundary,L.storage+=m.storage}if(d.__data=new Float32Array(L.storage/Float32Array.BYTES_PER_ELEMENT),d.__offset=k,U>0){K=k%M;const u=M-K;K!==0&&u-L.boundary<0&&(k+=M-K,d.__offset=k)}k+=L.storage}return K=k%M,K>0&&(k+=M-K),G.__size=k,G.__cache={},this}function r(G){const S={boundary:0,storage:0};return typeof G=="number"?(S.boundary=4,S.storage=4):G.isVector2?(S.boundary=8,S.storage=8):G.isVector3||G.isColor?(S.boundary=16,S.storage=12):G.isVector4?(S.boundary=16,S.storage=16):G.isMatrix3?(S.boundary=48,S.storage=48):G.isMatrix4?(S.boundary=64,S.storage=64):G.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",G),S}function n(G){const S=G.target;S.removeEventListener("dispose",n);const k=E.indexOf(S.__bindingPointIndex);E.splice(k,1),i.deleteBuffer(C[S.id]),delete C[S.id],delete B[S.id]}function l(){for(const G in C)i.deleteBuffer(C[G]);E=[],C={},B={}}return{bind:o,update:t,dispose:l}}function Qw(){const i=kE("canvas");return i.style.display="block",i}function ua(i={}){this.isWebGLRenderer=!0;const A=i.canvas!==void 0?i.canvas:Qw(),I=i.context!==void 0?i.context:null,g=i.depth!==void 0?i.depth:!0,C=i.stencil!==void 0?i.stencil:!0,B=i.antialias!==void 0?i.antialias:!1,E=i.premultipliedAlpha!==void 0?i.premultipliedAlpha:!0,Q=i.preserveDrawingBuffer!==void 0?i.preserveDrawingBuffer:!1,o=i.powerPreference!==void 0?i.powerPreference:"default",t=i.failIfMajorPerformanceCaveat!==void 0?i.failIfMajorPerformanceCaveat:!1;let e;I!==null?e=I.getContextAttributes().alpha:e=i.alpha!==void 0?i.alpha:!1;let a=null,s=null;const D=[],c=[];this.domElement=A,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=dC,this.physicallyCorrectLights=!1,this.toneMapping=Wg,this.toneMappingExposure=1;const r=this;let n=!1,l=0,G=0,S=null,k=-1,M=null;const K=new rI,U=new rI;let w=null,d=A.width,L=A.height,X=1,u=null,q=null;const J=new rI(0,0,d,L),m=new rI(0,0,d,L);let P=!1;const iA=new No;let V=!1,b=!1,v=null;const N=new MI,p=new AI,Z=new j,O={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function W(){return S===null?X:1}let Y=I;function QA(R,_){for(let BA=0;BA<R.length;BA++){const T=R[BA],oA=A.getContext(T,_);if(oA!==null)return oA}return null}try{const R={alpha:!0,depth:g,stencil:C,antialias:B,premultipliedAlpha:E,preserveDrawingBuffer:Q,powerPreference:o,failIfMajorPerformanceCaveat:t};if("setAttribute"in A&&A.setAttribute("data-engine",`three.js r${Fo}`),A.addEventListener("webglcontextlost",SA,!1),A.addEventListener("webglcontextrestored",wA,!1),A.addEventListener("webglcontextcreationerror",uA,!1),Y===null){const _=["webgl2","webgl","experimental-webgl"];if(r.isWebGL1Renderer===!0&&_.shift(),Y=QA(_,R),Y===null)throw QA(_)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}Y.getShaderPrecisionFormat===void 0&&(Y.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let z,eA,tA,hA,EA,kA,HA,yA,dA,YA,DA,FA,UA,rA,F,y,x,$,aA,cA,GA,sA,gA,JA;function lA(){z=new wh(Y),eA=new sh(Y,z,i),z.init(eA),sA=new zc(Y,z,eA),tA=new jc(Y,z,eA),hA=new Sh,EA=new Hc,kA=new Xc(Y,z,tA,EA,eA,sA,hA),HA=new Dh(r),yA=new ch(r),dA=new Un(Y,eA),gA=new eh(Y,z,dA,eA),YA=new Gh(Y,dA,hA,gA),DA=new Fh(Y,YA,dA,hA),aA=new Mh(Y,eA,kA),y=new nh(EA),FA=new Yc(r,HA,yA,z,eA,gA,y),UA=new Cw(r,EA),rA=new xc,F=new _c(z,eA),$=new th(r,HA,yA,tA,DA,e,E),x=new Vc(r,DA,eA),JA=new Bw(Y,hA,eA,tA),cA=new ah(Y,z,hA,eA),GA=new lh(Y,z,hA,eA),hA.programs=FA.programs,r.capabilities=eA,r.extensions=z,r.properties=EA,r.renderLists=rA,r.shadowMap=x,r.state=tA,r.info=hA}lA();const MA=new gw(r,Y);this.xr=MA,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const R=z.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=z.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(R){R!==void 0&&(X=R,this.setSize(d,L,!1))},this.getSize=function(R){return R.set(d,L)},this.setSize=function(R,_,BA){if(MA.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}d=R,L=_,A.width=Math.floor(R*X),A.height=Math.floor(_*X),BA!==!1&&(A.style.width=R+"px",A.style.height=_+"px"),this.setViewport(0,0,R,_)},this.getDrawingBufferSize=function(R){return R.set(d*X,L*X).floor()},this.setDrawingBufferSize=function(R,_,BA){d=R,L=_,X=BA,A.width=Math.floor(R*BA),A.height=Math.floor(_*BA),this.setViewport(0,0,R,_)},this.getCurrentViewport=function(R){return R.copy(K)},this.getViewport=function(R){return R.copy(J)},this.setViewport=function(R,_,BA,T){R.isVector4?J.set(R.x,R.y,R.z,R.w):J.set(R,_,BA,T),tA.viewport(K.copy(J).multiplyScalar(X).floor())},this.getScissor=function(R){return R.copy(m)},this.setScissor=function(R,_,BA,T){R.isVector4?m.set(R.x,R.y,R.z,R.w):m.set(R,_,BA,T),tA.scissor(U.copy(m).multiplyScalar(X).floor())},this.getScissorTest=function(){return P},this.setScissorTest=function(R){tA.setScissorTest(P=R)},this.setOpaqueSort=function(R){u=R},this.setTransparentSort=function(R){q=R},this.getClearColor=function(R){return R.copy($.getClearColor())},this.setClearColor=function(){$.setClearColor.apply($,arguments)},this.getClearAlpha=function(){return $.getClearAlpha()},this.setClearAlpha=function(){$.setClearAlpha.apply($,arguments)},this.clear=function(R=!0,_=!0,BA=!0){let T=0;R&&(T|=16384),_&&(T|=256),BA&&(T|=1024),Y.clear(T)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){A.removeEventListener("webglcontextlost",SA,!1),A.removeEventListener("webglcontextrestored",wA,!1),A.removeEventListener("webglcontextcreationerror",uA,!1),rA.dispose(),F.dispose(),EA.dispose(),HA.dispose(),yA.dispose(),DA.dispose(),gA.dispose(),JA.dispose(),FA.dispose(),MA.dispose(),MA.removeEventListener("sessionstart",KA),MA.removeEventListener("sessionend",fA),v&&(v.dispose(),v=null),ZA.stop()};function SA(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),n=!0}function wA(){console.log("THREE.WebGLRenderer: Context Restored."),n=!1;const R=hA.autoReset,_=x.enabled,BA=x.autoUpdate,T=x.needsUpdate,oA=x.type;lA(),hA.autoReset=R,x.enabled=_,x.autoUpdate=BA,x.needsUpdate=T,x.type=oA}function uA(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function mA(R){const _=R.target;_.removeEventListener("dispose",mA),PA(_)}function PA(R){f(R),EA.remove(R)}function f(R){const _=EA.get(R).programs;_!==void 0&&(_.forEach(function(BA){FA.releaseProgram(BA)}),R.isShaderMaterial&&FA.releaseShaderCache(R))}this.renderBufferDirect=function(R,_,BA,T,oA,qA){_===null&&(_=O);const xA=oA.isMesh&&oA.matrixWorld.determinant()<0,vA=vI(R,_,BA,T,oA);tA.setMaterial(T,xA);let WA=BA.index,jA=1;T.wireframe===!0&&(WA=YA.getWireframeAttribute(BA),jA=2);const VA=BA.drawRange,XA=BA.attributes.position;let GI=VA.start*jA,pI=(VA.start+VA.count)*jA;qA!==null&&(GI=Math.max(GI,qA.start*jA),pI=Math.min(pI,(qA.start+qA.count)*jA)),WA!==null?(GI=Math.max(GI,0),pI=Math.min(pI,WA.count)):XA!=null&&(GI=Math.max(GI,0),pI=Math.min(pI,XA.count));const Ig=pI-GI;if(Ig<0||Ig===1/0)return;gA.setup(oA,T,vA,BA,WA);let Dg,RA=cA;if(WA!==null&&(Dg=dA.get(WA),RA=GA,RA.setIndex(Dg)),oA.isMesh)T.wireframe===!0?(tA.setLineWidth(T.wireframeLinewidth*W()),RA.setMode(1)):RA.setMode(4);else if(oA.isLine){let OA=T.linewidth;OA===void 0&&(OA=1),tA.setLineWidth(OA*W()),oA.isLineSegments?RA.setMode(1):oA.isLineLoop?RA.setMode(2):RA.setMode(3)}else oA.isPoints?RA.setMode(0):oA.isSprite&&RA.setMode(4);if(oA.isInstancedMesh)RA.renderInstances(GI,Ig,oA.count);else if(BA.isInstancedBufferGeometry){const OA=BA._maxInstanceCount!==void 0?BA._maxInstanceCount:1/0,FB=Math.min(BA.instanceCount,OA);RA.renderInstances(GI,Ig,FB)}else RA.render(GI,Ig)},this.compile=function(R,_){function BA(T,oA,qA){T.transparent===!0&&T.side===qQ?(T.side=ig,T.needsUpdate=!0,zA(T,oA,qA),T.side=oC,T.needsUpdate=!0,zA(T,oA,qA),T.side=qQ):zA(T,oA,qA)}s=F.get(R),s.init(),c.push(s),R.traverseVisible(function(T){T.isLight&&T.layers.test(_.layers)&&(s.pushLight(T),T.castShadow&&s.pushShadow(T))}),s.setupLights(r.physicallyCorrectLights),R.traverse(function(T){const oA=T.material;if(oA)if(Array.isArray(oA))for(let qA=0;qA<oA.length;qA++){const xA=oA[qA];BA(xA,R,T)}else BA(oA,R,T)}),c.pop(),s=null};let IA=null;function nA(R){IA&&IA(R)}function KA(){ZA.stop()}function fA(){ZA.start()}const ZA=new Na;ZA.setAnimationLoop(nA),typeof self<"u"&&ZA.setContext(self),this.setAnimationLoop=function(R){IA=R,MA.setAnimationLoop(R),R===null?ZA.stop():ZA.start()},MA.addEventListener("sessionstart",KA),MA.addEventListener("sessionend",fA),this.render=function(R,_){if(_!==void 0&&_.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(n===!0)return;R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),MA.enabled===!0&&MA.isPresenting===!0&&(MA.cameraAutoUpdate===!0&&MA.updateCamera(_),_=MA.getCamera()),R.isScene===!0&&R.onBeforeRender(r,R,_,S),s=F.get(R,c.length),s.init(),c.push(s),N.multiplyMatrices(_.projectionMatrix,_.matrixWorldInverse),iA.setFromProjectionMatrix(N),b=this.localClippingEnabled,V=y.init(this.clippingPlanes,b,_),a=rA.get(R,D.length),a.init(),D.push(a),BI(R,_,0,r.sortObjects),a.finish(),r.sortObjects===!0&&a.sort(u,q),V===!0&&y.beginShadows();const BA=s.state.shadowsArray;if(x.render(BA,R,_),V===!0&&y.endShadows(),this.info.autoReset===!0&&this.info.reset(),$.render(a,R),s.setupLights(r.physicallyCorrectLights),_.isArrayCamera){const T=_.cameras;for(let oA=0,qA=T.length;oA<qA;oA++){const xA=T[oA];EI(a,R,xA,xA.viewport)}}else EI(a,R,_);S!==null&&(kA.updateMultisampleRenderTarget(S),kA.updateRenderTargetMipmap(S)),R.isScene===!0&&R.onAfterRender(r,R,_),gA.resetDefaultState(),k=-1,M=null,c.pop(),c.length>0?s=c[c.length-1]:s=null,D.pop(),D.length>0?a=D[D.length-1]:a=null};function BI(R,_,BA,T){if(R.visible===!1)return;if(R.layers.test(_.layers)){if(R.isGroup)BA=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(_);else if(R.isLight)s.pushLight(R),R.castShadow&&s.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||iA.intersectsSprite(R)){T&&Z.setFromMatrixPosition(R.matrixWorld).applyMatrix4(N);const xA=DA.update(R),vA=R.material;vA.visible&&a.push(R,xA,vA,BA,Z.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(R.isSkinnedMesh&&R.skeleton.frame!==hA.render.frame&&(R.skeleton.update(),R.skeleton.frame=hA.render.frame),!R.frustumCulled||iA.intersectsObject(R))){T&&Z.setFromMatrixPosition(R.matrixWorld).applyMatrix4(N);const xA=DA.update(R),vA=R.material;if(Array.isArray(vA)){const WA=xA.groups;for(let jA=0,VA=WA.length;jA<VA;jA++){const XA=WA[jA],GI=vA[XA.materialIndex];GI&&GI.visible&&a.push(R,xA,GI,BA,Z.z,XA)}}else vA.visible&&a.push(R,xA,vA,BA,Z.z,null)}}const qA=R.children;for(let xA=0,vA=qA.length;xA<vA;xA++)BI(qA[xA],_,BA,T)}function EI(R,_,BA,T){const oA=R.opaque,qA=R.transmissive,xA=R.transparent;s.setupLightsView(BA),qA.length>0&&iI(oA,_,BA),T&&tA.viewport(K.copy(T)),oA.length>0&&oI(oA,_,BA),qA.length>0&&oI(qA,_,BA),xA.length>0&&oI(xA,_,BA),tA.buffers.depth.setTest(!0),tA.buffers.depth.setMask(!0),tA.buffers.color.setMask(!0),tA.setPolygonOffset(!1)}function iI(R,_,BA){const T=eA.isWebGL2;v===null&&(v=new UC(1,1,{generateMipmaps:!0,type:z.has("EXT_color_buffer_half_float")?EQ:KC,minFilter:QQ,samples:T&&B===!0?4:0})),r.getDrawingBufferSize(p),T?v.setSize(p.x,p.y):v.setSize(zi(p.x),zi(p.y));const oA=r.getRenderTarget();r.setRenderTarget(v),r.clear();const qA=r.toneMapping;r.toneMapping=Wg,oI(R,_,BA),r.toneMapping=qA,kA.updateMultisampleRenderTarget(v),kA.updateRenderTargetMipmap(v),r.setRenderTarget(oA)}function oI(R,_,BA){const T=_.isScene===!0?_.overrideMaterial:null;for(let oA=0,qA=R.length;oA<qA;oA++){const xA=R[oA],vA=xA.object,WA=xA.geometry,jA=T===null?xA.material:T,VA=xA.group;vA.layers.test(BA.layers)&&QI(vA,_,BA,WA,jA,VA)}}function QI(R,_,BA,T,oA,qA){R.onBeforeRender(r,_,BA,T,oA,qA),R.modelViewMatrix.multiplyMatrices(BA.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),oA.onBeforeRender(r,_,BA,T,R,qA),oA.transparent===!0&&oA.side===qQ?(oA.side=ig,oA.needsUpdate=!0,r.renderBufferDirect(BA,_,T,oA,R,qA),oA.side=oC,oA.needsUpdate=!0,r.renderBufferDirect(BA,_,T,oA,R,qA),oA.side=qQ):r.renderBufferDirect(BA,_,T,oA,R,qA),R.onAfterRender(r,_,BA,T,oA,qA)}function zA(R,_,BA){_.isScene!==!0&&(_=O);const T=EA.get(R),oA=s.state.lights,qA=s.state.shadowsArray,xA=oA.state.version,vA=FA.getParameters(R,oA.state,qA,_,BA),WA=FA.getProgramCacheKey(vA);let jA=T.programs;T.environment=R.isMeshStandardMaterial?_.environment:null,T.fog=_.fog,T.envMap=(R.isMeshStandardMaterial?yA:HA).get(R.envMap||T.environment),jA===void 0&&(R.addEventListener("dispose",mA),jA=new Map,T.programs=jA);let VA=jA.get(WA);if(VA!==void 0){if(T.currentProgram===VA&&T.lightsStateVersion===xA)return jI(R,vA),VA}else vA.uniforms=FA.getUniforms(R),R.onBuild(BA,vA,r),R.onBeforeCompile(vA,r),VA=FA.acquireProgram(vA,WA),jA.set(WA,VA),T.uniforms=vA.uniforms;const XA=T.uniforms;(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(XA.clippingPlanes=y.uniform),jI(R,vA),T.needsLights=KI(R),T.lightsStateVersion=xA,T.needsLights&&(XA.ambientLightColor.value=oA.state.ambient,XA.lightProbe.value=oA.state.probe,XA.directionalLights.value=oA.state.directional,XA.directionalLightShadows.value=oA.state.directionalShadow,XA.spotLights.value=oA.state.spot,XA.spotLightShadows.value=oA.state.spotShadow,XA.rectAreaLights.value=oA.state.rectArea,XA.ltc_1.value=oA.state.rectAreaLTC1,XA.ltc_2.value=oA.state.rectAreaLTC2,XA.pointLights.value=oA.state.point,XA.pointLightShadows.value=oA.state.pointShadow,XA.hemisphereLights.value=oA.state.hemi,XA.directionalShadowMap.value=oA.state.directionalShadowMap,XA.directionalShadowMatrix.value=oA.state.directionalShadowMatrix,XA.spotShadowMap.value=oA.state.spotShadowMap,XA.spotLightMatrix.value=oA.state.spotLightMatrix,XA.spotLightMap.value=oA.state.spotLightMap,XA.pointShadowMap.value=oA.state.pointShadowMap,XA.pointShadowMatrix.value=oA.state.pointShadowMatrix);const GI=VA.getUniforms(),pI=tE.seqWithValue(GI.seq,XA);return T.currentProgram=VA,T.uniformsList=pI,VA}function jI(R,_){const BA=EA.get(R);BA.outputEncoding=_.outputEncoding,BA.instancing=_.instancing,BA.skinning=_.skinning,BA.morphTargets=_.morphTargets,BA.morphNormals=_.morphNormals,BA.morphColors=_.morphColors,BA.morphTargetsCount=_.morphTargetsCount,BA.numClippingPlanes=_.numClippingPlanes,BA.numIntersection=_.numClipIntersection,BA.vertexAlphas=_.vertexAlphas,BA.vertexTangents=_.vertexTangents,BA.toneMapping=_.toneMapping}function vI(R,_,BA,T,oA){_.isScene!==!0&&(_=O),kA.resetTextureUnits();const qA=_.fog,xA=T.isMeshStandardMaterial?_.environment:null,vA=S===null?r.outputEncoding:S.isXRRenderTarget===!0?S.texture.encoding:dC,WA=(T.isMeshStandardMaterial?yA:HA).get(T.envMap||xA),jA=T.vertexColors===!0&&!!BA.attributes.color&&BA.attributes.color.itemSize===4,VA=!!T.normalMap&&!!BA.attributes.tangent,XA=!!BA.morphAttributes.position,GI=!!BA.morphAttributes.normal,pI=!!BA.morphAttributes.color,Ig=T.toneMapped?r.toneMapping:Wg,Dg=BA.morphAttributes.position||BA.morphAttributes.normal||BA.morphAttributes.color,RA=Dg!==void 0?Dg.length:0,OA=EA.get(T),FB=s.state.lights;if(V===!0&&(b===!0||R!==M)){const YI=R===M&&T.id===k;y.setState(T,R,YI)}let lI=!1;T.version===OA.__version?(OA.needsLights&&OA.lightsStateVersion!==FB.state.version||OA.outputEncoding!==vA||oA.isInstancedMesh&&OA.instancing===!1||!oA.isInstancedMesh&&OA.instancing===!0||oA.isSkinnedMesh&&OA.skinning===!1||!oA.isSkinnedMesh&&OA.skinning===!0||OA.envMap!==WA||T.fog===!0&&OA.fog!==qA||OA.numClippingPlanes!==void 0&&(OA.numClippingPlanes!==y.numPlanes||OA.numIntersection!==y.numIntersection)||OA.vertexAlphas!==jA||OA.vertexTangents!==VA||OA.morphTargets!==XA||OA.morphNormals!==GI||OA.morphColors!==pI||OA.toneMapping!==Ig||eA.isWebGL2===!0&&OA.morphTargetsCount!==RA)&&(lI=!0):(lI=!0,OA.__version=T.version);let Kg=OA.currentProgram;lI===!0&&(Kg=zA(T,_,oA));let qC=!1,dg=!1,Vg=!1;const fI=Kg.getUniforms(),og=OA.uniforms;if(tA.useProgram(Kg.program)&&(qC=!0,dg=!0,Vg=!0),T.id!==k&&(k=T.id,dg=!0),qC||M!==R){if(fI.setValue(Y,"projectionMatrix",R.projectionMatrix),eA.logarithmicDepthBuffer&&fI.setValue(Y,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),M!==R&&(M=R,dg=!0,Vg=!0),T.isShaderMaterial||T.isMeshPhongMaterial||T.isMeshToonMaterial||T.isMeshStandardMaterial||T.envMap){const YI=fI.map.cameraPosition;YI!==void 0&&YI.setValue(Y,Z.setFromMatrixPosition(R.matrixWorld))}(T.isMeshPhongMaterial||T.isMeshToonMaterial||T.isMeshLambertMaterial||T.isMeshBasicMaterial||T.isMeshStandardMaterial||T.isShaderMaterial)&&fI.setValue(Y,"isOrthographic",R.isOrthographicCamera===!0),(T.isMeshPhongMaterial||T.isMeshToonMaterial||T.isMeshLambertMaterial||T.isMeshBasicMaterial||T.isMeshStandardMaterial||T.isShaderMaterial||T.isShadowMaterial||oA.isSkinnedMesh)&&fI.setValue(Y,"viewMatrix",R.matrixWorldInverse)}if(oA.isSkinnedMesh){fI.setOptional(Y,oA,"bindMatrix"),fI.setOptional(Y,oA,"bindMatrixInverse");const YI=oA.skeleton;YI&&(eA.floatVertexTextures?(YI.boneTexture===null&&YI.computeBoneTexture(),fI.setValue(Y,"boneTexture",YI.boneTexture,kA),fI.setValue(Y,"boneTextureSize",YI.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const uC=BA.morphAttributes;if((uC.position!==void 0||uC.normal!==void 0||uC.color!==void 0&&eA.isWebGL2===!0)&&aA.update(oA,BA,T,Kg),(dg||OA.receiveShadow!==oA.receiveShadow)&&(OA.receiveShadow=oA.receiveShadow,fI.setValue(Y,"receiveShadow",oA.receiveShadow)),T.isMeshGouraudMaterial&&T.envMap!==null&&(og.envMap.value=WA,og.flipEnvMap.value=WA.isCubeTexture&&WA.isRenderTargetTexture===!1?-1:1),dg&&(fI.setValue(Y,"toneMappingExposure",r.toneMappingExposure),OA.needsLights&&aI(og,Vg),qA&&T.fog===!0&&UA.refreshFogUniforms(og,qA),UA.refreshMaterialUniforms(og,T,X,L,v),tE.upload(Y,OA.uniformsList,og,kA)),T.isShaderMaterial&&T.uniformsNeedUpdate===!0&&(tE.upload(Y,OA.uniformsList,og,kA),T.uniformsNeedUpdate=!1),T.isSpriteMaterial&&fI.setValue(Y,"center",oA.center),fI.setValue(Y,"modelViewMatrix",oA.modelViewMatrix),fI.setValue(Y,"normalMatrix",oA.normalMatrix),fI.setValue(Y,"modelMatrix",oA.matrixWorld),T.isShaderMaterial||T.isRawShaderMaterial){const YI=T.uniformsGroups;for(let LC=0,tC=YI.length;LC<tC;LC++)if(eA.isWebGL2){const YC=YI[LC];JA.update(YC,Kg),JA.bind(YC,Kg)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Kg}function aI(R,_){R.ambientLightColor.needsUpdate=_,R.lightProbe.needsUpdate=_,R.directionalLights.needsUpdate=_,R.directionalLightShadows.needsUpdate=_,R.pointLights.needsUpdate=_,R.pointLightShadows.needsUpdate=_,R.spotLights.needsUpdate=_,R.spotLightShadows.needsUpdate=_,R.rectAreaLights.needsUpdate=_,R.hemisphereLights.needsUpdate=_}function KI(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return l},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(R,_,BA){EA.get(R.texture).__webglTexture=_,EA.get(R.depthTexture).__webglTexture=BA;const T=EA.get(R);T.__hasExternalTextures=!0,T.__hasExternalTextures&&(T.__autoAllocateDepthBuffer=BA===void 0,T.__autoAllocateDepthBuffer||z.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),T.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(R,_){const BA=EA.get(R);BA.__webglFramebuffer=_,BA.__useDefaultFramebuffer=_===void 0},this.setRenderTarget=function(R,_=0,BA=0){S=R,l=_,G=BA;let T=!0,oA=null,qA=!1,xA=!1;if(R){const WA=EA.get(R);WA.__useDefaultFramebuffer!==void 0?(tA.bindFramebuffer(36160,null),T=!1):WA.__webglFramebuffer===void 0?kA.setupRenderTarget(R):WA.__hasExternalTextures&&kA.rebindTextures(R,EA.get(R.texture).__webglTexture,EA.get(R.depthTexture).__webglTexture);const jA=R.texture;(jA.isData3DTexture||jA.isDataArrayTexture||jA.isCompressedArrayTexture)&&(xA=!0);const VA=EA.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(oA=VA[_],qA=!0):eA.isWebGL2&&R.samples>0&&kA.useMultisampledRTT(R)===!1?oA=EA.get(R).__webglMultisampledFramebuffer:oA=VA,K.copy(R.viewport),U.copy(R.scissor),w=R.scissorTest}else K.copy(J).multiplyScalar(X).floor(),U.copy(m).multiplyScalar(X).floor(),w=P;if(tA.bindFramebuffer(36160,oA)&&eA.drawBuffers&&T&&tA.drawBuffers(R,oA),tA.viewport(K),tA.scissor(U),tA.setScissorTest(w),qA){const WA=EA.get(R.texture);Y.framebufferTexture2D(36160,36064,34069+_,WA.__webglTexture,BA)}else if(xA){const WA=EA.get(R.texture),jA=_||0;Y.framebufferTextureLayer(36160,36064,WA.__webglTexture,BA||0,jA)}k=-1},this.readRenderTargetPixels=function(R,_,BA,T,oA,qA,xA){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let vA=EA.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&xA!==void 0&&(vA=vA[xA]),vA){tA.bindFramebuffer(36160,vA);try{const WA=R.texture,jA=WA.format,VA=WA.type;if(jA!==Mg&&sA.convert(jA)!==Y.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const XA=VA===EQ&&(z.has("EXT_color_buffer_half_float")||eA.isWebGL2&&z.has("EXT_color_buffer_float"));if(VA!==KC&&sA.convert(VA)!==Y.getParameter(35738)&&!(VA===lC&&(eA.isWebGL2||z.has("OES_texture_float")||z.has("WEBGL_color_buffer_float")))&&!XA){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}_>=0&&_<=R.width-T&&BA>=0&&BA<=R.height-oA&&Y.readPixels(_,BA,T,oA,sA.convert(jA),sA.convert(VA),qA)}finally{const WA=S!==null?EA.get(S).__webglFramebuffer:null;tA.bindFramebuffer(36160,WA)}}},this.copyFramebufferToTexture=function(R,_,BA=0){const T=Math.pow(2,-BA),oA=Math.floor(_.image.width*T),qA=Math.floor(_.image.height*T);kA.setTexture2D(_,0),Y.copyTexSubImage2D(3553,BA,0,0,R.x,R.y,oA,qA),tA.unbindTexture()},this.copyTextureToTexture=function(R,_,BA,T=0){const oA=_.image.width,qA=_.image.height,xA=sA.convert(BA.format),vA=sA.convert(BA.type);kA.setTexture2D(BA,0),Y.pixelStorei(37440,BA.flipY),Y.pixelStorei(37441,BA.premultiplyAlpha),Y.pixelStorei(3317,BA.unpackAlignment),_.isDataTexture?Y.texSubImage2D(3553,T,R.x,R.y,oA,qA,xA,vA,_.image.data):_.isCompressedTexture?Y.compressedTexSubImage2D(3553,T,R.x,R.y,_.mipmaps[0].width,_.mipmaps[0].height,xA,_.mipmaps[0].data):Y.texSubImage2D(3553,T,R.x,R.y,xA,vA,_.image),T===0&&BA.generateMipmaps&&Y.generateMipmap(3553),tA.unbindTexture()},this.copyTextureToTexture3D=function(R,_,BA,T,oA=0){if(r.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const qA=R.max.x-R.min.x+1,xA=R.max.y-R.min.y+1,vA=R.max.z-R.min.z+1,WA=sA.convert(T.format),jA=sA.convert(T.type);let VA;if(T.isData3DTexture)kA.setTexture3D(T,0),VA=32879;else if(T.isDataArrayTexture)kA.setTexture2DArray(T,0),VA=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}Y.pixelStorei(37440,T.flipY),Y.pixelStorei(37441,T.premultiplyAlpha),Y.pixelStorei(3317,T.unpackAlignment);const XA=Y.getParameter(3314),GI=Y.getParameter(32878),pI=Y.getParameter(3316),Ig=Y.getParameter(3315),Dg=Y.getParameter(32877),RA=BA.isCompressedTexture?BA.mipmaps[0]:BA.image;Y.pixelStorei(3314,RA.width),Y.pixelStorei(32878,RA.height),Y.pixelStorei(3316,R.min.x),Y.pixelStorei(3315,R.min.y),Y.pixelStorei(32877,R.min.z),BA.isDataTexture||BA.isData3DTexture?Y.texSubImage3D(VA,oA,_.x,_.y,_.z,qA,xA,vA,WA,jA,RA.data):BA.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),Y.compressedTexSubImage3D(VA,oA,_.x,_.y,_.z,qA,xA,vA,WA,RA.data)):Y.texSubImage3D(VA,oA,_.x,_.y,_.z,qA,xA,vA,WA,jA,RA),Y.pixelStorei(3314,XA),Y.pixelStorei(32878,GI),Y.pixelStorei(3316,pI),Y.pixelStorei(3315,Ig),Y.pixelStorei(32877,Dg),oA===0&&T.generateMipmaps&&Y.generateMipmap(VA),tA.unbindTexture()},this.initTexture=function(R){R.isCubeTexture?kA.setTextureCube(R,0):R.isData3DTexture?kA.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?kA.setTexture2DArray(R,0):kA.setTexture2D(R,0),tA.unbindTexture()},this.resetState=function(){l=0,G=0,S=null,tA.reset(),gA.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}class Ew extends ua{}Ew.prototype.isWebGL1Renderer=!0;class Uo extends Ag{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(A,I){return super.copy(A,I),A.background!==null&&(this.background=A.background.clone()),A.environment!==null&&(this.environment=A.environment.clone()),A.fog!==null&&(this.fog=A.fog.clone()),this.backgroundBlurriness=A.backgroundBlurriness,this.backgroundIntensity=A.backgroundIntensity,A.overrideMaterial!==null&&(this.overrideMaterial=A.overrideMaterial.clone()),this.matrixAutoUpdate=A.matrixAutoUpdate,this}toJSON(A){const I=super.toJSON(A);return this.fog!==null&&(I.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(I.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(I.backgroundIntensity=this.backgroundIntensity),I}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(A){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=A}}class iw extends Fg{constructor(A,I,g,C=1){super(A,I,g),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=C}copy(A){return super.copy(A),this.meshPerAttribute=A.meshPerAttribute,this}toJSON(){const A=super.toJSON();return A.meshPerAttribute=this.meshPerAttribute,A.isInstancedBufferAttribute=!0,A}}class ow extends PI{constructor(A,I,g,C,B,E,Q,o,t){super(A,I,g,C,B,E,Q,o,t),this.isCanvasTexture=!0,this.needsUpdate=!0}}class tw extends wQ{constructor(A){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $A(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $A(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Da,this.normalScale=new AI(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ro,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(A)}copy(A){return super.copy(A),this.color.copy(A.color),this.map=A.map,this.lightMap=A.lightMap,this.lightMapIntensity=A.lightMapIntensity,this.aoMap=A.aoMap,this.aoMapIntensity=A.aoMapIntensity,this.emissive.copy(A.emissive),this.emissiveMap=A.emissiveMap,this.emissiveIntensity=A.emissiveIntensity,this.bumpMap=A.bumpMap,this.bumpScale=A.bumpScale,this.normalMap=A.normalMap,this.normalMapType=A.normalMapType,this.normalScale.copy(A.normalScale),this.displacementMap=A.displacementMap,this.displacementScale=A.displacementScale,this.displacementBias=A.displacementBias,this.specularMap=A.specularMap,this.alphaMap=A.alphaMap,this.envMap=A.envMap,this.combine=A.combine,this.reflectivity=A.reflectivity,this.refractionRatio=A.refractionRatio,this.wireframe=A.wireframe,this.wireframeLinewidth=A.wireframeLinewidth,this.wireframeLinecap=A.wireframeLinecap,this.wireframeLinejoin=A.wireframeLinejoin,this.flatShading=A.flatShading,this.fog=A.fog,this}}class La extends Ag{constructor(A,I=1){super(),this.isLight=!0,this.type="Light",this.color=new $A(A),this.intensity=I}dispose(){}copy(A,I){return super.copy(A,I),this.color.copy(A.color),this.intensity=A.intensity,this}toJSON(A){const I=super.toJSON(A);return I.object.color=this.color.getHex(),I.object.intensity=this.intensity,this.groundColor!==void 0&&(I.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(I.object.distance=this.distance),this.angle!==void 0&&(I.object.angle=this.angle),this.decay!==void 0&&(I.object.decay=this.decay),this.penumbra!==void 0&&(I.object.penumbra=this.penumbra),this.shadow!==void 0&&(I.object.shadow=this.shadow.toJSON()),I}}const fi=new MI,ne=new j,De=new j;class ew{constructor(A){this.camera=A,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new AI(512,512),this.map=null,this.mapPass=null,this.matrix=new MI,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new No,this._frameExtents=new AI(1,1),this._viewportCount=1,this._viewports=[new rI(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(A){const I=this.camera,g=this.matrix;ne.setFromMatrixPosition(A.matrixWorld),I.position.copy(ne),De.setFromMatrixPosition(A.target.matrixWorld),I.lookAt(De),I.updateMatrixWorld(),fi.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fi),g.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),g.multiply(fi)}getViewport(A){return this._viewports[A]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(A){return this.camera=A.camera.clone(),this.bias=A.bias,this.radius=A.radius,this.mapSize.copy(A.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const A={};return this.bias!==0&&(A.bias=this.bias),this.normalBias!==0&&(A.normalBias=this.normalBias),this.radius!==1&&(A.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(A.mapSize=this.mapSize.toArray()),A.camera=this.camera.toJSON(!1).object,delete A.camera.matrix,A}}const re=new MI,vB=new j,qi=new j;class aw extends ew{constructor(){super(new sg(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new AI(4,2),this._viewportCount=6,this._viewports=[new rI(2,1,1,1),new rI(0,1,1,1),new rI(3,1,1,1),new rI(1,1,1,1),new rI(3,0,1,1),new rI(1,0,1,1)],this._cubeDirections=[new j(1,0,0),new j(-1,0,0),new j(0,0,1),new j(0,0,-1),new j(0,1,0),new j(0,-1,0)],this._cubeUps=[new j(0,1,0),new j(0,1,0),new j(0,1,0),new j(0,1,0),new j(0,0,1),new j(0,0,-1)]}updateMatrices(A,I=0){const g=this.camera,C=this.matrix,B=A.distance||g.far;B!==g.far&&(g.far=B,g.updateProjectionMatrix()),vB.setFromMatrixPosition(A.matrixWorld),g.position.copy(vB),qi.copy(g.position),qi.add(this._cubeDirections[I]),g.up.copy(this._cubeUps[I]),g.lookAt(qi),g.updateMatrixWorld(),C.makeTranslation(-vB.x,-vB.y,-vB.z),re.multiplyMatrices(g.projectionMatrix,g.matrixWorldInverse),this._frustum.setFromProjectionMatrix(re)}}class sw extends La{constructor(A,I,g=0,C=2){super(A,I),this.isPointLight=!0,this.type="PointLight",this.distance=g,this.decay=C,this.shadow=new aw}get power(){return this.intensity*4*Math.PI}set power(A){this.intensity=A/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(A,I){return super.copy(A,I),this.distance=A.distance,this.decay=A.decay,this.shadow=A.shadow.clone(),this}}class Ya extends La{constructor(A,I){super(A,I),this.isAmbientLight=!0,this.type="AmbientLight"}}class nw extends Zg{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(A){return super.copy(A),this.instanceCount=A.instanceCount,this}toJSON(){const A=super.toJSON();return A.instanceCount=this.instanceCount,A.isInstancedBufferGeometry=!0,A}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Fo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Fo);const HE="Interact",Jo="MoveUp",po="MoveDown",fo="MoveLeft",qo="MoveRight";class Dw{eventBus;keyMap={KeyW:Jo,KeyS:po,KeyA:fo,KeyD:qo,KeyE:HE};constructor(A){this.eventBus=A,window.addEventListener("keydown",this.handleKeyUpDown(!0)),window.addEventListener("keyup",this.handleKeyUpDown(!1))}handleKeyUpDown=A=>I=>{this.keyMap.hasOwnProperty(I.code)&&this.eventBus.publish(this.keyMap[I.code],A)}}class rw{active=!1;down=!1;get once(){return this.active?(this.active=!1,!0):!1}}class hw{eventBus=new qe;controllers=[];inputs=new Map;constructor(...A){A.forEach(I=>{this.inputs.set(I,new rw),this.eventBus.subscribe(I,g=>{this.inputs.get(I).down=g,this.inputs.get(I).active=g})})}registerControllers(...A){this.controllers=A.map(I=>new I(this.eventBus))}getInput(A){return this.inputs.get(A)}}//! World 
await ns.init();const gC=new nQ({x:0,y:0});//! Camera
const Ha=()=>{const i=window.innerWidth/window.innerHeight,A=300,I=new Ka(A*i/-2,A*i/2,A/2,A/-2,1,1e6);return window.addEventListener("resize",()=>{const g=window.innerWidth/window.innerHeight;I.left=-A*g/2,I.right=A*g/2,I.top=A/2,I.bottom=-A/2,I.updateProjectionMatrix()}),I.position.set(0,0,200),I};//! Renderer
const cw=()=>{const i=new ua({alpha:!0});return i.setPixelRatio(window.devicePixelRatio),i.setSize(window.innerWidth,window.innerHeight),window.addEventListener("resize",()=>{i.setSize(window.innerWidth,window.innerHeight)}),i.autoClear=!1,i},Ao=cw();document.body.appendChild(Ao.domElement);//! Scenes
const uo=new Uo,cB=new Uo;cB.background=new $A(4473924);new Uo;//! Cameras
const Io=Ha(),qg=Ha();//! Lights
const ww=new Ya(16777215);uo.add(ww);const Gw=new Ya(new $A("hsl(0,0%,4%)"));cB.add(Gw);//! Render
const ma=()=>{Ao.render(cB,qg),Ao.render(uo,Io)};//! Inputs
const SC=new hw(Jo,po,fo,qo,HE);SC.registerControllers(Dw);class Ng extends LI{tiles;lastState="";currentState="";selectedFrame=0;frameRate=10;frameCounter=0;maxFrames;flipped=!1;constructor(A){super(),this.tiles=A,this.maxFrames=Math.max(...Object.values(A).map(I=>I.frames)),this.currentState=Object.keys(A)[0],this.lastState=this.currentState}set state(A){this.lastState=this.currentState,this.currentState=A}get frames(){return this.tile.frames}get tile(){return this.tiles[this.currentState]}}Ng.register();class FI extends LI{mesh;texture;normalMap=null;width;height;renderOrder;scale;lastModifer="buffer";modifier="buffer";material;constructor(A,I){super();const g=Object.assign({renderOrder:10,scale:1},I);this.renderOrder=g.renderOrder*10,this.scale=g.scale,this.width=A.width*this.scale,this.height=A.height*this.scale,this.texture=new ow(A.buffer.canvas),this.texture.minFilter=mI,this.texture.magFilter=mI,this.texture.wrapS=BQ,this.texture.wrapT=BQ;const C={map:this.texture,transparent:!0};this.material=I?.material=="basic"?new LE(C):new tw(C);const B=new pC(this.width,this.height),E=new ng(B,this.material);this.mesh=E}destroy(){this.mesh.geometry.dispose(),this.mesh.removeFromParent()}}FI.register();class lw extends Pg{constructor(){super(Ng)}update(A){A.forEach(I=>{const g=I.getComponent(Ng),C=I.getComponent(FI);g.frameCounter++,g.frameCounter>g.frameRate&&(g.frameCounter=0,g.selectedFrame=(g.selectedFrame+1)%g.frames),C.texture.repeat.x=(g.flipped?-1:1)/g.maxFrames,C.texture.offset.x=((g.flipped?1:0)+g.selectedFrame)/g.frames,C.normalMap&&(C.normalMap.repeat.x=(g.flipped?-1:1)/g.maxFrames,C.normalMap.offset.x=((g.flipped?1:0)+g.selectedFrame)/g.frames),(g.currentState!=g.lastState||C.modifier!=C.lastModifer)&&(C.texture.image=g.tile[C.modifier].canvas,C.normalMap&&(C.normalMap.image=g.tile.normalMap?.canvas),C.lastModifer=C.modifier,C.texture.needsUpdate=!0,g.selectedFrame=0)})}}class xI extends LI{body=null;bodyDescription;colliders=[];colliderDescriptions;moveForce;velociy={x:0,y:0};constructor(A,I){super(),this.moveForce=A.moveForce??10;//!Body
this.bodyDescription=yg[A.type??"dynamic"]().setAdditionalMass(1).setCanSleep(!1).setCcdEnabled(!0),A?.lock&&this.bodyDescription.lockRotations();//!Collider
this.colliderDescriptions=I.map(g=>{const C=uI.cuboid(g.width/2,g.height/2).setDensity(g.mass??1e3).setSensor(g.sensor??!1).setCollisionGroups(g.group*65536+g.canCollideWith.reduce((B,E)=>B+E,0));return g.contact&&C.setActiveEvents(lE.COLLISION_EVENTS),C})}contacts(A,I){Object.keys(this.colliders).length&&this.colliders.forEach(g=>{if(I&&Math.floor(g.collisionGroups()/65536)!=I)return;const C=B=>{const E=B?.parent()?.userData,Q=eI.getEntityById(E);A(Q)};gC.contactsWith(g,C),gC.intersectionsWith(g,C)})}bind(A){this.bodyDescription.setUserData(A)}destroy(){!this.body||(gC.removeRigidBody(this.body),!this.colliders.length&&this.colliders.forEach(A=>{gC.removeCollider(A,!1)}))}}xI.register();class wI extends LI{x;y;constructor(A,I){super(),this.x=A,this.y=I}}wI.register();class _g extends LI{rotation=0;angVel=0;constructor(A,I=0){super(),this.rotation=A,this.angVel=I}}_g.register();class mE extends LI{type;distance;parentId;jointed=!1;constructor(A,I,g){super(),this.type=A,this.distance=I,this.parentId=g?.id??null}}mE.register();class Sw extends Pg{constructor(){super(xI)}update(A){A.forEach(I=>{const g=I.getComponent(xI),C=I.getComponent(wI),B=I.getComponent(mE),E=I.getComponent(_g);if(!g.body&&C&&(g.bodyDescription.setTranslation(C.x,C.y),g.body=gC.createRigidBody(g.bodyDescription),E&&g.body.setRotation(E.rotation,!0)),!g.colliders.length&&g.body&&(g.colliders=g.colliderDescriptions.map(Q=>gC.createCollider(Q,g.body))),B&&!B?.jointed&&g.body&&B.parentId){const Q=eI.getEntityById(B.parentId).getComponent(xI);if(!Q.body)return;const o=()=>{switch(B.type){case"revolute":return yC.revolute({x:0,y:0},{x:B.distance,y:0});case"prismatic":{const t=yC.prismatic({x:0,y:0},{x:0,y:0},{x:1,y:1});return t.limitsEnabled=!0,t.limits=[30,60],t}}};gC.createImpulseJoint(o(),Q.body,g.body,!0),B.jointed=!0}})}}class fC extends LI{amount=0;target;destroyOnHit;constructor(A,I,g=-1){super(),this.amount=A,this.target=I,this.destroyOnHit=g}}fC.register();const oQ=(i,A)=>{const g=document.createElement("canvas").getContext("2d",{alpha:!0});return g.canvas.height=A,g.canvas.width=i??16/9*A,g.imageSmoothingEnabled=!1,g.canvas.style["image-rendering"]="pixelated",g},yw="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4.25290ca2.png",kw="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4-normals.8550a291.png",Mw="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4-red.1e67c1ad.png",Fw="/Dungeon-Survivor/assets/0x72_DungeonTilesetII_v1.4-outline.a2f8ef43.png",Rw=`wall_top_left 16 0 16 16
wall_top_mid 32 0 16 16
wall_top_right 48 0 16 16

wall_left 16 16 16 16
wall_mid 32 16 16 16
wall_right 48 16 16 16

wall_fountain_top 64 0 16 16
wall_fountain_mid_red_anim 64 16 16 16 3
wall_fountain_basin_red_anim 64 32 16 16 3
wall_fountain_mid_blue_anim 64 48 16 16 3
wall_fountain_basin_blue_anim 64 64 16 16 3

wall_hole_1 48 32 16 16
wall_hole_2 48 48 16 16

wall_banner_red 16 32 16 16
wall_banner_blue 32 32 16 16
wall_banner_green 16 48 16 16
wall_banner_yellow 32 48 16 16

column_top 80 80 16 16
column_mid 80 96 16 16
coulmn_base 80 112 16 16
wall_column_top 96 80 16 16
wall_column_mid 96 96 16 16
wall_coulmn_base 96 112 16 16

wall_goo 64 80 16 16
wall_goo_base 64 96 16 16

floor_1 16 64 16 16
floor_2 32 64 16 16
floor_3 48 64 16 16
floor_4 16 80 16 16
floor_5 32 80 16 16
floor_6 48 80 16 16
floor_7 16 96 16 16
floor_8 32 96 16 16
floor_ladder 48 96 16 16

floor_spikes_anim 16 176 16 16 4

wall_side_top_left 0 112 16 16
wall_side_top_right 16 112 16 16
wall_side_mid_left 0 128 16 16
wall_side_mid_right 16 128 16 16
wall_side_front_left 0 144 16 16
wall_side_front_right 16 144 16 16

wall_corner_top_left 32 112 16 16
wall_corner_top_right 48 112 16 16
wall_corner_left 32 128 16 16
wall_corner_right 48 128 16 16
wall_corner_bottom_left 32 144 16 16
wall_corner_bottom_right 48 144 16 16
wall_corner_front_left 32 160 16 16
wall_corner_front_right 48 160 16 16

wall_inner_corner_l_top_left 80 128 16 16
wall_inner_corner_l_top_rigth 64 128 16 16
wall_inner_corner_mid_left 80 144 16 16
wall_inner_corner_mid_rigth 64 144 16 16
wall_inner_corner_t_top_left 80 160 16 16
wall_inner_corner_t_top_rigth 64 160 16 16

edge 96 128 16 16
hole 96 144 16 16

doors_all 16 221 64 35
doors_frame_left 16 224 16 32
doors_frame_top 32 221 32 3
doors_frame_righ 63 224 16 32
doors_leaf_closed 32 224 32 32
doors_leaf_open 80 224 32 32

chest_empty_open_anim 304 288 16 16 3
chest_full_open_anim 304 304 16 16 3
chest_mimic_open_anim 304 320 16 16 3

flask_big_red 288 224 16 16
flask_big_blue 304 224 16 16
flask_big_green 320 224 16 16
flask_big_yellow 336 224 16 16

flask_red 288 240 16 16
flask_blue 304 240 16 16
flask_green 320 240 16 16
flask_yellow 336 240 16 16

skull 288 320 16 16
crate 288 298 16 22

coin_anim 288 272 8 8 4

ui_heart_full 288 256 16 16
ui_heart_half 304 256 16 16
ui_heart_empty 320 256 16 16

weapon_knife 293 18 6 13
weapon_rusty_sword 307 26 10 21
weapon_regular_sword 323 26 10 21
weapon_red_gem_sword 339 26 10 21
weapon_big_hammer 291 42 10 37
weapon_hammer 307 55 10 24
weapon_baton_with_spikes 323 57 10 22
weapon_mace 339 55 10 24
weapon_katana 293 82 6 29
weapon_saw_sword 307 86 10 25
weapon_anime_sword 322 81 12 30
weapon_axe 341 90 9 21
weapon_machete 294 121 5 22
weapon_cleaver 310 124 8 19
weapon_duel_sword 325 113 9 30
weapon_knight_sword 339 114 10 29
weapon_golden_sword 291 153 10 22
weapon_lavish_sword 307 145 10 30
weapon_red_magic_staff 324 145 8 30
weapon_green_magic_staff 340 145 8 30
weapon_spear 293 177 6 30
weapon_arrow 308 186 7 21
weapon_bow 325 180 25 7

tiny_zombie_idle_anim 368 16 16 16 4
tiny_zombie_run_anim 432 16 16 16 4
goblin_idle_anim 368 32 16 16 4
goblin_run_anim 432 32 16 16 4
imp_idle_anim 368 48 16 16 4
imp_run_anim 432 48 16 16 4
skelet_idle_anim 368 80 16 16 4
skelet_run_anim 432 80 16 16 4
muddy_idle_anim 368 112 16 16 4
muddy_run_anim 368 112 16 16 4
swampy_idle_anim 432 112 16 16 4
swampy_run_anim 432 112 16 16 4
zombie_idle_anim 368 144 16 16 4
zombie_run_anim 368 144 16 16 4
ice_zombie_idle_anim 432 144 16 16 4
ice_zombie_run_anim 432 144 16 16 4
masked_orc_idle_anim 368 172 16 20 4
masked_orc_run_anim 432 172 16 20 4
orc_warrior_idle_anim 368 204 16 20 4
orc_warrior_run_anim 432 204 16 20 4
orc_shaman_idle_anim 368 236 16 20 4
orc_shaman_run_anim 432 236 16 20 4
necromancer_idle_anim 368 268 16 20 4
necromancer_run_anim 368 268 16 20 4
wogol_idle_anim 368 300 16 20 4
wogol_run_anim 432 300 16 20 4
chort_idle_anim 368 328 16 24 4
chort_run_anim 432 328 16 24 4
big_zombie_idle_anim 16 270 32 34 4
big_zombie_run_anim 144 270 32 34 4
ogre_idle_anim  16 320 32 32 4
ogre_run_anim 144 320 32 32 4
big_demon_idle_anim  16 364 32 36 4
big_demon_run_anim 144 364 32 36 4

elf_f_idle_anim 128 4 16 28 4
elf_f_run_anim 192 4 16 28 4
elf_f_hit_anim 256 4 16 28 1

elf_m_idle_anim 128 36 16 28 4
elf_m_run_anim 192 36 16 28 4
elf_m_hit_anim 256 36 16 28 1

knight_f_idle_anim 128 68 16 28 4
knight_f_run_anim 192 68 16 28 4
knight_f_hit_anim 256 68 16 28 1

knight_m_idle_anim 128 100 16 28 4
knight_m_run_anim 192 100 16 28 4
knight_m_hit_anim 256 100 16 28 1

wizzard_f_idle_anim 128 132 16 28 4
wizzard_f_run_anim 192 132 16 28 4
wizzard_f_hit_anim 256 132 16 28 1

wizzard_m_idle_anim 128 164 16 28 4
wizzard_m_run_anim 192 164 16 28 4
wizzard_m_hit_anim 256 164 16 28 1

lizard_f_idle_anim 128 196 16 28 4
lizard_f_run_anim 192 196 16 28 4
lizard_f_hit_anim 256 196 16 28 1

lizard_m_idle_anim 128 228 16 28 4
lizard_m_run_anim 192 228 16 28 4
lizard_m_hit_anim 256 228 16 28 1

flame 512 16 16 16 8
flame_wall 512 32 16 32 8
flame_background 512 64 16 16 8
flame_brasier 512 80 16 32 8

xp 288 336 16 16 1`;class lQ{buffer;normalMap;hurt;outline;width;height;frames;constructor({buffer:A,width:I,height:g,frames:C=1,normalMap:B,hurt:E,outline:Q}){this.buffer=A,this.normalMap=B,this.width=I??A.canvas.width,this.height=g??A.canvas.height,this.frames=C,this.hurt=E,this.outline=Q}clone(){const A={buffer:oQ(this.buffer.canvas.width,this.buffer.canvas.height),width:this.width,height:this.height,frames:this.frames};return A.buffer.drawImage(this.buffer.canvas,0,0),this.normalMap&&(A.normalMap=oQ(this.normalMap.canvas.width,this.normalMap.canvas.height),A.normalMap.drawImage(this.normalMap.canvas,0,0)),new lQ(A)}}const Nw="/Dungeon-Survivor/assets/GUI.190edcad.png",Kw={"GUI.ase":{frame:{x:0,y:0,w:192,h:304},rotated:!1,trimmed:!1,spriteSourceSize:{x:0,y:0,w:192,h:304},sourceSize:{w:192,h:304},duration:100}},dw={app:"https://www.aseprite.org/",version:"1.2.35-x64",format:"I8",size:{w:192,h:304},scale:"1",slices:[{name:"XPBar",color:"#0000ffff",keys:[{frame:0,bounds:{x:135,y:20,w:51,h:7}}]},{name:"XPFull",color:"#0000ffff",keys:[{frame:0,bounds:{x:71,y:20,w:52,h:7}}]},{name:"healthBar",color:"#0000ffff",keys:[{frame:0,bounds:{x:176,y:129,w:16,h:3}}]},{name:"healthFull",color:"#0000ffff",keys:[{frame:0,bounds:{x:176,y:133,w:16,h:3}}]},{name:"box",color:"#0000ffff",keys:[{frame:0,bounds:{x:96,y:36,w:26,h:24}}]},{name:"frame1",color:"#0000ffff",keys:[{frame:0,bounds:{x:2,y:34,w:44,h:44}}]}]},Uw={frames:Kw,meta:dw},SQ=async i=>{const A=new Image;return A.src=i,await new Promise(I=>{A.onload=I}),A},Jw=await SQ(yw),pw=await SQ(kw),fw=await SQ(Nw),qw=await SQ(Mw),uw=await SQ(Fw),Lw=Uw.meta.slices.reduce((i,A)=>{const{w:I,h:g,x:C,y:B}=A.keys[0].bounds,E=oQ(I,g);return E.drawImage(fw,C,B,I,g,0,0,I,g),{...i,[A.name]:new lQ({buffer:E})}},{}),Yw=Rw.split(`
`).map(i=>i.split(" ")).filter(i=>i.every(A=>A)).reduce((i,[A,I,g,C,B,E="1"])=>{const Q=parseInt(C)*parseInt(E),[o,t,e,a]=[Jw,pw,qw,uw].map(D=>{const c=oQ(Q,parseInt(B));return c.drawImage(D,parseInt(I),parseInt(g),Q,parseInt(B),0,0,Q,parseInt(B)),c}),s=new lQ({buffer:o,normalMap:t,hurt:e,outline:a,width:Number(C),height:Number(B),frames:Number(E)});return{...i,[A]:s}},{}),pA=new class{tiles=Yw;UI=Lw},xa=(i,A,I,g)=>{const C=i.texture.image,B=Math.ceil(g*i.texture.image.width),E=C.getContext("2d");E.drawImage(A.buffer.canvas,0,0),E.drawImage(I.buffer.canvas,0,0,B,i.height,0,0,B,i.height),i.texture.needsUpdate=!0},Hw=pA.UI.healthFull,mw=pA.UI.healthBar;class wB extends LI{health;maxHealth;type;healthBarId=null;canTakeDamage=!0;show;constructor(A,I,g=!0){super(),this.health=A,this.maxHealth=A,this.type=I,this.show=g}updateHealth(A){this.health=Math.max(0,Math.min(this.health+A,this.maxHealth)),this.healthBarId&&xa(eI.getEntityById(this.healthBarId).getComponent(FI),mw,Hw,this.health/this.maxHealth)}}wB.register();const Ta=function*(i){for(let A=0;A<i;A++)yield A;return i},xw=pA.UI.healthBar;class Tw extends Pg{constructor(){super(wB)}update(A){A.forEach(I=>{const g=I.getComponent(wB),C=I.getComponent(FI),B=I.getComponent(xI),E=I.getComponent(Ng);if(g.show&&!g.healthBarId&&C){const Q=new ZI,o=new FI(xw.clone(),{renderOrder:11});Q.addComponent(o),g.healthBarId=Q.id,C.mesh.add(o.mesh),o.mesh.position.y=C.height/2,g.updateHealth(0)}B&&g.canTakeDamage&&B.contacts(Q=>{const o=Q.getComponent(fC);o.target.includes(g.type)&&(g.updateHealth(-o.amount),o.destroyOnHit--,o.destroyOnHit===0&&Q.destroy(),E&&o.amount>0&&(C.modifier="hurt"),g.canTakeDamage=!1,tB.add(function*(){yield*Ta(20),g.canTakeDamage=!0,E&&(C.modifier="buffer")}))}),g.health==0&&I.destroy()})}}class Lo extends LI{constructor(){super()}}Lo.register();class Yo extends LI{enabled=!0;constructor(){super()}}Yo.register();class bw extends Pg{constructor(){super(wI)}update(A){A.forEach(I=>{const g=I.getComponent(wI),C=I.getComponent(Yo),B=I.getComponent(xI),E=I.getComponent(Ng),Q=I.getComponent(Lo),o=I.getComponent(_g);B&&(C?.enabled&&(SC.getInput(Jo)?.active&&(B.velociy.y=B.moveForce),SC.getInput(po)?.active&&(B.velociy.y=-B.moveForce),SC.getInput(fo)?.active&&(B.velociy.x=-B.moveForce),SC.getInput(qo)?.active&&(B.velociy.x=B.moveForce)),E&&(B.velociy.x!=0&&(E.flipped=B.velociy.x<0),E.state=B.velociy.x+B.velociy.y>B.moveForce*.5?"run":"idle"),B.body&&(B.body.setLinvel(B.velociy,!0),B.velociy.x=0,B.velociy.y=0,g.x=B.body.translation().x,g.y=B.body.translation().y,o&&(o.angVel&&B.body.setAngvel(o.angVel,!0),o.rotation=B.body.rotation())),Q&&(eI.eventBus.publish(ug.CAMERAMOVE,{x:g.x,y:g.y}),qg.position.x=g.x,qg.position.y=g.y,qg.lookAt(new j(g.x,g.y,0))))})}}function vw(){var i=Object.create(null);function A(C,B){var E=C.id,Q=C.name,o=C.dependencies;o===void 0&&(o=[]);var t=C.init;t===void 0&&(t=function(){});var e=C.getTransferables;if(e===void 0&&(e=null),!i[E])try{o=o.map(function(s){return s&&s.isWorkerModule&&(A(s,function(D){if(D instanceof Error)throw D}),s=i[s.id].value),s}),t=g("<"+Q+">.init",t),e&&(e=g("<"+Q+">.getTransferables",e));var a=null;typeof t=="function"?a=t.apply(void 0,o):console.error("worker module init function failed to rehydrate"),i[E]={id:E,value:a,getTransferables:e},B(a)}catch(s){s&&s.noLog||console.error(s),B(s)}}function I(C,B){var E,Q=C.id,o=C.args;(!i[Q]||typeof i[Q].value!="function")&&B(new Error("Worker module "+Q+": not found or its 'init' did not return a function"));try{var t=(E=i[Q]).value.apply(E,o);t&&typeof t.then=="function"?t.then(e,function(a){return B(a instanceof Error?a:new Error(""+a))}):e(t)}catch(a){B(a)}function e(a){try{var s=i[Q].getTransferables&&i[Q].getTransferables(a);(!s||!Array.isArray(s)||!s.length)&&(s=void 0),B(a,s)}catch(D){console.error(D),B(D)}}}function g(C,B){var E=void 0;self.troikaDefine=function(o){return E=o};var Q=URL.createObjectURL(new Blob(["/** "+C.replace(/\*/g,"")+` **/

troikaDefine(
`+B+`
)`],{type:"application/javascript"}));try{importScripts(Q)}catch(o){console.error(o)}return URL.revokeObjectURL(Q),delete self.troikaDefine,E}self.addEventListener("message",function(C){var B=C.data,E=B.messageId,Q=B.action,o=B.data;try{Q==="registerModule"&&A(o,function(t){t instanceof Error?postMessage({messageId:E,success:!1,error:t.message}):postMessage({messageId:E,success:!0,result:{isCallable:typeof t=="function"}})}),Q==="callModule"&&I(o,function(t,e){t instanceof Error?postMessage({messageId:E,success:!1,error:t.message}):postMessage({messageId:E,success:!0,result:t},e||void 0)})}catch(t){postMessage({messageId:E,success:!1,error:t.stack})}})}function Ww(i){var A=function(){for(var I=[],g=arguments.length;g--;)I[g]=arguments[g];return A._getInitResult().then(function(C){if(typeof C=="function")return C.apply(void 0,I);throw new Error("Worker module function was called but `init` did not return a callable function")})};return A._getInitResult=function(){var I=i.dependencies,g=i.init;I=Array.isArray(I)?I.map(function(B){return B&&B._getInitResult?B._getInitResult():B}):[];var C=Promise.all(I).then(function(B){return g.apply(null,B)});return A._getInitResult=function(){return C},C},A}var ba=function(){var i=!1;if(typeof window<"u"&&typeof window.document<"u")try{var A=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));A.terminate(),i=!0}catch(I){typeof process<"u",console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+I.message+"]")}return ba=function(){return i},i},Ow=0,_w=0,ui=!1,VB=Object.create(null),jB=Object.create(null),go=Object.create(null);function yQ(i){if((!i||typeof i.init!="function")&&!ui)throw new Error("requires `options.init` function");var A=i.dependencies,I=i.init,g=i.getTransferables,C=i.workerId;if(!ba())return Ww(i);C==null&&(C="#default");var B="workerModule"+ ++Ow,E=i.name||B,Q=null;A=A&&A.map(function(t){return typeof t=="function"&&!t.workerModuleData&&(ui=!0,t=yQ({workerId:C,name:"<"+E+"> function dependency: "+t.name,init:`function(){return (
`+eE(t)+`
)}`}),ui=!1),t&&t.workerModuleData&&(t=t.workerModuleData),t});function o(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];if(!Q){Q=he(C,"registerModule",o.workerModuleData);var a=function(){Q=null,jB[C].delete(a)};(jB[C]||(jB[C]=new Set)).add(a)}return Q.then(function(s){var D=s.isCallable;if(D)return he(C,"callModule",{id:B,args:t});throw new Error("Worker module function was called but `init` did not return a callable function")})}return o.workerModuleData={isWorkerModule:!0,id:B,name:E,dependencies:A,init:eE(I),getTransferables:g&&eE(g)},o}function Pw(i){jB[i]&&jB[i].forEach(function(A){A()}),VB[i]&&(VB[i].terminate(),delete VB[i])}function eE(i){var A=i.toString();return!/^function/.test(A)&&/^\w+\s*\(/.test(A)&&(A="function "+A),A}function Zw(i){var A=VB[i];if(!A){var I=eE(vw);A=VB[i]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+i.replace(/\*/g,"")+` **/

;(`+I+")()"],{type:"application/javascript"}))),A.onmessage=function(g){var C=g.data,B=C.messageId,E=go[B];if(!E)throw new Error("WorkerModule response with empty or unknown messageId");delete go[B],E(C)}}return A}function he(i,A,I){return new Promise(function(g,C){var B=++_w;go[B]=function(E){E.success?g(E.result):C(new Error("Error in worker "+A+" call: "+E.error))},Zw(i).postMessage({messageId:B,action:A,data:I})})}function va(){var i=function(A){function I(b,v,N,p,Z,O,W,Y){var QA=1-W;Y.x=QA*QA*b+2*QA*W*N+W*W*Z,Y.y=QA*QA*v+2*QA*W*p+W*W*O}function g(b,v,N,p,Z,O,W,Y,QA,z){var eA=1-QA;z.x=eA*eA*eA*b+3*eA*eA*QA*N+3*eA*QA*QA*Z+QA*QA*QA*W,z.y=eA*eA*eA*v+3*eA*eA*QA*p+3*eA*QA*QA*O+QA*QA*QA*Y}function C(b,v){for(var N=/([MLQCZ])([^MLQCZ]*)/g,p,Z,O,W,Y;p=N.exec(b);){var QA=p[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(z){return parseFloat(z)});switch(p[1]){case"M":W=Z=QA[0],Y=O=QA[1];break;case"L":(QA[0]!==W||QA[1]!==Y)&&v("L",W,Y,W=QA[0],Y=QA[1]);break;case"Q":{v("Q",W,Y,W=QA[2],Y=QA[3],QA[0],QA[1]);break}case"C":{v("C",W,Y,W=QA[4],Y=QA[5],QA[0],QA[1],QA[2],QA[3]);break}case"Z":(W!==Z||Y!==O)&&v("L",W,Y,Z,O);break}}}function B(b,v,N){N===void 0&&(N=16);var p={x:0,y:0};C(b,function(Z,O,W,Y,QA,z,eA,tA,hA){switch(Z){case"L":v(O,W,Y,QA);break;case"Q":{for(var EA=O,kA=W,HA=1;HA<N;HA++)I(O,W,z,eA,Y,QA,HA/(N-1),p),v(EA,kA,p.x,p.y),EA=p.x,kA=p.y;break}case"C":{for(var yA=O,dA=W,YA=1;YA<N;YA++)g(O,W,z,eA,tA,hA,Y,QA,YA/(N-1),p),v(yA,dA,p.x,p.y),yA=p.x,dA=p.y;break}}})}var E="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",Q="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",o=new WeakMap,t={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function e(b,v){var N=b.getContext?b.getContext("webgl",t):b,p=o.get(N);if(!p){let eA=function(yA){var dA=O[yA];if(!dA&&(dA=O[yA]=N.getExtension(yA),!dA))throw new Error(yA+" not supported");return dA},tA=function(yA,dA){var YA=N.createShader(dA);return N.shaderSource(YA,yA),N.compileShader(YA),YA},hA=function(yA,dA,YA,DA){if(!W[yA]){var FA={},UA={},rA=N.createProgram();N.attachShader(rA,tA(dA,N.VERTEX_SHADER)),N.attachShader(rA,tA(YA,N.FRAGMENT_SHADER)),N.linkProgram(rA),W[yA]={program:rA,transaction:function(y){N.useProgram(rA),y({setUniform:function($,aA){for(var cA=[],GA=arguments.length-2;GA-- >0;)cA[GA]=arguments[GA+2];var sA=UA[aA]||(UA[aA]=N.getUniformLocation(rA,aA));N["uniform"+$].apply(N,[sA].concat(cA))},setAttribute:function($,aA,cA,GA,sA){var gA=FA[$];gA||(gA=FA[$]={buf:N.createBuffer(),loc:N.getAttribLocation(rA,$),data:null}),N.bindBuffer(N.ARRAY_BUFFER,gA.buf),N.vertexAttribPointer(gA.loc,aA,N.FLOAT,!1,0,0),N.enableVertexAttribArray(gA.loc),Z?N.vertexAttribDivisor(gA.loc,GA):eA("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(gA.loc,GA),sA!==gA.data&&(N.bufferData(N.ARRAY_BUFFER,sA,cA),gA.data=sA)}})}}}W[yA].transaction(DA)},EA=function(yA,dA){QA++;try{N.activeTexture(N.TEXTURE0+QA);var YA=Y[yA];YA||(YA=Y[yA]=N.createTexture(),N.bindTexture(N.TEXTURE_2D,YA),N.texParameteri(N.TEXTURE_2D,N.TEXTURE_MIN_FILTER,N.NEAREST),N.texParameteri(N.TEXTURE_2D,N.TEXTURE_MAG_FILTER,N.NEAREST)),N.bindTexture(N.TEXTURE_2D,YA),dA(YA,QA)}finally{QA--}},kA=function(yA,dA,YA){var DA=N.createFramebuffer();z.push(DA),N.bindFramebuffer(N.FRAMEBUFFER,DA),N.activeTexture(N.TEXTURE0+dA),N.bindTexture(N.TEXTURE_2D,yA),N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,yA,0);try{YA(DA)}finally{N.deleteFramebuffer(DA),N.bindFramebuffer(N.FRAMEBUFFER,z[--z.length-1]||null)}},HA=function(){O={},W={},Y={},QA=-1,z.length=0};var Z=typeof WebGL2RenderingContext<"u"&&N instanceof WebGL2RenderingContext,O={},W={},Y={},QA=-1,z=[];N.canvas.addEventListener("webglcontextlost",function(yA){HA(),yA.preventDefault()},!1),o.set(N,p={gl:N,isWebGL2:Z,getExtension:eA,withProgram:hA,withTexture:EA,withTextureFramebuffer:kA,handleContextLoss:HA})}v(p)}function a(b,v,N,p,Z,O,W,Y){W===void 0&&(W=15),Y===void 0&&(Y=null),e(b,function(QA){var z=QA.gl,eA=QA.withProgram,tA=QA.withTexture;tA("copy",function(hA,EA){z.texImage2D(z.TEXTURE_2D,0,z.RGBA,Z,O,0,z.RGBA,z.UNSIGNED_BYTE,v),eA("copy",E,Q,function(kA){var HA=kA.setUniform,yA=kA.setAttribute;yA("aUV",2,z.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),HA("1i","image",EA),z.bindFramebuffer(z.FRAMEBUFFER,Y||null),z.disable(z.BLEND),z.colorMask(W&8,W&4,W&2,W&1),z.viewport(N,p,Z,O),z.scissor(N,p,Z,O),z.drawArrays(z.TRIANGLES,0,3)})})})}function s(b,v,N){var p=b.width,Z=b.height;e(b,function(O){var W=O.gl,Y=new Uint8Array(p*Z*4);W.readPixels(0,0,p,Z,W.RGBA,W.UNSIGNED_BYTE,Y),b.width=v,b.height=N,a(W,Y,0,0,p,Z)})}var D=Object.freeze({__proto__:null,withWebGLContext:e,renderImageData:a,resizeWebGLCanvasWithoutClearing:s});function c(b,v,N,p,Z,O){O===void 0&&(O=1);var W=new Uint8Array(b*v),Y=p[2]-p[0],QA=p[3]-p[1],z=[];B(N,function(yA,dA,YA,DA){z.push({x1:yA,y1:dA,x2:YA,y2:DA,minX:Math.min(yA,YA),minY:Math.min(dA,DA),maxX:Math.max(yA,YA),maxY:Math.max(dA,DA)})}),z.sort(function(yA,dA){return yA.maxX-dA.maxX});for(var eA=0;eA<b;eA++)for(var tA=0;tA<v;tA++){var hA=kA(p[0]+Y*(eA+.5)/b,p[1]+QA*(tA+.5)/v),EA=Math.pow(1-Math.abs(hA)/Z,O)/2;hA<0&&(EA=1-EA),EA=Math.max(0,Math.min(255,Math.round(EA*255))),W[tA*b+eA]=EA}return W;function kA(yA,dA){for(var YA=1/0,DA=1/0,FA=z.length;FA--;){var UA=z[FA];if(UA.maxX+DA<=yA)break;if(yA+DA>UA.minX&&dA-DA<UA.maxY&&dA+DA>UA.minY){var rA=l(yA,dA,UA.x1,UA.y1,UA.x2,UA.y2);rA<YA&&(YA=rA,DA=Math.sqrt(YA))}}return HA(yA,dA)&&(DA=-DA),DA}function HA(yA,dA){for(var YA=0,DA=z.length;DA--;){var FA=z[DA];if(FA.maxX<=yA)break;var UA=FA.y1>dA!=FA.y2>dA&&yA<(FA.x2-FA.x1)*(dA-FA.y1)/(FA.y2-FA.y1)+FA.x1;UA&&(YA+=FA.y1<FA.y2?1:-1)}return YA!==0}}function r(b,v,N,p,Z,O,W,Y,QA,z){O===void 0&&(O=1),Y===void 0&&(Y=0),QA===void 0&&(QA=0),z===void 0&&(z=0),n(b,v,N,p,Z,O,W,null,Y,QA,z)}function n(b,v,N,p,Z,O,W,Y,QA,z,eA){O===void 0&&(O=1),QA===void 0&&(QA=0),z===void 0&&(z=0),eA===void 0&&(eA=0);for(var tA=c(b,v,N,p,Z,O),hA=new Uint8Array(tA.length*4),EA=0;EA<tA.length;EA++)hA[EA*4+eA]=tA[EA];a(W,hA,QA,z,b,v,1<<3-eA,Y)}function l(b,v,N,p,Z,O){var W=Z-N,Y=O-p,QA=W*W+Y*Y,z=QA?Math.max(0,Math.min(1,((b-N)*W+(v-p)*Y)/QA)):0,eA=b-(N+z*W),tA=v-(p+z*Y);return eA*eA+tA*tA}var G=Object.freeze({__proto__:null,generate:c,generateIntoCanvas:r,generateIntoFramebuffer:n}),S="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",k="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",M="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",K=new Float32Array([0,0,2,0,0,2]),U=null,w=!1,d={},L=new WeakMap;function X(b){if(!w&&!m(b))throw new Error("WebGL generation not supported")}function u(b,v,N,p,Z,O,W){if(O===void 0&&(O=1),W===void 0&&(W=null),!W&&(W=U,!W)){var Y=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!Y)throw new Error("OffscreenCanvas or DOM canvas not supported");W=U=Y.getContext("webgl",{depth:!1})}X(W);var QA=new Uint8Array(b*v*4);e(W,function(hA){var EA=hA.gl,kA=hA.withTexture,HA=hA.withTextureFramebuffer;kA("readable",function(yA,dA){EA.texImage2D(EA.TEXTURE_2D,0,EA.RGBA,b,v,0,EA.RGBA,EA.UNSIGNED_BYTE,null),HA(yA,dA,function(YA){J(b,v,N,p,Z,O,EA,YA,0,0,0),EA.readPixels(0,0,b,v,EA.RGBA,EA.UNSIGNED_BYTE,QA)})})});for(var z=new Uint8Array(b*v),eA=0,tA=0;eA<QA.length;eA+=4)z[tA++]=QA[eA];return z}function q(b,v,N,p,Z,O,W,Y,QA,z){O===void 0&&(O=1),Y===void 0&&(Y=0),QA===void 0&&(QA=0),z===void 0&&(z=0),J(b,v,N,p,Z,O,W,null,Y,QA,z)}function J(b,v,N,p,Z,O,W,Y,QA,z,eA){O===void 0&&(O=1),QA===void 0&&(QA=0),z===void 0&&(z=0),eA===void 0&&(eA=0),X(W);var tA=[];B(N,function(hA,EA,kA,HA){tA.push(hA,EA,kA,HA)}),tA=new Float32Array(tA),e(W,function(hA){var EA=hA.gl,kA=hA.isWebGL2,HA=hA.getExtension,yA=hA.withProgram,dA=hA.withTexture,YA=hA.withTextureFramebuffer,DA=hA.handleContextLoss;if(dA("rawDistances",function(FA,UA){(b!==FA._lastWidth||v!==FA._lastHeight)&&EA.texImage2D(EA.TEXTURE_2D,0,EA.RGBA,FA._lastWidth=b,FA._lastHeight=v,0,EA.RGBA,EA.UNSIGNED_BYTE,null),yA("main",S,k,function(rA){var F=rA.setAttribute,y=rA.setUniform,x=!kA&&HA("ANGLE_instanced_arrays"),$=!kA&&HA("EXT_blend_minmax");F("aUV",2,EA.STATIC_DRAW,0,K),F("aLineSegment",4,EA.DYNAMIC_DRAW,1,tA),y.apply(void 0,["4f","uGlyphBounds"].concat(p)),y("1f","uMaxDistance",Z),y("1f","uExponent",O),YA(FA,UA,function(aA){EA.enable(EA.BLEND),EA.colorMask(!0,!0,!0,!0),EA.viewport(0,0,b,v),EA.scissor(0,0,b,v),EA.blendFunc(EA.ONE,EA.ONE),EA.blendEquationSeparate(EA.FUNC_ADD,kA?EA.MAX:$.MAX_EXT),EA.clear(EA.COLOR_BUFFER_BIT),kA?EA.drawArraysInstanced(EA.TRIANGLES,0,3,tA.length/4):x.drawArraysInstancedANGLE(EA.TRIANGLES,0,3,tA.length/4)})}),yA("post",E,M,function(rA){rA.setAttribute("aUV",2,EA.STATIC_DRAW,0,K),rA.setUniform("1i","tex",UA),EA.bindFramebuffer(EA.FRAMEBUFFER,Y),EA.disable(EA.BLEND),EA.colorMask(eA===0,eA===1,eA===2,eA===3),EA.viewport(QA,z,b,v),EA.scissor(QA,z,b,v),EA.drawArrays(EA.TRIANGLES,0,3)})}),EA.isContextLost())throw DA(),new Error("webgl context lost")})}function m(b){var v=!b||b===U?d:b.canvas||b,N=L.get(v);if(N===void 0){w=!0;var p=null;try{var Z=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],O=u(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,b);N=O&&Z.length===O.length&&O.every(function(W,Y){return W===Z[Y]}),N||(p="bad trial run results",console.info(Z,O))}catch(W){N=!1,p=W.message}p&&console.warn("WebGL SDF generation not supported:",p),w=!1,L.set(v,N)}return N}var P=Object.freeze({__proto__:null,generate:u,generateIntoCanvas:q,generateIntoFramebuffer:J,isSupported:m});function iA(b,v,N,p,Z,O){Z===void 0&&(Z=Math.max(p[2]-p[0],p[3]-p[1])/2),O===void 0&&(O=1);try{return u.apply(P,arguments)}catch(W){return console.info("WebGL SDF generation failed, falling back to JS",W),c.apply(G,arguments)}}function V(b,v,N,p,Z,O,W,Y,QA,z){Z===void 0&&(Z=Math.max(p[2]-p[0],p[3]-p[1])/2),O===void 0&&(O=1),Y===void 0&&(Y=0),QA===void 0&&(QA=0),z===void 0&&(z=0);try{return q.apply(P,arguments)}catch(eA){return console.info("WebGL SDF generation failed, falling back to JS",eA),r.apply(G,arguments)}}return A.forEachPathCommand=C,A.generate=iA,A.generateIntoCanvas=V,A.javascript=G,A.pathToLineSegments=B,A.webgl=P,A.webglUtils=D,Object.defineProperty(A,"__esModule",{value:!0}),A}({});return i}function Vw(){var i=function(A){var I={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},g={},C={};g.L=1,C[1]="L",Object.keys(I).forEach(function(DA,FA){g[DA]=1<<FA+1,C[g[DA]]=DA}),Object.freeze(g);var B=g.LRI|g.RLI|g.FSI,E=g.L|g.R|g.AL,Q=g.B|g.S|g.WS|g.ON|g.FSI|g.LRI|g.RLI|g.PDI,o=g.BN|g.RLE|g.LRE|g.RLO|g.LRO|g.PDF,t=g.S|g.WS|g.B|B|g.PDI|o,e=null;function a(){if(!e){e=new Map;var DA=function(UA){if(I.hasOwnProperty(UA)){var rA=0;I[UA].split(",").forEach(function(F){var y=F.split("+"),x=y[0],$=y[1];x=parseInt(x,36),$=$?parseInt($,36):0,e.set(rA+=x,g[UA]);for(var aA=0;aA<$;aA++)e.set(++rA,g[UA])})}};for(var FA in I)DA(FA)}}function s(DA){return a(),e.get(DA.codePointAt(0))||g.L}function D(DA){return C[s(DA)]}var c={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function r(DA,FA){var UA=36,rA=0,F=new Map,y=FA&&new Map,x;return DA.split(",").forEach(function $(aA){if(aA.indexOf("+")!==-1)for(var cA=+aA;cA--;)$(x);else{x=aA;var GA=aA.split(">"),sA=GA[0],gA=GA[1];sA=String.fromCodePoint(rA+=parseInt(sA,UA)),gA=String.fromCodePoint(rA+=parseInt(gA,UA)),F.set(sA,gA),FA&&y.set(gA,sA)}}),{map:F,reverseMap:y}}var n,l,G;function S(){if(!n){var DA=r(c.pairs,!0),FA=DA.map,UA=DA.reverseMap;n=FA,l=UA,G=r(c.canonical,!1).map}}function k(DA){return S(),n.get(DA)||null}function M(DA){return S(),l.get(DA)||null}function K(DA){return S(),G.get(DA)||null}var U=g.L,w=g.R,d=g.EN,L=g.ES,X=g.ET,u=g.AN,q=g.CS,J=g.B,m=g.S,P=g.ON,iA=g.BN,V=g.NSM,b=g.AL,v=g.LRO,N=g.RLO,p=g.LRE,Z=g.RLE,O=g.PDF,W=g.LRI,Y=g.RLI,QA=g.FSI,z=g.PDI;function eA(DA,FA){for(var UA=125,rA=new Uint32Array(DA.length),F=0;F<DA.length;F++)rA[F]=s(DA[F]);var y=new Map;function x(TI,hg){var XI=rA[TI];rA[TI]=hg,y.set(XI,y.get(XI)-1),XI&Q&&y.set(Q,y.get(Q)-1),y.set(hg,(y.get(hg)||0)+1),hg&Q&&y.set(Q,(y.get(Q)||0)+1)}for(var $=new Uint8Array(DA.length),aA=new Map,cA=[],GA=null,sA=0;sA<DA.length;sA++)GA||cA.push(GA={start:sA,end:DA.length-1,level:FA==="rtl"?1:FA==="ltr"?0:zo(sA,!1)}),rA[sA]&J&&(GA.end=sA,GA=null);for(var gA=Z|p|N|v|B|z|O|J,JA=function(TI){return TI+(TI&1?1:2)},lA=function(TI){return TI+(TI&1?2:1)},MA=0;MA<cA.length;MA++){GA=cA[MA];var SA=[{_level:GA.level,_override:0,_isolate:0}],wA=void 0,uA=0,mA=0,PA=0;y.clear();for(var f=GA.start;f<=GA.end;f++){var IA=rA[f];if(wA=SA[SA.length-1],y.set(IA,(y.get(IA)||0)+1),IA&Q&&y.set(Q,(y.get(Q)||0)+1),IA&gA)if(IA&(Z|p)){$[f]=wA._level;var nA=(IA===Z?lA:JA)(wA._level);nA<=UA&&!uA&&!mA?SA.push({_level:nA,_override:0,_isolate:0}):uA||mA++}else if(IA&(N|v)){$[f]=wA._level;var KA=(IA===N?lA:JA)(wA._level);KA<=UA&&!uA&&!mA?SA.push({_level:KA,_override:IA&N?w:U,_isolate:0}):uA||mA++}else if(IA&B){IA&QA&&(IA=zo(f+1,!0)===1?Y:W),$[f]=wA._level,wA._override&&x(f,wA._override);var fA=(IA===Y?lA:JA)(wA._level);fA<=UA&&uA===0&&mA===0?(PA++,SA.push({_level:fA,_override:0,_isolate:1,_isolInitIndex:f})):uA++}else if(IA&z){if(uA>0)uA--;else if(PA>0){for(mA=0;!SA[SA.length-1]._isolate;)SA.pop();var ZA=SA[SA.length-1]._isolInitIndex;ZA!=null&&(aA.set(ZA,f),aA.set(f,ZA)),SA.pop(),PA--}wA=SA[SA.length-1],$[f]=wA._level,wA._override&&x(f,wA._override)}else IA&O?(uA===0&&(mA>0?mA--:!wA._isolate&&SA.length>1&&(SA.pop(),wA=SA[SA.length-1])),$[f]=wA._level):IA&J&&($[f]=GA.level);else $[f]=wA._level,wA._override&&IA!==iA&&x(f,wA._override)}for(var BI=[],EI=null,iI=GA.start;iI<=GA.end;iI++){var oI=rA[iI];if(!(oI&o)){var QI=$[iI],zA=oI&B,jI=oI===z;EI&&QI===EI._level?(EI._end=iI,EI._endsWithIsolInit=zA):BI.push(EI={_start:iI,_end:iI,_level:QI,_startsWithPDI:jI,_endsWithIsolInit:zA})}}for(var vI=[],aI=0;aI<BI.length;aI++){var KI=BI[aI];if(!KI._startsWithPDI||KI._startsWithPDI&&!aA.has(KI._start)){for(var R=[EI=KI],_=void 0;EI&&EI._endsWithIsolInit&&(_=aA.get(EI._end))!=null;)for(var BA=aI+1;BA<BI.length;BA++)if(BI[BA]._start===_){R.push(EI=BI[BA]);break}for(var T=[],oA=0;oA<R.length;oA++)for(var qA=R[oA],xA=qA._start;xA<=qA._end;xA++)T.push(xA);for(var vA=$[T[0]],WA=GA.level,jA=T[0]-1;jA>=0;jA--)if(!(rA[jA]&o)){WA=$[jA];break}var VA=T[T.length-1],XA=$[VA],GI=GA.level;if(!(rA[VA]&B)){for(var pI=VA+1;pI<=GA.end;pI++)if(!(rA[pI]&o)){GI=$[pI];break}}vI.push({_seqIndices:T,_sosType:Math.max(WA,vA)%2?w:U,_eosType:Math.max(GI,XA)%2?w:U})}}for(var Ig=0;Ig<vI.length;Ig++){var Dg=vI[Ig],RA=Dg._seqIndices,OA=Dg._sosType,FB=Dg._eosType;if(y.get(V))for(var lI=0;lI<RA.length;lI++){var Kg=RA[lI];if(rA[Kg]&V){for(var qC=OA,dg=lI-1;dg>=0;dg--)if(!(rA[RA[dg]]&o)){qC=rA[RA[dg]];break}x(Kg,qC&(B|z)?P:qC)}}if(y.get(d))for(var Vg=0;Vg<RA.length;Vg++){var fI=RA[Vg];if(rA[fI]&d)for(var og=Vg-1;og>=-1;og--){var uC=og===-1?OA:rA[RA[og]];if(uC&E){uC===b&&x(fI,u);break}}}if(y.get(b))for(var YI=0;YI<RA.length;YI++){var LC=RA[YI];rA[LC]&b&&x(LC,w)}if(y.get(L)||y.get(q))for(var tC=1;tC<RA.length-1;tC++){var YC=RA[tC];if(rA[YC]&(L|q)){for(var HC=0,TE=0,bE=tC-1;bE>=0&&(HC=rA[RA[bE]],!!(HC&o));bE--);for(var vE=tC+1;vE<RA.length&&(TE=rA[RA[vE]],!!(TE&o));vE++);HC===TE&&(rA[YC]===L?HC===d:HC&(d|u))&&x(YC,HC)}}if(y.get(d))for(var RB=0;RB<RA.length;RB++){var Is=RA[RB];if(rA[Is]&d){for(var MQ=RB-1;MQ>=0&&rA[RA[MQ]]&(X|o);MQ--)x(RA[MQ],d);for(var FQ=RB+1;FQ<RA.length&&rA[RA[FQ]]&(X|o);FQ++)x(RA[FQ],d)}}if(y.get(X)||y.get(L)||y.get(q))for(var NB=0;NB<RA.length;NB++){var To=RA[NB];if(rA[To]&(X|L|q)){x(To,P);for(var RQ=NB-1;RQ>=0&&rA[RA[RQ]]&o;RQ--)x(RA[RQ],P);for(var NQ=NB+1;NQ<RA.length&&rA[RA[NQ]]&o;NQ++)x(RA[NQ],P)}}if(y.get(d))for(var WE=0,bo=OA;WE<RA.length;WE++){var vo=RA[WE],OE=rA[vo];OE&d?bo===U&&x(vo,U):OE&E&&(bo=OE)}if(y.get(Q)){var KB=w|d|u,Wo=KB|U,KQ=[];{for(var mC=[],xC=0;xC<RA.length;xC++)if(rA[RA[xC]]&Q){var dB=DA[RA[xC]],Oo=void 0;if(k(dB)!==null)if(mC.length<63)mC.push({char:dB,seqIndex:xC});else break;else if((Oo=M(dB))!==null)for(var UB=mC.length-1;UB>=0;UB--){var _E=mC[UB].char;if(_E===Oo||_E===M(K(dB))||k(K(_E))===dB){KQ.push([mC[UB].seqIndex,xC]),mC.length=UB;break}}}KQ.sort(function(TI,hg){return TI[0]-hg[0]})}for(var PE=0;PE<KQ.length;PE++){for(var _o=KQ[PE],JB=_o[0],dQ=_o[1],Po=!1,rg=0,ZE=JB+1;ZE<dQ;ZE++){var VE=RA[ZE];if(rA[VE]&Wo){Po=!0;var Zo=rA[VE]&KB?w:U;if(Zo===TC(VE)){rg=Zo;break}}}if(Po&&!rg){rg=OA;for(var jE=JB-1;jE>=0;jE--){var UQ=RA[jE];if(rA[UQ]&Wo){var Vo=rA[UQ]&KB?w:U;Vo!==TC(UQ)?rg=Vo:rg=TC(UQ);break}}}if(rg){if(rA[RA[JB]]=rA[RA[dQ]]=rg,rg!==TC(RA[JB])){for(var pB=JB+1;pB<RA.length;pB++)if(!(rA[RA[pB]]&o)){s(DA[RA[pB]])&V&&(rA[RA[pB]]=rg);break}}if(rg!==TC(RA[dQ])){for(var fB=dQ+1;fB<RA.length;fB++)if(!(rA[RA[fB]]&o)){s(DA[RA[fB]])&V&&(rA[RA[fB]]=rg);break}}}}for(var jg=0;jg<RA.length;jg++)if(rA[RA[jg]]&Q){for(var jo=jg,XE=jg,zE=OA,qB=jg-1;qB>=0;qB--)if(rA[RA[qB]]&o)jo=qB;else{zE=rA[RA[qB]]&KB?w:U;break}for(var Xo=FB,uB=jg+1;uB<RA.length;uB++)if(rA[RA[uB]]&(Q|o))XE=uB;else{Xo=rA[RA[uB]]&KB?w:U;break}for(var JQ=jo;JQ<=XE;JQ++)rA[RA[JQ]]=zE===Xo?zE:TC(RA[JQ]);jg=XE}}}for(var gg=GA.start;gg<=GA.end;gg++){var gs=$[gg],pQ=rA[gg];if(gs&1?pQ&(U|d|u)&&$[gg]++:pQ&w?$[gg]++:pQ&(u|d)&&($[gg]+=2),pQ&o&&($[gg]=gg===0?GA.level:$[gg-1]),gg===GA.end||s(DA[gg])&(m|J))for(var fQ=gg;fQ>=0&&s(DA[fQ])&t;fQ--)$[fQ]=GA.level}}return{levels:$,paragraphs:cA};function zo(TI,hg){for(var XI=TI;XI<DA.length;XI++){var Xg=rA[XI];if(Xg&(w|b))return 1;if(Xg&(J|U)||hg&&Xg===z)return 0;if(Xg&B){var $o=Cs(XI);XI=$o===-1?DA.length:$o}}return 0}function Cs(TI){for(var hg=1,XI=TI+1;XI<DA.length;XI++){var Xg=rA[XI];if(Xg&J)break;if(Xg&z){if(--hg===0)return XI}else Xg&B&&hg++}return-1}function TC(TI){return $[TI]&1?w:U}}var tA="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",hA;function EA(){if(!hA){var DA=r(tA,!0),FA=DA.map,UA=DA.reverseMap;UA.forEach(function(rA,F){FA.set(F,rA)}),hA=FA}}function kA(DA){return EA(),hA.get(DA)||null}function HA(DA,FA,UA,rA){var F=DA.length;UA=Math.max(0,UA==null?0:+UA),rA=Math.min(F-1,rA==null?F-1:+rA);for(var y=new Map,x=UA;x<=rA;x++)if(FA[x]&1){var $=kA(DA[x]);$!==null&&y.set(x,$)}return y}function yA(DA,FA,UA,rA){var F=DA.length;UA=Math.max(0,UA==null?0:+UA),rA=Math.min(F-1,rA==null?F-1:+rA);var y=[];return FA.paragraphs.forEach(function(x){var $=Math.max(UA,x.start),aA=Math.min(rA,x.end);if($<aA){for(var cA=FA.levels.slice($,aA+1),GA=aA;GA>=$&&s(DA[GA])&t;GA--)cA[GA]=x.level;for(var sA=x.level,gA=1/0,JA=0;JA<cA.length;JA++){var lA=cA[JA];lA>sA&&(sA=lA),lA<gA&&(gA=lA|1)}for(var MA=sA;MA>=gA;MA--)for(var SA=0;SA<cA.length;SA++)if(cA[SA]>=MA){for(var wA=SA;SA+1<cA.length&&cA[SA+1]>=MA;)SA++;SA>wA&&y.push([wA+UA,SA+UA])}}}),y}function dA(DA,FA,UA,rA){var F=YA(DA,FA,UA,rA),y=[].concat(DA);return F.forEach(function(x,$){y[$]=(FA.levels[x]&1?kA(DA[x]):null)||DA[x]}),y.join("")}function YA(DA,FA,UA,rA){for(var F=yA(DA,FA,UA,rA),y=[],x=0;x<DA.length;x++)y[x]=x;return F.forEach(function($){for(var aA=$[0],cA=$[1],GA=y.slice(aA,cA+1),sA=GA.length;sA--;)y[cA-sA]=GA[sA]}),y}return A.closingToOpeningBracket=M,A.getBidiCharType=s,A.getBidiCharTypeName=D,A.getCanonicalBracket=K,A.getEmbeddingLevels=eA,A.getMirroredCharacter=kA,A.getMirroredCharactersMap=HA,A.getReorderSegments=yA,A.getReorderedIndices=YA,A.getReorderedString=dA,A.openingToClosingBracket=k,Object.defineProperty(A,"__esModule",{value:!0}),A}({});return i}const Wa=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Co(i){const A=/^[ \t]*#include +<([\w\d./]+)>/gm;function I(g,C){let B=_A[C];return B?Co(B):g}return i.replace(A,I)}const HI=[];for(let i=0;i<256;i++)HI[i]=(i<16?"0":"")+i.toString(16);function jw(){const i=Math.random()*4294967295|0,A=Math.random()*4294967295|0,I=Math.random()*4294967295|0,g=Math.random()*4294967295|0;return(HI[i&255]+HI[i>>8&255]+HI[i>>16&255]+HI[i>>24&255]+"-"+HI[A&255]+HI[A>>8&255]+"-"+HI[A>>16&15|64]+HI[A>>24&255]+"-"+HI[I&63|128]+HI[I>>8&255]+"-"+HI[I>>16&255]+HI[I>>24&255]+HI[g&255]+HI[g>>8&255]+HI[g>>16&255]+HI[g>>24&255]).toUpperCase()}const DC=Object.assign||function(){let i=arguments[0];for(let A=1,I=arguments.length;A<I;A++){let g=arguments[A];if(g)for(let C in g)g.hasOwnProperty(C)&&(i[C]=g[C])}return i},Xw=Date.now(),ce=new WeakMap,we=new Map;let zw=1e10;function Bo(i,A){const I=gG(A);let g=ce.get(i);if(g||ce.set(i,g=Object.create(null)),g[I])return new g[I];const C=`_onBeforeCompile${I}`,B=function(t){i.onBeforeCompile.call(this,t);const e=this.customProgramCacheKey()+"|"+t.vertexShader+"|"+t.fragmentShader;let a=we[e];if(!a){const s=$w(t,A,I);a=we[e]=s}t.vertexShader=a.vertexShader,t.fragmentShader=a.fragmentShader,DC(t.uniforms,this.uniforms),A.timeUniform&&(t.uniforms[A.timeUniform]={get value(){return Date.now()-Xw}}),this[C]&&this[C](t)},E=function(){return Q(A.chained?i:i.clone())},Q=function(t){const e=Object.create(t,o);return Object.defineProperty(e,"baseMaterial",{value:i}),Object.defineProperty(e,"id",{value:zw++}),e.uuid=jw(),e.uniforms=DC({},t.uniforms,A.uniforms),e.defines=DC({},t.defines,A.defines),e.defines[`TROIKA_DERIVED_MATERIAL_${I}`]="",e.extensions=DC({},t.extensions,A.extensions),e._listeners=void 0,e},o={constructor:{value:E},isDerivedMaterial:{value:!0},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return i.customProgramCacheKey()+"|"+I}},onBeforeCompile:{get(){return B},set(t){this[C]=t}},copy:{writable:!0,configurable:!0,value:function(t){return i.copy.call(this,t),!i.isShaderMaterial&&!i.isDerivedMaterial&&(DC(this.extensions,t.extensions),DC(this.defines,t.defines),DC(this.uniforms,Ma.clone(t.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const t=new i.constructor;return Q(t).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let t=this._depthMaterial;return t||(t=this._depthMaterial=Bo(i.isDerivedMaterial?i.getDepthMaterial():new fa({depthPacking:na}),A),t.defines.IS_DEPTH_MATERIAL="",t.uniforms=this.uniforms),t}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let t=this._distanceMaterial;return t||(t=this._distanceMaterial=Bo(i.isDerivedMaterial?i.getDistanceMaterial():new qa,A),t.defines.IS_DISTANCE_MATERIAL="",t.uniforms=this.uniforms),t}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:t,_distanceMaterial:e}=this;t&&t.dispose(),e&&e.dispose(),i.dispose.call(this)}}};return g[I]=E,new E}function $w({vertexShader:i,fragmentShader:A},I,g){let{vertexDefs:C,vertexMainIntro:B,vertexMainOutro:E,vertexTransform:Q,fragmentDefs:o,fragmentMainIntro:t,fragmentMainOutro:e,fragmentColorTransform:a,customRewriter:s,timeUniform:D}=I;if(C=C||"",B=B||"",E=E||"",o=o||"",t=t||"",e=e||"",(Q||s)&&(i=Co(i)),(a||s)&&(A=A.replace(/^[ \t]*#include <((?:tonemapping|encodings|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),A=Co(A)),s){let c=s({vertexShader:i,fragmentShader:A});i=c.vertexShader,A=c.fragmentShader}if(a){let c=[];A=A.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,r=>(c.push(r),"")),e=`${a}
${c.join(`
`)}
${e}`}if(D){const c=`
uniform float ${D};
`;C=c+C,o=c+o}return Q&&(i=`vec3 troika_position_${g};
vec3 troika_normal_${g};
vec2 troika_uv_${g};
${i}
`,C=`${C}
void troikaVertexTransform${g}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${Q}
}
`,B=`
troika_position_${g} = vec3(position);
troika_normal_${g} = vec3(normal);
troika_uv_${g} = vec2(uv);
troikaVertexTransform${g}(troika_position_${g}, troika_normal_${g}, troika_uv_${g});
${B}
`,i=i.replace(/\b(position|normal|uv)\b/g,(c,r,n,l)=>/\battribute\s+vec[23]\s+$/.test(l.substr(0,n))?r:`troika_${r}_${g}`)),i=Ge(i,g,C,B,E),A=Ge(A,g,o,t,e),{vertexShader:i,fragmentShader:A}}function Ge(i,A,I,g,C){return(g||C||I)&&(i=i.replace(Wa,`
${I}
void troikaOrigMain${A}() {`),i+=`
void main() {
  ${g}
  troikaOrigMain${A}();
  ${C}
}`),i}function AG(i,A){return i==="uniforms"?void 0:typeof A=="function"?A.toString():A}let IG=0;const le=new Map;function gG(i){const A=JSON.stringify(i,AG);let I=le.get(A);return I==null&&le.set(A,I=++IG),I}function CG(i,A,I){const{defaultFontURL:g}=I,C=Object.create(null),B=1/0,E=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,Q="[^\\S\\u00A0]",o=new RegExp(`${Q}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function t(G,S){function k(){const M=K=>{console.error(`Failure loading font ${G}${G===g?"":"; trying fallback"}`,K),G!==g&&(G=g,k())};try{const K=new XMLHttpRequest;K.open("get",G,!0),K.responseType="arraybuffer",K.onload=function(){if(K.status>=400)M(new Error(K.statusText));else if(K.status>0)try{const U=i(K.response);S(U)}catch(U){M(U)}},K.onerror=M,K.send()}catch(K){M(K)}}k()}function e(G,S){G||(G=g);let k=C[G];k?k.pending?k.pending.push(S):S(k):(C[G]={pending:[S]},t(G,M=>{let K=C[G].pending;C[G]=M,K.forEach(U=>U(M))}))}function a({text:G="",font:S=g,sdfGlyphSize:k=64,fontSize:M=1,letterSpacing:K=0,lineHeight:U="normal",maxWidth:w=B,direction:d,textAlign:L="left",textIndent:X=0,whiteSpace:u="normal",overflowWrap:q="normal",anchorX:J=0,anchorY:m=0,includeCaretPositions:P=!1,chunkedBoundsSize:iA=8192,colorRanges:V=null},b,v=!1){const N=r(),p={fontLoad:0,typesetting:0};G.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),G=G.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),M=+M,K=+K,w=+w,U=U||"normal",X=+X,e(S,Z=>{const O=isFinite(w);let W=null,Y=null,QA=null,z=null,eA=null,tA=null,hA=null,EA=0,kA=0,HA=u!=="nowrap";const{ascender:yA,descender:dA,unitsPerEm:YA,lineGap:DA,capHeight:FA,xHeight:UA}=Z;p.fontLoad=r()-N;const rA=r(),F=M/YA;U==="normal"&&(U=(yA-dA+DA)/YA),U=U*M;const y=(U-(yA-dA)*F)/2,x=-(yA*F+y),$=Math.min(U,(yA-dA)*F),aA=(yA+dA)/2*F-$/2;let cA=X,GA=new n;const sA=[GA];Z.forEachGlyph(G,M,K,(lA,MA,SA)=>{const wA=G.charAt(SA),uA=lA.advanceWidth*F,mA=GA.count;let PA;if("isEmpty"in lA||(lA.isWhitespace=!!wA&&new RegExp(Q).test(wA),lA.canBreakAfter=!!wA&&o.test(wA),lA.isEmpty=lA.xMin===lA.xMax||lA.yMin===lA.yMax||E.test(wA)),!lA.isWhitespace&&!lA.isEmpty&&kA++,HA&&O&&!lA.isWhitespace&&MA+uA+cA>w&&mA){if(GA.glyphAt(mA-1).glyphObj.canBreakAfter)PA=new n,cA=-MA;else for(let IA=mA;IA--;)if(IA===0&&q==="break-word"){PA=new n,cA=-MA;break}else if(GA.glyphAt(IA).glyphObj.canBreakAfter){PA=GA.splitAt(IA+1);const nA=PA.glyphAt(0).x;cA-=nA;for(let KA=PA.count;KA--;)PA.glyphAt(KA).x-=nA;break}PA&&(GA.isSoftWrapped=!0,GA=PA,sA.push(GA),EA=w)}let f=GA.glyphAt(GA.count);f.glyphObj=lA,f.x=MA+cA,f.width=uA,f.charIndex=SA,wA===`
`&&(GA=new n,sA.push(GA),cA=-(MA+uA+K*M)+X)}),sA.forEach(lA=>{for(let MA=lA.count;MA--;){let{glyphObj:SA,x:wA,width:uA}=lA.glyphAt(MA);if(!SA.isWhitespace){lA.width=wA+uA,lA.width>EA&&(EA=lA.width);return}}});let gA=0,JA=0;if(J&&(typeof J=="number"?gA=-J:typeof J=="string"&&(gA=-EA*(J==="left"?0:J==="center"?.5:J==="right"?1:D(J)))),m){if(typeof m=="number")JA=-m;else if(typeof m=="string"){let lA=sA.length*U;JA=m==="top"?0:m==="top-baseline"?-x:m==="top-cap"?-x-FA*F:m==="top-ex"?-x-UA*F:m==="middle"?lA/2:m==="bottom"?lA:m==="bottom-baseline"?lA-y+dA*F:D(m)*lA}}if(!v){const lA=A.getEmbeddingLevels(G,d);W=new Uint16Array(kA),Y=new Float32Array(kA*2),QA={},tA=[B,B,-B,-B],hA=[];let MA=x;P&&(eA=new Float32Array(G.length*3)),V&&(z=new Uint8Array(kA*3));let SA=0,wA=-1,uA=-1,mA,PA;if(sA.forEach((f,IA)=>{let{count:nA,width:KA}=f;if(nA>0){let fA=0;for(let QI=nA;QI--&&f.glyphAt(QI).glyphObj.isWhitespace;)fA++;let ZA=0,BI=0;if(L==="center")ZA=(EA-KA)/2;else if(L==="right")ZA=EA-KA;else if(L==="justify"&&f.isSoftWrapped){let QI=0;for(let zA=nA-fA;zA--;)f.glyphAt(zA).glyphObj.isWhitespace&&QI++;BI=(EA-KA)/QI}if(BI||ZA){let QI=0;for(let zA=0;zA<nA;zA++){let jI=f.glyphAt(zA);const vI=jI.glyphObj;jI.x+=ZA+QI,BI!==0&&vI.isWhitespace&&zA<nA-fA&&(QI+=BI,jI.width+=BI)}}const EI=A.getReorderSegments(G,lA,f.glyphAt(0).charIndex,f.glyphAt(f.count-1).charIndex);for(let QI=0;QI<EI.length;QI++){const[zA,jI]=EI[QI];let vI=1/0,aI=-1/0;for(let KI=0;KI<nA;KI++)if(f.glyphAt(KI).charIndex>=zA){let R=KI,_=KI;for(;_<nA;_++){let BA=f.glyphAt(_);if(BA.charIndex>jI)break;_<nA-fA&&(vI=Math.min(vI,BA.x),aI=Math.max(aI,BA.x+BA.width))}for(let BA=R;BA<_;BA++){const T=f.glyphAt(BA);T.x=aI-(T.x+T.width-vI)}break}}let iI;const oI=QI=>iI=QI;for(let QI=0;QI<nA;QI++){let zA=f.glyphAt(QI);iI=zA.glyphObj;const jI=iI.index,vI=lA.levels[zA.charIndex]&1;if(vI){const aI=A.getMirroredCharacter(G[zA.charIndex]);aI&&Z.forEachGlyph(aI,0,0,oI)}if(P){const{charIndex:aI}=zA,KI=zA.x+gA,R=zA.x+zA.width+gA;eA[aI*3]=vI?R:KI,eA[aI*3+1]=vI?KI:R,eA[aI*3+2]=MA+aA+JA;const _=aI-wA;_>1&&c(eA,wA,_),wA=aI}if(V){const{charIndex:aI}=zA;for(;aI>uA;)uA++,V.hasOwnProperty(uA)&&(PA=V[uA])}if(!iI.isWhitespace&&!iI.isEmpty){const aI=SA++;QA[jI]||(QA[jI]={path:iI.path,pathBounds:[iI.xMin,iI.yMin,iI.xMax,iI.yMax]});const KI=zA.x+gA,R=MA+JA;Y[aI*2]=KI,Y[aI*2+1]=R;const _=KI+iI.xMin*F,BA=R+iI.yMin*F,T=KI+iI.xMax*F,oA=R+iI.yMax*F;_<tA[0]&&(tA[0]=_),BA<tA[1]&&(tA[1]=BA),T>tA[2]&&(tA[2]=T),oA>tA[3]&&(tA[3]=oA),aI%iA===0&&(mA={start:aI,end:aI,rect:[B,B,-B,-B]},hA.push(mA)),mA.end++;const qA=mA.rect;if(_<qA[0]&&(qA[0]=_),BA<qA[1]&&(qA[1]=BA),T>qA[2]&&(qA[2]=T),oA>qA[3]&&(qA[3]=oA),W[aI]=jI,V){const xA=aI*3;z[xA]=PA>>16&255,z[xA+1]=PA>>8&255,z[xA+2]=PA&255}}}}MA-=U}),eA){const f=G.length-wA;f>1&&c(eA,wA,f)}}p.typesetting=r()-rA,b({glyphIds:W,glyphPositions:Y,glyphData:QA,caretPositions:eA,caretHeight:$,glyphColors:z,chunkedBounds:hA,fontSize:M,unitsPerEm:YA,ascender:yA*F,descender:dA*F,capHeight:FA*F,xHeight:UA*F,lineHeight:U,topBaseline:x,blockBounds:[gA,JA-sA.length*U,gA+EA,JA],visibleBounds:tA,timings:p})})}function s(G,S){a(G,k=>{const[M,K,U,w]=k.blockBounds;S({width:U-M,height:w-K})},{metricsOnly:!0})}function D(G){let S=G.match(/^([\d.]+)%$/),k=S?parseFloat(S[1]):NaN;return isNaN(k)?0:k/100}function c(G,S,k){const M=G[S*3],K=G[S*3+1],U=G[S*3+2],w=(K-M)/k;for(let d=0;d<k;d++){const L=(S+d)*3;G[L]=M+w*d,G[L+1]=M+w*(d+1),G[L+2]=U}}function r(){return(self.performance||Date).now()}function n(){this.data=[]}const l=["glyphObj","x","width","charIndex"];return n.prototype={width:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/l.length)},glyphAt(G){let S=n.flyweight;return S.data=this.data,S.index=G,S},splitAt(G){let S=new n;return S.data=this.data.splice(G*l.length),S}},n.flyweight=l.reduce((G,S,k,M)=>(Object.defineProperty(G,S,{get(){return this.data[this.index*l.length+k]},set(K){this.data[this.index*l.length+k]=K}}),G),{data:null,index:0}),{typeset:a,measure:s,loadFont:e}}const FC=()=>(self.performance||Date).now(),xE=va();let Se;function BG(i,A,I,g,C,B,E,Q,o,t,e=!0){return e?EG(i,A,I,g,C,B,E,Q,o,t).then(null,a=>(Se||(console.warn("WebGL SDF generation failed, falling back to JS",a),Se=!0),ke(i,A,I,g,C,B,E,Q,o,t))):ke(i,A,I,g,C,B,E,Q,o,t)}const aE=[],QG=5;let Qo=0;function Oa(){const i=FC();for(;aE.length&&FC()-i<QG;)aE.shift()();Qo=aE.length?setTimeout(Oa,0):0}const EG=(...i)=>new Promise((A,I)=>{aE.push(()=>{const g=FC();try{xE.webgl.generateIntoCanvas(...i),A({timing:FC()-g})}catch(C){I(C)}}),Qo||(Qo=setTimeout(Oa,0))}),iG=4,oG=2e3,ye={};let tG=0;function ke(i,A,I,g,C,B,E,Q,o,t){const e="TroikaTextSDFGenerator_JS_"+tG++%iG;let a=ye[e];return a||(a=ye[e]={workerModule:yQ({name:e,workerId:e,dependencies:[va,FC],init(s,D){const c=s().javascript.generate;return function(...r){const n=D();return{textureData:c(...r),timing:D()-n}}},getTransferables(s){return[s.textureData.buffer]}}),requests:0,idleTimer:null}),a.requests++,clearTimeout(a.idleTimer),a.workerModule(i,A,I,g,C,B).then(({textureData:s,timing:D})=>{const c=FC(),r=new Uint8Array(s.length*4);for(let n=0;n<s.length;n++)r[n*4+t]=s[n];return xE.webglUtils.renderImageData(E,r,Q,o,i,A,1<<3-t),D+=FC()-c,--a.requests===0&&(a.idleTimer=setTimeout(()=>{Pw(e)},oG)),{timing:D}})}function eG(i){i._warm||(xE.webgl.isSupported(i),i._warm=!0)}const aG=xE.webglUtils.resizeWebGLCanvasWithoutClearing;/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function sG(){return typeof window>"u"&&(self.window=self),function(i){var A={parse:function(C){var B=A._bin,E=new Uint8Array(C);if(B.readASCII(E,0,4)=="ttcf"){var Q=4;B.readUshort(E,Q),Q+=2,B.readUshort(E,Q),Q+=2;var o=B.readUint(E,Q);Q+=4;for(var t=[],e=0;e<o;e++){var a=B.readUint(E,Q);Q+=4,t.push(A._readFont(E,a))}return t}return[A._readFont(E,0)]},_readFont:function(C,B){var E=A._bin,Q=B;E.readFixed(C,B),B+=4;var o=E.readUshort(C,B);B+=2,E.readUshort(C,B),B+=2,E.readUshort(C,B),B+=2,E.readUshort(C,B),B+=2;for(var t=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GPOS","GSUB","SVG "],e={_data:C,_offset:Q},a={},s=0;s<o;s++){var D=E.readASCII(C,B,4);B+=4,E.readUint(C,B),B+=4;var c=E.readUint(C,B);B+=4;var r=E.readUint(C,B);B+=4,a[D]={offset:c,length:r}}for(s=0;s<t.length;s++){var n=t[s];a[n]&&(e[n.trim()]=A[n.trim()].parse(C,a[n].offset,a[n].length,e))}return e},_tabOffset:function(C,B,E){for(var Q=A._bin,o=Q.readUshort(C,E+4),t=E+12,e=0;e<o;e++){var a=Q.readASCII(C,t,4);t+=4,Q.readUint(C,t),t+=4;var s=Q.readUint(C,t);if(t+=4,Q.readUint(C,t),t+=4,a==B)return s}return 0}};A._bin={readFixed:function(C,B){return(C[B]<<8|C[B+1])+(C[B+2]<<8|C[B+3])/65540},readF2dot14:function(C,B){return A._bin.readShort(C,B)/16384},readInt:function(C,B){return A._bin._view(C).getInt32(B)},readInt8:function(C,B){return A._bin._view(C).getInt8(B)},readShort:function(C,B){return A._bin._view(C).getInt16(B)},readUshort:function(C,B){return A._bin._view(C).getUint16(B)},readUshorts:function(C,B,E){for(var Q=[],o=0;o<E;o++)Q.push(A._bin.readUshort(C,B+2*o));return Q},readUint:function(C,B){return A._bin._view(C).getUint32(B)},readUint64:function(C,B){return 4294967296*A._bin.readUint(C,B)+A._bin.readUint(C,B+4)},readASCII:function(C,B,E){for(var Q="",o=0;o<E;o++)Q+=String.fromCharCode(C[B+o]);return Q},readUnicode:function(C,B,E){for(var Q="",o=0;o<E;o++){var t=C[B++]<<8|C[B++];Q+=String.fromCharCode(t)}return Q},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(C,B,E){var Q=A._bin._tdec;return Q&&B==0&&E==C.length?Q.decode(C):A._bin.readASCII(C,B,E)},readBytes:function(C,B,E){for(var Q=[],o=0;o<E;o++)Q.push(C[B+o]);return Q},readASCIIArray:function(C,B,E){for(var Q=[],o=0;o<E;o++)Q.push(String.fromCharCode(C[B+o]));return Q},_view:function(C){return C._dataView||(C._dataView=C.buffer?new DataView(C.buffer,C.byteOffset,C.byteLength):new DataView(new Uint8Array(C).buffer))}},A._lctf={},A._lctf.parse=function(C,B,E,Q,o){var t=A._bin,e={},a=B;t.readFixed(C,B),B+=4;var s=t.readUshort(C,B);B+=2;var D=t.readUshort(C,B);B+=2;var c=t.readUshort(C,B);return B+=2,e.scriptList=A._lctf.readScriptList(C,a+s),e.featureList=A._lctf.readFeatureList(C,a+D),e.lookupList=A._lctf.readLookupList(C,a+c,o),e},A._lctf.readLookupList=function(C,B,E){var Q=A._bin,o=B,t=[],e=Q.readUshort(C,B);B+=2;for(var a=0;a<e;a++){var s=Q.readUshort(C,B);B+=2;var D=A._lctf.readLookupTable(C,o+s,E);t.push(D)}return t},A._lctf.readLookupTable=function(C,B,E){var Q=A._bin,o=B,t={tabs:[]};t.ltype=Q.readUshort(C,B),B+=2,t.flag=Q.readUshort(C,B),B+=2;var e=Q.readUshort(C,B);B+=2;for(var a=t.ltype,s=0;s<e;s++){var D=Q.readUshort(C,B);B+=2;var c=E(C,a,o+D,t);t.tabs.push(c)}return t},A._lctf.numOfOnes=function(C){for(var B=0,E=0;E<32;E++)(C>>>E&1)!=0&&B++;return B},A._lctf.readClassDef=function(C,B){var E=A._bin,Q=[],o=E.readUshort(C,B);if(B+=2,o==1){var t=E.readUshort(C,B);B+=2;var e=E.readUshort(C,B);B+=2;for(var a=0;a<e;a++)Q.push(t+a),Q.push(t+a),Q.push(E.readUshort(C,B)),B+=2}if(o==2){var s=E.readUshort(C,B);for(B+=2,a=0;a<s;a++)Q.push(E.readUshort(C,B)),B+=2,Q.push(E.readUshort(C,B)),B+=2,Q.push(E.readUshort(C,B)),B+=2}return Q},A._lctf.getInterval=function(C,B){for(var E=0;E<C.length;E+=3){var Q=C[E],o=C[E+1];if(C[E+2],Q<=B&&B<=o)return E}return-1},A._lctf.readCoverage=function(C,B){var E=A._bin,Q={};Q.fmt=E.readUshort(C,B),B+=2;var o=E.readUshort(C,B);return B+=2,Q.fmt==1&&(Q.tab=E.readUshorts(C,B,o)),Q.fmt==2&&(Q.tab=E.readUshorts(C,B,3*o)),Q},A._lctf.coverageIndex=function(C,B){var E=C.tab;if(C.fmt==1)return E.indexOf(B);if(C.fmt==2){var Q=A._lctf.getInterval(E,B);if(Q!=-1)return E[Q+2]+(B-E[Q])}return-1},A._lctf.readFeatureList=function(C,B){var E=A._bin,Q=B,o=[],t=E.readUshort(C,B);B+=2;for(var e=0;e<t;e++){var a=E.readASCII(C,B,4);B+=4;var s=E.readUshort(C,B);B+=2;var D=A._lctf.readFeatureTable(C,Q+s);D.tag=a.trim(),o.push(D)}return o},A._lctf.readFeatureTable=function(C,B){var E=A._bin,Q=B,o={},t=E.readUshort(C,B);B+=2,t>0&&(o.featureParams=Q+t);var e=E.readUshort(C,B);B+=2,o.tab=[];for(var a=0;a<e;a++)o.tab.push(E.readUshort(C,B+2*a));return o},A._lctf.readScriptList=function(C,B){var E=A._bin,Q=B,o={},t=E.readUshort(C,B);B+=2;for(var e=0;e<t;e++){var a=E.readASCII(C,B,4);B+=4;var s=E.readUshort(C,B);B+=2,o[a.trim()]=A._lctf.readScriptTable(C,Q+s)}return o},A._lctf.readScriptTable=function(C,B){var E=A._bin,Q=B,o={},t=E.readUshort(C,B);B+=2,o.default=A._lctf.readLangSysTable(C,Q+t);var e=E.readUshort(C,B);B+=2;for(var a=0;a<e;a++){var s=E.readASCII(C,B,4);B+=4;var D=E.readUshort(C,B);B+=2,o[s.trim()]=A._lctf.readLangSysTable(C,Q+D)}return o},A._lctf.readLangSysTable=function(C,B){var E=A._bin,Q={};E.readUshort(C,B),B+=2,Q.reqFeature=E.readUshort(C,B),B+=2;var o=E.readUshort(C,B);return B+=2,Q.features=E.readUshorts(C,B,o),Q},A.CFF={},A.CFF.parse=function(C,B,E){var Q=A._bin;(C=new Uint8Array(C.buffer,B,E))[B=0],C[++B],C[++B],C[++B],B++;var o=[];B=A.CFF.readIndex(C,B,o);for(var t=[],e=0;e<o.length-1;e++)t.push(Q.readASCII(C,B+o[e],o[e+1]-o[e]));B+=o[o.length-1];var a=[];B=A.CFF.readIndex(C,B,a);var s=[];for(e=0;e<a.length-1;e++)s.push(A.CFF.readDict(C,B+a[e],B+a[e+1]));B+=a[a.length-1];var D=s[0],c=[];B=A.CFF.readIndex(C,B,c);var r=[];for(e=0;e<c.length-1;e++)r.push(Q.readASCII(C,B+c[e],c[e+1]-c[e]));if(B+=c[c.length-1],A.CFF.readSubrs(C,B,D),D.CharStrings){B=D.CharStrings,c=[],B=A.CFF.readIndex(C,B,c);var n=[];for(e=0;e<c.length-1;e++)n.push(Q.readBytes(C,B+c[e],c[e+1]-c[e]));D.CharStrings=n}if(D.ROS){B=D.FDArray;var l=[];for(B=A.CFF.readIndex(C,B,l),D.FDArray=[],e=0;e<l.length-1;e++){var G=A.CFF.readDict(C,B+l[e],B+l[e+1]);A.CFF._readFDict(C,G,r),D.FDArray.push(G)}B+=l[l.length-1],B=D.FDSelect,D.FDSelect=[];var S=C[B];if(B++,S!=3)throw S;var k=Q.readUshort(C,B);for(B+=2,e=0;e<k+1;e++)D.FDSelect.push(Q.readUshort(C,B),C[B+2]),B+=3}return D.Encoding&&(D.Encoding=A.CFF.readEncoding(C,D.Encoding,D.CharStrings.length)),D.charset&&(D.charset=A.CFF.readCharset(C,D.charset,D.CharStrings.length)),A.CFF._readFDict(C,D,r),D},A.CFF._readFDict=function(C,B,E){var Q;for(var o in B.Private&&(Q=B.Private[1],B.Private=A.CFF.readDict(C,Q,Q+B.Private[0]),B.Private.Subrs&&A.CFF.readSubrs(C,Q+B.Private.Subrs,B.Private)),B)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(o)!=-1&&(B[o]=E[B[o]-426+35])},A.CFF.readSubrs=function(C,B,E){var Q=A._bin,o=[];B=A.CFF.readIndex(C,B,o);var t,e=o.length;t=e<1240?107:e<33900?1131:32768,E.Bias=t,E.Subrs=[];for(var a=0;a<o.length-1;a++)E.Subrs.push(Q.readBytes(C,B+o[a],o[a+1]-o[a]))},A.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],A.CFF.glyphByUnicode=function(C,B){for(var E=0;E<C.charset.length;E++)if(C.charset[E]==B)return E;return-1},A.CFF.glyphBySE=function(C,B){return B<0||B>255?-1:A.CFF.glyphByUnicode(C,A.CFF.tableSE[B])},A.CFF.readEncoding=function(C,B,E){A._bin;var Q=[".notdef"],o=C[B];if(B++,o!=0)throw"error: unknown encoding format: "+o;var t=C[B];B++;for(var e=0;e<t;e++)Q.push(C[B+e]);return Q},A.CFF.readCharset=function(C,B,E){var Q=A._bin,o=[".notdef"],t=C[B];if(B++,t==0)for(var e=0;e<E;e++){var a=Q.readUshort(C,B);B+=2,o.push(a)}else{if(t!=1&&t!=2)throw"error: format: "+t;for(;o.length<E;){a=Q.readUshort(C,B),B+=2;var s=0;for(t==1?(s=C[B],B++):(s=Q.readUshort(C,B),B+=2),e=0;e<=s;e++)o.push(a),a++}}return o},A.CFF.readIndex=function(C,B,E){var Q=A._bin,o=Q.readUshort(C,B)+1,t=C[B+=2];if(B++,t==1)for(var e=0;e<o;e++)E.push(C[B+e]);else if(t==2)for(e=0;e<o;e++)E.push(Q.readUshort(C,B+2*e));else if(t==3)for(e=0;e<o;e++)E.push(16777215&Q.readUint(C,B+3*e-1));else if(o!=1)throw"unsupported offset size: "+t+", count: "+o;return(B+=o*t)-1},A.CFF.getCharString=function(C,B,E){var Q=A._bin,o=C[B],t=C[B+1];C[B+2],C[B+3],C[B+4];var e=1,a=null,s=null;o<=20&&(a=o,e=1),o==12&&(a=100*o+t,e=2),21<=o&&o<=27&&(a=o,e=1),o==28&&(s=Q.readShort(C,B+1),e=3),29<=o&&o<=31&&(a=o,e=1),32<=o&&o<=246&&(s=o-139,e=1),247<=o&&o<=250&&(s=256*(o-247)+t+108,e=2),251<=o&&o<=254&&(s=256*-(o-251)-t-108,e=2),o==255&&(s=Q.readInt(C,B+1)/65535,e=5),E.val=s??"o"+a,E.size=e},A.CFF.readCharString=function(C,B,E){for(var Q=B+E,o=A._bin,t=[];B<Q;){var e=C[B],a=C[B+1];C[B+2],C[B+3],C[B+4];var s=1,D=null,c=null;e<=20&&(D=e,s=1),e==12&&(D=100*e+a,s=2),e!=19&&e!=20||(D=e,s=2),21<=e&&e<=27&&(D=e,s=1),e==28&&(c=o.readShort(C,B+1),s=3),29<=e&&e<=31&&(D=e,s=1),32<=e&&e<=246&&(c=e-139,s=1),247<=e&&e<=250&&(c=256*(e-247)+a+108,s=2),251<=e&&e<=254&&(c=256*-(e-251)-a-108,s=2),e==255&&(c=o.readInt(C,B+1)/65535,s=5),t.push(c??"o"+D),B+=s}return t},A.CFF.readDict=function(C,B,E){for(var Q=A._bin,o={},t=[];B<E;){var e=C[B],a=C[B+1];C[B+2],C[B+3],C[B+4];var s=1,D=null,c=null;if(e==28&&(c=Q.readShort(C,B+1),s=3),e==29&&(c=Q.readInt(C,B+1),s=5),32<=e&&e<=246&&(c=e-139,s=1),247<=e&&e<=250&&(c=256*(e-247)+a+108,s=2),251<=e&&e<=254&&(c=256*-(e-251)-a-108,s=2),e==255)throw c=Q.readInt(C,B+1)/65535,s=5,"unknown number";if(e==30){var r=[];for(s=1;;){var n=C[B+s];s++;var l=n>>4,G=15&n;if(l!=15&&r.push(l),G!=15&&r.push(G),G==15)break}for(var S="",k=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],M=0;M<r.length;M++)S+=k[r[M]];c=parseFloat(S)}e<=21&&(D=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][e],s=1,e==12&&(D=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][a],s=2)),D!=null?(o[D]=t.length==1?t[0]:t,t=[]):t.push(c),B+=s}return o},A.cmap={},A.cmap.parse=function(C,B,E){C=new Uint8Array(C.buffer,B,E),B=0;var Q=A._bin,o={};Q.readUshort(C,B),B+=2;var t=Q.readUshort(C,B);B+=2;var e=[];o.tables=[];for(var a=0;a<t;a++){var s=Q.readUshort(C,B);B+=2;var D=Q.readUshort(C,B);B+=2;var c=Q.readUint(C,B);B+=4;var r="p"+s+"e"+D,n=e.indexOf(c);if(n==-1){var l;n=o.tables.length,e.push(c);var G=Q.readUshort(C,c);G==0?l=A.cmap.parse0(C,c):G==4?l=A.cmap.parse4(C,c):G==6?l=A.cmap.parse6(C,c):G==12?l=A.cmap.parse12(C,c):console.debug("unknown format: "+G,s,D,c),o.tables.push(l)}if(o[r]!=null)throw"multiple tables for one platform+encoding";o[r]=n}return o},A.cmap.parse0=function(C,B){var E=A._bin,Q={};Q.format=E.readUshort(C,B),B+=2;var o=E.readUshort(C,B);B+=2,E.readUshort(C,B),B+=2,Q.map=[];for(var t=0;t<o-6;t++)Q.map.push(C[B+t]);return Q},A.cmap.parse4=function(C,B){var E=A._bin,Q=B,o={};o.format=E.readUshort(C,B),B+=2;var t=E.readUshort(C,B);B+=2,E.readUshort(C,B),B+=2;var e=E.readUshort(C,B);B+=2;var a=e/2;o.searchRange=E.readUshort(C,B),B+=2,o.entrySelector=E.readUshort(C,B),B+=2,o.rangeShift=E.readUshort(C,B),B+=2,o.endCount=E.readUshorts(C,B,a),B+=2*a,B+=2,o.startCount=E.readUshorts(C,B,a),B+=2*a,o.idDelta=[];for(var s=0;s<a;s++)o.idDelta.push(E.readShort(C,B)),B+=2;for(o.idRangeOffset=E.readUshorts(C,B,a),B+=2*a,o.glyphIdArray=[];B<Q+t;)o.glyphIdArray.push(E.readUshort(C,B)),B+=2;return o},A.cmap.parse6=function(C,B){var E=A._bin,Q={};Q.format=E.readUshort(C,B),B+=2,E.readUshort(C,B),B+=2,E.readUshort(C,B),B+=2,Q.firstCode=E.readUshort(C,B),B+=2;var o=E.readUshort(C,B);B+=2,Q.glyphIdArray=[];for(var t=0;t<o;t++)Q.glyphIdArray.push(E.readUshort(C,B)),B+=2;return Q},A.cmap.parse12=function(C,B){var E=A._bin,Q={};Q.format=E.readUshort(C,B),B+=2,B+=2,E.readUint(C,B),B+=4,E.readUint(C,B),B+=4;var o=E.readUint(C,B);B+=4,Q.groups=[];for(var t=0;t<o;t++){var e=B+12*t,a=E.readUint(C,e+0),s=E.readUint(C,e+4),D=E.readUint(C,e+8);Q.groups.push([a,s,D])}return Q},A.glyf={},A.glyf.parse=function(C,B,E,Q){for(var o=[],t=0;t<Q.maxp.numGlyphs;t++)o.push(null);return o},A.glyf._parseGlyf=function(C,B){var E=A._bin,Q=C._data,o=A._tabOffset(Q,"glyf",C._offset)+C.loca[B];if(C.loca[B]==C.loca[B+1])return null;var t={};if(t.noc=E.readShort(Q,o),o+=2,t.xMin=E.readShort(Q,o),o+=2,t.yMin=E.readShort(Q,o),o+=2,t.xMax=E.readShort(Q,o),o+=2,t.yMax=E.readShort(Q,o),o+=2,t.xMin>=t.xMax||t.yMin>=t.yMax)return null;if(t.noc>0){t.endPts=[];for(var e=0;e<t.noc;e++)t.endPts.push(E.readUshort(Q,o)),o+=2;var a=E.readUshort(Q,o);if(o+=2,Q.length-o<a)return null;t.instructions=E.readBytes(Q,o,a),o+=a;var s=t.endPts[t.noc-1]+1;for(t.flags=[],e=0;e<s;e++){var D=Q[o];if(o++,t.flags.push(D),(8&D)!=0){var c=Q[o];o++;for(var r=0;r<c;r++)t.flags.push(D),e++}}for(t.xs=[],e=0;e<s;e++){var n=(2&t.flags[e])!=0,l=(16&t.flags[e])!=0;n?(t.xs.push(l?Q[o]:-Q[o]),o++):l?t.xs.push(0):(t.xs.push(E.readShort(Q,o)),o+=2)}for(t.ys=[],e=0;e<s;e++)n=(4&t.flags[e])!=0,l=(32&t.flags[e])!=0,n?(t.ys.push(l?Q[o]:-Q[o]),o++):l?t.ys.push(0):(t.ys.push(E.readShort(Q,o)),o+=2);var G=0,S=0;for(e=0;e<s;e++)G+=t.xs[e],S+=t.ys[e],t.xs[e]=G,t.ys[e]=S}else{var k;t.parts=[];do{k=E.readUshort(Q,o),o+=2;var M={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(t.parts.push(M),M.glyphIndex=E.readUshort(Q,o),o+=2,1&k){var K=E.readShort(Q,o);o+=2;var U=E.readShort(Q,o);o+=2}else K=E.readInt8(Q,o),o++,U=E.readInt8(Q,o),o++;2&k?(M.m.tx=K,M.m.ty=U):(M.p1=K,M.p2=U),8&k?(M.m.a=M.m.d=E.readF2dot14(Q,o),o+=2):64&k?(M.m.a=E.readF2dot14(Q,o),o+=2,M.m.d=E.readF2dot14(Q,o),o+=2):128&k&&(M.m.a=E.readF2dot14(Q,o),o+=2,M.m.b=E.readF2dot14(Q,o),o+=2,M.m.c=E.readF2dot14(Q,o),o+=2,M.m.d=E.readF2dot14(Q,o),o+=2)}while(32&k);if(256&k){var w=E.readUshort(Q,o);for(o+=2,t.instr=[],e=0;e<w;e++)t.instr.push(Q[o]),o++}}return t},A.GPOS={},A.GPOS.parse=function(C,B,E,Q){return A._lctf.parse(C,B,E,Q,A.GPOS.subt)},A.GPOS.subt=function(C,B,E,Q){var o=A._bin,t=E,e={};if(e.fmt=o.readUshort(C,E),E+=2,B==1||B==2||B==3||B==7||B==8&&e.fmt<=2){var a=o.readUshort(C,E);E+=2,e.coverage=A._lctf.readCoverage(C,a+t)}if(B==1&&e.fmt==1){var s=o.readUshort(C,E);E+=2;var D=A._lctf.numOfOnes(s);s!=0&&(e.pos=A.GPOS.readValueRecord(C,E,s))}else if(B==2&&e.fmt>=1&&e.fmt<=2){s=o.readUshort(C,E),E+=2;var c=o.readUshort(C,E);E+=2,D=A._lctf.numOfOnes(s);var r=A._lctf.numOfOnes(c);if(e.fmt==1){e.pairsets=[];var n=o.readUshort(C,E);E+=2;for(var l=0;l<n;l++){var G=t+o.readUshort(C,E);E+=2;var S=o.readUshort(C,G);G+=2;for(var k=[],M=0;M<S;M++){var K=o.readUshort(C,G);G+=2,s!=0&&(u=A.GPOS.readValueRecord(C,G,s),G+=2*D),c!=0&&(q=A.GPOS.readValueRecord(C,G,c),G+=2*r),k.push({gid2:K,val1:u,val2:q})}e.pairsets.push(k)}}if(e.fmt==2){var U=o.readUshort(C,E);E+=2;var w=o.readUshort(C,E);E+=2;var d=o.readUshort(C,E);E+=2;var L=o.readUshort(C,E);for(E+=2,e.classDef1=A._lctf.readClassDef(C,t+U),e.classDef2=A._lctf.readClassDef(C,t+w),e.matrix=[],l=0;l<d;l++){var X=[];for(M=0;M<L;M++){var u=null,q=null;s!=0&&(u=A.GPOS.readValueRecord(C,E,s),E+=2*D),c!=0&&(q=A.GPOS.readValueRecord(C,E,c),E+=2*r),X.push({val1:u,val2:q})}e.matrix.push(X)}}}else{if(B==9&&e.fmt==1){var J=o.readUshort(C,E);E+=2;var m=o.readUint(C,E);if(E+=4,Q.ltype==9)Q.ltype=J;else if(Q.ltype!=J)throw"invalid extension substitution";return A.GPOS.subt(C,Q.ltype,t+m)}console.debug("unsupported GPOS table LookupType",B,"format",e.fmt)}return e},A.GPOS.readValueRecord=function(C,B,E){var Q=A._bin,o=[];return o.push(1&E?Q.readShort(C,B):0),B+=1&E?2:0,o.push(2&E?Q.readShort(C,B):0),B+=2&E?2:0,o.push(4&E?Q.readShort(C,B):0),B+=4&E?2:0,o.push(8&E?Q.readShort(C,B):0),B+=8&E?2:0,o},A.GSUB={},A.GSUB.parse=function(C,B,E,Q){return A._lctf.parse(C,B,E,Q,A.GSUB.subt)},A.GSUB.subt=function(C,B,E,Q){var o=A._bin,t=E,e={};if(e.fmt=o.readUshort(C,E),E+=2,B!=1&&B!=4&&B!=5&&B!=6)return null;if(B==1||B==4||B==5&&e.fmt<=2||B==6&&e.fmt<=2){var a=o.readUshort(C,E);E+=2,e.coverage=A._lctf.readCoverage(C,t+a)}if(B==1&&e.fmt>=1&&e.fmt<=2){if(e.fmt==1)e.delta=o.readShort(C,E),E+=2;else if(e.fmt==2){var s=o.readUshort(C,E);E+=2,e.newg=o.readUshorts(C,E,s),E+=2*e.newg.length}}else if(B==4){e.vals=[],s=o.readUshort(C,E),E+=2;for(var D=0;D<s;D++){var c=o.readUshort(C,E);E+=2,e.vals.push(A.GSUB.readLigatureSet(C,t+c))}}else if(B==5&&e.fmt==2){if(e.fmt==2){var r=o.readUshort(C,E);E+=2,e.cDef=A._lctf.readClassDef(C,t+r),e.scset=[];var n=o.readUshort(C,E);for(E+=2,D=0;D<n;D++){var l=o.readUshort(C,E);E+=2,e.scset.push(l==0?null:A.GSUB.readSubClassSet(C,t+l))}}}else if(B==6&&e.fmt==3){if(e.fmt==3){for(D=0;D<3;D++){s=o.readUshort(C,E),E+=2;for(var G=[],S=0;S<s;S++)G.push(A._lctf.readCoverage(C,t+o.readUshort(C,E+2*S)));E+=2*s,D==0&&(e.backCvg=G),D==1&&(e.inptCvg=G),D==2&&(e.ahedCvg=G)}s=o.readUshort(C,E),E+=2,e.lookupRec=A.GSUB.readSubstLookupRecords(C,E,s)}}else{if(B==7&&e.fmt==1){var k=o.readUshort(C,E);E+=2;var M=o.readUint(C,E);if(E+=4,Q.ltype==9)Q.ltype=k;else if(Q.ltype!=k)throw"invalid extension substitution";return A.GSUB.subt(C,Q.ltype,t+M)}console.debug("unsupported GSUB table LookupType",B,"format",e.fmt)}return e},A.GSUB.readSubClassSet=function(C,B){var E=A._bin.readUshort,Q=B,o=[],t=E(C,B);B+=2;for(var e=0;e<t;e++){var a=E(C,B);B+=2,o.push(A.GSUB.readSubClassRule(C,Q+a))}return o},A.GSUB.readSubClassRule=function(C,B){var E=A._bin.readUshort,Q={},o=E(C,B),t=E(C,B+=2);B+=2,Q.input=[];for(var e=0;e<o-1;e++)Q.input.push(E(C,B)),B+=2;return Q.substLookupRecords=A.GSUB.readSubstLookupRecords(C,B,t),Q},A.GSUB.readSubstLookupRecords=function(C,B,E){for(var Q=A._bin.readUshort,o=[],t=0;t<E;t++)o.push(Q(C,B),Q(C,B+2)),B+=4;return o},A.GSUB.readChainSubClassSet=function(C,B){var E=A._bin,Q=B,o=[],t=E.readUshort(C,B);B+=2;for(var e=0;e<t;e++){var a=E.readUshort(C,B);B+=2,o.push(A.GSUB.readChainSubClassRule(C,Q+a))}return o},A.GSUB.readChainSubClassRule=function(C,B){for(var E=A._bin,Q={},o=["backtrack","input","lookahead"],t=0;t<o.length;t++){var e=E.readUshort(C,B);B+=2,t==1&&e--,Q[o[t]]=E.readUshorts(C,B,e),B+=2*Q[o[t]].length}return e=E.readUshort(C,B),B+=2,Q.subst=E.readUshorts(C,B,2*e),B+=2*Q.subst.length,Q},A.GSUB.readLigatureSet=function(C,B){var E=A._bin,Q=B,o=[],t=E.readUshort(C,B);B+=2;for(var e=0;e<t;e++){var a=E.readUshort(C,B);B+=2,o.push(A.GSUB.readLigature(C,Q+a))}return o},A.GSUB.readLigature=function(C,B){var E=A._bin,Q={chain:[]};Q.nglyph=E.readUshort(C,B),B+=2;var o=E.readUshort(C,B);B+=2;for(var t=0;t<o-1;t++)Q.chain.push(E.readUshort(C,B)),B+=2;return Q},A.head={},A.head.parse=function(C,B,E){var Q=A._bin,o={};return Q.readFixed(C,B),B+=4,o.fontRevision=Q.readFixed(C,B),B+=4,Q.readUint(C,B),B+=4,Q.readUint(C,B),B+=4,o.flags=Q.readUshort(C,B),B+=2,o.unitsPerEm=Q.readUshort(C,B),B+=2,o.created=Q.readUint64(C,B),B+=8,o.modified=Q.readUint64(C,B),B+=8,o.xMin=Q.readShort(C,B),B+=2,o.yMin=Q.readShort(C,B),B+=2,o.xMax=Q.readShort(C,B),B+=2,o.yMax=Q.readShort(C,B),B+=2,o.macStyle=Q.readUshort(C,B),B+=2,o.lowestRecPPEM=Q.readUshort(C,B),B+=2,o.fontDirectionHint=Q.readShort(C,B),B+=2,o.indexToLocFormat=Q.readShort(C,B),B+=2,o.glyphDataFormat=Q.readShort(C,B),B+=2,o},A.hhea={},A.hhea.parse=function(C,B,E){var Q=A._bin,o={};return Q.readFixed(C,B),B+=4,o.ascender=Q.readShort(C,B),B+=2,o.descender=Q.readShort(C,B),B+=2,o.lineGap=Q.readShort(C,B),B+=2,o.advanceWidthMax=Q.readUshort(C,B),B+=2,o.minLeftSideBearing=Q.readShort(C,B),B+=2,o.minRightSideBearing=Q.readShort(C,B),B+=2,o.xMaxExtent=Q.readShort(C,B),B+=2,o.caretSlopeRise=Q.readShort(C,B),B+=2,o.caretSlopeRun=Q.readShort(C,B),B+=2,o.caretOffset=Q.readShort(C,B),B+=2,B+=8,o.metricDataFormat=Q.readShort(C,B),B+=2,o.numberOfHMetrics=Q.readUshort(C,B),B+=2,o},A.hmtx={},A.hmtx.parse=function(C,B,E,Q){for(var o=A._bin,t={aWidth:[],lsBearing:[]},e=0,a=0,s=0;s<Q.maxp.numGlyphs;s++)s<Q.hhea.numberOfHMetrics&&(e=o.readUshort(C,B),B+=2,a=o.readShort(C,B),B+=2),t.aWidth.push(e),t.lsBearing.push(a);return t},A.kern={},A.kern.parse=function(C,B,E,Q){var o=A._bin,t=o.readUshort(C,B);if(B+=2,t==1)return A.kern.parseV1(C,B-2,E,Q);var e=o.readUshort(C,B);B+=2;for(var a={glyph1:[],rval:[]},s=0;s<e;s++){B+=2,E=o.readUshort(C,B),B+=2;var D=o.readUshort(C,B);B+=2;var c=D>>>8;if((c&=15)!=0)throw"unknown kern table format: "+c;B=A.kern.readFormat0(C,B,a)}return a},A.kern.parseV1=function(C,B,E,Q){var o=A._bin;o.readFixed(C,B),B+=4;var t=o.readUint(C,B);B+=4;for(var e={glyph1:[],rval:[]},a=0;a<t;a++){o.readUint(C,B),B+=4;var s=o.readUshort(C,B);B+=2,o.readUshort(C,B),B+=2;var D=s>>>8;if((D&=15)!=0)throw"unknown kern table format: "+D;B=A.kern.readFormat0(C,B,e)}return e},A.kern.readFormat0=function(C,B,E){var Q=A._bin,o=-1,t=Q.readUshort(C,B);B+=2,Q.readUshort(C,B),B+=2,Q.readUshort(C,B),B+=2,Q.readUshort(C,B),B+=2;for(var e=0;e<t;e++){var a=Q.readUshort(C,B);B+=2;var s=Q.readUshort(C,B);B+=2;var D=Q.readShort(C,B);B+=2,a!=o&&(E.glyph1.push(a),E.rval.push({glyph2:[],vals:[]}));var c=E.rval[E.rval.length-1];c.glyph2.push(s),c.vals.push(D),o=a}return B},A.loca={},A.loca.parse=function(C,B,E,Q){var o=A._bin,t=[],e=Q.head.indexToLocFormat,a=Q.maxp.numGlyphs+1;if(e==0)for(var s=0;s<a;s++)t.push(o.readUshort(C,B+(s<<1))<<1);if(e==1)for(s=0;s<a;s++)t.push(o.readUint(C,B+(s<<2)));return t},A.maxp={},A.maxp.parse=function(C,B,E){var Q=A._bin,o={},t=Q.readUint(C,B);return B+=4,o.numGlyphs=Q.readUshort(C,B),B+=2,t==65536&&(o.maxPoints=Q.readUshort(C,B),B+=2,o.maxContours=Q.readUshort(C,B),B+=2,o.maxCompositePoints=Q.readUshort(C,B),B+=2,o.maxCompositeContours=Q.readUshort(C,B),B+=2,o.maxZones=Q.readUshort(C,B),B+=2,o.maxTwilightPoints=Q.readUshort(C,B),B+=2,o.maxStorage=Q.readUshort(C,B),B+=2,o.maxFunctionDefs=Q.readUshort(C,B),B+=2,o.maxInstructionDefs=Q.readUshort(C,B),B+=2,o.maxStackElements=Q.readUshort(C,B),B+=2,o.maxSizeOfInstructions=Q.readUshort(C,B),B+=2,o.maxComponentElements=Q.readUshort(C,B),B+=2,o.maxComponentDepth=Q.readUshort(C,B),B+=2),o},A.name={},A.name.parse=function(C,B,E){var Q=A._bin,o={};Q.readUshort(C,B),B+=2;var t=Q.readUshort(C,B);B+=2,Q.readUshort(C,B);for(var e,a=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],s=B+=2,D=0;D<t;D++){var c=Q.readUshort(C,B);B+=2;var r=Q.readUshort(C,B);B+=2;var n=Q.readUshort(C,B);B+=2;var l=Q.readUshort(C,B);B+=2;var G=Q.readUshort(C,B);B+=2;var S=Q.readUshort(C,B);B+=2;var k,M=a[l],K=s+12*t+S;if(c==0)k=Q.readUnicode(C,K,G/2);else if(c==3&&r==0)k=Q.readUnicode(C,K,G/2);else if(r==0)k=Q.readASCII(C,K,G);else if(r==1)k=Q.readUnicode(C,K,G/2);else if(r==3)k=Q.readUnicode(C,K,G/2);else{if(c!=1)throw"unknown encoding "+r+", platformID: "+c;k=Q.readASCII(C,K,G),console.debug("reading unknown MAC encoding "+r+" as ASCII")}var U="p"+c+","+n.toString(16);o[U]==null&&(o[U]={}),o[U][M!==void 0?M:l]=k,o[U]._lang=n}for(var w in o)if(o[w].postScriptName!=null&&o[w]._lang==1033)return o[w];for(var w in o)if(o[w].postScriptName!=null&&o[w]._lang==0)return o[w];for(var w in o)if(o[w].postScriptName!=null&&o[w]._lang==3084)return o[w];for(var w in o)if(o[w].postScriptName!=null)return o[w];for(var w in o){e=w;break}return console.debug("returning name table with languageID "+o[e]._lang),o[e]},A["OS/2"]={},A["OS/2"].parse=function(C,B,E){var Q=A._bin.readUshort(C,B);B+=2;var o={};if(Q==0)A["OS/2"].version0(C,B,o);else if(Q==1)A["OS/2"].version1(C,B,o);else if(Q==2||Q==3||Q==4)A["OS/2"].version2(C,B,o);else{if(Q!=5)throw"unknown OS/2 table version: "+Q;A["OS/2"].version5(C,B,o)}return o},A["OS/2"].version0=function(C,B,E){var Q=A._bin;return E.xAvgCharWidth=Q.readShort(C,B),B+=2,E.usWeightClass=Q.readUshort(C,B),B+=2,E.usWidthClass=Q.readUshort(C,B),B+=2,E.fsType=Q.readUshort(C,B),B+=2,E.ySubscriptXSize=Q.readShort(C,B),B+=2,E.ySubscriptYSize=Q.readShort(C,B),B+=2,E.ySubscriptXOffset=Q.readShort(C,B),B+=2,E.ySubscriptYOffset=Q.readShort(C,B),B+=2,E.ySuperscriptXSize=Q.readShort(C,B),B+=2,E.ySuperscriptYSize=Q.readShort(C,B),B+=2,E.ySuperscriptXOffset=Q.readShort(C,B),B+=2,E.ySuperscriptYOffset=Q.readShort(C,B),B+=2,E.yStrikeoutSize=Q.readShort(C,B),B+=2,E.yStrikeoutPosition=Q.readShort(C,B),B+=2,E.sFamilyClass=Q.readShort(C,B),B+=2,E.panose=Q.readBytes(C,B,10),B+=10,E.ulUnicodeRange1=Q.readUint(C,B),B+=4,E.ulUnicodeRange2=Q.readUint(C,B),B+=4,E.ulUnicodeRange3=Q.readUint(C,B),B+=4,E.ulUnicodeRange4=Q.readUint(C,B),B+=4,E.achVendID=[Q.readInt8(C,B),Q.readInt8(C,B+1),Q.readInt8(C,B+2),Q.readInt8(C,B+3)],B+=4,E.fsSelection=Q.readUshort(C,B),B+=2,E.usFirstCharIndex=Q.readUshort(C,B),B+=2,E.usLastCharIndex=Q.readUshort(C,B),B+=2,E.sTypoAscender=Q.readShort(C,B),B+=2,E.sTypoDescender=Q.readShort(C,B),B+=2,E.sTypoLineGap=Q.readShort(C,B),B+=2,E.usWinAscent=Q.readUshort(C,B),B+=2,E.usWinDescent=Q.readUshort(C,B),B+=2},A["OS/2"].version1=function(C,B,E){var Q=A._bin;return B=A["OS/2"].version0(C,B,E),E.ulCodePageRange1=Q.readUint(C,B),B+=4,E.ulCodePageRange2=Q.readUint(C,B),B+=4},A["OS/2"].version2=function(C,B,E){var Q=A._bin;return B=A["OS/2"].version1(C,B,E),E.sxHeight=Q.readShort(C,B),B+=2,E.sCapHeight=Q.readShort(C,B),B+=2,E.usDefault=Q.readUshort(C,B),B+=2,E.usBreak=Q.readUshort(C,B),B+=2,E.usMaxContext=Q.readUshort(C,B),B+=2},A["OS/2"].version5=function(C,B,E){var Q=A._bin;return B=A["OS/2"].version2(C,B,E),E.usLowerOpticalPointSize=Q.readUshort(C,B),B+=2,E.usUpperOpticalPointSize=Q.readUshort(C,B),B+=2},A.post={},A.post.parse=function(C,B,E){var Q=A._bin,o={};return o.version=Q.readFixed(C,B),B+=4,o.italicAngle=Q.readFixed(C,B),B+=4,o.underlinePosition=Q.readShort(C,B),B+=2,o.underlineThickness=Q.readShort(C,B),B+=2,o},A==null&&(A={}),A.U==null&&(A.U={}),A.U.codeToGlyph=function(C,B){var E=C.cmap,Q=-1;if(E.p0e4!=null?Q=E.p0e4:E.p3e1!=null?Q=E.p3e1:E.p1e0!=null?Q=E.p1e0:E.p0e3!=null&&(Q=E.p0e3),Q==-1)throw"no familiar platform and encoding!";var o=E.tables[Q];if(o.format==0)return B>=o.map.length?0:o.map[B];if(o.format==4){for(var t=-1,e=0;e<o.endCount.length;e++)if(B<=o.endCount[e]){t=e;break}return t==-1||o.startCount[t]>B?0:65535&(o.idRangeOffset[t]!=0?o.glyphIdArray[B-o.startCount[t]+(o.idRangeOffset[t]>>1)-(o.idRangeOffset.length-t)]:B+o.idDelta[t])}if(o.format==12){if(B>o.groups[o.groups.length-1][1])return 0;for(e=0;e<o.groups.length;e++){var a=o.groups[e];if(a[0]<=B&&B<=a[1])return a[2]+(B-a[0])}return 0}throw"unknown cmap table format "+o.format},A.U.glyphToPath=function(C,B){var E={cmds:[],crds:[]};if(C.SVG&&C.SVG.entries[B]){var Q=C.SVG.entries[B];return Q==null?E:(typeof Q=="string"&&(Q=A.SVG.toPath(Q),C.SVG.entries[B]=Q),Q)}if(C.CFF){var o={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:C.CFF.Private?C.CFF.Private.defaultWidthX:0,open:!1},t=C.CFF,e=C.CFF.Private;if(t.ROS){for(var a=0;t.FDSelect[a+2]<=B;)a+=2;e=t.FDArray[t.FDSelect[a+1]].Private}A.U._drawCFF(C.CFF.CharStrings[B],o,t,e,E)}else C.glyf&&A.U._drawGlyf(B,C,E);return E},A.U._drawGlyf=function(C,B,E){var Q=B.glyf[C];Q==null&&(Q=B.glyf[C]=A.glyf._parseGlyf(B,C)),Q!=null&&(Q.noc>-1?A.U._simpleGlyph(Q,E):A.U._compoGlyph(Q,B,E))},A.U._simpleGlyph=function(C,B){for(var E=0;E<C.noc;E++){for(var Q=E==0?0:C.endPts[E-1]+1,o=C.endPts[E],t=Q;t<=o;t++){var e=t==Q?o:t-1,a=t==o?Q:t+1,s=1&C.flags[t],D=1&C.flags[e],c=1&C.flags[a],r=C.xs[t],n=C.ys[t];if(t==Q)if(s){if(!D){A.U.P.moveTo(B,r,n);continue}A.U.P.moveTo(B,C.xs[e],C.ys[e])}else D?A.U.P.moveTo(B,C.xs[e],C.ys[e]):A.U.P.moveTo(B,(C.xs[e]+r)/2,(C.ys[e]+n)/2);s?D&&A.U.P.lineTo(B,r,n):c?A.U.P.qcurveTo(B,r,n,C.xs[a],C.ys[a]):A.U.P.qcurveTo(B,r,n,(r+C.xs[a])/2,(n+C.ys[a])/2)}A.U.P.closePath(B)}},A.U._compoGlyph=function(C,B,E){for(var Q=0;Q<C.parts.length;Q++){var o={cmds:[],crds:[]},t=C.parts[Q];A.U._drawGlyf(t.glyphIndex,B,o);for(var e=t.m,a=0;a<o.crds.length;a+=2){var s=o.crds[a],D=o.crds[a+1];E.crds.push(s*e.a+D*e.b+e.tx),E.crds.push(s*e.c+D*e.d+e.ty)}for(a=0;a<o.cmds.length;a++)E.cmds.push(o.cmds[a])}},A.U._getGlyphClass=function(C,B){var E=A._lctf.getInterval(B,C);return E==-1?0:B[E+2]},A.U.getPairAdjustment=function(C,B,E){var Q=!1;if(C.GPOS)for(var o=C.GPOS,t=o.lookupList,e=o.featureList,a=[],s=0;s<e.length;s++){var D=e[s];if(D.tag=="kern"){Q=!0;for(var c=0;c<D.tab.length;c++)if(!a[D.tab[c]]){a[D.tab[c]]=!0;for(var r=t[D.tab[c]],n=0;n<r.tabs.length;n++)if(r.tabs[n]!=null){var l,G=r.tabs[n];if((!G.coverage||(l=A._lctf.coverageIndex(G.coverage,B))!=-1)&&r.ltype!=1){if(r.ltype==2){var S=null;if(G.fmt==1){var k=G.pairsets[l];for(s=0;s<k.length;s++)k[s].gid2==E&&(S=k[s])}else if(G.fmt==2){var M=A.U._getGlyphClass(B,G.classDef1),K=A.U._getGlyphClass(E,G.classDef2);S=G.matrix[M][K]}if(S){var U=0;return S.val1&&S.val1[2]&&(U+=S.val1[2]),S.val2&&S.val2[0]&&(U+=S.val2[0]),U}}}}}}}if(C.kern&&!Q){var w=C.kern.glyph1.indexOf(B);if(w!=-1){var d=C.kern.rval[w].glyph2.indexOf(E);if(d!=-1)return C.kern.rval[w].vals[d]}}return 0},A.U._applySubs=function(C,B,E,Q){for(var o=C.length-B-1,t=0;t<E.tabs.length;t++)if(E.tabs[t]!=null){var e,a=E.tabs[t];if(!a.coverage||(e=A._lctf.coverageIndex(a.coverage,C[B]))!=-1){if(E.ltype==1)C[B],a.fmt==1?C[B]=C[B]+a.delta:C[B]=a.newg[e];else if(E.ltype==4)for(var s=a.vals[e],D=0;D<s.length;D++){var c=s[D],r=c.chain.length;if(!(r>o)){for(var n=!0,l=0,G=0;G<r;G++){for(;C[B+l+(1+G)]==-1;)l++;c.chain[G]!=C[B+l+(1+G)]&&(n=!1)}if(n){for(C[B]=c.nglyph,G=0;G<r+l;G++)C[B+G+1]=-1;break}}}else if(E.ltype==5&&a.fmt==2)for(var S=A._lctf.getInterval(a.cDef,C[B]),k=a.cDef[S+2],M=a.scset[k],K=0;K<M.length;K++){var U=M[K],w=U.input;if(!(w.length>o)){for(n=!0,G=0;G<w.length;G++){var d=A._lctf.getInterval(a.cDef,C[B+1+G]);if(S==-1&&a.cDef[d+2]!=w[G]){n=!1;break}}if(n){var L=U.substLookupRecords;for(D=0;D<L.length;D+=2)L[D],L[D+1]}}}else if(E.ltype==6&&a.fmt==3){if(!A.U._glsCovered(C,a.backCvg,B-a.backCvg.length)||!A.U._glsCovered(C,a.inptCvg,B)||!A.U._glsCovered(C,a.ahedCvg,B+a.inptCvg.length))continue;var X=a.lookupRec;for(K=0;K<X.length;K+=2){S=X[K];var u=Q[X[K+1]];A.U._applySubs(C,B+S,u,Q)}}}}},A.U._glsCovered=function(C,B,E){for(var Q=0;Q<B.length;Q++)if(A._lctf.coverageIndex(B[Q],C[E+Q])==-1)return!1;return!0},A.U.glyphsToPath=function(C,B,E){for(var Q={cmds:[],crds:[]},o=0,t=0;t<B.length;t++){var e=B[t];if(e!=-1){for(var a=t<B.length-1&&B[t+1]!=-1?B[t+1]:0,s=A.U.glyphToPath(C,e),D=0;D<s.crds.length;D+=2)Q.crds.push(s.crds[D]+o),Q.crds.push(s.crds[D+1]);for(E&&Q.cmds.push(E),D=0;D<s.cmds.length;D++)Q.cmds.push(s.cmds[D]);E&&Q.cmds.push("X"),o+=C.hmtx.aWidth[e],t<B.length-1&&(o+=A.U.getPairAdjustment(C,e,a))}}return Q},A.U.P={},A.U.P.moveTo=function(C,B,E){C.cmds.push("M"),C.crds.push(B,E)},A.U.P.lineTo=function(C,B,E){C.cmds.push("L"),C.crds.push(B,E)},A.U.P.curveTo=function(C,B,E,Q,o,t,e){C.cmds.push("C"),C.crds.push(B,E,Q,o,t,e)},A.U.P.qcurveTo=function(C,B,E,Q,o){C.cmds.push("Q"),C.crds.push(B,E,Q,o)},A.U.P.closePath=function(C){C.cmds.push("Z")},A.U._drawCFF=function(C,B,E,Q,o){for(var t=B.stack,e=B.nStems,a=B.haveWidth,s=B.width,D=B.open,c=0,r=B.x,n=B.y,l=0,G=0,S=0,k=0,M=0,K=0,U=0,w=0,d=0,L=0,X={val:0,size:0};c<C.length;){A.CFF.getCharString(C,c,X);var u=X.val;if(c+=X.size,u=="o1"||u=="o18")t.length%2!=0&&!a&&(s=t.shift()+Q.nominalWidthX),e+=t.length>>1,t.length=0,a=!0;else if(u=="o3"||u=="o23")t.length%2!=0&&!a&&(s=t.shift()+Q.nominalWidthX),e+=t.length>>1,t.length=0,a=!0;else if(u=="o4")t.length>1&&!a&&(s=t.shift()+Q.nominalWidthX,a=!0),D&&A.U.P.closePath(o),n+=t.pop(),A.U.P.moveTo(o,r,n),D=!0;else if(u=="o5")for(;t.length>0;)r+=t.shift(),n+=t.shift(),A.U.P.lineTo(o,r,n);else if(u=="o6"||u=="o7")for(var q=t.length,J=u=="o6",m=0;m<q;m++){var P=t.shift();J?r+=P:n+=P,J=!J,A.U.P.lineTo(o,r,n)}else if(u=="o8"||u=="o24"){q=t.length;for(var iA=0;iA+6<=q;)l=r+t.shift(),G=n+t.shift(),S=l+t.shift(),k=G+t.shift(),r=S+t.shift(),n=k+t.shift(),A.U.P.curveTo(o,l,G,S,k,r,n),iA+=6;u=="o24"&&(r+=t.shift(),n+=t.shift(),A.U.P.lineTo(o,r,n))}else{if(u=="o11")break;if(u=="o1234"||u=="o1235"||u=="o1236"||u=="o1237")u=="o1234"&&(G=n,S=(l=r+t.shift())+t.shift(),L=k=G+t.shift(),K=k,w=n,r=(U=(M=(d=S+t.shift())+t.shift())+t.shift())+t.shift(),A.U.P.curveTo(o,l,G,S,k,d,L),A.U.P.curveTo(o,M,K,U,w,r,n)),u=="o1235"&&(l=r+t.shift(),G=n+t.shift(),S=l+t.shift(),k=G+t.shift(),d=S+t.shift(),L=k+t.shift(),M=d+t.shift(),K=L+t.shift(),U=M+t.shift(),w=K+t.shift(),r=U+t.shift(),n=w+t.shift(),t.shift(),A.U.P.curveTo(o,l,G,S,k,d,L),A.U.P.curveTo(o,M,K,U,w,r,n)),u=="o1236"&&(l=r+t.shift(),G=n+t.shift(),S=l+t.shift(),L=k=G+t.shift(),K=k,U=(M=(d=S+t.shift())+t.shift())+t.shift(),w=K+t.shift(),r=U+t.shift(),A.U.P.curveTo(o,l,G,S,k,d,L),A.U.P.curveTo(o,M,K,U,w,r,n)),u=="o1237"&&(l=r+t.shift(),G=n+t.shift(),S=l+t.shift(),k=G+t.shift(),d=S+t.shift(),L=k+t.shift(),M=d+t.shift(),K=L+t.shift(),U=M+t.shift(),w=K+t.shift(),Math.abs(U-r)>Math.abs(w-n)?r=U+t.shift():n=w+t.shift(),A.U.P.curveTo(o,l,G,S,k,d,L),A.U.P.curveTo(o,M,K,U,w,r,n));else if(u=="o14"){if(t.length>0&&!a&&(s=t.shift()+E.nominalWidthX,a=!0),t.length==4){var V=t.shift(),b=t.shift(),v=t.shift(),N=t.shift(),p=A.CFF.glyphBySE(E,v),Z=A.CFF.glyphBySE(E,N);A.U._drawCFF(E.CharStrings[p],B,E,Q,o),B.x=V,B.y=b,A.U._drawCFF(E.CharStrings[Z],B,E,Q,o)}D&&(A.U.P.closePath(o),D=!1)}else if(u=="o19"||u=="o20")t.length%2!=0&&!a&&(s=t.shift()+Q.nominalWidthX),e+=t.length>>1,t.length=0,a=!0,c+=e+7>>3;else if(u=="o21")t.length>2&&!a&&(s=t.shift()+Q.nominalWidthX,a=!0),n+=t.pop(),r+=t.pop(),D&&A.U.P.closePath(o),A.U.P.moveTo(o,r,n),D=!0;else if(u=="o22")t.length>1&&!a&&(s=t.shift()+Q.nominalWidthX,a=!0),r+=t.pop(),D&&A.U.P.closePath(o),A.U.P.moveTo(o,r,n),D=!0;else if(u=="o25"){for(;t.length>6;)r+=t.shift(),n+=t.shift(),A.U.P.lineTo(o,r,n);l=r+t.shift(),G=n+t.shift(),S=l+t.shift(),k=G+t.shift(),r=S+t.shift(),n=k+t.shift(),A.U.P.curveTo(o,l,G,S,k,r,n)}else if(u=="o26")for(t.length%2&&(r+=t.shift());t.length>0;)l=r,G=n+t.shift(),r=S=l+t.shift(),n=(k=G+t.shift())+t.shift(),A.U.P.curveTo(o,l,G,S,k,r,n);else if(u=="o27")for(t.length%2&&(n+=t.shift());t.length>0;)G=n,S=(l=r+t.shift())+t.shift(),k=G+t.shift(),r=S+t.shift(),n=k,A.U.P.curveTo(o,l,G,S,k,r,n);else if(u=="o10"||u=="o29"){var O=u=="o10"?Q:E;if(t.length==0)console.debug("error: empty stack");else{var W=t.pop(),Y=O.Subrs[W+O.Bias];B.x=r,B.y=n,B.nStems=e,B.haveWidth=a,B.width=s,B.open=D,A.U._drawCFF(Y,B,E,Q,o),r=B.x,n=B.y,e=B.nStems,a=B.haveWidth,s=B.width,D=B.open}}else if(u=="o30"||u=="o31"){var QA=t.length,z=(iA=0,u=="o31");for(iA+=QA-(q=-3&QA);iA<q;)z?(G=n,S=(l=r+t.shift())+t.shift(),n=(k=G+t.shift())+t.shift(),q-iA==5?(r=S+t.shift(),iA++):r=S,z=!1):(l=r,G=n+t.shift(),S=l+t.shift(),k=G+t.shift(),r=S+t.shift(),q-iA==5?(n=k+t.shift(),iA++):n=k,z=!0),A.U.P.curveTo(o,l,G,S,k,r,n),iA+=4}else{if((u+"").charAt(0)=="o")throw console.debug("Unknown operation: "+u,C),u;t.push(u)}}}B.x=r,B.y=n,B.nStems=e,B.haveWidth=a,B.width=s,B.open=D};var I=A,g={Typr:I};return i.Typr=I,i.default=g,Object.defineProperty(i,"__esModule",{value:!0}),i}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function nG(){return function(i){var A=Uint8Array,I=Uint16Array,g=Uint32Array,C=new A([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),B=new A([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),E=new A([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Q=function(u,q){for(var J=new I(31),m=0;m<31;++m)J[m]=q+=1<<u[m-1];var P=new g(J[30]);for(m=1;m<30;++m)for(var iA=J[m];iA<J[m+1];++iA)P[iA]=iA-J[m]<<5|m;return[J,P]},o=Q(C,2),t=o[0],e=o[1];t[28]=258,e[258]=28;for(var a=Q(B,0)[0],s=new I(32768),D=0;D<32768;++D){var c=(43690&D)>>>1|(21845&D)<<1;c=(61680&(c=(52428&c)>>>2|(13107&c)<<2))>>>4|(3855&c)<<4,s[D]=((65280&c)>>>8|(255&c)<<8)>>>1}var r=function(u,q,J){for(var m=u.length,P=0,iA=new I(q);P<m;++P)++iA[u[P]-1];var V,b=new I(q);for(P=0;P<q;++P)b[P]=b[P-1]+iA[P-1]<<1;if(J){V=new I(1<<q);var v=15-q;for(P=0;P<m;++P)if(u[P])for(var N=P<<4|u[P],p=q-u[P],Z=b[u[P]-1]++<<p,O=Z|(1<<p)-1;Z<=O;++Z)V[s[Z]>>>v]=N}else for(V=new I(m),P=0;P<m;++P)u[P]&&(V[P]=s[b[u[P]-1]++]>>>15-u[P]);return V},n=new A(288);for(D=0;D<144;++D)n[D]=8;for(D=144;D<256;++D)n[D]=9;for(D=256;D<280;++D)n[D]=7;for(D=280;D<288;++D)n[D]=8;var l=new A(32);for(D=0;D<32;++D)l[D]=5;var G=r(n,9,1),S=r(l,5,1),k=function(u){for(var q=u[0],J=1;J<u.length;++J)u[J]>q&&(q=u[J]);return q},M=function(u,q,J){var m=q/8|0;return(u[m]|u[m+1]<<8)>>(7&q)&J},K=function(u,q){var J=q/8|0;return(u[J]|u[J+1]<<8|u[J+2]<<16)>>(7&q)},U=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],w=function(u,q,J){var m=new Error(q||U[u]);if(m.code=u,Error.captureStackTrace&&Error.captureStackTrace(m,w),!J)throw m;return m},d=function(u,q,J){var m=u.length;if(!m||J&&!J.l&&m<5)return q||new A(0);var P=!q||J,iA=!J||J.i;J||(J={}),q||(q=new A(3*m));var V,b=function(wA){var uA=q.length;if(wA>uA){var mA=new A(Math.max(2*uA,wA));mA.set(q),q=mA}},v=J.f||0,N=J.p||0,p=J.b||0,Z=J.l,O=J.d,W=J.m,Y=J.n,QA=8*m;do{if(!Z){J.f=v=M(u,N,1);var z=M(u,N+1,3);if(N+=3,!z){var eA=u[(UA=((V=N)/8|0)+(7&V&&1)+4)-4]|u[UA-3]<<8,tA=UA+eA;if(tA>m){iA&&w(0);break}P&&b(p+eA),q.set(u.subarray(UA,tA),p),J.b=p+=eA,J.p=N=8*tA;continue}if(z==1)Z=G,O=S,W=9,Y=5;else if(z==2){var hA=M(u,N,31)+257,EA=M(u,N+10,15)+4,kA=hA+M(u,N+5,31)+1;N+=14;for(var HA=new A(kA),yA=new A(19),dA=0;dA<EA;++dA)yA[E[dA]]=M(u,N+3*dA,7);N+=3*EA;var YA=k(yA),DA=(1<<YA)-1,FA=r(yA,YA,1);for(dA=0;dA<kA;){var UA,rA=FA[M(u,N,DA)];if(N+=15&rA,(UA=rA>>>4)<16)HA[dA++]=UA;else{var F=0,y=0;for(UA==16?(y=3+M(u,N,3),N+=2,F=HA[dA-1]):UA==17?(y=3+M(u,N,7),N+=3):UA==18&&(y=11+M(u,N,127),N+=7);y--;)HA[dA++]=F}}var x=HA.subarray(0,hA),$=HA.subarray(hA);W=k(x),Y=k($),Z=r(x,W,1),O=r($,Y,1)}else w(1);if(N>QA){iA&&w(0);break}}P&&b(p+131072);for(var aA=(1<<W)-1,cA=(1<<Y)-1,GA=N;;GA=N){var sA=(F=Z[K(u,N)&aA])>>>4;if((N+=15&F)>QA){iA&&w(0);break}if(F||w(2),sA<256)q[p++]=sA;else{if(sA==256){GA=N,Z=null;break}var gA=sA-254;if(sA>264){var JA=C[dA=sA-257];gA=M(u,N,(1<<JA)-1)+t[dA],N+=JA}var lA=O[K(u,N)&cA],MA=lA>>>4;if(lA||w(3),N+=15&lA,$=a[MA],MA>3&&(JA=B[MA],$+=K(u,N)&(1<<JA)-1,N+=JA),N>QA){iA&&w(0);break}P&&b(p+131072);for(var SA=p+gA;p<SA;p+=4)q[p]=q[p-$],q[p+1]=q[p+1-$],q[p+2]=q[p+2-$],q[p+3]=q[p+3-$];p=SA}}J.l=Z,J.p=GA,J.b=p,Z&&(v=1,J.m=W,J.d=O,J.n=Y)}while(!v);return p==q.length?q:function(wA,uA,mA){(uA==null||uA<0)&&(uA=0),(mA==null||mA>wA.length)&&(mA=wA.length);var PA=new(wA instanceof I?I:wA instanceof g?g:A)(mA-uA);return PA.set(wA.subarray(uA,mA)),PA}(q,0,p)},L=new A(0),X=typeof TextDecoder<"u"&&new TextDecoder;try{X.decode(L,{stream:!0})}catch{}return i.convert_streams=function(u){var q=new DataView(u),J=0;function m(){var hA=q.getUint16(J);return J+=2,hA}function P(){var hA=q.getUint32(J);return J+=4,hA}function iA(hA){eA.setUint16(tA,hA),tA+=2}function V(hA){eA.setUint32(tA,hA),tA+=4}for(var b={signature:P(),flavor:P(),length:P(),numTables:m(),reserved:m(),totalSfntSize:P(),majorVersion:m(),minorVersion:m(),metaOffset:P(),metaLength:P(),metaOrigLength:P(),privOffset:P(),privLength:P()},v=0;Math.pow(2,v)<=b.numTables;)v++;v--;for(var N=16*Math.pow(2,v),p=16*b.numTables-N,Z=12,O=[],W=0;W<b.numTables;W++)O.push({tag:P(),offset:P(),compLength:P(),origLength:P(),origChecksum:P()}),Z+=16;var Y,QA=new Uint8Array(12+16*O.length+O.reduce(function(hA,EA){return hA+EA.origLength+4},0)),z=QA.buffer,eA=new DataView(z),tA=0;return V(b.flavor),iA(b.numTables),iA(N),iA(v),iA(p),O.forEach(function(hA){V(hA.tag),V(hA.origChecksum),V(Z),V(hA.origLength),hA.outOffset=Z,(Z+=hA.origLength)%4!=0&&(Z+=4-Z%4)}),O.forEach(function(hA){var EA,kA=u.slice(hA.offset,hA.offset+hA.compLength);if(hA.compLength!=hA.origLength){var HA=new Uint8Array(hA.origLength);EA=new Uint8Array(kA,2),d(EA,HA)}else HA=new Uint8Array(kA);QA.set(HA,hA.outOffset);var yA=0;(Z=hA.outOffset+hA.origLength)%4!=0&&(yA=4-Z%4),QA.set(new Uint8Array(yA).buffer,hA.outOffset+hA.origLength),Y=Z+yA}),z.slice(0,Y)},Object.defineProperty(i,"__esModule",{value:!0}),i}({}).convert_streams}function DG(i,A){const I={M:2,L:2,Q:4,C:6,Z:0},g={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},C=1,B=2,E=4,Q=8,o=16,t=32;let e;function a(M){if(!e){const K={R:B,L:C,D:E,C:o,U:t,T:Q};e=new Map;for(let U in g){let w=0;g[U].split(",").forEach(d=>{let[L,X]=d.split("+");L=parseInt(L,36),X=X?parseInt(X,36):0,e.set(w+=L,K[U]);for(let u=X;u--;)e.set(++w,K[U])})}}return e.get(M)||t}const s=1,D=2,c=3,r=4,n=[null,"isol","init","fina","medi"];function l(M){const K=new Uint8Array(M.length);let U=t,w=s,d=-1;for(let L=0;L<M.length;L++){const X=M.codePointAt(L);let u=a(X)|0,q=s;u&Q||(U&(C|E|o)?u&(B|E|o)?(q=c,(w===s||w===c)&&K[d]++):u&(C|t)&&(w===D||w===r)&&K[d]--:U&(B|t)&&(w===D||w===r)&&K[d]--,w=K[L]=q,U=u,d=L,X>65535&&L++)}return K}function G(M,K){const U=[];for(let d=0;d<K.length;d++){const L=K.codePointAt(d);L>65535&&d++,U.push(i.U.codeToGlyph(M,L))}const w=M.GSUB;if(w){const{lookupList:d,featureList:L}=w;let X;const u=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws)$/,q=[];L.forEach(J=>{if(u.test(J.tag))for(let m=0;m<J.tab.length;m++){if(q[J.tab[m]])continue;q[J.tab[m]]=!0;const P=d[J.tab[m]],iA=/^(isol|init|fina|medi)$/.test(J.tag);iA&&!X&&(X=l(K));for(let V=0;V<U.length;V++)(!X||!iA||n[X[V]]===J.tag)&&i.U._applySubs(U,V,P,d)}})}return U}function S(...M){for(let K=0;K<M.length;K++)if(typeof M[K]=="number")return M[K]}function k(M){const K=Object.create(null),U=M["OS/2"],w=M.hhea,d=M.head.unitsPerEm,L=S(U&&U.sTypoAscender,w&&w.ascender,d),X={unitsPerEm:d,ascender:L,descender:S(U&&U.sTypoDescender,w&&w.descender,0),capHeight:S(U&&U.sCapHeight,L),xHeight:S(U&&U.sxHeight,L),lineGap:S(U&&U.sTypoLineGap,w&&w.lineGap),forEachGlyph(u,q,J,m){let P=0;const iA=1/X.unitsPerEm*q,V=G(M,u);let b=0,v=-1;return V.forEach((N,p)=>{if(N!==-1){let Z=K[N];if(!Z){const{cmds:O,crds:W}=i.U.glyphToPath(M,N);let Y="",QA=0;for(let EA=0,kA=O.length;EA<kA;EA++){const HA=I[O[EA]];Y+=O[EA];for(let yA=1;yA<=HA;yA++)Y+=(yA>1?",":"")+W[QA++]}let z,eA,tA,hA;if(W.length){z=eA=1/0,tA=hA=-1/0;for(let EA=0,kA=W.length;EA<kA;EA+=2){let HA=W[EA],yA=W[EA+1];HA<z&&(z=HA),yA<eA&&(eA=yA),HA>tA&&(tA=HA),yA>hA&&(hA=yA)}}else z=tA=eA=hA=0;Z=K[N]={index:N,advanceWidth:M.hmtx.aWidth[N],xMin:z,yMin:eA,xMax:tA,yMax:hA,path:Y,pathCommandCount:O.length}}v!==-1&&(P+=i.U.getPairAdjustment(M,v,N)*iA),m.call(null,Z,P,b),Z.advanceWidth&&(P+=Z.advanceWidth*iA),J&&(P+=J*q),v=N}b+=u.codePointAt(b)>65535?2:1}),P}};return X}return function(K){const U=new Uint8Array(K,0,4),w=i._bin.readASCII(U,0,4);if(w==="wOFF")K=A(K);else if(w==="wOF2")throw new Error("woff2 fonts not supported");return k(i.parse(K)[0])}}const rG=yQ({name:"Typr Font Parser",dependencies:[sG,nG,DG],init(i,A,I){const g=i(),C=A();return I(g,C)}}),EB={defaultFontURL:"https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff",sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},hG=new $A;function CB(){return(self.performance||Date).now()}const Me=Object.create(null);function _a(i,A){i=GG({},i);const I=CB();if(i.font=lG(i.font||EB.defaultFontURL),i.text=""+i.text,i.sdfGlyphSize=i.sdfGlyphSize||EB.sdfGlyphSize,i.colorRanges!=null){let a={};for(let s in i.colorRanges)if(i.colorRanges.hasOwnProperty(s)){let D=i.colorRanges[s];typeof D!="number"&&(D=hG.set(D).getHex()),a[s]=D}i.colorRanges=a}Object.freeze(i);const{textureWidth:g,sdfExponent:C}=EB,{sdfGlyphSize:B}=i,E=g/B*4;let Q=Me[B];if(!Q){const a=document.createElement("canvas");a.width=g,a.height=B*256/E,Q=Me[B]={glyphCount:0,sdfGlyphSize:B,sdfCanvas:a,sdfTexture:new PI(a,void 0,void 0,void 0,zI,zI),contextLost:!1,glyphsByFont:new Map},Q.sdfTexture.generateMipmaps=!1,cG(Q)}const{sdfTexture:o,sdfCanvas:t}=Q;let e=Q.glyphsByFont.get(i.font);e||Q.glyphsByFont.set(i.font,e=new Map),yG(i).then(a=>{const{glyphIds:s,glyphPositions:D,fontSize:c,unitsPerEm:r,timings:n}=a,l=[],G=new Float32Array(s.length*4),S=c/r;let k=0,M=0;const K=CB();s.forEach((X,u)=>{let q=e.get(X);if(!q){const{path:iA,pathBounds:V}=a.glyphData[X],b=Math.max(V[2]-V[0],V[3]-V[1])/B*(EB.sdfMargin*B+.5),v=Q.glyphCount++,N=[V[0]-b,V[1]-b,V[2]+b,V[3]+b];e.set(X,q={path:iA,atlasIndex:v,sdfViewBox:N}),l.push(q)}const{sdfViewBox:J}=q,m=D[M++],P=D[M++];G[k++]=m+J[0]*S,G[k++]=P+J[1]*S,G[k++]=m+J[2]*S,G[k++]=P+J[3]*S,s[u]=q.atlasIndex}),n.quads=(n.quads||0)+(CB()-K);const U=CB();n.sdf={};const w=t.height,d=Math.ceil(Q.glyphCount/E),L=Math.pow(2,Math.ceil(Math.log2(d*B)));L>w&&(console.info(`Increasing SDF texture size ${w}->${L}`),aG(t,g,L),o.dispose()),Promise.all(l.map(X=>Pa(X,Q,i.gpuAccelerateSDF).then(({timing:u})=>{n.sdf[X.atlasIndex]=u}))).then(()=>{l.length&&!Q.contextLost&&(Za(Q),o.needsUpdate=!0),n.sdfTotal=CB()-U,n.total=CB()-I,A(Object.freeze({parameters:i,sdfTexture:o,sdfGlyphSize:B,sdfExponent:C,glyphBounds:G,glyphAtlasIndices:s,glyphColors:a.glyphColors,caretPositions:a.caretPositions,caretHeight:a.caretHeight,chunkedBounds:a.chunkedBounds,ascender:a.ascender,descender:a.descender,lineHeight:a.lineHeight,capHeight:a.capHeight,xHeight:a.xHeight,topBaseline:a.topBaseline,blockBounds:a.blockBounds,visibleBounds:a.visibleBounds,timings:a.timings}))})}),Promise.resolve().then(()=>{Q.contextLost||eG(t)})}function Pa({path:i,atlasIndex:A,sdfViewBox:I},{sdfGlyphSize:g,sdfCanvas:C,contextLost:B},E){if(B)return Promise.resolve({timing:-1});const{textureWidth:Q,sdfExponent:o}=EB,t=Math.max(I[2]-I[0],I[3]-I[1]),e=Math.floor(A/4),a=e%(Q/g)*g,s=Math.floor(e/(Q/g))*g,D=A%4;return BG(g,g,i,I,t,o,C,a,s,D,E)}function cG(i){const A=i.sdfCanvas;A.addEventListener("webglcontextlost",I=>{console.log("Context Lost",I),I.preventDefault(),i.contextLost=!0}),A.addEventListener("webglcontextrestored",I=>{console.log("Context Restored",I),i.contextLost=!1;const g=[];i.glyphsByFont.forEach(C=>{C.forEach(B=>{g.push(Pa(B,i,!0))})}),Promise.all(g).then(()=>{Za(i),i.sdfTexture.needsUpdate=!0})})}function wG({font:i,characters:A,sdfGlyphSize:I},g){let C=Array.isArray(A)?A.join(`
`):""+A;_a({font:i,sdfGlyphSize:I,text:C},g)}function GG(i,A){for(let I in A)A.hasOwnProperty(I)&&(i[I]=A[I]);return i}let IE;function lG(i){return IE||(IE=typeof document>"u"?{}:document.createElement("a")),IE.href=i,IE.href}function Za(i){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:A,sdfTexture:I}=i,{width:g,height:C}=A,B=i.sdfCanvas.getContext("webgl");let E=I.image.data;(!E||E.length!==g*C*4)&&(E=new Uint8Array(g*C*4),I.image={width:g,height:C,data:E},I.flipY=!1,I.isDataTexture=!0),B.readPixels(0,0,g,C,B.RGBA,B.UNSIGNED_BYTE,E)}}const SG=yQ({name:"Typesetter",dependencies:[EB,rG,CG,Vw],init(i,A,I,g){const{defaultFontURL:C}=i;return I(A,g(),{defaultFontURL:C})}}),yG=yQ({name:"Typesetter",dependencies:[SG],init(i){return function(A){return new Promise(I=>{i.typeset(A,I)})}},getTransferables(i){const A=[i.glyphPositions.buffer,i.glyphIds.buffer];return i.caretPositions&&A.push(i.caretPositions.buffer),i.glyphColors&&A.push(i.glyphColors.buffer),A}}),Fe={};function kG(i){let A=Fe[i];if(!A){const I=new pC(1,1,i,i),g=I.clone(),C=I.attributes,B=g.attributes,E=new Zg,Q=C.uv.count;for(let o=0;o<Q;o++)B.position.array[o*3]*=-1,B.normal.array[o*3+2]*=-1;["position","normal","uv"].forEach(o=>{E.setAttribute(o,new QC([...C[o].array,...B[o].array],C[o].itemSize))}),E.setIndex([...I.index.array,...g.index.array.map(o=>o+Q)]),E.translate(.5,.5,0),A=Fe[i]=E}return A}const MG="aTroikaGlyphBounds",Re="aTroikaGlyphIndex",FG="aTroikaGlyphColor";class RG extends nw{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new uE,this.boundingBox=new kB}computeBoundingSphere(){}computeBoundingBox(){}setSide(A){const I=this.getIndex().count;this.setDrawRange(A===ig?I/2:0,A===DQ?I:I/2)}set detail(A){if(A!==this._detail){this._detail=A,(typeof A!="number"||A<1)&&(A=1);let I=kG(A);["position","normal","uv"].forEach(g=>{this.attributes[g]=I.attributes[g].clone()}),this.setIndex(I.getIndex().clone())}}get detail(){return this._detail}set curveRadius(A){A!==this._curveRadius&&(this._curveRadius=A,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(A,I,g,C,B){Li(this,MG,A,4),Li(this,Re,I,1),Li(this,FG,B,3),this._blockBounds=g,this._chunkedBounds=C,this.instanceCount=I.length,this._updateBounds()}_updateBounds(){const A=this._blockBounds;if(A){const{curveRadius:I,boundingBox:g}=this;if(I){const{PI:C,floor:B,min:E,max:Q,sin:o,cos:t}=Math,e=C/2,a=C*2,s=Math.abs(I),D=A[0]/s,c=A[2]/s,r=B((D+e)/a)!==B((c+e)/a)?-s:E(o(D)*s,o(c)*s),n=B((D-e)/a)!==B((c-e)/a)?s:Q(o(D)*s,o(c)*s),l=B((D+C)/a)!==B((c+C)/a)?s*2:Q(s-t(D)*s,s-t(c)*s);g.min.set(r,A[1],I<0?-l:0),g.max.set(n,A[3],I<0?0:l)}else g.min.set(A[0],A[1],0),g.max.set(A[2],A[3],0);g.getBoundingSphere(this.boundingSphere)}}applyClipRect(A){let I=this.getAttribute(Re).count,g=this._chunkedBounds;if(g)for(let C=g.length;C--;){I=g[C].end;let B=g[C].rect;if(B[1]<A.w&&B[3]>A.y&&B[0]<A.z&&B[2]>A.x)break}this.instanceCount=I}}function Li(i,A,I,g){const C=i.getAttribute(A);I?C&&C.array.length===I.length?(C.array.set(I),C.needsUpdate=!0):(i.setAttribute(A,new iw(I,g)),delete i._maxInstanceCount,i.dispose()):C&&i.deleteAttribute(A)}const NG=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaDistanceOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,KG=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaDistanceOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaDistanceOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,dG=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaDistanceOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaOutlineOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,UG=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaDistanceOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function JG(i){const A=Bo(i,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new AI},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new rI(0,0,0,0)},uTroikaClipRect:{value:new rI(0,0,0,0)},uTroikaDistanceOffset:{value:0},uTroikaOutlineOpacity:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new AI},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new $A},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new $I},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:NG,vertexTransform:KG,fragmentDefs:dG,fragmentColorTransform:UG,customRewriter({vertexShader:I,fragmentShader:g}){let C=/\buniform\s+vec3\s+diffuse\b/;return C.test(g)&&(g=g.replace(C,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),C.test(I)||(I=I.replace(Wa,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:I,fragmentShader:g}}});return A.transparent=!0,Object.defineProperties(A,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),A}const Ho=new LE({color:16777215,side:DQ,transparent:!0}),Ne=8421504,Ke=new MI,gE=new j,Yi=new j,WB=[],pG=new j,Hi="+x+y";function de(i){return Array.isArray(i)?i[0]:i}let Va=()=>{const i=new ng(new pC(1,1),Ho);return Va=()=>i,i},ja=()=>{const i=new ng(new pC(1,1,32,1),Ho);return ja=()=>i,i};const fG={type:"syncstart"},qG={type:"synccomplete"},Xa=["font","fontSize","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],uG=Xa.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class za extends ng{constructor(){const A=new RG;super(A,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.fontSize=.1,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=Ne,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=Hi,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(A){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(A):(this._isSyncing=!0,this.dispatchEvent(fG),_a({text:this.text,font:this.font,fontSize:this.fontSize||.1,letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF},I=>{this._isSyncing=!1,this._textRenderInfo=I,this.geometry.updateGlyphs(I.glyphBounds,I.glyphAtlasIndices,I.blockBounds,I.chunkedBounds,I.glyphColors);const g=this._queuedSyncs;g&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{g.forEach(C=>C&&C())})),this.dispatchEvent(qG),A&&A()})))}onBeforeRender(A,I,g,C,B,E){this.sync(),B.isTroikaTextMaterial&&this._prepareForRender(B),B._hadOwnSide=B.hasOwnProperty("side"),this.geometry.setSide(B._actualSide=B.side),B.side=oC}onAfterRender(A,I,g,C,B,E){B._hadOwnSide?B.side=B._actualSide:delete B.side}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}get material(){let A=this._derivedMaterial;const I=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Ho.clone());if((!A||A.baseMaterial!==I)&&(A=this._derivedMaterial=JG(I),I.addEventListener("dispose",function g(){I.removeEventListener("dispose",g),A.dispose()})),this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY){let g=A._outlineMtl;return g||(g=A._outlineMtl=Object.create(A,{id:{value:A.id+.1}}),g.isTextOutlineMaterial=!0,g.depthWrite=!1,g.map=null,A.addEventListener("dispose",function C(){A.removeEventListener("dispose",C),g.dispose()})),[g,A]}else return A}set material(A){A&&A.isTroikaTextMaterial?(this._derivedMaterial=A,this._baseMaterial=A.baseMaterial):this._baseMaterial=A}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(A){this.geometry.detail=A}get curveRadius(){return this.geometry.curveRadius}set curveRadius(A){this.geometry.curveRadius=A}get customDepthMaterial(){return de(this.material).getDepthMaterial()}get customDistanceMaterial(){return de(this.material).getDistanceMaterial()}_prepareForRender(A){const I=A.isTextOutlineMaterial,g=A.uniforms,C=this.textRenderInfo;if(C){const{sdfTexture:Q,blockBounds:o}=C;g.uTroikaSDFTexture.value=Q,g.uTroikaSDFTextureSize.value.set(Q.image.width,Q.image.height),g.uTroikaSDFGlyphSize.value=C.sdfGlyphSize,g.uTroikaSDFExponent.value=C.sdfExponent,g.uTroikaTotalBounds.value.fromArray(o),g.uTroikaUseGlyphColors.value=!I&&!!C.glyphColors;let t=0,e=0,a=0,s,D,c,r=0,n=0;if(I){let{outlineWidth:G,outlineOffsetX:S,outlineOffsetY:k,outlineBlur:M,outlineOpacity:K}=this;t=this._parsePercent(G)||0,e=Math.max(0,this._parsePercent(M)||0),s=K,r=this._parsePercent(S)||0,n=this._parsePercent(k)||0}else a=Math.max(0,this._parsePercent(this.strokeWidth)||0),a&&(c=this.strokeColor,g.uTroikaStrokeColor.value.set(c??Ne),D=this.strokeOpacity,D==null&&(D=1)),s=this.fillOpacity;g.uTroikaDistanceOffset.value=t,g.uTroikaPositionOffset.value.set(r,n),g.uTroikaBlurRadius.value=e,g.uTroikaStrokeWidth.value=a,g.uTroikaStrokeOpacity.value=D,g.uTroikaFillOpacity.value=s??1,g.uTroikaCurveRadius.value=this.curveRadius||0;let l=this.clipRect;if(l&&Array.isArray(l)&&l.length===4)g.uTroikaClipRect.value.fromArray(l);else{const G=(this.fontSize||.1)*100;g.uTroikaClipRect.value.set(o[0]-G,o[1]-G,o[2]+G,o[3]+G)}this.geometry.applyClipRect(g.uTroikaClipRect.value)}g.uTroikaSDFDebug.value=!!this.debugSDF,A.polygonOffset=!!this.depthOffset,A.polygonOffsetFactor=A.polygonOffsetUnits=this.depthOffset||0;const B=I?this.outlineColor||0:this.color;if(B==null)delete A.color;else{const Q=A.hasOwnProperty("color")?A.color:A.color=new $A;(B!==Q._input||typeof B=="object")&&Q.set(Q._input=B)}let E=this.orientation||Hi;if(E!==A._orientation){let Q=g.uTroikaOrient.value;E=E.replace(/[^-+xyz]/g,"");let o=E!==Hi&&E.match(/^([-+])([xyz])([-+])([xyz])$/);if(o){let[,t,e,a,s]=o;gE.set(0,0,0)[e]=t==="-"?1:-1,Yi.set(0,0,0)[s]=a==="-"?-1:1,Ke.lookAt(pG,gE.cross(Yi),Yi),Q.setFromMatrix4(Ke)}else Q.identity();A._orientation=E}}_parsePercent(A){if(typeof A=="string"){let I=A.match(/^(-?[\d.]+)%$/),g=I?parseFloat(I[1]):NaN;A=(isNaN(g)?0:g/100)*this.fontSize}return A}localPositionToTextCoords(A,I=new AI){I.copy(A);const g=this.curveRadius;return g&&(I.x=Math.atan2(A.x,Math.abs(g)-Math.abs(A.z))*Math.abs(g)),I}worldPositionToTextCoords(A,I=new AI){return gE.copy(A),this.localPositionToTextCoords(this.worldToLocal(gE),I)}raycast(A,I){const{textRenderInfo:g,curveRadius:C}=this;if(g){const B=g.blockBounds,E=C?ja():Va(),Q=E.geometry,{position:o,uv:t}=Q.attributes;for(let e=0;e<t.count;e++){let a=B[0]+t.getX(e)*(B[2]-B[0]);const s=B[1]+t.getY(e)*(B[3]-B[1]);let D=0;C&&(D=C-Math.cos(a/C)*C,a=Math.sin(a/C)*C),o.setXYZ(e,a,s,D)}Q.boundingSphere=this.geometry.boundingSphere,Q.boundingBox=this.geometry.boundingBox,E.matrixWorld=this.matrixWorld,E.material.side=this.material.side,WB.length=0,E.raycast(A,WB);for(let e=0;e<WB.length;e++)WB[e].object=this,I.push(WB[e])}}copy(A){const I=this.geometry;return super.copy(A),this.geometry=I,uG.forEach(g=>{this[g]=A[g]}),this}clone(){return new this.constructor().copy(this)}}Xa.forEach(i=>{const A="_private_"+i;Object.defineProperty(za.prototype,i,{get(){return this[A]},set(I){I!==this[A]&&(this[A]=I,this._needsSync=!0)}})});class mo extends LI{previousText="";text;mesh;constructor(A,I){super();const g=Object.assign({size:16},I);this.text=A,this.previousText=A,this.mesh=new za,this.mesh.text=A,this.mesh.fontSize=g.size,this.mesh.font="../../assets/fonts/m5x7.ttf",this.mesh.anchorY="middle",this.mesh.anchorX="center",this.mesh.color=16777215}setText(A){this.previousText=this.text,this.text=A,this.mesh.text=A}}mo.register();class kQ extends LI{relativePosition;center;constructor(A,I){super(),this.relativePosition=A??{x:0,y:0},this.center=I??{x:0,y:0}}}kQ.register();class $a extends Pg{constructor(){super(FI)}update(A){A.forEach(I=>{const g=I.getComponent(FI),C=I.getComponent(wI),B=I.getComponent(_g),E=I.getComponent(mo),Q=I.getComponent(kQ);if(g&&!g?.mesh.parent&&Q){const o=I.parent?.getComponent(FI),t=o?.mesh??uo,e=o?o?.width/2:Io.right,a=o?o?.height/2:Io.bottom;t.add(g.mesh),g.mesh.position.set(Q.relativePosition.x*e-g.width/2*Q.center.x,Q.relativePosition.y*a+g.height/2*Q.center.y,0),g.renderOrder=1,E&&(g.mesh.add(E.mesh),E.mesh.renderOrder=g.renderOrder+1)}g&&C&&(g.mesh.parent||cB.add(g.mesh),g.mesh.position.set(C.x,C.y,0)),B&&(g.mesh.rotation.z=B.rotation+Math.PI/2),g.mesh.renderOrder=g.renderOrder})}}const OB={orc:{tiles:{idle:pA.tiles.orc_warrior_idle_anim,run:pA.tiles.orc_warrior_run_anim},health:30},orcShaman:{tiles:{idle:pA.tiles.orc_shaman_idle_anim,run:pA.tiles.orc_shaman_run_anim},health:50},orcMasked:{tiles:{idle:pA.tiles.masked_orc_idle_anim,run:pA.tiles.masked_orc_run_anim},health:80},goblin:{tiles:{idle:pA.tiles.goblin_idle_anim,run:pA.tiles.goblin_run_anim},health:10},zombieBig:{tiles:{idle:pA.tiles.big_zombie_idle_anim,run:pA.tiles.big_zombie_run_anim},health:300}},Ue={elfFemale:{tiles:{idle:pA.tiles.elf_f_idle_anim,run:pA.tiles.elf_f_idle_anim}},elfMale:{tiles:{idle:pA.tiles.elf_m_idle_anim,run:pA.tiles.elf_m_run_anim}},wizardFemale:{tiles:{idle:pA.tiles.wizzard_f_idle_anim,run:pA.tiles.wizzard_f_run_anim}},wizardMale:{tiles:{idle:pA.tiles.wizzard_m_idle_anim,run:pA.tiles.wizzard_m_run_anim}},knightFemale:{tiles:{idle:pA.tiles.knight_f_idle_anim,run:pA.tiles.knight_f_run_anim}},knightMale:{tiles:{idle:pA.tiles.knight_m_idle_anim,run:pA.tiles.knight_m_run_anim}},lizardFemale:{tiles:{idle:pA.tiles.lizard_f_idle_anim,run:pA.tiles.lizard_f_run_anim}},lizardMale:{tiles:{idle:pA.tiles.lizard_m_idle_anim,run:pA.tiles.lizard_m_run_anim}}},mi={arrow:{tile:pA.tiles.weapon_arrow,speed:5e3,damage:10},fireBall:{tile:pA.tiles.flame,speed:3e3,damage:20}},TA={orbiter:"orbiter",shooter:"shooter",targeter:"targeter",toucher:"toucher"},Je={knife:{tile:pA.tiles.weapon_knife,damage:5,behaviors:[TA.orbiter,TA.toucher]},swordOld:{tile:pA.tiles.weapon_rusty_sword,damage:7,behaviors:[TA.orbiter,TA.toucher]},sword:{tile:pA.tiles.weapon_regular_sword,damage:10,behaviors:[TA.orbiter,TA.toucher]},swordGem:{tile:pA.tiles.weapon_red_gem_sword,damage:15,behaviors:[TA.orbiter,TA.toucher]},hammerLong:{tile:pA.tiles.weapon_big_hammer,damage:15,behaviors:[TA.orbiter,TA.toucher]},hammer:{tile:pA.tiles.weapon_hammer,damage:15,behaviors:[TA.orbiter,TA.toucher]},club:{tile:pA.tiles.weapon_baton_with_spikes,damage:10,behaviors:[TA.orbiter,TA.toucher]},mace:{tile:pA.tiles.weapon_mace,damage:15,behaviors:[TA.orbiter,TA.toucher]},katana:{tile:pA.tiles.weapon_katana,damage:5,behaviors:[TA.orbiter,TA.toucher]},swordSaw:{tile:pA.tiles.weapon_saw_sword,damage:10,behaviors:[TA.orbiter,TA.toucher]},swordAnime:{tile:pA.tiles.weapon_anime_sword,damage:20,behaviors:[TA.orbiter,TA.toucher]},hatchet:{tile:pA.tiles.weapon_axe,damage:10,behaviors:[TA.orbiter,TA.toucher]},machete:{tile:pA.tiles.weapon_machete,damage:15,behaviors:[TA.orbiter,TA.toucher]},cleaver:{tile:pA.tiles.weapon_cleaver,damage:15,behaviors:[TA.orbiter,TA.toucher]},rapier:{tile:pA.tiles.weapon_duel_sword,damage:10,behaviors:[TA.orbiter,TA.toucher]},swordKnight:{tile:pA.tiles.weapon_knight_sword,damage:15,behaviors:[TA.orbiter,TA.toucher]},swordGolden:{tile:pA.tiles.weapon_golden_sword,damage:15,behaviors:[TA.orbiter,TA.toucher]},swordGoldenBig:{tile:pA.tiles.weapon_lavish_sword,damage:15,behaviors:[TA.orbiter,TA.toucher]},staff:{tile:pA.tiles.weapon_red_magic_staff,damage:15,behaviors:[TA.orbiter,TA.shooter],projectile:mi.fireBall,spread:.5,projectilesNb:3},staffGem:{tile:pA.tiles.weapon_green_magic_staff,damage:15,behaviors:[TA.orbiter,TA.shooter],projectile:mi.fireBall},bow:{tile:pA.tiles.weapon_bow,damage:15,behaviors:[TA.targeter,TA.orbiter,TA.shooter],projectile:mi.arrow}};class tQ extends LI{lightId=null;color;distance;constructor(A=1118481,I=500){super(),this.color=A,this.distance=I}}tQ.register();const LG=i=>{const A=new ZI;A.addComponent(new wI(i.x,i.y));const I=pA.tiles.flame_brasier;return A.addComponent(new FI(I)),A.addComponent(new Ng({default:I})),A.addComponent(new tQ(new $A("hsl(20, 20%, 15%)"),500)),A},YG=()=>{const i=new ZI,A=new wI(0,0);i.addComponent(A);const I=Math.floor(qg.right*2.5/16)*16,g=Math.floor(qg.top*2.5/16)*16,C=oQ(I,g),B=[[pA.tiles.floor_1,10],[pA.tiles.floor_2,1],[pA.tiles.floor_3,1],[pA.tiles.floor_4,1],[pA.tiles.floor_5,1],[pA.tiles.floor_6,1],[pA.tiles.floor_7,1],[pA.tiles.floor_8,1]],E=B.reduce((t,e)=>t+e[1],0),Q=B.flatMap(([t,e])=>new Array(e).fill(t));for(let t=0;t<Math.ceil(I/16)*16;t+=16)for(let e=0;e<Math.ceil(g/16)*16;e+=16){const a=Q[Math.floor(E*Math.random())];C.drawImage(a.buffer.canvas,t,e)}for(let t=0;t<I;t+=256)for(let e=0;e<g;e+=256)i.addChildren(LG({x:t-I/2,y:e-g/2}));const o=new FI(new lQ({buffer:C}),{renderOrder:0});return eI.eventBus.subscribe(ug.CAMERAMOVE,({x:t,y:e})=>{o.texture.offset.x=t/o.width,o.texture.offset.y=e/o.height,A.x=t,A.y=e}),i.addComponent(o),i};class GB extends LI{target=null;targetedEnemy=null;distanceToTarget;constructor(A,I){super(),this.distanceToTarget=I??0,typeof A=="string"?this.targetedEnemy=A:this.target=A,eI.eventBus.subscribe(ug.DELETEENTITY,g=>{g.id==this.targetedEnemy&&(this.targetedEnemy=null)})}}GB.register();class xo extends LI{constructor(){super()}}xo.register();const CI={ENEMY:2,XP:4,WEAPON:8,SENSOR:16,TRAP:32,PLAYER:64,POTION:128};class ME extends LI{projectile;timer=0;delay=20;spread;range;projectilesNb;constructor(A){super(),this.projectile=A.projectile,this.projectilesNb=A.projectilesNb??1,this.spread=A.spread??0,this.range=A.range??60}}ME.register();const HG=(i,A)=>{const I=new ZI,g=A.getComponent(wI),C=A.getComponent(FI),B=i.tile;for(let Q of i.behaviors){const o={[TA.orbiter]:new mE("revolute",(B.height+C.height)/2,A),[TA.targeter]:new GB(CI.ENEMY),[TA.shooter]:new ME(i),[TA.toucher]:new fC(i.damage,[CI.ENEMY])}[Q];I.addComponent(o)}I.addComponent(new xI({moveForce:10,lock:!0},[{width:B.width,height:B.height,contact:!0,sensor:!0,mass:1,group:CI.WEAPON,canCollideWith:[CI.ENEMY]}])),I.addComponent(new FI(B));const E=i.behaviors.includes(TA.targeter)?0:1;return I.addComponent(new _g(0,E)),I.addComponent(new wI(g.x,g.y)),I},pe=(i,A,I)=>{const g=new ZI;return g.addComponent(new FI(i.tiles.idle)),g.addComponent(new tQ(new $A("hsl(0,0%,5%)"),1e3)),g.addComponent(new wB(200,CI.PLAYER)),g.addComponent(new Ng(i.tiles)),A&&g.addComponent(new GB(A.id,50)),g.addComponent(new xI({moveForce:100},[{width:i.tiles.idle.width,height:i.tiles.idle.height,contact:!0,group:CI.PLAYER,canCollideWith:[CI.ENEMY,CI.TRAP,CI.POTION]},{width:100,height:100,contact:!0,sensor:!0,group:CI.SENSOR,canCollideWith:[CI.XP]}])),g.addComponent(new wI(0,0)),A||(g.addComponent(new Yo),g.addComponent(new Lo)),g.addComponent(new xo),g.addChildren(HG(I,g)),g},mG=({x:i,y:A})=>{const I=new ZI,g=pA.tiles.flask_big_green;return I.addComponent(new FI(g)),I.addComponent(new xI({type:"fixed"},[{width:g.width,height:g.height,sensor:!1,contact:!0,group:CI.POTION,canCollideWith:[CI.PLAYER]}])),I.addComponent(new fC(-200,[CI.PLAYER],1)),I.addComponent(new wI(i,A)),I},xG=({x:i,y:A})=>{const I=new ZI,g=pA.tiles.floor_spikes_anim;I.addComponent(new FI(g,{renderOrder:1})),I.addComponent(new Ng({idle:g})),I.addComponent(new xI({type:"fixed"},[{width:g.width,height:g.height,sensor:!0,contact:!0,group:CI.TRAP,canCollideWith:[CI.PLAYER,CI.ENEMY]}])),I.addComponent(new wI(i,A)),I.addComponent(new fC(20,[CI.PLAYER,CI.ENEMY]))};class As extends LI{parentId;constructor(A,I=1){super();const g=C=>{if(this.parentId!=C.id)return;eI.eventBus.unsubscribe(ug.DELETEENTITY,g);const B=C.getComponent(wI);for(let E=0;E<I;E++)A().addComponent(new wI(B.x,B.y))};eI.eventBus.subscribe(ug.DELETEENTITY,g)}bind(A){this.parentId=A}}As.register();class FE extends LI{amount;constructor(A=1){super(),this.amount=A}}FE.register();const TG=()=>{const i=new ZI;return i.addComponent(new FI(pA.tiles.xp,{renderOrder:1,scale:.5})),i.addComponent(new xI({moveForce:1e4},[{width:2,height:2,contact:!0,group:CI.XP,canCollideWith:[CI.SENSOR],mass:1}])),i.addComponent(new FE(1)),i},bG=(i,A)=>{const I=new ZI,g=Object.values(i.tiles)[0];return I.addComponent(new FI(g)),I.addComponent(new Ng(i.tiles)),I.addComponent(new fC(1,[CI.PLAYER])),I.addComponent(new wB(i.health,CI.ENEMY)),I.addComponent(new As(TG)),I.addComponent(new wI(A.x,A.y)),I.addComponent(new GB(CI.PLAYER)),I.addComponent(new xI({moveForce:40},[{width:g.width,height:g.height,contact:!1,group:CI.ENEMY,canCollideWith:[CI.PLAYER,CI.TRAP,CI.WEAPON]}])),I},vG=(i,A)=>{for(let I=0;I<A;I++){const g=Math.random()*Math.PI*2,C=(Math.cos(g)*qg.right+qg.position.x)*(Math.random()*1.2+1),B=Math.sin(g)*qg.top+qg.position.y*(Math.random()*1.2+1);bG(i,{x:C,y:B})}},WG=function*([i,A,I]){let g=0,C=0;for(;g<I;)C===0&&(vG(i,A),g++),C=(C+1)%300,yield;yield},OG=(...i)=>{tB.add(function*(){for(let A of i)yield*WG(A)})};class _G extends Pg{constructor(){super(tQ)}update(A){A.forEach(I=>{const g=I.getComponent(tQ),C=I.getComponent(wI);if(!g.lightId&&C){const B=new $A(g.color),E=new sw(B,12,g.distance);E.position.set(0,0,15),cB.add(E),g.lightId=E.id}g.lightId&&C&&cB.getObjectById(g.lightId)?.position.set(C.x,C.y,15)})}}const PG=(i,A,I,g)=>{const C=new ZI;return C.addComponent(new FI(i.tile)),i.tile.frames>1&&C.addComponent(new Ng({idle:i.tile})),C.addComponent(new xI({moveForce:i.speed},[{mass:.1,group:CI.PLAYER,contact:!0,sensor:!0,canCollideWith:[CI.ENEMY],width:i.tile.width,height:i.tile.height}])),C.addComponent(new fC(i.damage,[CI.ENEMY],1)),C.addComponent(new wI(A.x,A.y)),C.addComponent(new _g(I,0)),tB.add(function*(){yield*Ta(g),C.destroy()}),C};class ZG extends Pg{constructor(){super(ME)}update(A){A.forEach(I=>{const g=I.getComponent(ME),C=I.getComponent(_g);g.timer++;const B=g.projectilesNb;if(g.delay<=g.timer){for(let E=0;E<B;E++){const Q=I.getComponent(wI),o=PG(g.projectile,{x:Q.x,y:Q.y},C.rotation-g.spread/2+C.rotation*E/g.projectilesNb/2,g.range),t=o.getComponent(Ng);t&&(t.selectedFrame=Math.floor(Math.random()*t.frames)),I.addChildren(o)}g.timer=0}for(let E of I.children){const Q=E.getComponent(xI),o=E.getComponent(_g),t=-Math.cos(o.rotation)*Q.moveForce,e=-Math.sin(o.rotation)*Q.moveForce;Q.body?.applyImpulse(new ao(t,e),!0)}})}}class VG extends Pg{constructor(){super(GB)}update(A){A.forEach(I=>{const g=I.parent?.getComponent(wI)??I.getComponent(wI),C=I.getComponent(GB),B=I.getComponent(mE),E=I.getComponent(xI);if(!C.targetedEnemy){const o=eI.getEntitiesAndComponents(wB).reduce(([t,e],[a,s])=>{if(s.type==C.target){const D=eI.getEntityById(a).getComponent(wI),c=Math.pow(D.x-g.x,2)+Math.pow(D.y-g.y,2);if(c<e)return[a,c];if(e==0)return[a,c]}return[t,e]},["",0])[0];o&&(C.targetedEnemy=o)}const Q=I.getComponent(_g);if(C.targetedEnemy){const t=eI.getEntityById(C.targetedEnemy).getComponent(wI),e=g.x-t.x,a=g.y-t.y;if(Math.sqrt(e**2+a**2)<C.distanceToTarget)return;const D=Math.atan2(a,e);if(B?.type=="revolute"){const c=Q.rotation,r=D-c;if(!Q)return;const n=.01;Math.abs(r)<=n?Q.angVel=0:Q.angVel=Math.sin(r)*4}else E.velociy.x=-Math.cos(D)*E.moveForce,E.velociy.y=-Math.sin(D)*E.moveForce}else Q&&(Q.angVel=0)})}}class jG extends Pg{constructor(){super(xo)}update(A){A.forEach(I=>{const g=I.getComponent(xI),C=I.getComponent(wI);g.contacts(B=>{if(B.getComponent(FE)){const Q=B.getComponent(xI),o=B.getComponent(wI),t=C.x-o.x,e=C.y-o.y,a={x:t>0?1:-1,y:e>0?1:-1},s=Math.sqrt(Math.pow(t,2)+Math.pow(e,2)),D=Q.moveForce*1/s;Q.body.applyImpulse({x:D*a.x,y:D*a.y},!0)}}),g.contacts(B=>{const E=B.getComponent(FE);E&&(B.destroy(),eI.eventBus.publish(ug.XP,E.amount))},CI.PLAYER)})}}const ag={xp:0,level:0,nextLevel:10},fe=pA.UI.XPBar,XG=pA.UI.XPFull,zG=()=>{const i=new ZI,A=new FI(fe.clone(),{renderOrder:100,scale:3});return eI.eventBus.subscribe(ug.XP,I=>{ag.xp+=I;const g=Math.floor(ag.xp/ag.nextLevel);if(g>0)for(let C=0;C<g;C++)ag.xp=ag.xp%ag.nextLevel,ag.nextLevel*=1.5,ag.level++;xa(A,fe,XG,ag.xp/ag.nextLevel)}),i.addComponent(A),i.addComponent(new kQ({x:1,y:1},{x:-1,y:-1})),i},$G=()=>{const i=new ZI;i.addComponent(new kQ({x:-1,y:-1},{x:-1,y:-1})),i.addComponent(new FI(pA.UI.box,{scale:1.5}));const A=i.addComponent(new mo(String(ag.level),{size:32}));return eI.eventBus.subscribe(ug.XP,()=>{A.setText(String(ag.level))}),i},Al=()=>{const i=new ZI;return i.addChildren($G()).addChildren(zG()),i};class Il{constructor(){const A=pe(Ue.knightFemale,!1,Je.swordKnight);pe(Ue.elfMale,A,Je.bow),YG(),Al(),OG([OB.goblin,20,5],[OB.orc,15,5],[OB.orcShaman,10,4],[OB.orcMasked,10,3],[OB.zombieBig,1,1]),mG({x:100,y:100}),xG({x:30,y:19})}update(){SC.getInput(HE)?.once&&lB.setState("levelUp"),gC.step(),eI.updateSystems()}render(){ma()}set(){$a.register(),bw.register(),lw.register(),Tw.register(),Sw.register(),jG.register(),_G.register(),ZG.register(),VG.register(),tB.resume()}unset(){tB.stop(),eI.unRegisterSystems()}}const gl=()=>{const i=new ZI;return i.addComponent(new FI(pA.UI.frame1,{renderOrder:100,scale:5})),i.addComponent(new kQ),i},Cl=()=>{const i=new ZI;return i.addChildren(gl()),i};class Bl{ui=null;construtor(){}update(){eI.updateSystems(),SC.getInput(HE)?.once&&lB.setState("run")}render(){ma()}set(){this.ui=Cl(),$a.register()}unset(){this.ui?.destroy(),eI.unRegisterSystems()}}await new Promise(i=>wG({font:"../assets/fonts/m5x7.ttf"},()=>i()));lB.addState("run",new Il);lB.addState("levelUp",new Bl);lB.setState("run");lB.start();