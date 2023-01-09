const {faker} = require('@faker-js/faker/locale/es_MX');


class Container{
  constructor(){
    this.products = [];
  }

  async generteUserMock( ) {
    const {commerce, image} = faker;
    const productName =  commerce.product();
    const productPrice = commerce.price();
    const productImage = image.image();

    return {
      productName,
      productPrice,
      productImage
    }
  }

  createBulkProducts(cant = 5){
    cant = parseInt(cant);
    const {commerce, image} = faker;
    let id = 0;
    
    for(let i = 0; i < cant; i++){
      id++;      
      const productName =  commerce.product();
      const productPrice = commerce.price();
      const productImage = image.unsplash.imageUrl(100, 100, null, productName);
      this.products.push({
        id,
        productName,
        productPrice,
        productImage
      });
    }

    return this.products
  }


}
module.exports = Container;