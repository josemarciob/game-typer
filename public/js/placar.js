$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario, numPalavras);
    //função de remover linha
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


function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody > tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
            
        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score); //guardando o score no array

    });

    var dados = {
        placar:placar
    };

    $.post("http://localhost:3000/placar",dados,function(){
        console.log("Placar Salvo no Servidor!");
            $(".tooltip").tooltipster("open"); 
        }).fail(function(){
            $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar"); 
        }).always(function(){ 
            setTimeout(function() {
            $(".tooltip").tooltipster("close"); 
        }, 1200);
    });
}


//carregado automaticamente assim que a página é aberta
function atualizaPlacar(){

    $.get("http://localhost:3000/placar",function(data){
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
                $("tbody").append(linha);
        });
    });

}
