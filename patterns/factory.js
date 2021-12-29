var Factory = function () {
    this.createObject = function (type) {
        var obj;

        if (type === "firstType") {
            obj = new FirstType();
        } else if (type === "secondType") {
            obj = new SecondType();
        } else if (type === "thirdType") {
            obj = new ThirdType();
        }

        obj.type = type;

        obj.say = function () {
            console.log(this.type + "  " + this.field);
        }

        return obj;
    }
}

var FirstType = function () {
    this.field = "1";
};

var SecondType = function () {
    this.field = "2";
};

var ThirdType = function () {
    this.field = "3";
};


function run() {

    var objs = [];
    var factory = new Factory();

    objs.push(factory.createObject("firstType"));
    objs.push(factory.createObject("secondType"));
    objs.push(factory.createObject("thirdType"));


    for (var i = 0, len = objs.length; i < len; i++) {
        objs[i].say();
    }
}

run();