var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

//$(document).ready(function(){});
//quando a pagina for carregada..
$(function(){

	console.log("Pagina carregada.")
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaMarcadores();
	$("#botao-reiniciar").click(reiniciaJogo);

});

function atualizaTamanhoFrase(){
	var frase = $(".frase").text();
	var numPalavras = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
	campo.on("input",function(){
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);
	});
}


function inicializaMarcadores(){

	var frase = $(".frase").text();
	campo.on("input", function(){
		var digitado = campo.val();
		var comparavel = frase.substr(0,digitado.length);
		if(digitado == comparavel){
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelho");
		}else{
			campo.addClass("borda-vermelho");
			campo.removeClass("borda-verde");
		}

	});	
}



function inicializaCronometro(){
	var tempoRestante = $("#tempo-digitacao").text();
	campo.one("focus", function(){
	var cronometroID = setInterval(function(){
		 $("#botao-reiniciar").attr("disabled",true);
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if(tempoRestante < 1){
				clearInterval(cronometroID);
				finalizaJogo();			
			}
		},1000);
	});
}


function finalizaJogo(){
	inserePlacar();
	campo.attr("disabled",true);
	$("#botao-reiniciar").attr("disabled",false);
	campo.addClass("campo-desativado");
}


function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Douglas";
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    //Adiciona a linha como a mais recente na lista do placar.
    corpoTabela.prepend(linha);
}

function novaLinha(usuario,palavras){

	var linha = $("<tr>");
	var colunaUsuario = $("<td>").text(usuario);
	var colunaPalavras = $("<td>").text(palavras);
	var colunaRemover = $("<td>");

	var link = $("<a>").addClass("botao-remover").attr("href","#");
	var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

	link.append(icone);

	colunaRemover.append(link);

	linha.append(colunaUsuario);
	linha.append(colunaPalavras);
	linha.append(colunaRemover);

	return linha;

}

function removeLinha(){
	event.preventDefault();
	$(this).parent().parent().remove();
}


function reiniciaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");
	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();
	campo.removeClass("campo-desativado");
	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelho");
}
