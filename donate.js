import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@5.7.2/dist/ethers.esm.min.js";

const charityWalletAddress = "0xb26Afcb37E1C77C50675204fA501De8154015209"; // Replace with real charity wallet

async function donate(amountEth) {
  if (!window.ethereum) {
    alert("⚠️ MetaMask not found! Please install MetaMask.");
    return;
  }

  if (!ethers.utils.isAddress(charityWalletAddress)) {
    alert("❌ Адрес получателя некорректен.");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  try {
    const tx = await signer.sendTransaction({
      to: charityWalletAddress,
      value: ethers.utils.parseEther(amountEth)
    });
    await tx.wait();
    alert("💸 Donation successful! Thank you for your support.");
  } catch (error) {
    alert(`❌ Transaction failed: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const donateBtn = document.getElementById("donateButton");
  const amountInput = document.getElementById("donationAmount");

  donateBtn.addEventListener("click", () => {
    const amount = amountInput.value.trim();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }
    donate(amount);
  });
});