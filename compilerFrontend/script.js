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






const htmlInput = document.getElementById("html");
const cssInput = document.getElementById("css");
const jsInput = document.getElementById("js");
const output = document.getElementById("webOutput");

function updatePreview() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}<\/script>`;
  output.srcdoc = html + css + js;
}

 
[htmlInput, cssInput, jsInput].forEach(input => {
  input.addEventListener("input", () => {
    clearTimeout(window.debounceTimer);
    window.debounceTimer = setTimeout(updatePreview, 300);
  });
});

 
const resizers = document.querySelectorAll(".resizer");

resizers.forEach(resizer => {
  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    const prev = resizer.previousElementSibling;
    const next = resizer.nextElementSibling;

    const startY = e.clientY;
    const prevHeight = prev.offsetHeight;
    const nextHeight = next.offsetHeight;

    function onMouseMove(e) {
      const dy = e.clientY - startY;
      prev.style.flex = "none";
      next.style.flex = "none";
      prev.style.height = `${prevHeight + dy}px`;
      next.style.height = `${nextHeight - dy}px`;
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
});

 
htmlInput.value = "<h1>Hello!</h1>";
cssInput.value = "h1 { color: blue; }";
jsInput.value = "console.log('JS running');";
updatePreview();
