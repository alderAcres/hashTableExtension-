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

  this.numItems = 0;
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

  //create hash
  let hash = hashCode(key, this.SIZE);

  //adding new k, v pair
  if (this.storage[hash] === undefined) {

    //double size if adding an element brings us to 75% of SIZE
    //increment count of items
    if(++this.numItems > this.SIZE*3/4) {
      this.resize(true);
      hash = hashCode(key, this.SIZE) //rehash with new size
    }

    const obj = {};
    obj[key] = value;
    this.storage[hash] = obj;
  } else { //update existing k, v pair
    this.storage[hash][key] = value;
  }

};

HashTable.prototype.resize = function(grow) {

  let newSIZE = grow ? 2*this.SIZE : this.SIZE/2;
  console.log(newSIZE)
  const newStore = new Array(newSIZE);
  let newNumItems = 0;

  for(let i = 0; i < this.SIZE; i++ ) {
    if(this.storage[i] === undefined) { // check that hashed entry is not undefined
      continue;
    }
    for(let key in this.storage[i]) { //for each item in hashed object, rehash and store in new table
      const newHash = hashCode(key, newSIZE)
      if (newStore[newHash] === undefined) { //if hash object doesn't exist in new storage
        const obj = {};
        obj[key] = this.storage[i][key];
        newStore[newHash] = obj;
      } else {
        newStore[newHash][key] = this.storage[i][key]
      }
      newNumItems++;
    }

  }

  this.SIZE = newSIZE
  this.storage = newStore;
  this.numItems = newNumItems;

  // double SIZE
}

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
  return this.storage[hashCode(key, this.SIZE)][key]
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {

  let value = this.get(key); //CHECK IF KEY EXISTS
  if (value === undefined) {
    return undefined;
  }

  if(--this.numItems < this.SIZE*1/4 && this.SIZE > 16) //reduce size
    this.resize(false)


  delete this.storage[hashCode(key, this.SIZE)][key]
  return value;
};

/*
let hash = new HashTable;
hash.set("turtles", "I like them")

console.log(hash.get("turtles"))

console.log(hash.remove("turtles"))

console.log(hash.SIZE)

for(let i = 0; i < 200; i++) {
  hash.set("turtles" + i, "i".repeat(i))
}

console.log(hash.SIZE)

console.log(hash.get("turtles18"))


for(let i = 0; i < 100; i++) {
  hash.remove("turtles" + i);
}

console.log(hash.SIZE)

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
