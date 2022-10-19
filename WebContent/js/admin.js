FACLUBE = new Object();

$(document).ready(function() {

	//Cria uma constante com o valor da URI raiz do REST
	FACLUBE.PATH = "/ProjetoFaClube/rest/";

	$("header").load("/ProjetoFaClube/pages/admin/general/header.html");
	$("footer").load("/ProjetoFaClube/pages/admin/general/footer.html");

	// Função para carregamento de páginas de conteúdo, que
	// recebe como parâmetro o nome da pasta com a página a ser carregada

	FACLUBE.carregaPagina = function(pagename) {

		//Remove o conteúdo criado na abertura de uma janela modal pelo JQueryUI
		if ($(".ui-dialog"))
			$(".ui-dialog").remove();
		// Limpa a tag section, excluindo todo o conteúdo de dentro dela

		$("section").empty();
		// Carrega a página solicitada dentro da tag section

		$("section").load(pagename + "/", function(status, info) {

			if (status == "error") {
				var msg = "Houve um erro ao encontrar a página: " + info.status + " - " + info.statusText;
				$("section").html(msg);
			}
		});
	}

	//Exibe os valores financeiros no formato da moeda Real
	FACLUBE.formatarData = function() {
		let data = new Date();
 		let dataFormatada = ((data.getDate() )) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear(); 
		console.log(dataFormatada);
	}

	//Define as configurações base de uma modal de aviso
	FACLUBE.exibirAviso = function(aviso) {
		var modal = {
			title: "Mensagem",
			height: 250,
			width: 400,
			modal: true,
			buttons: {
				"OK": function() {
					$(this).dialog("close");
				}
			}
		};
		$("#modalAviso").html(aviso);
		$("#modalAviso").dialog(modal);
	};
});