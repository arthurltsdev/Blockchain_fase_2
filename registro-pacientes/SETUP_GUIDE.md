# Guia de Configuração - Sistema de Registro de Pacientes

## 🚀 Passo a Passo para Executar o Projeto

### 1. Iniciar o Hardhat Node
Abra um terminal na pasta do projeto e execute:
```bash
npx hardhat node
```
⚠️ **IMPORTANTE**: Mantenha este terminal aberto durante todo o uso!

### 2. Deploy do Contrato (em outro terminal)
Em um **novo terminal**, execute:
```bash
npx hardhat run scripts/deploy-and-update.js --network localhost
```

Este comando irá:
- ✅ Fazer o deploy do contrato
- ✅ Atualizar automaticamente o endereço em `frontend/config.js`
- ✅ Mostrar o endereço do contrato deployado

### 3. Iniciar o Servidor Web
No mesmo terminal do passo 2, execute:
```bash
npx live-server frontend
```

### 4. Configurar MetaMask

1. **Adicionar Rede Hardhat**:
   - Clique no seletor de redes no MetaMask
   - Clique em "Adicionar rede manualmente"
   - Preencha:
     - Nome da Rede: `Hardhat Local`
     - URL do RPC: `http://127.0.0.1:8545`
     - ID da Cadeia: `31337`
     - Símbolo da Moeda: `ETH`

2. **Importar Conta de Teste**:
   - No terminal do Hardhat (passo 1), copie uma das chaves privadas exibidas
   - No MetaMask: Menu → Importar Conta
   - Cole a chave privada

### 5. Usar o Sistema

1. Acesse http://127.0.0.1:8080 no navegador
2. Clique em "Conectar MetaMask"
3. Aprove a conexão
4. Pronto! Agora você pode cadastrar e consultar pacientes

## 🔧 Solução de Problemas

### Erro: "Contrato não encontrado"
- Execute novamente o deploy: `npx hardhat run scripts/deploy-and-update.js --network localhost`

### Erro: "Received invalid block tag"
- Aguarde alguns segundos e tente conectar novamente
- Certifique-se de que o Hardhat node está rodando

### Erro: "Internal JSON-RPC error"
- Verifique se o Hardhat está rodando na porta 8545
- Verifique se a rede no MetaMask está configurada corretamente

## 📋 Funcionalidades Implementadas

- ✅ Conectar MetaMask
- ✅ Cadastrar paciente (nome obrigatório, idade > 12)
- ✅ Impedir CPF duplicado
- ✅ Consultar paciente por CPF
- ✅ Validações de dados
- ✅ Interface responsiva e moderna

## 🛠️ Comandos Úteis

```bash
# Compilar contratos
npx hardhat compile

# Executar testes
npx hardhat test

# Limpar cache
npx hardhat clean
```
