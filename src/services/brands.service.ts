export async function getBrands() {
    const response = await fetch('http://localhost:3000/api/brands')

    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}: Error occurred while fetching products`);
    }

    return await response.json()
}