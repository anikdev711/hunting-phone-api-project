
const loadPhones = async (mySearch, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${mySearch}`);
  const data = await res.json();
  const phones = data.data;
  // console.log(phones);
  displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  const showAllContainer = document.getElementById('show-all-container');
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden');
  }
  else {
    showAllContainer.classList.add('hidden');
  }

  // console.log('is show all', isShowAll);

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }


  phones.forEach(phone => {
    // console.log(phone);
    const phoneCard = document.createElement('div');
    phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name
      }</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button onclick = "handleShowDetails('${phone.slug}');
            show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  })
  toggleLoadingSpinner(false);
}

//show details
const handleShowDetails = async (id) => {
  console.log('show details clicked', id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
  // console.log(data);
}

const showPhoneDetails = phone => {
  console.log(phone);
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src='${phone.image}'/>
    <p>Storage: ${phone.mainFeatures.storage}{</p>
    <p>GPS: ${phone.others?.GPS? phone.others.GPS : 'no GPS' }</p>
  `;
}

// loadPhones();

//search
const handleSearch = (isShowAll) => {
  // console.log('handle search');
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, isShowAll);
  //console.log(searchText);
  toggleLoadingSpinner(true);
}

// const handleSearch2 = () => {
// const searchField = document.getElementById('search-field2');
// const searchText = searchField.value;
// loadPhones(searchText);
// toggleLoadingSpinner(true);
// }

const toggleLoadingSpinner = (isLoading) => {
  const loadSpinner = document.getElementById('load-spinner');
  if (isLoading === true) {
    loadSpinner.classList.remove('hidden');
  }
  else {
    loadSpinner.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handleSearch(true);
}