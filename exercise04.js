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

/*Js'in bu kadar esnek olmasının faydalarından biri de kolay bir şekilde reflection yapabiliyor
  olmamız.*/

//Nesne üzerinden döngü oluşturabiliyorum.

c1 = new Circle(0,0,100)

/*Bana attributelarının bir listesini veriyor.*/
for(let prop in c1){
    console.log(prop+": "+c1[prop])
    /*c1.prop ile attribute değerini yazdıramam undefined hatası verir c1'in prop diye bir attribute'u yok
    * çünkü. Attribute değerini bir değişkenden alıyorsam prop döngüde kullandığım değikenim
    * o zaman [] kullanıyorum.*/
}

//Şöyle de değerlerine ulaşırım.
console.log(c1["x"])
console.log(c1["y"])
console.log(c1["radius"])

/*Nesnenin bir tür key value çalışan dictionary map gibi davrandığını söyleyebilirim. Js'de map
* var ayrı bir kütüphane olarak çalışıyor ama nesnenin kendisinin de bu şekilde çalıştığını
* söyleyebiliriz. Dictionary - C# // Map - Java*/

//Şu da mümkün

attr = "radius"
console.log(c1[attr])

/*Es6 ile gelen başka bir özellik syntax. Eğer bir dizi değişkenin değerini string içersinde art arda
* ekleyerek oluşturmak istiyorsam şöyle de yapabilirim.*/

for(let prop in c1){
    console.log(`${prop}: ${c1[prop]}`)//` -> backslash single quote -> geriye doğru yatık tek tırnak operatörü
    //+'ya ihtiyaç duymadan string değere sahip değişkenleri concetanation yaptık.
    //Dinamik string oluştururken bu daha iyi daha okunur.
}

//Javada $ kullanımı için jsf jsp gibi template teknolojisi kullanmak gerekiyor.

