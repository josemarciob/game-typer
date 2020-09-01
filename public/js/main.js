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
    var usuario = "José";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover ="<a href='#'><i class='small material-icons'>delete</i></a>";

    var linha = "<tr>"+
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                    "<td>"+ botaoRemover + "</td>"+
                "</tr>";

    corpoTabela.append(linha);
}


$(".botao-remover").click(function(event){
	event.preventDefault();
	$(this).parent().parent().remove();
});


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
