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

function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);

  //Added an object to every array element. [Using objects as the bucket for HT]
  for(let i = 0; i < this.SIZE; i++) {
    this.storage[i] = {};
  }

  //Total Number of Key/Value pairs (or items) in a bucket. 
  //Used in set function.
  this.totalItems = 0;
}

// set:
// - If adding the new item will push the number of stored items to over 75% of
//   the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.set = function(key, value) {
  let overflow = Math.ceil(this.SIZE * .75); 
  let idx = hashCode(key, this.SIZE);
  let checkKey = this.storage[idx].hasOwnProperty(key);
  let tempKeys;
  let tempVals;

  //Setting value if no overflow/Full.
  this.storage[idx][key] = value;

  //Increment total k/v pairs (items) every time its within the idx.
  ++this.totalItems;

  if(overflow - 1 <= this.totalItems) {
    //get all the keys from current hash table before doubling its size.
    //After getting all the keys, rehash it them
    for(let i = 0; i < this.SIZE; i++) {
      if(checkKey) {
        tempKeys.concat(Object.keys(this.storage[i]));
        tempVals.concat(Object.values(this.storage[i]));
      }
    } 
    this.SIZE *= 2;
    //Rehash in new hash function size.
    for(let i = 0; i < tempKeys.length; i++) {
      let reHash = hashCode(tempKeys[i], this.SIZE);
      this.storage[newHash][tempKeys[i]] = tempVals[i];
    }
  }
};

HashTable.prototype.get = function(key) {
  let idx = hashCode(key, this.SIZE);
  let bucket = this.storage[idx];

  //checks if that index has the key, returns true if key is found.
  let checkKey = this.storage[idx].hasOwnProperty(key);
  if(checkKey) {
    return bucket[key];
  } else {
    throw new Error("The Hash Table does not contain this key");
  }
};

// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  let idx = hashCode(key, this.SIZE);
  let bucket = this.storage[idx];
  //checks if that index has the key
  let checkKey = this.storage[idx].hasOwnProperty(key);
  if(checkKey) {
    delete bucket[key];
  } else {
    throw new Error("The Hash Table does not contain this key");
  }
};

// Do not modify
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
