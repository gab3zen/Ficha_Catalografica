<?php
require_once 'fpdf186/fpdf.php';

// Recebendo os dados do formulário
$tituloTrabalho = $_POST['tituloTrabalho'];
$numeroFolhas = $_POST['numeroFolhas'];
$nomeAutor = $_POST['nomeAutor'];
$sobrenomeAutor = $_POST['sobrenomeAutor'];
$nomeOrientador = $_POST['nomeOrientador'];
$sobrenomeOrientador = $_POST['sobrenomeOrientador'];
$ano = $_POST['ano'];
$modalidade = $_POST['modalidade'];
$cursos = "Processos Gerenciais"; // Exemplo fixo
$cidade = "Feliz"; // Exemplo fixo
$campus = "Campus Feliz"; // Exemplo fixo

// Verificando se o checkbox "orientadora" está marcado
$tipoOrientador = isset($_POST['orientadora']) ? 'Orientadora' : 'Orientador';

// Capturando os coorientadores
$coorientadores = [];
for ($i = 1; $i <= 5; $i++) {
    if (isset($_POST["nomeCoorientador$i"])) {
        $nomeCoorientador = $_POST["nomeCoorientador$i"];
        $sobrenomeCoorientador = $_POST["sobrenomeCoorientador$i"];
        $isCoorientadora = isset($_POST["coorientadora$i"]) && $_POST["coorientadora$i"] == 'on' ? 'Coorientadora' : 'Coorientador';
        
        $coorientadores[] = [
            'nome' => $nomeCoorientador,
            'sobrenome' => $sobrenomeCoorientador,
            'tipo' => $isCoorientadora
        ];
    }
}

// Inicia o documento PDF com orientação P (Retrato)
$pdf = new FPDF("P");
$pdf->AddPage();

// Nome do arquivo ao ser gerado
$arquivo = "Ficha_Catalografica_".$nomeAutor."_".$sobrenomeAutor.".pdf";

// Definindo a fonte do PDF
$pdf->SetFont('Arial', '', 12);

// Formatação da ficha catalográfica
$pdf->Cell(0, 10, utf8_decode("$sobrenomeAutor, $nomeAutor"), 0, 1);
$pdf->Cell(0, 10, utf8_decode("$tituloTrabalho / $nomeAutor $sobrenomeAutor. -- $ano."), 0, 1);
$pdf->Cell(0, 10, utf8_decode("$numeroFolhas f."), 0, 1);
$pdf->Cell(0, 10, utf8_decode("$tipoOrientador: $nomeOrientador $sobrenomeOrientador."), 0, 1);

// Adicionando coorientadores ao PDF
foreach ($coorientadores as $coorientador) {
    $pdf->Cell(0, 10, utf8_decode("{$coorientador['tipo']}: {$coorientador['nome']} {$coorientador['sobrenome']}."), 0, 1);
}

// Informação sobre o Instituto
$pdf->Cell(0, 10, utf8_decode("$modalidade -- Instituto Federal de Educação, Ciência e Tecnologia - $campus, modalidade em $cursos, $cidade, BR-RS, $ano."), 0, 1);

// Adicionando os assuntos ao PDF
$assuntos = [];
for ($i = 1; isset($_POST["assunto$i"]); $i++) {
    $assuntos[] = $_POST["assunto$i"];
}

foreach ($assuntos as $index => $assunto) {
    $numeroAssunto = $index + 1; // Para começar a contagem em 1
    $pdf->Cell(0, 10, utf8_decode("$numeroAssunto. $assunto."), 0, 1);
}

// Coletando orientadores e coorientadores
$referencias = [];

// Adicionando orientador
if (!empty($sobrenomeOrientador) && !empty($nomeOrientador)) {
    $referencias[] = "$sobrenomeOrientador, $nomeOrientador, orient.";
}

// Adicionando coorientadores
foreach ($coorientadores as $coorientador) {
    if (!empty($coorientador['sobrenome']) && !empty($coorientador['nome'])) {
        $referencias[] = "{$coorientador['sobrenome']}, {$coorientador['nome']}, coorient.";
    }
}

// Adicionando o título do trabalho
$tituloRef = utf8_decode("III. $tituloTrabalho.");
$referencias[] = $tituloRef;

// Adicionando referências ao PDF
foreach ($referencias as $i => $ref) {
    $numero = $i + 1;
    $pdf->Cell(0, 10, utf8_decode("$numero. $ref"), 0, 1);
}

// Definindo o tipo de saída do PDF
$tipo_pdf = "I"; // Para exibir no navegador

// Fechando o arquivo e gerando o PDF
$pdf->Output($arquivo, $tipo_pdf);
