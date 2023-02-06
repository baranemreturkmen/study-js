/*After ES6:(ECMA Script) -> Hız veya performans açısından bir değişiklik yok.
* Syntactic Sugar yani okunuş açısından kolaylıklar gelmiş.*/

/*Bir class tanımlamak istediğimde bir fonksiyon tanıtarak başlıyorum. Bu fonksiyon constructor
* işlevi görüyor.*/

class Employee {
    constructor(identity, fullName,salary,iban,birthYear,departments){
        this.identity = identity;
        this.fullName = fullName;
        this.salary = salary;
        this.iban = iban//yine alan tanımlarken de ;'e gerek yok.
        this.birthYear = birthYear;
        this.departments = departments;
    }

    increaseSalary(rate){
        this.salary = this.salary * (1.0 + rate/100)//; zorunlu değil.
    }

    addDepartment(department){
        this.departments.push(department)//push ile listeye veri ekliyorum.
    }
}

/*Onca değişikliğe rağmen aşağıdaki yapıyı değiştirmeye gerek yok. Çünkü js engine açısından değişen birşey yok.
* Arka planda js enginde es6 öncesi yapı çalışıyor. Es6 sonrası sadece syntactic sugar değişiklik. */
let jack = new Employee("11111111110","jack bauer",10000,"tr1",1956,["IT","HR"])
jack.increaseSalary(20)
console.log(jack)

/*Js için object oriented bir dil demiyoruz. Object based bir dil diyoruz. Diğer object oriented dillerden farklı olarak
* herhangi bir sınıf yaratma ihtiyacı duymaksızın doğrudan bir nesne yaratabiliriz. Bundan dolayı object based diyoruz.*/

let james = {
    identity:"12345678901",
    fullName:"james sawyer",
    salary:1500,
    iban:"tr3",
    birthYear:1982,
    departments:["FINANCE"],
    increaseSalary: function(rate){
        this.salary = this.salary * (1.0 + rate /100)
    },

    addDepartment: function(department){
        this.departments.push(department)
    }
    /*Ortada sınıf olmadan bir nesne yarattım. Üstelik sadece data bazlı değil. Fonksiyonda tanımlayabiliyorum.
    * Ben bazı durumlarda bazı nesnelerin tek bir örneğini kopyasını isteyebilirim. Burada singleton bir duruma
    * ihtiyacım olduğu zaman js'in bu özelliğinden faydalanabilirim. Js hem op(? op ne?) hem de ob bir programlama dili.*/
}

console.log(james.fullName)

/*Tabi tanımladığım sınıftan nesne yaratmak daha mantıklı. Bir şablon var elimde o sınıftan istediğim
* kadar nesne üretirim.*/