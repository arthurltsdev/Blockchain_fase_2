// CONFIGURAÇÃO CENTRALIZADA
// Para atualizar o endereço do contrato, edite o arquivo config.js
const contractAddress = CONFIG.CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const contractABI = CONFIG?.CONTRACT_ABI || [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"cpf","type":"string"},{"indexed":false,"internalType":"string","name":"nome","type":"string"},{"indexed":false,"internalType":"uint256","name":"idade","type":"uint256"}],"name":"PacienteCadastrado","type":"event"},{"inputs":[{"internalType":"string","name":"_nome","type":"string"},{"internalType":"string","name":"_cpf","type":"string"},{"internalType":"uint256","name":"_idade","type":"uint256"},{"internalType":"string","name":"_endereco","type":"string"}],"name":"cadastrarPaciente","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_cpf","type":"string"}],"name":"consultarPaciente","outputs":[{"components":[{"internalType":"string","name":"nome","type":"string"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"uint256","name":"idade","type":"uint256"},{"internalType":"string","name":"endereco","type":"string"},{"internalType":"bool","name":"cadastrado","type":"bool"}],"internalType":"struct RegistroPaciente.Paciente","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"obterTodosCpfs","outputs":[{"internalType":"string[]","name":"","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"pacientes","outputs":[{"internalType":"string","name":"nome","type":"string"},{"internalType":"string","name":"cpf","type":"string"},{"internalType":"uint256","name":"idade","type":"uint256"},{"internalType":"string","name":"endereco","type":"string"},{"internalType":"bool","name":"cadastrado","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalPacientes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];

let web3;
let contract;
let userAccount;

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(contractABI, contractAddress);
            
            document.getElementById('connectButton').textContent = 'Conectado';
            document.getElementById('connectButton').disabled = true;
            document.getElementById('accountStatus').textContent = `Conectado: ${userAccount.substring(0,6)}...${userAccount.substring(38)}`;
            
            console.log('Conectado com sucesso!');
            console.log('Endereço do contrato:', contractAddress);
            
            await loadPatients();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar: ' + error.message);
        }
    } else {
        alert('Por favor, instale o MetaMask!');
    }
}

async function registerPatient(event) {
    event.preventDefault();
    
    if (!contract) {
        alert('Conecte sua carteira primeiro!');
        return;
    }
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const idade = parseInt(document.getElementById('idade').value);
    const endereco = document.getElementById('endereco').value || '';
    
    if (!/^\d{11}$/.test(cpf)) {
        alert('CPF deve ter exatamente 11 números!');
        return;
    }
    
    try {
        console.log('Enviando transação...');
        const tx = await contract.methods.cadastrarPaciente(nome, cpf, idade, endereco).send({ 
            from: userAccount,
            gas: 300000
        });
        
        console.log('Paciente cadastrado com sucesso!', tx);
        alert('Paciente cadastrado com sucesso!');
        
        document.getElementById('patientForm').reset();
        
        // Recarrega a lista
        setTimeout(() => loadPatients(), 1000);
        
    } catch (error) {
        console.error('Erro:', error);
        if (error.message.includes('CPF ja cadastrado')) {
            alert('Este CPF já está cadastrado!');
        } else {
            alert('Erro ao cadastrar: ' + error.message);
        }
    }
}

async function loadPatients() {
    if (!contract) return;
    
    const patientList = document.getElementById('patientList');
    const totalElement = document.querySelector('.stats h3') || document.querySelector('#totalPacientes');
    
    try {
        // Busca o total de pacientes
        const total = await contract.methods.totalPacientes().call();
        console.log('Total de pacientes:', total.toString());
        
        if (totalElement) {
            totalElement.textContent = total.toString();
        }
        
        // Busca todos os CPFs
        const cpfs = await contract.methods.obterTodosCpfs().call();
        console.log('CPFs cadastrados:', cpfs);
        
        if (cpfs.length === 0) {
            patientList.innerHTML = '<div class="no-patients">Nenhum paciente cadastrado ainda.</div>';
            return;
        }
        
        // Monta a tabela
        let html = '<table class="patients-table"><thead><tr><th>Nome</th><th>CPF</th><th>Idade</th><th>Endereço</th></tr></thead><tbody>';
        
        for (const cpf of cpfs) {
            const paciente = await contract.methods.consultarPaciente(cpf).call();
            const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            
            html += `<tr>
                <td>${paciente.nome}</td>
                <td>${cpfFormatado}</td>
                <td>${paciente.idade} anos</td>
                <td>${paciente.endereco || 'Não informado'}</td>
            </tr>`;
        }
        
        html += '</tbody></table>';
        patientList.innerHTML = html;
        
    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
        patientList.innerHTML = '<div class="no-patients">Erro ao carregar pacientes.</div>';
    }
}

// Event Listeners
document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('patientForm').addEventListener('submit', registerPatient);
document.getElementById('cpf').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Auto-conecta se já estava conectado
window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            await connectWallet();
        }
    }
});