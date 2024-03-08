const addressBarContent = new URLSearchParams('location.search')
const productId = addressBarContent.get('productId')
const nameProductInput = document.getElementById('name')
const descriptionProductInput = document.getElementById('description')
const brandProductInput = document.getElementById('brand')
const imageProductInput = document.getElementById('imageUrl')
const priceProductInput = document.getElementById('price')
console.log(productId)

// per la modifica

async function getProductDetails(productId) {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMwZGU5ZTExZTAwMThlZGEwODYiLCJpYXQiOjE2OTcxOTI5NzMsImV4cCI6MTY5ODQwMjU3M30.6DB21TLcc-IfjuCwkLCNty-iYT1ynq8jUlArwDPFwsM'
            }
        });

        if (response.ok) {
            const productDetails = await response.json();

            // Populate the form with product details
            nameProductInput.value = productDetails.name;
            descriptionProductInput.value = productDetails.description;
            brandProductInput.value = productDetails.brand;
            imageProductInput.value = productDetails.imageUrl;
            priceProductInput.value = productDetails.price;
        } else {
            let errorMessage;
            switch (response.status) {
                case 400:
                    errorMessage = 'Errore 400 - Bad request';
                    break;
                case 401:
                    errorMessage = 'Errore 401 - Unauthorized';
                    break;
                case 404:
                    errorMessage = 'Errore 404 - Not found';
                    break;
                case 500:
                    errorMessage = 'Errore 500 - Internal Server Error';
                    break;
                default:
                    errorMessage = 'Errore';
            }
            throw new Error(errorMessage);
        }
    } catch (err) {
        console.error(err);
    }
}

// Call the function with the product ID
if (productId) {
    getProductDetails(productId);
}

// creazione oggetti e card
const formProduct = document.getElementById('formP')

formProduct.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Create product object
    const newProduct = {
        name: nameProductInput.value,
        description: descriptionProductInput.value,
        brand: brandProductInput.value,
        imageUrl: imageProductInput.value,
        price: priceProductInput.value,
    };

    try {
        const method = productId ? 'PUT' : 'POST';
        const url = productId ? `https://striveschool-api.herokuapp.com/api/product/${productId}` : 'https://striveschool-api.herokuapp.com/api/product';

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDdmZTJkN2IxMTAwMTkwZTZkZDkiLCJpYXQiOjE3MDk4ODk1MzQsImV4cCI6MTcxMTA5OTEzNH0.BIxdKIpxGyS4_E-I_L1WKcPppDfgUkWzdWA78u3GSHo',
            },
            body: JSON.stringify(newProduct),
        });

        if (response.ok) {
            alert('Congratulazioni! Hai salvato il prodotto!');
        } else {
            let errorMessage;
            switch (response.status) {
                case 400:
                    errorMessage = 'Errore 400 - Bad request';
                    break;
                case 401:
                    errorMessage = 'Errore 401 - Unauthorized';
                    break;
                case 404:
                    errorMessage = 'Errore 404 - Not found';
                    break;
                case 500:
                    errorMessage = 'Errore 500 - Internal Server Error';
                    break;
                default:
                    errorMessage = 'Errore';
            }
            throw new Error(errorMessage);
        }
    } catch (err) {
        console.error(err);
        alert('ATTENZIONE! Errore nel salvataggio!'); // Or display a more specific error message based on the error
    }
});