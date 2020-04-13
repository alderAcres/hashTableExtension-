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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16; // size of hash
  this.items = 0; // items currently the hash table holds
  this.storage = new Array(this.SIZE); // array that holds the items
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
HashTable.prototype.rehash = function(){
  const hashes = Object.keys(this.storage);
  // loop through the hashes of our storage
  for(const hash of hashes){
    let identicalHash = false; // will use this flag incase of a godly miracle that
                               // the new hash created from
                               // from the key is identical to the original hash
    // loop the keys that have hash collision
    const keys = Object.keys(this.storage[hash]);
    for(const key of keys){
      // generate new hash code from key
      const newHash = hashCode(key);
      if(newHash === hash){ // check for identical hashes
        identicalHash = true; // set to true, and no need to change the hash table
      }
      else { // if hash is different from the original hash then
             // set new hash code to hold key
        this.storage[newHash][key] = this.storage[hash][key];
      }
    }
    if(!identicalHash){ // if no new hashes generated were identical to the original hash
                        // we can delete the original hash
      delete this.storage[hash];
    }
  }
}

HashTable.prototype.set = function(key, value) {
  const hash = hashCode(key); // generate hash
  if(this.storage[hash] === undefined){ // check if this hash holds any keys
    this.storage[hash] = {}; // if not create an empty object that we will later mutate
  }
  if(this.storage[hash][key] === undefined){ // check if the key we are setting is new 
                                            // to the table so we then increment
                                            // this.items by one
    this.items++;
  }
  this.storage[hash][key] = value; // set the value of the key stored at the storage's hash
  if(this.items > this.SIZE * 0.75){ // check if we need to increase the hash key
    this.SIZE *= 2; // increase hash key
    this.rehash();  // rehash
  }
  return this.items;
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
  const hash = hashCode(key); // generate hash
  return this.storage[hash][key]; // grab they value stored at the key that the hash's object hold
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
  /*- If the hash table's SIZE is greater than 16 and the result of removing the
  item drops the number of stored items to be less than 25% of the hash table's SIZE
  (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything. */
  const hash = hashCode(key); // generate code
  if(this.storage[hash][key] === undefined) return undefined; // check if the key doesn't exist

  const cachedVal = this.storage[hash][key]; // store the value the key holds
  delete this.storage[hash][key]; // delete the key the hash holds
  this.items--; // decrease the number of items the hash table holds

  if(this.SIZE > 16 && this.items < this.SIZE * 0.25){ // check if we need to reduce
    this.SIZE /= 2; // reduce hash size
    this.rehash(); // rehash
  }
  return cachedVal;
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

const table = new HashTable();
for(let k = 0; k < 16; k++){
  table.set(Math.random(), 1);
}
console.log(table.SIZE);
/*table.set("foo", "dur");
console.log(table.storage);
console.log(table.items);
table.set("foo", "dur");
console.log(table.storage);
console.log(table.items);
table.set("foo", "bar");
table.set("bar", "foo");
console.log(table.items);
console.log(table.storage);
console.log(table.get("foo"));
console.log(table.items);
console.log(table.remove("foo"));
console.log(table.items);
console.log(table.remove("foo"));
console.log(table.items);
console.log(table.remove("bar"));
console.log(table.storage);
console.log(table.remove("dfdfd"));
console.log(table.items);
*/
// Do not remove!!
module.exports = HashTable;
