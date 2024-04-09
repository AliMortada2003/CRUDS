let title = document.getElementById("title");
let price = document.getElementById("price");
let Taxos = document.getElementById("Taxos");
let ADS = document.getElementById("ADS");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let search = document.getElementById("search");
let searchByTitle = document.getElementById("searchByTitle");
let searchByCategory = document.getElementById("searchByCategory");
let update = document.getElementById("update");
let tbody = document.getElementById("tbody");
let del = document.getElementById("delete");
let DeletAllProducts = document.getElementById("DeletAllProducts");
let temp ; 
let mood = "create";
// console.log(title,price,Taxos,ADS,discount,total,count,category,create,search,searchByCategory,searchByTitle);
// get Total
function  getTotal(){
    if(price.value!=""&&price.value>0){
        let result = (+price.value+ +Taxos.value+ +ADS.value)
        - +discount.value ; 
        total.innerHTML=result+`$`;
        total.style.background="green";
    }
    else{
        total.innerHTML="";
        total.style.backgroundColor="gray";
    }
    
}

// Create Product
let dataProduct ;
if(localStorage.product!=null){
    dataProduct=JSON.parse(localStorage.product);
}else{
    dataProduct = []; 
}
create.onclick=function(){
    let newProduct = {
        title:title.value,
        price:price.value,
        Taxos:Taxos.value,
        ADS:ADS.value,
        discount:discount.value,
        count:count.value,
        category:category.value,
        total:total.innerHTML
    }
    if(mood==="create"){
        if(newProduct.count>=1){
            for(let i = 0 ; i<newProduct.count ; i++){
                dataProduct.push(newProduct);
            }
        }else{
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[temp]=newProduct;
        mood="create";
        count.classList.remove("hide");
        create.innerHTML="create";
    }
    //save Data in local storage 
    localStorage.setItem("product", JSON.stringify(dataProduct));
    showData();
    clearData();
    
}

// clear inputs 
function clearData(){
    price.value = "";
    title.value = "";
    Taxos.value = "";
    ADS.value = "";
    discount.value = "";
    total.innerHTML="";
    category.value = "";
    count.value = "";
}
// show Data In OutPut 
function showData(){
    let table = "";
    for(let i = 0 ; i<dataProduct.length;i++){
        dataProduct[i];
        table+=
    `
    <tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}$</td>
        <td>${dataProduct[i].Taxos}$</td>
        <td>${dataProduct[i].ADS}$</td>
        <td>${dataProduct[i].discount}$</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="upDateData(${i})" id="update">Update</button></td>
        <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
    </tr>
    `
    }
    tbody.innerHTML=table;
        if(dataProduct.length>0){
            DeletAllProducts.innerHTML=
            `
                <button onclick="DelAll()">Delete All</button>
            `
        }else{
            DeletAllProducts.innerHTML="";
        }
}
// showData All all time 
showData();

// Delete one Product 
function DeleteProduct(i)
{
    // delete one object from product array 
    dataProduct.splice(i,1);
    //و خلي التخزين الجديد بساوي باقي  الاراي 
    localStorage.product=JSON.stringify(dataProduct);
    // اللي بيحصل كالتالي لما بدوس ديليت بيحزف ويعمل تجديد لطباعة البيانات ف الصفحة 
    showData();
}

//Delete ALL Products 
function DelAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}
// Update
function upDateData(i){
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    Taxos.value=dataProduct[i].Taxos ; 
    ADS.value=dataProduct[i].ADS;
    discount.value=dataProduct[i].discount;
    total.innerHTML=dataProduct[i].total;
    category.value=dataProduct[i].category;
    count.classList.add("hide");
    create.innerHTML="update";
    mood="update";
    temp = i ;
}
let searchood = "searchByTitle";
function setsearchmood(id){
    if(id=="searchByTitle")
    {
        searchood = "searchByTitle";
        search.placeholder = "Search By Title";
    }
    else
    {
        searchood = "searchByCategory";
        search.placeholder = "Search By Category";
    }
    search.focus();
    search.value="";
    showData();
}
function searchData(value){
    table = "";
    if(searchood=="searchByTitle")
    {
        for(let i = 0 ; i < dataProduct.length ; i++){
            if(dataProduct[i].title.includes(value)){
                    table+=
                `
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}$</td>
                    <td>${dataProduct[i].Taxos}$</td>
                    <td>${dataProduct[i].ADS}$</td>
                    <td>${dataProduct[i].discount}$</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="upDateData(${i})" id="update">Update</button></td>
                    <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
                `
                }
                
            }
    }
    else
        {
            for(let i = 0 ; i < dataProduct.length ; i++){
                if(dataProduct[i].category.includes(value)){
                        table+=
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}$</td>
                        <td>${dataProduct[i].Taxos}$</td>
                        <td>${dataProduct[i].ADS}$</td>
                        <td>${dataProduct[i].discount}$</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="upDateData(${i})" id="update">Update</button></td>
                        <td><button onclick="DeleteProduct(${i})" id="delete">Delete</button></td>
                    </tr>
                    `
                    }
                }
        }
        tbody.innerHTML=table;
    }