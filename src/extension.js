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
  this.length = 0;
  this.arrayOccupied = 0;
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
  let newKey = hashCode(key, this.SIZE);
  if (this.storage[newKey] === undefined) {
    let obj = {};
    obj[key] = value;
    this.storage[newKey] = obj;
    this.length++;
    this.arrayOccupied++;
    if (this.arrayOccupied >= 0.75 * this.SIZE) {
      //This is where the resize will occur
      let newStorage = new Array(this.SIZE * 2);
      let newLength = 0;
      let newOccupied = 0;
      for (let el of this.storage) {
        if (el !== undefined) {
          for (let keys in el) {
            if (el.hasOwnProperty(keys)) {
              let newVal =el[keys];
              newKey = hashCode(keys, this.SIZE * 2);
              if (newStorage[newKey] === undefined) {
                obj = {};
                obj[keys] = newVal;
                newStorage[newKey] = obj;
                newLength++;
                newOccupied++;
              }else{
                if (!newStorage[newKey].hasOwnProperty(keys)) {
                  newLength++;
                }
                newStorage[newKey][keys] = newVal;
              }
            }
          }
        }
      }
      this.storage = newStorage;
      this.length = newLength;
      this.arrayOccupied =  newOccupied;
      this.SIZE = this.SIZE*2;
    }
  } else {
    if (!this.storage[newKey].hasOwnProperty(key)) {
      this.length++;
    }
    this.storage[newKey][key] = value;
  }
  return this.length;
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
  let newKey = hashCode(key, this.SIZE);
  if (this.storage[newKey] === undefined) {
    return undefined;
  }
  return this.storage[newKey][key];
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
  let newKey = hashCode(key, this.SIZE);
  if (this.storage[newKey] === undefined) {
    return undefined;
  } else {
    let temp = this.storage[newKey][key];
    if(temp!==undefined){
      this.length--;
    }
    delete this.storage[newKey][key];
    if(Object.keys(this.storage[newKey]).length===0){ //check object empty
      delete this.storage[newKey];
      this.arrayOccupied--;
    }
    console.log(this.arrayOccupied);
    if (this.arrayOccupied<0.25*this.SIZE){
      console.log("Hi")//where resizing happens
      let newStorage = new Array(Math.ceil(this.SIZE / 2));
      let newLength = 0;
      let newOccupied = 0;
      for (let el of this.storage) {
        if (el !== undefined) {
          for (let keys in el) {
            console.log(keys)
            if (el.hasOwnProperty(keys)) {
              let newVal =el[keys];
              newKey = hashCode(keys, Math.ceil(this.SIZE / 2));
              if (newStorage[newKey] === undefined) {
                obj = {};
                obj[keys] = newVal;
                console.log(obj)
                newStorage[newKey] = obj;
                
                newLength++;
                newOccupied++;
                console.log(newStorage,newLength,newOccupied)
              }else{
                if (!newStorage[newKey].hasOwnProperty(keys)) {
                  newLength++;
                }
                newStorage[newKey][keys] = newVal;
              }
            }
          }
        }
      }
      console.log(this.storage,this.length,this.arrayOccupied)
      this.storage = newStorage;
      this.length = newLength;
      this.arrayOccupied = newOccupied;
      this.SIZE = Math.ceil(this.SIZE/2)
      console.log(this.storage,this.length,this.arrayOccupied)
    }
    return temp;
  }
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}
let a = new HashTable();
console.log(a.set("b", 15));
console.log(a.set("b", 16));
console.log(a.set("c", 12));
console.log(a.get("c"));
console.log(a.remove("c"));
console.log(a.SIZE)
console.log(a.get("c"));

// Do not remove!!
module.exports = HashTable;
