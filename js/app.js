const loadPhones = (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data, dataLimit))
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``

    /* Display 9 Phones */
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 9) {
        phones = phones.slice(0, 9);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }

    // Display Warning
    const notFound = document.getElementById('warning')
    if (phones.length === 0) {
        notFound.classList.remove('d-none');
    } else {
        notFound.classList.add('d-none');
    }

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image ? phone.image : 'There is nothing to Show'}" class="card-img-top" alt="nothing to show">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class="card-text">
                    Mobile phones are considered an important human invention as it has been one of the most widely used and sold pieces of consumer technology.
                </p>
                <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-dark py-2" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneDiv);
    });
    // Stop Loding
    toggleSpinner(false)
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const fieldValue = searchField.value;
    loadPhones(fieldValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // Start Loding
    processSearch(10);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    } else {
        loaderSection.classList.add('d-none');
    }
}

// Not the best way to show all
document.getElementById('btn-expand').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const phoneDetailsLabel = document.getElementById('phoneDetailsLabel');
    phoneDetailsLabel.innerText = `${phone.name}`;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <div class="details-img-wrapper my-4">
            <img src="${phone.image}" class="details-image" alt="something wrong">
        </div>
        <div class="details-table-wrapper">
            <table class="table table-bordered">
                <thead class="text-center">
                    <tr>
                        <th scope="row">Main Features</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="details-property">Chipset:</span>
                            ${phone.mainFeatures.chipSet ? phone.mainFeatures.chipSet : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">Display Size:</span>
                            ${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">Memory:</span>
                            ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">Storage:</span>
                            ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No'}
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <table class="table table-bordered">
                <thead class="text-center">
                    <tr>
                        <th scope="row">Others</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <span class="details-property">Bluetooth:</span>
                            ${phone.others ? phone.others.Bluetooth : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">GPS:</span>
                            ${phone.others ? phone.others.GPS : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">NFC:</span>
                            ${phone.others ? phone.others.NFC : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">Radio:</span>
                            ${phone.others ? phone.others.Radio : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">USB:</span>
                            ${phone.others ? phone.others.USB : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">WLAN:</span>
                            ${phone.others ? phone.others.WLAN : 'No'}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="details-property">Release Date:</span>
                            ${phone.releaseDate ? phone.releaseDate : 'No'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
}

loadPhones('iphone');