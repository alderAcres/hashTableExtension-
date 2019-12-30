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

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
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
  //run key through hashcode to determine index
  const index = hashCode(key, this.SIZE);
  console.log(index);
  //make a new instance of node with key and value
  const newNode = new Node(key, value);
  //check if there is a value in hash index
  if (this.storage[index]) {
    //if so, point to the current val using the node's next property
    newNode.next = this.storage[index];
  }
  //if not, put newNode into the bin!
  this.storage[index] = newNode;
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
  //run key through hash function
  const index = hashCode(key, this.SIZE);
  let current = this.storage[index];
  //check if the key matches at that index
  if(current.key !== key){
    current = current.next;
  }
  //return value of current
  return current.value;
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
  //run hashCode to get index
  const index = hashCode(key, this.SIZE);
  //check if there is a value at this index
  if(this.storage[index]){
    //check if key matches the key found at the hash index
    if (this.storage[index].key === key) {
      //if so, set the index to the next property
      this.storage[index] = this.storage[index].next;
    } else {
      //if not, make variables for current and previous nodes (starting at the next node)
      let current = this.storage[index].next;
      let prev = this.storage[index];
      while (current) {
        //if the key's match, set the previous next to point to the current next value
        if (current.key === key) {
          prev.next = current.next;
        }
        //update prev and current for next iteration
        prev = current;
        current = current.next;
      }
    }
  }
  else {
    return undefined;
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

const newHash = new HashTable();
newHash.set('key 1', 'value 1');
newHash.set('1 key', 'value 2');
newHash.set('key 18', 'idk')
console.log(newHash)
console.log(newHash.get('1 key'));
console.log(newHash.get('key 1'));
console.log(newHash.remove('key 1'));
console.log(newHash)