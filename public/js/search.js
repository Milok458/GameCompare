function subForm() {
    let form = document.querySelector(".card");

    form.addEventListener('submit', (event) => {
        event.preventDefault();
    });
}

function selectSearch() {
    let search = document.querySelector("#searchTypes");

    let options = document.querySelector("#options");

    search.addEventListener('change', (event) => {
        switch (search.value) {
            case 'default':
                options.innerHTML = ``;
                break;
            case 'title':
                options.innerHTML = `<label>Type title full or partial title to search:</label>
                        <input type="text" class="form-control" id="srch"/>`;
                break;
            case 'year':
                options.innerHTML = `<label>Year:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Year</option>
                        </select>`;
                break;
            case 'studio':
                options.innerHTML = `<label>Studio:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Studio</option>
                        </select>`;
                break;
            case 'price':
                options.innerHTML = `<label>Price:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Price Range</option>
                            <option value="0">$0-$19.99</option>
                            <option value="20">$20-$39.99</option>
                            <option value="40">$40-$59.99</option>
                            <option value="60">$60+</option>
                        </select>`;
                break;
            case 'rating':
                options.innerHTML = `<label>Rating:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Rating Score Range</option>
                            <option value="0">0-1.9</option>
                            <option value="2">2-3.9</option>
                            <option value="4">4-5.9</option>
                            <option value="6">6-7.9</option>
                            <option value="8">8-9.9</option>
                            <option value="10">10</option>
                        </select>`;
                break;
            case 'popularity':
                options.innerHTML = `<label>Popularity:</label>
                        <select id="srch" class="form-control">
                            <option value="ascending" selected>Ascending</option>
                            <option value="descending">Descending</option>
                        </select>`;
                break;
            case 'category':
                options.innerHTML = `<label>Category:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Category</option>
                        </select>`;
                break;
            case 'genre':
                options.innerHTML = `<label>Genre:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Genre</option>
                        </select>`;
                break;
            case 'keyword':
                options.innerHTML = `<label>Type keyword or keywords to search in description:</label>
                        <input type="text" class="form-control" id="srch"/>`;
                break;
            default:
                break;
        }
    });
}


function inti() {
    subForm();
    selectSearch();
}

inti();