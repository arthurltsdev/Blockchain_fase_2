const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Iniciando deploy do RegistroPaciente...");
  console.log("📍 Rede:", hre.network.name);
  
  // Deploy do contrato
  const RegistroPaciente = await hre.ethers.getContractFactory("RegistroPaciente");
  const registroPaciente = await RegistroPaciente.deploy();
  
  await registroPaciente.waitForDeployment();
  const address = await registroPaciente.getAddress();
  
  console.log("\n✅ Deploy realizado com sucesso!");
  console.log("📋 Informações do contrato:");
  console.log("   📍 Endereço:", address);
  console.log("   🌐 Rede:", hre.network.name);
  console.log("   🔗 RPC URL: http://127.0.0.1:8545");
  console.log("   🆔 Chain ID: 31337");
  
  // Atualizar o arquivo config.js automaticamente
  const configPath = path.join(__dirname, "../frontend/config.js");
  let configContent = fs.readFileSync(configPath, "utf8");
  
  // Substituir o endereço do contrato
  configContent = configContent.replace(
    /CONTRACT_ADDRESS:\s*['"][^'"]*['"]/,
    `CONTRACT_ADDRESS: '${address}'`
  );
  
  fs.writeFileSync(configPath, configContent);
  
  console.log("\n✅ Arquivo config.js atualizado automaticamente!");
  console.log("📄 Endereço do contrato salvo em: frontend/config.js");
  console.log("\n🎯 Próximos passos:");
  console.log("   1. Mantenha este terminal rodando (npx hardhat node)");
  console.log("   2. Em outro terminal, execute: npx live-server frontend");
  console.log("   3. Acesse http://127.0.0.1:8080 no navegador");
  console.log("   4. Configure o MetaMask para a rede Hardhat Local");
  console.log("      - RPC URL: http://127.0.0.1:8545");
  console.log("      - Chain ID: 31337");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Erro no deploy:", error);
    process.exit(1);
  });
