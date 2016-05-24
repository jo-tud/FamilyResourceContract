# Family Resource Contract
A contract for regulating access to resources made sparse by parents
To try out the contract directly, visit [browser-solidity](https://ethereum.github.io/browser-solidity/#gist=6f998f024189ed49a02670b47d065fc5).
_Hint:_ simply use _1_ as the address for a child.

## Rationale
This contract organizes access to sparce ressources for kids
Read my blog about the contract's story at [Medium](https://medium.com/@oaeee/the-first-smart-family-contract-b28cc86feb41).

## Disclaimer
 - Calm down... 
 - Families are no trustless organizations
 - This way of organizing aspects of family life is not for everyone
 
## Example
A child can collect 2 red and 2 blue marbles by sunday in order to have computer access at two fixed days in the following week (Tuesday and Friday). Marbles are awarded by the parent for learning vocabulary and practicing on an instrument missed marbles must be made up for. The contract starts on Monday, 9th of May, 00:00h

For this example the constructor variables must be set as follows:
```solidity
uint public contractStart = 1462744800; // represents 05/09/2016 00:00:00
uint public renewalPeriod = 7; // in days
uint public requiredMarbles = 2; // of each type, every period
uint public requiredExtraMarbles = 10; // number of extra marbles required for redeeming
uint[] allowedDays = [1, 4]; // array of days on which the ressource may be used
```
