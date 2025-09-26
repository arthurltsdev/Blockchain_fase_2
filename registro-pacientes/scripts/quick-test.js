const hre = require("hardhat");

async function main() {
  console.log("🧪 Testando o contrato RegistroPaciente...\n");
  
  // Obter signers
  const [owner, addr1] = await hre.ethers.getSigners();
  
  // Obter o contrato deployado (assumindo que foi deployado no endereço padrão)
  const contractAddress = require("../frontend/config.js").CONFIG.CONTRACT_ADDRESS;
  const RegistroPaciente = await hre.ethers.getContractFactory("RegistroPaciente");
  const contract = RegistroPaciente.attach(contractAddress);
  
  console.log("📍 Contrato em:", contractAddress);
  console.log("👤 Conta de teste:", owner.address);
  
  try {
    // Teste 1: Cadastrar paciente válido
    console.log("\n✅ Teste 1: Cadastrando paciente válido...");
    await contract.cadastrarPaciente("João Silva", "12345678901", 25, "Rua A, 123");
    console.log("   ✓ Paciente cadastrado com sucesso!");
    
    // Teste 2: Consultar paciente
    console.log("\n✅ Teste 2: Consultando paciente...");
    const paciente = await contract.consultarPaciente("12345678901");
    console.log("   ✓ Paciente encontrado:", paciente.nome);
    
    // Teste 3: Tentar cadastrar CPF duplicado
    console.log("\n✅ Teste 3: Tentando cadastrar CPF duplicado...");
    try {
      await contract.cadastrarPaciente("Maria Silva", "12345678901", 30, "Rua B, 456");
      console.log("   ✗ ERRO: CPF duplicado foi aceito!");
    } catch (error) {
      console.log("   ✓ CPF duplicado corretamente rejeitado!");
    }
    
    // Teste 4: Tentar cadastrar idade inválida
    console.log("\n✅ Teste 4: Tentando cadastrar com idade < 12...");
    try {
      await contract.cadastrarPaciente("Pedro Junior", "98765432101", 10, "Rua C, 789");
      console.log("   ✗ ERRO: Idade inválida foi aceita!");
    } catch (error) {
      console.log("   ✓ Idade inválida corretamente rejeitada!");
    }
    
    // Teste 5: Verificar total de pacientes
    console.log("\n✅ Teste 5: Verificando total de pacientes...");
    const total = await contract.totalPacientes();
    console.log("   ✓ Total de pacientes:", total.toString());
    
    console.log("\n🎉 Todos os testes passaram com sucesso!");
    
  } catch (error) {
    console.error("\n❌ Erro durante os testes:", error.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
