package br.com.projetofaclube.modelo;

import java.io.Serializable;

public class Inscricao implements Serializable {

	private static final long serialVersionUID = 1L;

	private int id;
	private String nome;
	private float telefone;
	private String email;
	private float nascimento;
	private String genero;
	private String comentario;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public float getTelefone() {
		return telefone;
	}
	public void setTelefone(float telefone) {
		this.telefone = telefone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public float getNascimento() {
		return nascimento;
	}
	public void setNascimento(float nascimento) {
		this.nascimento = nascimento;
	}
	public String getGenero() {
		return genero;
	}
	public void setGenero(String genero) {
		this.genero = genero;
	}
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
}