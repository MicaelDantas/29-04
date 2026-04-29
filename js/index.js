async function buscarCEP() {
    const cep = document.getElementById("cep").value.replace("-", "");
    const resultado = document.getElementById("resultado");

    if (cep.length !== 8) {
        resultado.innerHTML = "<p>❌ Digite um CEP válido com 8 números.</p>";
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML = "<p>❌ CEP não encontrado.</p>";
            return;
        }

        resultado.innerHTML = `
            <p><strong>CEP:</strong> ${dados.cep}</p>
            <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
            <p><strong>Bairro:</strong> ${dados.bairro}</p>
            <p><strong>Cidade:</strong> ${dados.localidade}</p>
            <p><strong>Estado:</strong> ${dados.uf}</p>
            <p><strong>DDD:</strong> ${dados.ddd}</p>
        `;
    } catch (erro) {
        resultado.innerHTML = "<p>⚠️ Erro ao buscar CEP.</p>";
    }
}