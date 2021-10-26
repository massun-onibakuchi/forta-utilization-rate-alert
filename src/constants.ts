export const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "underlying_",
                "type": "address"
            },
            {
                "internalType": "contract ComptrollerInterface",
                "name": "comptroller_",
                "type": "address"
            },
            {
                "internalType": "contract InterestRateModel",
                "name": "interestRateModel_",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "initialExchangeRateMantissa_",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name_",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol_",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "decimals_",
                "type": "uint8"
            },
            {
                "internalType": "address payable",
                "name": "admin_",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "implementation_",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "becomeImplementationData",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCash",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalBorrowsCurrent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalReserves",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

export const CTOKEN_ADDRESSES = {
    cAAVE: "0xe65cdb6479bac1e22340e4e755fae7e509ecd06c",
    cBAT: "0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e",
    cCOMP: "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4",
    cDAI: "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643",
    cETH: "0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5",
    cLINK: "0xface851a4921ce59e912d19329929ce6da6eb0c7",
    cMKR: "0xface851a4921ce59e912d19329929ce6da6eb0c7",
    cREP: "0x158079ee67fce2f58472a96584a73c7ab9ac95c1",
    cSAI: "0xf5dce57282a584d2746faf1593d3121fcac444dc",
    cSUSHI: "0x4b0181102a0112a2ef11abee5563bb4a3176c9d7",
    cTUSD: "0x12392f67bdf24fae0af363c24ac620a2f67dad86",
    cUNI: "0x35a18000230da775cac24873d00ff85bccded550",
    cUSDC: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
    cUSDT: "0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9",
    cWBTC: "0xc11b1268c1a384e55c48c2391d8d480264a3a7f4",
    cWBTC2: "0xccf4429db6322d5c611ee964527d42e5d685dd6a",
    cYFI: "0x80a2ae356fc9ef4305676f7a3e2ed04e12c33946",
    cZRX: "0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407",
};
