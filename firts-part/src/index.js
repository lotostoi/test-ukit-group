/*Создать IIFE функцию с помощью классического js, имеющую несколько свойств и методов,
записанную в переменную и иметь возможность достать некоторые свойства, но не иметь 
возможности менять значения. (Без использования Object.freeze и Object.defineProperty)*/

const lifeFunction = (function () {

    const name = Symbol()
    const age = Symbol()

    return {
        [age]: 38,
        [name]: 'Alexander',
        lp: 'JavaScript',
        get age() {
            return this[age]
        },
        set age(val) {
            this[age] = val
        },
        get name() {
            return this[name]
        },
        set name(val) {
            console.error("We can't change this property!")
        },
        alert() {
            console.log(`Hello I am ${this.name} and I am ${this.age}. I really like ${this.lp}`)
        }
    }

})()

lifeFunction.alert()
lifeFunction.name = "Иван"
lifeFunction.age = 35
lifeFunction.lp += " and Node.js"
lifeFunction.alert()


/* Написать простой пример наследования с помощью прототипов. */

const user = {
    name: "",
    age: "",
    showUser() {
        console.log(`I am ${this.name} and I am ${this.age}`)
    }
}

function FirstUser(name, age) {
    this.name = name
    this.age = age
}

FirstUser.prototype = user;
(new FirstUser("Alexander", 38)).showUser()


/* Написать простой пример использования промисов с использованием .catch */

const newPromise = (val) => new Promise((res, rej) => {
    const min = -7
    const max = 100
    function randomMinMaX(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    setTimeout(() => {
        if (val < min || val > max) rej(`Number ${val} out of range from ${min} to ${max}`)
        randomMinMaX(min, max) > val ? res("You lose)))!") : res("You win!")
    }, 1000)
})


newPromise(5).then(console.info).catch(console.error)
newPromise(-20).then(console.info).catch(console.error)
newPromise(10000).then(console.info).catch(console.error)

/* Написать валидатор, который бы давал возможность ввести в инпут только числа, с двумя знаками после запятой. */
/* Функция может быть вызвана в событии ‘input’, что означает, что на каждый ввод символа
она будет вызываться или человек может использовать ctr + v на инпуте. */

/* При попытке ввести 3 знака после запятой валидатор должен его затирать из инпута, без какого либо округления.
(вставка 0.229, должна превратить число в 0.22, а не в 0.23) */

/* Должна быть возможность задать максимальный потолок числа, при
 вводе числа больше, число автоматически бы превращалось в максимально допустимое.
На вход функция должна принимать любую строку. */
/* 
Например вводится:
10.2 валидатор ничего не делает. */

/* 000.1 с помощью команды вставить, валидатор должен такое число превратить в 0.1(лучше), 
допускается изменить полe инпут на пустое(хуже) Если человек начинает печатать число с нескольких нулей: 
00, то второй ноль валидатор не должен дать ему написать, т. к. таких чисел быть не может
число “100.” является валидным и на вводе точки валидатор должен спокойно ждать ввода дробной части */

const input = document.getElementById('fieldForNumber')

let flag = false

const validator = (e) => {

    const max = 200
    const { type, keyCode, target: { value } } = e

    if (type === 'keydown' && keyCode !== 86) return false

    if (type === 'keydown') {
        flag = true
        return false
    }

    let newValue = value.split('').filter(symbol => /^[0-9\.]{1}$/.test(symbol)).join('')

    if (value.includes('.')) {
        const index = newValue.indexOf('.')
        newValue = newValue.slice(0, index + 3).trim()
    }

    if (flag) {
        const wholePart = newValue.includes('.') ? newValue.split('.')[0] : null
        if (wholePart && parseInt(wholePart) === 0) {
            newValue = newValue.replace(wholePart, '0')
        }
        flag = false
    }

    if (newValue > max) newValue = max
    e.target.value = newValue
}


input.addEventListener('input', validator)
input.addEventListener('keydown', (e) => validator(e))


