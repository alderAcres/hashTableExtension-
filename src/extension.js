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
unction HashTable() {
  this.SIZE = 16;
  // total number of entries including multi object items
  this.entries = 0;
  // total number of occupied storage slots
  this.occupied = 0;
  this.storage = new Array(this.SIZE);
}

/**
 * set - Adds given value to the hash table with specified key.
 *
 * - If the provided key has already been used to store another value, simply overwrite
 *   the existing value with the new value.
 * - If the hashed address already contains another key/value pair, you must handle
 *   the collision appropriately.
 *
 * @param {string} key - key to be used to create hashed address
 * @param {string|number|boolean} value - value to be stored in hash table
 * @return {number} The new number of items stored in the hash table
 */
HashTable.prototype.set = function(key, value) {
  // convert key to hashcode address.
  const addr = hashCode(key, this.SIZE);
  console.log("OCCUPIED" , this.occupied + 1)
    //
  if((this.occupied + 1) > ((this.SIZE*3)/4)) {
    // rehash -
    let tempStorage = new Array(this.SIZE*2);
    // go through the storage, if it has a value, 
    for(let i = 0; i < this.SIZE; i++) {
      if(this.storage[i] !== undefined) {
        let newKey = hashCode(this.storage[addr][0], this.SIZE*2);
        tempStorage[newKey] = this.storage[addr];
      }
    }
    this.SIZE*=2;

    this.storage = tempStorage;
    console.log("REHASHED", this.storage);
  }

  // if nothing exists there create an object and store it there with a key value pair
  if(this.storage[addr] === undefined) {

    //
    const obj = {};
    obj[key] = value;
    this.storage[addr] = obj;
    this.occupied++;
  } else {
    this.storage[addr][key] = value;
  }

  this.entries++;
  // if an object already exists, add that to the object. 
  console.log(this.storage)

  // return the total number of items stored in the hastable

  return this.entries;
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
};
HashTable.prototype.get = function(key) {
  let addr = hashCode(key, this.SIZE);
  console.log("item is ", this.storage[addr]);
  console.log("size is ", Object.keys(this.storage[addr]).length)
  if(Object.keys(this.storage[addr]).length === 1) {
      console.log("GET one item ", this.storage[hashCode(key, this.SIZE)])
    return this.storage[hashCode(key, this.SIZE)];
  } else if(Object.keys(this.storage[addr]).length > 1){
          console.log("GET more than one item ", this.storage[hashCode(key, this.SIZE)])
    return this.storage[addr][key];
  } else {
    console.log("GET item doesnt exist", this.storage[hashCode(key, this.SIZE)])
    return undefined;
  }
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const addr = hashCode(key, this.SIZE);

  if (this.storage[addr] === undefined) return undefined;

  const retVal = this.storage[addr][key];

  console.log("Deleting ", this.storage[addr][key])
  delete this.storage[addr][key];
  console.log("THIS STORAGE ", this.storage[addr])
  if(Object.keys(this.storage[addr]).length === 0) {
    this.storage[addr] = undefined;
    this.entries--;
    this.occupied--;
  }
  return retVal;
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
