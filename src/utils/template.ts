export function generate_var(value, logo) {
  const data_per_page = 10;
  const variables = {
    customer_details: '',
    invoice_date: new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
    }),
    //.split(' ')[0],
    invoice_number: value.order_id,
    Rented_date: value.rented_date.toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
    }), //.split(' ')[0],
    table_value: [],
  };
  variables.customer_details = `  <p class="bill_to_address">
            <span>Billed To</span>${value.customer_id.name} <span> ${value.customer_id.address} </span>

            <span> ${value.customer_id.city},${value.customer_id.zipcode}</span>
            <span> ${value.customer_id.state},${value.customer_id.country}</span>

            <span> email:${value.customer_id.email}</span
            ><span> phone:${value.customer_id.phone} </span>
          </p>`;
  let template = [];

  let currTemplate = ``;
  variables.table_value = value.materials.forEach((each, index) => {
    if (index !== 0 && index % data_per_page === 0) {
      template.push(currTemplate);
      currTemplate = ``;
    }
    currTemplate += `<tr class="item ">
            <td>${each.material_id.name}</td>
            <td>${each.qty}</td>
            <td>${Math.floor(each.rent_hours / 60)}Hrs ${each.rent_hours % 60}Hrs</td>
            <td> ₹${each.price}</td>
            <td> ₹${each.old_over_due_amount}</td>
            <td> ₹${each.total_price}</td>
          </tr>`;
    if (index === value.materials.length - 1) {
      template.push(currTemplate);
      currTemplate = ``;
    }
  });

  const img = logo;

  const total = ` <tr class="total">
            <td></td>
 <td></td>
            <td></td>
            <td></td>

            <td></td>
            <td>Advance: ₹ ${value.advance}</td>
          </tr>
           
          <tr class="total">
            <td></td>
 <td></td>
            <td></td>
            <td></td>

            <td></td>
            <td>Transport: ₹ ${value.transport}</td>
          </tr>
          <tr class="total">
            <td></td>
 <td></td>
            <td></td>
            <td></td>

            <td></td>
            <td>Balance: ₹ ${value.balance_amount}</td>
          </tr>
          <tr class="total">
            <td></td>
 <td></td>
            <td></td>
            <td></td>

            <td></td>
            <td>Total: ₹ ${+value.total_amount + +value.transport}</td>
          </tr>`;
  let totaltemplate = ``;
  //`https://crmdev.gwayerp.in/static/media/logo.5f82dc6913a863161faf4d347fc88d7b.svg`;
  for (let i = 0; i < template.length; i++) {
    let table = ``;
    if (template.length - 1 === i) {
      table = total;
    }
    totaltemplate += `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Favicon -->
    <link rel="icon" href="./images/favicon.png" type="image/x-icon" />

    <!-- Invoice styling -->
    <style>
      body {
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        text-align: center;
        color: #777;
      }

      body h1 {
        font-weight: 300;
        margin-bottom: 0px;
        padding-bottom: 0px;
        color: #000;
      }

      body h3 {
        font-weight: 300;
        margin-top: 10px;
        margin-bottom: 20px;
        font-style: italic;
        color: #555;
      }

      body a {
        color: #06f;
      }

      .invoice-box {
        max-width: 800px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
        height: 1050px;
      }
      .title_icon {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .invoice_title {
        width: 200px;
        color: black;
        font-size: 40px;
        font-weight: 600;
      }

      .billing_address {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
      }
      .bill_to {
        display: flex;
        flex-direction: column;
        gap: 1px;
        margin: 0;
      }
      .bill_to span {
        font-weight: 600;
        font-size: 14px;
        color: black;
      }
      .bill_to_address {
        font-size: 12px;
        font-weight: 600;
        color: #000;
        display: flex;
        flex-direction: column;
        gap: 1px;
        margin: 0;
        text-align: start;
        width: 300px;
        justify-content: flex-start;
      }
      .bill_to_address span {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
        justify-content: flex-start;
      }
      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        border-collapse: collapse;
      }

      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(1) {
        max-width: 400px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .invoice-box table tr td:nth-child(6) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }
      .invoice-box table tr.information table td {
        padding-bottom: 40px;
      }
.invoice-box table tr.heading{
  font-size:12px
}
      .invoice-box table tr.heading td {
        
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }
.invoice-box table tr.item{
  font-size:12px
}
      .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(6) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }

      .notes {
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        font-size: 12px;
        font-weight: 500;
        color: #000;
      }
      .notes p {
        margin: 0;
        text-align: left;
      }
      .notes p span {
        width: 50px;
      }
      .note {
        font-size: 16px;
        font-weight: 600;
      }
      .thanks {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }

        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }
    </style>
  </head>

  <body>
    <div class="invoice-box">
      <div>
        <div class="title_icon">
          <img
            src=${img}
            alt="Company logo"
            style="width: 100%; max-width: 200px"
          />
          <p class="invoice_title">INVOICE</p>
        </div>
        <div class="billing_address">
       ${variables.customer_details}
          <p class="bill_to">
            Invoice no:
            <span> ${variables.invoice_number}</span>
          </p>
          <p class="bill_to">
            Invoice Date:
            <span>  ${variables.invoice_date}</span>
          </p>
          <p class="bill_to">
            Rented Date:
            <span>  ${variables.Rented_date}</span>
          </p>
        </div>

        <table>
          <tr class="heading">
            <td>Material</td>
              <td>Qty</td>
            <td>Rent Hours</td>
            <td>Rent Price</td>
            <td>Over Due Price</td>
            <td>Total Price</td>
          </tr>
 ${template[i]}
        
     ${table}

         
        </table>
      </div>
      <div>
 <div class="notes">
          <p>
            Sunday is full holiday, and working days are Monday through
            Saturday, 7:30 am to 5:00 pm
          </p>
          <p class="note">Note:</p>
          <p>
            <span></span>
            1. The rent is applicable for only 20 days. If any materials are
            lost or damaged, the compensation amount will be taken from your
            advance payment.
          </p>
          <p>
            2. If the sheet is lost or broken, the amount for the damage should
            be payable.
          </p>
          <p>
            3. Product or material should not be taken anywhere without our
            permission other than the mentioned place
          </p>
          <p>
            4. The rented product/material should be returned within 4 pm in the
            evening
          </p>
        </div>
      <div class="thanks">
       <p>Owner signature  </p>
        <p>Thank You!!</p>
         <p>Lessor's signature  </p>
      </div>
       </div>
    </div>
  </body>
</html>

`;
  }
  return totaltemplate;
}

