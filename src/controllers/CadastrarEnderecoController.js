const Endereco = require('../models/Endereco');

// Função para cadastrar um novo endereço
async function registrar(req, res) {
  try {
    // Extraindo informações do token decodificado
    const id = req.tokenDecodificado.id;
    const pessoa = req.tokenDecodificado.pessoa;
    let cliente;

    // Definindo o cliente com base no tipo de pessoa
    cliente = pessoa === 'física' ? 'idUsuario' : 'idEmpresa';

    // Extraindo os dados da requisição
    const { cep, numero, complemento, bloco, apartamento, tipoLocal, referencia } = req.body;

    // Validação simples
    if (!cep || !numero) {
      return res.status(400).json({ message: "CEP e número são obrigatórios." });
    }

    const idCadastrado = await Endereco.findAll({
      where: {
        [cliente]: id // A chave será dinamicamente substituída por idUsuario ou idEmpresa
      }
    });

    if (idCadastrado.length > 0) {
      return res.status(409).json({ message: "Só é possível registarr um endereço por cadastro!"});
    }



    const data = {
      [cliente]:id,
      cep: req.body.cep,
      numero: req.body.numero,
      complemento: req.body.complemento,
      bloco: req.body.bloco,
      apartamento: req.body.apartamento,
      tipo_local: req.body.tipoLocal,
      referencia: req.body.referencia,
    };

    const novoEndereco = await Endereco.create(data);

    // Respondendo com o endereço criadol
    return res.status(201).json({
      message: "Endereço cadastrado com sucesso!",

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao cadastrar o endereço." });
  }
}

module.exports = { registrar };