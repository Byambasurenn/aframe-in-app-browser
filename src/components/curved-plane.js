/* global AFRAME */
/**
 * A curved-plane component using a companion app based in electron.
 * @namespace aframe-in-app-browser
 * @component curved-plane
 * @author Shane Harris
 */

module.exports = AFRAME.registerComponent('curved-plane', {
    schema: {
    },
    init(){
        let mesh = this.el.getObject3D('mesh');
        let width = this.el.getAttribute('width');
        let height = this.el.getAttribute('height');
        let browser_pane = new THREE.PlaneGeometry(width, height, 15, 1);
        //-------------------------------------------------------------------------------------------------------------------------------------
        // let browser_pane = new THREE.SphereGeometry(2.5, 16, 16, 0, 3.1);
        // let modelLoader = new THREE.GLTFLoader();
        // modelLoader.load( 'https://raw.githubusercontent.com/Byambasurenn/TestARyocvx7/main/cubeflip.gltf', function ( gltf ) {
            
        // }, undefined, function ( error ) {        
        //     console.error( error );        
        // } );
        //--------------------------------------------------------------------------------------------------------------------------------------
        let curve = new THREE.CubicBezierCurve3(
            browser_pane.vertices[0],
            // new THREE.Vector3(0.375*width, 0, -0.06*width ),
            // new THREE.Vector3(0.625*width, 0, -0.06*width ),
            new THREE.Vector3(0.001*width, 0, -1*width ),
            new THREE.Vector3(0.625*width, 0, -1*width ),            
            browser_pane.vertices[(browser_pane.vertices.length/2) - 1]
        );
        let planePoints = curve.getPoints(Math.abs(browser_pane.vertices.length/2)-1);
        for (let edgeI = 1; edgeI < 100; edgeI++) {
            for (let pointI = 0; pointI < planePoints.length; pointI++) {
                browser_pane.vertices[(edgeI === 2 ? planePoints.length + pointI : pointI)].z = planePoints[pointI].z;
            }
        }
        //browser_pane.rotation.set(0,0,15);
        mesh.geometry = browser_pane;
    }
});