//Tüm array fonksiyonlarına girmedik. Sonradan detaylı incele. Çok kullanılanlara baktık.
numbers = [4, 8, 15, 16, 23, 42]
numbers.sort()
console.log(numbers)//Zaten sıralıydı sırayı da bozdu neden böyle oldu?

/*Aslında sıralı ama dictionary order'a göre sıralı. Numerik olarak sıralamıyor default olarak.*/

names = ["ali","ayşe","şule","sima","ahmet"]
console.log(names.sort())//Olması gerektiği gibi string'de dictionary order alfabetik sıraladı.

/*sort aslında high order bir function. Sıralamanın nasıl olacağına dair bir fonksiyonu parametre olarak
* alıyor.*/

numbers2 = [8, 4, 16, 15, 42, 23]

numbers2.sort(function(u,v){
    if(u<v) return -1
    if(u===v) return 0
    return +1//farklı bir if-else yazımı.
})
console.log(numbers2)

//Biraz matematik ile fonksiyonu sadeleştirebilirim.

numbers2.sort(function(u,v){
    return u-v//sonuçta -1,0 veya +1 dönecek.
})
console.log(numbers2)

/*Şimdi ama ben bu şekilde küçükten büyüğe sıralama yapıyorum. Büyükten küçüğe için v-u demem lazım.
* u ile v'nin yeri değişince büyükten küçüğe sıralama yapmayı yada default'da u-v'de yani
* ilk parametreden 2. parametreyi çıkarınca küçükten büyüğe sıralama, 2. parametreden ilk parametreyi
* çıkarınca büyükten küçüğe sıralama yapmayı nasıl anlıyor? sort metoduna parametre olarak geçtiğim
* fonksiyonu Js direk bu compareFunction olmalı diyerek kendi anlamlandırıyor. Yani arkada bu işi Js
* engine yapıyor.*/

numbers2.sort(function(u,v){
    return v-u//sonuçta -1,0 veya +1 dönecek.
})
console.log(numbers2)

//Lambda expression ile bunu daha yalın bir şekilde yazabilirim.
//Lambda expression kullanırken fonksiyon gövdesi tek bir returnden ibaretse return'e de gerek yok.

numbers3 = [30,20,40,10,50,25]
console.log(numbers3.sort((u,v)=>v-u))//büyükten küçüğe
console.log(numbers3.sort((u,v)=>u-v))//küçükten büyüğe

/*sort default bir şekilde dictionary order yapıyor ama küçükten büyüğe yapıyor.
* büyükten küçüğe nasıl yaparım bu sıralamayı?*/

console.log(names.sort((u,v)=>v.localeCompare(u)))

/*localCompare string sınıfı içerisinde bulunan bir metod.*/

//Bu array'deki tek sayıların küpünü bulmak ve toplamak istiyorum.

numbers4 = [42,8,16,15,23,4]
//Klasik yöntem. -> Adım adım herşeyi yap.
let sum = 0;
for (let number of numbers4) {
    if (number % 2 === 1) {
        sum += number * number * number
    }
}
console.log(sum)

//Fonksiyonel programlama ile -> Ne istediğini söylemeye çalış.
sum = numbers4.filter((u,v)=> u%2==1)
                .map(v=> v*v*v)
                .reduce((s,n)=> s+n)
    /*maplemek bir yerde dönüştürmek aslında. Burada bir sayıyı kübüne dönüştürüyorsun.
    * Ama farz edelim ki java ile backend yazıyorsun map ile bir entity objesini dto
    * objesine de dönüştürebilirsin.*/

    /*reduce ile daha önceki değerler ile şuanki değeri topla tek bir sayıya dönüştür diyorum.
    * Zaten reduce işlemi aslında tek bir değere dönüştürme işlemi. map'ten bana dönen şey
    * tek sayıların küpünün listesi reduce ile ben bu tek sayıların küplerini topluyorum.*/

console.log(sum)

/*Daha iyi bir isimlendirme ile ne istediğimi daha açık bir şekilde söyleyebilirim.*/

let ifOdd = u => u%2 ==1
let toCube = v => v*v*v
let accumulate = (s,n) => s+n
function cube(v) {return v*v*v}//ille de lambda expression verecez diye birşey yok bunu da verebilirsin.

sum = numbers4.filter(ifOdd)//Higher Order Function
    .map(toCube)//Higher Order Function
    .reduce(accumulate)//Higher Order Function

console.log(sum)

/*Fonksiyonel programlama ile soyutlama gücü daha fazla. Tabi burada başka bir yapı var. filter-map-reduce
* bir paralel programlama çatısı.*/

