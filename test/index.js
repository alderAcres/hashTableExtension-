describe('test extension HashTable basic get set remove functionality of hash table', () => {

  it('should set value at key and get that same value at that same provided key', () => {
    const ht = new HashTable();
    ht.set(1, 2);
    expect(ht.get(1)).to.eql(2);
  });
  
  it('should get as specified (continued)', () => {
    const ht = new HashTable();
    expect(ht.get(0)).to.eql(undefined); // behavior not defined in spec, so semantically, this is expected.
  });

  it('should remove as specified', () => {
    const ht = new HashTable();
    ht.set(1, 2);
    expect(ht.get(1)).to.eql(2);
    expect(ht.remove(1)).to.eql(true); // behavior not specified in spec, so I decided to do what makes sense here.
    expect(ht.get(1)).to.eql(undefined);
    expect(ht.remove(1)).to.eql(undefined); // explicitly in spec.
  });

});

describe('test extension HashTable extra set and remove functionality of hash table', () => {

  const ht = new HashTable();
  
  const f = (k) => {
    it(`should set value, ${2 * k} at key, ${k}, and get that same value, ${2 * k} at that same provided key, ${k}`, () => {
      ht.set(k, 2 * k);
      expect(ht.get(k)).to.eql(2 * k);
    });
  };

  for (let i = 0; i < 2 * ht.SIZE; i++) f(i);
  expect(ht.SIZE).to.eql(4 * ht.SIZE);

  // it('should remove as specified', () => {
  //   const ht = new HashTable();
  //   ht.set(1, 2);
  //   expect(ht.get(1)).to.eql(2);
  //   expect(ht.remove(1)).to.eql(true); // behavior not specified in spec, so I decided to do what makes sense here.
  //   expect(ht.get(1)).to.eql(undefined);
  //   expect(ht.remove(1)).to.eql(undefined); // explicitly in spec.
  // });

});