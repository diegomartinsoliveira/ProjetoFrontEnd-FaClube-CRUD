FACLUBE = new Object();

FACLUBE.inscricao = new Object();

FACLUBE.PATH = "/ProjetoFaClube/rest/";

$(document).ready(function() {

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

	FACLUBE.inscricao.cadastrar = function() {

		var inscricao = new Object();
		var expRegNome = new RegExp("^[A-zÁ-ü]{3,}([ ]{1}[A-zÁ-ü]{2,})+$");
		
		inscricao.nome = document.frmAddInscricao.txtnome.value;
		inscricao.telefone = document.frmAddInscricao.txtfone.value;
		inscricao.email = document.frmAddInscricao.txtemail.value;
		inscricao.nascimento = document.frmAddInscricao.nascimento.value;
		inscricao.genero = document.frmAddInscricao.selgenero.value;
		inscricao.comentario = document.frmAddInscricao.txtcomentarios.value;
		inscricao.participa = document.frmAddInscricao.participa.value;
		
		
		if (!expRegNome.test(inscricao.nome)) {
			FACLUBE.exibirAviso("Preencha o campo com Nome e Sobrenome");
			document.frmAddInscricao.txtnome.focus();
			return false;
		}
		
		if ((inscricao.nome == "") || (inscricao.telefone == "") || (inscricao.email == "") || (inscricao.nascimento == "")) {
			FACLUBE.exibirAviso("Preencha todos os campos!");
			return false;
		}
			
		if ((!document.getElementById("genmasc").checked) && (!document.getElementById("genfem").checked)) {
 			FACLUBE.exibirAviso("Preencha um gênero");
			return false;
		}
		
		
		if (inscricao.comentario == "") {
			FACLUBE.exibirAviso("Faça um comentário");
			return false;
		}
		
				$.ajax({
				type: "POST",
				url: FACLUBE.PATH + "inscricao/inserir",
				data: JSON.stringify(inscricao),
				success: function(msg) {
					FACLUBE.exibirAviso(msg);
					$("#addInscricao").trigger("reset");
			
				},
				error: function(info) {
					FACLUBE.exibirAviso("Ocorreu um erro na inscrição: " + info.responseText);
			
				}
			});
	     }		
	});