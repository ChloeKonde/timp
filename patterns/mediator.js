var Participant = function (name) {
    this.name = name;
    this.chatroom = null;
};

Participant.prototype = {
    send: function (message, to) {
        this.chatroom.send(message, this, to);
    },
    receive: function (message, from) {
        console.log(from.name + " to " + this.name + ": " + message);
    }
};

var Chatroom = function () {
    var participants = {};

    return {

        register: function (participant) {
            participants[participant.name] = participant;
            participant.chatroom = this;
        },

        send: function (message, from, to) {
            if (to) {                      // single message
                to.receive(message, from);
            } else {                       // broadcast message
                for (key in participants) {
                    if (participants[key] !== from) {
                        participants[key].receive(message, from);
                    }
                }
            }
        }
    };
};

function run() {

    var fp = new Participant("First");
    var sp = new Participant("Second");
    var tp = new Participant("Third");
    var fouthp = new Participant("Fourth");

    var chatroom = new Chatroom();
    chatroom.register(fp);
    chatroom.register(sp);
    chatroom.register(tp);
    chatroom.register(fouthp);

    fp.send("All you need is a frog");
    fp.send("I owe frog today");
    sp.send("Hey, no need to broadcast", fp);
    tp.send("Ha, I heard that!");
    fouthp.send("tp, what do you think?", tp);
}

run();