describe('Extension', () => {
  let hashTable;

  beforeEach(() => {
    hashTable = new HashTable();
  });

  it('should set and get multiple values and handle collisions', () => {
    for (let i = 0; i < 32; i++) {
      hashTable.set('k' + i, 'v' + i);
    }
    for (let i = 0; i < 32; i++) {
      expect(hashTable.get('k' + i)).to.be('v' + i);
    }
  });

  it('should remove values', () => {
    for (let i = 0; i < 32; i++) {
      hashTable.set('k' + i, 'v' + i);
    }
    for (let i = 0; i < 32; i++) {
      expect(hashTable.remove('k' + i)).to.eql('v' + i);
    }
  });

  it('the size should double when 75% capacity is reached', () => {
    for (let i = 0; i < 32; i++) {
      hashTable.set('k' + i, 'v' + i);
    }
    expect(hashTable.SIZE).to.equal(64);
  });

  it('the size should halve when less than 25% capacity is reached', () => {
    for (let i = 0; i < 32; i++) {
      hashTable.set('k' + i, 'v' + i);
    }
    expect(hashTable.SIZE).to.equal(64);
    for (let i = 0; i < 32; i++) {
      expect(hashTable.remove('k' + i)).to.eql('v' + i);
    }
    expect(hashTable.SIZE).to.equal(16);
  });

});
