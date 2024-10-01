<?php
//Buscando a Classe
require_once "fpdf186/fpdf.php";
//Estancindo

//Inicia o documento PDF com orientação P(picture) - RETRATO ou L(landscape) PAISAGEM
$pdf = new FPDF("P");
$pdf->AddPage();
//Nome do arquivo ao ser gerado ou gera o nome do arquivo com o local a ser salvo

$arquivo = "Ficha Catalografica.pdf";//Dar preferência para salvar PDF com o nome da pessoa
//Definindo formatações do PDF

/*Gerar como:
I: Envia o arquivo para o navegador. O visualizador de PDF é usado se disponivel.
D: Enviar para o navegador e forçar o arquivo um dowload com o nome especificado.
F: Salva o arquivo local com o nome dado por name(pode incluir um caminho).
S: Retorna o documento como string.
DEFAULT: O valor padrão é I.
*/
$tipo_pdf = "I";
//Fechando o arquivo
$pdf->Output($arquivo, $tipo_pdf)
?>