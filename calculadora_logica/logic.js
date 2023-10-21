var elementoParaEsconder = document.getElementById("tabela_tautologia");
//elementoParaEsconder.style.display = "none";

// Função para adicionar símbolos lógicos no campo de texto
function addSymbol(symbol) {
    const formulaInput = document.getElementById('formula');
    formulaInput.value += symbol;
    formulaInput.focus();
}

function apagar() {
    const formulaInput = document.getElementById('formula');
    str = (formulaInput.value).substring(0, (formulaInput.value).length - 1);
    formulaInput.value = str;
    formulaInput.focus();
}

// Event listeners para os botões dos símbolos lógicos
document.getElementById('apagar').addEventListener('click', () => apagar());
document.getElementById('a').addEventListener('click', () => addSymbol('A'));
document.getElementById('b').addEventListener('click', () => addSymbol('B'));
document.getElementById('c').addEventListener('click', () => addSymbol('C'));
document.getElementById('parentheses1').addEventListener('click', () => addSymbol('('));
document.getElementById('parentheses2').addEventListener('click', () => addSymbol(')'));
document.getElementById('negation').addEventListener('click', () => addSymbol('~'));
document.getElementById('conjunction').addEventListener('click', () => addSymbol('^'));
document.getElementById('disjunction').addEventListener('click', () => addSymbol('v'));
document.getElementById('conditional').addEventListener('click', () => addSymbol('→'));
document.getElementById('biconditional').addEventListener('click', () => addSymbol('↔'));
document.getElementById('exclusive-or').addEventListener('click', () => addSymbol('⊕'));

function verificaFBF(expressao) {
    const stack = [];
    let ultimoCaractere = ''; // Para rastrear o último caractere lido
    for (let i = 0; i < expressao.length; i++) {
      const char = expressao[i];
      if (char >= 'A' && char <= 'Z') {
        if (ultimoCaractere >= 'A' && ultimoCaractere <= 'Z') {
          return false; // Duas letras maiúsculas seguidas sem operador
        }
      } 
      else if (char === '(') {
        stack.push(char);
      } 
      else if (char === ')') {
        if (stack.length === 0 || stack.pop() !== '(') {
            return false; // Parênteses desbalanceados
        }
      } 
      else if (['^', 'v', '→', '↔', '⊕'].includes(char)) {
        if (['^', 'v', '→', '↔', '⊕'].includes(ultimoCaractere) || ultimoCaractere === '(') {
            return false; // Operador lógico seguido de operador lógico ou parêntese
        }
      }
      else if (['~'].includes(char)) {
            if (['~'].includes(ultimoCaractere) || ultimoCaractere === '(') {
                return true; // Negação
            }
      } 
      else {
        return false; // Caractere inválido
      }
      ultimoCaractere = char;

    }
    if (stack.length === 0) {
        if (['^', 'v', '~', '→', '↔', '⊕'].includes(ultimoCaractere)) {
          return false; // Último caractere é um operador lógico
        }
    }
    return stack.length === 0 && ultimoCaractere !== '('; // Verifica se todos os parênteses foram fechados e evita '(' no final
  }
  
  
  
  
  
  

document.getElementById('verify').addEventListener('click', () => {
    const formulaInput = document.getElementById('formula');
    const proposicao = formulaInput.value.trim();

    if (formula === '') {
        document.getElementById('output').textContent = 'Digite uma fórmula.';
    } else if (verificaFBF(proposicao)) {
        document.getElementById('output').textContent = 'A fórmula está bem formulada.';
    } else {
        document.getElementById('output').textContent = 'A fórmula possui problemas de sintaxe.';
    }
});


var input = document.getElementById('formula');
formula.addEventListener("keydown", function (event) {
    // Bloqueia todas as teclas pressionadas
    event.preventDefault();
});


function inserirTD(idTabela, conteudo, linhaTabela) {
    // Acesse a tabela pelo ID
    const tabela = document.getElementById(idTabela);
    
    // Crie um novo elemento <td>
    const novaTD = document.createElement('td');
    
    // Defina o conteúdo da célula
    novaTD.textContent = conteudo;
    
    // Acesse a linha (tr) à qual deseja adicionar a célula <td>
    const linha = tabela.querySelector('#colunaA');

    
    // Adicione a célula <td> à linha
    linha.appendChild(novaTD);
}

// Provador de Tautologia
var a = [true,true,false,false];
var aPos = ['a1','a2','a3','a4'];
var b = [true,false,true,false];
var bPos = ['b1','b2','b3','b4'];
var cPos = ['c1','c2','c3','c4'];

document.getElementById('verificarTautologia').addEventListener('click', () => {
    const inputFormula = document.getElementById('formula');
    const proposicaoLogica = inputFormula.value.trim();


    if(verificaFBF(proposicaoLogica)) {
        dividirFormula(proposicaoLogica)
        function dividirFormula(formula) {
            const splitE = formula.split("^"); //v→↔⊕
            const splitOr = formula.split("v"); //v→↔⊕
            const splitIf = formula.split("→"); //v→↔⊕
            const splitBiIf = formula.split("↔"); //v→↔⊕
            const splitExIf = formula.split("⊕"); //v→↔⊕
            var splitOk = ""; //v→↔⊕
            var operador = "";
    
            if(splitE.length == 2) {
                splitOk = splitE;
                operador = "E";
            }
            else if(splitOr.length == 2) {
                splitOk = splitOr;
                operador = "OU";
            }
            else if(splitIf.length == 2) {
                splitOk = splitIf;
                operador = "SE";
            }
            else if(splitBiIf.length == 2) {
                splitOk = splitBiIf;
                operador = "SESE";
            }
            else{
                splitOk = splitExIf;
                operador = "EXSE";

            }

            if(splitOk[0].length >= 2) {
                a = [false,false,true,true];
            }
            if(splitOk[1].length >= 2) {
                b = [false,true,false,true];
            }


            console.log(splitOk);
            console.log(operador);


            for(i=0; i<=3; i++) {
                var tdA = document.getElementById(aPos[i]);
                var tdB = document.getElementById(bPos[i]);
                var tdC = document.getElementById(cPos[i]);


                tdA.textContent = a[i];
                tdB.textContent = b[i];

                var tdTituloResultado = document.getElementById("nome_operacao");
                if(operador === "E") {
                    tdTituloResultado.textContent = "A ^ B"
                    tdC.textContent = (a[i] && b[i]);

                }
                else if(operador === "OU") {
                    tdTituloResultado.textContent = "A v B"
                    tdC.textContent = (a[i] || b[i]);
                }
                else if(operador === "SE") {
                    tdTituloResultado.textContent = "A → B"
                    if(a[i] == true) {
                        if(b[i] == true) {
                            tdC.textContent = true
                        }
                        else {
                            tdC.textContent = false
                        }

                    }
                    else {
                        tdC.textContent = true
                    }
                }
                else if(operador === "SESE") {
                    tdTituloResultado.textContent = "A ↔ B"
                    if(((a[i] == true && b[i] == true) || (a[i] == false && b[i] == false))) {
                        tdC.textContent = (true);
                    }
                    else {
                        tdC.textContent = (false);
                    }
                }
                else {
                    tdTituloResultado.textContent = "A ⊕ B"
                    if(((a[i] == true && b[i] == false) || (a[i] == false && b[i] == true))) {
                        tdC.textContent = (true);
                    }
                    else {
                        tdC.textContent = (false);
                    }
                }
            }


        } 


    }
    else {
        console.log("A formula não é válida")
    }

});

  

