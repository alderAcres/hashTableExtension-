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
  this.count = 0;
}

function LinkedList() {
  this.head = null;
  this.tail = null;
  this.count = 0;
}
LinkedList.prototype.push = function(value) {
  const newNode = new Node(value);
  console.log(newNode);
  
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  }else{
    this.tail.next = newNode;
    this.tail = newNode;
  }
};

function Node(val) {
  this.value = val;
  this.next = null;
}


/**
* set - Adds given value to the hash table with specified key.
*
* - //  If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
    let index = hashCode(key, this.SIZE); //same key is used to create hashed address as to be stored in linked list
    let bucket = this.storage[index];
    let item = new Node(value);
    
    // Create a new bucket if none exist
    if (!bucket) {
      console.log('if bucket does not exist')
      bucket = new LinkedList(item);
      this.storage[index] = bucket; 
      bucket.head = item;
      bucket.tail = item;
      bucket.count++;
      this.count++;
    } 
    else {
      let current = bucket.head;
      
      // If the head has null next it is there is only one node in the list
      if (!current.next) {
        current.next = item;
      }
      else {
        // move to the end of the list
        while(current.next) {
          current = current.next;
        }
        
        current.next = item;
      }
      bucket.count++;
      this.count++;
      
      return 'New item placed in bucket at position ' + bucket.count;
    }
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





const test = new HashTable();
console.log(test.storage);
test.set('1', 'Justin');
console.log(test.storage);
test.set('2', 'Gillespie');
console.log(test.storage);
test.set('1', 'Joel');
console.log(test.storage)



// Do not remove!!
module.exports = HashTable;
