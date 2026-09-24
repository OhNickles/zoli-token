const zoliLines = [
  "...meow?",
  "certified good cat.",
  "zoli is watching.",
  "have you paid the tuna tax?",
  "wallet detected. cat approved.",
  "please admire responsibly."
];

const cornerZoli = document.getElementById("corner-zoli");
const speech = document.getElementById("zoli-speech");
const walletButton = document.getElementById("wallet-button");
const walletNote = document.getElementById("wallet-note");

let lineIndex = 0;

cornerZoli?.addEventListener("click", () => {
  lineIndex = (lineIndex + 1) % zoliLines.length;
  speech.textContent = zoliLines[lineIndex];
  cornerZoli.classList.add("talking");
  window.setTimeout(() => cornerZoli.classList.remove("talking"), 1800);
});

walletButton?.addEventListener("click", () => {
  walletNote.textContent = "Wallet connection coming next — Devnet only while we build.";
});
