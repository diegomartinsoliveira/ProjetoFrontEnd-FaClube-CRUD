FACLUBE = new Object();

FACLUBE.inscricao = new Object();

FACLUBE.PATH = "/ProjetoFaClube/rest/";

$(document).ready(function() {

	$("header").load("/ProjetoFaClube/pages/admin/general/header.html");
	$("footer").load("/ProjetoFaClube/pages/admin/general/footer.html");

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
			height: 300,
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
		
		inscricao.nome = document.frmAddInscricao.nome.value;
		inscricao.telefone = document.frmAddInscricao.fone.value;
		inscricao.email = document.frmAddInscricao.email.value;
		inscricao.nascimento = document.frmAddInscricao.nascimento.value;
		inscricao.genero = document.frmAddInscricao.genero.value;
		inscricao.comentario = document.frmAddInscricao.comentarios.value;
		
		
		if (!expRegNome.test(inscricao.nome)) {
			FACLUBE.exibirAviso("Preencha o campo com Nome e Sobrenome");
			return false;
		}
		
		if ((inscricao.nome == "") || (inscricao.telefone == "") || (inscricao.email == "") || (inscricao.nascimento == "") || (inscricao.genero == "")) {
			FACLUBE.exibirAviso("Preencha todos os campos!");
			return false;
		}
			
		
				$.ajax({
				type: "POST",
				url: FACLUBE.PATH + "inscricao/inserir",
				data: JSON.stringify(inscricao),
				success: function(msg) {
					FACLUBE.exibirAviso(msg);
					$("#addInscricao").trigger("reset");
					FACLUBE.inscricao.buscar();
			
				},
				error: function(info) {
					FACLUBE.exibirAviso("Ocorreu um erro na inscrição: " + info.responseText);
			
				}
			});
	     }	

	FACLUBE.inscricao.buscar = function() {

		var valorBusca = $("#campoBuscaInscricao").val();

		$.ajax({
			type: "GET",
			url: FACLUBE.PATH + "inscricao/buscar",
			data: "valorBusca=" + valorBusca,
			success: function(dados) {

				dados = JSON.parse(dados);

				$("#listaInscricoes").html(FACLUBE.inscricao.exibir(dados));
			},
			error: function(info) {
				FACLUBE.exibirAviso("Erro ao consultar os dados: " + info.status + " - " + info.statusText);
			}
		});

	};


	FACLUBE.inscricao.exibir = function(listaDeInscricoes) {
		
		

		var tabela = "<table>" +
			"<tr>" +
			"<th>Nome</th>" +
			"<th>Telefone</th>" +
			"<th>E-mail</th>" +
			"<th>Data de Nascimento</th>" +
			"<th>Gênero</th>" +
			"<th>Comentários</th>" +
			"<th>Ações</th>" +
			"</tr>";
		if (listaDeInscricoes != undefined && listaDeInscricoes.length > 0) {

			for (var i = 0; i < listaDeInscricoes.length; i++) {
				
				let data_americana = listaDeInscricoes[i].nascimento;
				let data_brasileira = data_americana.split('-').reverse().join('/');
				tabela += "<tr>" +
					"<td>" + listaDeInscricoes[i].nome + "</td>" +
					"<td>" + listaDeInscricoes[i].telefone + "</td>" +
					"<td>" + listaDeInscricoes[i].email + "</td>" +
					"<td>" + data_brasileira + "</td>" +
					"<td>" + listaDeInscricoes[i].genero + "</td>" +
					"<td>" + listaDeInscricoes[i].comentario + "</td>" +
					"<td>" +
					"<a onclick=\"FACLUBE.inscricao.exibirEdicao('"+listaDeInscricoes[i].id+"')\"><img src='../../imgs/edit.png' alt='Editar registro'></a> " +
					"<a onclick=\"FACLUBE.inscricao.excluir('"+listaDeInscricoes[i].id+"')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
					"</td>" +
					"</tr>"
			}
			

		} else if (listaDeInscricoes == "") {
			tabela += "<tr><td colspan='6'> Nenhum registro encontrado </td></tr>";
		}
		tabela += "</table>";

		return tabela;


	};

	//Executa a função de busca ao carregador a página
	FACLUBE.inscricao.buscar();


	FACLUBE.inscricao.excluir = function(id) {
		$.ajax({
			type: "DELETE",
			url: FACLUBE.PATH + "inscricao/excluir/"+id,
			success: function(msg) {
				FACLUBE.exibirAviso(msg);
				FACLUBE.inscricao.buscar();
			},
			error: function(info) {
				FACLUBE.exibirAviso("Erro ao excluir o inscrito: " + info.statusText);
			}
		});
	};


	FACLUBE.inscricao.exibirEdicao = function(id) {
		
		$.ajax({
			type: "GET",
			url: FACLUBE.PATH + "inscricao/buscarPorId",
			data: "id=" + id,
			success: function(inscricao) {

				document.frmEditaInscricao.idInscricao.value = inscricao.id;
				document.frmEditaInscricao.nome.value = inscricao.nome;
				document.frmEditaInscricao.fone.value = inscricao.telefone;
				document.frmEditaInscricao.email.value = inscricao.email;
				document.frmEditaInscricao.nascimento.value = inscricao.nascimento;
				document.frmEditaInscricao.selGeneroEdicao.value = inscricao.genero;
				document.frmEditaInscricao.comentarios.value = inscricao.comentario;

				var selGenero = document.getElementById('selGeneroEdicao');
				for (var i = 0; i < selGenero.length; i++) {
					if (selGenero.options[i].value == inscricao.genero) {
						selGenero.options[i].setAttribute("selected", "selected");
					} else {
						selGenero.options[i].removeAttribute("selected");
					}
				}

				var modalEditaInscricao = {
					title: "Editar Inscrição",
					height: 400,
					width: 550,
					modal: true,
					buttons: {
						"Salvar": function() {
							FACLUBE.inscricao.editar();
						},
						"Cancelar": function() {
							$(this).dialog("close");
						}
					},
					close: function() {
						//caso o usuário simplesmente feche a caixa de edição
						//não deve acontecer nada
					}
				};
				$("#modalEditaInscricao").dialog(modalEditaInscricao);


			},
			error: function(info) {
				COLDIGO.exibirAviso("Erro ao buscar a inscrição para edição: " + info.statusText);
			}
		});
	};

	//Realiza a edição dos dados no BD
	FACLUBE.inscricao.editar = function() {

		var inscricao = new Object();
		var expRegNome = new RegExp("^[A-zÁ-ü]{3,}([ ]{1}[A-zÁ-ü]{2,})+$");
		inscricao.id = document.frmEditaInscricao.idInscricao.value;
		inscricao.nome = document.frmEditaInscricao.nome.value;
		inscricao.telefone = document.frmEditaInscricao.fone.value;
		inscricao.email = document.frmEditaInscricao.email.value;
		inscricao.nascimento = document.frmEditaInscricao.nascimento.value;
		inscricao.genero = document.frmEditaInscricao.genero.value;
		inscricao.comentario = document.frmEditaInscricao.comentarios.value;
		
		if (!expRegNome.test(inscricao.nome)) {
			FACLUBE.exibirAviso("Preencha o campo com Nome e Sobrenome");
			return false;
		}
		
		if ((inscricao.nome == "") || (inscricao.telefone == "") || (inscricao.email == "") || (inscricao.nascimento == "") || (inscricao.genero == "")) {
			FACLUBE.exibirAviso("Preencha todos os campos!");
			return false;
		}
		
		if (inscricao.comentario == "") {
			FACLUBE.exibirAviso("Faça um comentário");
			return false;
		}

		$.ajax({
			type: "PUT",
			url: FACLUBE.PATH + "inscricao/alterar",
			data: JSON.stringify(inscricao),
			success: function(msg) {
				msg = JSON.parse(msg);

				FACLUBE.exibirAviso(msg);
				FACLUBE.inscricao.buscar();
				$("#modalEditaInscricao").dialog("close");

			},
			error: function(info) {
				FACLUBE.exibirAviso("Erro ao editar a inscrição: " + info.statusText);

			}
		});

	};	

});