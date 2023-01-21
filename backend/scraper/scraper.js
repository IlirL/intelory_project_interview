const puppeteer = require("puppeteer");
// const uuid = require("uuid");
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}


const data_after_scrape = async () => {
    const url = "https://biznismreza.mk/Marketing/All-ads?grad=53&gradName=%D0%A1%D0%BA%D0%BE%D0%BF%D1%98%D0%B5";
    let companiesAfterScrape  = [];

        // Launch the browser
        let browser = await puppeteer.launch();
      
        // Create a page
        let page = await browser.newPage();
      
        // Go to your site
        await page.goto(url, {waitUntil:'load'});
      
        // Evaluate JavaScript
         companiesAfterScrape = await page.evaluate(() => {
            //getTitles
            const baseUrl = "https://biznismreza.mk/Marketing/"

            const companiesWrapper = document.body.querySelector("#bm-list-content");
            const companies = companiesWrapper.querySelectorAll(".companyItem");
            
            let titles = [];
            let cities= [];
            let companiesToFillDatabase = [];

            companies.forEach((c,i )=> {
                const titlewrapper = c.querySelector("h6");
               //  titles.push(titlewrapper? titlewrapper.innerText : null);
               const currentTitle = titlewrapper ? titlewrapper.innerText : null;
                const citySpanWrapper = c.querySelector(".mdi-map-marker-radius");
               //  cities.push(citySpanWrapper? citySpanWrapper.innerText : null);
               const currentCity = citySpanWrapper ? citySpanWrapper.innerText:null;

               const anchorWrapper = c?.querySelector(".bm-ad-item-footer");
               const anchorTag = anchorWrapper?.querySelector("a");
               const link =  anchorTag?.getAttribute("href");
               
               if(currentCity && currentTitle)
               {
                 companiesToFillDatabase.push({
                   name:currentTitle,
                   city:currentCity,
                   link:baseUrl + link
               })
               }
               });
    
            return companiesToFillDatabase;
        });
      
      
       let companiesWithDetails = null;
       console.log(companiesAfterScrape.length);

       for(let i = 0; i<companiesAfterScrape.length; i++)
       {
         
           // Go to your site
           await page.goto(companiesAfterScrape[i].link,{waitUntil: "networkidle2"});

           companiesWithDetails = await page.evaluate(()=>{
               let embsWrapper = document.body.querySelector("#embs");                
               let edbWrapper = document.body.querySelector("#edb");
               let nazivWrapper = document.body.querySelector("#naziv");
               let dejnostWrapper = document.body.querySelector("#dejnost");
               let pravnaFormaWrapper = document.body.querySelector("#pravnaForma");
               let goleminaWrapper = document.body.querySelector("#golemina");
               let statusWrapper = document.body.querySelector("#status");
               let starostWrapper = document.body.querySelector("#starost");
               let osnovnaGlavninaWrapper = document.body.querySelector("#osnovnaGlavnina");
               let gradWrapper = document.body.querySelector("#grad");
               let ulicaWrapper = document.body.querySelector("#ulica");
               let bankaWrapper = document.body.querySelector("#banka");
               let ziroSmetkaWrapper = document.body.querySelector("#ziroSmetka");

               return {
                 embs:parseInt(embsWrapper.innerText),
                 edb:edbWrapper.innerText,
                 // naziv:nazivWrapper.innerText,
                 activity:dejnostWrapper.innerText,
                 legal_form:pravnaFormaWrapper.innerText,
                 size:goleminaWrapper.innerText,
                 active:statusWrapper.innerText === "Активен",
                 // starost:starostWrapper.innerText,
                 // osnovnaGlavnina:osnovnaGlavninaWrapper.innerText,
                 // grad:gradWrapper.innerText,
                 address:ulicaWrapper.innerText,
                 bank:bankaWrapper.innerText,
                 bank_account_number:ziroSmetkaWrapper.innerText
               }
           })
           // console.log("companiesWithdetails = ", companiesWithDetails)
           delete companiesAfterScrape[i].link;
           companiesAfterScrape[i] = {
             ...companiesAfterScrape[i],
             ...companiesWithDetails
           }
           console.log(companiesAfterScrape[i], i);
       }
           


         await browser.close();

         return companiesAfterScrape;
}

const companies_with_details = data_after_scrape();

export default companies_with_details;