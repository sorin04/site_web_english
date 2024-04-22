console.log("test js");

document.onreadystatechange = function () {
    console.log(document.readyState);
    if (document.readyState == 'interactive') {
        console.log("c'est ok");

        var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

        function addToCart(productName, price) {
            var existingItem = cartItems.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                var item = { name: productName, price: price, quantity: 1 };
                cartItems.push(item);
            }
            sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
            alert("Product added to cart!");
            updateCartCounter(); // Met à jour le compteur de panier lorsque le produit est ajouté
        }

        function updateCartCounter() {
            var cartCounter = document.querySelector('.cart-counter');
            cartCounter.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
        }

        // Nouvelle fonction pour afficher les informations du produit
        function afficherInfos(image) {
            var container = document.getElementById("info-container");
            var imageAgrandie = document.getElementById("image-agrandie");
            var titreProduit = document.getElementById("titre-produit");
            var prixProduit = document.getElementById("prix-produit");

            // Met à jour les informations avec celles de l'image cliquée
            imageAgrandie.src = image.src;
            titreProduit.textContent = image.nextElementSibling.textContent; // Récupère le titre du produit
            prixProduit.textContent = image.nextElementSibling.nextElementSibling.textContent; // Récupère le prix du produit

            // Affiche le conteneur des informations
            container.style.display = "block";
        }

        // Ajout d'un gestionnaire d'événements au clic sur le bouton "Add to Cart"
        var addToCartButtons = document.querySelectorAll('.btn');
        addToCartButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var productName = this.parentNode.querySelector('h5').textContent;
                var productPrice = this.parentNode.querySelector('.price').textContent;
                addToCart(productName, productPrice);
            });
        });

        // Redirection vers la page du panier lorsque l'utilisateur clique sur l'icône du panier
        var cartIcon = document.querySelector('.cart-icon');
        cartIcon.addEventListener('click', function () {
            // Rediriger vers la page du panier
            window.location.href = 'cart.html';
        });

        // Mettre à jour le compteur de panier lors du chargement de la page
        updateCartCounter();
    }
}
