function validaInscricao() {
	var nome = document.frminscricao.txtnome.value;
	var expRegNome = new RegExp("^[A-zÁ-ü]{3,}([ ]{1}[A-zÁ-ü]{2,})+$");
	
	if (!expRegNome.test(nome)){
		alert("Preencha o campo Nome");
		document.frminscricao.txtnome.focus();
		return false;
	}
	var fone = document.frminscricao.txtfone.value;
	var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");
	
	if (!expRegFone.test(fone)) {
		alert("Preencha o campo Telefone");
		document.frminscricao.txtfone.focus();
		return false;
	}
	if (document.frminscricao.txtemail.value == "") {
		alert("Preencha o campo E-mail");
		document.frminscricao.txtemail.focus();
		return false;
	}
	if (document.frminscricao.nascimento.value == "") {
		alert("Preencha o campo Nascimento");
		document.frminscricao.nascimento.focus();
		return false;
	}
	if (document.frminscricao.selgenero.value == "") {
		alert("Preencha o campo Motivo");
		document.frminscricao.selgenero.focus();
		return false;
	}
	if (document.frminscricao.txacomentario.value == "") {
		alert("Preencha o campo Comentário");
		document.frminscricao.txacomentario.focus();
		return false;
	}
	if (document.frminscricao.participa.value == "") {
		alert("Você precisa aceitar para ser um fã");
		document.frminscricao.participa.focus();
		return false;
	}
	return true;
}

$(document).ready(function() {
	//Carrega cabeçalho, menu e rodapé aos respectivos locais
	$("header").load("/ProjetoFaClube/pages/site/general/header.html");
	$("nav").load("/ProjetoFaClube/pages/site/general/nav.html");
	$("footer").load("/ProjetoFaClube/pages/site/general/footer.html");
});

