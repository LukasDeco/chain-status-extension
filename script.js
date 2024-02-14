

const SOLANA_DEVNET_STATUS_URL = 'https://api.devnet.solana.com';

async function checkSolanaDevnetStatus() {
    try {
        const response = await fetch(SOLANA_DEVNET_STATUS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": "getHealth" })
        });
        const data = await response.json();
        if (data.result === "ok") {
            document.getElementById("solana-status").innerHTML = "OK";
        } else {
            document.getElementById("solana-status").innerHTML = "DOWN"
        }
    } catch (error) {
        console.error('Error checking Devnet status:', error);
        document.getElementById("status").innerHTML = "ERROR"
    }
}

checkSolanaDevnetStatus();

