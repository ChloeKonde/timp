function FirstClass() {
    this.request = function (data, weight) {
        return "$49.75";
    }
}

function SecondClass() {
    this.someField = function (someData) { /* ... */ };
    this.calculate = function (weight) { return "$39.50"; };
}

function Adapter(someData) {
    var fc = new SecondClass();

    fc.someField(someData);

    return {
        request: function (data, weight) {
            return fc.calculate(weight);
        }
    };
}

function run() {

    var fc = new FirstClass();
    var data = { token: "1234" };
    var adapter = new Adapter(data);

    // original object and interface

    var cost = fc.request("10010", "2");
    console.log("Old cost: " + cost);

    // new object with adapted interface

    cost = adapter.request("10010", "2");

    console.log("New cost: " + cost);
}

run()