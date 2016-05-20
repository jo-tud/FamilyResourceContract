contract FamilyResourceControl{
    
    uint public contractStart = 1462744800; // represents 05/09/2016 00:00:00, use e.g. http://www.timestampconvert.com/ to get your start timestamp
    uint public renewalPeriod = 7; // in days
    uint public requiredMarbles = 2; // of each type, every period
    uint public allowedUsages = 2; // times the ressource may be used per fulfillment of requirements
    uint public requiredExtraMarbles = 10; // number of extra marbles required for redeeming
    uint[] allowedDays = [1, 4]; // array of days on which the ressource may be used in the following period. If the Contract starts on Monday 00:00, day 0 is monday, day 6 is sunday.
    
    // represents a child  of the family
    struct Child {
        uint indianredMarbles; // vocabulary
        uint skyblueMarbles; // instrument 
        uint neonMarbles; // represent extraCredit
        uint usageTokens; // how many times can the resource be used
    }
    
    struct Parent {
        bool canAward; 
    }
    
    address responsibleParent; // this is the owner of the contract
    
    // This declares a state variable that
    // stores a `Child` and `Parent` struct for each possible address.
    mapping(address => Child) children;
    mapping(address => Parent) parents;
    
    modifier onlyCreator(address _responsibleParent)
    {
        if (msg.sender != _responsibleParent)
            throw;
        _
    }
    
    function FamilyResourceControl(){
        responsibleParent = msg.sender; // this is the creator of the contract one of the people authorized to award marbles
        
        // create the parent
        parents[responsibleParent].canAward = true;
    }
    
    function awardIndianredMarble(address goodChild) {
        awardMarble(0, goodChild);
    }
    
    function awardSkyblueMarble(address goodChild) {
        awardMarble(1, goodChild);
    }
    
    function cumReqMarbles() returns(uint) {
        return ((now - contractStart)/(renewalPeriod * 86400))*requiredMarbles;
    }
    
    function currentDay() returns(uint){
        return ((now - contractStart)/86400) % (renewalPeriod);
    }
    
    function awardMarble(uint whatMarble, address goodChild){
        
        if (parents[msg.sender].canAward) {
            if (whatMarble == 0) {
                if (children[goodChild].indianredMarbles >= cumReqMarbles()+2){
                    children[goodChild].neonMarbles++;
                } else {
                    children[goodChild].indianredMarbles++;
                }
            } else if (whatMarble == 1){
                if (children[goodChild].skyblueMarbles >= cumReqMarbles()+2){
                    children[goodChild].neonMarbles++;
                } else {
                    children[goodChild].skyblueMarbles++;
                }
            }
            
        } else {
            throw;
        }
    }
    
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
    
    function useNeonMarbles(address goodChild) returns(bool){
        if (parents[msg.sender].canAward && children[goodChild].neonMarbles >= requiredExtraMarbles) {
            children[goodChild].neonMarbles = children[goodChild].neonMarbles - requiredExtraMarbles;
            return true;
        } else {
            return false;
        }
    }
    
    // for debugging
    function getState(address goodChild) returns(uint, uint, uint, uint){
        return(
            children[goodChild].indianredMarbles,
            children[goodChild].skyblueMarbles,
            children[goodChild].neonMarbles,
            children[goodChild].usageTokens);
    }
    
    function addParent(address realParent){
        if (msg.sender == responsibleParent){
            parents[realParent].canAward = true;
        } else {
            throw;
        }
    }
    
    function removeParent(address realParent){
        if (msg.sender == responsibleParent){
            parents[realParent].canAward = false;
        } else {
            throw;
        }
    }
}
