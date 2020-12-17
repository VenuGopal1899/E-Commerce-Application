// array in local storage for registered users, products, items
let users = JSON.parse(localStorage.getItem('users')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let items = JSON.parse(localStorage.getItem('items')) || [];
let requests = JSON.parse(localStorage.getItem('requests')) || [];

export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users') && method === 'GET':
                        return getUsers();
                    case url.match(/\/users\/\d+$/) && method === 'DELETE':
                        return deleteUser();
                    case url.endsWith('/products/addProduct') && method === 'POST':
                        return addProduct();
                    case url.endsWith('/products') && method === 'GET':
                        return getProducts();
                    case url.match(/\/products\/\d+$/) && method === 'DELETE':
                        return deleteProduct();
                    case url.endsWith('/cart') && method === 'GET':
                        return getItems();
                    case url.endsWith('/cart/addItem') && method === 'POST':
                        return addItem();
                    case url.endsWith('/cart/deleteItem') && method === 'DELETE':
                        return deleteItem();
                    case url.match('/cart') && method === 'DELETE':
                        return checkout();
                    case url.endsWith('/requests') && method === 'GET':
                        return getRequests();
                    case url.endsWith('/requests/addRequest') && method === 'POST':
                        return addRequest();
                    case url.match(/\/approve\/\d+$/) && method === 'DELETE':
                        return approveRequest();
                    case url.match(/\/reject\/\d+$/) && method === 'DELETE':
                        return rejectRequest();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body;
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function addProduct(){
                const product = body;

                product.id = products.length ? Math.max(...products.map(x => x.id)) + 1 : 1;
                products.push(product);
                localStorage.setItem('products', JSON.stringify(products));

                return ok();
            }

            function deleteProduct(){
                if (!isLoggedIn()) return unauthorized();

                const productID = body;
                products = products.filter(x => x.id !== productID);
                localStorage.setItem('products', JSON.stringify(products));

                return ok();
            }

            function getProducts(){
                if (!isLoggedIn()) return unauthorized();
                // Re-fill Total Stock

                // var quantity = 100;

                // for(var i=0; i<products.length; i++){
                //     products[i].quantity = quantity.toString();
                // }
                // localStorage.setItem('products', JSON.stringify(products));

                return ok(products);
            }

            function addItem(){
                const item = body;
                var temp = 0;
                for(var i=0; i<products.length; i++){
                    if(products[i].id === item.productID){
                        products[i].quantity = products[i].quantity - Number(item.productQuantity);
                    }
                }

                for(var i=0; i<items.length; i++){
                    if((items[i].productID === item.productID) && (items[i].userName === item.userName)){
                        items[i].productQuantity = (Number(items[i].productQuantity)+Number(item.productQuantity)).toString();
                    }
                    else{
                        temp++;
                    }
                }

                if(temp == items.length){
                    item.id = items.length ? Math.max(...items.map(x => x.id)) + 1 : 1;
                    items.push(item);
                }

                localStorage.setItem('products', JSON.stringify(products));
                localStorage.setItem('items', JSON.stringify(items));

                return ok();
            }

            function deleteItem(){
                const it = body;
                const newItemsList = [];
                var deletedItem = items.filter(x => ((x.productID === it.id) && (x.userName === it.username)));
                for(var i=0; i<products.length; i++){
                    if(products[i].id === it.id){
                        products[i].quantity = Number(products[i].quantity) + Number(deletedItem[0].productQuantity);
                    }
                }

                for(var i=0; i<items.length; i++){
                    if(items[i].userName === it.username && items[i].productID === it.id){
                        continue;
                    } else {
                        newItemsList.push(items[i]);
                    }
                }

                items = newItemsList;
                localStorage.setItem('items', JSON.stringify(items));
                localStorage.setItem('products', JSON.stringify(products));

                return ok();
            }

            function getItems(){
                if (!isLoggedIn()) return unauthorized();

                return ok(items);
            }

            function checkout(){
                if (!isLoggedIn()) return unauthorized();

                items = [];
                localStorage.setItem('items', JSON.stringify(items));

                return ok();
            }

            function addRequest(){
                const request = body;

                request.id = requests.length ? Math.max(...requests.map(x => x.id)) + 1 : 1;
                requests.push(request);

                localStorage.setItem('requests', JSON.stringify(requests));

                return ok();
            }

            function getRequests(){
                if (!isLoggedIn()) return unauthorized();

                return ok(requests);
            }

            function approveRequest(){
                if (!isLoggedIn()) return unauthorized();

                const id = idFromUrl();
                var sum = 0;
                var approvedrequest = requests.filter(x => x.id === id);

                for(var i=0; i<products.length; i++){
                    if(products[i].id === approvedrequest[0].productID){
                        sum =  Number(products[i].quantity) + 2*Number(approvedrequest[0].productQuantity);
                        products[i].quantity = sum.toString();
                    }
                }

                requests = requests.filter(x => x.id !== id);

                localStorage.setItem('products', JSON.stringify(products));
                localStorage.setItem('requests', JSON.stringify(requests));

                return ok();
            }

            function rejectRequest(){
                if (!isLoggedIn()) return unauthorized();

                const id = idFromUrl();
                requests = requests.filter(x => x.id !== id);

                localStorage.setItem('requests', JSON.stringify(requests));

                return ok();
            }

            function register() {
                const user = body;

                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }

                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function getUsers() {
                if (!isLoggedIn()) return unauthorized();

                // Re-fill Total Stock

                // var sum = 100;

                // for(var i=0; i<products.length; i++){
                //     products[i].quantity = sum.toString();
                // }
                // localStorage.setItem('products', JSON.stringify(products));

                return ok(users);
            }

            function deleteUser() {
                if (!isLoggedIn()) return unauthorized();

                users = users.filter(x => x.id !== idFromUrl());
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function isLoggedIn() {
                return headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    }
}