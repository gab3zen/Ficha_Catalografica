<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="ficha/ficha.css"/>
    <script src="ficha/ficha.js"></script>
       
    <title>Ficha Catalográfica</title>
</head>
<body>
    <div class="container">
        <header>
            <div class="cabecalho">
                <div class="imagem">
                    <p><a href="https://ifrs.edu.br/" target="_blank"><img alt="Logo-IFRS" src="ficha/Logo-IFRS-cores-sem-fundo-Vertical.png" /></a></p>
                </div>

                <div class="link">
                    <p><a href="https://ifrs.edu.br/" target="_blank">
                        Instituto Federal de Educação, Ciência e Técnologia do Rio Grande do Sul</a>
                    </p>
                    <p><a href="" target="_blank">
                        Sistema de Bibliotecas do IFRS - SIBIFRS</a>
                    </p>
                </div>
            </div>
        </header>
        <main>
            <div class="formulario">
                <form action="ficha.php" method="post" onsubmit="aplicarTitleize()" autocomplete="off">
                    <h1>Dados para Ficha Catalográfica</h1>
                    <div class="tituloTrabalho">
                        <h2>Título</h2><span class="marcaCampoObrigatorio">*</span>
                            <input 
                            id="itituloTrabalho" 
                            type="text" 
                            name="tituloTrabalho"
                            placeholder="Título do Trabalho"
                            required
                            >
                    </div>

                    <div class="numeroFolhas">
                        <h2>Número de Folhas</h2><span class="marcaCampoObrigatorio">*</span>
                            <input
                            id="inumeroFolhas"
                            type="text" 
                            name="numeroFolhas"
                            pattern="\d+" title="Apenas números são permitidos."
                            placeholder="Ex:123"
                            required
                            >
                    </div>

                    <div class="autor">
                        <h2>Autor</h2><span class="marcaCampoObrigatorio">*</span>
                            <input 
                            id="inomeAutor" 
                            type="text" 
                            name="nomeAutor"
                            pattern="[A-Za-zÀ-ÿ\s]+" 
                            title="Apenas letras e espaços são permitidos." 
                            placeholder="Nome:"
                            required
                            >

                            <input 
                            id="isobrenomeAutor" 
                            type="text" 
                            name="sobrenomeAutor"
                            pattern="[A-Za-zÀ-ÿ\s]+" 
                            title="Apenas letras e espaços são permitidos."
                            placeholder="Sobrenome:"
                            required
                            >
                    </div>

                    <div class="orientador">
                    <h2>Orientador</h2><span class="marcaCampoObrigatorio">*</span>
                            <input 
                            id="inomeOrientador" 
                            type="text" 
                            name="nomeOrientador"
                            pattern="[A-Za-zÀ-ÿ\s]+" 
                            title="Apenas letras e espaços são permitidos." 
                            placeholder="Nome:"
                            required
                            >
                            <input 
                            id="isobrenomeOrientador" 
                            type="text" 
                            name="sobrenomeOrientador"
                            pattern="[A-Za-zÀ-ÿ\s]+" 
                            title="Apenas letras e espaços são permitidos."
                            placeholder="Sobrenome:"
                            required
                            >                            
                    </div>  

                    <div class="coorientador">
                        <h2>Coorientador</h2><span class="marcaCampoObrigatorio">*</span>
                        <div id="divCoorientador">
                            <!-- Inputs iniciais de nome e sobrenome do primeiro coorientador -->
                            <input
                            id="inomeCoorientador"
                            type="text"
                            name="nomeCoorientador1"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            title="Apenas letras e espaços são permitidos."
                            placeholder="Nome:"
                            required
                            >
                            <input
                            id="isobrenomeCoorientador"
                            type="text"
                            name="sobrenomeCoorientador1"
                            pattern="[A-Za-zÀ-ÿ\s]+"
                            title="Apenas letras e espaços são permitidos."
                            placeholder="Sobrenome:"
                            required
                            >
                        </div>
                        <!-- Certifique-se de que o botão tem o id correto -->
                        <button id="botaoAdicionarCoorientador" type="button" onclick="adicionarCoorientador()">Adicionar Coorientador</button>
                    </div>


                    <div class="ano">
                        <h2>Ano</h2><span class="marcaCampoObrigatorio">*</span>
                        <input
                        id="iano"
                        >
                    </div>

                    
                    <div class="assunto">
                        <h2>Assunto(s)</h2><span class="marcaCampoObrigatorio">*</span>
                        <div id="divAssuntos">
                            <input
                            id="iassuntos"
                            type="text"
                            name="assunto1"
                            placeholder="Assunto 1"
                            required
                            >
                        </div>
                        <button type="button" id="botaoAdicionarAssunto" onclick="adicionarAssunto()">Adicionar Assunto</button>
                    </div>

                    <div class="modalidades">
                        <h2>Modalidade</h2>
                    </div>

                    <input type="submit" value="Enviar">
                </form>
            </div>
        </main>
        <footer>
        </footer>
    </div>
</body>
</html>
