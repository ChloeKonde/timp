function ObjectPrototype(proto) {
    this.proto = proto;

    this.clone = function () {
        var obj = new Object();

        obj.first = proto.first;
        obj.last = proto.last;

        return obj;
    };
}

function Object(first, last) {

    this.first = first;
    this.last = last;

    this.say = function () {
        console.log(this.first + " " + this.last);
    };
}

function run() {

    var proto = new Object("first", "last");
    var prototype = new ObjectPrototype(proto);

    var obj = prototype.clone();
    obj.say();
}

run();