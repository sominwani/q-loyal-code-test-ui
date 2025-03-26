import {expect, Locator, Page} from '@playwright/test'
import {PRODUCT1, PRODUCT2, PRODUCT3} from "@/fixtures/types/products"
import {ItemsInCart} from "@/fixtures/types/items-in-cart"

export let cartCounter: number = 0
export let itemsAddedInCart: ItemsInCart[] = []

export class ProductsPage {
  readonly page: Page
  readonly shoppingCartLink: Locator

  constructor(page: Page) {
    this.page = page
    this.shoppingCartLink = this.page.locator('#shopping_cart_container a')
   }

  async addToCart(productName: string) {
    const itemProductTitleLocator = this.page.locator('a[id$=title_link]', {hasText: `${productName}`})
    const itemContainerLocator = this.page.locator('#inventory_container .inventory_item', { has: itemProductTitleLocator})
    const itemAddToCartButton = itemContainerLocator.getByRole('button', {name: 'Add to cart'})

    await itemAddToCartButton.click()
    cartCounter++
    await this.assertShoppingCartItemCount()

    // Find the product by name and add to the cart items array
    const product = [PRODUCT1, PRODUCT2, PRODUCT3].find(p => p.name === productName)
    if (product) {
      itemsAddedInCart.push({ name: product.name, price: product.price })
    }
  }

  async assertShoppingCartItemCount () {
    await expect(this.shoppingCartLink).toContainText(cartCounter.toString())
  }

  async clickShoppingCartIcon () {
    await this.shoppingCartLink.click()
  }
}
