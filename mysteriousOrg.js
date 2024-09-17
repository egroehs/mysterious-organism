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

    complementStrand() {
        const complementStrand = [];

        this.dna.map(base => {
            if(base === "A") {
                return complementStrand.push("T")
            }
            if(base === "T") {
                return complementStrand.push("A")
            }
            if(base === "G") {
                return complementStrand.push("C")
            }
            if(base === "C") {
                return complementStrand.push("G")
            }
            return complementStrand;
        })
        return `DNA: ${originalDna} \n\nComplement: ${complementStrand}\n`;
    },

    willLikelySurvive() {
        const countGC = this.dna.filter(base => base === 'C' || base === 'G').length;

        const percentageCG = (countGC / this.dna.length) * 100;

        return percentageCG >= 60;

    },

    mutate() {
      const randomIndex = Math.floor(Math.random() * 15);

      const currentBase = this.dna[randomIndex];

      let newBase = returnRandBase();
      while (newBase === currentBase) {
        newBase = returnRandBase();
      }

      this.dna[randomIndex] = newBase;
      
      return console.log(`Original DNA: ${originalDna} \n\n Mutated DNA: ${this.dna}`);
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

// Function to create multiple pAequor instances that can survive
function createSurvivors(numSurvivors) {
  const survivors = [];
  
  while (survivors.length < numSurvivors) {
    const id = survivors.length + 1;
    const dna = mockUpStrand();
    const pAequor = pAequorFactory(id, dna);

    if (pAequor.willLikelySurvive()) {
      survivors.push(pAequor);
    }
  }
  
  return survivors;
}

// Create 30 instances of pAequor that can survive
//console.log(createSurvivors(30));
console.log(pAequorFactory(1, mockUpStrand()).complementStrand())