const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🔍 Verificando configuração do projeto...\n");
  
  // 1. Verificar se o Hardhat está rodando
  try {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const network = await provider.getNetwork();
    console.log("✅ Hardhat node está rodando");
    console.log("   Chain ID:", network.chainId.toString());
  } catch (error) {
    console.log("❌ Hardhat node NÃO está rodando!");
    console.log("   Execute: npx hardhat node");
    return;
  }
  
  // 2. Verificar arquivo de configuração
  const configPath = path.join(__dirname, "../frontend/config.js");
  if (fs.existsSync(configPath)) {
    console.log("✅ Arquivo config.js encontrado");
    
    // Ler o endereço do contrato
    const configContent = fs.readFileSync(configPath, "utf8");
    const match = configContent.match(/CONTRACT_ADDRESS:\s*['"]([^'"]*)['"]/);
    if (match) {
      const contractAddress = match[1];
      console.log("   Endereço configurado:", contractAddress);
      
      // Verificar se o contrato está deployado
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      const code = await provider.getCode(contractAddress);
      
      if (code !== "0x") {
        console.log("✅ Contrato está deployado neste endereço");
      } else {
        console.log("❌ Contrato NÃO está deployado neste endereço!");
        console.log("   Execute: npm run deploy");
      }
    }
  } else {
    console.log("❌ Arquivo config.js não encontrado!");
  }
  
  // 3. Verificar se os contratos foram compilados
  const artifactsPath = path.join(__dirname, "../artifacts/contracts/RegistroPaciente.sol");
  if (fs.existsSync(artifactsPath)) {
    console.log("✅ Contratos compilados");
  } else {
    console.log("❌ Contratos não compilados!");
    console.log("   Execute: npx hardhat compile");
  }
  
  // 4. Mostrar instruções
  console.log("\n📋 Instruções para iniciar:");
  console.log("1. Terminal 1: npm run node");
  console.log("2. Terminal 2: npm run deploy");
  console.log("3. Terminal 2: npm run start");
  console.log("4. Abrir http://127.0.0.1:8080 no navegador");
  console.log("5. Configurar MetaMask para rede Hardhat Local");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
