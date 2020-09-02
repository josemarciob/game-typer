$("#botao-placar").click(mostraPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "José"
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

 //Adiciona a linha como a mais recente na lista do placar.
    corpoTabela.prepend(linha);
 //Animação de scroll para mostrar o placar
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar() {
    var posicaoPlacar = $(".placar").offset().top;

    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    }, 1000);
}

function novaLinha(usuario, palavras) {
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha() {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
    setInterval(function(){
        linha.remove();   
    },1000);
}

function mostraPlacar(){
    //esconde e mostra o placar
    $(".placar").stop().slideToggle(800);
}

