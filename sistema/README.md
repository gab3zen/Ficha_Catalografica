# fichaCatalografica
ficha catalográfica para o IFRS

1- nome e sobrenome não podem aceitar campos númericos
2- ano e número de paginas não podem conter caracteres
3- elaborar css
4- ano não pode ser maior que o ano atual
5- poder remover orientador/corientador
6- PARA GERAR PDF COM JS https://youtu.be/GYwAi-UJCkE?si=ZFCaUeZI2sUK1Hei
7- HTML bem estruturado https://youtu.be/IHMOu_KEW-0?si=txE_DL_ijiiKvYhq
8- começar pelo título e não pelo autor
9- FPDF

https://php.com.br/65?como-converter-html-para-pdf-usando-php
para transformar php em pdf

recolhe os dados de um formulario, concatena, 
joga no modelo de outra pagina e por fim transforma aquela pagina em pdf



 <div class="posGraduacao">
                        <label>Pós-Graduação</label>
                        <p>Trabalho:
                            <input type="radio" id="teseDoutorado" name="trabalho" value="Tese (Doutorado)">
                            <label for="teseDoutorado">Tese (Doutorado)</label>
                            <input type="radio" id="dissertacaoMestrado" name="trabalho" value="Dissertação (Mestrado)">
                            <label for="dissertacaoMestrado">Dissertação (Mestrado)</label>
                        </p>
                        <p>Programa:
                            <select id="programa" name="programa">

                            </select>

                        </p>