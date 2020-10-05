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

// push method to use inside of HashTable function to push values to the hashCode linked lists for collisions!! 
LinkedList.prototype.push = function (value) {
  // declare tail as value
  const newNode = new Node(value);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
    //newNode.next = this.tail;
  } else {
    this.tail.next = this.tail = newNode;
  }
};

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
  // create index and store the result of calling hashCode with key and size passed in
  const i = hashCode(key, this.SIZE);
  // check if the index of storage does not exist
      // add an empty object literal to storage
  if (!this.storage[i]) {
    this.storage[i] = {}; 
    // assign key-value pair to storage obj
    this.storage[i][key] = value;
  }
  // reassign value if key at index already exists
  if (this.storage[i].hasOwnProperty(key)) this.storage[i][key] = value;
  // if storage at index already exists and it's key is not equal to the key passed in, create a linkedlist at that hashCod
  else {
    let hashLink = new LinkedList();
    hashLink.push(this.storage[i][key]);
    hashLink.push(value);
    this.storage[i] = hashLink;
  }
};

// test cases
let newHashTable = new HashTable();
newHashTable.set('hi', 'there');
newHashTable.set('whats', 'up');
console.log(newHashTable)
// if existing key already exists
newHashTable.set('hi', 'friend');
console.log(newHashTable);

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
  // create index for passed in key using hashCode function
  const index = hashCode(key, this.SIZE);
  // iterate through the storage
  // if an object's key is equal to the key passed in, return its value
  for (let i = 0; i <= this.SIZE; i++) {
    if (this.storage.hasOwnProperty(index)) return this.storage[index][key];
  }

};

// test cases
console.log(newHashTable.get('hi'));
console.log(newHashTable.get('whats'));
// get when hash address already exists? --> I'm sorry, didn't complete this :(
/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // create index to store hashCode
  const index = hashCode(key, this.SIZE);
  // check if that index exists in the storage
  if (!this.storage[index]) return undefined;
      // if it doesn't, return undefined, otherwise:
  // store the storage's value at the index in a variable
  let removedVal = this.storage[index][key];
  // delete that key-value pair at the index
  delete this.storage[index][key];
  // return the stored value
  return removedVal;
};

// test cases
console.log(newHashTable.remove('huh'));
console.log(newHashTable.remove('hi'));
// what if the key is located in a linked list?



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
