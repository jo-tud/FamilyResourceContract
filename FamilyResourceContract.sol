contract FamilyResourceControl{
    
    uint public contractStart = 1462744800; // represents 05/09/2016 00:00:00, use e.g. http://www.timestampconvert.com/ to get your start timestamp
    uint public renewalPeriod = 7; // in days
    uint public requiredMarbles = 2; // of each type, every period
    uint public requiredExtraMarbles = 10; // number of extra marbles required for redeeming
    uint[] allowedDays = [1, 4]; // array of days on which the ressource may be used in the following period. If the Contract starts on Monday 00:00, day 0 is monday, day 6 is sunday.

    struct Child {
        uint indianredMarbles; // vocabulary
        uint skyblueMarbles; // instrument 
        uint neonMarbles; // represent extra credit
    }
    
    struct Parent {
        bool canAward; 
    }
    
    address responsibleParent; // this is the owner of the contract
    
    mapping(address => Child) children;
    mapping(address => Parent) parents;
    
    
    // modifiers
    modifier onlyOwner {
        if (msg.sender != responsibleParent)
            throw;
        _
    }
    
    modifier onlyParent {
        if (!parents[msg.sender].canAward)
            throw;
        _
    }
    
    // constructor
    function FamilyResourceControl(){
        responsibleParent = msg.sender; // this is the creator of the contract and the one authorized to add other parents
        parents[responsibleParent].canAward = true;
    }
    
    // cumulative required marbles
    function cumReqMarbles() returns(uint) {
        return ((now - contractStart)/(renewalPeriod * 1 days))*requiredMarbles;
    }
    
    // calculate current day of week (first day => day 0)
    function currentDay() returns(uint){
        return ((now - contractStart)/ 1 days) % (renewalPeriod);
    }
    
    // award a marble
    function awardMarble(bytes32 whatMarble, address goodChild) onlyParent {
        if (whatMarble == "indianredMarble") {
            if (children[goodChild].indianredMarbles >= cumReqMarbles()+2){
                children[goodChild].neonMarbles++;
            } else {
                children[goodChild].indianredMarbles++;
            }
        } else if (whatMarble == "skyblueMarble"){
            if (children[goodChild].skyblueMarbles >= cumReqMarbles()+2){
                children[goodChild].neonMarbles++;
            } else {
                children[goodChild].skyblueMarbles++;
            }
        }
    }
    
    // function to be called by the resource controler
    function canUseResource(address goodChild) returns (bool) {
        for (uint i = 0; i < allowedDays.length; i++) {
            if (
                allowedDays[i] == currentDay() 
                && children[goodChild].indianredMarbles >= cumReqMarbles()
                && children[goodChild].skyblueMarbles >= cumReqMarbles()
                ){
                return true;
            }
        }
        return false;
    }
    
    // redeem neon marbles
    function useNeonMarbles(address goodChild) onlyParent returns(bool){
        if (children[goodChild].neonMarbles >= requiredExtraMarbles) {
            children[goodChild].neonMarbles -=  requiredExtraMarbles;
            return true;
        } else {
            return false;
        }
    }
    
    function addParent(address furtherParent) onlyOwner {
            parents[furtherParent].canAward = true;
    }
    
    function removeParent(address realParent) onlyOwner{
        if (msg.sender == responsibleParent){
            parents[realParent].canAward = false;
        } else {
            throw;
        }
    }
    
    function marbleBalance(address goodChild) returns(uint indianredMarbles, uint skyblueMarbles, uint neonMarbles){
        return(
            children[goodChild].indianredMarbles,
            children[goodChild].skyblueMarbles,
            children[goodChild].neonMarbles);
    }
    
    function remove() onlyOwner{
        selfdestruct(responsibleParent);
    }
}
