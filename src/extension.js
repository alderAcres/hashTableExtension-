//changed branch and repushed
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
  this.count = 0;
  this.storage = new Array(this.SIZE);
  for(let i = 0; i < this.storage.length; i++){
    this.storage[i] = {}
  }
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
// Modify the code to reflect to following:




// 1. set:
//     - If adding the new item will push the number of stored items to over 75% of
//       the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.reHash = function(size){
  //get original hashKey
  let newStorage = new Array(size)
  for(let i = 0; i < size; i++){
    newStorage[i] = {}
  }
  for(let obj of this.storage){
    for(let key in obj){
      const originalHashedKey = hashCode(key, this.SIZE)
      const rehashedKey = hashCode(key, size)
      newStorage[rehashedKey][key] = this.storage[originalHashedKey][key]
    }
  }
  this.storage = newStorage
  this.SIZE = size  
}

// when item becomes 13 it should double the size
HashTable.prototype.set = function(key, value) {
  const hashedKey = hashCode(key,this.SIZE)
  this.storage[hashedKey][key] = value
  this.count++

  if(this.count / this.SIZE > 0.75){
    this.reHash(this.SIZE * 2)
  }
  
  return this.storage[hashedKey]
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
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key]
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
/**
 * 
  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything. 
 */
HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(key, this.SIZE)
  if(!this.storage[hashedKey]) return
  
  let deleted = this.storage[hashedKey][key]
  
  delete this.storage[hashedKey][key]
  this.count--
  if (this.SIZE >= 16 && this.count / this.SIZE < .25){
    this.reHash(this.SIZE / 2)
  }
  return deleted
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
// const h = new HashTable()
// h.set('a', '1')
// h.set('b', '2')
// h.set('c', '3')
// h.set('d', '4')
// h.set('e', '5')
// h.set('f', '6')
// h.set('g', '7')
// h.set('h', '8')
// h.set('i', '9')
// h.set('j', '10')
// h.set('k', '11')
// h.set('l', '12')
// h.set('m', '13')
// console.log(h)
// h.remove('a')
// h.remove('b')
// h.remove('c')
// h.remove('d')
// h.remove('e')
// h.remove('f')
// console.log(h)