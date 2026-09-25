const zoliLines = [
  "...meow?",
  "mrrp.",
  "mrrrow?",
  "prrt?",
  "mew.",
  "mew mew.",
  "mraow.",
  "brrrp.",
  "purrrrr.",
  "mrrp mrrp.",
  "hello. i am cat.",
  "you may proceed.",
  "i have reviewed this.",
  "acceptable.",
  "very acceptable.",
  "cat approved.",
  "zoli approved.",
  "you have been observed.",
  "inspection complete.",
  "human detected.",
  "good human.",
  "potential treat source located.",
  "tuna status?",
  "where tuna?",
  "tuna, please.",
  "emergency tuna meeting.",
  "this could use tuna.",
  "tuna tax is overdue.",
  "one tuna = many happiness.",
  "i heard a packet open.",
  "was that the fridge?",
  "the cupboard moved.",
  "snack protocol initiated.",
  "treat inventory: concerning.",
  "deploy the chicken.",
  "salmon would also be acceptable.",
  "i accept tribute.",
  "tribute may be edible.",
  "no pickle. obviously.",
  "this bowl looks half empty.",
  "breakfast was years ago.",
  "dinner is late.",
  "second dinner?",
  "third dinner is traditional.",
  "i have never eaten in my life.",
  "starving since eleven minutes ago.",
  "please consult the food bowl.",
  "the bowl has a visible bottom.",
  "this is an emergency.",
  "i could eat.",
  "i could always eat.",
  "nap scheduled.",
  "nap rescheduled.",
  "nap successfully deployed.",
  "do not disturb the loaf.",
  "loaf mode.",
  "maximum loaf.",
  "premium loaf.",
  "distinguished loaf.",
  "compact mode enabled.",
  "curling into circle.",
  "sunbeam acquired.",
  "sunbeam reserved.",
  "this spot is mine now.",
  "your chair has been reassigned.",
  "your keyboard is warm.",
  "i need that keyboard.",
  "important email. sit on it.",
  "meeting cancelled. cat.",
  "productivity reduced successfully.",
  "zoomies pending.",
  "zoomies!",
  "run now. reasons later.",
  "corridor sprint in 3... 2...",
  "why are you still sitting?",
  "chase sequence initiated.",
  "ambush location selected.",
  "you saw nothing.",
  "i was never here.",
  "stealth rating: excellent.",
  "hide behind curtain.",
  "feet detected under blanket.",
  "attack blanket.",
  "the blanket started it.",
  "box acquired.",
  "box ownership confirmed.",
  "if i fits, obviously.",
  "this box has potential.",
  "smaller box preferred.",
  "paper bag technology.",
  "i wanted the option.",
  "bathroom escort service.",
  "you cannot pee alone.",
  "personal space is negotiable.",
  "your lap is available.",
  "lap claimed.",
  "do not move.",
  "you moved.",
  "betrayal.",
  "pat here.",
  "not there.",
  "yes there.",
  "stop.",
  "why did you stop?",
  "chin scratches authorised.",
  "forehead kiss permitted.",
  "belly access denied.",
  "belly trap armed.",
  "one more pat.",
  "okay two.",
  "purr engine online.",
  "purr level: industrial.",
  "happy little motor.",
  "slow blink.",
  "that was a kiss.",
  "you may slow blink back.",
  "certified good cat.",
  "very good cat.",
  "extremely good cat.",
  "objectively excellent cat.",
  "zoli is watching.",
  "zoli knows.",
  "zoli has notes.",
  "zoli requests revisions.",
  "approved by management.",
  "management is orange.",
  "chief feline officer.",
  "head of household.",
  "senior biscuit maker.",
  "biscuit production commencing.",
  "devnet? i prefer catnet.",
  "wallet detected. cat approved.",
  "1 zoli = 1 zoli.",
  "number may go sideways.",
  "not financial advice. am cat.",
  "invest in treats.",
  "diversify into tuna.",
  "proof of purr.",
  "blockchain? block the door open.",
  "mint authority? i prefer mint leaves.",
  "good cats help other cats.",
  "save a stray. earn a purr.",
  "more homes for more cats.",
  "every cat deserves a safe nap.",
  "every cat deserves dinner.",
  "every cat deserves a person.",
  "support your local rescue.",
  "kindness compounds.",
  "small coin. good intentions.",
  "send love, not hype."
];

const cornerZoli = document.getElementById("corner-zoli");
const speech = document.getElementById("zoli-speech");
const walletButton = document.getElementById("wallet-button");
const walletNote = document.getElementById("wallet-note");

let lastLineIndex = -1;

function pickZoliLine() {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * zoliLines.length);
  } while (nextIndex === lastLineIndex && zoliLines.length > 1);

  lastLineIndex = nextIndex;
  return zoliLines[nextIndex];
}

cornerZoli?.addEventListener("click", () => {
  speech.textContent = pickZoliLine();
  cornerZoli.classList.remove("talking");
  void cornerZoli.offsetWidth;
  cornerZoli.classList.add("talking");
  window.clearTimeout(cornerZoli._talkTimer);
  cornerZoli._talkTimer = window.setTimeout(() => {
    cornerZoli.classList.remove("talking");
  }, 2600);
});

walletButton?.addEventListener("click", () => {
  walletNote.textContent = "Wallet connection coming next — Devnet only while we build.";
});


document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget);
    const status = document.getElementById("copy-status");
    if (!target) return;

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      button.textContent = "COPIED";
      if (status) status.textContent = "Official address copied.";
      window.setTimeout(() => {
        button.textContent = "COPY";
        if (status) status.textContent = "";
      }, 1800);
    } catch {
      if (status) status.textContent = "Copy failed — select the address manually.";
    }
  });
});
