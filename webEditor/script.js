const htmlInput = document.getElementById("html");
const cssInput = document.getElementById("css");
const jsInput = document.getElementById("js");
const output = document.getElementById("output");

function updatePreview() {
  const html = htmlInput.value;
  const css = `<style>${cssInput.value}</style>`;
  const js = `<script>${jsInput.value}<\/script>`;
  output.srcdoc = html + css + js;
}

// Auto-update preview with debounce
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

// Set default content
htmlInput.value = "<h1>Hello!</h1>";
cssInput.value = "h1 { color: blue; }";
jsInput.value = "console.log('JS running');";
updatePreview();
