$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){
	$("#spinner").toggle();
		//pegando as frases do servidor
	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	.fail(function(){  //caso houver erro no servidor ou  .get desconhecido, exibira mensagem de erro.
		$("#erro").toggle();
		setInterval(function(){
			$("#erro").toggle();
		},2000);
	})
	.always(function(){
		$("#spinner").toggle();
	});
}

function trocaFraseAleatoria(data){
	var frase = $(".frase");
	var numeroAleatorio = Math.floor(Math.random() * data.length);
	frase.text(data[numeroAleatorio].texto);

	atualizaTamanhoFrase();
	atualizaTempoInicial(data[numeroAleatorio].tempo);
}
