/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

        ///// have to check when this.size  is over 75% of array size. then run adds on new constructed table***
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/
/// have to rehas and add all values to new constructed tasble of half size ***
// PASTE AND MODIFY YOUR CODE BELOW


//SET MODIFICATION
// check if linked lists added are approaching this . size limitwith if statement at the end of add function (
  // loop through storage array and tally non-undefined locations with count variable
  // if count > this.SIZE/.75 execute new table creation logic:
//)
// create new hashtable of size this.size*2
// run for-each loop on defined indices of old storage and add keys from previous table (tricky part may be accessing heads) (make sure to json clone)
// return new table
/// must check number of indices in storage array which are NOT undefined, then loop through those. 
//must tally those vs this .SIZE first

//either return new table or clone storage and redefine parameters of old table and then add cloned elements to new storage array

//REMOVE
// check if storage is below this.size/4 at the end of remove statement
// create new hashtable with value of this.size/4 as new this.size (json clone old storage)
// for each loop though non-undefined array indices and prototype set keys to new table 
//return new table (or clone, redefine and re set)

// dont forget to modify params of set with spread or rest operator), or must accept an array, use old storage array as parameter




// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';
  
  let hash = 0;
  if (string.length === 0) return hash;
  
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
