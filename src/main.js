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
  // simply add value
  let hashkey = hashCode(key, this.SIZE);
  let obj = this.storage[hashkey];

  if(obj){
    // console.log('collision insert', value, 'Key', key)
    obj[key] = value;   // handle collision
    // console.log(obj);
  }
  else{
    // console.log('new insert', value, 'Key', key, 'Hashkey', hashkey);
    let temp = {};
    temp[key] = value;
    this.storage[hashkey] = temp;  // empty bucket
    // console.log('ADDED', this.storage[hashkey]);
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
  let hashkey = hashCode(key, this.SIZE);
  let bucket = this.storage[hashkey];
  // console.log('GET bucket', bucket);
  for(let prop in bucket){
      if(key === prop){
        return bucket[key];
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
  let hashkey = hashCode(key, this.SIZE);
  let bucket = this.storage[hashkey];
  for(let prop in bucket){
      if(key === prop){
        delete bucket[prop];
        break;
      }
  }
  return undefined;
};

// ---------------- TESTING ---------------
// let h = new HashTable();
// // h.set('1', 'hi');
// // h.set('2', 'he');
// h.set('3', 'hel');
// h.set('3x', 'hell3333');
// h.set('5', 'hello');

// console.log(h.get('3'));
// h.remove('2');
// console.log(h.get('3x')); // hashkey = 5
// console.log(h.get('5'));  // hashkey = 5

// ---------------- ------- ---------------

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
