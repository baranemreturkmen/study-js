//Before ES6:(ECMA Script)

/*Bir class tanımlamak istediğimde bir fonksiyon tanıtarak başlıyorum. Bu fonksiyon constructor
* işlevi görüyor.*/

let Employee = function(identity, fullName,salary,iban,birthYear,departments){
    this.identity = identity;
    this.fullName = fullName;
    this.salary = salary;
    this.iban = iban//yine alan tanımlarken de ;'e gerek yok.
    this.birthYear = birthYear;
    this.departments = departments;

    this.increaseSalary = function(rate){
        this.salary = this.salary * (1.0 + rate/100)//; zorunlu değil.
    }

    this.addDepartment = function(department){
        this.departments.push(department)//push ile listeye veri ekliyorum.
    }
}

let jack = new Employee("11111111110","jack bauer",10000,"tr1",1956,["IT","HR"])
jack.increaseSalary(20)
console.log(jack)