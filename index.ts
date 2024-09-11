// 01
const fs = require('fs');

const lerArquivo = (): unknown => {
    return JSON.parse(fs.readFileSync('./bd.json'));
};

const escreverArquivo = (dados: any): void => {
    fs.writeFileSync('./bd.json', JSON.stringify(dados));
};

// 02 
type Endereco = {
    cep: string,
    rua: string,
    complemento?: string,
    bairro: string,
    cidade: string
};

type DadosUsuario = {
    nome: string,
    email: string
    cpf: string
    profissao?: string
    endereco: Endereco | null
};

const cadastrarUsuario = (dados: DadosUsuario): DadosUsuario => {
    const bd = lerArquivo() as DadosUsuario[];

    bd.push(dados);

    escreverArquivo(bd);

    return dados;
};

// 02 e 05
const listarUsuarios = (profissao?: string): DadosUsuario[] => {
    const bd = lerArquivo() as DadosUsuario[];

    if (profissao) {
        const usuarioProfissao = bd.filter((usuario) => {
            return usuario.profissao === profissao;
        });

        return usuarioProfissao;
    }

    return bd;
};

// 03
const detalharUsuario = (cpf: string): DadosUsuario => {
    const bd = lerArquivo() as DadosUsuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    return usuario;
};

const atualizarUsuario = (cpf: string, dados: DadosUsuario): DadosUsuario => {
    const bd = lerArquivo() as DadosUsuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    Object.assign(usuario, dados);

    escreverArquivo(bd);

    return dados;
};

// 04
const excluirUsuario = (cpf: string): DadosUsuario => {
    const bd = lerArquivo() as DadosUsuario[];

    const usuario = bd.find((usuario) => {
        return usuario.cpf === cpf;
    });

    if (!usuario) {
        throw new Error('Usuário não encontrado.');
    }

    const exclusao = bd.filter((usuario) => {
        return usuario.cpf !== cpf;
    });

    escreverArquivo(exclusao);

    return usuario;
};