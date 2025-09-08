const totalProduct = document.getElementById('total-product');
let uniqueId = 1;
const addToCart = (name, price) => {
    alert(`${name} has been added to the cart.`);
    const cartContainers = document.querySelectorAll('.cart-container');
    cartContainers.forEach(cartContainer => {
        cartContainer.innerHTML += `
    <div class="cartItemId-${uniqueId} bg-[#F0FDF4] flex justify-between items-center py-1 md:py-2 md:px-3 rounded-lg">
        <div class="space-y-1">
            <h4 class="font-semibold">${name}</h4>
            <p class="text-[#1F293750] text-xs md:text-base lg:text-lg">৳ <span>${price}</span></p>
        </div>
        <div onclick="dele('cartItemId-${uniqueId}', ${price})" class="text-[#8C8C8C]">
            <i class="fa-solid fa-xmark hover:text-red-500"></i>
        </div>
    </div>
    `;
    });
    // cartContainer[0].innerHTML += `
    // <div class="cartItemId-${uniqueId} bg-[#F0FDF4] flex justify-between items-center py-2 px-3 rounded-lg">
    //     <div class="space-y-1">
    //         <h4 class="font-semibold">${name}</h4>
    //         <p class="text-[#1F293750] text-base md:text-lg">৳ <span>${price}</span></p>
    //     </div>
    //     <div onclick="dele('cartItemId-${uniqueId}', ${price})" class="text-[#8C8C8C]">
    //         <i class="fa-solid fa-xmark hover:text-red-500"></i>
    //     </div>
    // </div>
    // `;
    // cartContainer[1].innerHTML += `
    // <div class="cartItemId-${uniqueId} bg-[#F0FDF4] flex justify-between items-center py-2 px-3 rounded-lg">
    //     <div class="space-y-1">
    //         <h4 class="font-semibold">${name}</h4>
    //         <p class="text-[#1F293750] text-base md:text-lg">৳ <span>${price}</span></p>
    //     </div>
    //     <div onclick="dele('cartItemId-${uniqueId}', ${price})" class="text-[#8C8C8C]">
    //         <i class="fa-solid fa-xmark hover:text-red-500"></i>
    //     </div>
    // </div>
    // `;
    const totalPrice = document.querySelectorAll('.total-price');
    let total = Number(totalPrice[0].innerText) + Number(price);
    totalPrice[0].innerText = total;
    total = Number(totalPrice[1].innerText) + Number(price);
    totalPrice[1].innerText = total;
    uniqueId++;
    totalProduct.innerText = Number(totalProduct.innerText) + 1;
}
const dele = (itemId, itemPrice) => {
    const idNodeList = document.querySelectorAll(`.${itemId}`);

    const totalPriceNodeList = document.querySelectorAll('.total-price');
    totalPriceNodeList.forEach(p => {
        // console.log(p.innerText);
        let total = Number(p.innerText) - itemPrice;
        p.innerText = total;
    });
    idNodeList.forEach((item) => {
        item.remove();
    });
    totalProduct.innerText = Number(totalProduct.innerText) - 1;
}



const loading = (status) => {
    if (status) {
        document.getElementById('categories-plants-container').classList.add('hidden');
        document.getElementById('loading-id').classList.remove('hidden');
    }
    else {
        document.getElementById('loading-id').classList.add('hidden');
        document.getElementById('categories-plants-container').classList.remove('hidden');
    }
}



const removeActive = () => {
    const categorieNodeList = document.querySelectorAll('.categorie');
    categorieNodeList.forEach(node => {
        node.classList.remove('active');
    });
}



const displayTreesDetail = (plant) => {
    const treesDetailsContainer = document.getElementById('trees-details-container');
    treesDetailsContainer.innerHTML = `
        <h3 class="font-semibold">${plant.name}</h3>
        <img class="object-cover h-[300px] w-full rounded-lg" src="${plant.image}" alt="">
        <p class="text-[#1F293780]"><span class="text-[#1F2937] font-semibold">Category:</span>
        ${plant.category}</p>
        <p class="text-[#1F293780]"><span class="text-[#1F2937] font-semibold">Price:</span> ৳ <span>${plant.price}</span></p>
        <p class="text-[#1F293780]"><span class="text-[#1F2937] font-semibold">Description:</span>
        ${plant.description}</p>
        `;
    document.getElementById('tree_modal').showModal();
}
const loadTreesDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayTreesDetail(jsonData.plants));
}


const loadAllTreesCategoryPlants = () => {
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayCategoryPlants(jsonData.plants));
}
document.getElementById('all-trees').addEventListener('click', (e) => {
    loading(true);
    removeActive();
    e.target.classList.add('active');
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayCategoryPlants(jsonData.plants));
});


const loadCategoryPlants = (id) => {
    loading(true);
    removeActive();
    document.getElementById(`categorie-${id}`).classList.add('active');
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayCategoryPlants(jsonData.plants));
}
const displayCategoryPlants = (plants) => {
    const categoriesPlantsContainer = document.getElementById('categories-plants-container');
    categoriesPlantsContainer.innerHTML = '';
    plants.forEach(plant => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="p-4 space-y-2 bg-white rounded-lg h-full flex flex-col justify-between shadow-card">
            <img class="object-cover h-[186.8px] w-full rounded-lg" src="${plant.image}" alt="">
            <div class="space-y-2">
                <h5 onclick="loadTreesDetail(${plant.id})" class="font-semibold">${plant.name}</h5>
                <p class="text-[#1F293780] text-[10px] md:text-xs lg:text-sm">${plant.description.split(' ').slice(0, 18).join(' ')}...</p>
                <div class="flex justify-between items-center">
                    <p class="bg-[#DCFCE7] text-[#15803D] py-1 px-3 rounded-[400px]">${plant.category}</p>
                    <p class="text-[#1F2937] font-semibold">৳ <span>${plant.price}</span></p>
                </div>
            </div>
            <button onclick="addToCart('${plant.name} ', ${plant.price})" class="btn bg-[#15803D] hover:bg-[#166534] py-3 text-white font-medium w-full rounded-[999px]">Add to Cart</button>
        </div>
        `;
        categoriesPlantsContainer.append(div);
    });
    loading(false);
}



const loadCategory = () => {
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayCategoryName(jsonData.categories));
}
const displayCategoryName = (categories) => {
    categories.forEach(categorie => {
        const div = document.createElement('div');
        div.innerHTML = `
        <p id="categorie-${categorie.id}" onclick="loadCategoryPlants(${categorie.id})" class="categorie font-medium px-[10px] py-2 rounded hover:bg-[#15803D] hover:text-white">${categorie.category_name}</p>
        `;
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.append(div);
    });

}
loadCategory();
loadAllTreesCategoryPlants();