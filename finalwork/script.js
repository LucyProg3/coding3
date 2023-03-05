var socket = io();
var matrix = [];

var grassArr = [];
var grassEaterArr = [];
var grassEaterEaterArr = []
var BombArr = [];
var BombDestroyerArr = [];
var BombGeneratorArr = []


var side = 35;


function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background('#acacac');
    var row = 30, column = 30;

    for (var y = 0; y < row; ++y) {
        matrix[y] = [];

        for (var x = 0; x < column; ++x) {
            matrix[y].push(Math.round(random(0, 6)));
        }
    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                const gr = new Grass(y, x, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] === 2) {
                const gr = new GrassEater(y, x, 1);
                grassEaterArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                if (grassEaterArr.length <= 20) {
                    let grEater = new GrassEater(x, y);
                    grassEaterArr.push(grEater);
                }
                else matrix[y][x] = 0;
            }
            else if (matrix[y][x] == 3) {
                if (grassEaterEaterArr.length <= 20) {
                    let grEatEater = new GrassEaterEater(x, y);
                    grassEaterEaterArr.push(grEatEater);
                }
                else matrix[y][x] = 0;
            }
            // else if (matrix[y][x] == 4) {
            //     let randBomb = new Bomber(x, y);
            //     BombArr.push(randBomb);
            // }
            else if (matrix[y][x] == 5) {
                if (BombDestroyerArr.length <= 20) {
                    let bombDest = new BomberDestroyer(x, y);
                    BombDestroyerArr.push(bombDest);
                }
                else matrix[y][x] = 0;
            }
        }
    }
}

function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if (weather == 'winter') { fill('white'); }
                else if (weather == 'autumn') { fill('#e0bb28') }
                else { fill("green"); }
                rect(x * side, y * side, side, side);
            }
            if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#09eded");
                rect(x * side, y * side, side, side);
            }
        }
    }
}


function mouseClicked() {
    let y = Math.floor(mouseY / side)
    let x = Math.floor(mouseX / side)
    matrix[y][x] = 4
}




function draw() {
    if(frameCount % 15 == 0)
    {
       var data = generateStatistics()
       socket.emit('send data', data)
    }

    if (frameCount <= 30) {
        weather = "winter";
        color("#f7f7f7");
    }
    else if (frameCount > 30 && frameCount <= 50) {
        weather = "spring";
        color("light green");
    }

    else if (frameCount > 50 && frameCount <= 75) {
        weather = "summer";
        color("light blue")
    }
    else if (frameCount > 90 && frameCount <= 100) {
        weather = "autumn";
        color("orange");
    }

    else if (frameCount == 101) {
        days = 0;
    }

    drawMatrix();

    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in grassEaterEaterArr) {
        grassEaterEaterArr[i].eat();
    }
    // for (var i in BombArr) {
    //     BombArr[i].explode();
    //     // console.log(BombArr[i])
    // }
    for (var i in BombDestroyerArr) {
        BombDestroyerArr[i].destroy();
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
}

function generateStatistics() {
    var statistics = {}
    statistics.timestamp = (new Date()).toString();
    statistics.grassSpawn = grassArr.length;
    statistics.grassEaterSpawn = grassEaterArr.length;
    statistics.grassEaterEaterSpawn = grassEaterEaterArr.length;
    statistics.bombSpawn = BombArr.length;
    statistics.bombGeneratorSpawn = BombGeneratorArr.length;
    statistics.bombdestroyerSpawn = BombDestroyerArr.length;
    statistics.weather = weather;
    return statistics
}
//     if (frameCount%60==0){
//         let data=
//    socket.emit("send data",stattistics)
//     }
    // if (frameSec == 60) {
    //     generateStatistics();
    //     frameSec = 0;
    // }
