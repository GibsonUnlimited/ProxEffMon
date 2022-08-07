// ==UserScript==
// @name         ProxEffMonitor
// @namespace    http://tampermonkey.net/
// @version      0.91
// @description  Proximity Effect Monitor
// @author       rukis
// @match        *://*.sandbox-games.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* global Game */
// unchanged line structure to test fix the lint error
//'<img class="hud-craft-icon" src="'+asseList[1]+'">'+'<p class="hud-craft-amount">'+prox.Water_Drum.toString()+'</p>';

//Script Start with wrapper function
(function() {
    'use strict';
    let isLogging = false; //start with false to prevent the app from being stuck in the ON status
    let totUpdate = 0; //start with 0, avoids update loop
    let loaded = 0; //start with 0 to validate when game is loaded

    // look for the .hud and .bottom and if they exist, to update the status for loaded to be 1 and start the Proximity Effects Monitor
    new MutationObserver(function(mutations) {
        if (document.querySelector('.hud .bottom') && loaded == 0) {
            loaded = 1;
            Load_Proximity();
        }
    }).observe(document, {childList: true, subtree: true});

    //define  types of ProxEFF  that the monitor can detect
    const proxFX = ['Shady','Dirty','Salty','Sandy'];
    const proxE// ==UserScript==
// @name         ProxEffMonitor
// @namespace    http://tampermonkey.net/
// @version      0.91
// @description  Proximity Effect Monitor
// @author       rukis
// @match        *://*.sandbox-games.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* global Game */
// unchanged line structure to test fix the lint error

//Script Start with wrapper function
(function() {
    'use strict';
    let isLogging = false; //start with false to prevent the app from being stuck in the ON status
    let totUpdate = 0; //start with 0, avoids update loop
    let loaded = 0; //start with 0 to validate when game is loaded

    // look for the .hud and .bottom and if they exist, to update the status for loaded to be 1 and start the Proximity Effects Monitor
    new MutationObserver(function(mutations) {
        if (document.querySelector('.hud .bottom') && loaded == 0) {
            loaded = 1;
            Load_Proximity();
        }
    }).observe(document, {childList: true, subtree: true});

    //define  types of ProxEFF  that the monitor can detect
    const proxFX = ['Shady','Dirty','Salty','Sandy'];
    const proxFX_Zh = ['Shady','Dirty','Salty','Sandy'];

    // define poassive effects that the monitor can detect
    const passFX = ['Water','Water_Drum','Energy','Crude_Oil','Wheat','Sugarcane','Cotton'];

    // define the asset list the icons and there location
    const asseList = ['https://townstar.sandbox-games.com/files/assets/24496953/1/icon_water.png',
                      'https://townstar.sandbox-games.com/files/assets/32374821/1/icon_waterDrum.png',
                      'https://townstar.sandbox-games.com/files/assets/24496973/1/icon_energy.png',
                      'https://townstar.sandbox-games.com/files/assets/24496975/1/icon_crudeOil.png',
                      'https://townstar.sandbox-games.com/files/assets/24496952/1/icon_wheat.png',
                      'https://townstar.sandbox-games.com/files/assets/24496957/1/icon_sugarcane.png',
                      'https://townstar.sandbox-games.com/files/assets/24496930/1/icon_cotton.png'
                     ];

    //define the starting point election location
    let X = -1;
    let Z = -1;

    //Loader function
    async function Load_Proximity(){
        if(isLogging) { //detect if Logging is enabled
            showFrequency();
        }

        //start creating the display on the hud
        //create a div  Hud
        let Hud = document.createElement('div');
        Hud.style = 'margin-left:10px'
        
        //create another div t0psProxHud
        let t0psProxHud = document.createElement('div');
        
        //append some attributes
        t0psProxHud.id = 't0wn0Ps-tophud';
        t0psProxHud.style = 'width:60%; text-align:center';
        t0psProxHud.classList.add('bank');
        t0psProxHud.innerHTML = "<b>P</b>rox<b>E</b>ff<b>M</b>on";

        //append the newly created element and its attributes to Hud
        Hud.appendChild(t0psProxHud);

        //look for the .hud and .bottom classes
        let HudBottom = document.querySelector(".hud .bottom");

        //insert the proxEffMon after the bank, and before .hud and .bottom
        HudBottom.insertBefore(Hud, HudBottom.querySelector('.left').nextSibling);

        //typical js fashion. define i=0
        var i = 0;

        // start measuring the proxEff's
        for(i = 0;i < proxFX.length; i++) {

            //create a new element to display the effects
            let Ele = document.createElement('div');

            // begin adding the appropriate attributes to the new element
            Ele.id = 'prox-'+proxFX[i];
            Ele.style = 'width:40%; margin-left:4px';
            Ele.classList.add('bank', 'contextual');
            Ele.innerHTML = proxFX_Zh[i]+': 0';
            Ele.style.display = 'none';

            //append to the Hud
            Hud.appendChild(Ele);
        }

        //create the No ProxEff
        let EleProxNone = document.createElement('div');

        //define some attributes
        EleProxNone.id = 'prox-none';
        EleProxNone.style = 'width:40%; margin-left:4px';
        EleProxNone.classList.add('bank', 'contextual');
        EleProxNone.innerHTML = 'None';
        EleProxNone.style.display='none';

        //append this to the Hud
        Hud.appendChild(EleProxNone);

        //create a new section for passive
        let topPassHud = document.createElement('div');

        //add attributes to the passive section
        topPassHud.id = 'prox-passtophud';
        topPassHud.style = 'width:40%; margin-left:4px';
        topPassHud.classList.add('bank');
        topPassHud.innerHTML = '<b>P</b>assive <b>E</b>:ffects';

        //append to Hud
        Hud.appendChild(topPassHud);

        //start counting the passive effects
        for(i = 0;i < passFX.length; i++) {

            //create a section to display passive affects
            let Ele = document.createElement('div');

            // add attributes to the passive affect
            Ele.id = 'prox-'+passFX[i];
            Ele.style = 'width:40%; margin-left:4px';
            Ele.classList.add('bank', 'contextual');
            Ele.innerHTML = `<img class="hud-craft-icon" src="${asseList[i]}"><p class="hud-craft-amount">0</p>`;
            Ele.style.display = 'none';

            //append to the HGud
            Hud.appendChild(Ele);
        }

        //create a new div for passive none
        let ElePassNone = document.createElement('div');

        //add attributes for passive effects being 0
        ElePassNone.id = 'prox-passnone';
        ElePassNone.style = 'width:40%; margin-left:4px';
        ElePassNone.classList.add('bank', 'contextual');
        ElePassNone.innerHTML = 'None';
        ElePassNone.style.display='none';

        //append element and attributes to the Hud
        Hud.appendChild(ElePassNone);

        //call the function Show_Prox
        Show_Proximity();
    }

    //function to clear the Hud
    function Clear_Hud() {

        //define i
        var i = 0;

        //measure the proxEff's
        for(i = 0;i < proxFX.length; i++) {
            document.getElementById('prox-'+proxFX[i]).style.display = 'none';
        }

        //is the tile proxEff free
        document.getElementById('prox-none').style.display = 'none';
        for(i =0;i < passFX.length; i++) {
            document.getElementById('prox-'+passFX[i]).style.display = 'none';
        }

        //if it is then say none
        document.getElementById('prox-passnone').style.display = 'none';
    }


    //function to show the proximity effects
    function Show_Proximity() {

        //define x and z as the location variable for  coordinates
        let x=Game.town.selectedObject.townX;
        let z=Game.town.selectedObject.townZ;

        // checking if the selection is valid
        if(x == X && z == Z) {
            setTimeout(Show_Proximity, 500);
            return;
        }

        //define x and z
        X = x;
        Z = z;

        //determine status of logging
        if(isLogging){

            //if logging write to the consolethat we are..
            console.log('proxEffMonitor - Logging.');
            totUpdate++;
        }

        //clearn the hud
        Clear_Hud();

        //define variable for pass and prox effects
        let prox = Game.town.GetProximityEffects(x,z);
        let hasProx = 0;
        let hasPass = 0;

////////////////////////////////////////  Proximety Effect   /////  Passive Effects/////////////////////////////////////////////
////////////////////////////////////////   Bad    Effects    /////    Good Effects/////////////////////////////////////////////

        //calculate all Shady Effects
        if(prox.Shady != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Shady').innerHTML = 'Shady: '+prox.Shady.toString();
            document.getElementById('prox-Shady').style.display = '';
        }

        //calculate all dirty effefcts
        if(prox.Dirty != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Dirty').innerHTML = 'Dirty: '+prox.Dirty.toString();
            document.getElementById('prox-Dirty').style.display = '';
        }

        // calculate all dirty effects
        if(prox.Salty != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Salty').innerHTML = 'Salty: '+prox.Salty.toString();
            document.getElementById('prox-Salty').style.display = '';
        }
        // calculate sandy effects
        if(prox.Sandy != undefined) {
           
     n      //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Sandy').innerHTML = 'Sandy: '+prox.Sandy.toString();
            document.getElementById('prox-Sandy').style.display = '';
        }

        //calculate water effects
        if(prox.Water != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            document.getElementById('prox-Water').innerHTML = `<img class="hud-craft-icon" src="${asseList[0]}"><p class="hud-craft-amount">${prox.Water}()</p>`;
            document.getElementById('prox-Water').style.display = '';
        }

        // calculate water effects
        if(prox.Water_Drum != undefined) {

           //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasPass = 1;
            document.getElementById('prox-Water_Drum').innerHTML = `<img class="hud-craft-icon" src="${asseList[1]}"><p class="hud-craft-amount">${prox.Water_Drum}</p>`;
            document.getElementById('prox-Water_Drum').style.display = '';
        }

        // calculate energy effects
        if(prox.Energy != undefined) {
            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasPass = 1;
            document.getElementById('prox-Energy').innerHTML = `<img class="hud-craft-icon" src="${asseList[2]}><p class="hud-craft-amount">${prox.Energy}</p>`;
            document.getElementById('prox-Energy').style.display = '';
        }

        // calculate crude-oil effects
        if(prox.Crude_Oil != undefined) {
            hasPass = 1;
            document.getElementById('prox-Crude_Oil').innerHTML = `<img class="hud-craft-icon" src="${asseList[3]}"><p class="hud-craft-amount">${prox.Crude_Oil}</p>`;
            document.getElementById('prox-Crude_Oil').style.display = '';
        }
        // calculate wheat effects
        if(prox.Wheat != undefined) {
            hasPass = 1;
            document.getElementById('prox-Wheat').innerHTML = `<img class="hud-craft-icon" src="${asseList[4]}"><p class="hud-craft-amount">${prox.Wheat}</p>`;
            document.getElementById('prox-Wheat').style.display = '';
        }
        // calculate sugarcane effects
        if(prox.Sugarcane != undefined) {
            hasPass = 1;
            document.getElementById('prox-Sugarcane').innerHTML = `<img class="hud-craft-icon" src="${asseList[5]}"><p class="hud-craft-amount">${prox.Sugarcane}</p>`;
            document.getElementById('prox-Sugarcane').style.display = '';
        }
        // calculate cotton effects
        if(prox.Cotton != undefined) {
            hasPass = 1;
            document.getElementById('prox-Cotton').innerHTML = `<img class="hud-craft-icon" src="${asseList[6]}"><p class="hud-craft-amount">${prox.Cotton}</p>`;
            document.getElementById('prox-Cotton').style.display = '';
        }

        // calculate if no proxEffects
        if(hasProx == 0) {
            document.getElementById('prox-none').style.display = '';
        }

        // calculate dirty passEffects
        if(hasPass == 0) {
            document.getElementById('prox-passnone').style.display = '';
        }
        setTimeout(Show_Proximity, 500);
    }

    //frequency to update
    function showFrequency() {
        console.log("Update:"+((totUpdate/10).toString())+"/s");
        //
        totUpdate = 0;
        setTimeout(showFrequency,10000);
    }
    //create a waitFor function that waits when needed
    async function waitForSelecting() {
        while (Game.town.selectedObject.townX == undefined) {
            await new Promise( resolve => requestAnimationFrame(resolve) )
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    //script is complete. Closing wrapper function
})();

//scriptENDFX_Zh = ['Shady','Dirty','Salty','Sandy'];

    // define poassive effects that the monitor can detect
    const passFX = ['Water','Water_Drum','Energy','Crude_Oil','Wheat','Sugarcane','Cotton'];

    // define the asset list the icons and there location
    const asseList = ['https://townstar.sandbox-games.com/files/assets/24496953/1/icon_water.png',
                      'https://townstar.sandbox-games.com/files/assets/32374821/1/icon_waterDrum.png',
                      'https://townstar.sandbox-games.com/files/assets/24496973/1/icon_energy.png',
                      'https://townstar.sandbox-games.com/files/assets/24496975/1/icon_crudeOil.png',
                      'https://townstar.sandbox-games.com/files/assets/24496952/1/icon_wheat.png',
                      'https://townstar.sandbox-games.com/files/assets/24496957/1/icon_sugarcane.png',
                      'https://townstar.sandbox-games.com/files/assets/24496930/1/icon_cotton.png'
                     ];

    //define the starting point election location
    let X = -1;
    let Z = -1;

    //Loader function
    async function Load_Proximity(){
        if(isLogging) { //detect if Logging is enabled
            showFrequency();
        }

        //start creating the display on the hud
        //create a div  Hud
        let Hud = document.createElement('div');
        Hud.style = 'margin-left:10px'
        
        //create another div t0psProxHud
        let t0psProxHud = document.createElement('div');

        //append some attributes
        t0psProxHud.id = 't0wn0Ps-tophud';
        t0psProxHud.style = 'width:60%; text-align:center';
        t0psProxHud.classList.add('bank');
        t0psProxHud.innerHTML = "<b>P</b>rox<b>E</b>ff<b>M</b>on";

        //append the newly created element and its attributes to Hud
        Hud.appendChild(t0psProxHud);

        //look for the .hud and .bottom classes
        let HudBottom = document.querySelector(".hud .bottom");

        //insert the proxEffMon after the bank, and before .hud and .bottom
        HudBottom.insertBefore(Hud, HudBottom.querySelector('.left').nextSibling);

        //typical js fashion. define i=0
        var i = 0;

        // start measuring the proxEff's
        for(i = 0;i < proxFX.length; i++) {

            //create a new element to display the effects
            let Ele = document.createElement('div');

            // begin adding the appropriate attributes to the new element
            Ele.id = 'prox-'+proxFX[i];
            Ele.style = 'width:40%; margin-left:4px';
            Ele.classList.add('bank', 'contextual');
            Ele.innerHTML = proxFX[i]+': 0';
            Ele.style.display = 'none';

            //append to the Hud
            Hud.appendChild(Ele);
        }

        //create the No ProxEff
        let EleProxNone = document.createElement('div');

        //define some attributes
        EleProxNone.id = 'prox-none';
        EleProxNone.style = 'width:40%; margin-left:4px';
        EleProxNone.classList.add('bank', 'contextual');
        EleProxNone.innerHTML = 'None';
        EleProxNone.style.display='none';
        //append this to the Hud
        Hud.appendChild(EleProxNone);

        //create a new section for passive
        let topPassHud = document.createElement('div');

        //add attributes to the passive section
        topPassHud.id = 'prox-passtophud';
        topPassHud.style = 'width:40%; margin-left:4px';
        topPassHud.classList.add('bank');
        topPassHud.innerHTML = '<b>P</b>assive <b>E</b>:ffects';

        //append to Hud
        Hud.appendChild(topPassHud);

        //start counting the passive effects
        for(i = 0;i < passFX.length; i++) {

            //create a section to display passive affects
            let Ele = document.createElement('div');

            // add attributes to the passive affect
            Ele.id = 'prox-'+passFX[i];
            Ele.style = 'width:40%; margin-left:4px';
            Ele.classList.add('bank', 'contextual');
            Ele.innerHTML = `<img class="hud-craft-icon" src="${asseList[i]}"><p class="hud-craft-amount">0</p>`;
            Ele.style.display = 'none';

            //append to the HGud
            Hud.appendChild(Ele);
        }

        //create a new div for passive none
        let ElePassNone = document.createElement('div');

        //add attributes for passive effects being 0
        ElePassNone.id = 'prox-passnone';
        ElePassNone.style = 'width:40%; margin-left:4px';
        ElePassNone.classList.add('bank', 'contextual');
        ElePassNone.innerHTML = 'None';
        ElePassNone.style.display='none';

        //append element and attributes to the Hud
        Hud.appendChild(ElePassNone);

        //call the function Show_Prox
        Show_Proximity();
    }

    //function to clear the Hud
    function Clear_Hud() {

        //define i
        var i = 0;

        //measure the proxEff's
        for(i = 0;i < proxFX.length; i++) {
            document.getElementById('prox-'+proxFX[i]).style.display = 'none';
        }

        //is the tile proxEff free
        document.getElementById('prox-none').style.display = 'none';
        for(i =0;i < passFX.length; i++) {
            document.getElementById('prox-'+passFX[i]).style.display = 'none';
        }

        //if it is then say none
        document.getElementById('prox-passnone').style.display = 'none';
    }

    //function to show the proximity effects
    function Show_Proximity() {

        //define x and z as the location variable for  coordinates
        let x=Game.town.selectedObject.townX;
        let z=Game.town.selectedObject.townZ;

        // checking if the selection is valid
        if(x == X && z == Z) {
            setTimeout(Show_Proximity, 500);
            return;
        }

        //define x and z
        X = x;
        Z = z;

        //determine status of logging
        if(isLogging){

            //if logging write to the consolethat we are..
            console.log('proxEffMonitor - Logging.');
            totUpdate++;
        }

        //clearn the hud
        Clear_Hud();

        //define variable for pass and prox effects
        let prox = Game.town.GetProximityEffects(x,z);
        let hasProx = 0;
        let hasPass = 0;

//////////////////////  Proximety Effect   //////  Passive Effects  ////////////////////////////////////////////
//////////////////////   Bad    Effects    //////   Good Effects    ////////////////////////////////////////////

        //calculate all Shady Effects
        if(prox.Shady != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Shady').innerHTML = 'Shady: '+prox.Shady.toString();
            document.getElementById('prox-Shady').style.display = '';
        }

        //calculate all dirty effefcts
        if(prox.Dirty != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Dirty').innerHTML = 'Dirty: '+prox.Dirty.toString();
            document.getElementById('prox-Dirty').style.display = '';
        }

        // calculate all dirty effects
        if(prox.Salty != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Salty').innerHTML = 'Salty: '+prox.Salty.toString();
            document.getElementById('prox-Salty').style.display = '';
        }
        // calculate sandy effects
        if(prox.Sandy != undefined) {
            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasProx = 1;
            document.getElementById('prox-Sandy').innerHTML = 'Sandy: '+prox.Sandy.toString();
            document.getElementById('prox-Sandy').style.display = '';
        }

        //calculate water effects
        if(prox.Water != undefined) {

            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            document.getElementById('prox-Water').innerHTML = `<img class="hud-craft-icon" src="${asseList[0]}"><p class="hud-craft-amount">${prox.Water}()</p>`;
            document.getElementById('prox-Water').style.display = '';
        }

        // calculate water effects
        if(prox.Water_Drum != undefined) {
            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasPass = 1;
            document.getElementById('prox-Water_Drum').innerHTML = `<img class="hud-craft-icon" src="${asseList[1]}"><p class="hud-craft-amount">${prox.Water_Drum}</p>`;
            document.getElementById('prox-Water_Drum').style.display = '';
        }

        // calculate energy effects
        if(prox.Energy != undefined) {
            //define passive effect vs  proximity effect,  variable set to 1 now that it has effects
            hasPass = 1;
            document.getElementById('prox-Energy').innerHTML = `<img class="hud-craft-icon" src="${asseList[2]}><p class="hud-craft-amount">${prox.Energy}</p>`;
            document.getElementById('prox-Energy').style.display = '';
        }

        // calculate crude-oil effects
        if(prox.Crude_Oil != undefined) {
            hasPass = 1;
            document.getElementById('prox-Crude_Oil').innerHTML = `<img class="hud-craft-icon" src="${asseList[3]}"><p class="hud-craft-amount">${prox.Crude_Oil}</p>`;
            document.getElementById('prox-Crude_Oil').style.display = '';
        }
        
        // calculate wheat effects
        if(prox.Wheat != undefined) {
            hasPass = 1;
            document.getElementById('prox-Wheat').innerHTML = `<img class="hud-craft-icon" src="${asseList[4]}"><p class="hud-craft-amount">${prox.Wheat}</p>`;
            document.getElementById('prox-Wheat').style.display = '';
        }
        
        // calculate sugarcane effects
        if(prox.Sugarcane != undefined) {
            hasPass = 1;
            document.getElementById('prox-Sugarcane').innerHTML = `<img class="hud-craft-icon" src="${asseList[5]}"><p class="hud-craft-amount">${prox.Sugarcane}</p>`;
            document.getElementById('prox-Sugarcane').style.display = '';
        }
        
        // calculate cotton effects
        if(prox.Cotton != undefined) {
            hasPass = 1;
            document.getElementById('prox-Cotton').innerHTML = `<img class="hud-craft-icon" src="${asseList[6]}"><p class="hud-craft-amount">${prox.Cotton}</p>`;
            document.getElementById('prox-Cotton').style.display = '';
        }

        // calculate if no proxEffects
        if(hasProx == 0) {
            document.getElementById('prox-none').style.display = '';
        }

        // calculate dirty passEffects
        if(hasPass == 0) {
            document.getElementById('prox-passnone').style.display = '';
        }
        setTimeout(Show_Proximity, 500);
    }

    //frequency to update
    function showFrequency() {
        console.log("Update:"+((totUpdate/10).toString())+"/s");
        
        //
        totUpdate = 0;
        setTimeout(showFrequency,10000);
    }
    //create a waitFor function that waits when needed
    async function waitForSelecting() {
        while (Game.town.selectedObject.townX == undefined) {
            await new Promise( resolve => requestAnimationFrame(resolve) )
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    //script is complete. Closing wrapper function
})();

//scriptEND
