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
  this.itemCount = 0;
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
  let hashConverted = hashCode(key, this.SIZE);
  if (!this.storage[hashConverted]) {
    this.storage[hashConverted] = [[key, value]];
  } else {
    this.storage[hashConverted].push([key, value]);
  }
  return ++this.itemCount;
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
  debugger;
  let hashConverted = hashCode(key, this.SIZE);
  if (!this.storage[hashConverted]) return undefined; 

  if (this.storage[hashConverted].length === 1 && this.storage[hashConverted][0] === key) {
    return this.storage[hashConverted][0][1];
  } else {
    for (let i = 0; i < this.storage[hashConverted].length; i++) {
      if (this.storage[hashConverted][i][0] === key) {
        return this.storage[hashConverted][i][1];
      }
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
  let hashConverted = hashCode(key, this.SIZE);
  console.log(hashConverted);
  console.log(this.storage[hashConverted].length)
  if (!this.storage[hashConverted]) return undefined; 

  if (this.storage[hashConverted].length === 1) {
    let deletedVal = this.storage[hashConverted][0][1];
    delete this.storage[hashConverted];
    return deletedVal;
  } else {
    for (let i = 0; i < this.storage[hashConverted].length; i++) {
      if (this.storage[hashConverted][i][0] === key) {
        deletedVal = this.storage[hashConverted][i][1];
        this.storage[hashConverted].splice(i, 1);
        this.itemCount--;
        console.log(this.storage[hashConverted])
        // console.log(deletedVal)
        return deletedVal;
      }
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

let hashy = new HashTable();
console.log(hashy.set('man', 'John Smith'));
console.log(hashy.set('woman', 'Joan Smith'));
console.log(hashy.set('girl', 'Jeannie Smith'));
console.log(hashy.set('boy', 'Johnny Smith'));
console.log(hashy.set('ape', 'Tarzan Smith'));
console.log(hashy.set('fish', 'Guppy Smith'));
console.log(hashy.get('boy'));
console.log(hashy.get('dog'));
console.log(hashy.get('girl'));
console.log(hashy.set('cat', 'Whiskers Smith'));
console.log(hashy.remove('cat'));
console.log(hashy.get('cat'));
console.log(hashy.get('ape'));
console.log(hashy.set('friend', 'Jane Doe'));
// console.log(hashy.get('woman'));
console.log(hashy);
// Do not remove!!
module.exports = HashTable;
