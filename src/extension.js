/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

/*
  For set, basically we add a value
  then, we check if that makes us 75% full
  if so then rehash everything
  if not go on with your life

  rehash everything
  create a new hash table object with twice the size
  loop through the current hash table
    loop through each object at each index
    call set on every item and insert into the hash table
  return the new hash table, this.storage = our new storage
*/

/*
  For remove, basically we remove a value
  then, we check if that makes us 25% full
  is so, great
  if not
    then also check if the arrays size is > 16
      then lets reduce this item
    
  create a new hash table
  iterate through old hash table (indices and objects)
  rehash everything and add to new hash table
  make the the new hash table the old hash table
*/


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
