package br.com.projetofaclube.rest;

import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import br.com.projetofaclube.bd.Conexao;
import br.com.projetofaclube.jdbc.JDBCInscricaoDAO;
import br.com.projetofaclube.modelo.Inscricao;

@Path("inscricao")
public class InscricaoRest extends UtilRest {

	@POST
	@Path("/inserir")
	@Consumes("application/*")
	public Response inserir(String inscricaoParam) {

		try {

			String msg = "";
			Inscricao inscricao = new Gson().fromJson(inscricaoParam, Inscricao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCInscricaoDAO jdbcInscricao = new JDBCInscricaoDAO(conexao);
			boolean retornoInscricaoDuplicada = jdbcInscricao.verificaInscricaoDuplicada(inscricao);

			if (retornoInscricaoDuplicada) {

				Inscricao retornoInscricao = jdbcInscricao.buscarPorId(inscricao.getId());

				if (retornoInscricao.getId() != inscricao.getId()) {

					return this.buildErrorResponse("Essa marca não existe mais, atualize a página");

				} else {

					boolean retorno = jdbcInscricao.inserir(inscricao);
					conec.fecharConexao();

					if (retorno) {

						msg = "Inscrição cadastrada com sucesso!";

					} else {

						return this.buildErrorResponse("Erro ao cadastrar inscrição");
					}
				}
			} else {

				return this.buildErrorResponse("Este usuário já está cadastrado!");

			}

			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@GET
	@Path("/buscar")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorNome(@QueryParam("valorBusca") String nome) {

		try {

			List<JsonObject> listaInscricoes = new ArrayList<JsonObject>();

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCInscricaoDAO jdbcInscricao = new JDBCInscricaoDAO(conexao);
			listaInscricoes = jdbcInscricao.buscarPorNome(nome);
			conec.fecharConexao();

			String json = new Gson().toJson(listaInscricoes);
			return this.buildResponse(json);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}

	@DELETE
	@Path("/excluir/{id}")
	@Consumes("application/*")
	public Response excluir(@PathParam("id") int id) {

		try {

			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCInscricaoDAO jdbcInscricao = new JDBCInscricaoDAO(conexao);

			boolean retorno = jdbcInscricao.deletar(id);
			conec.fecharConexao();
			String msg = "";

			if (retorno) {

				msg = "Inscrição excluída com sucesso!";

			} else {

				return this.buildErrorResponse("Erro ao excluir Inscrição.");
			}

			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}

	@GET
	@Path("/buscarPorId")
	@Consumes("application/*")
	@Produces(MediaType.APPLICATION_JSON)
	public Response buscarPorId(@QueryParam("id") int id) {

		try {
			Inscricao inscricao = new Inscricao();
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCInscricaoDAO jdbcInscricao = new JDBCInscricaoDAO(conexao);

			inscricao = jdbcInscricao.buscarPorId(id);

			conec.fecharConexao();

			return this.buildResponse(inscricao);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}
	}

	@PUT
	@Path("/alterar")
	@Consumes("application/*")
	public Response alterar(String inscricaoParam) {

		try {
			Inscricao inscricao = new Gson().fromJson(inscricaoParam, Inscricao.class);
			Conexao conec = new Conexao();
			Connection conexao = conec.abrirConexao();
			JDBCInscricaoDAO jdbcInscricao = new JDBCInscricaoDAO(conexao);

			boolean retorno = jdbcInscricao.alterar(inscricao);

			String msg = "";
			conec.fecharConexao();
			if (retorno) {

				msg = "Inscrição alterado com sucesso!";

			} else {

				return this.buildErrorResponse("Erro ao alterar a inscrição.");
			}

			return this.buildResponse(msg);

		} catch (Exception e) {
			e.printStackTrace();
			return this.buildErrorResponse(e.getMessage());
		}

	}

}