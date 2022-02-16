let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));  //Replace with the rpc server provided by your Ganache

window.onload = () =>{
    let from_input = document.querySelector("#from");
    let to_input = document.querySelector("#to");
    let amount_input = document.querySelector("#amount");
    let submit = document.querySelector("#btn");

    
    submit.addEventListener("click",()=>{
        
        if(from_input.value && to_input.value && amount_input.value){
            let sender = from_input.value;
            let receiver = to_input.value;
            let Amount = amount_input.value;

            //Sending Ether
            web3.eth.sendTransaction({from:sender,to:receiver,value:web3.utils.toWei(Amount,"ether")});

            //Resetting the form
            from_input.value = "";
            to_input.value = "";
            amount_input.value = "";

            //Updating the Address Balance list
            let maindiv = document.querySelector(".table");
            maindiv.innerHTML="";
            createAll();
        }
        else{
            alert("Please completely fill");
        }

    });

    //Table of address
    function createtb(address,balance){
        let div1 = document.createElement("div");
        div1.setAttribute("class","box");
        div1.setAttribute("id","mainSection");

        let header = document.createElement("h2")
        let header2 = document.createElement("h2")

        div1.appendChild(header);
        div1.appendChild(header2);

        header.innerText= address;
        header2.innerText = balance;

        //Table div
        let Table_box = document.querySelector(".table");
        Table_box.appendChild(div1);
    }

    function createAll(){

        web3.eth.getAccounts().then(response =>{
            
            for(let i =0; i < response.length;i++){
                let address = response[i];

                web3.eth.getBalance(address).then(amount =>{
                    createtb(address,web3.utils.fromWei(amount,"ether"));
                });

            }

        });
    }

    createAll();    
}


