<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css"/>
    <script>
        function mostrarFormulario() {
            const selectElement = document.getElementById('modalidade');
            const formulario = document.getElementById('formulario');
            const selectedOption = selectElement.value;

            if (selectedOption === 'Graduação') {
                formulario.innerHTML = 'graduação';
            } else if(selectedOption === 'Pós-Graduação'){
                formulario.innerHTML = 'pós graduação'
            } else if(selectedOption === 'Especialização'){
                formulario.innerHTML = 'especialização'
            } else {
                formulario.innerHTML = '';
            }
        }

        function titleize(text) {
            var loweredText = text.toLowerCase();
            var words = loweredText.split(" ");
            for (var a = 0; a < words.length; a++) {
                var w = words[a];

                var firstLetter = w[0];
                w = firstLetter.toUpperCase() + w.slice(1);

                words[a] = w;
            }
            return words.join(" ");
        }

        // Função para aplicar o titleize ao campo de título e nome antes de enviar o formulário
        function aplicarTitleize() {
            const tituloInput = document.getElementById('tituloTrabalho');
            const nomeInput = document.getElementById('nome');

            // Atualiza os valores dos inputs com o texto formatado
            tituloInput.value = titleize(tituloInput.value);
            nomeInput.value = titleize(nomeInput.value);
        }
    </script>    
    <title>Ficha Catalográfica</title>
</head>
<body>
    <div class="container">
        <header>
            <div class="cabecalho">
                <div class="imagem">
                    <p><a href="https://ifrs.edu.br/feliz/" target="_blank"><img alt="Logo-IFRS" src="Logo-IFRS-cores-sem-fundo-Vertical.png" /></a></p>
                </div>

                <div class="link">
                    <p><a href="https://ifrs.edu.br/feliz/" target="_blank">
                        Instituto Federal de Educação, Ciência e Técnologia do Rio Grande do Sul - Campus Feliz</a>
                    </p>
                    <p><a href="https://biblioteca.ifrs.edu.br/" target="_blank">
                        Sistema Pergamum - Biblioteca</a>
                    </p>
                </div>
            </div>
        </header>
        <main>
            <div class="formulario">
                <form action="ficha.php" method="post" onsubmit="aplicarTitleize()">
                    <h1>Dados para Ficha Catalográfica</h1>
                    <div class="tituloTrabalho">
                        <label for="titulo">Título do trabalho:<span class="marcaCampoObrigatorio">*</span>
                            <input 
                            id="tituloTrabalho" 
                            type="text" 
                            name="tituloTrabalho"
                            required
                            >
                        </label>
                    </div>
                    <div class="autor>
                        <p>Autor</p>
                        <label for="nome">
                            Nome:<span class="marcaCampoObrigatorio">*</span>
                            <input 
                            id="nome" 
                            type="text" 
                            name="nome"
                            pattern="[A-Za-zÀ-ÿ\s]+" 
                            title="Apenas letras e espaços são permitidos." 
                            required
                            >
                            (Exemplo: Ana Luiza)
                        </label>
                        <label for="sobrenome">
                            Sobrenome:<span class="marcaCampoObrigatorio">*</span>
                            <input 
                            id="sobrenome" 
                            type="text" 
                            pattern="[A-Za-zÀ-ÿ\s]+" 
                            title="Apenas letras e espaços são permitidos." 
                            required
                            >                            
                        </label>    
                    </div>
                    <div>
                        
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
