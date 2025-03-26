import {expect, Locator, Page} from '@playwright/test'
import * as dotenv from 'dotenv'
import {itemsAddedInCart} from "./products-page"
dotenv.config()

export class CheckoutPage {
  readonly page: Page
  readonly firstnameInput: Locator
  readonly lastnameInput: Locator
  readonly postCodeInput: Locator
  readonly continueButton: Locator
  readonly cancelButton: Locator
  readonly itemTotalLabel: Locator
  readonly finishButton: Locator

  constructor(page: Page) {
    this.page = page
    this.firstnameInput = this.page.locator('#first-name')
    this.lastnameInput = this.page.locator('#last-name')
    this.postCodeInput = this.page.locator('#postal-code')
    this.continueButton = this.page.getByRole('button', { name: 'CONTINUE' })
    this.cancelButton = this.page.getByRole('link', { name: 'CANCEL' })
    this.itemTotalLabel = this.page.locator('.summary_subtotal_label')
    this.finishButton = this.page.getByRole('link', { name: 'FINISH' })
   }

  async enterDetailsAndCheckout(firstname: string, lastname: string, postcode: string) {
    await this.firstnameInput.fill(firstname)
    await this.lastnameInput.fill(lastname)
    await this.postCodeInput.fill(postcode)
    await this.continueButton.click()
  }

  async assertItemTotalOnCheckoutOverviewPage () {
    const calculatedItemTotal = itemsAddedInCart.reduce((total, item) => total + item.price, 0)
    const itemTotalText = await this.itemTotalLabel.textContent() || '0'
    const itemTotal = parseFloat(itemTotalText.replace('Item total: $', '').trim())
    await expect(calculatedItemTotal).toBe(itemTotal)
  }

  async clickFinishButton() {
    await this.finishButton.click()
  }
}
