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
  // Opening hours shown in "Find us". Leave empty [] to show "Open by appointment".
  // Example: hours:[{d:"Monday to Saturday",t:"9:00 am to 6:00 pm"},{d:"Sunday",t:"Closed"}],
  hours:[],
  services:[
    // Makeup
    {n:"Bridal makeup",p:600},
    {n:"Bridal trial makeup",p:300,img:"images/Bridal makeup.jpg"},
    {n:"Bridesmaid makeup",p:250,img:"images/Party glam makeup.jpg"},
    {n:"Graduation makeup",p:250,img:"images/Party glam makeup.jpg"},
    {n:"Party glam makeup",p:300},
    {n:"Lash extensions",p:150,img:"images/Party glam makeup.jpg"},
    // Hair
    {n:"Gele and hairstyling",p:250},
    {n:"Braids and hair styling",p:200,img:"images/Gele and hairstyling.jpg"},
    {n:"Wig installation and styling",p:150,img:"images/Gele and hairstyling.jpg"},
    // Nails
    {n:"Gel manicure and pedicure",p:200},
    {n:"Gel nails (hands only)",p:120,img:"images/Gel manicure and pedicure.jpg"}
  ]
};
