function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Captura de dados do formulário
    const tituloTrabalho = document.getElementById('itituloTrabalho').value;
    const numeroFolhas = parseInt(document.getElementById('inumeroFolhas').value);
    const nomeAutor = document.getElementById('inomeAutor').value;
    const sobrenomeAutor = document.getElementById('isobrenomeAutor').value;
    const nomeOrientador = document.getElementById('inomeOrientador').value;
    const sobrenomeOrientador = document.getElementById('isobrenomeOrientador').value;
    const ano = parseInt(document.getElementById('iano').value);
    const modalidade = document.querySelector('input[name="modalidade"]:checked').value.toLowerCase();
    const cursoSelect = document.querySelector(`select[name="${modalidade === 'graduacao' ? 'cursoGraduacao' : modalidade === 'posgraduacao' ? 'cursoPosGraduacao' : 'cursoEspecializacao'}"]`);
    const curso = cursoSelect.value;
    const campus = cursoSelect.options[cursoSelect.selectedIndex].parentNode.label;
    let cidade = '';
    switch (campus) {
        case 'Campus Alvorada':
            cidade = 'Alvorada';
            break;
        case 'Campus Bento Gonçalves':
            cidade = 'Bento Gonçalves';
            break;
        case 'Campus Canoas':
            cidade = 'Canoas';
            break;
        case 'Campus Caxias do Sul':
            cidade = 'Caxias do Sul';
            break;
        case 'Campus Erechim':
            cidade = 'Erechim';
            break;
        case 'Campus Farroupilha':
            cidade = 'Farroupilha';
            break;
        case 'Campus Feliz':
            cidade = 'Feliz';
            break;
        case 'Campus Ibirubá':
            cidade = 'Ibirubá';
            break;
        case 'Campus Porto Alegre':
            cidade = 'Porto Alegre';
            break; // Valor padrão caso o campus não seja identificado
        case 'Campus Restinga':
            cidade = 'Porto Alegre';
            break;
        case 'Campus Rio Grande':
            cidade = 'Rio Grande';
            break;
        case 'Campus Rolante':
            cidade = 'Rolante';
            break;
        case 'Campus Sertão':
            cidade = 'Sertão';
            break;
        case 'Campus Vacaria':
            cidade = 'Vacaria';
            break;
        case 'Campus Veranópolis':
            cidade = 'Veranópolis';
            break;
        case 'Campus Viamão':
            cidade = 'Viamão';
            break; 
        default: "Ósorio";
    }

    // Captura dos coorientadores e checagem do checkbox para "coorientadora"
    const coorientadores = [];
    document.querySelectorAll('.coorientador').forEach(coorientador => {
        const nome = coorientador.querySelector('.nomeCoorientador').value;
        const sobrenome = coorientador.querySelector('.sobrenomeCoorientador').value;
        const isCoorientadora = coorientador.querySelector('.checkboxCoorientadora').checked; // Verifica o checkbox
        if (nome && sobrenome) {
            coorientadores.push({ nome, sobrenome, isCoorientadora });
        }
    });

    // Texto para exibição de coorientadores no PDF
    // Texto para exibição de coorientadores no PDF
    let textoCoorientadores = "";
    if (coorientadores.length > 0) {
        const primeiroCoorientador = coorientadores[0];
        const titulo = primeiroCoorientador.isCoorientadora ? 'Coorientadora' : 'Coorientador';
        textoCoorientadores = `${titulo}: ${primeiroCoorientador.nome} ${primeiroCoorientador.sobrenome}`;
        coorientadores.slice(1).forEach(coorientador => {
            textoCoorientadores += `, ${coorientador.nome} ${coorientador.sobrenome}`;
        });
    }

    // Captura de assuntos (múltiplos)
    const assuntos = [];
    document.querySelectorAll('.assunto').forEach(assunto => {
        if (assunto.value) {
            assuntos.push(assunto.value);
        }
    });

    // Ajuste da modalidade
    let modalidadeExibicao = 'Graduação';
    if (modalidade === 'posgraduacao') {
        modalidadeExibicao = 'Pós-Graduação';
    } else if (modalidade === 'especializacao') {
        modalidadeExibicao = 'Especialização';
    }

    let tipoOrientador = 'Orientador:';
    let checkbox = document.getElementById('iorientadora');
    if (checkbox.checked) {
        tipoOrientador = 'Orientadora:';
    }

    // Desenhar o retângulo e adicionar texto
    const larguraRetangulo = 120;
    const alturaRetangulo = 75;
    const larguraPagina = doc.internal.pageSize.getWidth();
    const alturaPagina = doc.internal.pageSize.getHeight();
    const x = (larguraPagina - larguraRetangulo) / 2;
    const y = (alturaPagina - alturaRetangulo) / 2;

    doc.rect(x, y, larguraRetangulo, alturaRetangulo);
    doc.setFontSize(10);
    const textoTitulo = "Ficha catalográfica gerada automaticamente.";
    const textoTitulo2 = "Dados informados pelo usuário.";
    const textWidth = doc.getTextWidth(textoTitulo);
    const xText = (larguraPagina - textWidth) / 2;
    doc.text(textoTitulo, xText, y - 7);
    doc.text(textoTitulo2, xText + 15, y - 2);

    // Definindo margens
    const margemEsquerda = 10;
    const larguraTexto = larguraRetangulo - 20;

    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    let linhaAtual = y + 12;

    // Função para adicionar texto
    function adicionarTexto(texto, y) {
        const linhas = doc.splitTextToSize(texto, larguraTexto);
        doc.text(linhas, x + margemEsquerda, y);
        return y + (linhas.length * 3.6);
    }

    // Listagem de orientador e coorientadores com números romanos
    const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    const listagemOrientadores = [`${romanNumerals[0]}. ${sobrenomeOrientador}, ${nomeOrientador}, orient.`];

    coorientadores.forEach((coorientador, index) => {
        listagemOrientadores.push(`${romanNumerals[index + 1]}. ${coorientador.sobrenome}, ${coorientador.nome}, coorient.`);
    });

    // Adicionar "titulo" com o próximo número romano
    const nextRoman = romanNumerals[coorientadores.length + 1];
    listagemOrientadores.push(`${nextRoman}. Título`);

    // Listagem dos assuntos com numeração (1, 2, 3...)
    const listagemAssuntos = assuntos.map((assunto, index) => `${index + 1}. ${assunto}`).join(', ');

    // Concatenar listagem de assuntos e orientadores/coorientadores na mesma linha
    const listagemFinal = `${listagemAssuntos}. ${listagemOrientadores.join(' ')}`;

    // Adicionando conteúdo ao PDF dentro do retângulo
    linhaAtual = adicionarTexto(`${sobrenomeAutor}, ${nomeAutor}`, linhaAtual);
    linhaAtual = adicionarTexto(`    ${tituloTrabalho} / ${nomeAutor} ${sobrenomeAutor}. -- ${ano}.`, linhaAtual);
    linhaAtual = adicionarTexto(`    ${numeroFolhas} f.`, linhaAtual);
    linhaAtual = adicionarTexto(`    ${tipoOrientador} ${nomeOrientador} ${sobrenomeOrientador}.`, linhaAtual);
    linhaAtual = adicionarTexto(`    ${textoCoorientadores}.`, linhaAtual); // Adicionando coorientadores
    linhaAtual = adicionarTexto(`    ${modalidadeExibicao} -- Instituto Federal de Educação, Ciência e Tecnologia, campus ${campus}, Programa de ${curso}, ${cidade}, BR-RS, ${ano}.`, linhaAtual);

    // Adicionando a linha final com assuntos e orientadores/coorientadores juntos
    linhaAtual = adicionarTexto(`    ${listagemFinal}`, linhaAtual);

    // Gerar PDF como Blob
    const pdfBlob = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);
    window.open(pdfURL, '_blank');
}