var Object = function (name) {
    this.name = name;

    this.say = function () {
        console.log(this.name);
    };
}

var DecoratedObject = function (obj, field) {
    this.obj = obj;
    this.name = obj.name;  // ensures interface stays the same
    this.field = field;

    this.say = function () {
        console.log("Decorated object: " + this.name + ", " +
            this.field);
    };
}

function run() {

    var obj = new Object("myObj");
    obj.say();

    var decorated = new DecoratedObject(obj, "myField");
    decorated.say();
}

run();