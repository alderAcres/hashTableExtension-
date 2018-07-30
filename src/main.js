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
  this.head = null;
  this.tail = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
}

// adds a node to the specified index
// if index is specified, accepts parameter (value, index)
// if no index is specified then add element to the end of list
LinkedList.prototype.add = function(value) {
  if (!this.head) {
    this.head = this.tail = new Node(value);
    return;
  }
  this.tail.next = new Node(value);
  this.tail = this.tail.next;
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
  console.log(key)
  if (typeof value !== 'string') {console.log('Invalid Input')};


  console.log(this.SIZE)
  console.log(value)
  
  
  let hashedKey = hashCode(value,this.SIZE);
  console.log(hashedKey)

  // if provided key has already been used...
  for (let keyCheck in this.storage) {
    if (key === keyCheck) {
      this.storage[key] = value;
  } else {
    hashedKey = hashCode(value,this.SIZE);
  }
}
  
  // if location is empty place value at hashedKey 
  if (this.storage[hashedKey] === undefined) {
     this.storage[hashedKey] = value;
  } else {
    for (let empty in this.storage) {
      if (this.storage[empty] === undefined) {
        this.storage[empty] = value;
      } else {
        let newCollision = new LinkedList()
        newCollision.add(value)
        this.storage[hashedKey] = newCollision
      }
    }
  }
  console.log(this.storage)

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
  return this.storage[key]
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
  if (this.storage[key]) {
    this.storage[key] = undefined;
    key = undefined
  } else {
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


let myHashTable = new HashTable();

myHashTable.set(1, 'hello1')
myHashTable.set(1, 'hello1')

console.log(myHashTable)

// Do not remove!!
module.exports = HashTable;
