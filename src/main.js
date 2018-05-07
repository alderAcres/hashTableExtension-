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
  let list = new LinkedList();
  let node = new HashNode(key, value);
  let hashKey = hashCode(key);
  let current = this.storage[hashKey].head;
  let overwrited = false;

  if(!current) {
    list.head = node;
    list.tail = node;
    this.storage[hashKey] = list;
  } else {
    while(current.next) {
      if(current.key === key) {
        current.value = value;
        overwrited = true;
        break;
      }
      current = current.next;
    }
    if(!overwrited) {
      current.next = node;
      this.storage[hashKey].tail = current.next;
    }
  }
  if(overwrited) {
    return 0;
  } else {
    return 1;
  }
};

function LinkedList() {
  this.head = null;;
  this.tail = null;
}
function HashNode(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
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
  let hashKey = hashCode(key);
  let current = this.storage[hashKey].head;
  if(current) {
    while(current.key !== key) {
      current = current.next;
      if(!current) return false;
    }
    return current.value;
  } else {
    return false;
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
  let hashKey = hashCode(key);
  let current = this.storage[hashKey].head;
  let previous;
  if(current) {
    while(current.key !== key) {
      previous = current;
      current = current.next;
      if(!current) return false;
    }
    if(previous) {
      if(current.next) {
        previous.next = current.next;
      } else {
        
      }
    } else {
      if(current.next) {
        current = currnet.next;
      } else {

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
