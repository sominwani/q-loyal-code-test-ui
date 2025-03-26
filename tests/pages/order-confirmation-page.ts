import {expect, Locator, Page} from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

export class OrderConfirmationPage {
  readonly page: Page
  readonly orderCompleteHeader: Locator
  readonly orderCompleteText: Locator

  constructor(page: Page) {
    this.page = page
    this.orderCompleteHeader = this.page.locator('.complete-header')
    this.orderCompleteText = this.page.locator('.complete-text')
   }

  async assertOrderCompletion() {
    await expect(this.orderCompleteHeader).toHaveText('THANK YOU FOR YOUR ORDER')
    await expect(this.orderCompleteText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  }
}
