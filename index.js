const cheerio = require('cheerio')
const puppeteer = require('puppeteer')

const url = 'https://www.mercadolivre.com.br'

const script = async () => {
  const browser = await puppeteer.launch({
    headless: true
    // headless: false
  })

  const page = await browser.newPage()

  await page.goto(url)

  const searchInput = await page.waitForXPath(
    '/html/body/header/div/form/input'
  )

  await searchInput.click()

  await page.keyboard.sendCharacter('xbox one')

  await searchInput.press('Enter')

  await page.waitForNavigation()

  const html = await page.content()

  const $ = cheerio.load(html)

  const results = await $('#searchResults > li')
    .map((index, element) => {
      const item = cheerio.load(element)

      const name = cheerio.text(item('.main-title')).trim()
      const price = Number(
        cheerio
          .text(item('.price__fraction'))
          .trim()
          .split('.')
          .join('')
      )
      const link = cheerio(item('.item__info-link'))['0'].attribs.href

      return {
        name,
        link,
        price,
        store: null,
        state: null
      }
    })
    .toArray()

  console.log('LUIZ results', results.length)
  console.log('LUIZ results', results)
}

script()
