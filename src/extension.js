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
  this.SIZE = 16;
  
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

// If adding the new item will push the number of stored items to over 75% of
//         the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);

  if(!this.storage[index]) {
    this.storage[index] = {};
   
  } 
  this.storage[index][key] = value;
  
  
  const occupiedLength = Object.values(this.storage).length;
  
  if(occupiedLength > (3/4 * this.SIZE)) {
    
    this.SIZE = this.SIZE * 2;
    this.storage = []

 
      for(let i = 0; i < this.storage.length; i++) {
        const curr = this.storage[i];
        if(Array.isArray(curr)) {
          curr = curr.flat();
        }
        for(const key in curr) {
          const index = hashCode(key, this.SIZE);
          console.log(index)
          this.storage[index][key] = curr[key]; 
     

        
        }
      }
  }
};
  // this.storage[index][key] = value;
  
  // const occupiedLength = Object.values(this.storage).length;
  // const vals = Object.values(this.storage);
  // const flattened = vals.reduce((accum, curr) => {
  //   if(Array.isArray(curr)) {
  //     accum.concat(curr);
  //   } else {
  //     accum.push(curr);
  //   }
  //   return accum;
  // }, [])

  // console.log(occupiedLength)

  // if(occupiedLength > (3/4 * this.SIZE)) {
    
  //   this.SIZE = this.SIZE * 2;
  //   this.storage = []
  //   for(let i = 0; i < flattened.length; i++) {
  //     const curr = flattened[i];
  //     for(const key in curr) {
  //       const index = hashCode(key, this.SIZE);
  //       console.log(index)
  //       this.storage[index][key] = curr[key]; 
  //     }
      
    
  //     } 
     

  //   }
  
const hash = new HashTable();
//console.log(hash)
hash.set('sara', 2);
hash.set('paul', 9)
hash.set('cho', 7)
hash.set('hanna', 3)
hash.set('paula', 3)
hash.set('c', 7)
hash.set('co', 7)
hash.set('ho', 7)
hash.set('o', 7)
hash.set('anna', 3)
hash.set('ula', 3)
hash.set('cay', 7)
hash.set('coy', 7)
 hash.set('hoy', 7)
 hash.set('hy', 7)
 hash.set('oy', 7)
 hash.set('y', 7)
 hash.set('hoell', 7)
 hash.set('ola', 7)
console.log(hash)

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
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
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
  const index = hashCode(key, this.SIZE);
  if(!this.storage[index]) return undefined;
  delete this.storage[index][key];
};

// const hash = new HashTable();
// hash.set('sara', 2);
// hash.set('paul', 9)
// hash.set('cho', 7)
// hash.set('hanna', 3)
// console.log(hash.remove('paul'))
// console.log(hash)


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

// Do not remove!!
module.exports = HashTable;

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
