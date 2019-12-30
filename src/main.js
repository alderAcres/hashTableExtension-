/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  // represents the spots in array or objects in storage
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);

  //represents the key and value pairs within hashtable
  this.number = 0;

}


//constructs a new Hashtable object and assigns it to ht
const ht = new HashTable



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
  // pass the key and size into hashcode, assign it to const index. The index will then be the correct index in storage
  const index = hashCode(key, this.SIZE)

  //check if spot in index is undefined
  //if undefined, at index create a new object and as key value pair.
  if (this.storage[index] === undefined){
    this.storage[index] = {}
    this.storage[index][key] = value
    this.number += 1
  } else {
    // if object exists at index, add key and value pair

    let tempObj = {}
    tempObj[key] = value
    let oldObj = this.storage[index]
    
    this.storage[index][key] = value
  

  }

  // return the number of key value pairs in  hashtable
  return this.number

};

//Tests
ht.set("test", "round 1")
ht.set("test2", "round 2")
ht.set("test", "round 3")

// console.log(ht.storage)




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
  //correct index of item in storage
  const index = hashCode(key, this.SIZE)
  
  // returns value of key at the correct index in storage
  return this.storage[index][key]

};

//get

// console.log(ht.get("test"))


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //correct index of item in storage
  const index = hashCode(key, this.SIZE)

  // if the value of the key at the correct index in hashtable is undefined return undefined
  if (this.storage[index][key] === undefined) return undefined

  //store the value key and value that will be deleted
  const storedObject = this.storage[index][key]


  // decrease number if object empty
  if(this.storage[index] === {} ){
    this.storage[index] === undefined
    this.number -= 1;
  }



  // delete the item
  delete this.storage[index][key]

  //return the deleted item
  return storedObject


};

//tests
console.log(ht.remove("test"))
console.log(ht.storage)


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
