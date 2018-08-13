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
HashTable.prototype.set = function(key, value) {
  'use strict';
  // if adding the new  item will push the number of stored items to over 75% of 
  // the hash table's SIZE, then double the hash table's SIZE and rehash everything
  let sev5cent = this.storage * .75;
  // if the hash tables SIZE is greater than 16 and the result of removing the item frops the 
  // number of stored items to be less than 25% of the hash table's SIZE (rounding down). then
  // reduce the hash table's SIZE by 1/2 and rehash everything
  let twe5cent = Math.floor(this.storage * .25);

  if(this.storedVals + 1 > sev5cent) {
    let tempStorage = {};
    this.SIZE = this.SIZE * 2;
    let head = this.storage;
    for(let code in head) {
      // get previous vals
      let bucket = Object.assign(head[code]);
      for(let keys in head[prop]) {
        // get new code
        let newCode = (keys, this.SIZE);
        // assign tempStorage new code vals
        tempStorage[newCode] = bucket;
      }
    }
    this.storage = tempStorage;
  }
  if(this.storedVals - 1 < twe5cent && this.SIZE === 16) {
    let tempStorage = {};
    this.SIZE = this.SIZE * .5;
    let head = this.storage;
    for(let code in head) {
      // get previous vals
      let bucket = Object.assign(head[code]);
      for(let keys in head[prop]) {
        // get new code
        let newCode = (keys, this.SIZE);
        // assign tempStorage new code vals
        tempStorage[newCode] = bucket;
      }
    }
    this.storage = tempStorage;
  }

  let hshCode = hashCode(key, this.SIZE);
  let head = this.storage[hshCode];
  // if key has already been used to store another value, overwrite
  let hasKey = false;
  for(let code in this.storage) {
    if(this.storage[code].hasOwnProperty(key)) {
      this.storage[code][key] = value;
      hasKey = true;
    } 
  }
  if(!hasKey) {
    this.storage[hshCode] = {key: value};
    // stored vals stays same since reassignment of say key
  } else {
    //stored vals increases
    this.storedVals++
  }

  // collisions
  if(head.hasOwnProperty(key)) {
    head[key].next = {key, value};
    head = head[key][next];
  } else {
    head = {key, value};
  }
  
  // stored Vals count
  return this.storedVals;
}


HashTable.prototype.get = function(key) {
  let head = this.storage;
  // search through storage and retrieve first occurence of key in HashTable  
  for(let code in head) {
    //  storage[hashCode] has the property of key, return key value
    if(head[code].hasOwnProperty(key)) {
      return head[code][key];
    }
  }
};

HashTable.prototype.remove = function(key) {
  let deleted = undefined;
  for(let code in this.storage) {
    if(this.storage[code].hasOwnProperty(key)) {
      // assign deleted property to deleted variable
      deleted = this.storage[code][key];
      delete this.storage[code][key];
    }
  }
  //return undefined if not reassigned and key does not exist in HashTable
  return deleted;
};


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
