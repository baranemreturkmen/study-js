numbers = [4, 8, 15, 16, 23, 42]
console.log(numbers.length)
console.log(numbers)
console.log(numbers[0])
console.log(numbers[numbers.length-1])

numbers2 = new Array(4, 8, 15, 16, 23, 42)
console.log(numbers2.length)
console.log(numbers2)
console.log(numbers2[0])
console.log(numbers2[numbers2.length-1])

numbers3 = new Array(4)/*Bu şekilde ilk parametre length oluyor array elemanlarına erişmek
                                   istediğimde undefined yazısını görüyorum.*/
console.log(numbers3.length)
console.log(numbers3)

//Loop1
for(let i=0;i<numbers.length;i++){
    console.log(`${i}: ${numbers[i]}`)
}

//Loop2
for(let index in numbers){
    console.log(`${index}: ${numbers[index]}`)
}

//Loop3
/*Artık array'in gözlerine indekslerine erişmiyorum direk değerlerine erişiyorum.*/
for(let number of numbers){
    console.log(`${number}`)
}

console.log(numbers[100])//undefined peki ya bu indekse atama yapmak istersem array boyutu kaç olur?
numbers[100]=100
console.log(numbers.length)//boyut 101 oldu. 99 98'de ne var? undefined console empty x undefined sayısı şeklinde yazar.

/*Bu durumda ilk ve 3. dongude 94 tane undefined yazısını yazdırır. Ama 2. dongude yazdırmaz. İçerisi boşsa
* eğer 2. dongu işimize gelir. 2. dongude indeks bazlı gittiğimiz için 94 tane undefined'ın indeksi olmadığından
* 94 tane undefined değeri yazdırmıyor.*/

numbers[-100] = -100//bu sefer array boyutu ne olur? 200 olur mu?

console.log(numbers.length)//boyut değişmedi ama -100 erişebilir miyim?
console.log(numbers[-100])//ama değere eriştim nasıl oldu bu?
console.log(numbers["-100"])//nasıl oldu bu?

/*Js'de array diye bir özel veri yapısı yok aslında. numbers bir nesne aslında.*/
numbers.x = 0
numbers.y = 0
numbers.radius = 100
console.log(numbers.x)
console.log(numbers.y)
console.log(numbers.radius)

/*-100'ü burada attribute olarak görüyor aslında. object tarafını kullanıyor aslında key value
* numbers'ın attributelarına bakalım.*/

for(let prop in numbers){
    console.log(prop)/*array elemanlarına erişiyorum. sonrasında attributeları yazdırıyorum.*/
}

numbers[{}] = "what is this?"
console.log({}.toString())//toString kullanabiliyorum cunku {} bir object.
console.log(numbers['[object Object]'])

/*Js'de [] içerisinde her ne yazarsam onu string'e dönüştürüyor. Bizim attribute'umuz string olmak zorunda.
* Attribute'a string dışında birşey verdiğimiz zaman onu string'e dönüştürüyor. Array bir object aslında
* object ile ne yapabiliyorsam array ile de yapabilmeliyim.*/

/*Peki ben [100] ataması ile 94 tane undefined değer oluşturdum. 100. index'i delete etsem bile 94 tane
* undefined varlığını sürdürmeye devam edecek. Bu konuda ne yapmalıyım?*/

console.log(delete numbers[100])
console.log(numbers[100])//hatta 100'de undefined olarak değişti.
console.log(numbers[99])
console.log(numbers[500])/*Zaten hiç vermediğim bir indekse gitmeye çalıştığında undefined oluyor. Mantık bu
                            ama ilk ve 3. döngüde vs. sıkıntı bu durum. Zaten 100'ün indeksi delete etmene rağmen
                            varlığınıda sürdüyor.*/

for(let i=0;i<numbers.length;i++){
    console.log(`${i}: ${numbers[i]}`)
}

//Bu durumda delete yerine remove etmek lazım. Bunun için Js'de splice metodu var.

console.log(numbers)
console.log("-------------------------------------------------1")
numbers.splice(6,95)//Kaçıncı indisten itibaren silmek istiyorum, kaç tane silmek istiyorum.
console.log(numbers)

console.log("-------------------------------------------------2")
//Array'in sonuna eklenen sonradan eklediğim -100 x, y ,radius, {} attribute'larını da çıkartır mı?
numbers.splice(6,5)
console.log(numbers)/*Beklediğim gibi olmadı çıkarmadı. Obje özelliği gösteren yapıları çıkarmıyor. Array
                      Elemanlarına yönelik çalışıyor. Daha iyi bu şekilde hata yapma olasılığı azalır.*/

//Peki tek bir elemanı çıkarmak istersem ve elemanın indeksinden ziyade value'sunu biliyorsam?
numbers.splice(numbers.indexOf(16),1)//Bana value'su 16 olanın indeksini dön.
console.log(numbers)
console.log(numbers.indexOf(10000))//eleman yoksa -1 döner.

//Var mı yok mu tarzında bir boolean karşılaştırma yapmak istersem eğer
console.log(numbers.includes(10000))//false
console.log(numbers.includes(8))//true