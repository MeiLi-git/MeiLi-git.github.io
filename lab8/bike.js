(function(){

    const createBicyclePrototye = function() {
        function applyBrake(c) {
            this.speed -=c;
        };
        function speedup (c) {
            this.speed +=c;
        };
        return {speed:0, applyBrake, speedup};
        
    };
   
    const createMountainBikeProtoype = (type) => {
        function setGear(g) {
            this.gear = g;
        }
        return {gear:1, prototype:Object.create(type), setGear};
    };

    const start = ()=>{
        let type = createBicyclePrototye();
        return createMountainBikeProtoype(type);
    };
    console.log("--------------using function expression -------------");
    let b = createBicyclePrototye();
    b.speedup(20);
    b.applyBrake(35);
    console.log(`About this Bike's speed: `+ b.speed); 
    let mb = start();
    mb.setGear(5);
    mb.prototype.speedup(34);
    console.log(`About this Mountain Bike - Speed: ` + mb.prototype.speed);
    console.log(`About this Mountain Bike - Gear: ` + mb.gear);
})();

(function(){
    class Bicycle{
        constructor(){
            this.speed = 0;
        }
        speedup(c) {
            this.speed += c;
        }
        applyBrake(c) {
            this.speed -= c;
        }
        getSpeed(){
            return this.speed;
        }
    }
    class MountainBicycle extends Bicycle{
        constructor(){
            super();
            this.gear = 1;
        }
        setGear(g){
            this.gear = g;
        }
        getGear(){
            return this.gear;
        }
    }
    console.log("--------------using ES6 class construct-------------");
    let b = new Bicycle();
    b.applyBrake(35);
    b.speedup(50);
    console.log(`this Bike's speed: `+ b.getSpeed());
    let mb = new MountainBicycle();
    mb.applyBrake(38);
    mb.speedup(48);
    mb.setGear(5);
    console.log(`this Mountain Bike's speed: `+ mb.getSpeed());
    console.log(`this Mountain Bike's gear: `+ mb.getGear());
}
)();

(function(){

    function Bike(){
        this.speed = 0;
    }
    Bike.prototype.speedup = function (c){this.speed += c};
    Bike.prototype.applyBrake =function (c){this.speed -= c};
    
    function MountainBike() {
        Bike.call(this);
        this.gear = 1;
    }

    MountainBike.prototype = Object.create(Bike.prototype);
    MountainBike.prototype.constructor = MountainBike;
    MountainBike.prototype.setGear = function (s){this.gear = s};
   
    console.log("--------------using constructor function-------------");
    var mb = new MountainBike();
    mb.speedup(40);
    mb.applyBrake(10);
    console.log(`this Mountain Bike's speed: ` + mb.speed);
     
   
}
)();