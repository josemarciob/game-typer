$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){
	$("#spinner").toggle();

	$.get("http://localhost:3000/frases", trocaFraseAleatoria)
	.fail(function(){
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