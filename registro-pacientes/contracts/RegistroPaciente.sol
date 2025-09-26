// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistroPaciente {
    
    struct Paciente {
        string nome;
        string cpf;
        uint idade;
        string endereco;
        bool cadastrado;
    }
    
    mapping(string => Paciente) public pacientes;
    string[] private todosCpfs;
    
    event PacienteCadastrado(string indexed cpf, string nome, uint idade);
    
    function cadastrarPaciente(
        string memory _nome,
        string memory _cpf,
        uint _idade,
        string memory _endereco
    ) public {
        require(bytes(_nome).length > 0, "Nome e obrigatorio");
        require(bytes(_cpf).length > 0, "CPF e obrigatorio");
        require(_idade > 12, "Idade deve ser maior que 12 anos");
        require(!pacientes[_cpf].cadastrado, "CPF ja cadastrado");
        
        pacientes[_cpf] = Paciente({
            nome: _nome,
            cpf: _cpf,
            idade: _idade,
            endereco: _endereco,
            cadastrado: true
        });
        
        todosCpfs.push(_cpf);
        emit PacienteCadastrado(_cpf, _nome, _idade);
    }
    
    function consultarPaciente(string memory _cpf) public view returns (Paciente memory) {
        require(pacientes[_cpf].cadastrado, "Paciente nao encontrado");
        return pacientes[_cpf];
    }
    
    function obterTodosCpfs() public view returns (string[] memory) {
        return todosCpfs;
    }
    
    function totalPacientes() public view returns (uint) {
        return todosCpfs.length;
    }
}