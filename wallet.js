// ZOLI wallet connection
// Minimal Wallet Standard client for the static GitHub Pages build.
// It follows the Wallet Standard registration/app-ready event protocol so
// installed Solana wallets can register without ZOLI handling private keys.

const walletButton = document.getElementById("wallet-button");
const walletNote = document.getElementById("wallet-note");
const walletDialog = document.getElementById("wallet-dialog");
const walletClose = document.getElementById("wallet-close");
const walletOptions = document.getElementById("wallet-options");
const walletDialogStatus = document.getElementById("wallet-dialog-status");
const walletSession = document.getElementById("wallet-session");
const walletProvider = document.getElementById("wallet-provider");
const walletAddressDisplay = document.getElementById("wallet-address-display");
const disconnectWalletButton = document.getElementById("disconnect-wallet");

const STORAGE_KEY = "zoli.wallet.name";
const registeredWallets = new Set();

let activeWallet = null;
let activeAccount = null;
let removeWalletEventListener = null;
let silentReconnectAttempted = false;

function isSolanaWallet(wallet) {
  return Boolean(
    wallet &&
    wallet.features &&
    wallet.features["standard:connect"] &&
    Array.isArray(wallet.chains) &&
    wallet.chains.some((chain) => typeof chain === "string" && chain.startsWith("solana:"))
  );
}

function getSolanaWallets() {
  return [...registeredWallets]
    .filter(isSolanaWallet)
    .sort((a, b) => a.name.localeCompare(b.name));
}

function shortAddress(address) {
  if (!address || address.length < 12) return address || "";
  return `${address.slice(0, 5)}…${address.slice(-5)}`;
}

function safeWalletIcon(wallet) {
  return typeof wallet?.icon === "string" && wallet.icon.startsWith("data:image/")
    ? wallet.icon
    : null;
}

function setDialogStatus(message) {
  if (walletDialogStatus) walletDialogStatus.textContent = message || "";
}

function setConnectedState(wallet, account) {
  activeWallet = wallet;
  activeAccount = account;

  const address = account?.address || "";
  const name = wallet?.name || "Solana Wallet";

  if (walletProvider) walletProvider.textContent = name.toUpperCase();
  if (walletAddressDisplay) {
    walletAddressDisplay.textContent = address;
    walletAddressDisplay.title = address;
  }

  if (walletSession) walletSession.hidden = false;
  if (walletButton) walletButton.textContent = `CONNECTED · ${shortAddress(address)}`;
  if (walletNote) walletNote.textContent = "Wallet connected on ZOLI's Devnet experience.";

  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {}

  subscribeToWalletChanges(wallet);
}

function setDisconnectedState(message = "Connect a Solana wallet to enter ZOLI. Devnet only for now.") {
  removeWalletEventListener?.();
  removeWalletEventListener = null;
  activeWallet = null;
  activeAccount = null;

  if (walletSession) walletSession.hidden = true;
  if (walletButton) walletButton.textContent = "CONNECT WALLET";
  if (walletNote) walletNote.textContent = message;
}

function subscribeToWalletChanges(wallet) {
  removeWalletEventListener?.();
  removeWalletEventListener = null;

  const events = wallet?.features?.["standard:events"];
  if (!events?.on) return;

  removeWalletEventListener = events.on("change", ({ accounts } = {}) => {
    const nextAccount = accounts?.[0];

    if (!nextAccount) {
      setDisconnectedState("Wallet disconnected. Devnet only for now.");
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
      return;
    }

    setConnectedState(wallet, nextAccount);
  });
}

async function connectWallet(wallet, { silent = false } = {}) {
  const connectFeature = wallet?.features?.["standard:connect"];

  if (!connectFeature?.connect) {
    if (!silent) setDialogStatus("This wallet does not expose the standard connect feature.");
    return false;
  }

  if (!silent) {
    setDialogStatus(`Waiting for ${wallet.name}…`);
    if (walletButton) walletButton.disabled = true;
  }

  try {
    const output = await connectFeature.connect({ silent });
    const account = output?.accounts?.[0] || wallet.accounts?.[0];

    if (!account) {
      if (!silent) setDialogStatus("The wallet connected but did not provide an account.");
      return false;
    }

    setConnectedState(wallet, account);
    if (!silent) {
      setDialogStatus("");
      walletDialog?.close();
    }
    return true;
  } catch (error) {
    if (!silent) {
      const message = error?.message || "Connection was cancelled or failed.";
      setDialogStatus(message);
    }
    return false;
  } finally {
    if (walletButton) walletButton.disabled = false;
  }
}

