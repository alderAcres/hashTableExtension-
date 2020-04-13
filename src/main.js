//use linkedList to avoid collisions.
function LinkedList1() {
  this.head = null;
  this.tail = null;
}

function Node1(key, val) {
  this.value = {key, val};
  this.next = null;
}

// adds node to end of list
LinkedList1.prototype.push = function (key, value) {

  let newKey = true;
  let node = new Node1(key, value)
  if (this.head === null) {
    this.head = node;
  }
  else {
    this.current = this.head;
    while (this.current.next != null) {

      console.log(this.current.value);
      // console.log(this.current.value[key]);
      if (this.current.value[key] == key){
        this.current.value[val] = value;
        newKey = false;
        break;
      }
      this.current = this.current.next;

      
    }
    if (newKey){
      this.current.next = node;
    }
    
  }
  return newKey;

};

let linkedList1 = new LinkedList1();
console.log(linkedList1.push("male", "tommy"));
console.log(linkedList1.push("male", "harry"));
console.log(linkedList1);

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
  this.itemsStored = 0;
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
  let hashAddress = hashCode(key, this.SIZE);
  // console.log(hashAddress)
  
  let newKey = true;
  if (this.storage[hashAddress] == undefined) {
    let linkedList1 = new LinkedList1();
    linkedList1.push(key, value);
    // console.log(linkedList1);
    this.storage[hashAddress] = linkedList1;
  } else {
    newKey = this.storage[hashAddress].push(key,value);
  };

  // console.log(this.storage);
  return newKey ? ++this.itemsStored : this.itemsStored;
};

let hashtable = new HashTable();
console.log(hashtable.set("male", "tommy"));
console.log(hashtable.set("male", "harry"));
console.log(hashtable.set("female", "katty"))


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
  let hashAddress = hashCode(get);
  // console.log(hashAddress)
  
  if (this.storage[hashAddress] == undefined) {
    throw Error(`HashTable get: no item found with key ${key} provided ! `);
  } else {
    this.storage[hashAddress];
  };
  // console.log(this.storage);
  return ++this.itemsStored;
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
