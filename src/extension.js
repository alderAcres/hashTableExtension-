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
function HashTable(size = 16) {
  this.SIZE = size;
  this.numOfItems = 0; 
  this.storage = new Array(this.SIZE);
}

// PASTE AND MODIFY YOUR CODE BELOW
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
// for Airbnb sake
const has = Object.prototype.hasOwnProperty; 

HashTable.prototype.set = function(key, value) {
  // declare a variable the refers to the index on the hash table we will be storing our value
  const index = hashCode(key, this.SIZE);

  // if the hash bucket at the comptued index is empty (undefined), create and store a new empty object at that index,
  if (!this.storage[index]) {

    this.storage[index] = {};
  }

  // for sake of keeping num of Items correct, we calculate if hash table already has a key at that property
  if (has.call(this.storage[index], key)) {

    this.numOfItems--; 
  }

  // store inputs as property of object stored at the computed index on the hash table, and increase the number of items count
  this.storage[index][key] = value;
  this.numOfItems++; 

  // RESIZING FUNCTIONALITY

  // determine wheter numOfItems in table is greater than 75% of size of storage
  if (Number.parseFloat(this.numOfItems / this.SIZE).toFixed(2) > .75) {

    // double current size of HT
    this.SIZE = this.SIZE * 2
    
    // create new instance of a hash table that will replace our current hash table
    const doubledHash = new HashTable(this.SIZE); 

    // iterate through storage of current hash table
    for (let i = 0; i < this.storage.length; i++) {
      // on each element, iterate through the keys of stored object, calling the .set method from new instance of Hash table, passing in current key  each time
      for (let key in this.storage[i]) {

        doubledHash.set(key, this.storage[i][key])
      }

    }

    // replace current storage with storage array on new HT
    this.storage = doubledHash.storage;


  }

  // return new number of items in table; 
  return this.numOfItems; 

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
  // calculated index at with this key is stored
  const index = hashCode(key, this.SIZE);

  // access value associated with the key stored on the object at that index of the storage array
  // returns undefined if either key doesn't exist on object, or object doesn't exist in bucket
  return this.storage[index] ? this.storage[index][key] : this.storage[index]; 
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

  // compute index at with object with desired key would be store
  const index = hashCode(key, this.SIZE);

  // handle edge case, if no object stored at that index, return undefined
  if (!this.storage[index]) return this.storage[index]; 
  
  // if object does exist at that index, store that property in variable so we can return it later (will be undefined if key doesn't exist on that object)
  const removedProp = this.storage[index][key];

  // delete property from the bucket object, decrementing numOfItems counter
  delete this.storage[index][key];
  this.numOfItems--; 

  // HALVING FUNCTIONALITY 
  // determine wheter numOfItems in table is less than 75% of size of storage
  if (Math.floor(this.numOfItems / this.SIZE).toFixed(2) < .75) {

    // halve current size of HT
    this.SIZE = this.SIZE / 2
    
    // create new instance of a hash table that will replace our current hash table
    const doubledHash = new HashTable(this.SIZE); 

    // iterate through storage of current hash table
    for (let i = 0; i < this.storage.length; i++) {
      // on each element, iterate through the keys of stored object, calling the .set method from new instance of Hash table, passing in current key  each time
      for (let key in this.storage[i]) {

        doubledHash.set(key, this.storage[i][key])
      }

    }
  
    // replace current storage with storage array on new HT
    this.storage = doubledHash.storage;
  }


  // return stored property value
  return removedProp;
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

const newHash = new HashTable(); 
console.log('--------TESTING SET---------');
newHash.set('hello', true);
newHash.set('this is a test', true); 
newHash.set(true, 'hello'); 
newHash.set(7678, 'testagain'); 
console.log(' hashtable after adding a few items...', newHash);
newHash.set('hello', false); 
console.log('can handle hash collisions?', newHash)
console.log('------------TESTING GET---------'); 
console.log('getting false....', newHash.get('hello')); 
console.log('getting value that is not in table...', newHash.get('not real value'))
console.log('------------TESTING REMOVE----------');
console.log('removing "hello".....', newHash.remove('hello'), '...hashTable after remove:   ', newHash);
console.log('removing object that doesn\'t exist....', newHash.remove('akldsdlfas;dl'))
console.log('--------------TESTING DOUBLING FUNCTIONALITY------------');
let counter = 0; 
while (counter < 20) {
  newHash.set(`${counter++}`, 'testing')
}
console.log('should be 32 elements in storage:     ', newHash)
// console.log('------------TESTING HALVING FUNCTIONALITY--------');
// counter = 0; 
// while (counter < 20) {
//   newHash.remove(`${counter++}`)
// }
// console.log('should be 16 elements in storage:       ', newHash)
// Do not remove!!
module.exports = HashTable;
