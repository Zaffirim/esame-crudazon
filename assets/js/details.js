const addressBarContent = new URLSearchParams(location.search)
const productId = addressBarContent.get('productId')

// eliminare prodotto

async function deleteProduct() {
    try {
        const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDdmZTJkN2IxMTAwMTkwZTZkZDkiLCJpYXQiOjE3MDk4ODk1MzQsImV4cCI6MTcxMTA5OTEzNH0.BIxdKIpxGyS4_E-I_L1WKcPppDfgUkWzdWA78u3GSHo'
            }
        });

        if (response.ok) {
            alert('Prodotto eliminato');
            location.assign('./index.html');
        } else {
            alert("Errore nell'eliminazione del prodotto");
        }
    } catch (err) {
        console.error(err);
    }
}


const showDetail = function (details) {
    const rowD = document.getElementById('row-detail')
    rowD.innerHTML = `<div class="card w-75 m-auto">
    <img src="${details.imageUrl}" class="card-img-top" alt="${details.name}">
    <div class="card-body">
      <h5 class="card-title">Nome prodotto: ${details.name}</h5>
      <p class="card-text">Brand: ${details.brand}</p>
      <p class="card-text">Descrizione: ${details.description}</p>
      <p class="card-text">Prezzo: ${details.price}€</p>
      <a href="#" class="btn btn-danger" id='delete-btn' onclick='deleteProduct()'>ELIMINA</a>
      <a href="./index.html" class="btn btn-primary">TORNA AI NOSTRI PRODOTTI</a>
    </div>
  </div>`
}

const detailProduct = function () {
    fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
        headers: {
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWVhZDdmZTJkN2IxMTAwMTkwZTZkZDkiLCJpYXQiOjE3MDk4ODk1MzQsImV4cCI6MTcxMTA5OTEzNH0.BIxdKIpxGyS4_E-I_L1WKcPppDfgUkWzdWA78u3GSHo',
        },
    })
        .then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                if (res.status === 400) {
                    throw new Error('Errore 400 - Bad request')
                } else if (res.status === 401) {
                    throw new Error('Errore 401 - Unauthorized')
                } else if (res.status === 404) {
                    throw new Error('Errore 404 - Not found')
                } else if (res.status === 500) {
                    throw new Error('Errore 500 - Internal Server Error')
                } else {
                    throw new Error('Errore')
                }
            }
        })
        .then((productDetails) => {
            showDetail(productDetails)
        })
        .catch((err) => {
            console.log(err)
        })
}

detailProduct()