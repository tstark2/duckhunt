$(document).ready(function(){

    if(Modernizr.canvas){
        //canvas is supported
        
        $("#shots").html("Shots: " + shots);
        $("#hits").html("Hits: " + hits);
        $("#accuracy").html("Accuracy: 0%");
        
        var field = $("#field");
        
        field.drawRect({
            x:0, y:300,
            fromCenter:false,
            width:960,
            height:300,
            fillStyle:"#050",
            layer:true,
            name:"ground"
        })
        
        .drawEllipse({
            x:480, y:400,
            width:700,
            height:200,
            fillStyle:"#0032CD",
            layer:true,
            name:"pond"
        })
        .drawRect({
            x:480, y:570,
            width:200,
            height:50,
            fillStyle:"#f00",
            layer:true,
            click:function(){
                launchDuck(randomBush());
                launchDuck(randomBush());
                launchDuck(randomBush());
                --shots;
            }
        })
        .drawText({
            x:480, y:570,
            text:"Fly, Little Duckies!",
            fillStyle:"#000",
            layer:true,
            intangible:true
        })
        

        
        field.click(function(){
            shots++;
            $("#shots").html("Shots: " + shots);
            $("#accuracy").html("Accuracy: " + Math.round((hits/shots)*100)  + "%");
        });

    field.drawBush({ //these need to be last so they're in front of everything else
            x:100, y:500,
            fillStyle:"#090",
            layer:true,
            groups:["bushes"]
        })
        .drawBush({
            x:400, y:520,
            fillStyle:"#090",
            layer:true,
            groups:["bushes"]
        })
        .drawBush({
            x:725, y:500,
            fillStyle:"#090",
            layer:true,
            groups:["bushes"]
        });
        

    }
    else{
        //canvas is not supported
    }
})//end of document.ready

var hits = 0;
var shots = 0;
var duckCounter = 0;

function randomBush(){
    var bushNumber = Math.round((Math.random()*2)+1);
    return bushNumber;
}

function launchDuck(position){ //position will either be 0, 1, or 2, depending on the bush the duck launches from 
    var topX = Math.random() * 960;
    var x;
    var rotation;
    var layerName = "Duck" + duckCounter;
    var dieRotation;
    duckCounter++;
    
    switch(position) {
        case 1:
            x = 165;
            break;
            
        case 2:
            x = 480;
            break;
            
        case 3:
            x = 805;
            break;
    }
    
    if(topX < x){
        rotation = -45;
        dieRotation = "-=135";
    } else {
        rotation = 45;
        dieRotation = "+=135";
    }
    
    $("#field").drawImage({
        x:x, y:400,
        source:"images/duck.png",
        scale:.8,
        rotate:rotation,
        layer:true,
        name:layerName,
        click:function(layer){
            $(this).stopLayer(layer);
            $(this).animateLayer(layer, {
                rotate:dieRotation,
                intangible:true
            }, 250, "linear");
            $(this).animateLayer(layer, {
                y:700
            }, 2000, "linear", function(layer){
                $(this).removeLayer(layer);
            });
            hits++;
            $("#hits").html("Hits: " + hits);
        }
    })
    .animateLayer(layerName, {
        x:topX, y:-100
    }, 2250, "linear", function(layer){
        $(this).removeLayer(layer);
        });
};

$.jCanvas.extend({
    name:"drawBush",
    type:"bush",
    props: {},
    fn:function(ctx, params) {
        var p = params;
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x-30, p.y-100);
        ctx.lineTo(p.x, p.y-70);
        ctx.lineTo(p.x+10, p.y-120);
        ctx.lineTo(p.x+20, p.y-70);
        ctx.lineTo(p.x+35, p.y-110);
        ctx.lineTo(p.x+40, p.y-80);
        ctx.lineTo(p.x+55, p.y-125);
        ctx.lineTo(p.x+65, p.y-70);
        ctx.lineTo(p.x+80, p.y-120);
        ctx.lineTo(p.x+100, p.y-80);
        ctx.lineTo(p.x+120, p.y-125);
        ctx.lineTo(p.x+140, p.y-80);
        ctx.lineTo(p.x+160, p.y-120);
        ctx.lineTo(p.x+140, p.y);
        ctx.closePath();
        
        $.jCanvas.detectEvents(this, ctx, p);
        $.jCanvas.closePath(this, ctx, p);    
    }
});