/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:



  
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  
  this.storage = new Array(this.SIZE);
  this.items = 0;
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
// 1. set:
// - If adding the new item will push the number of stored items to over 75% of
//   the hash table's SIZE, then double the hash table's SIZE and rehash everything
HashTable.prototype.set = function(key, value) {
  if(this.items > (0.75* this.SIZE)){
    let rehash = Object.entries(this.storage);
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);
    for(let elm of rehash){
      let newKey = elm[0];
      let val = elm[1];
      if(typeof val === 'object'){
        let address = hashCode(newKey, this.SIZE);
        // if(this.storage.hasOwnProperty(address))
        this.storage[address] = {}
        for(let [k,v]  in val){
          
          this.storage[address][k] = v; 
          this.items++;
        }
      }
        else{
          let address = hashCode(k, this.SIZE);
          this.storage[address][newKey] = val; 
          this.items++;
        }
      }
    }
    else if (this.items < (0.75 * this.SIZE)){
      let address = hashCode(key, this.SIZE);
      if(!this.storage.hasOwnProperty(address)){
        this.storage[address] = {};
        this.storage[address][key] = value;
        this.items++;
      }
      else {
        this.storage[address][key] = value;
        this.items++;
    }
  }
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
  let address = hashCode(key, this.SIZE);
  return this.storage[address][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
// 2. remove:
//       - If the hash table's SIZE is greater than 16 and the result of removing the
//         item drops the number of stored items to be less than 25% of the hash table's SIZE
//         (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
HashTable.prototype.remove = function(key) {
  let address = hashCode(key, this.SIZE);
  if(this.storage[address][key] === undefined){
    return undefined;
  }
  else {
    delete this.storage[address][key];
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

let hash = new HashTable();
hash.set('first', 1);
hash.set('second', 2);
hash.set('ff', 5);
hash.set('gg', 6);
hash.set('skjfdhaslk', 7);
hash.set(';dlfs', 8);
hash.set('slkjdfhasl', 6);
hash.set('fsaldjkfasjkld', 6);
hash.set('sdfjlaskjhf', 6);
hash.set('ljskdfhalkj', 6);
hash.set('asldjfhalkjsh', 6);
hash.set('sjldkfhalsk', 6);
hash.set('askjdlhfl', 6);
hash.set('dfgisdjf;lkg', 8);

console.log(hash);
hash.remove('gg');
console.log(hash.get('ff'))
console.log(hash);






// Do not remove!!
module.exports = HashTable;