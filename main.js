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
    "q": "Which of the following is NOT produced by seedless vascular plants?",
    "o": [
      "Spores",
      "Vascular tissues",
      "Seeds",
      "True roots"
    ],
    "a": 2,
    "e": "As their name suggests, seedless vascular plants reproduce by spores and do not produce seeds, flowers, or fruits[cite: 1]."
  },
  {
    "q": "Which characteristic distinguishes lycophytes from monilophytes regarding their leaves?",
    "o": [
      "Lycophytes have megaphylls with branched veins.",
      "Lycophytes have microphylls with one unbranched vein.",
      "Monilophytes completely lack true leaves.",
      "Monilophytes have microphylls that form coiled fiddleheads."
    ],
    "a": 1,
    "e": "Lycophytes possess microphylls with a single unbranched vein, whereas monilophytes have megaphylls with branched veins[cite: 1]."
  },
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
    "q": "Why is water a crucial requirement for the reproduction of seedless vascular plants?",
    "o": [
      "Water is needed to disperse the seeds to new environments.",
      "Flagellated sperm require water to swim to the egg for fertilization.",
      "Water protects the developing sporophyte from predators.",
      "Spores can only germinate while fully submerged in water."
    ],
    "a": 1,
    "e": "Both lycophytes and monilophytes possess flagellated sperm that must swim through a film of water to reach and fertilize the egg[cite: 1]."
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
    "q": "Where are the sporangia typically located on a mature fern sporophyte?",
    "o": [
      "Inside a terminal strobilus at the top of the stem.",
      "Clustered in structures called sori under the fronds.",
      "Within the tissues of the true roots.",
      "Embedded in the upper surface of microphylls."
    ],
    "a": 1,
    "e": "In typical ferns like Nephrolepis or Dryopteris, sporangia are grouped together in clusters known as sori on the underside of the fronds[cite: 1]."
  }
]



let i = 0, score = 0;
const card = document.getElementById('card');

function show() {
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
        Try again
    </button>
</div>
            </a>
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

show();


