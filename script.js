let seuVotopara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0;
let numero = '';
let votobranco = false;
let votos = [];

function comecaEtapa(){
    let etapa = etapas[etapaAtual]


    let numeroHtml = '';
    numero = '';
    votobranco = false;

    for(let i = 0;i < etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        }else {
            numeroHtml += '<div class="numero"></div>';
        }
        
    }
    
    seuVotopara.style.display = 'none';
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}
function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) =>{
        if(item.numero === numero){
            return true;
        }else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotoshtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotoshtml += `<div class="d-1-imagem small"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legendas}</div>`
            }else{
                fotoshtml += `<div class="d-1-imagem"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legendas}</div>`
            }
    
        }

        lateral.innerHTML = fotoshtml
    }else{
        seuVotopara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</dic>'
        numeros.innerHTML = '';
        
    }

    console.log('candidato', candidato)
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
        
    }
}
function branco(){
   
    numero = '';
    votobranco = true;

    seuVotopara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO BRANCO</dic>'
    lateral.innerHTML = '';

}
function corrige(){
 comecaEtapa()
}
function confirma(){
    let etapa = etapas[etapaAtual];

    let votoconfirmado = false;


    if(votobranco === true){
        votoconfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:  'branco'
        });
    }else if(numero.length === etapa.numeros){
        votoconfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoconfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecaEtapa()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos)
        }
    }

}

comecaEtapa()