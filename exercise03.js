class Circle{
    constructor(x,y,radius){
        this.x=x;
        this.y=y;
        this.radius=radius;
    }

    area(){
        return Math.PI * this.radius *this.radius
    }
    circumference(){
        return 2*Math.PI*this.radius
    }
}

let c1 = new Circle(0,0,1)
let c2 = new Circle(100,100,100)
console.log(c1.area())
console.log(c2.circumference())

/*Js dinamik bir dil. Bir class üzerinden nesne oluşturduktan sonra bile o class'a yeni
* özellikler kazandırabilirim. Bu loosely type dillerde gördüğümüz özelliklerden biri.
* Bir nesne yarattım o nesneyi run time'da değiştirebilirim. Yeni attribute ekleyebilirim
* var olan attribute'u silebilirim vs. Tabi silme işlemi tehlikeli. Başka yerlerde kullanıyorsam
* sıkıntı. Nesneyi başka yerlerde kullanıyorum ama artık nesne bambaşka bir nesneye dönüşebilir.
* Tehlikeli bir durum. Js içerisinde Java'da ki gibi encapsulation özelliği yok. public, private,
* protected vs. access modifierlarım yok. Nesnenin özelliklerini saklamak istiyorsam eğer js'de
* bambaşka şeyler denemem lazım.*/

c1.color = "Red";

/*Peki c1, c2 değil de tüm Circledan türeyen nesnelerin colorlarına renk vermek istersem deault?
  Js'de nesneye dayalı kalıtım mekanizması prototype üzerinden işliyor. Bu durum prototype'ı kulladıktan
  sonra da Circle class'ından üreyen nesneler için geçerli.*/

//Circle -> class -> Hem c1 hem c2 tüm Circle'dan ürettiğim nesnelere erişmiş olurum.
Circle.prototype.color = "Red";

console.log(c2.hasOwnProperty('color'))/*false c1'in kendine has bir özelliği yok bu
                                            prototype üzerinden geliyor Prototype circle sınıfından
                                            tüm nesnelerin paylaşıldığı bir alan olarak düşünülebilir.
                                            Tüm nesnelerin ortak olarak geliştiği yer.*/
//c2'in prototype üzerinden değil de kendine has bir özelliği olsun istiyorsam
c2.color = "blue"

/*Prototype'ı illa bir attribute özelinde kullanacan diye birşey yok. Metodlar için de kullanılabilir.*/

Circle.prototype.move = function(dx,dy){
    this.x += dx;
    this.y += dy;
}

console.log(-1,+1)

Circle.prototype.isShorter = function(other){
    return this.radius <= other.radius;
}

/*Farkındaysan eğer ilk class oluşturduğum zaman olmayan metodları ve alanları kullandım. Yani şöyle
* birşey yok ben sadece Circle class'ı içerisine yazdığım attribute'lara metodlara prototype uygulayıp
* default değer atarım diye birşey yok. Aynı zamanda default değer atarken Circle class'ında olmayan
* attribute üretip default değer atıyorsun. Yada olmayan metod üretip metodun içini dolduruyorsun.*/

console.log(c1.isShorter(c2))

/*Class'da var olan bir attribute üzerinden prototype kullanımı yaparsam ne olur?
* Class'ın içerisinde constructor'da atama yapıyorum. Dolayısıyla prototype üzerinden çağırdığını
* ezmiş olurum ama şöyle de bir etkisi olacak?*/

Circle.prototype.radius = 42

/*Prototype şu işe yarar her çemberin mutlaka bir yarıçapı vardır. Sen delete etmiş olsan bile.*/

console.log(c1.radius)//42'yi getirmez asıl attribute üzerinden yaptığım atama işlemini getirir.

delete c1.radius

console.log(c1.radius)//artık bize prototype'da ki instance üzerinden c1'in radius'u getirecek

/*prototype'dan aldığım radius'u da silerim bu arada ama tüm nesnelerden silmiş olmam. Çünkü zaten
* class'ın kendisi consturda prototype'ı eziyor.*/

delete Circle.prototype.radius

console.log(c2.radius)//değeri artık neyse gelir.

/*Peki js dinamik bir dil. Kalıtım işini es geçip direk prototype kullanmadan olmayan bir metod tanımlarsam
* ne olur?*/

Circle.isShorter2 = function(left,right){
    return left.radius <= right.radius
}

console.log(Circle.isShorter2(c1,c2))
/*Aslında yukarıdaki kullanım java'da ki statik metod kullanımına benziyor. İstek bir nesneye değil sınıfa
* gidiyor. isShorter2 global bir fonksiyonmuş gibi davranıyor. prototype eklediğimizde instance üzerinden
* ulaşıyoruz.*/

/*Niye dümdüz çağırmadım Circle.metod dedim? Ne fark var arada? Aşağıdaki kullanımda da global fonksiyon
* oluyor zaten.*/

isShorter3 = function(left,right){
    return left.radius <= right.radius
}

/*Aradaki fark şu artık context'imde isShorter3 diye bir fonksiyonum var başka birisi daha yazarsa
* çakışacak. Çakışınca birşey olmuyor en son yüklenen diğerini ezecek kullanımda hataya neden olacak.*/

/*Hatayı let kullanarak run time'da görebilirim. Tarayıcıda. Aynı let mevzusu Swiftede de vardı.
* (Derleme zamanındaydı galiba emin değilim???)*/

let isShorter4 = function(left,right){
    return left.radius <= right.radius
}

/*Fonksiyonu şu şekilde tanımlarsam hata vermez ama ezme olur.*/

function isShorter5(left,right){
    return left.radius <= right.radius
}

function isShorter5(left,right){
    return left.radius < right.radius
}

/*Js web socket bağlantısı kuruyor. Network -> WS -> Tarayıcı ile ide arasında bir web socket bağlantısı
* var kodda değişiklik yaptığımız zaman otomatik olarak tarayıcıda sayfaya yüklüyor.*/