// export const template = `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />

//     <!-- Favicon -->
//     <link rel="icon" href="./images/favicon.png" type="image/x-icon" />

//     <!-- Invoice styling -->
//     <style>
//       body {
//         font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
//         text-align: center;
//         color: #777;
//       }

//       body h1 {
//         font-weight: 300;
//         margin-bottom: 0px;
//         padding-bottom: 0px;
//         color: #000;
//       }

//       body h3 {
//         font-weight: 300;
//         margin-top: 10px;
//         margin-bottom: 20px;
//         font-style: italic;
//         color: #555;
//       }

//       body a {
//         color: #06f;
//       }

//       .invoice-box {
//         max-width: 800px;
//         margin: auto;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         padding: 30px;
//         border: 1px solid #eee;
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
//         font-size: 16px;
//         line-height: 24px;
//         font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
//         color: #555;
//         height: 1050px;
//       }
//       .title_icon {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//       }
//       .invoice_title {
//         width: 200px;
//         color: black;
//         font-size: 45px;
//         font-weight: 600;
//       }

//       .billing_address {
//         margin-bottom: 30px;
//         display: flex;
//         justify-content: space-between;
//       }
//       .bill_to {
//         display: flex;
//         flex-direction: column;
//         gap: 1px;
//         margin: 0;
//       }
//       .bill_to span {
//         font-weight: 600;
//         font-size: 18px;
//         color: black;
//       }
//       .bill_to_address {
//         font-size: 14px;
//         font-weight: 600;
//         color: #000;
//         display: flex;
//         flex-direction: column;
//         gap: 1px;
//         margin: 0;
//         text-align: start;
//         width: 300px;
//         justify-content: flex-start;
//       }
//       .bill_to_address span {
//         display: flex;
//         flex-direction: column;
//         font-size: 16px;
//         font-weight: 400;
//         line-height: 24px;
//         font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
//         color: #555;
//         justify-content: flex-start;
//       }
//       .invoice-box table {
//         width: 100%;
//         line-height: inherit;
//         text-align: left;
//         border-collapse: collapse;
//       }

