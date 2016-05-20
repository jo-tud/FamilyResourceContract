# familyResourceContract
A contract for regulating access to resources made sparse by parents

## Rationale
This contract organizes access to sparce ressources for kids

## Example rules
A child must collect 2 red and 2 blue marbles by sunday in order to have computer access at two fixed days in the following week (Tuesday and Friday). Marbles are awarded by the parent for learning vocabulary and practicing on an instrument missed marbles must be made up for. The contract starts on Monday, 59th of May, 00:00h

For this example the initial variables must be set as follows:
```solidity
uint public contractStart = 1462744800; // represents 05/09/2016 00:00:00, use e.g. http://www.timestampconvert.com/ to get your start timestamp
uint public renewalPeriod = 7; // in days
uint public requiredMarbles = 2; // of each type, every period
uint public allowedUsages = 2; // times the ressource may be used per fulfillment of requirements
uint public requiredExtraMarbles = 10; // number of extra marbles required for redeeming
uint[] allowedDays = [1, 4]; // array of days on which the ressource may be used in the following period. If the Contract starts on Monday 00:00, day 0 is monday, day 6 is sunday.
```

In a future version this can be done using the constructor of the contruct.
