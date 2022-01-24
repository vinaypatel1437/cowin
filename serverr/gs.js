const { rejects } = require("assert");
let fs = require("fs");
let puppeteer = require("puppeteer");
if(fs.existsSync('file.json')==true){
    fs.unlinkSync('file.json')
}
let pin = process.argv[2];
let age = process.argv[3];
age = parseInt(age);
let excel = require("xlsx");

(async() => {
    const browser = await puppeteer.launch({
            headless: true,
            slowMo: 100,
            defaultViewport: null,
            args: ["--start-maximized"],
        })
    const page = await browser.newPage();
    await page.goto("https://www.google.com/");

    await page.waitForSelector("input[type='text']", { visible: true })
    await page.type("input[type='text']", "cowin");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".yuRUbf>a[href='https://www.cowin.gov.in/']", { visible: true })
    await page.click(".yuRUbf>a[href='https://www.cowin.gov.in/']");
    await page.waitForTimeout(2000);
    await page.waitForSelector("#mat-tab-label-1-1", { visible: true });
    await page.evaluate(() => document.querySelector("#mat-tab-label-1-1").click());
    await page.waitForSelector("input[appinputchar='pincode']", { visible: true });
    await page.type("input[appinputchar='pincode']", pin);
    await page.keyboard.press("Enter");
    if (age < 45 && age >= 18) {
        await page.waitForTimeout(500);
        await page.waitForSelector("input#c1", { visible: true });
        await page.evaluate(() => document.querySelector("#c1").click());
    } else if (age <= 44 && age > 18) {
        await page.waitForTimeout(500)
        await page.waitForSelector("input#ca1", { visible: true });
        await page.evaluate(() => document.querySelector("#ca1").click());


    } else {
        await page.waitForTimeout(500);
        await page.waitForSelector("input#c2", { visible: true });
        await page.evaluate(() => document.querySelector("#c2").click());
    }
    const result = await page.evaluate(() => {

            let citye=[]
            let center = document.querySelectorAll(".vaccine-details")
            console.log(center)
        

            for (let i = 0; i < center.length; i++) {
                let city = center[i].textContent;
                citye.push(city);

            }
            let centerarr = document.querySelectorAll(".main-slider-wrap.col.col-lg-3");

            const data = [];
            for (let i = 0; i < centerarr.length; i++) {
                let city1 = centerarr[i].textContent;
                data.push(city1);

            }




            let date = [];
            let date_vaccination = document.querySelectorAll(".availability-date p");
            for (let i = 0; i < 7; i++) {
                let date_available = date_vaccination[i].textContent;
                date.push(date_available);
                //taking the date of vaccination
            }
            let slottt = []
            let slot = document.querySelectorAll("li.ng-star-inserted .slots-box");
            for (let i = 0; i < slot.length; i++) {
                slottt.push(slot[i].textContent);
                //  let vaccinetype =document.querySelector("li.ng-star-inserted .slots-box h5.name").textContent;
                //  let dose1 =document.querySelector("span[title='Dose 1']").textContent;
            }

            let obj_vaccine = {
                city: data,
                dates: date,
                slots: slottt,
                center:citye
            }


            // console.log(data);
            return obj_vaccine;

        })
        // console.log(result);
        console.log(result)
    
    for (let i = 0; i < 7; i++) {
        let fileNa = result.dates[i] + ".txt";
        if (fs.existsSync(fileNa)) {
            fs.unlinkSync(fileNa)
        }
    }
    let newWB = excel.utils.book_new();
        
    let obj_arr =[]
    for (let i = 0; i < 7; i++) {
        // let fileN = result.dates[i] + ".txt";
        // console.log(fileN);
        let obbj=[];
        // fs.appendFileSync(fileN, "Date:- " + result.dates[i], "utf-8")
        for (let j = 0; j < result.city.length; j++) {
            // fs.appendFileSync(fileN, "\nCenter:- " + result.city[j], "utf-8");
            let obj = {};

            obj['Date'] = result.dates[i]
            obj['Center'] = result.city[j]
            obj['VaccineName']=result.center[j]
            console.log(result.city[j])
            for (let k = 1; k < result.slots.length; k++) {
                if (k % 7 == i && Math.floor(k / 7) == j) {
                    if (result.slots[k] == " NA " || result.slots[k]==undefined) {
                        obj['Total'] = 'NA'
                        // fs.appendFileSync(fileN, "\nVaccine Name: -NA\nDose 1:- NA \nDose 2:- NA \nTotal:- NA\n", "utf-8");
                        // fs.appendFileSync(fileN,"\nVaccine Name: -NA\nDose 1:- NA \nDose 2:- NA \nTotal:- NA","utf-8");
                    } else {
                        let arr = result.slots[k].split(" ");
                        arr.splice(10);
                        console.log(arr)
                        obj['Total'] = arr[1]
                        // fs.appendFileSync(fileN, `\nVaccine name:- ${arr[1]}\nDose 1:- ${arr[4]}\nDose 2:- ${arr[9]}\nTotal:- ${arr[6]}\n`, "utf-8")

                        // let somee= JSON.stringify(arr);
                        // fs.appendFileSync(fileN,somee,"utf-8") 
                    }
                }
            }
            obbj.push(obj)
            // console.log(obj)
            obj_arr.push(obj)
        }
        // let content= fs.readFileSync(fileN,"utf-8");
        // let filesN = result.dates[i]+".json";
        // fs.writeFileSync(filesN,content)
        // pdfDoc.pipe(fs.createWriteStream(filesN));
        // pdfDoc.text(content);
        let newWS = excel.utils.json_to_sheet(obbj);
        excel.utils.book_append_sheet(newWB,newWS,result.dates[i]);
        
        
        
    }
    fs.appendFileSync("file.json",JSON.stringify(obj_arr));
    browser.close()
     
    excel.writeFile(newWB,'Vaccinate.xlsx')
    // pdfDoc.end()
})();