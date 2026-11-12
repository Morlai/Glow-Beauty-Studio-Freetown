/* Glow Beauty Studio: customer-facing settings.
   Edit this file to change what visitors see on the website.
   The services below fill the "Services and prices" cards, the booking dropdown,
   the festive post card and Studio HQ.

   IMPORTANT: the prices are in Leones (Le). Only the first four were in your original
   page. The other prices are SAMPLE values: replace them with your real prices
   before you publish. To remove a service, delete its line. */
window.GLOW={
  // WhatsApp number with country code, digits only
  wa:"23276391399",
  // How the number is shown to visitors (footer and festive card)
  waShow:"+232 76 391 399",
  // Studio address (shown in "Find us", the footer and the map)
  address:"2 Fisher Street, Off Abach Street, Freetown",
  // Opening hours shown in "Find us". SAMPLE HOURS: change them to your real hours.
  // Leave empty [] to show "Open by appointment" instead.
  hours:[
    {d:"Monday to Friday",t:"9:00 am to 6:00 pm"},
    {d:"Saturday",t:"9:00 am to 5:00 pm"},
    {d:"Sunday",t:"Closed"}
  ],
  // Appointment times customers can pick, by weekday (0 = Sunday ... 6 = Saturday).
  // Each day lists the first and last appointment time. A day left out is shown as closed.
  // SAMPLE TIMES: match them to your opening hours above.
  slots:{
    step:60, // minutes between appointments
    days:{
      1:["09:00","17:00"],
      2:["09:00","17:00"],
      3:["09:00","17:00"],
      4:["09:00","17:00"],
      5:["09:00","17:00"],
      6:["09:00","16:00"]
    }
  },
  // Social links shown in the footer. Paste the full link between the quotes.
  // Empty ones are hidden. Example: instagram:"https://instagram.com/yourstudio"
  social:{
    instagram:"https://instagram.com/glowbeautystudio",
    facebook:"https://facebook.com/glowbeautystudio",
    tiktok:"https://www.tiktok.com/@glowbeautystudio"
  },
  services:[
    // Makeup
    {n:"Bridal makeup",p:600},
    {n:"Bridal trial makeup",p:300,img:"images/Bridal makeup.pg"},
    {n:"Bridesmaid makeup",p:250,img:"images/Party glam makeup.pg"},
    {n:"Graduation makeup",p:250,img:"images/Party glam makeup.pg"},
    {n:"Party glam makeup",p:300},
    {n:"Lash extensions",p:150,img:"images/Party glam makeup.pg"},
    // Hair
    {n:"Gele and hairstyling",p:250},
    {n:"Braids and hair styling",p:200,img:"images/Gele and hairstyling.pg"},
    {n:"Wig installation and styling",p:150,img:"images/Gele and hairstyling.pg"},
    // Nails
    {n:"Gel manicure and pedicure",p:200},
    {n:"Gel nails (hands only)",p:120,img:"images/Gel manicure and pedicure.pg"}
  ]
};
