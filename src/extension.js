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

// we're going to create a new method for our hashTable - sizeCheck
// we'll call it as the last step inside both methods that change the size (set, remove)

// first a helper method to assign table data, so we don't repeat

HashTable.prototype.sizeCheck = function() {
	// declare a variable to check how many of the indices in our storage array point to data (objects)
	let storageItems = 0;
	// check each space. if it's NOT empty (undefined), it has data - increment our storage items variable
	this.storage.forEach((space) => {
		if (typeof space !== 'undefined') {
			storageItems++;
		}
	});
	// declare a variable that is assigned the 'percentage full' of our storage array
	const storageSpaceTaken = storageItems / this.SIZE;

	// if it's greater than 75% full
	if (storageSpaceTaken > 0.75) {
		// create a new table that's double the size
		const newTable = new HashTable();
		newTable.SIZE = this.SIZE * 2;

		// should create a helper function here - reassignTableData() or something. Since we repeat the exact code below - it's not very DRY
		// but I ran out of time!

		newTable.storage = new Array(newTable.SIZE);
		// re-hash our existing data, and put it in our new hash table
		this.storage.forEach((index) => {
			// check each index. if it has data...
			if (this.storage[index]) {
				// run through each kvPair and reassign it to our new object, after being hashed (in the 'set' method)
				Object.entries(this.storage[index]).forEach(([ key, value ]) => {
					newTable.set(key, value);
				});
			}
		});
		return newTable;
	}

	// if it's less than 25% full (AND the size of our table is greater than 16)
	if (storageSpaceTaken < 0.25 && this.SIZE > 16) {
		// create a new table that's half the size
		const newTable = new HashTable();
		newTable.SIZE = this.SIZE / 2;

		// the other potential place for our helper function - reassignTableData()
		newTable.storage = new Array(newTable.SIZE);
		// re-haze our existing data, and put it in our new hash table
		this.storage.forEach((index) => {
			// check each index. if it has data...
			if (this.storage[index]) {
				// run through each kvPair and reassign it to our new object, after being hashed (in the 'set' method)
				Object.entries(this.storage[index]).forEach(([ key, value ]) => {
					newTable.set(key, value);
				});
			}
		});
		return newTable;
	}
};

HashTable.prototype.set = function(key, value) {
	// find the array index of running our key through the hash index
	const arrIndex = hashCode(key, this.SIZE);

	// we're going to store our data in objects, to prevent hash collision

	// check if data already exists at our storage
	// if it doesn't create an object to store our data, and pass in our key - value params as a property
	if (!this.storage[arrIndex]) {
		const newObj = {};
		newObj[key] = value;
		this.storage[arrIndex] = newObj;
	} else {
		// if it already exists, simply add a new key property (or reassign the old one)
		this.storage[arrIndex][key] = value;
	}
	// check if the size of our table needs to be changed
	this.sizeCheck();
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
	// first find the index
	const arrIndex = hashCode(key, this.SIZE);
	// if the data exists in the obj assigned the the index prop of our storage object, return it.
	// otherwise, just return out of the method call
	if (this.storage[arrIndex][key]) {
		return this.storage[arrIndex][key];
	} else {
		return;
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
	// find the index
	const arrIndex = hashCode(key, this.SIZE);

	// if it exists, delete it from our object associated with the index at our storage object
	// otherwise, just return out of the method call
	if (this.storage[arrIndex][key]) {
		delete this.storage[arrIndex][key];
	} else {
		return;
	}
	// check if the size of our table needs to be changed
	this.sizeCheck();
};

// Do not modify
function hashCode(string, size) {
	'use strict';

	let hash = 0;
	if (string.length === 0) return hash;

	for (let i = 0; i < string.length; i++) {
		const letter = string.charCodeAt(i);
		hash = (hash << 5) - hash + letter;
		hash = hash & hash; // Convert to 32bit integer
	}

	return Math.abs(hash) % size;
}

// YOUR CODE ABOVE

hashCode('hey', 16);
// Do not remove!!
module.exports = HashTable;

let blah = new HashTable();
blah.set('name', 'nate');

console.log(blah);
