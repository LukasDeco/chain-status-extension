

const SOLANA_DEVNET_STATUS_URL = 'https://api.devnet.solana.com';
const SOLANA_TESTNET_STATUS_URL = 'https://api.testnet.solana.com';
const ETHEREUM_GOERLI_URL = 'https://ethereum-goerli-rpc.publicnode.com	';

const mainNetworks = [
    { rpcEndpoint: SOLANA_DEVNET_STATUS_URL, domId: "solana-devnet-status", healthMethod: "getHealth", healthyResult: "ok" },
    { rpcEndpoint: SOLANA_TESTNET_STATUS_URL, domId: "solana-testnet-status", healthMethod: "getHealth", healthyResult: "ok" },
    {
        rpcEndpoint: ETHEREUM_GOERLI_URL, domId: "ether-goerli-status", healthMethod: "eth_blockNumber", healthyResultFunc: (data) => !!data.result
    },
]

async function checkMainNetworks() {
    for (const net of mainNetworks) {
        try {
            const response = await fetch(net.rpcEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "jsonrpc": "2.0", "id": 1, "method": net.healthMethod })
            });
            const data = await response.json();
            if (!!net.healthyResultFunc && net.healthyResultFunc(data) || data.result === net.healthyResult) {
                document.getElementById(net.domId).innerHTML = "OK";
                document.getElementById(net.domId).classList.add("up");
            } else {
                document.getElementById(net.domId).innerHTML = "DOWN";
                document.getElementById(net.domId).classList.add("down");
            }
        } catch (error) {
            console.error(`Error checking ${net.rpcEndpoint} status:`, error);
            document.getElementById("status").innerHTML = "ERROR"
        }
    }
}

checkMainNetworks();

