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

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.countStoredItems = 0;
  
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

    // before we do anything now, check if the stored # of items is over 75% the hash size
    if (this.countStoredItems + 1 > .75 * this.SIZE) { 
      // darn, we need to resize and rehash everything

      
      // now we did to iterate through all the previous indexes and then rehash them into the new resized obj...
      // this means we should store all the previous values so we aren't overwriting them...

        // we could make a deep clone of our previous object, but I'm lazy
        // instead we will iterate through all past indexes and store contents into a temp obj

        let tempObj = {};

        // this will work if the values themselves aren't objects... I would fix this if I had more time
        let counter = 0;
        for (let i = 0; i < this.SIZE; i++){
          // go through all indexes and find all key/value pairs
          if (typeof (this.storage[i]) === 'object'){
            for (const prop in this.storage[i]){
              tempObj[prop] = this.storage[i][prop];
              this.countStoredItems--; // decrement this temporarily before we increment them again automatically with set
              // after getting the values we need to delete them
              delete this.storage[i][prop];
            }
          }
        }
        // now we have an object with all the properties we had before
        this.SIZE *= 2; // resize to double

        // then we need to plug into our new hashtable our existing values, plus the new one
        for (const property in tempObj){
          this.set(property, tempObj[property]);
        }
        // then recursively call this one more time for the actual value we were trying to insert
        this.set(key,value);
  
    } else{ //proceed as normal    
  // use the key as input for our hashcode to find the index on our array that we want to insert this value into
    // we should be inserting an object with the key for our key/value pair should be the actual key & value parameters

    // check if there's an object at index yet
    let index = hashCode(key, this.SIZE);
    if (this.storage[index]){  // if exists, just add in new property. and as per specs, this will overwrite something if has the same key
      this.storage[index][key] = value; 
    } 
    else {this.storage[index] = {}; // undefined so create new object here
    // couldn't use string literal here to intiate the obj, need to look into this later
    this.storage[index][key] = value;
         }         

    // with the new SET functionality, we'll need to make sure we're keeping track of the total number of current items
    this.countStoredItems++;
      // a fancier alternative would be to create a linkedlist at each index array 
        // this would be better performance for very large hash tables
          // but I'm feeling lazy
  }
};

// tests:
// let newHashTable = new HashTable();
// newHashTable.set("password", "hi");
// console.log(newHashTable.storage);
// newHashTable.set('1', 'bye');
// newHashTable.set('a', 'bye');
// newHashTable.set('b', 'bye');
// newHashTable.set('c', 'bye');
// newHashTable.set('d', 'bye');
// newHashTable.set('e', 'bye');
// newHashTable.set('f', 'bye');
// newHashTable.set('g', 'bye');
// newHashTable.set('h', 'bye');
// newHashTable.set('3', 'bye');
// newHashTable.set('D', 'bye');
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)
// newHashTable.set('OVERFLOW', 'plz work');
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)
// let index = hashCode('password', 16);
// console.log(newHashTable.storage[index]); // this replaces the key, but its fine since they used the same key

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

   // check if there's an object at index yet
   let obj = this.storage[hashCode(key, this.SIZE)];
   if (typeof(obj) === 'object'){  // something exists, let's make sure there's an element with the same key
    if (obj.hasOwnProperty(key)) // has this key, return value
     return obj[key];
   } 
  return null; // could also have this return a string like "No such key exists"
  
};

// tests:
// let newHashTable = new HashTable();
// newHashTable.set("password", "hi");
// console.log(newHashTable.storage);
// console.log(newHashTable.get('password'))
// console.log(newHashTable.get('blah'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  // we can use our previous function to make sure that the key exists, and then 
  // we can then remove the key if exists

  // //   2. remove:
  // - If the hash table's SIZE is greater than 16 and the result of removing the
  // item drops the number of stored items to be less than 25% of the hash table's SIZE
  // (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
  // //

  if (this.get(key) === null) return undefined; // no such key exists
  
  // question didn't specify what the output should be
  // I will make this return the value if it exists
    // although I can see this being not optimal for security reasons IRL
  let obj = this.storage[hashCode(key, this.SIZE)];
  let result = this.storage[hashCode(key, this.SIZE)][key];
  delete obj[key];

  //decrement counter
  this.countStoredItems--;

// do the remove first, then test if we need to resize

if (this.SIZE > 16 && this.countStoredItems < Math.floor(.25 * this.SIZE)){ //testing for static size 16 per specs
  // darn it, we need to resize everything down and rehash...

  // clone items again, just like in set
  let tempObj = {};

  // this will work if the values themselves aren't objects... I would fix this if I had more time
  let counter = 0;
  for (let i = 0; i < this.SIZE; i++){
    // go through all indexes and find all key/value pairs
    if (typeof (this.storage[i]) === 'object'){
      for (const prop in this.storage[i]){
        tempObj[prop] = this.storage[i][prop];
        this.countStoredItems--; // decrement this temporarily before we increment them again automatically with set
        // after getting the values we need to delete them
        delete this.storage[i][prop];
        // now this method will leave empty objects, but it seems okay for this exercise, otherwise I'd have to completely remove the obj
      }
    }
  }
  // now we have an object with all the properties we had before

  this.SIZE /= 2; // resize to half size

  // then we need to plug into our new hashtable our existing values again
  for (const property in tempObj){
    this.set(property, tempObj[property]);
  }
}
  return result;
};

// tests:
// let newHashTable = new HashTable();
// newHashTable.set("password", "hi");
// console.log(newHashTable.storage);
// newHashTable.set('1', 'bye');
// newHashTable.set('a', 'bye');
// newHashTable.set('b', 'bye');
// newHashTable.set('c', 'bye');
// newHashTable.set('d', 'bye');
// newHashTable.set('e', 'bye');
// newHashTable.set('f', 'bye');
// newHashTable.set('g', 'bye');
// newHashTable.set('h', 'bye');
// newHashTable.set('3', 'bye');
// newHashTable.set('D', 'bye');
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)
// newHashTable.set('OVERFLOW', 'plz work');
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// newHashTable.remove('h')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// newHashTable.remove('g')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// newHashTable.remove('3')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// newHashTable.remove('D')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// newHashTable.remove('f')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// newHashTable.remove('e')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)


// newHashTable.remove('d')
// console.log(newHashTable.storage);
// console.log(newHashTable.SIZE)
// console.log(newHashTable.countStoredItems)

// tests:
// let newHashTable = new HashTable();
// newHashTable.set("password", "hi");
// console.log(newHashTable.storage);
// console.log(newHashTable.remove('password'))

// Do not modify
// function hashCode(string, size) {
//   'use strict';
  
//   let hash = 0;
//   if (string.length === 0) return hash;
  
//   for (let i = 0; i < string.length; i++) {
//     const letter = string.charCodeAt(i);
//     hash = ((hash << 5) - hash) + letter;
//     hash = hash & hash; // Convert to 32bit integer
//   }
  
//   return Math.abs(hash) % size;
// }

// // Do not remove!!
// module.exports = HashTable;

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
