const displayProducts = document.getElementById("displayProducts");
const showInvoice = document.getElementById("showInvoice");
const cartContents = document.getElementById("cartContents");
const cartQuantity = document.getElementById("cartQuantity");

let cart = [];

products.forEach((product)=>{
    let mainProduct = document.createElement("div");
    mainProduct.className = "card";
    mainProduct.innerHTML = `
        <img src="${product.img}">
        <h3 class="titleCard">${product.nombre}</h3>
        <p class="price">$ ${product.precio}</p>
    `;

    displayProducts.append(mainProduct);

    let buy = document.createElement("button");
    buy.className = "buy";
    buy.innerText = "Comprar";

    mainProduct.append(buy);

    buy.addEventListener("click", () =>{
        const repeat = cart.some((repeatProduct)=> repeatProduct.id === product.id);
        
        if(repeat === true){
            cart.map((prod) => {
                if(prod.id === product.id){
                    prod.cantidad++;
                }
            });
        }else{
            cart.push({
                id : product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        console.log(cart);
        console.log(cart.length);
        quantityAnalysis();
        }
        showCart();
    });
});

//Mostrar carrito y hacer los calculos

function showCart(){
    cartContents.innerHTML="";
    cartContents.style.display = "flex";
    const moduleHeader = document.createElement("div");
    moduleHeader.className="moduleHeader";
    moduleHeader.innerHTML=`
        <h1 class="moduleHeaderTitle">Factura. </h1>
    `;
    cartContents.append(moduleHeader);

    const moduleButton = document.createElement("h1");
    moduleButton.innerText = "X";
    moduleButton.className = "moduleHeaderButton";

    moduleButton.addEventListener("click", () => {
        cartContents.style.display = "none";
    });

    moduleHeader.append(moduleButton);

    cart.forEach((product) =>{
        let cartContent = document.createElement("div");
        cartContent.className = "modal-content";
        cartContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$ ${product.precio}</p>
            <span class="subtract"> - </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sum"> + </span>
            <p>Total: ${product.cantidad*product.precio}</p>
            <span class="deleteProd"> ❌ </span>
        `;

        cartContents.append(cartContent);

/*Procedimiento para aumentar y disminuir productos*/
        let subtract = cartContent.querySelector(".subtract");
        let sum = cartContent.querySelector(".sum");

        subtract.addEventListener("click",() => {
            if(product.cantidad !== 1){
                product.cantidad--;
            }          
            showCart();
        });

        sum.addEventListener("click",() => {
            product.cantidad++;
            showCart();
        });

/*Eliminar producto*/
        let deletePro = cartContent.querySelector(".deleteProd");

        deletePro.addEventListener("click", () => {
            deleteProduct(product.id);
        });        
    });

    const total = cart.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: $ ${total}`;

    cartContents.append(totalBuying);
};

showInvoice.addEventListener("click", showCart);

/*Funcion para eliminar producto*/
const deleteProduct = (id) => {
    const foundId = cart.find((element) => element.id === id);

    console.log(foundId);

    cart = cart.filter((carritoId) => {
        return carritoId !== foundId;
    });

    quantityAnalysis();
    showCart()
};

const quantityAnalysis = () =>{
    cartQuantity.style.display = "block";
    cartQuantity.innerText = cart.length;
};
quantityAnalysis();
