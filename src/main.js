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

function Node(val) {
  this.value = val; 
  this.next = null;
}

LinkedList.prototype.push = function(value) {
  let newNode = new Node(value);

  if (this.head == null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
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
<<<<<<< Updated upstream

=======
  // use hashcode to get hashed address
  let address = hashCode(key, this.SIZE)
  // console.log(`address ${address}`);
  let linkedList = new LinkedList()

  // if there is a collision, add to linked list
  this.storage[address] = linkedList.push(value);

  console.log(linkedList);

  // get count of keys in hash table
  let hashCount = Object.keys(this.storage).length;
  // get count of linked list values within has table
  for (const key in this.storage) {
    for (const keyL in this.storage[key]) {
        
      }
    }
  }

  
  
  // return how many keys in hash table
  return Object.keys(this.storage).length;
>>>>>>> Stashed changes
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
