"use strict"

window.onload = function() {

    const canv = document.getElementById('canvas');
    const ctx = canv.getContext('2d');

    document.addEventListener("click", clickeTaste);
    setInterval(game, 100);

    // Höhe TastenContainer für grid
    let breite_img = document.getElementById('img-tasten').clientWidth;
    let hoehe_img = breite_img * 0.812;
    document.getElementById('tasten-container').style.height = `${hoehe_img}px`;

    let snake_pos_x = 0;
    let snake_pos_y = 0;
    let pixel = 10;
    let futter_x = 10;
    let futter_y = 10;
    let x_bewegung = 0;
    let y_bewegung = 0;
    let schlange = [];
    let laenge = 5;
    let pix_zu_width = canv.width / 100;
    let direction;
    let punkte = 0;
    let record = window.localStorage.getItem("key");
    document.getElementById('rekord').innerText = `Highscore: ${record}`;

    snake_pos_x = pix_zu_width * pixel / 2;
    snake_pos_y = pix_zu_width * pixel / 2;

    function game() {

        snake_pos_x += x_bewegung;
        snake_pos_y += y_bewegung;

        // Spielfeldsprung
        if(snake_pos_x < 0) {
            snake_pos_x = Math.round(ctx.canvas.width / pixel) - 1;
        }
        if(snake_pos_x > Math.round(ctx.canvas.width / pixel) - 1) {
            snake_pos_x = 0;
        }
        if(snake_pos_y < 0) {
            snake_pos_y = Math.round(ctx.canvas.height / pixel) - 1;
        }
        if(snake_pos_y > Math.round(ctx.canvas.height / pixel) - 1) {
            snake_pos_y = 0;
        }

        // Spielfeld zeichnen
        ctx.canvas.width = document.documentElement.clientWidth * 0.95;
        ctx.canvas.height = document.documentElement.clientHeight * 0.45;
        
        ctx.fillStyle = "transparent";
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height); 

        // Schlange zeichnen
        let r = 0;
        let g = 0;
        let b = 0; 
    
        for(let i = 0; i < schlange.length; i++) {

            r = r + 3;
            ctx.fillStyle = 'rgb(' +  r  + ', ' + g + ', ' + b +')'; 
            ctx.shadowColor = '#000';
            ctx.shadowBlur = 15;           
            ctx.fillRect(schlange[i].x*pixel, schlange[i].y*pixel, pixel, pixel);
        }

        // Check Kollision
        for(let i = 0; i < schlange.length; i++) {

            if(schlange[i].x == snake_pos_x && schlange[i].y == snake_pos_y) {
                laenge = 5;
                snake_pos_x = pix_zu_width * pixel / 2;
                snake_pos_y = pix_zu_width * pixel / 2;
                schlange = [];
                punkte = 0;
                document.getElementById('akt-punkte').innerText = `Punkte: ${punkte}`;
            }
        }

        schlange.push({ x:snake_pos_x, y:snake_pos_y});     

        // Schlange bewege (letztes Arrayelement entfernen + neu hizufuegen)
        while(schlange.length > laenge) {
            schlange.shift();
        }

        // Futter zeichnen        
        if(futter_x == snake_pos_x && futter_y == snake_pos_y) {
            laenge++;
            punkte += 1;
            if (punkte > record) {record = punkte;} else {record = window.localStorage.getItem("key");};
            window.localStorage.setItem("key", record);

            document.getElementById('akt-punkte').innerText = `Punkte: ${punkte}`;
            document.getElementById('rekord').innerText = `Highscore: ${record}`;

            futter_x = Math.floor(Math.random() * Math.round(ctx.canvas.width) / pixel - 1);
            futter_y = Math.floor(Math.random() * Math.round(ctx.canvas.height) / pixel - 1);
        }

        ctx.fillStyle = "#bd9508";
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 15;
        ctx.fillRect(futter_x*pixel, futter_y*pixel, pixel, pixel);      
    } // game end

    function clickeTaste(e) {

        switch(e.target.id) {
            case "taste4":
                if(direction === undefined || direction === "up" || direction === "down") {
                    x_bewegung = -1;
                    y_bewegung = 0;
                    direction = "left";         
                }
                break;
            case "taste2":
                if(direction === undefined || direction === "left" || direction === "right") {
                    x_bewegung = 0;
                    y_bewegung = -1;
                    direction = "up";  
                }
                break;
            case "taste6":
                if(direction === undefined || direction === "up" || direction === "down") {
                    x_bewegung = 1;
                    y_bewegung = 0;
                    direction = "right" ;
                }
                break;
            case "taste8":
                if(direction === undefined || direction === "left" || direction === "right") {
                    x_bewegung = 0;
                    y_bewegung = 1;
                    direction = "down"; 
                }
                break;
        } // switch end
    } // clickTaste end
} // onlad ENDE