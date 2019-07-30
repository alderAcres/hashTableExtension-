/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
        //** if this.numValues >= 12 then this.SIZE = 32;

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
        //**  if (this.SIZE > 16 && ((this.SIZE-1) / 4) < 0.25 (this.SIZE) )
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() { //*creates a hash table of size 16
  this.SIZE = 16;
  this.numValues = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  if (this.numValues >= 12) { //*increases size of hash table if current number of hashed values is 12 or greater
    this.SIZE = 32

    for (let key in this.storage[hash]) { //* creates new hashed values with previous key values
      let newHash = hashCode(key)
      this.storage[newHash] = this.storage[hash]
      delete this.storage[hash];
    }
  
  }

  const hash = hashCode(key);
  if (!this.storage.hasOwnProperty(hash) && this.numValues < this.SIZE) {
    this.storage[hash] = {};
    if (!this.storage[hash].hasOwnProperty(key)) {
      this.numValues++;
      this.storage[hash][key] = value;
    }
  }
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {

  const hash = hashCode(key);
  if (this.storage.hasOwnProperty(hash)) {
    if (this.storage[hash].hasOwnProperty(key)) { 
      return this.storage[hash][key];
    }
  } else {
    return 'Value does not exist with specified key in hash table';
  }
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
  - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
        //**  if (this.SIZE > 16 && ((this.SIZE-1) / 4) < 0.25 (this.SIZE) )
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  if (this.SIZE > 16 && ((this.numValues-1) / 4) < 0.25(this.SIZE) ) { //*checks to see if deleting item decreases hash table size to less than 25% of the current size
    const currentSize = this.numValues;
    this.SIZE = 0.5 * currentSize;

    for (let key in this.storage[hash]) { //* creates new hashed values with previous key values
      let newHash = hashCode(key)
      this.storage[newHash] = this.storage[hash]
      delete this.storage[hash];
    }
  }

  //** as long as the current hash value and key for the value to be removed exists, delete the value and then decrease the numberOfValues! */
  const hash = hashCode(key);
  if (this.storage.hasOwnProperty(hash)) {
    if (this.storage[hash].hasOwnProperty(key)) {
      delete this.storage[hash][key]
      this.numValues--;
    }
  } else {
    return undefined;
  }
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
