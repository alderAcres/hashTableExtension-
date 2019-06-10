/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.numItems = 0;
  this.storage = new Array(this.SIZE);
}

function Node(key, val) {
  this.key = key;
  this.value = val;
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
  let position = hashCode(key,this.size);
  let newNode = new Node(key,value);
  if(this.storage[position] === undefined){
    this.storage[position] = newNode;
    this.numItems++;
    return this.numItems;
  }
  else{ // meaning hashed address already contains another key/value pair
    let counter = this.storage[position];
    while(counter.next != null){
      if(counter.key == key){
        counter.value = value;
        // since I overwrote the existing value, numItems does not increase
        return this.numItems;
      }
      counter = counter.next;
    }
    counter.next = newNode; //attaching new Node to the last of the hased address
    this.numItems++;
    return this.numItems;
  }
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, 
*   then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  let position = hashCode(key,this.size);
  if(this.storage[position] === undefined){
    return 'there is no value inside hashtable for the key'
  }
  else{
    let counter = this.storage[position];
    while(counter !== null){
      if(counter.key === key){
        return counter.value;
      }
      counter = counter.next;
    }
    return 'there is no value inside hashtable for the key'
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
  let position = hashCode(key,this.size);
  if(this.storage[position] === undefined){
    return undefined;
  }
  else{
    let counter = this.storage[position];
    let previous = null;
    while(counter !== null){
      if(counter.key === key) {
        // case 1 the node we are trying to delete is the first node
        if(previous === null){
          this.storage[position] = counter.next;
          this.numItems--;
          return counter.value;
        }
        // case 2 the node we are trying to delete is the last node
        else if(counter.next === null){
          previous.next = null;
          this.numItems--;
          return counter.value;
        }
        // case 3 the node we are trying to delete is in the middle
        else{
          previous.next = counter.next;
          this.numItems--;
          return counter.value;
        }
      }
      previous = counter; 
      counter = counter.next
    }
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

// Do not remove!!
module.exports = HashTable;


// /**** test
//  * 
//  * 
//  */

// let HT = new HashTable();

// HT.set("hello",3);
// HT.set("bye",4);
// HT.set("hello",5);
// console.log(HT.set("yolo",5))
// HT.set("coding",19)
// console.log(HT.set("coding",8))
// console.log(HT.get("hello"));
// HT.set("hello",4);
// HT.set("coding",7)
// console.log(HT.get("hello"));
// console.log(HT.get("coding"));
// HT.remove("coding")
// console.log(HT.get("coding"));
// console.log(HT.remove("sjdfkldsa"))