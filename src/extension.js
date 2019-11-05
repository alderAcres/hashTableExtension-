/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
function HashTable() {
  this.SIZE = 16;
  this.counter = 0
  this.storage = new Array(this.SIZE);
}


const hash = new HashTable()
console.log(hash)


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

    // for (let [key, value] of Object.entries(this.storage)) {
    //   if (this.storage[key]) {
    //     this.counter += 1
    //     console.log("counter", counter);
    //   }
    // }


        //first find a method to see what percentage of the array's storage is being used
        //then go into your two clauses, the first being if the storage space is over 75%
        //IF CLAUSE---> double the storage.SIZE property *= 2
        //get all existing key-value pairs 
        //rehash them 
        //place newly hashed key-value pairs into brand new storage object
        //the second  clause is the else, which is less than 75% here you can resume normal setting methods


    if (this.counter > this.SIZE * 0.75) {
      this.SIZE *= 2
      console.log(this.SIZE)
    }


  //to set a property first access whether or not a value exists for the particular index
  //if it goes add on the value into that particular index with your key, if there is a key overrwrite it
  //if there is no key/value pairing at the index you are accessing then you create a new object and add it onto that index
  const index = hashCode(key, this.SIZE)
  if (this.storage[index]) {
    this.storage[index][key] = value
    this.counter++
  } else {
    this.storage[index] = { [key] : value}
    this.counter++
  }

};

hash.set("dua", "lipa")
hash.set("feelin", "myself")
hash.set("hello", "world")
hash.set("beyonce", "knowles")
hash.set("a", "b")
hash.set("c", "d")
hash.set("e", "f")
hash.set("g", "h")
hash.set("i", "j")
hash.set("k", "l")
hash.set("m", "n")
hash.set("o", "p")
hash.set("q", "r")
hash.set("s", "t")
hash.set("zy", "bsss")
hash.set("asc", "ber")
hash.set("asdsd", "xdfesb")
hash.set("asaddds", "basa")
hash.set("adadd", "bddsd")

console.log(hash.SIZE)

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
  //check to see if the key exists at the specific index that it was genereated for
  //if it doesn't exist then you should return undefined
  //if it does exist return the VALUE
  const index = hashCode(key, this.SIZE)
  console.log(index)

  if(!this.storage[index]) {
    return 
  } else {
    console.log(this.storage[index][key])
    return this.storage[index][key]
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
  //as always first get the index asssociated with your key
  const index = hashCode(key, this.SIZE) 
  if(!this.storage[index]) {
    return
  } else {
    const removedValue = this.storage[index][key]
    delete this.storage[index][key]
    return removedValue
  }
};



// YOUR CODE ABOVE

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
