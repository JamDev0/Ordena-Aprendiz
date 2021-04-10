let FormDeCriação = document.getElementById('FormDeCriação');

let Enviar = document.getElementById('Enviar');

let Resetar = document.getElementById('Resetar');
let Listar = document.getElementById('Listar');


let TituloL = document.getElementById('TituloL');

let Lista = document.getElementById('Lista');


let DarkMode = document.getElementById('DarkMode');


let Root = document.documentElement;


let AlunosLocal = [];


let Alunos = [];


let Contador1 = 0;

DarkMode.addEventListener('click', Darkear);

function Darkear()
{
    if(Contador1 == 0)
    {
        DarkMode.style.filter = 'invert(1)';
        if(window.outerWidth > 875)
        {
            DarkMode.style.borderBottomRightRadius = '0px';
            DarkMode.style.borderTopLeftRadius = '10px';
        }
        DarkMode.style.transform = 'rotate(270deg)';
        Contador1 = 1;

        Root.style.setProperty('--CorDeFundo', 'black');

        document.getElementById('DarkModeAply').style.filter = 'invert(1)';
        document.getElementsByTagName('html')[0].style.backgroundColor = 'black';

        let Invertidos = document.getElementsByClassName('Invertido');
        for(let c = 0; c < Invertidos.length; c++)
        {
            Invertidos[c].style.filter = 'invert(1)';
            Invertidos[c].style.borderColor = 'white';
        }
    }
    else
    {
        DarkMode.style.filter = 'invert(0)';
        if(window.outerWidth > 875)
        {
            DarkMode.style.borderBottomRightRadius = '10px';
            DarkMode.style.borderTopLeftRadius = '0px';
        }
        DarkMode.style.transform = 'rotate(0deg)';
        Contador1 = 0;

        Root.style.setProperty('--CorDeFundo', 'white');

        document.getElementById('DarkModeAply').style.filter = 'invert(0)';
        document.getElementsByTagName('html')[0].style.backgroundColor = 'white';

        let Invertidos = document.getElementsByClassName('Invertido');
        for(let c = 0; c < Invertidos.length; c++)
        {
            Invertidos[c].style.filter = 'invert(0)';
            Invertidos[c].style.borderColor = 'black';
        }
    }
}

if(localStorage.getItem('Alunos') != null)
{
    Alunos = (JSON.parse(localStorage.getItem('Alunos')));
}

let AlunosMap;

Resetar.addEventListener('click', ResetarLista);

Enviar.addEventListener('click', CriarAluno);

Listar.addEventListener('click', List);


function CriarAluno()
{
    let CriançasDeF = FormDeCriação.children;
    let AlunoN = {};
    for(let c = 0; c < CriançasDeF.length-1; c++)
    { 
        if(CriançasDeF[c].value == '')
        {
            CriançasDeF[c].style.boxShadow = '0px 0px 0px 3.5px white, 0px 0px 0px 7px rgb(255, 30, 30)';
        }
        else
        {
            switch(c)
            {
                case 0:
                    AlunoN.Nome = CriançasDeF[c].value;
                    break;

                case 1:
                    AlunoN.Sobrenome = CriançasDeF[c].value;
                    break;

                case 2:
                    AlunoN.RA = CriançasDeF[c].value;
                    break;

                case 3:
                    AlunoN.N1 = CriançasDeF[c].value;
                    break;

                case 4:
                    AlunoN.N2 = CriançasDeF[c].value;
                    break;

                case 5:
                    AlunoN.N3 = CriançasDeF[c].value;
                    break;

                case 6:
                    AlunoN.MédiaS = CriançasDeF[c].value;
                    break; 
            }
            
        }
    }
    AlunoN.Média = ((parseFloat(AlunoN.N1) + parseFloat(AlunoN.N2) + parseFloat(AlunoN.N3))/3).toFixed(2);
    if(AlunoN.Média >= AlunoN.MédiaS)
    {
        AlunoN.Aprovação = 'aprovação';
    }
    else
    {
        AlunoN.Aprovação = 'rejeição';
    }
    Alunos.push(AlunoN);
    if(localStorage.getItem('Alunos') != null)
    {
        AlunosLocal = JSON.parse(localStorage.getItem('Alunos'));
        console.log(AlunosLocal);
        AlunosLocal.push(Alunos);
        console.log(AlunosLocal);
        localStorage.setItem('Alunos', JSON.stringify(AlunosLocal));
    }
    else
    {
        console.log(Alunos);
        localStorage.setItem('Alunos', JSON.stringify(Alunos));
        console.log(localStorage.getItem('Alunos'));
    }
    window.alert('Aluno criado :)');
    for(let c = 0; c < CriançasDeF.length-3; c++)
    {
        CriançasDeF[c].value = null;
    }
}

function Mapa()
{
    AlunosMap = Alunos.map(Mappin);
}

function Mappin(Aluno)
{
    return Aluno.Nome + ' ' + Aluno.Sobrenome + ' de RA ' + Aluno.RA + ', teve nota ' + Aluno.N1 + ' na 1ª avaliação, ' + Aluno.N2 + ' na 2ª e ' + Aluno.N3 + ' na 3ª. Resultando em uma média de ' +  Aluno.Média + '. Levando assim a sua ' + Aluno.Aprovação + ', de acordo com a média do sistema(' + Aluno.MédiaS + ').';
}


function List()
{
    if(Alunos != '')
    {
        Mapa();

        TituloL.style.display = 'block';

        while (Lista.firstChild) {
            Lista.removeChild(Lista.firstChild);
            }

        for(let c = 0; c < AlunosMap.length; c++)
        {
            let p = document.createElement('p');
            p.appendChild(document.createTextNode(AlunosMap[c]));

            p.setAttribute('Class', 'ItensDaLista');
            
            Lista.appendChild(p);

            Lista.appendChild(document.createElement('br'));
        }
        Reposicionar(); 
    }
    else
    {
        window.alert('Sua lista está vázia');
    }
}

function ResetarLista()
{
    if(localStorage.getItem('Alunos') != null)
    {
        localStorage.clear('Alunos');
        Alunos = [];
        while (Lista.firstChild) {
            Lista.removeChild(Lista.firstChild);
            }
        TituloL.style.display = 'none';
        Reposicionar();
        window.alert('Lista apagada');
    }
    else
    {
        window.alert('Lista já está em branco');
    }
}

Reposicionar();

function Reposicionar()
{
    if(window.outerWidth <= 875)
    {
        DarkMode.style.top = (document.getElementsByTagName('html')[0].offsetHeight) + 'px';
        DarkMode.style.left = 'calc(50% - ' + DarkMode.offsetWidth/2 + 'px)';
        DarkMode.style.borderRadius = '10px';
    }
    else
    {
        DarkMode.style.top = '-4px';
        DarkMode.style.left = '30px';
        DarkMode.style.borderTopLeftRadius = '0px';
        DarkMode.style.borderTopRightRadius = '0px';
    }
}

window.addEventListener('resize', Reposicionar);