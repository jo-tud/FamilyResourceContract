var accounts;
var account;

function setStatus(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
}

function refreshMarbleBalance() {
    var frc = FamilyResourceContract.deployed();
    var child = document.getElementById("child").value;

    frc.marbleBalance.call(child, {from: account}).then(function (value) {
        var red = document.getElementById("blue");
        var blue = document.getElementById("red");
        var neon = document.getElementById("neon");
        
        red.innerHTML = value[0].valueOf();
        blue.innerHTML = value[1].valueOf();
        neon.innerHTML = value[2].valueOf();
    }).catch(function (e) {
        console.log(e);
        setStatus("Error getting balance; see log.");
    });
}

function awardMarble() {
    var frc = FamilyResourceContract.deployed();

    var whatMarble = parseInt(document.getElementById("whatMarble").value);
    var child = document.getElementById("child").value;

    setStatus("Initiating transaction... (please wait)");

    frc.awardMarble(whatMarble, child, {from: account}).then(function () {
        setStatus("Transaction complete!");
        refreshMarbleBalance();
    }).catch(function (e) {
        console.log(e);
        setStatus("Error awarding marble; see log.");
    });
}

window.onload = function () {
    web3.eth.getAccounts(function (err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }

        accounts = accs;
        account = accounts[0];

        refreshMarbleBalance();

        var startDate = document.getElementById("startDate");

        FamilyResourceContract.deployed().contractStart.call({from: account}).then(function (value) {
            startDate.innerHTML = value.valueOf();
        }).catch(function (e) {
            console.log(e);
            setStatus("Error getting start date; see log.");
        });
    });
};
