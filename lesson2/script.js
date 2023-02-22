class Creature{
    constructor(x,y){
        this.x=x
        this.y=y
        
       }
       move(){
           console.log("Move")
     }
     eat(){
         console.log("Eat")
    }
    chooseCell(){
        console.log("RandomCell")
    }
    }
class GrassEater extends Creature{
   constructor(x,y,energy){
       super(x,y)
       this.energy=energy
   }
}

class Predator extends Creature{
   move(){
    console.log("Move")
}
eat(){
  console.log("Eat")
}
mult(){
    console.log("Multiply")
}
die(){
    console.log("Mera")
}
chooseCell(){
 console.log("RandomCell")
}
}

var ge=new GrassEater(30,45,65)
console.log(ge.x)
console.log(ge.y)
console.log(ge.z)