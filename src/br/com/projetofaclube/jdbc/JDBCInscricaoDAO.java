package br.com.projetofaclube.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonObject;

import br.com.projetofaclube.jdbcinterface.InscricaoDAO;
import br.com.projetofaclube.modelo.Inscricao;

public class JDBCInscricaoDAO implements InscricaoDAO {

	private Connection conexao;

	public JDBCInscricaoDAO(Connection conexao) {
		this.conexao = conexao;
	}

	public boolean inserir(Inscricao inscricao) {

		String comando = "INSERT INTO inscricao" + "(id, nome, telefone, email, nascimento, genero, comentario) " + "VALUES (?,?,?,?,?,?,?)";
		PreparedStatement p;

		try {

			// Prepara o comando para execução no BD em que nos conectamos
			p = this.conexao.prepareStatement(comando);

			// Substitui no comando os "?" pelos valores da inscricao
			p.setInt(1, inscricao.getId());
			p.setString(2, inscricao.getNome());
			p.setString(3, inscricao.getTelefone());
			p.setString(4, inscricao.getEmail());
			p.setString(5, inscricao.getNascimento());
			p.setString(6, inscricao.getGenero());
			p.setString(7, inscricao.getComentario());

			// Executa o comando no BD
			p.execute();

		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}
	
	public List<JsonObject> buscarPorNome(String nome) {

		// Inicia criação do comando SQL de busca
		String comando = "SELECT * FROM inscricao WHERE nome LIKE '%" + nome + "%'";
		

		List<JsonObject> listaInscricoes = new ArrayList<JsonObject>();
		JsonObject inscricao = null;

		try {

			Statement stmt = conexao.createStatement();
			ResultSet rs = stmt.executeQuery(comando);

			while (rs.next()) {

				int id = rs.getInt("id");
				nome = rs.getString("nome");
				String telefone = rs.getString("telefone");
				String email = rs.getString("email");
				String nascimento = rs.getString("nascimento");
				String genero = rs.getString("genero");
				String comentario = rs.getString("comentario");
				
				if (genero.equals("masculino")) {
					genero = "Masculino";
				} else if (genero.equals("feminino")) {
					genero = "Feminino";
				}

				inscricao = new JsonObject();
				inscricao.addProperty("id", id);
				inscricao.addProperty("nome", nome);
				inscricao.addProperty("telefone", telefone);
				inscricao.addProperty("email", email);
				inscricao.addProperty("nascimento", nascimento);
				inscricao.addProperty("genero", genero);
				inscricao.addProperty("comentario", comentario);
				

				listaInscricoes.add(inscricao);
				

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listaInscricoes;
	}

	public boolean deletar(int id) {
		String comando = "DELETE FROM inscricao WHERE id = ?";
		PreparedStatement p;
		try {
			p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			p.execute();
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	public Inscricao buscarPorId(int id) {

		String comando = "SELECT * FROM inscricao WHERE inscricao.id = ?";
		Inscricao inscricao = new Inscricao();

		try {
			PreparedStatement p = this.conexao.prepareStatement(comando);
			p.setInt(1, id);
			ResultSet rs = p.executeQuery();
			while (rs.next()) {

				String nome = rs.getString("nome");
				String telefone = rs.getString("telefone");
				String email = rs.getString("email");
				String nascimento = rs.getString("nascimento");
				String genero = rs.getString("genero");
				String comentario = rs.getString("comentario");

				inscricao.setId(id);
				inscricao.setNome(nome);
				inscricao.setTelefone(telefone);
				inscricao.setEmail(email);
				inscricao.setNascimento(nascimento);
				inscricao.setGenero(genero);
				inscricao.setComentario(comentario);
				

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return inscricao;
	}

	public boolean alterar(Inscricao inscricao) {

		String comando = "UPDATE inscricao " + "SET nome=?, telefone=?, email=?, nascimento=?, genero=?, comentario=?"
				+ " WHERE id=?";
		PreparedStatement p;

		try {
			p = this.conexao.prepareStatement(comando);
			p.setString(1, inscricao.getNome());
			p.setString(2, inscricao.getTelefone());
			p.setString(3, inscricao.getEmail());
			p.setString(4, inscricao.getNascimento());
			p.setString(5, inscricao.getGenero());
			p.setString(6, inscricao.getComentario());
			p.setInt(7, inscricao.getId());
			p.executeUpdate();
			
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		}
		return true;
		
	}
	
	public boolean verificaInscricaoDuplicada(Inscricao inscricao) {
		
		String comando = "SELECT * FROM inscricao";
		PreparedStatement p;
		
		try {
			
			p = this.conexao.prepareStatement(comando);
			ResultSet rs = p.executeQuery();
			
			while(rs.next()) {
				
				if(rs.getString("email").equalsIgnoreCase(inscricao.getEmail())) {
					return false;
				}
				
			}
			
			return true;
			
		}catch(SQLException e) {
			e.printStackTrace();
			return false;
		}
		
		
	}

	
}
