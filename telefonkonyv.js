let nevjegyek = [];
let mode = {
    szerkeszt: false,
    szerkesztId: null
};

function submitClicked(){
    
    let nev = document.getElementById("nev").value;
    let telefonszam = document.getElementById("telefonszam").value;
    let ellenorzottTelefonszam = telefonszam.match(/^\+?[0-9 \/-]*/gsu);

    if(telefonszam != ellenorzottTelefonszam){

        alert("A telefonszám helytelen");
        return false;
    }

    let objektum = {

        nev: nev,
        telefonszam: telefonszam
    };

    let benneVanMarATombben = false;

    for(let i=0;i<nevjegyek.length;i++){

        if(mode.szerkeszt && i==mode.szerkesztId){

            continue;
        }

        if(telefonszam === nevjegyek[i].telefonszam){

            benneVanMarATombben = true;
            break;
        }
    }

    if(benneVanMarATombben){

        alert("Benne van már a telefonkönyvben");
    }else{
        if(mode.szerkeszt){

            nevjegyek[mode.szerkesztId] = objektum;
            mode.szerkeszt = false;
            mode.szerkesztId = null;
            document.getElementById("action").innerHTML = "Felvitel";
        }else{
            
            nevjegyek.push(objektum);
        }

        document.getElementById("nev").value = "";
        document.getElementById("telefonszam").value = "";
    }

    ujrarajzol();
    return false;
}

function torol(par){

    nevjegyek.splice(par, 1);
    ujrarajzol();
}

function szerkeszt(par){

    document.getElementById("action").innerHTML = "Szerkeszt";
    document.getElementById("nev").value = nevjegyek[par].nev;
    document.getElementById("telefonszam").value = nevjegyek[par].telefonszam;
    mode.szerkeszt = true;
    mode.szerkesztId = par;
}

function ujrarajzol(){

    let tartalom = "";

    for(let i=0;i<nevjegyek.length;i++){

        tartalom+=`<tr>
            <td>${nevjegyek[i].nev}</td>
            <td>${nevjegyek[i].telefonszam}</td>
            <td><button onclick="szerkeszt(${i})">E</button></td>
            <td><button onclick="torol(${i})">X</button></td>
        </tr>`;
    }

    let keret = `<table>
        <tr>
            <th>Név</th>
            <th>Telefonszám</th>
            <th>Szerkeszt</th>
            <th>Törlés</th>
        </tr>
        ${tartalom}
        </table>`;

    document.getElementById("cimjegyzekDiv").innerHTML = keret;
}

function main(){

    document.getElementById("submit").onclick = submitClicked;
}