package br.com.projetofaclube.jdbcinterface;

import java.util.List;

import com.google.gson.JsonObject;

import br.com.projetofaclube.modelo.Inscricao;

public interface InscricaoDAO {
	
	public boolean inserir (Inscricao inscricao);
	public List<JsonObject> buscarPorNome(String nome);
	public boolean deletar(int id);
	public Inscricao buscarPorId(int id);
	public boolean alterar(Inscricao inscricao);

}
