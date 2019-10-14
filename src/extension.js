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
  this.SIZE = 2;

  this.storage = new Array(this.SIZE);
}


HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);
  let numItems = 0;

  const counter = () => {
	this.storage.forEach( bucket => {
	  for (data in bucket) {
		numItems++;
	  }
	});
  };

  counter();


  // check if new bucket is needed
  if (!this.storage[index] && numItems >=(this.SIZE * .75)) {

	// if so, double storage size
	console.log('increasing storage size');
	this.SIZE = this.SIZE * 2;
	console.log(this.SIZE);

	const tempArr = this.storage;

	// delete storage
	this.storage = new Array(this.SIZE);

	// then rehash every item
	tempArr.forEach( bucket => {
	  for (data in bucket) {
		let oldIndex = hashCode(data, (this.SIZE / this.SIZE));
		let newIndex = hashCode(data, this.SIZE);
		let val = value;
		if (tempArr[newIndex]) {
		  val = tempArr[oldIndex][data];
		  console.log(val);
		}
  		if (!this.storage[newIndex]) this.storage[newIndex] = {};
		this.storage[newIndex][data] = val;
	  }
	});


	// and finally set new item
	const newItemIndex = hashCode(key, this.SIZE);
	if (!this.storage[newItemIndex]) this.storage[newItemIndex] = {};
	this.storage[newItemIndex][key] = value;

  } else {

	// otherwise set key-val as normal
	if (!this.storage[index]) this.storage[index] = {};
	this.storage[index][key] = value;

  }



  counter();

  console.log(this.storage);
  return numItems;
};

const ht = new HashTable();

ht.set('hello', 'world');
ht.set('mychal', 'estalilla');
ht.set('code', 'smith');
ht.set('k', 'one');


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
