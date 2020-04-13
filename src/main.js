/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.length = 0;
  this.storage = new Array(this.SIZE);
}

function HashNode(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}
HashNode.prototype.last = function() {
  let result = this;
  while (result.next) {
    result = result.next;
  }
  return result;
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
  let hash = hashCode(key, this.SIZE);
  let node = new HashNode(key, value);
  if (this.storage[hash]){
    this.storage[hash].last().next = node;
  } else {
    this.storage[hash] = node;
  }
  return ++this.length;
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
  let hash = hashCode(key, this.SIZE);

  if (this.storage[hash] === undefined){
    //bucket is empty, key cannot exist
    return undefined;
  }

  //crawl linked list to find key
  let result = this.storage[hash];
  while (result.key !== key) {
    if (result.next === null) {
      //no more nodes in the list, key does not exist
      return undefined;
    }

    result = result.next;
  }

  return result.value;
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
  let hash = hashCode(key, this.SIZE);

  if (this.storage[hash] === undefined) {
    //bucket is empty, key cannot exist
    return undefined;
  }

  //crawl linked list to find key
  let parent = null;
  let target = this.storage[hash]; 
  while (target.key !== key) {
    if (target.next === null) {
      //no more nodes in the list, key does not exist
      return undefined;
    }

    parent = target;
    target = target.next;
  }

  //key exists
  this.length -= 1;

  let result;
  if (parent === null) { 
    //node to remove is head
    if (target.next) {
      this.storage[hash] = target.next;
    } else { 
      //node to remove is last value in bucket
      delete this.storage[hash];
    }
  } else if (target.next === null) { 
    //node to remove is tail
    parent.next = null;
  } else { 
    //node to remove has parent and child which must be linked
    parent.next = target.next;
  }
  return target.value;
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

//tests
let hashtable = new HashTable();
hashtable.set(1, "one");
hashtable.set(2, "two");
hashtable.set(3, "three");
console.log(hashtable.set(4, "four"), "(expect '4')");
console.log(hashtable.get(1), "(expect 'one')");
console.log(hashtable.get(2), "(expect 'two')");
console.log(hashtable.get(4), "(expect 'four')");
console.log(hashtable.get("five"), "(expect 'undefined')");
console.log(hashtable.remove(4), "(expect 'four')");
console.log(hashtable.remove(2), "(expect 'two')");
console.log(hashtable.remove(1), "(expect 'one')");
console.log(hashtable.set("five", 5), "(expect '2')")
