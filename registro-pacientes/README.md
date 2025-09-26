# 🏥 Sistema de Registro de Pacientes - Blockchain DApp

Sistema descentralizado para registro e consulta de pacientes utilizando Smart Contracts na blockchain Ethereum.

## 🚀 Configuração Rápida

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar Rede Hardhat (Terminal 1)
```bash
npx hardhat node
```

### 3. Deploy do Contrato (Terminal 2)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 4. Configurar Endereço
1. Copie o endereço gerado no passo 3
2. Cole em `frontend/config.js` na linha `CONTRACT_ADDRESS`

### 5. Abrir Interface
```bash
# Abrir no navegador
frontend/index.html
```

## 📋 Funcionalidades

- ✅ Cadastro de pacientes com validações
- ✅ Consulta individual por CPF  
- ✅ Prevenção de CPF duplicado
- ✅ Validação de idade (> 12 anos)
- ✅ Interface web responsiva
- ✅ Integração com MetaMask

## 🎯 Para Demonstração

Consulte o arquivo `DEMO_GUIDE.md` para roteiro completo de apresentação.

## 📝 Requisitos Atendidos

- [x] Smart Contract em Solidity
- [x] Frontend HTML + Web3.js  
- [x] Campos obrigatórios (nome, CPF, idade)
- [x] Campo opcional (endereço)
- [x] Validação idade > 12 anos
- [x] CPF único por paciente
- [x] Consulta de pacientes por CPF

## 🔧 Tecnologias

- **Solidity** - Smart Contracts
- **Hardhat** - Framework de desenvolvimento
- **Web3.js** - Interação com blockchain
- **MetaMask** - Carteira Web3
- **HTML/CSS/JS** - Interface web

## 📁 Estrutura do Projeto

```
registro-pacientes/
├── contracts/
│   └── RegistroPaciente.sol    # Smart Contract principal
├── scripts/
│   └── deploy.js               # Script de deploy
├── frontend/
│   ├── index.html             # Interface web principal
│   └── config.js              # Configurações centralizadas
├── .env                       # Configuração do endereço do contrato
└── DEMO_GUIDE.md              # Guia completo de demonstração
```

## 🎓 Demonstração para Aula

Execute os passos do `DEMO_GUIDE.md` para apresentação completa incluindo:

1. Cadastro de paciente válido
2. Tentativa de CPF duplicado  
3. Tentativa de idade inválida
4. Cadastro de segundo paciente
5. Consultas individuais por CPF

## 🔗 Configuração do MetaMask

1. **Adicionar Rede Hardhat Local:**
   - Nome: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Símbolo: ETH

2. **Importar Conta de Teste:**
   - Use uma das private keys fornecidas pelo `npx hardhat node`