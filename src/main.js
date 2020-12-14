/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 5;
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
HashTable.prototype.set = function(key, value) {
// create a hashindex by invoking hashcode (key, this.size)
// create an object to store:
      //{key: value,
      // next: null}
// check if the slot exists
    // if this.storage[hashindex] doesn't exist (undefined), then create it as a blank object, and store our newly made obj -> {key: object};
    // if the slot does exist:
      // check if key exists. if slot[key] is truthy, then reassign slot[key][key]
      // else, -> create a linked list.
        // loop through slot -> for (node in slot)
          // while (node.next !== null) -> reassign node = node.next;
          // when we reach the end of the LL:
              // reassign current tail's next property to point to the newly made KVP

  const hashIndex = hashCode(key, this.SIZE);
  console.log(`${key}'s hashIndex= `, hashIndex)
  const storeMe = {
    [key]: value,
    next: null,
  };
  
  if (!this.storage[hashIndex]){ // if slot doesn't exist, create a new slot obj and store the KVP as an object
    this.storage[hashIndex] = {
      [key]: storeMe,
    }
  } else { // if slot exists
    let slot = this.storage[hashIndex];
    if (slot[key]){  // if same key was given, update the value
      slot[key][key] = value
    } else { // update the linked list to avoid collision

      const linkedList = Object.keys(slot);
      let node = slot[linkedList[0]]
   
      while (!node){// iterate until we reached the tail of the LL
        node = node.next;
      };
    
      slot[key] = storeMe; // create a node in the slot
      node.next = slot[key]; // point to the new node // <- need to refactor.. the nodes are not pointing to the place in memory for obj
    }
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
//module.exports = HashTable;


const testtt = new HashTable();
testtt.set('dan', true); // hashIndex = 2
testtt.set('dan', false); // if same key is given, new value is saved
testtt.set('heidi', false); // hashIndex = 0
testtt.set('andrew', true); // hashIndex = 0
testtt.set('andy', true);
testtt.set('jimmy', true);

console.log(testtt);