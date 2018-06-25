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
	this.items = 0;
  this.storage = new Array(this.SIZE);
}

function spaceOccupied(arraySize, numElement){
	return (numElement/arraySize);
}


function copyStorage(newSize,array){
	let oldStorage = array.slice(0);
	let newStorage = new Array(newSize);
	oldStorage.forEach(obj =>{
		Object.keys(obj).forEach(key =>{
			let hashKey = hashCode(key,this.SIZE);
			if(newStorage[hashKey]) newStorage[hashKey][key] = obj[key];
		  else newStorage[hashKey] = {[key]:obj[key]};
		});
	});
	return newStorage;
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
 if(spaceOccupied(this.SIZE,this.items) >= 0.75){
	 this.SIZE *= 2;
	 this.storage = copyStorage(this.SIZE, this.storage);
 }
 let hashKey = hashCode(key,this.SIZE);
 if(this.storage[hashKey]) this.storage[hashKey][key] = value;
 else this.storage[hashKey] = {[key]:value};
 this.items += 1;
 return this.items;
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
 	let hashKey = hashCode(key,this.SIZE);
	return this.storage[hashKey][key]
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
	if(this.SIZE >16 && spaceOccupied(this.SIZE,this.items) <= 0.25){
 	 this.SIZE /= 2;
 	 this.storage = copyStorage(this.SIZE, this.storage);
  }
	let hashKey = hashCode(key,this.SIZE);
	let result = this.storage[hashKey][key];
	if(this.storage[hashKey][key]){
		delete this.storage[hashKey][key];
		this.items -= 1;
		return result;
	}
	return -1;
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

/*let hashTable = new HashTable();
hashTable.set(1,2);
hashTable.set(2,5);
hashTable.set(12,4);
console.log(hashTable);
hashTable.get(1);
console.log(hashTable.remove(12));
console.log(hashTable.remove(3))
console.log(hashTable)*/
// Do not remove!!
module.exports = HashTable;
