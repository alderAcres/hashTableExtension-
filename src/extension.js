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
  this.items = 0;
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
	const hash = hashCode(key, this.SIZE);
 	this.items++;
	if(!this.storage[hash]) { this.storage[hash] = {}; }
	this.storage[hash][key] = value;
	if(this.items > .75*this.SIZE) { this.resize(2); }
	return this.items;
};

HashTable.prototype.resize = function(num) {
	this.SIZE = this.SIZE*num;
	const arr = new Array(this.SIZE);
	for(let i = 0; i < this.storage.length; i++) {
		if(this.storage[i] !== undefined) {
			for(let key in this.storage[i]) {
				const hash = hashCode(key, this.SIZE);
				if(!arr[hash]) arr[hash] = {};
				arr[hash][key] = this.storage[i][key];
			}
		}
	}
	this.storage = arr;
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
	const hash = hashCode(key, this.SIZE);
	if(!this.storage[hash]) return undefined;
	else return this.storage[hash][key];
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
	const hash = hashCode(key, this.SIZE);
	if(!this.storage[hash]) return undefined;
	const val = this.storage[hash][key];
	if(val === undefined) return undefined;
	else {
		delete this.storage[hash][key];
		this.items--;
		if(this.SIZE > 16 && this.items < .25*this.SIZE) { this.resize(.5); }
		return val;
	}
};

// const ht = new HashTable();
// ht.set('hello', 'there');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('food', 'apple');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('person', 'bo');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('school', 'codesmith');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('schools', 'nyu');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('facility', 'test');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('play', 'beer');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('ite', 'test');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('sdsd', 'test');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('heeee', 'test');
// console.log('10',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('seee', 'test');
// console.log('11',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('zeee', 'test');
// console.log('12',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.set('play', 'beer');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items, ht);
// ht.remove('hello', 'there');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items, 'started to remove 1');
// ht.remove('food', 'apple');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.remove('person', 'bo');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);
// ht.remove('school', 'codesmith');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items, ht);
// ht.remove('schools', 'nyu');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items, ht);
// ht.remove('facility', 'test');
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items, ht);
// console.log('13',ht.SIZE, ht.storage.length, 'num of items:', ht.items);

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
