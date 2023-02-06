/*Js'de bir fonksiyonu tanımlamanın birkaç yolu var***.*/
function fun(x,y,z){
    return x*y+z//1. yol.***
}

/*Js'de compile olmadığı için */

console.log(fun())//NaN
console.log(fun(1))//NaN
console.log(fun(1,2))//NaN
console.log(fun(1,2,3))//5
console.log(fun(1,2,3,4,5,6))//5

/*Başlangıç değeri verelim.*/

function fun2(x,y,z){
    x = x||0;
    y = y||0;
    z = z||0;
    return x*y+z
}

console.log(fun2())//0
console.log(fun2(1))//0
console.log(fun2(1,2))//2
console.log(fun2(1,2,3))//5
console.log(fun2(1,2,3,4,5,6))//5

//es6 ile başlangıç değeri yazımı değişti.

function fun3(x=0,y=0,z=0){
    return x*y+z
}

/*Ama ben sadece metodum 3 tane parametre alsın istiyorsam ne eksik ne de fazla bunu garanti edemiyorum
* Derleme olmadığı için bunu derleme zamanında garanti altına almak mümkün değil.*/

//Lint gibi araçlar kullanarak bana warning vermesini sağlayabilirim. -> JsLint

/*RunTime'da nasıl garanti ederim? Bir fonksiyon yazdığımda o fonksiyonun içinde arguments diye
* built in bir değişken oluşuyor. Bu bir array. Bu array içinde fonksiyon parametreleri var.*/

function gun(x,y,z){//2.yol.***
    if(arguments.length !== 3)
        throw "You must provide exactly 3 parameters"
    for(let arg of arguments){
        if(typeof(arg) !== "number"){//Type kontrolü de yapalım.
            throw "You must provide a number."
        }
    }
    return x*y+z
}

//Verdiğim x, y, z parametreleri benim beklediklerim. Arguments ise gerçekte gelenler!

/*Js'de dilin esnekliğinden kaynaklı neredeyse ne yazarsan yaz çalışıyor ama çoğunlukla istediğimiz
* gibi davranmıyor dikkatli kod yazmak lazım.*/

let sun = function(x,y,z){
    return x*y+z;/*3.yol*** Değişkene fonksiyon assign edebiliyorum. Fonksiyonun kendisini ediyorum.
                   fonksiyondan dönen şeyi değil!!!*/
}

//Functional Programming
//i)High-Order Function-> Bir fonksiyon parametre olarak fonksiyon alıyorsa yada fonksiyon fonksiyon return ediyorsa
//ii)Lambda expression / Arrow Function -> Parametre olarak geçilen fonksiyonları tanımlamak için bir yapımız var.
let run = (x,y,z) => {return x*y+z}//es6 ile gelen lambda expression 4.yol***
let tun = (x,y,z) => x*y+z//Böylede yazabilirim ama yukarıdakinden bir farkı var.