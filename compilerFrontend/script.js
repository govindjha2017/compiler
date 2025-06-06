
async function runCode() {
    const code = document.getElementById("code").value;
    const input = document.getElementById("input").value;
    const language_id = document.getElementById("language").value;

    const outputElement = document.getElementById("output");
    outputElement.textContent = "⏳ Running...";

    try {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key":  "6d58fc2d8fmsh1315a0749ce492fp111d20jsn734809ae5cb2",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
        },
        body: JSON.stringify({
        source_code: code,
        language_id: parseInt(language_id),
        stdin: input
        }),
    });

    const result = await response.json();

    if (result.stderr) {
        outputElement.textContent = "❌ Error:\n" + result.stderr;
    } else {
        outputElement.textContent = result.stdout || result.message || "✅ No Output";
    }
    } catch (err) {
    outputElement.textContent = "🚫 Execution failed: " + err.message;
    }
}


function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');

    document.getElementById(id).style.display = 'block';
}