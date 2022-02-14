const { test, expect } = require('@playwright/test');

const TODO_URL = [
    'https://www.lanacion.com.ar',
    'https://www.lanacion.com.ar/politica/replica-larreta-dara-una-conferencia-de-prensa-tras-la-reunion-con-fernandez-nid16042021/'
];

const Elementos = [
    '#btnsuscribite',
    '#btningresar',
    '.com-button --primary',
    'SUSCRIBITE AL NEWSLETTER'
];

TODO_URL.forEach(url => {

    test.beforeEach(async ({ page }) => {
        await page.goto(url);
      });
    
    test.describe(url == 'https://www.lanacion.com.ar'? 'Test en Home La Nacion' : 'Test en Nota La Nacion', () => {
    
        test('Status 200', async ({ page }) => {
            await statusOk(page) 
        });
    
        test('Boton "SUSCRIBITE" visibles y clickeables', async ({ page }) => {
            await visibleAndClick(page, Elementos[0], true, true)
          });
    
        test('Boton "Ingresar" visibles y clickeables', async ({ page }) => {
            await visibleAndClick(page, Elementos[1], true, true)
        });
    
        if (url == 'https://www.lanacion.com.ar'){
            test('Caja "Newsletter" visibles', async ({ page }) => {
                //await visibleAndClick(page, Elementos[2], false, false)
            });
        }
    })
});

const statusOk = async(page)  =>  {
    await Promise.all([            
        (await page.waitForEvent('response', response => 
                response.request().resourceType() === 'document'
            )
        ).status() === 200
    ]);
}

const visibleAndClick = async(page, elemento, Addclick, id)  =>  {
    const item = await page.locator(elemento) 
         
    id == true ? await expect(item).toBeVisible() : await expect(item).toHaveText([Elementos[3]]) 
    
    Addclick == true && await item.click()  

    //await expect(page.locator('.todo-list li')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
    
    // await page.waitForSelector("#content ol section", { timeout: 5000})
    // const repos = await page.$$("#content ol section"); 
    // console.log(repos.length);
    // for (const repo in repos){
    //     console.log(await repo.innerText());
    // };


    // await page.waitForSelector("text=Recibí las noticias de", {
    //     timeout: 2 * 1000,
    //     state: "visible"
    //   })
    // #content .lay-sidebar .sidebar__main section .container .container-text
    //.container-button
    //class="com-text --fivexs"

    // const locato = await page.locator('.com-text --fivexs');
    // console.log("--------------");
    // console.log(await locato.count());
    // console.log(await locato);
        let text = await item.innerText();
        let text2 = await item.innerHTML();
        let text3 = await item.textContent();
    console.log("-------text-------");
    console.log(text);
    console.log("-------text2-------");
    console.log(text2);
    console.log("--------text3------");
    console.log(text3);
    console.log("--------------");

}

