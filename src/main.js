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

function Node(key, value){
  this.value = value;
  this.key = key;
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
  let hash = hashCode(key, this.size);
  let stored = new Node(key, value);
  if(this.storage[hash] && arguments.length > 1){
    if(Array.isArray(this.storage[hash])){
      this.storage[hash].push(stored);
    } else {
      let head = this.storage[hash];
      this.storage[hash] = [];
      this.storage[hash].push(head);
      this.storage[hash].push(stored);
    }
  } else {
    this.storage[hash] = stored;
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
  let hash = hashCode(key);
  if(!this.storage[hash]) return null;
  else if(!Array.isArray(this.storage[hash])) return this.storage[hash].value;
  else if(Array.isArray(this.storage[hash])){
    for(let each of this.storage[hash]){
      if(each.key === key) return each.value;
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
  let hash = hashCode(key);
  if(!this.storage[hash]) return undefined;
  else if(!Array.isArray(this.storage[hash])){
    let store = this.storage[hash];
    this.storage[hash] = undefined;
    return store.value;
  } 
  else if(Array.isArray(this.storage[hash])){
    for(let i = 0;  i < this.storage[hash].length; i++){
      if(this.storage[hash][i].key === key){
        [this.storage[hash][i], this.storage[hash][0]] = [this.storage[hash][0], this.storage[hash][i]];
        return this.storage[hash].shift().value;
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

// Do not remove!!
module.exports = HashTable;


let table = new HashTable();
table.set('chess', 'cheese');
table.set('cheese', false);
console.log(table);
console.log(table.get('cheese'));
table.remove('cheese');
console.log(table.remove('cheese'));
console.log(table);

