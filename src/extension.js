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
  
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

**** I am making the assumption that the number of stored items refers to the number of key/value pairs, 
instead of the number of spaces in the hash table that are filled. Since one space in the hash table could have multiple values,
those numbers would be different
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  
  //loop through key/value pairs in storage to determine size
  let keyStore = [];
  this.storage.forEach((elem) => {
    if(elem){
      keyStore.push(...Object.keys(elem));
    }
  })
  //set keyNum to length of array of keys
  let keyNum = keyStore.length;
  if(keyNum){
    //if keys length is larger than 75% of the table size
    if(keyNum + 1 > this.SIZE * 0.75){
      //double hash table size
      this.SIZE = this.SIZE * 2;
      //rehash each key/value pair with new  size
      this.storage.forEach((elem) => {
        //if index on storage has key value pairs, loop through
        if(elem){
          //reassign old keys and values to new hashed indeces
          for(let oldKey in elem){
            let hashedResult = hashCode(oldKey, this.SIZE);
            this.storage[hashedResult] = {
              [oldKey] : value
            };
          }
        }
      })
    }
  }  
   //find result num in hash table to store key/value in storage
   let hashedResult = hashCode(key, this.SIZE);
   //check to see if the hash table already has a value at hashedResult index
   if(this.storage[hashedResult]){
     //if table has value at hashedResult, create a new key value pair at hashedResult containing key and value
     this.storage[hashedResult][key] = value;
   } else {
     //if not, create an object at hashedResult with key/value pair
     this.storage[hashedResult] = {
       [key] : value
     };
   }
};

//********TESTING */
// let table = new HashTable();
// table.set("hello",111)
// table.set("world",222)
// table.set("goodbye",333)
// table.set("hedllo",444)
// table.set("wodrld",555)
// table.set("gooddbye",666)
// table.set("helalo",777)
// table.set("woald",888)
// table.set("gooadbye",999)
// table.set("heljlo",1110)
// table.set("worjld",2220)
// table.set("goojdbye",3330)
// table.set("gooadgbye",9991)
// table.set("heljglo",11101)
// table.set("worjgd",22201)
// table.set("goojdgbye",33301)
// console.log(table.get('goodbye'))
// table.remove('world');
// console.log(table)

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
  //find key's hashed index
  let hashedResult = hashCode(key, this.SIZE);
  //if index exists, find and return value that matches key
  if(this.storage[hashedResult][key]){
    let value = this.storage[hashedResult][key];
    return value;
  } else return console.log("Key not found")
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined

2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  //loop through key/value pairs in storage to determine size
  let keyStore = [];
  this.storage.forEach((elem) => {
    if(elem){
      keyStore.push(...Object.keys(elem));
    }
  })
  //set keyNum to length of array of keys
  let keyNum = keyStore.length;
  //if removing one key/value pair causes num of keys to drop below 25% table size
  if(keyNum - 1 < 0.25 * this.SIZE){
    //reduce table size by 1/2
    this.SIZE = this.SIZE * 0.5;
    //rehash each key/value pair with new  size
    this.storage.forEach((elem) => {
      //if index on storage has key value pairs, loop through
      if(elem){
        //reassign old keys and values to new hashed indeces
        for(let oldKey in elem){
          let hashedResult = hashCode(oldKey, this.SIZE);
          this.storage[hashedResult] = {
            [oldKey] : value
          };
        }
      }
    })
  }
    //find hashed index of key
    let hashedResult = hashCode(key, this.SIZE);
    //if key exists at hashed index, delete key/value pair
    if(this.storage[hashedResult][key]){
      delete this.storage[hashedResult][key]
      //if key doesn't exist at hashed index, return undefined
    } else return undefined;
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
