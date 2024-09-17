// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(id, dnaArr) {
    const originalDna = [...dnaArr];

  return {
    specimenNum: id,
    dna: dnaArr,

    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);

      const currentBase = this.dna[randomIndex];

      let newBase = returnRandBase();
      while (newBase === currentBase) {
        newBase = returnRandBase();
      }

      this.dna[randomIndex] = newBase;
      
      return console.log(`Original DNA: ${originalDna} | Mutated DNA: ${this.dna}`);
    },

    compareDNA(otherPaequor) {
      if (!(otherPaequor instanceof Object) || !('dna' in otherPaequor) || !('specimenNum' in otherPaequor)) {
        throw new Error('Invalid pAequor object');
      }

      let identicalBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherPaequor.dna[i]) {
          identicalBases++;
        }
      }

      const percentage = (identicalBases / this.dna.length) * 100;
      console.log(`specimen #${this.specimenNum} and specimen #${otherPaequor.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    }
  };
}



pAequorFactory(1, mockUpStrand()).mutate();
pAequorFactory(1, mockUpStrand()).compareDNA({
  specimenNum: 2,
  dna: [
    "G",
    "A",
    "T",
    "C",
    "C",
    "G",
    "A",
    "T",
    "C",
    "C",
    "G",
    "A",
    "T",
    "C",
    "C",
  ],
});
