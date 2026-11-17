function verifierReponse(bouton, estCorrect) {
    const parent = bouton.parentElement;
    const boutons = parent.querySelectorAll('button');
    const feedback = document.getElementById('quiz-feedback');

    boutons.forEach(b => b.classList.remove('correct', 'wrong'));

    if (estCorrect) {
        bouton.classList.add('correct');
        feedback.textContent = "Bravo ! C'est la bonne réponse.";
        feedback.style.color = "#15803d";
    } else {
        bouton.classList.add('wrong');
        feedback.textContent = "Ce n'est pas tout à fait ça, essayez encore !";
        feedback.style.color = "#b91c1c";
    }
}

function toggleCorrection(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
}