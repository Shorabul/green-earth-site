// const deleteAddToCartItem = (e) => {
//     console.log(e);
// }
document.getElementById('cart-container')
    .addEventListener('click', (e) => {
        // console.log(e.target.classList);
        if (e.target.className.includes('delete')) {
            const totalPrice = document.getElementById('total-price').innerText;
            let total = Number(totalPrice) - Number(e.target.parentNode.parentNode.children[0].children[1].children[0].innerText);
            document.getElementById('total-price').innerText = total;
            e.target.parentNode.parentNode.remove();
        }
    });
const removeActive = () => {
    const categorieNodeList = document.querySelectorAll('.categorie');
    categorieNodeList.forEach(node => {
        node.classList.remove('active');
    });
}

const loadTreesDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayTreesDetail(jsonData.plants));
}
const displayTreesDetail = (plant) => {
    const treesDetailsContainer = document.getElementById('trees-details-container');
    treesDetailsContainer.innerHTML = `
        <h3 class="font-semibold text-lg">${plant.name}</h3>
                <img class="object-cover h-[300px] w-full rounded-lg" src="${plant.image}" alt="">
                <p class="text-lg text-[#1F293780]"><span class="text-[#1F2937] font-semibold">Category:</span>
                    ${plant.category}</p>
                <p class="text-lg text-[#1F293780]"><span class="text-[#1F2937] font-semibold">Price:</span> ৳ <span>${plant.price}</span></p>
                <p class="text-lg text-[#1F293780]"><span class="text-[#1F2937] font-semibold">Description:</span>
                    ${plant.description}</p>
        `;
    document.getElementById('tree_modal').showModal();
}

const displayAllTreesCategoryPlants = () => {
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayCategoryPlants(jsonData.plants));
}
document.getElementById('all-trees').addEventListener('click', (e) => {
    removeActive();
    e.target.classList.add('active');
    const url = `https://openapi.programming-hero.com/api/plants`;
    fetch(url)
        .then(res => res.json())
        .then(jsonData => displayCategoryPlants(jsonData.plants));
});

const addToCart = (name, price) => {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML += `
    <div class="bg-[#F0FDF4] flex justify-between items-center py-2 px-3 rounded-lg">
        <div class="space-y-1">
            <h4 class="text-sm font-semibold">${name}</h4>
            <p class="text-[#1F293750]">৳ <span>${price}</span></p>
        </div>
        <div class="text-[#8C8C8C]">
            <i class="fa-solid fa-xmark delete"></i>
        </div>
    </div>
    `;
    const totalPrice = document.getElementById('total-price').innerText;
    let total = Number(totalPrice) + Number(price);
    document.getElementById('total-price').innerText = total;
}

const loadCategoryPlants = (id) => {
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
        <div class="p-4 space-y-2 bg-white rounded-lg h-full flex flex-col justify-between">
            <img class="object-cover h-[186.8px] w-full rounded-lg" src="${plant.image}" alt="">
            <div class="space-y-2">
                <h5 onclick="loadTreesDetail(${plant.id})" class="font-semibold text-sm">${plant.name}</h5>
                <p class="text-sm text-[#1F293780]">${plant.description.split(' ').slice(0, 18).join(' ')}...</p>
                <div class="flex justify-between items-center text-sm">
                    <p class="bg-[#DCFCE7] text-[#15803D] py-1 px-3 rounded-[400px]">${plant.category}</p>
                    <p class="text-[#1F2937] font-semibold">৳ <span>${plant.price}</span></p>
                </div>
            </div>
            <button onclick="addToCart('${plant.name}', ${plant.price})" class="btn bg-[#15803D] hover:bg-[#166534] py-3 text-white font-medium w-full rounded-[999px]">Add to Cart</button>
        </div>
        `;
        categoriesPlantsContainer.append(div);
    });
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
        <p id="categorie-${categorie.id}" onclick="loadCategoryPlants(${categorie.id})" class="categorie font-medium px-[10px] py-2 rounded hover:bg-[#15803D] hover:text-white ">${categorie.category_name}</p>
        `;
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.append(div);
    });

}



loadCategory();
displayAllTreesCategoryPlants();
