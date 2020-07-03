import { Selector } from 'testcafe';

// the Usecentrics popup 
const acceptButton = Selector('#uc-btn-accept-banner');

fixture`Getting Started`
    .page`https://www.hse24.de/`
    .beforeEach(async t => {
        await t.eval(() => localStorage.clear());
        await t.eval(() => sessionStorage.clear());
        // click away Usercentrics popup
        try {
            await t.click(acceptButton);
        } catch (e) {
            // Test if it was the absent buttong
            if (e.code == "E24" && e.apiFnChain == ['Selector(\'#uc-btn-accept-banner\')']) {
                // do nothing
            } else {
                // eslint-disable-next-line no-console
                // console.log(e);
            }
        }
    });



test('Search Hose test', async t => {
    var searchField = Selector('input').withAttribute("type", "search").filterVisible();
    var searchButton = Selector('button').withAttribute("type", "submit").filterVisible();
    await t
        .typeText(searchField, "Hose")
        .click(searchButton);

    var hoseProductExists = Selector("div").withText(/Hose/).filterVisible().exists;
    var wrongProduct = Selector("div").withText(/IncredibleNonExistent/).filterVisible().exists;
    await t.expect(hoseProductExists).ok();
    await t.expect(wrongProduct).notOk();


});

test('Kosmetik link in expected place and works', async t => {

    var kosmetikLink = Selector("a").withText(/Kosmetik/).filterVisible();
    await t.expect(kosmetikLink.exists).ok();

    await t.expect(kosmetikLink.getStyleProperty("color")).eql("rgb(37, 37, 37)");

    await t.expect(kosmetikLink.getBoundingClientRectProperty("left")).gte(50);
    await t.expect(kosmetikLink.getBoundingClientRectProperty("left")).lte(500);
    await t.expect(kosmetikLink.getBoundingClientRectProperty("top")).gte(50);
    await t.expect(kosmetikLink.getBoundingClientRectProperty("top")).lte(500);

    var kosmetikKategorien = Selector("a").withText(/Alle Kategorien/).filterVisible();
    await t.expect(kosmetikKategorien.exists).notOk();
    await t.click(kosmetikLink);
    await t.expect(kosmetikKategorien.exists).ok();


    await t.expect(kosmetikKategorien.getBoundingClientRectProperty("left")).gte(100);
    await t.expect(kosmetikKategorien.getBoundingClientRectProperty("left")).lte(380);
    await t.expect(kosmetikKategorien.getBoundingClientRectProperty("top")).gte(350);
    await t.expect(kosmetikKategorien.getBoundingClientRectProperty("top")).lte(500);


});


test('Impressum link present', async t => {

    var impresumLinkExists = Selector("a").withText(/Impressum/).filterVisible().exists;
    await t.expect(impresumLinkExists).ok();

});
