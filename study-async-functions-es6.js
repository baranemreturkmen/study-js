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

//es6 sonrası nasıl sync fonksiyonu nasıl aync yaparım?

async function async_get_min(numbers){
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

//Artık async bir fonksiyon oldu async keyword'ü ile. Ama bu syntactic sugar arka tarafta js engine'da es6 öncesi promise
//ile olan yapı çalışıyor. Daha hızlı veya yavaş çalışma gibi bir durum yok. Bunu sadece sıradan fonksiyonlar için değil
//aynı zamanda lambda expression ile de yapabilirim.

let async_fun = async (numbers) => {
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

for(let i=0;i<10;++i){
    let[...another_array] = [...myNumbers];
    another_array.push(i);
    async_get_min(another_array).then(
        minValue => console.log(minValue), reason => console.log(reason)
    );
}

console.log("Hello Mars!")

/*Ama burada metodlar senkron çalışacak async keyword'u koymama rağmen çünkü önceki örnekte olduğu gibi setTime ile geciktirme
  yapamıyoruz. Bundan dolayı da uygulanan işlem çok kolay ve array'de çok kısa olduğu async keyword'üne rağmen metodlar
  senkronmuş gibi davranıyor. Ama async'in çalıştığını şuradan anlayabilirim döngü bitmeden metodun hello mars'ı konsola
  yazdırabiliyorum.*/

//fonksiyoncagrisi.then gördüğün anda fonksiyonun asenkron olduğunu anla!

/*Reactive programming'i asenkron programlamlamanın bir adım ötesi olarak düşünebilirsin. Yada async programmin++
  Ama js kendisi bize reactive programlamayı sağlamıyor. Bunu kütüphane aracılığıyla gerçekleştirmek gerekiyor.
  Bizde reactive extensions kullanarak rs jx kullanarak yapıcaz.*/