//       .invoice-box table td {
//         padding: 5px;
//         vertical-align: top;
//       }

//       .invoice-box table tr td:nth-child(1) {
//         max-width: 400px;
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//       }

//       .invoice-box table tr td:nth-child(5) {
//         text-align: right;
//       }

//       .invoice-box table tr.top table td {
//         padding-bottom: 20px;
//       }

//       .invoice-box table tr.top table td.title {
//         font-size: 45px;
//         line-height: 45px;
//         color: #333;
//       }
//       .invoice-box table tr.information table td {
//         padding-bottom: 40px;
//       }

//       .invoice-box table tr.heading td {
//         background: #eee;
//         border-bottom: 1px solid #ddd;
//         font-weight: bold;
//       }

//       .invoice-box table tr.details td {
//         padding-bottom: 20px;
//       }

//       .invoice-box table tr.item td {
//         border-bottom: 1px solid #eee;
//       }

//       .invoice-box table tr.item.last td {
//         border-bottom: none;
//       }

//       .invoice-box table tr.total td:nth-child(5) {
//         border-top: 2px solid #eee;
//         font-weight: bold;
//       }
//       .thanks {
//         display: flex;
//         align-self: flex-end;
//         font-size: 18px;
//         font-weight: 500;
//         color: #000;
//       }

//       @media only screen and (max-width: 600px) {
//         .invoice-box table tr.top table td {
//           width: 100%;
//           display: block;
//           text-align: center;
//         }

//         .invoice-box table tr.information table td {
//           width: 100%;
//           display: block;
//           text-align: center;
//         }
//       }
//     </style>
//   </head>

//   <body>
//     <div class="invoice-box">
//       <div>
//         <div class="title_icon">
//           <img
//             src="./gway-logo-login.png"
//             alt="Company logo"
//             style="width: 100%; max-width: 200px"
//           />
//           <p class="invoice_title">INVOICE</p>
//         </div>
//         <div class="billing_address">
//           <p class="bill_to_address">
//             <span>Billed To</span> RamKumr <span> address </span>

//             <span> city,country,zipcode </span>
//             <span> email:ram@amoil.com </span
//             ><span> phone:12321321321321 </span>
//           </p>
//           <p class="bill_to">
//             Invoice no:
//             <span> 12/23/4334</span>
//           </p>
//           <p class="bill_to">
//             Invoice Date:
//             <span> 12/23/4334</span>
//           </p>
//           <p class="bill_to">
//             Due Date:
//             <span> 12/23/4334</span>
//           </p>
//         </div>

//         <table>
//           <tr class="heading">
//             <td>Material</td>
//             <td>Rent Hours</td>
//             <td>Rent Price</td>
//             <td>Over Due Price</td>
//             <td>Total Price</td>
//           </tr>

//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>

//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>
//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>
//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>
//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>
//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>
//           <tr class="item">
//             <td>Website design</td>

//             <td>300</td>
//             <td>300.00</td>
//             <td>300.00</td>
//             <td>$300.00</td>
//           </tr>

//           <tr class="item last">
//             <td>Domain name (1 year)</td>
//             <td>$10.00</td>
//             <td>$10.00</td>
//             <td>$10.00</td>
//             <td>$10.00</td>
//           </tr>

//           <tr class="total">
//             <td></td>

//             <td></td>
//             <td></td>

//             <td></td>
//             <td>Total: $385.00</td>
//           </tr>
//         </table>
//       </div>
//       <div class="thanks">
//         <p>Thanks for the business</p>
//       </div>
//     </div>
//   </body>
// </html>

// `;
