import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { 
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAd6Byms7jELtbQq8sDaRO5Lmu-noDOb6s",
  authDomain: "bt-quiz-4749d.firebaseapp.com",
  projectId: "bt-quiz-4749d",
  storageBucket: "bt-quiz-4749d.firebasestorage.app",
  messagingSenderId: "1086038321545",
  appId: "1:1086038321545:web:7f043f72162c3ea5089958",
  measurementId: "G-F12RPVH28T"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


await signInAnonymously(auth);

console.log("Signed in anonymously as:", auth.currentUser.uid);

const Q = [
 
  {
    "q": "How does the spore production of Selaginella differ from most monilophytes?",
    "o": [
      "It exhibits homospory, producing only one type of spore.",
      "It lacks spores entirely and reproduces via seeds.",
      "It exhibits heterospory, producing both microspores and megaspores.",
      "It produces spores directly on coiled fiddleheads."
    ],
    "a": 2,
    "e": "Selaginella is heterosporous, meaning it produces two different sizes of spores: microspores and megaspores[cite: 1]."
  },
  {
    "q": "In the life cycle of a typical fern like Nephrolepis, what is the function of the prothallus?",
    "o": [
      "It acts as the dominant sporophyte generation.",
      "It produces clustered sporangia called sori.",
      "It is a free-living, haploid structure that bears both male and female sex organs.",
      "It produces heterosporous microspores and megaspores."
    ],
    "a": 2,
    "e": "The prothallus is the heart-shaped, haploid gametophyte that contains both antheridia and archegonia[cite: 1]."
  },
  {
    "q": "Which of the following is a characteristic of the water fern Azolla?",
    "o": [
      "It grows as a tall tree with massive megaphylls.",
      "It floats on water and hosts nitrogen-fixing cyanobacteria.",
      "It is an upright club moss with cone-like strobili.",
      "It relies completely on wind for fertilization."
    ],
    "a": 1,
    "e": "Azolla is a unique monilophyte that floats on water and has a symbiotic relationship with nitrogen-fixing cyanobacteria[cite: 1]."
  },
  {
    "q": "What are the distinct structural features of Equisetum (horsetails)?",
    "o": [
      "Jointed hollow stems with whorled branches and terminal cones.",
      "Flat, branched shoots with microphylls.",
      "Quill-like leaves growing directly from a corm.",
      "Large feather-like fronds with creeping rhizomes."
    ],
    "a": 0,
    "e": "Equisetum, a type of monilophyte, is characterized by its jointed, hollow stems, whorled branches, and a terminal cone[cite: 1]."
  },
  {
    "q": "Which phylum is more evolutionary closer to the seed plants?",
    "o": [
      "Phylum Cycadophyta",
      "Phylum Lycophyta",
      "Phylum Monilophyta",
      "Phylum Hepatophyta"
    ],
    "a": 2,
    "e": "Monilophytes (ferns, horsetails, and whisk ferns) form a clade that is the sister group to seed plants, meaning they share a more recent common ancestor with seed plants than Lycophytes do."
  },
  {
    "q": "Which is a club moss?",
    "o": [
      "Azolla sp.",
      "Lycopodium",
      "Equisetum",
      "Dryopteria"
    ],
    "a": 1,
    "e": "Lycopodium is the primary genus of clubmosses, belonging to the phylum Lycopodiophyta. Azolla and Dryopteris are ferns, and Equisetum is a horsetail."
  },
  {
    "q": "Which is protected by indusium?",
    "o": [
      "Roots",
      "Sporangium",
      "Microphylls",
      "Strobilus"
    ],
    "a": 1,
    "e": "An indusium is a thin, membranous outgrowth of a fern leaf that covers and protects the developing sporangia (which are usually clustered in a sorus)."
  },
  {
    "q": "What is the difference between Monilophyta & Pterophyta?",
    "o": [
      "Monilophyta is a sub group of Pterophyta",
      "Pterophytes includes all kinds of ferns",
      "Monilophyta includes only true ferns",
      "Pterophyta is a sub group of Monilophyta."
    ],
    "a": 3,
    "e": "In modern plant taxonomy, Monilophyta is a broad clade that encompasses true ferns, whisk ferns, and horsetails. Pterophyta (often synonymous with just true ferns) is considered a subgroup nested within the broader Monilophyta classification."
  },{
    "q": "What is the function of stolons in Nephrolepis?[cite: 3]",
    "o": [
      "Absorption of water and mineral salts[cite: 3]",
      "Vegetative propagation and spreading of the plant[cite: 3]",
      "Production of spores for sexual reproduction[cite: 3]",
      "Photosynthesis and gaseous exchange[cite: 3]"
    ],
    "a": 1,
    "e": "In Nephrolepis, stolons are specialized runner stems that allow for vegetative propagation and the spreading of the plant.[cite: 3]"
  },
 {
    "q": "Which of the following characteristics is intrinsically linked to the heterosporous life cycle seen in seedless vascular plants like Selaginella?",
    "o": [
      "Archegonia and antheridia are produced on the same free-living prothallus.",
      "Gametophyte development is primarily endosporic, occurring largely within the confines of the spore wall.",
      "The dominant phase of the life cycle shifts back to a nutritionally independent gametophyte.",
      "Sporangia are organized into sori located on the abaxial surface of megaphylls."
    ],
    "a": 1,
    "e": "In heterosporous plants like Selaginella, the highly reduced male and female gametophytes develop endosporically, meaning they grow and mature almost entirely within the protective wall of the microspore or megaspore. Homosporous ferns, by contrast, typically produce exosporic, free-living gametophytes."
  }
]



let i = 0, score = 0;
const card = document.getElementById('card');

function show() {
startTimer();
    const q = Q[i];
    counter.textContent = `Question ${i + 1} of ${Q.length}`; scoreLive.textContent = `Score: ${score}`;
    prog.style.width = (i / Q.length * 100) + '%';
    card.innerHTML = `<h2 class="mb-4">${q.q}</h2>` + q.o.map((t, k) => `<button class="opt" data-k="${k}"><b>${'ABCD'[k]}</b> ${t}</button>`).join('') + '<div id="fb" class="mt-3"></div>';
    card.querySelectorAll('.opt').forEach(b => b.onclick = () => pick(+b.dataset.k));
}

function pick(k) {
    const q = Q[i], opts = card.querySelectorAll('.opt');
    opts.forEach(b => b.disabled = true);
    opts[q.a].classList.add('right');
    if (k === q.a) score++; else opts[k].classList.add('wrong');
    scoreLive.textContent = `Score: ${score}`;
    fb.innerHTML = `<p><b>${k === q.a ? 'Correct!' : 'Not quite.'}</b> ${q.e}</p><button class="btn btn-success btn-lg fs-4" id="next">${i < Q.length - 1 ? 'Next ▶' : 'See results'}</button>`;
    document.getElementById('next').onclick = () => { i++; i < Q.length ? show() : end(); };
}

async function end() {
    prog.style.width = '100%';
    counter.textContent = 'Finished';

    const msg = score >= 7
        ? 'Excellent!'
        : score >= 5
        ? 'Good job!'
        : 'Keep revising!';

    const percentage = Math.round(score / Q.length * 100);

    card.innerHTML = `
        <div class="text-center">
            <h2>${msg}</h2>
            <div class="score">${score} / ${Q.length}</div>
            <div class="percentage">${percentage}%</div>
<div class="d-flex flex-wrap gap-2">
    <a class="btn btn-outline-success btn-lg fs-4" href="index.html">
        Try again
    </a>
    <button class="btn btn-success btn-lg fs-4" id="retry">
Go Back Home
    </button>
</div>
        </div>
    `;

    await addDoc(collection(db, "quizResults"), {
        uid: auth.currentUser.uid,
        score: score,
        total: Q.length,
        percentage: percentage,
        submittedAt: serverTimestamp()
    });

    document.getElementById('retry').onclick = () => {
        i = 0;
        score = 0;
        show();
    };
}


let timeLeft = 30;
let timer;

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;

    document.getElementById("timer").textContent = timeLeft;

    timer = setInterval(function () {
        timeLeft--;

        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            }
    }, 1000);
}

// Make function accessible to inline HTML onclick
window.startTimer = startTimer;

show();