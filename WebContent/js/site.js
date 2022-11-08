function validaCheckBox() {
	
	if(document.getElementById('participa').checked) {
		
		document.getElementById('btCadastrar').disabled = false;
	} else {
		document.getElementById('btCadastrar').disabled = true;
	}
	
}

$(document).ready(function() {
	//Carrega cabeçalho, menu e rodapé aos respectivos locais
	$("header").load("/ProjetoFaClube/pages/site/general/cabecalho.html");
	$("nav").load("/ProjetoFaClube/pages/site/general/menu.html");
	$("footer").load("/ProjetoFaClube/pages/site/general/rodape.html");
	

});

