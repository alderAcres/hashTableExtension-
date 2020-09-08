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
HashTable.prototype.set = function(key, value) {
  const bucketNumber = hashCode(key, this.SIZE);
  const hashObj = {};
  hashObj[key] = value;

    if(this.storage[bucketNumber]){
      this.storage[bucketNumber].push(hashObj)  
    }  else {
      this.storage[bucketNumber] = [hashObj]
    }
  

    //if key exsists at bucket number update value
        //iterate over bucket and check for key
        //if key update value
  //   for (let i = 0; i < this.storage[bucketNumber].length; i++) {
  //     if(this.storage[bucketNumber][i][key]){
  //       this.storage[bucketNumber][i][key] = value
  //     }
  //  }
  //  console.log(this.storage[bucketNumber])

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
  const bucketNumber = hashCode(key, this.SIZE);
  //iterate over bucket
    //if key is found return the value stored at that key
  for (let i = 0; i < this.storage[bucketNumber].length; i++) {
    if(this.storage[bucketNumber][i][key]) {
      return this.storage[bucketNumber][i][key];
    }
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
HashTable.prototype.remove = function(key) {
  const bucketNumber = hashCode(key, this.SIZE);
  //iterate over storage
    //if bucket number is not found return undefined
    //else 
      //create variable to store value to delete
      //delete value
      //return the removed variable
  for (let i = 0; i < this.storage.length; i++) {
    if(!this.storage[bucketNumber]){
      return undefined;
    } else {
      const removed = this.storage[bucketNumber][i][key];
      delete this.storage[bucketNumber][i][key];
      // this.storage[bucketNumber].splice([i], 1)
      return removed;
    }
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

// Do not remove!!
module.exports = HashTable;


const hashTab = new HashTable()
console.log(hashTab.set('akosua', '31'))
console.log(hashTab.set('akosua', 'hello'))
// console.log(hashTab.set('lisa', '29'))
// console.log(hashTab.set('david', '30'))

// console.log(hashTab.get('lisa'))
// console.log(hashTab.remove('akosua'))

console.log(hashTab)