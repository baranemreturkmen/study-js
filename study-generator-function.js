function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)) + min;
}

/*Generator function ihtiyacı fonksiyonel programlama ile ilgili.*/
function getLotteryNumbers(max,size){
    let numbers = [getRandomNumber(1,max)];
    while(numbers.length< size){
        let candidate = getRandomNumber(1,max);
        if(numbers.includes(candidate)) continue;
        numbers.push(candidate);
    }
    return numbers;
}

for(let number of getLotteryNumbers(60,6)){
    console.log(number)
}
//of yerine in kullanırsan javadaki array'in value'larına değil indekslerine erişirsin.

/*6 boyutlu bir array için sorun değil ama çok büyük arrayler için array'in ilk elemanına uygulanan işlemin sonucunu
  *Görebilmem için tüm array elemanlarına aynı işlemin uygulanmasını beklemeliyim. Tüm sonucu beklemeden ilk elemana
  * uygulanan sonucu görmek istiyorsam eğer generator function uygulamam gerekiyor.
  * */

//Generator function tanımlamak için bir * yeterli.
function *getLotteryNumbersGenerator(max,size){
    for(let i=0;i<size;i++){
        console.log(`getLotteryNumbers: ${i}`);
        yield getRandomNumber(1,max);
    }
}

/*Normalde biz bir fonksiyondan return ile döneriz. Return ile döndüğümüz zaman sonucu oluşturmuşuzdur.
  Bir daha geri dönmeyiz oraya. Ama yield ile öyle değil. Bir sonuç buldum al bunu kullan ben fonksiyona geri dönüyorum
  Mantığında çalışıyor. Uzun bir array üretmiyor tek tek sana sonucu dönüyor. Fakat burada fazla bellek kullanıyoruz.
  Fonksiyonel programlamada da böyle yeni bellek gözelerine ihtiyaç duyarsa belleği çok fazla kullanıyor.
  Bundan kaçmanın en iyi yolu generator function kullanmak. Generator function büyük bir veri ile çalıştığımız zaman o
  veriyi bellekte oluşturmak ve dönmek yerine kısmen bir sonuç bulduğunda yield ile o veriyi kullanacak olan tarafa
  aktarıyor. Dolayısıyla bir pipeline oluşturabiliyoruz. Fonksiyonel programlamada kullandığımız filter map ve reduce
  birer generator function. Tüm bir array'i taramak yerine tek tek bu işlemleri iş hattı gibi her bir eleman özelinde
  yapıyor.*/

for(let number of getLotteryNumbersGenerator(60,6)){
    console.log(`for-loop: ${number}`)
}

/*JS'de yazılan kodların çalışma biçimleri event driven'dı. Bu eventleri, event kuyruğunu işleyen bi tane execution
  thread'imiz var o yüzden bu eventlera karşılık olarak çalışmasını beklediğimiz call-back fonksiyonların asenkron olmasını
  istiyoruz özellikle uzun soluklu işler yapan dosya işlemleri gibi yada bir network üzerinden bir rest apiyi çağırmak gibi
  uzun soluklu işleri 1 sn. 2 sn. gibi işlemler yada daha uzun işlemler non blocking olmalı ki bu singleton execution
  thread'imiz bloke olmasın.
* */