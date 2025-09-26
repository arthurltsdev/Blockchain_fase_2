// Configuração do projeto - para facilitar deployment
const CONFIG = {
    // Endereço do contrato - atualize aqui após cada deploy
    CONTRACT_ADDRESS: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    
    // Configurações da rede Hardhat local
    RPC_URL: 'http://127.0.0.1:8545',
    CHAIN_ID: '0x7a69', // 31337 em hexadecimal
    NETWORK_NAME: 'Hardhat Local',
    
    // ABI do contrato
    CONTRACT_ABI: [
        {
            "anonymous": false,
            "inputs": [
                {"indexed": true, "internalType": "string", "name": "cpf", "type": "string"},
                {"indexed": false, "internalType": "string", "name": "nome", "type": "string"},
                {"indexed": false, "internalType": "uint256", "name": "idade", "type": "uint256"}
            ],
            "name": "PacienteCadastrado",
            "type": "event"
        },
        {
            "inputs": [
                {"internalType": "string", "name": "_nome", "type": "string"},
                {"internalType": "string", "name": "_cpf", "type": "string"},
                {"internalType": "uint256", "name": "_idade", "type": "uint256"},
                {"internalType": "string", "name": "_endereco", "type": "string"}
            ],
            "name": "cadastrarPaciente",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "string", "name": "_cpf", "type": "string"}],
            "name": "consultarPaciente",
            "outputs": [
                {
                    "components": [
                        {"internalType": "string", "name": "nome", "type": "string"},
                        {"internalType": "string", "name": "cpf", "type": "string"},
                        {"internalType": "uint256", "name": "idade", "type": "uint256"},
                        {"internalType": "string", "name": "endereco", "type": "string"},
                        {"internalType": "bool", "name": "cadastrado", "type": "bool"}
                    ],
                    "internalType": "struct RegistroPaciente.Paciente",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "obterTodosCpfs",
            "outputs": [{"internalType": "string[]", "name": "", "type": "string[]"}],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [{"internalType": "string", "name": "", "type": "string"}],
            "name": "pacientes",
            "outputs": [
                {"internalType": "string", "name": "nome", "type": "string"},
                {"internalType": "string", "name": "cpf", "type": "string"},
                {"internalType": "uint256", "name": "idade", "type": "uint256"},
                {"internalType": "string", "name": "endereco", "type": "string"},
                {"internalType": "bool", "name": "cadastrado", "type": "bool"}
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalPacientes",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }
    ]
};
