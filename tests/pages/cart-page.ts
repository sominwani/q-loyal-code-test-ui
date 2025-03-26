import {expect, Locator, Page} from '@playwright/test'
import {itemsAddedInCart} from "./products-page"

export class CartPage {
  readonly page: Page
  readonly checkoutButton: Locator


  constructor(page: Page) {
    this.page = page
    this.checkoutButton=this.page.locator('.btn_action.checkout_button')
   }

  async assertProductInCartOrCheckoutOverview(cartOrCheckout: string = 'cart') {
    for (const item of itemsAddedInCart) {
      const itemContainerLocator = this.page.locator('.cart_item', {hasText: `${item.name}`})
      const itemPriceLocator = itemContainerLocator.locator('.inventory_item_price')
      const itemQuantityLocator = cartOrCheckout === 'cart'
        ? itemContainerLocator.locator('.cart_quantity')
        : itemContainerLocator.locator('.summary_quantity')
      const itemNameLocator = itemContainerLocator.locator('.inventory_item_name')

      await expect(itemContainerLocator).toBeVisible()
      await expect(itemNameLocator).toHaveText(item.name)
      if (cartOrCheckout === 'cart') {
        await expect(itemPriceLocator).toHaveText(`${item.price.toFixed(2)}`)
      } else {
        await expect(itemPriceLocator).toHaveText(`$${item.price.toFixed(2)}`)
      }
      await expect(itemQuantityLocator).toHaveText('1')
    }
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click()
  }
}
