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

function LinkedList() {
  this.tail = null;
  this.head = null;
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
  console.log(this.storage[(hashCode(key, this.SIZE))])
  let index = (this.storage[hashCode(key, this.SIZE)]);
  let node = new Node(key, value);
  // if no collisions
  if (index === undefined) {
    index = new LinkedList();
    index.head = index.tail = node;
  }
  // collisions
  else {
    index.tail.next = node;
    index.tail = node;
    console.log(index)
  }
};

const hashTable = new HashTable();
hashTable.set(0, 12);
hashTable.set(1, 2);
hashTable.set(1, 13);
console.log(hashTable.storage[hashCode(1, 16)]);

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
  let index = (this.storage[hashCode(key, this.SIZE)]);
  if (!index.head) return undefined;
  let pointer = index.head;
  while (pointer.key !== key || pointer.next !== null) {
    pointer = pointer.next;
  }
  return pointer.key === key ? pointer.value : undefined;
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
  let index = (this.storage[hashCode(key, this.SIZE)]);
  if (!index.head) return undefined;
  let pointer = index.head;
  // if no collisions
  if (pointer.key === key && !pointer.next) {
    // get value of node
    let val = pointer.value;
    // reset value of index to undefined
    index = undefined;
    // return value of node
    return val;
    // if key matches head node in list
  } else if (pointer.key === key && pointer.next) {
    // get value of node
      let val = pointer.value;
      // reset head to next node in list
      index.head = pointer.next;
      pointer = undefined;
      return val;
  } else if (pointer.key !== key && pointer.next) {
    while (pointer.next) {
      // check if next node contains key
      if (pointer.next.key === key) {
        // get value of node w/ matching key
        let val = pointer.next.value;
        // reset current node's 'next' to reference the node after the one we are deleting
        pointer.next = pointer.next.next;
        return val;
      }
    }
    // if we reach tail, return value if it matches key and undefined otherwise
    return pointer.key === key ? pointer.value : undefined;
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
