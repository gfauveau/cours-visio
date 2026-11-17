function verifierReponse(bouton, estCorrect) {
    const parent = bouton.parentElement;
    const boutons = parent.querySelectorAll('button');
    const feedback = parent.nextElementSibling;

    boutons.forEach(b => b.classList.remove('correct', 'wrong'));

    if (estCorrect) {
        bouton.classList.add('correct');
        if (feedback) {
            feedback.textContent = "✅ Bravo ! C'est la bonne réponse.";
            feedback.style.color = "#059669";
        }
    } else {
        bouton.classList.add('wrong');
        if (feedback) {
            feedback.textContent = "❌ Ce n'est pas tout à fait ça, essayez encore !";
            feedback.style.color = "#dc2626";
        }
    }
}

function toggleCorrection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.classList.toggle('hidden');
    }
}