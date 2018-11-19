function HashTable() {
  this.SIZE = 16;
  this.items = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function(key, value) {
  const index = hashCode(key, this.SIZE);

  if (this.storage[index] === undefined) {
    this.storage[index] = [];
  }
  this.storage[index].push([key, value]);
  this.items++;
  this.checkCapacity();
};

HashTable.prototype.checkCapacity = function() {
  if (this.items >= 0.75 * this.SIZE) {
    const copy = this.storage;
    this.SIZE *= 2;
    this.storage = new Array(this.SIZE);

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== undefined) {
        for (let j = 0; j < copy[i].length; j++) {
          this.rehash(copy[i][j][0], copy[i][j][1]);
        }
      }
    }
  } else if (this.SIZE > 16 && this.items <= 0.25 * this.SIZE) {
    const copy = this.storage;
    this.SIZE /= 2;
    this.storage = new Array(this.SIZE);

    for (let i = 0; i < copy.length; i++) {
      if (copy[i] !== undefined) {
        for (let j = 0; j < copy[i].length; j++) {
          this.rehash(copy[i][j][0], copy[i][j][1]);
        }
      }
    }
  }
};

HashTable.prototype.rehash = function(key, value) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    this.storage[index] = [];
  }
  this.storage[index].push([key, value]);
};

HashTable.prototype.get = function(key) {
  const index = hashCode(key, this.SIZE);

  if (this.storage[index] !== undefined) {
    for (let i = 0; i < this.storage[index].length; i++) {
      if (this.storage[index][i][0] === key) {
        return this.storage[index][i][1];
      }
    }
  }
};

HashTable.prototype.remove = function(key) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] !== undefined) {
    for (let i = 0; i < this.storage[index].length; i++) {
      if (this.storage[index][i][0] === key) {
        const value = this.storage[index][i][1];
        this.storage[index].splice(i, 1);
        this.items--;
        if (this.storage[index].length === 0) {
          this.storage[index] = undefined;
        }
        this.checkCapacity();

        return value;
      }
    }
  }
};

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = String.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

var ht = new HashTable();

for (let i = 0; i < 23; i++) {
  ht.set(i,i);
}

for (let i = 0; i < 23; i++) {
  ht.remove(i,i);
}
console.log(ht.storage);
