window.addEventListener("load", () => {
    let ajaxClass = new AjaxClass();


    document.getElementById('pr_name').addEventListener('change', (e) => {
        console.log("Provincia: ", e.target.value);
        ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiProv=' +
            e.target.value, function (text) {
            let mun = text.getElementsByTagName('mun');
            let select_mu = document.getElementById('mu_name');
            select_mu.innerHTML = '';
            let optBuit = document.createElement('option');
            optBuit.value = "0";
            optBuit.innerText = " ";
            select_mu.appendChild(optBuit);
            console.log("TextProvincia:", text);
            if (text.hasChildNodes()) {
                select_mu.disabled = false;
                for (let tag of mun) {
                    let opt = document.createElement('option')
                    opt.value = tag.children[0].textContent;
                    opt.innerText = tag.children[1].textContent;
                    select_mu.appendChild(opt);
                }
            }
        })
        if (e.target.value === '07' || e.target.value === '35' || e.target.value === '38') {
            document.getElementById('il_name').className = " ";
            document.querySelector("label[for='il_name']").className = " ";
            let select_il = document.getElementById('il_name');
            ajaxClass.carregarContingut('/Server/illes.php', 'POST', 'codiProv=' +
                e.target.value, function (text) {
                console.log("TextIlla: ", text)
                let tags = text.getElementsByTagName('illa');
                select_il.innerHTML = '';
                let optBuit = document.createElement('option');
                optBuit.value = "0";
                optBuit.innerText = " ";
                select_il.appendChild(optBuit);
                if (text.hasChildNodes()) {
                    select_il.disabled = false;
                    for (let tag of tags) {
                        let opt = document.createElement('option')
                        opt.value = tag.children[0].textContent;
                        opt.innerText = tag.children[1].textContent;
                        select_il.appendChild(opt);
                    }
                }
            })
            select_il.addEventListener('change', (u) => {
                ajaxClass.carregarContingut('/Server/municipisByProvincia.php', 'POST', 'codiIlla=' +
                    u.target.value, function (text) {
                    let mun = text.getElementsByTagName('mun');
                    let select_mu = document.getElementById('mu_name');
                    select_mu.innerHTML = '';
                    let optBuit = document.createElement('option');
                    optBuit.value = "0";
                    optBuit.innerText = " ";
                    select_mu.appendChild(optBuit);
                    console.log("TextProvincia:", text);
                    if (text.hasChildNodes()) {
                        select_mu.disabled = false;
                        for (let tag of mun) {
                            let opt = document.createElement('option')
                            opt.value = tag.children[0].textContent;
                            opt.innerText = tag.children[1].textContent;
                            select_mu.appendChild(opt);
                        }
                    }
                })
            })
        } else {
            document.getElementById('il_name').className = "hidden";
            document.querySelector("label[for='il_name']").className = "hidden";
        }
    })

    document.getElementById('ca_name').addEventListener('change', (e) => {
        console.log("Comunitat: ", e.target.value);
        ajaxClass.carregarContingut('/Server/provinciesByComunitat.php', 'POST', 'codiCom=' +
            e.target.value, function (text) {
            let prov = text.getElementsByTagName('prov');
            let desplegable = document.getElementById('pr_name');
            desplegable.innerHTML = '';
            let optBuit = document.createElement('option');
            optBuit.value = "0";
            optBuit.innerText = " ";
            desplegable.appendChild(optBuit);
            console.log("ComunitatText: ", text);
            if (text.hasChildNodes()) {
                desplegable.disabled = false;
                for (let tag of prov) {
                    let opt = document.createElement('option')
                    opt.value = tag.children[0].textContent;
                    opt.innerText = tag.children[1].textContent;
                    desplegable.appendChild(opt);
                }
            }
        });
    })


    ajaxClass.carregarContingut('/Server/comunitats.php', 'GET', null, function (text) {
        let tags = text.getElementsByTagName('ca');
        let desplegable = document.getElementById('ca_name');
        let optBuit = document.createElement('option');
        optBuit.value = "0";
        optBuit.innerText = " ";
        desplegable.appendChild(optBuit);
        for (let tag of tags) {
            let opt = document.createElement('option')
            opt.value = tag.children[0].textContent;
            opt.innerText = tag.children[1].textContent;
            desplegable.appendChild(opt);
        }
    })
});
