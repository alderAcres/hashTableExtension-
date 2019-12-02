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
HashTable.prototype.set = function (key, value) {
  let index = hashCode(key, this.SIZE);
  if (this.storage[index]) {
    const ref = this.storage[index];
    ref[key] = value;
  }
  this.storage[index] = { [key]: value };

  // after core set function is run, check new size
  // the number of items in storage is equal to the number of indexes in storage which are defined
  // if this amount is >0.75*this.SIZE, rehash everything and double hash table SIZE
  const definedSize = this.storage.filter((value) => value !== undefined).length;
  if (definedSize > (0.75 * this.SIZE)) {
    this.SIZE = this.SIZE * 2;
    let unhash = 0;
    // iterate through all keys in this.storage
    // unhash using this.get, then create index with new size and reassign to this.storage
    for (el in this.storage) {
      unhash = this.get(el);
      index = hashCode(unhash, this.SIZE);
      this.storage[index] = { [el]: value };
    }
  }
};

HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index]) {
    const obj = this.storage[index];
    return obj[key];
  }
  return undefined;
};

HashTable.prototype.remove = function (key) {
  const ref = this.get(key);
  this.set(key, undefined);

  const definedSize = this.storage.filter((value) => value !== undefined).length;
  if (this.SIZE > 16 && definedSize < (0.25 * this.SIZE)) {
    this.SIZE = this.SIZE / 2
  }

  for (el in this.storage) {
    unhash = this.get(el);
    index = hashCode(unhash, this.SIZE);
    this.storage[index] = { [el]: value };
  }


  return ref;
};


// YOUR CODE ABOVE

function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
