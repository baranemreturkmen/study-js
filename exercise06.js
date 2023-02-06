class Employee {
    constructor(identity, fullName,salary,iban){
        this.identity = identity;
        this.fullName = fullName;
        this.salary = salary;
        this.iban = iban;
    }

    sayHello(){
        console.log(`Hello, ${this.fullName}!`)
    }
}

let jack = new Employee("11111111110","jack bauer",10000,"tr1")
jack.sayHello()

/*Bir kere çalıştıracak 2. parametre ile verdiğim süre sonra.*/
//setTimeout(jack.sayHello(),3000)//ms - tarayıcıda çalıştır.

/*Yukarıda ki metodu tarayıcıdan çalıştırdığın zaman undefined gelecek. Çünkü jack bauer ismi buradaki
* Employee class'ına ait fullname attribute'una atanıyor. Tarayıcıda ise setTimeout metodunu
* çalıştırdığım zaman 18. satırdaki Hello undefined tarzı bir hata ile karşılacağım. Çünkü
* tarayıcıda setTimeout metodu window nesnesine bağlı ve window nesnesinin fullname attribute'u
* yok. Bu durumda ne yapmak gerek? Bir fonksiyon farklı contextlerden tetiklenebilir. Ide, tarayıcı
* vs. Hangi context'den tetiklenirse tetiklensin fonksiyonun tanımlı
* olduğu nesnenin attribute'una erişmesini istiyorum.(Bizim tarayıcıda çalıştı hocada çalışmadı???)*/

/*Aslında yukarıdaki durum class tanımının js'de arıza çıkarmasından kaynaklı. Yani biraz sonra
* bu sorunu aşmak için yapılacak haraketi diğer dillerde yapmaya gerek yok. Diğer dillerde karşılaşılan
* bir problem değil bu.*/

class Employee2 {
    constructor(identity, fullName,salary,iban){
        this.identity = identity;
        this.fullName = fullName;
        this.salary = salary;
        this.iban = iban;
        //self = this;
    }

    sayHello2(){
        console.log(`Hello, ${self.fullName}!`)
    }
}

let jack2 = new Employee2("22221111110","jack2 bauer2",20000,"tr2")
jack2.sayHello2()

//setTimeout(jack2.sayHello(),3000)

/*Bu şekilde problem çözüldü ama nasıl çözüldü? self sıradan bir değişken değil. Sınıfın bir attribute'u
* değil. Bu context içerisinde gizli bir üye olarak düşünebiliriz. Bu tanımı constructor içinde yaptık
* çünkü constructor nesne yaratılırken çalışır sadece new ile çağırıldığında çalışır.(reflection hariç)
* constructorda ki this'de her zaman yaratılmakta olan nesnenin kendisi var ve ben onu self'e atıyorum.
* Ve sonra fonksiyon içersinde this yerine self kullanıyorum. Ama this ile çözmek daha iyi bu problemi.*/

class Employee3 {
    constructor(identity, fullName,salary,iban){
        this.identity = identity;
        this.fullName = fullName;
        this.salary = salary;
        this.iban = iban;
        this.sayHello3 = this.sayHello3.bind(this);
    }

    sayHello3(){
        console.log(`Hello, ${self.fullName}!`)
    }
}

/*sayHello3 metodunu this'e bind ediyorum. Şimdi sayHello3 metodunu hangi context'ten çağırırsanız
* çağırın şimdi bind ettiğimiz this üzeriden üyelere erişecek.*/

let jack3 = new Employee3("33331111110","jack3 bauer3",30000,"tr3")
jack3.sayHello3()

/*Ortaya şöyle bir case çıktı ama. 1. yöntem sayHello2'de ki self'i kaldırınca tarayıcıda hem sayHello2
* ve hem de sayHello3 ile yapılan denemelerde jack2 bauer2 ve jack3 bauer3 isimleri yerine undefined
* yazdığını gördük. Ama self tekrar Employee2 için yerine koyduğumda sayHello2 ve sayHello3 metodları
* tarayıcıda çağırıldığında her 2 metod için jack2 bauer2 yazdığını gördük. Employee2 ve Employee3'ü
* birbirine bağlayan şey ne burada?(tüm denemeleri setTimeout ile tarayıcıda yapıyoruz.)*/

/*Şöyle de bir durum var sınıfın fonksiyonunu lambda expression olarak tanımlarsam eğer otomatik olarak 63. satırda ki
* bind çalışıyor. Otomatik olarak lambda expression this'e bind oluyor.*/

class Employee4 {
    constructor(identity, fullName,salary,iban){
        this.identity = identity;
        this.fullName = fullName;
        this.salary = salary;
        this.iban = iban;
        //this.sayHello3 = this.sayHello3.bind(this);
    }

    sayHello3 = () => {
        console.log(`Hello, ${self.fullName}!`)
    }
}