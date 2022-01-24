Array.prototype.myEvery = function(callback){
    console.log(this)
    for(let i = 0 ; i < this.length ; i++){
        let val = this[i];
        let rv = callback(val , i , this);
        if(rv == false){
            return false;
        }
    }
    return true;
}

let arr = [
    {
        gender: 'M',
        age: 24
    },
    {
        gender: 'F',
        age: 34
    },
    {
        gender: 'F',
        age: 28
    },
    {
        gender: 'M',
        age: 74
    },
    {
        gender: 'F',
        age: 21
    },
    {
        gender: 'M',
        age: 47
    },
    {
        gender: 'F',
        age: 26
    },
    {
        gender: 'M',
        age: 47
    },
    {
        gender: 'F',
        age: 27
    },
    {
        gender: 'F',
        age: 29
    },
    {
        gender: 'M',
        age: 20
    }
];
let res = arr.filter(v => v.gender == "F").myEvery(function(v , i , oarr){
    if(v.age >= 20 && v.age <= 30){
        return true;
    }
    return false;
})
console.log(res);