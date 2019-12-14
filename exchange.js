// variables
let index;
index = -1;

// object variables
let val;

class exchange {
    constructor() { }

    boxExchange = () => {
        //variables
        let url, gbp, usd, eur;

        //object variables
        let xhr;
        xhr = new XMLHttpRequest();

        // api url
        url = "https://api.exchangeratesapi.io/latest?base=USD";

        //object get data to url and asenkron
        xhr.open("GET", url, true);

        xhr.onload = function () {

            // http=200 === succesfull 
            if (xhr.status === 200) {

                //variables
                let json, now, info, val_gbp, val_usd, val_eur;

                //apiden alınan verilerin array'e çevrilmesi
                json = JSON.parse(xhr.response);
                val_eur = (1 / json.rates.EUR) * json.rates.TRY;
                val_usd = (json.rates.USD) * json.rates.TRY;
                val_gbp = (1 / json.rates.GBP) * json.rates.TRY;

                gbp = `GBP: ${val_gbp.toPrecision(4)}`;
                usd = `USD: ${val_usd.toPrecision(4)}`;
                eur = `EURO: ${val_eur.toPrecision(4)}`;



                // Continuous operation at 5 second intervals

                setInterval(() => {
                    index += 1;

                    now = time();

                    info = [now, usd, gbp, eur];

                    display(info);

                }, 1000 );
            }
        }

        xhr.send();
    }
}

display = (info) => {

    //  dom variables
    let box;
    box = document.querySelector("#exchange");

    //page innerText changing new innerText
    box.innerText = info[index];

    //array have max 4 elements so we need this if
    if (index === 3) {
        index = -1;
    }
}

time = () => {

    //object variables
    let time;
    time = new Date();

    // variables
    let now;
    now = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

    // if call this function,it send now
    return now;
}

// exhange class'ından val objesi oluşturuluyor
val = new exchange();

//oluşturulan val objesi üzerinden boxExchange fonksiyonu çağırılıyor
val.boxExchange();