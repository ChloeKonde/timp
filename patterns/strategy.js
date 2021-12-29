var Shipping = function () {
    this.company = "";
};

Shipping.prototype = {
    setStrategy: function (company) {
        this.company = company;
    },

    calculate: function (package) {
        return this.company.calculate(package);
    }
};

var FirstCompany = function () {
    this.calculate = function (package) {
        return "$1";
    }
};

var SecondCompany = function () {
    this.calculate = function (package) {
        return "$2";
    }
};

var ThirdCompany = function () {
    this.calculate = function (package) {
        return "$3";
    }
};

function run() {

    var package = { from: "76712", to: "10012", weigth: "3" };

    // 3 strategies

    var fc = new FirstCompany();
    var sc = new SecondCompany();
    var tc = new ThirdCompany();

    var shipping = new Shipping();

    shipping.setStrategy(fc);
    console.log("FirstCompany Strategy: " + shipping.calculate(package));
    shipping.setStrategy(sc);
    console.log("SecondCompany Strategy: " + shipping.calculate(package));
    shipping.setStrategy(tc);
    console.log("ThirdCompany Strategy: " + shipping.calculate(package));
}

run();