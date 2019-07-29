/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
//my hash table with 16 buckets ()
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
//my linkedlist to handle collisions (LL in each bucket index)
function LinkedList() {
  this.head = null;
  // this.tail = null;
}

function Node(val) {
  this.value = val;
  this.next = null;
}
//address/index is set by running hashfx (determines key) = value;
let buckets = new LinkedList();

HashTable.prototype.set = function(key, value) {
  let address =  hashCode(string, this.SIZE)
  //needs to create linkedlist at each bucket... and nodes for each value 
    if (!this.buckets) {
      this.storage[address] = buckets;
    } 
  let items = new Node(value);
  //if the index is not taken up, set the value to the corresponding index (as head)
  //tracker keeps count of how many items/collisions
  let tracker = 0;
  if (!this.storage[address]) {
    buckets.head = value;
    tracker++;
  }
  //if hash address and buckets already contains an item/ head, we need to link the next collision to it's next property  
  if (tracker === 1) {
    buckets.head.next = items;
    buckets.tail = items;
    tracker++;
  //if tracker > 1 (means there is a head and next/tail value) we need to link the new item to the tail's next
  } else {
  let oldTail = buckets.tail;
  oldTail.next = items;
  buckets.tail = items;
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
  let address =  hashCode(string, this.SIZE)
  //look to storage's index...if it exists, we return that value;
  if (this.storage[address]) return buckets.head.value;
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
  let address =  hashCode(string, this.SIZE)
  //look to find address and if there is a value;
  //if the address contains no items, return undefined;
  if (!this.storage[address]) return undefined;
  //else, we remove and reassign. 
  let oldHead = buckets.head;
  buckets.head = oldHead.next;
  delete oldHead;
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

let myHash = new HashTable();
console.log(myHash.set)

// Do not remove!!
module.exports = HashTable;
