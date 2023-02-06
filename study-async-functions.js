//Normal synchrone function
function sync_get_min(numbers){
    if(numbers.length === 0){
        throw "Empty array has no minimum"
    }
    let minValue = Number.MAX_VALUE;
    for(let number of numbers){
        if(number < minValue){
            minValue = number;
        }
    }
    return minValue;
}

let myNumbers = [4,8,15,16,23,42,1];
let emptyNumbers = [];
console.log(sync_get_min(myNumbers));
console.log(sync_get_min(emptyNumbers));

/*Burada uzun bir array olsaydı eğer bu iş saniyeler alacaktı. Bu bizim execution thread'imizi bloke edecekti ve event
* kuyruğundaki işlemler işleyemeyecekti. JS Engine birçok gui tabanlı engine'de olduğu gibi single thread çalışıyor.
* Çünkü multithread çalıştığı durumda thread safety sağlayamıyor. Execution thread bloke olursa api donar. Bu java'da
* swing'de yada .net'de vs. olabilir js'e özel bir durum değil. Bunun önüne geçmek için bu eventlere karşılık olarak
* çalışmasını istediğiniz callback dediğimiz metodları asenkron yaparız. Böylece bu thread bloke olmaz.*/

/*get_min'in asenkron olmasını istiyorsam ne yapmalıyım? es6 öncesi promise diye bir yapı var. Bu yapı bize bu uzun
* soluklu işi arka tarafta başka bir thread'e delegate etmemizi ve bunun ürettiği sonuca asenkron ulaşmamazı sağlıyor.
* Fonksiyon sonuca asenkron ulaşmamızı sağlayan bir nesne dönecek hemen. Ve paramnetre olarak bir lambda expression alacak.
* Ve uzun soluklu işlemi buraya koyuyorum. resolve ve reject olmak üzere 2 parametre alıyor çünkü bir fonksiyondan ancak
* 2 türlü çıkabiliriz. return ile çıkmak -> resolve. Yada exception ile çıkmak -> reject. Bu şekilde lambda expression
* asenkron bir şekilde sonucu dönebileceğim 2 parametre alıyor resolve ve reject.*/

function async_get_min(numbers){
    return new Promise((resolve,reject) => {
        if(numbers.length === 0){
            reject("Empty array has no minimum")
        }
        let minValue = Number.MAX_VALUE;
        for(let number of numbers){
            if(number < minValue){
                minValue = number;
            }
        }
        setTimeout(() => {
            resolve(minValue)
        },5000)//5 sn sonra çalışsın. Veya gizem kat. Math.floor(Math.random()*5000)+1000 1-6 sn arası
         resolve(minValue);
    })
}

async_get_min(myNumbers).then(minValue => console.log(minValue),reason => console.error(reason))
console.log("Hello Mars!")//Bunu hemen konsola yazar 5 sn beklemez. Normalde senkronda beklemeliydi.
/*Senkron metod sonucu dönene kadar beni bloke eder. Senkron metodlarda kodun yazılış sırasıyla çalışma sırası birbirini
* takip eder. Avantajı şu kodu yazmak ve takip etmek yani debug etmek daha kolay. Asenkronda ise belli bir sıra yok.
* */

/*Bu fonksiyon artık doğrudan sonucu dönmüyor. Async bir şekilde sonuca ulaşacağım bir veri yapısı dönüyor Promise dönüyor.
* then ile ben cevap geldiğinde çalışmasını istediğim callback fonksiyonunu vereceğim. 1. lambda expression başarılı olma
* durumunda çalışacak fonksiyonu içeriyor. 2. lambda expression başarısız olma durumunda çalışacak fonksiyonu içeriyor.
* Senkronda metodu çağırıyorum ve sonucu bekiyorum. Sonuç gelene kadar hiçbir iş yapamam. Asenkronda ise asyn_get_min'i
* çağırdıktan sonra ben çalışmaya devam ediyorum. */

//Js Array klonlama
let [first, second, ...rest] = [...myNumbers]
console.log(first)//4
console.log(second)//8
console.log(rest)//15,16,23,42,1

//tamamı için
let [...anotherArray] = [...myNumbers];

//Neden böyle yapmıyoruz.
let anotherArray2 = myNumbers;

/*Bu şekilde anotherArray myNumbers'ı referans ediyor. Benim gidipte myNumbers'ta bir ekleme silme vs. bir işlem yaptığımda
* bu anotherArray'e de yansıyor çünkü bellekte ikiside aynı yere bakıyorlar aynı referansa sahip oldukları için.*/

//Yukarıdaki bu syntax sadece arraylerde değil aynı zamanda objectlerde de var!!!.

//let anotherCircle = {...c1}

//Fakat bu klonlama mantığı iç içe objelerde sıkıntı. Deep cloning yapmıyor.

c1 = {x:0, y:0, radius:100, color:'Red'}
let anotherCircle = {...c1};
anotherCircle.color = 'Green'
console.log(c1.color)//Red

c2 = {x:0, y:0, radius:100, ui:{color:'Red',thickness:3}}
let anotherCircle2 = {...c2}
anotherCircle2.ui.color = 'Green'
console.log(c2.ui.color)//Green -> Whoops! :)

//Peki nasıl deep cloning yaparım? Bu da bu arada deep cloning değilmiş ama bu sorunu aşıyor.
let anotherCircle3 = {...c2}
anotherCircle3.ui = {...c2.ui}

//Bunu react'de çok kullanıyorlarmış. Stateler üzerinde immutability sağlamak için.

//Farklı senaryo deneyelim. Asenkronluk konusunda

for(let i=0;i<10;++i){
    let[...another_array] = [...myNumbers];
    another_array.push(i);
    async_get_min(another_array).then(
        minValue => console.log(minValue), reason => console.log(reason)//Bu arada bunun için burada bir lambda expression
        //yazmaya gerek yok çünkü lambda expression'ın yaptığı tek şey log fonksiyonunu çağırmak. log fonksiyonunu doğrudan
        //parametre olarak geçebiliyorum.
        //console.log,console.error şeklinde yazabilirsin.
        //1-Klasik fonksiyon geçebiliyorum, 2-lambda expression geçebiliyorum.
        //Lambda expression bir class içinde tanımlandığında otomatik olarak this'e bind oluyordu.
        //Normal bir fonksiyon için bu durum geçerli değildi.
        //3-Parametre olarak geçen fonksiyonu doğrudan adını vererek console.log şeklinde parametre olarak geçebiliyorum.
        //console objem var bu objenin log metodunu doğrudan parametre olarak geçebiliyorum. jack.sayhello ile aynı mantık.
        //Tabi compiler yok console.log'a beklediği parametre sayısından fazla yada az parametre verirsem ki bizden 1 bekliyor
        //Runtime'Da hata alırız. JS loosely type bir dil.
    );
}

/*Asenkronun avantajı bu. Farklı restful servisler ile çalışıyorum. Senkron çalışmam anlamsız çünkü ben farklı restful
* servisler ile çalışıyorum ve birinin bitmesini beklerken ötekilerini bekleteceğim her senkron çalışırsam.*/
