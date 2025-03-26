import test from "@playwright/test"
import {LoginPage} from "@/pages/login-page"
import {ProductsPage} from "@/pages/products-page"
import {OrderConfirmationPage} from "@/pages/order-confirmation-page"
import {CheckoutPage} from "@/pages/checkout-page"
import {CartPage} from "@/pages/cart-page"
import * as process from "node:process"
import {PRODUCT1, PRODUCT2, PRODUCT3} from "@/fixtures/types/products"


test.describe('Place order on sauce demo website', () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        await loginPage.openHomePage()
    })

    test("add products and checkout", async ({ page }) => {
        const loginPage = new LoginPage(page)
        const productsPage = new ProductsPage(page)
        const cartPage = new CartPage(page)
        const checkoutPage = new CheckoutPage(page)
        const orderConfirmationPage = new OrderConfirmationPage(page)

        await loginPage.login(process.env.SAUCE_STANDARD_USERNAME || 'standard_user', process.env.SAUCE_PASSWORD || 'secret_sauce')

        await productsPage.addToCart(PRODUCT1.name)
        await productsPage.addToCart(PRODUCT2.name)
        await productsPage.addToCart(PRODUCT3.name)
        await productsPage.clickShoppingCartIcon()

        await cartPage.assertProductInCartOrCheckoutOverview()
        await cartPage.clickCheckoutButton()

        await checkoutPage.enterDetailsAndCheckout('somin', 'wani', '3000')
        await cartPage.assertProductInCartOrCheckoutOverview('checkput')
        await checkoutPage.assertItemTotalOnCheckoutOverviewPage()
        await checkoutPage.clickFinishButton()

        await orderConfirmationPage.assertOrderCompletion()
    })
})