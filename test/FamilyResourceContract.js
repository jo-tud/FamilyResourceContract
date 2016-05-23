contract('FamilyResourceContract', function (accounts) {
    it("responsibleParent should be address of account[0]", function (done) {
        var frc;
        var creator = accounts[0];
        
        FamilyResourceContract.new({from: creator}).then(function (result) {
            frc = result;
            return (frc.responsibleParent())
        }).then(function (responsibleParent) {
            assert.equal(creator, responsibleParent,"creator and responsibleParent are not equal");
        }).then(done).catch(done);
    });
    
    it("should award 1 red marble", function (done) {
        var frc;
        var creator = accounts[0];
        var child = accounts[1];
        var date = Date.now() / 1000 | 0;
        var red_marbles_before, red_marbles_after;
        var blue_marbles, neon_marbles;
        
        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles_before = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles_before, 0, "");
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles_after = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles_before + 1, red_marbles_after);
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 0);
        }).then(done).catch(done);
    });

    it("should award 2 red marbles", function (done) {
        var frc;
        var creator = accounts[0];
        var child = accounts[2];
        var date = Date.now() / 1000 | 0;
        var red_marbles_before, red_marbles_after;
        var blue_marbles, neon_marbles;

        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles_before = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles_before, 0);
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles_after = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles_before + 2, red_marbles_after);
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 0);
        }).then(done).catch(done);
    });

    it("should award 2 red marbles and 3 neon marble", function (done) {
        var frc;
        var creator = accounts[0];
        var child = accounts[1];
        var date = Date.now() / 1000 | 0;
        var red_marbles_before, red_marbles_after;
        var blue_marbles, neon_marbles;

        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles_before = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles_before, 0);
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles_after = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles_before + 2, red_marbles_after);
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 3);
        }).then(done).catch(done);
    });

    it("should award 1 blue marble", function (done) {
        var frc;
        var creator = accounts[0];
        var child = accounts[1];
        var date = Date.now() / 1000 | 0;
        var red_marbles;
        var blue_marbles_before, blue_marbles_after, neon_marbles;

        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles_before = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles_before, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles_after = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles_before + 1, blue_marbles_after);
            assert.equal(neon_marbles, 0);
        }).then(done).catch(done);
    });

    it("should award 2 blue marbles", function (done) {
        var frc;
        var creator = accounts[0];
        var child = accounts[1];
        var date = Date.now() / 1000 | 0;
        var red_marbles;
        var blue_marbles_before, blue_marbles_after, neon_marbles;

        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles_before = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles_before, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles_after = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles_before + 2, blue_marbles_after);
            assert.equal(neon_marbles, 0);
        }).then(done).catch(done);
    });
    
    it("should award 2 blue marbles and 2 neon marbles", function (done) {
        var frc;
        var creator = accounts[0];
        var child = accounts[1];
        var date = Date.now() / 1000 | 0;
        var red_marbles;
        var blue_marbles_before, blue_marbles_after, neon_marbles;

        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles_before = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles_before, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles_after = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles_before + 2, blue_marbles_after);
            assert.equal(neon_marbles, 2);
        }).then(done).catch(done);
    });

    it("should award 2 red marbles, 2 blue marbles and 3 neon marbles", function (done) {
        var frc = FamilyResourceContract.deployed();
        var creator = accounts[0];
        var child = accounts[1];
        var date = Date.now() / 1000 | 0;
        var red_marbles, blue_marbles, neon_marbles;

        FamilyResourceContract.new(date, 7, 2, 10, [1,4],{from: creator}).then(function (result) {
            frc = result;
            return(frc.marbleBalance.call(child))
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 0);
            assert.equal(blue_marbles, 0);
            assert.equal(neon_marbles, 0);
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(0, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.awardMarble(1, child, {from: creator}));
        }).then(function () {
            return (frc.marbleBalance.call(child));
        }).then(function (balance) {
            red_marbles = balance[0].toNumber();
            blue_marbles = balance[1].toNumber();
            neon_marbles = balance[2].toNumber();
            assert.equal(red_marbles, 2);
            assert.equal(blue_marbles, 2);
            assert.equal(neon_marbles, 3);
        }).then(done).catch(done);
    });

});
