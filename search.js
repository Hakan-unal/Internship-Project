class Profile {
    // Profile class'ı üzerinden yaratılan objede constructor olarak clientid ve clientSecret değişkenleri "" tanımlandı
    constructor() {
        this.clientid = '';
        this.clientSecret = '';
    }

    async getProfile(username) {
        // Fonksiyona username parametresi gönderildi ve aşağıdaki işlemler bu değişkene göre yapıldı 
        // Eğer aranana username api içerisinde varsa aşağıdaki koşul sağlanıyor dikkat et
        // 2 ayrı Apiden veri alındı ve biri profile değişkenine diğeri todo değişkenine tanımlandı
        const profileResponse = await fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`);
        const profile = await profileResponse.json();
        const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${profile[0].id}`);
        const todo = await todoResponse.json();

        return {
            profile,
            todo
        }
    }
}

class UIS {
    constructor() {
        // html dökümanı üzerindeki gerekli yerler yakalandı
        this.profileContainer = document.querySelector('#profileContainer');
        this.alert = document.querySelector('#alert');
    }
    showProfile(profile) {
        //fonksiyona gönderilen profile parametresi üzerinden aşağıdaki html yazıldı ve profile kullanıcı bilgileriyle birlikte ekranda gösterildi
        this.profileContainer.innerHTML = `
    
                <div class="card card-body">
                    <div class="row">
                        <div class="col-md-3">
                             <a href="https://placeholder.com"><img src="https://via.placeholder.com/350x150" class="img-thumbnail"></a>
                        </div>
                        <div class="col-md-9">
                            <h4>Contact</h4>
                            <ul class="list-group">
                                 <li class="list-group-item">
                                    name : ${profile.name}
                                 </li>
                                 <li class="list-group-item">
                                    username : ${profile.username}
                                 </li>
                                 <li class="list-group-item">
                                    email : ${profile.email}
                                 </li>
    
                                 <li class="list-group-item">
                                   address : ${profile.address.street}
                                   ${profile.address.city}
                                   ${profile.address.zipcode}
                                   ${profile.address.suite}
                                 </li>
                                 <li class="list-group-item">
                                 phone : ${profile.phone}
                                  </li>
                                  <li class="list-group-item">
                                      website : ${profile.website}
                                 </li>
                                 <li class="list-group-item">
                                 company : ${profile.company.name}
                                </li>
                            </ul>
                            <h4 class="mt-4">Todo list</h4>
                            <ul id="todo" class="list-group">
                            <ul>
                        </div>
                    </div>
                </div>
            `;
    }

    showAlert(text) {
        // bu fonksiyona gönderilen text parametresi mevcut objenin inner htmlsine aşağıdaki şekilde 
        // yazılıyor kullancıı bulunamadığından veya aranan harf veya harfler search edilirken 
        // sürekli tekrarlıyor
        this.alert.innerHTML = `${text} is not found.`;
    }

    showTodo(todo) {

        let html = "";
        // fonksiyona gönderilen todo array'i içerisindeki her bir eleman item adı altında aşağıdaki 
        // fonksiyoana gönderilir.forEach array'in eleman sayısı kadar çalışır
        // html değişkeni içerisine aşağıdaki şekilde yeni bir html oluşturulur eklenerek ve o da
        // profileContainer içerisindeki id'si todo olan değişkeninin htmlsine tanımlanır
        todo.forEach(item => {
            if (1) {
                html += `
                        <li class="list-group-item bg-success">
                            ${item.title}
                        </li>    
                    `;
            }
        });
        this.profileContainer.querySelector('#todo').innerHTML = html;
    }

    clear() {
        // clear fonksiyonu çağırıldğına yani keyUP olduğunda search işlemi yaniden gerçekleştiği
        // için alert kutucuğunu ve html'yi temizliyorsun
        this.profileContainer.innerHTML = "";
        this.alert.innerHTML = "";
    }
}
// yukarıdaki classlardan aşağıdaki obkjeler oluşturuldu
const profile = new Profile();
const ui = new UIS();
const searchProfile = document.querySelector('#searchProfile');

// searchProfile değişkenine keyup event'i gerçekleştiğindefonksiyona event parametresi(klavye ile işlem yapılan yer) 
searchProfile.addEventListener('keyup', (event) => {
    ui.clear();
    // event.target.value => klavye ile değer girilen yerdeki toplam değer yani haka yazdıysan mevutta ve sonradan n 
    // harfina basarsan targetta hakan yazmış olur ve text'in hakan olur
    let text = event.target.value;

    if (text !== '') {
        // text değişkeni boşluk olmadığı sürece aşağıdaki fonksiyonlar çalışır ve personel bulunur
        // bilgileri yeni html dökümanına yazılır eğer bulamazsa catch bölümüne aktarır ve hata
        // yakalar o da arayüzdeki kırmızı yazılı "is not found" kısmı
        profile.getProfile(text)
            .then(res => {
                if (res.profile.length === 0) {
                    ui.showAlert(text);
                } else {
                    ui.showProfile(res.profile[0]);
                    ui.showTodo(res.todo);
                }
            })
            .catch(err => {
                ui.showAlert(text);
            })
    }
});