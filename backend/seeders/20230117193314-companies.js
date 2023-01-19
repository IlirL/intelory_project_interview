'use strict';
// const { randomUUID } = require("crypto");
// const companiesAfterScrape = require("../scraper/scraper.ts")
const puppeteer = require("puppeteer");
// const uuid = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     const url = "https://biznismreza.mk/Marketing/All-ads?grad=53&gradName=%D0%A1%D0%BA%D0%BE%D0%BF%D1%98%D0%B5";
     let companiesAfterScrape  = [];

         // Launch the browser
         const browser = await puppeteer.launch();
       
         // Create a page
         const page = await browser.newPage();
       
         // Go to your site
         await page.goto(url);
       
         // Evaluate JavaScript
          companiesAfterScrape = await page.evaluate(() => {
             //getTitles
             const companiesWrapper = document.body.querySelector("#bm-list-content");
             const companies = companiesWrapper.querySelectorAll(".companyItem");
             
             let titles = [];
            
             companies.forEach((c )=> {
                 const titlewrapper = c.querySelector("h6");
                 titles.push(titlewrapper? titlewrapper.innerText : null);

                });
             titles = titles.filter(t => t!==null);
             // return titles;
             // -----------------------------------------
             //getCities
             let cities= [];
             companies.forEach((c )=> {
                 const citySpanWrapper = c.querySelector(".mdi-map-marker-radius");
                 cities.push(citySpanWrapper? citySpanWrapper.innerText : null);
             });
             cities = cities.filter(t => t!==null);
           
             //get links for compmany details
             let companiesToFillDatabase = [];
             for(let i = 0; i<cities.length; i++)
             {
                 companiesToFillDatabase.push({
                     name:titles[i],
                     city:cities[i]
                 })
             }
     
             return companiesToFillDatabase;
         });
       
        //  console.log(companiesAfterScrape);
       
         // Close browser.
         await browser.close();
        const response = await queryInterface.bulkInsert('Companies', companiesAfterScrape, {});
        //  console.log("response", response);
        },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('Companies', null, {});

  }
};
