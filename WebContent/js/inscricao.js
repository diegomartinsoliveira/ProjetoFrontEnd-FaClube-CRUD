FACLUBE.inscricao = new Object();

$(document).ready(function() {

	FACLUBE.inscricao.cadastrar = function() {

		var inscricao = new Object();
		inscricao.nome = document.frminscricao.txtnome.value;
		inscricao.telefone = document.frminscricao.txtfone.value;
		inscricao.email = document.frminscricao.txtemail.value;
		inscricao.nascimento = document.frminscricao.nascimento.value;
		inscricao.genero = document.frminscricao.selgenero.value;
		inscricao.comentario = document.frminscricao.txacomentario.value;

		if ((inscricao.nome == "") || (inscricao.telefone == "") || (inscricao.email == "") || (inscricao.nascimento == "") || (inscricao.genero == "") || (inscricao.txacomentario == "")) {
			FACLUBE.exibirAviso("Preencha todos os campos!");

		} else {

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
			"</tr>";

		if (listaDeInscricoes != undefined && listaDeInscricoes.length > 0) {

			for (var i = 0; i < listaDeInscricoes.length; i++) {
				tabela += "<tr>" +
					"<td>" + listaDeInscricoes[i].nome + "</td>" +
					"<td>" + listaDeInscricoes[i].telefone + "</td>" +
					"<td>" + listaDeInscricoes[i].email + "</td>" +
					"<td>" + listaDeInscricoes[i].nascimento + "</td>" +
					"<td>" + FACLUBE.formatarData(listaDeInscricoes[i].nascimento) + "</td>" +
					"<td>" +
					"<a onclick=\"FACLUBE.inscricao.exibirEdicao('" + listaDeInscricoes[i].id + "')\"><img src='../../imgs/edit.png' alt='Editar registro'></a> " +
					"<a onclick=\"FACLUBE.inscricao.excluir('" + listaDeInscricoes[i].id + "')\"><img src='../../imgs/delete.png' alt='Excluir registro'></a>" +
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
			url: FACLUBE.PATH + "inscricao/excluir/" + id,
			success: function(msg) {
				FACLUBE.exibirAviso(msg);
				FACLUBE.inscricao.buscar();
			},
			error: function(info) {
				console.log(info)
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
				document.frmEditaInscricao.telefone.value = inscricao.telefone;
				document.frmEditaInscricao.email.value = inscricao.email;
				document.frmEditaInscricao.genero.value = inscricao.genero;
				document.frmEditaInscricao.comentario.value = inscricao.comentario;

				var selGenero = document.getElementById('selGeneroEdicao');
				for (var i = 0; i < selGenero.length; i++) {
					if (selGenero.options[i].value == inscricao.genero) {
						selGenero.options[i].setAttribute("selected", "selected");
					} else {
						selGenero.options[i].removeAttribute("selected");
					}
				}

				FACLUBE.inscricao.carregarMarcas(inscricao.inscricaoId);

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
		inscricao.nome = document.frminscricao.txtnome.value;
		inscricao.telefone = document.frminscricao.txtfone.value;
		inscricao.email = document.frminscricao.txtemail.value;
		inscricao.nascimento = document.frminscricao.nascimento.value;
		inscricao.genero = document.frminscricao.selgenero.value;
		inscricao.comentario = document.frminscricao.txacomentario.value;

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