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
  this.storage = new Array(this.SIZE);
  //implement resize method within HashTable constructor to be run after every set or remove. It will take a count of all defined values, compare to total size and modify this.SIZE accordingly.
  //rehash every value after resizing
  this.resize = function() {
    let count = 0;
    const total = this.storage.forEach(val => {
      if (val) count += 1;
      return count;
    });
    
    let changed = false;
    let prevSize = this.SIZE;
    if (count > this.SIZE * .75){
      this.SIZE *= 2;
      changed = true;
    }
    else if (this.SIZE > 16 && count < this.SIZE * .25){
      this.SIZE /= 2;
      changed = true;
    }
    // console.log(changed)
    // console.log(count);
    //
    if (changed ===true){
      this.storage.forEach((el, index) => {
          if (el){
            for (let key in el){
              let hash = hashCode(el[key], this.SIZE);
              let prevHash = hashCode(el[key], prevSize)
              this.storage[hash][key] = this.storage[prevHash][key];
              delete this.storage[prevHash][key];
            }
          }
      });
    };
  }
  
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
  const hash = hashCode(key, this.SIZE);
  if(!this.storage[hash]){
    this.storage[hash] = {};
    this.storage[hash][key] = value; 
  }
  else {
    this.storage[hash][key] = value;
  }
  this.resize();
};

let newHashTable = new HashTable();
newHashTable.set('test', 123);
console.log(newHashTable);
newHashTable.set('testagain', 456);
console.log(newHashTable);
newHashTable.set('different', 789);
console.log(newHashTable);
newHashTable.set('a', 1927635);
newHashTable.set('b', 981356297);
newHashTable.set('c', 2836593852);
newHashTable.set('d', 082375233);
console.log(newHashTable);
newHashTable.set('soeih', 923856239);
newHashTable.set('ayyy', 'wtf');
newHashTable.set('lmao', 42069);
newHashTable.set('e', 2398523);
newHashTable.set('f', 29385723);
console.log(newHashTable);
console.log(newHashTable.SIZE);
newHashTable.set('z', 'zzzzz');
newHashTable.set('y', 'zzzzz235325');
newHashTable.set('x', 2352395);
newHashTable.set('w', 235328);
console.log(newHashTable);
newHashTable.set('v', 239582);
newHashTable.set('u', 'uuuuu');
newHashTable.set('t', 'ttttt');
console.log(newHashTable);
newHashTable.set('s', 23985723);
newHashTable.set('p', 23598238532);
console.log(newHashTable);
newHashTable.set('oo', 235823);
newHashTable.set('nnn', 'nnnnnnn');
newHashTable.set('mm', 'mmmmmm');
console.log(newHashTable);
newHashTable.set('hello', 'hello');
newHashTable.set('ripKobe', ':(');
console.log(newHashTable);
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
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key] || undefined;
};
// console.log(newHashTable.get('test'))

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hash = hashCode(key, this.SIZE);
  if (this.storage[hash][key]){
    let deleted = this.storage[hash][key];
    delete this.storage[hash][key];
    this.resize();
    return deleted;
  }
  else return undefined;
};
// console.log(newHashTable.remove('test'))

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
