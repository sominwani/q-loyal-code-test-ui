import { Locator, Page } from '@playwright/test'
import * as dotenv from 'dotenv'
dotenv.config()

export class LoginPage {
  readonly page: Page
  readonly sauceHomePageLogo: Locator
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page
    this.sauceHomePageLogo=this.page.locator('.login_logo')
    this.usernameInput = this.page.getByTestId('user-name')
    this.passwordInput = this.page.getByTestId('password')
    this.loginButton = this.page.getByTestId('login-button')
   }

  async openHomePage() {
    await this.page.goto(process.env.BASE_URL!)
    await this.sauceHomePageLogo.waitFor({state: 'visible'})
  }

  async login(username:string, password:string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}
