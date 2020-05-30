"use strict";

(function(){
    var account = function (){
        var type = '';
        var balance = '';
        function createAccount(t, b){
            this.type = t;
            this.balance = b;
        };
        function getType(){
            return this.type;
        };
        function getBalance(){
            return this.balance;
        };
        function toString(){
            return "Account Name: "+this.type + " Balance: " + this.balance;
        }
        return {createAccount, getType, getBalance, toString};
    };


    window.onload = init;

    function init(){
        document.getElementById("submit").onclick = createA;
    }

    function createA(){
        let t = document.getElementById("type").value;
        let b = document.getElementById("balance").value;
        let a = account();
        a.createAccount(t,b);
        accountInfoList[index] = a;
        index++;
        display();
    }
    var index = 0;
    var accountInfoList = [];

    function display(){
        let output='';
        for(let i = 0; i < index; i++){
            output += accountInfoList[i].toString() + '\n';
        }
        document.getElementById("output").value = output;
    }
})();