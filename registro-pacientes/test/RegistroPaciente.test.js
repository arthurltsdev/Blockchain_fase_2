const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RegistroPaciente", function () {
  let registroPaciente;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const RegistroPaciente = await ethers.getContractFactory("RegistroPaciente");
    registroPaciente = await RegistroPaciente.deploy();
  });

  it("Deve cadastrar paciente valido", async function () {
    await registroPaciente.cadastrarPaciente("Joao Silva", "12345678901", 25, "Rua A");
    const paciente = await registroPaciente.consultarPaciente("12345678901");
    expect(paciente.nome).to.equal("Joao Silva");
  });

  it("Deve rejeitar nome vazio", async function () {
    await expect(
      registroPaciente.cadastrarPaciente("", "12345678901", 25, "Rua A")
    ).to.be.revertedWith("Nome e obrigatorio");
  });

  it("Deve rejeitar idade menor ou igual a 12", async function () {
    await expect(
      registroPaciente.cadastrarPaciente("Joao", "12345678901", 12, "Rua A")
    ).to.be.revertedWith("Idade deve ser maior que 12 anos");
  });

  it("Deve rejeitar CPF duplicado", async function () {
    await registroPaciente.cadastrarPaciente("Joao", "12345678901", 25, "Rua A");
    await expect(
      registroPaciente.cadastrarPaciente("Maria", "12345678901", 30, "Rua B")
    ).to.be.revertedWith("CPF ja cadastrado");
  });
});