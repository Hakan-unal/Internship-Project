let index;
// Buradaki index değişkeni array içerisindeki elemanları listelerken kullanılacak 
// -1'den başlama nedeni array'in illk elemanının 0 olması
index = -1;

class Exchange {

    boxExchange = () => {
        let url, gbp, usd, eur, xhr;
        // Asenkron çalışacağımız için xhr objesi XMLHttpRequest classından yaratıldı
        xhr = new XMLHttpRequest();
        // Kullanacağımız apinin url adresini url değişkeni içerisine tanımladık
        url = "https://api.exchangeratesapi.io/latest?base=USD";

        // Aşağıda Get ile getir komutunu verdik,url ile hangi konumdan alınacağını söyledik,true ile 
        // asenkron işlemi tanımladık
        xhr.open("GET", url, true);

        xhr.onload = function () {
            // xhr.status===200 sayfanın tüm elemanlarının yüklendiğini belirtir
            if (xhr.status === 200) {

                let json, now, info, val_gbp, val_usd, val_eur;

                // json değişkeni içerisine apıden alınan veri atandı
                json = JSON.parse(xhr.response);
                // val_eur değişkeni içerisine json değişkeni içerisinde bulunan json dosyasında bulunan rates objesi 
                // içerisindeki EUR objesi tanımlandı ve aynı objeye ait TRY objesiyle çarpıldı ve döviz kurunun try 
                // cinsinden değeri elde edildi ve atama yapıldı
                val_eur = (1 / json.rates.EUR) * json.rates.TRY;
                // val_usd değişkeni içerisine json değişkeni içerisinde bulunan json dosyasında bulunan rates objesi 
                // içerisindeki USD objesi tanımlandı ve aynı objeye ait TRY objesiyle çarpıldı ve döviz kurunun try 
                // cinsinden değeri elde edildi ve atama yapıldı
                val_usd = (json.rates.USD) * json.rates.TRY;
                // val_gbp değişkeni içerisine json değişkeni içerisinde bulunan json dosyasında bulunan rates objesi 
                // içerisindeki GBP objesi tanımlandı ve aynı objeye ait TRY objesiyle çarpıldı ve döviz kurunun try 
                // cinsinden değeri elde edildi ve atama yapıldı
                val_gbp = (1 / json.rates.GBP) * json.rates.TRY;
                // Html üzerinde gösterimi sağlamak için aşağıdaki atamalar yapıldı
                // toPrecision fonksiyonu obje üzerinden gelen numeric değerin toplam 4 basamağını 
                // almak için kullanıldı
                gbp = `GBP: ${val_gbp.toPrecision(4)}`;
                usd = `USD: ${val_usd.toPrecision(4)}`;
                eur = `EURO: ${val_eur.toPrecision(4)}`;

                setInterval(() => {
                    // time() fonksiyonundan gelen değer now değişkeni içerisine atandı 
                    // info array'i içerisine 4 değer tanımlandı
                    // display() fonksiyonuna info array'i gönderildi
                    index += 1;
                    now = time();
                    info = [now, usd, gbp, eur];
                    display(info);

                }, 1000);
            }
        }
        xhr.send();
    }
}

display = (info) => {

    let box;
    // box değişkeni içerisine html üzerindeki id'si exchange olan element yakalandı ve tanımlandı
    box = document.querySelector("#exchange");
    // box değişkeninin innerText kısmına info değişkeninin index indisine göre elemanları tanımlandı
    box.innerText = info[index];
    // info array'i içerisinde toplam 4 eleman olduğu için index 3 olduğu zaman tekrar -1 olmalı ve sürekli 
    // olarak güncellenen bilgiyi ekranda göstermeli bu yüzden 3'e eşit olduğunda bir sonraki adımda 4  
    // olmadan index -1'e eşitleniyor
    if (index === 3) {
        index = -1;
    }
}

time = () => {

    let time, now;
    // Date class'ı üzerinden time objesi yaratılıyor ve now değişkeni içerisine time objesi üzerindeki 
    // Hours minutes ve seconds bilgileri uygun formatta yazılarak tanımlanıyor
    time = new Date();
    now = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    // ve son olarak fonksiyon çağırıldığı yere now değişkenini return ediyor
    return now;
}

let val;
// Exchange class'ı üzerinden val değşkeni tanımlandı 
val = new Exchange();
// boxExchange fonksiyonu obje üzerinden çağırıldı
val.boxExchange();