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
  this.SIZE = 4;  
  this.storage = new Array(this.SIZE);
  this.count = 0; //to track the count of the hashTable
  
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
  if(!this.storage[key]){
    this.count++;
  }
  console.log(this.SIZE)
  let newHash = hashCode(key,this.SIZE);  
  let newHashSet = {}
  newHashSet[key] = value;
  this.storage[key] = newHashSet;
  console.log(this.count)
  if(this.count >= 0.75 * this.SIZE){
    HashTable.prototype.resize(Number(this.SIZE) * 2);
  }
  
  console.log(this.storage);
  console.log(this.SIZE)
};

//resize
HashTable.prototype.resize = function(newSize){
    let tempSize = this.SIZE;
    let tempStorage = this.storage;
    console.log('hello')
    console.log(this.SIZE)
    
    let newStorage = new Array(newSize);
    console.log(this.storage)
    
    console.log(this.SIZE)
    for( key in tempStorage) {
      console.log(key)
      HashTable.prototype.set(key,tempStorage[key][key])
    }
    
  
  console.log(this.storage)

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
if(!key) return undefined;
return this.storage[key][key];

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
  if(!key) return undefined;
  
  delete this.storage[key][key];
  if(!this.storage[key][key]){
    delete this.storage[key] ;
    this.count--;
  }
  
  return this.storage;
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

let test1 = hashCode('test',16)
console.log(test1)
// Do not remove!!
module.exports = HashTable;

let testHash = new HashTable();
testHash.set('test','Aye')
testHash.set('Valve','Aye')
testHash.set('try','Viola')
testHash.set('try2','Viola')
console.log(testHash.get('test'))
console.log(testHash.get('Valve'))
//testHash.remove('test')
console.log(testHash.storage)
console.log(testHash.count)
console.log(testHash.SIZE)
testHash.resize()
console.log(this.SIZE)
console.log(this.storage)
