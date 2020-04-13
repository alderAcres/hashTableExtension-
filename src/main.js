/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
 this.storage = new Array(this.SIZE)
// make storage area
}
///need a node constructor to implement linked list structure( if time left maybe switch to class declaration)
function Node (key, value){
  this.value = value
  this.key = key
  this.next = null
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
  //simplify typing with vars
let obj = new Node(key, value)
let hash = hashCode(key)
if (!this.storage[hash]){
  this.storage[hash] = obj
}
else {
  let head = this.storage[hash]
  while (head.next !== null){
    head = head.next
  }
  head.next = obj
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
let current = this.storage[hashCode(key)]
while (current !== null){
  if(current.key = key) {
    return current.value
  }
  current = current.next
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
  // check if location exists, simplify repeat typing with index var
let index = hashCode(key)
if (this.storage[index]){
  return
}
// check if target is the head
if (this.storage[index].key === key){
  let obj = this.storage[index]
  // if it is, reset the head to the next link
  this.storage[index] = this.storage[index].next
  return obj.value
  // if time remains check if pass by reference messes with this, if so, JSON parser to clone node
}
// target is not head:
let current = this.storage[index]
while (current.next !== null){
  if (current.next.key === key){
   //fix chain (try parser to make sure reference isnt broken)
   let obj = JSON.parse(JSON.stringify(current.next))
   let newNext = current.next.next
   current.next = newNext
   return obj.value
  }
  current = current.next
}
return undefined
};
// case)

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
