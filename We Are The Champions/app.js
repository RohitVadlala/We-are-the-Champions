// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const endorsementInput = document.getElementById('endorsement-input');
const fromInput = document.getElementById('from-input');
const toInput = document.getElementById('to-input');
const publishBtn = document.getElementById('publish-btn');
const endorsementList = document.getElementById('endorsement-list');

publishBtn.addEventListener('click', () => {
    const endorsement = endorsementInput.value;
    const from = fromInput.value;
    const to = toInput.value;

    if (endorsement && from && to) {
        const newEndorsementRef = database.ref('endorsements').push();
        newEndorsementRef.set({
            endorsement,
            from,
            to,
            timestamp: Date.now()
        });

        endorsementInput.value = '';
        fromInput.value = '';
        toInput.value = '';
    } else {
        alert('Please fill in all fields.');
    }
});

database.ref('endorsements').on('child_added', (snapshot) => {
    const endorsement = snapshot.val();
    const endorsementDiv = document.createElement('div');
    endorsementDiv.className = 'endorsement';
    endorsementDiv.innerHTML = `
        <p><strong>To:</strong> ${endorsement.to}</p>
        <p>${endorsement.endorsement}</p>
        <p><strong>From:</strong> ${endorsement.from}</p>
    `;
    endorsementList.appendChild(endorsementDiv);
});