async function disconnectWallet() {
  const wallet = activeWallet;

  try {
    const disconnectFeature = wallet?.features?.["standard:disconnect"];
    if (disconnectFeature?.disconnect) {
      await disconnectFeature.disconnect();
    }
  } catch (error) {
    console.warn("Wallet disconnect returned an error:", error);
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}

  setDisconnectedState("Wallet disconnected. Connect again whenever you're ready.");
}

function renderWalletOptions() {
  if (!walletOptions) return;

  const wallets = getSolanaWallets();
  walletOptions.replaceChildren();

  if (!wallets.length) {
    const empty = document.createElement("div");
    empty.className = "wallet-empty surface-flat";
    empty.innerHTML =
      "<strong>NO SOLANA WALLET DETECTED</strong><br><br>" +
      "Install or open a Wallet Standard-compatible Solana wallet such as Phantom, Solflare or Backpack, then refresh this page.";
    walletOptions.appendChild(empty);
    return;
  }

  wallets.forEach((wallet) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "wallet-option surface-flat";

    const icon = safeWalletIcon(wallet);
    if (icon) {
      const image = document.createElement("img");
      image.src = icon;
      image.alt = "";
      button.appendChild(image);
    } else {
      const placeholder = document.createElement("span");
      placeholder.className = "wallet-icon-placeholder";
      placeholder.textContent = (wallet.name || "W").slice(0, 1).toUpperCase();
      button.appendChild(placeholder);
    }

    const copy = document.createElement("span");
    copy.className = "wallet-option-copy";

    const name = document.createElement("strong");
    name.textContent = wallet.name || "Solana Wallet";

    const detail = document.createElement("span");
    detail.textContent = "Wallet Standard · Solana";

    copy.append(name, detail);

    const state = document.createElement("span");
    state.className = "wallet-option-state";
    state.textContent = "CONNECT";

    button.append(copy, state);
    button.addEventListener("click", () => connectWallet(wallet));

    walletOptions.appendChild(button);
  });
}

async function trySilentReconnect() {
  if (silentReconnectAttempted || activeAccount) return;

  let savedName = null;
  try {
    savedName = localStorage.getItem(STORAGE_KEY);
  } catch {}

  if (!savedName) return;

  const wallet = getSolanaWallets().find((item) => item.name === savedName);
  if (!wallet) return;

  silentReconnectAttempted = true;
  const connected = await connectWallet(wallet, { silent: true });

  if (!connected) {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }
}

// App side of the Wallet Standard registration handshake.
const walletStandardApi = Object.freeze({
  register: (...wallets) => {
    const added = wallets.filter((wallet) => !registeredWallets.has(wallet));
    added.forEach((wallet) => registeredWallets.add(wallet));
    renderWalletOptions();
    void trySilentReconnect();

    return () => {
      added.forEach((wallet) => registeredWallets.delete(wallet));
      renderWalletOptions();
    };
  },
});

window.addEventListener("wallet-standard:register-wallet", (event) => {
  try {
    event.detail?.(walletStandardApi);
  } catch (error) {
    console.warn("A wallet could not register with ZOLI:", error);
  }
});

// Wallets that loaded before the site listen for this event and register now.
window.dispatchEvent(
  new CustomEvent("wallet-standard:app-ready", {
    detail: walletStandardApi,
  })
);

walletButton?.addEventListener("click", () => {
  if (activeAccount) return;
  renderWalletOptions();
  setDialogStatus("");
  walletDialog?.showModal();
});

walletClose?.addEventListener("click", () => walletDialog?.close());

walletDialog?.addEventListener("click", (event) => {
  if (event.target === walletDialog) walletDialog.close();
});

disconnectWalletButton?.addEventListener("click", disconnectWallet);

window.addEventListener("beforeunload", () => {
  removeWalletEventListener?.();
});
