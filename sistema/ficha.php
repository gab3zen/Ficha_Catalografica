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
$cursos = $_POST['curso'] ?? '';
$campus = isset($_POST['campus']) ? $_POST['campus'] : '';

// Definindo a cidade com base no campus
switch ($campus) {
    case 'Campus Alvorada':
        $cidade = 'Alvorada';
        break;
    case 'Campus Bento Gonçalves':
        $cidade = 'Bento Gonçalves';
        break;
    case 'Campus Canoas':
        $cidade = 'Canoas';
        break;
    case 'Campus Caxias do Sul':
        $cidade = 'Caxias do Sul';
        break;
    case 'Campus Erechim':
        $cidade = 'Erechim';
        break;
    case 'Campus Farroupilha':
        $cidade = 'Farroupilha';
        break;
    case 'Campus Feliz':
        $cidade = 'Feliz';
        break;
    case 'Campus Ibirubá':
        $cidade = 'Ibirubá';
        break;
    case 'Campus Porto Alegre':
    case 'Campus Restinga':
        $cidade = 'Porto Alegre';
        break;
    case 'Campus Rio Grande':
        $cidade = 'Rio Grande';
        break;
    case 'Campus Rolante':
        $cidade = 'Rolante';
        break;
    case 'Campus Sertão':
        $cidade = 'Sertão';
        break;
    case 'Campus Vacaria':
        $cidade = 'Vacaria';
        break;
    case 'Campus Veranópolis':
        $cidade = 'Veranópolis';
        break;
    case 'Campus Viamão':
        $cidade = 'Viamão';
        break;
    default:
        $cidade = 'Osório';
}

$tipoOrientador = isset($_POST['orientadora']) ? 'Orientadora' : 'Orientador';
$coorientadores = [];

// Coletando coorientadores
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

$pdf = new FPDF("P", "mm", "A4"); // Usar milímetros como unidade e formato A4
$pdf->AddPage();

// Definir fonte "Times New Roman" e tamanho 11
$pdf->SetFont('Times', '', 11);
// Desenhar o quadro de 12 cm x 7,5 cm (120 mm x 75 mm)
$x = 45; // Posição X do canto superior esquerdo do quadro
$y = 200; // Posição Y do canto superior esquerdo do quadro
$largura = 120; // 12 cm em milímetros
$altura = 75;  // 7,5 cm em milímetros

// Mensagem centralizada fora do quadro
$pdf->SetXY(10, $y - 10); // Ajusta a posição do título 10 mm acima do quadro
$pdf->Cell(0, 5, utf8_decode("Ficha catalográfica gerada por sistema automatizado do IFRS."), 0, 1, 'C');
$pdf->Cell(0, 5, utf8_decode("Dados inseridos pelo próprio autor."), 0, 1, 'C');

// Desenhar o retângulo (borda do quadro)
$pdf->Rect($x, $y, $largura, $altura);

// Definir margens internas dentro do quadro
$pdf->SetXY($x + 5, $y + 5); // Ajuste a posição inicial do texto dentro do quadro

// Conteúdo da ficha catalográfica (sem negrito e com formatação do título correta)
$pdf->MultiCell($largura - 10, 5, utf8_decode("$sobrenomeAutor, $nomeAutor\n" .
    ucfirst(strtolower($tituloTrabalho)) . " / $nomeAutor $sobrenomeAutor. -- $ano.\n" .
    "$numeroFolhas f.\n" .
    "$tipoOrientador: $nomeOrientador $sobrenomeOrientador."), 0);

// A partir deste ponto, você deve ajustar o alinhamento do texto para os coorientadores e as informações seguintes.
$pdf->SetXY($x + 5, $pdf->GetY()); // Retorna para a mesma linha e define a posição X novamente

// Adicionando coorientadores ao PDF
foreach ($coorientadores as $coorientador) {
    $pdf->MultiCell($largura - 10, 5, utf8_decode("{$coorientador['tipo']}: {$coorientador['nome']} {$coorientador['sobrenome']}."), 0);
}

// Definindo a posição para as informações sobre o Instituto
$pdf->SetXY($x + 5, $pdf->GetY()); // Retorna para a posição Y correta
$pdf->MultiCell($largura - 10, 5, utf8_decode("$modalidade -- Instituto Federal de Educação, Ciência e Tecnologia - $campus, programa de $cursos, $cidade, BR-RS, $ano."), 0);

// Inicializa o array de assuntos
$assuntos = [];
for ($i = 1; isset($_POST["assunto$i"]); $i++) {
    $assuntos[] = $_POST["assunto$i"];
}

// Adicionando assuntos
$pdf->SetXY($x + 5, $pdf->GetY()); // Retorna para a posição Y correta
foreach ($assuntos as $index => $assunto) {
    $numeroAssunto = $index + 1; // Para começar a contagem em 1
    $pdf->MultiCell($largura - 10, 5, utf8_decode("$numeroAssunto. $assunto."), 0);
}

$pdf->Ln(5); // Adiciona um espaço em branco

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

// Adicionando o título do trabalho como referência
$tituloRef = utf8_decode("III. $tituloTrabalho.");
$referencias[] = $tituloRef;

// Adicionando referências ao PDF
$pdf->SetXY($x + 5, $pdf->GetY()); // Retorna para a posição Y correta
foreach ($referencias as $i => $ref) {
    $numero = $i + 1;
    $pdf->MultiCell($largura - 10, 5, utf8_decode("$numero. $ref"), 0);
}

// Definindo o nome do arquivo corretamente
$arquivo = "Ficha_Catalografica_" . str_replace(' ', '_', $nomeAutor) . "_" . str_replace(' ', '_', $sobrenomeAutor) . ".pdf";

// Definindo o tipo de saída do PDF (saída inline para o navegador)
$pdf->Output('I', $arquivo);
?>
