import DeliveryImage from '../../assets/Delivery.svg';

import './styles.scss';

export function Login() {
  //função para fazer o código só funcionar quando a pagina for carregada 
  window.onload=function(){

    //seleciona o cep
    const cep = document.querySelector('#cep');

    //percorre o json enviado pela API e separa apenas a parte que me importa
    const showData = (result) => {
      for(const campo in result){
          if (document.querySelector("#" + campo)) {
               document.querySelector("#" + campo).value = result[campo];
          }
      }
    }
  
    //função para pegar o campo enviado pelo input e colocar ele na API dos correios
    cep.addEventListener("blur", (e) =>{

      //função para encontrar o "-" caso encontrar troque por vazio
      let searchTrace = cep.value.replace("-","");
      
      //regras que eu defini para o fetch
      const options = {
        method: "GET",
        mode: 'cors',
        cache: 'default'
      }
  
      //estou enviando os dados para a API dos correios
      fetch(`https://viacep.com.br/ws/${searchTrace}/json`, options)
      //estou dizendo o que eu quero fazer com a minha promise
      .then(response => { response.json()
          //estou dizendo o que eu quero fazer com a minha outra promise
          .then( data => showData(data))
      })
      //caso dê errado eu quero que ele mostre uma mensagem com o erro encontrado 
      .catch(e => console.log('Deu um tal erro' + e))
    })
  }

  return (
    <div className="container-login">
      <figure>
        <img alt="Delivery" src={DeliveryImage} />
      </figure>

      <section>
        <h1>Consulta Cep</h1>
        <form>
        <label htmlFor="cep">Cep</label>
          <input
          id="cep"
          maxLength="9"
          placeholder="Cep"
          />

        <label htmlFor="logradouro">Rua</label>
          <input
          id="logradouro"
          type="text"
          placeholder="Rua"
          />

        <label htmlFor="bairro">Bairro</label>
          <input
          id="bairro"
          type="text"
          placeholder="Bairro"
          />

        <label htmlFor="localidade">Cidade</label>
          <input
          id="localidade"
          type="text"
          placeholder="Cidade"
          />

        <label htmlFor="uf">Estado</label>
          <input
          id="uf"
          type="text"
          placeholder="Estado"
          />
        </form>
      </section>

    </div>
  );
}