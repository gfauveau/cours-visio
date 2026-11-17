let pyodideInstance = null;
const editeurs = {};
const codesInitiaux = {};

// 1. Initialisation des éditeurs CodeMirror au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
    const containers = document.querySelectorAll(".ide-container");
    
    containers.forEach(container => {
        const id = container.id;
        const textarea = container.querySelector(".code-source");
        codesInitiaux[id] = textarea.value;

        editeurs[id] = CodeMirror.fromTextArea(textarea, {
            mode: "python",
            theme: "dracula",
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            indentWithTabs: false,
            extraKeys: {
                "Tab": function(cm) {
                    cm.replaceSelection("    ", "end");
                }
            }
        });
    });

    // 2. Chargement de Pyodide en arrière-plan
    try {
        pyodideInstance = await loadPyodide();
        document.querySelectorAll(".btn-run").forEach(btn => {
            btn.disabled = false;
            btn.textContent = "▶ Exécuter";
        });
    } catch (err) {
        console.error("Erreur de chargement Pyodide :", err);
    }
});

// 3. Exécution du code Python d'un bloc précis
async function executerPython(id) {
    if (!pyodideInstance) return;

    const container = document.getElementById(id);
    const consoleOutput = container.querySelector(".console-output");
    const codeUtilisateur = editeurs[id].getValue();

    consoleOutput.textContent = "Exécution en cours...";
    consoleOutput.classList.remove("console-error");

    try {
        pyodideInstance.runPython(`
import sys
import io
sys.stdout = io.StringIO()
        `);

        await pyodideInstance.runPythonAsync(codeUtilisateur);

        const sortie = pyodideInstance.runPython("sys.stdout.getvalue()");
        consoleOutput.textContent = sortie || "(Code exécuté avec succès, aucun affichage)";
    } catch (erreur) {
        consoleOutput.classList.add("console-error");
        const lignes = erreur.message.split("\n");
        const indexTrace = lignes.findIndex(l => l.includes('File "<exec>"'));
        consoleOutput.textContent = indexTrace !== -1 
            ? lignes.slice(indexTrace).join("\n") 
            : erreur.message;
    }
}

// 4. Réinitialisation du code de départ
function reinitialiserCode(id) {
    if (editeurs[id] && codesInitiaux[id] !== undefined) {
        editeurs[id].setValue(codesInitiaux[id]);
        const consoleOutput = document.getElementById(id).querySelector(".console-output");
        consoleOutput.textContent = "Code réinitialisé.";
        consoleOutput.classList.remove("console-error");
    }
}