export function isUserExistQuery(): string {
    return `SELECT * FROM shopping.users WHERE email = ?;`
}
export function isIDExistQuery(): string {
    return `SELECT * FROM shopping.users WHERE id = ?;`
}
export function registerUserQuery(): string {
    return `INSERT INTO shopping.users (id, first_name, last_name, email, password, city, street) VALUES (?, ?, ?, ?, ?, ?, ?);`
}
//
export function getProductsQuery(): string {
    return `SELECT * FROM shopping.products ORDER BY category_id;`
}
export function getProductByNameQuery(): string {
    return `SELECT * FROM shopping.products WHERE name LIKE ?;`
}
export function getProductCategoriesQuery(): string {
    return `SELECT * FROM shopping.products_categories;`
}
export function getProductsByCategoryQuery(): string {
    return `SELECT * FROM shopping.products WHERE category_id = ?;`
}
export function addProductQuery(): string {
    return `INSERT INTO shopping.products (name, category_id, price, picture) VALUES (?, ?, ?, ?);
    `
}
export function editProductQuery(): string {
    return `UPDATE shopping.products 
    SET 
        name = ?,
        category_id = ?,
        price = ?,
        picture = ?
    WHERE
        (id = ?);
    `
}
export function getCartByUserIDQuery(): string {
    return `SELECT 
    *
FROM
    shopping.carts
WHERE
    user_id = ? AND status = 1;`
}
export function getCartDetailsByCartIDQuery(): string {
    return `SELECT 
    cd.cart_id AS cart_id,
    cd.product_id,
    p.name,
    p.price,
    cd.quantity,
    cd.total_price
FROM
    shopping.cart_details cd
        JOIN
    shopping.products p ON cd.product_id = p.id
HAVING cd.cart_id = ?;`
}
export function addProductToCartQuery(): string {
    return `INSERT INTO shopping.cart_details (product_id, quantity, total_price, cart_id) VALUES (?, ?, ?, ?);`
}
export function createCartToUserQuery(): string {
    return `INSERT INTO shopping.carts (user_id) VALUES (?);`
}
export function updateProductQuantityQuery(): string {
    return `UPDATE shopping.cart_details 
    SET 
        quantity = ?,
        total_price = ?
    WHERE
        (product_id = ?) AND (cart_id = ?);
    
    `
}
export function removeProductToCartQuery(): string {
    return `DELETE FROM shopping.cart_details WHERE (cart_id = ?) AND (product_id = ?) ;`
}
export function deleteAllProductsFromCartQuery(): string {
    return `DELETE FROM shopping.cart_details WHERE (cart_id = ?);`
}
export function isCartExistQuery(): string {
    return `SELECT * FROM shopping.carts WHERE id = ? AND status = 1;`
}
export function isProductInCartQuery(): string {
    return `SELECT * FROM shopping.cart_details WHERE cart_id = ? AND product_id = ?;`
}
export function getCartPriceQuery(): string {
    return `SELECT sum(total_price) as total_cart_price FROM shopping.cart_details WHERE cart_id = ?;`
}
export function orderCartQuery(): string {
    return `INSERT INTO shopping.orders (user_id, cart_id, total_price, city, street, date, credit_card) VALUES (?, ?, ?, ?, ?, ?, ?);
    `
}
export function getCloseOrderQuery(): string {
    return `UPDATE shopping.carts SET status = '0' WHERE (id = ?);
    `
}
export function getUnavailableShippingDatesQuery(): string {
    return `SELECT 
    date, COUNT(*) AS shipping_date_count
FROM
    shopping.orders
GROUP BY date
HAVING shipping_date_count > 2 AND date > NOW();`
}
export function getAllOrdersQuery(): string {
    return `SELECT * FROM shopping.orders;`
}