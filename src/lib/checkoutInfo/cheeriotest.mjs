import { load } from "cheerio"


const outerHtml =
    `
    <body class="go_L2057 go_A2189 go_CUSD v-L-2057 v-A-2189 v-C-USD go_buypipelinereviewandbuy v-buypipelinereviewandbuy go_buypipelinereviewandbuy_reviewandbuy v-buypipelinereviewandbuy-reviewandbuy vt3" cz-shortcut-listen="true">

    <input type="hidden" id="x-csrf-token" name="x-csrf-token" value="fdTLhswOnelvF0BwKCpIjuRKRZHnIsDQUfNXZMcrTjrup2AH-17D-65oHNw4tcV2XMDhDq0bN7-i83qIV7HbuOYGPcGzCFgq6FZqRfBYpHjxSPxPm-17zuzX2YXKNzOktLphQxfdo3T5eJHCnGjfuw2">
    <input type="hidden" id="google-recaptcha-sitekey" name="google-recaptcha-sitekey" value="6LdM-_IUAAAAAFTKxGv8lySlDCe_HgO4ThLNdvZo">


    <div id="app"><div class="sc-gzcbmu UwmBi"><div class="sc-bqGGPW bvDFfr"><div class="sc-ksluID sc-irKDMX kWpYTp eZsuyP"><div span="6" class="sc-hBMUJo sc-hkeOVe cNhnhZ cosZie"><div class="sc-kTCsyW gxdqsh"><div class="sc-csTbgd jJhnbL"><div style="position: relative; overflow: hidden; max-height: 50px; max-width: 100px;"><a class="sc-dIvrsQ biCrYn" href="https://www.stubhub.com"><img src="https://img.vggcdn.net/images/Assets/Icons/bfx/stubhub-logo-merch-purple-mweb.440b3765.svg" alt="stubhub" style="object-fit: contain; height: 50px; width: 100px;"></a><h1 class="sc-bkbkJK dIwxJm sc-EZqKI iONckA">Buy sports, concert and theater tickets on StubHub!</h1></div></div></div></div><div span="6" class="sc-hBMUJo sc-hkeOVe sc-gVFcvn cNhnhZ cosZie iivSpg"></div></div></div></div><div class="sc-fnVZcZ hmqpxx"><div class="sc-bqGGPW bvDFfr sc-cTsKDU friOms"><div class="sc-ePZAhl qDxEy"><div class="sc-hFFCpj dgPTyl">Review and buy</div></div><div color="textPrimary" class="sc-csTbgd bHUhdD"><div class="sc-eURVIb bmNtOs"><div class="sc-hGNDhI kBxmIo">99%</div></div><div class="sc-ksluID ldMeau"><div class="sc-hBMUJo fBVoee"><div class="sc-csTbgd gEcYer"><div class="sc-fvNhHS fXozwk">Your Event</div><div class="sc-kuRTQD eReoVh"><div class="sc-jwjQtA hdwDfz"><div class="sc-jhKdTJ jwHaQO"><div class="sc-cLpxrn CqNeQ">Utah Jazz at Los Angeles Lakers</div><div class="sc-bMHtUk hcosUd"></div><div class="sc-ksluID sc-byhHut kWpYTp jRjCdP"><div class="sc-hBMUJo sc-BBLJr sc-ivAKKf bQwwdv jtewSm fALBjO"><div class="sc-fudqdz gZMivS"><div class="sc-ijByYY bCDsYD">09</div><div class="sc-tbgaB dEaIZt">Apr</div><div class="sc-ezFcaZ jhNure">2023</div></div></div><div class="sc-hBMUJo sc-ddtAvq dUWMir gXsgqc"><div class="sc-gVhpJl hISYvD"><div class="sc-bDafuw kiOUHu">Sun</div><div class="sc-LYokP qBjsX">12:30</div></div><div class="sc-gJmNuW fJUVBM"><div class="sc-fXEqZG kpTJML event-venue-label"><div>Crypto.com Arena</div><div>Los Angeles, California, USA</div></div></div></div></div></div><div class="sc-kBaCIR KVnpZ"><div class="sc-fiTsuc joMIFR"></div></div><div class="sc-cZPjRe cTKVBQ"><div class="sc-jRGmbP fPGytR"><div class="sc-ezzbNa foIfMU"><div class="sc-gNvXHo gNSMZJ"><span class="sc-kmrohN cMUENN">ADMIT</span></div><div class="sc-la-DyNK fxKBhC">2</div></div><div class="sc-ezzbNa foIfMU"><div class="sc-gNvXHo gNSMZJ">Section</div><div class="sc-la-DyNK fxKBhC">306</div></div><div class="sc-ezzbNa foIfMU"><div class="sc-gNvXHo gNSMZJ">Row</div><div class="sc-la-DyNK fxKBhC">5</div></div></div><div class="sc-dkdfPn iRRkkN"></div></div></div></div><div class="sc-biJonm huvfwk"></div><div class="sc-iXwhVA ldRoWP"><div class="sc-iJKVRt yHlBZ"><div class="sc-fSvVUw JMIdw"><div class="sc-lMZDC jTixNu"><svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 16 16" fill="currentColor"><path d="M7.985 9.172c-1.776 0-3.214-1.724-3.214-3.85s1.438-3.701 3.214-3.701 3.216 1.575 3.216 3.701-1.44 3.85-3.216 3.85zm-4.999 5.205s-.682.045-.982-.369c-.162-.223-.049-.677.062-.929l.272-.619s.752-1.681 1.607-2.655c.526-.597 1.151-.461 1.555-.267.249.12.53.468.736.652.284.254.784.543 1.602.559h.502c.818-.016 1.318-.305 1.601-.559.206-.184.479-.543.726-.667.371-.186.936-.3 1.447.282.856.974 1.534 2.685 1.534 2.685l.278.607c.115.251.233.702.075.928-.281.405-.914.351-.914.351H2.984z"></path></svg></div></div><div class="sc-fVnRWS bfa-dbI"><span class="sc-hRLfyG eVvrYK"><span class="sc-hDlsYP epHdgq">23 people viewed this event&nbsp;</span><div>in the past hour </div><div class="sc-biJonm huvfwk"></div></span></div></div></div><hr class="sc-fpqIuI tMESW"><div wrap="true" class="sc-ksluID duECel"><div class="sc-hBMUJo cNeQNO"><div class="sc-dVSYCO kzIXeR">Your Seats</div></div><div class="sc-hBMUJo jPIWKK"><div class="sc-csTbgd bDOpkR"><div class="sc-hBMUJo zYifV"><div class="sc-jldrjA gkLVYU">Number of Tickets: 2</div><div class="sc-ksluID sc-ccbkmb kWpYTp eLBMUE"><div class="sc-hBMUJo dnmgvq"><div class="sc-ksluID sc-hZpJwi kWpYTp fVXsWN">Section</div><div class="sc-ksluID sc-dCTMNR kWpYTp dbYlvW">306</div></div><div class="sc-hBMUJo dnmgvq"><div class="sc-ksluID sc-hZpJwi kWpYTp fVXsWN">Row</div><div class="sc-ksluID sc-dCTMNR kWpYTp dbYlvW">5</div></div></div><div class="sc-csTbgd iBNvfW"><div class="sc-jWgeSk efwlaj"><div class="sc-ddviXP dzlgmP"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="inherit" role="img" width="24px" height="24px" fill="textPrimary" class="sc-bdnxRM jxKEXu"><path d="M20.272 2v15.528l-1.628.767V3.629H5.279v16.742h13.365V19.15h1.628V22H3.65V2h16.622zm-6.345 8.817v1.629H7.082v-1.63h6.845zm2.935 0v1.629h-1.448v-1.63h1.448zM13.927 6.89V8.52H7.082V6.89h6.845zm2.935 0V8.52h-1.448V6.89h1.448z" fill="inherit" fill-rule="evenodd"></path></svg></div><div class="sc-jaJIhW bGFtaP"><div class="sc-csTbgd kjIYpG sc-iQQLPo eVFQLq"><div class="sc-csTbgd gsyVLM">Unrestricted view</div></div></div></div></div><div class="sc-csTbgd iBNvfW"><div class="sc-jWgeSk efwlaj"><span></span><div class="sc-jaJIhW bGFtaP"><div class="sc-csTbgd lhiMYQ"><div class="sc-jdtaiD gqGlcq"><div class="sc-fBFNFI fXszZH"><div class="sc-iOuCWW fpDSGE"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24"></rect><path d="M3.4292 5.58332V11.7143H9.14349V5.58332C9.14349 5.41895 9.01024 5.28571 8.84587 5.28571H3.72682C3.56245 5.28571 3.4292 5.41895 3.4292 5.58332Z" fill="#8647FD" stroke="black" stroke-width="0.8"></path><path d="M14.8574 5.58332V11.7143H20.5717V5.58332C20.5717 5.41895 20.4385 5.28571 20.2741 5.28571H15.155C14.9907 5.28571 14.8574 5.41895 14.8574 5.58332Z" fill="#8647FD" stroke="black" stroke-width="0.8"></path><path d="M2 18.1428H22" stroke="black" stroke-width="0.8"></path><path d="M9.14258 9.14282L14.8569 9.14282" stroke="black" stroke-width="0.8"></path><path d="M4.14355 18.1428V14.5714H8.42927V18.1428" stroke="black" stroke-width="0.8"></path><path d="M15.5708 18.1428V14.5714H19.8565V18.1428" stroke="black" stroke-width="0.8"></path><path d="M2 12.0119V14.2738C2 14.4381 2.13325 14.5714 2.29762 14.5714H10.2738C10.4382 14.5714 10.5714 14.4381 10.5714 14.2738V12.0119C10.5714 11.8475 10.4382 11.7142 10.2738 11.7142H2.29762C2.13325 11.7142 2 11.8475 2 12.0119Z" fill="#8647FD" stroke="black" stroke-width="0.8"></path><path d="M13.4292 12.0119V14.2738C13.4292 14.4381 13.5624 14.5714 13.7268 14.5714H21.703C21.8674 14.5714 22.0006 14.4381 22.0006 14.2738V12.0119C22.0006 11.8475 21.8674 11.7142 21.703 11.7142H13.7268C13.5624 11.7142 13.4292 11.8475 13.4292 12.0119Z" fill="#8647FD" stroke="black" stroke-width="0.8"></path></svg></div></div><div class="sc-jaBegh ihbyqT">You'll be seated together&nbsp;in Row&nbsp;5</div></div></div></div></div></div></div></div></div><div class="sc-hBMUJo hEuIWu"><img src="https://img.vggcdn.net/img/vfs3/1934/23290.png" alt="View From Seat" class="sc-hQbnUn eFVHRp"></div></div><hr class="sc-fpqIuI tMESW"><div wrap="true" class="sc-ksluID duECel"><div class="sc-hBMUJo cNeQNO"><div class="sc-dVSYCO kzIXeR">Delivery</div></div><div class="sc-hBMUJo cNeQNO"><div class="sc-csTbgd bDOpkR"><div class="sc-fMMRXT kUJnUT"><p class="sc-hHSjgo iPUwFU">Mobile Ticket</p><div class="sc-csTbgd XOHGW">You will receive tickets you can download and use on your mobile phone.</div></div></div></div></div><hr class="sc-fpqIuI tMESW"><div wrap="true" class="sc-ksluID duECel"><div class="sc-hBMUJo cNeQNO"><div class="sc-dVSYCO kzIXeR">Recent Orders</div></div><div class="sc-hBMUJo cNeQNO"><div class="sc-csTbgd bDOpkR"><div class="sc-jsSDDP eHUCld"><p class="sc-bXmHAB bCgkVf">These are the recent orders that were placed before you for this event.</p><div class="sc-PxmE jEkJEg"><div class="sc-fsWHBt cawjqh"><div class="sc-fUqQNk itkeTL">Sold 31 minutes ago</div><div class="sc-jtmhnJ bFmIfT">5 Tickets in section PR02 at $250 each</div></div><div class="sc-fsWHBt cawjqh"><div class="sc-fUqQNk itkeTL">Sold 2 hours ago</div><div class="sc-jtmhnJ bFmIfT">2 Tickets in section 214 at $174 each</div></div></div></div></div></div></div><hr hidden="" class="sc-fpqIuI jwnsTs"></div></div><div class="sc-hBMUJo kEfQGu"><div class="sc-csTbgd ieNbDZ"><div class="sc-csTbgd dQhkRO"><div class="sc-kJrGqu hXGToE"><div aria-hidden="true" class="sc-bjHqKj fFYihc"><div class="sc-bgPuHN iJAsbP"><div class="sc-vMGZd dbNSDk"></div><div class="sc-eqLmJG fvWiKM"><div class="sc-enTqHk gVANIR">0</div><div class="sc-yEDbz izOGgw">0</div></div></div><div class="sc-bgPuHN iJAsbP"><div class="sc-vMGZd dbNSDk"></div><div class="sc-eqLmJG fvWiKM"><div class="sc-enTqHk gVANIR">0</div><div class="sc-yEDbz izOGgw">4</div></div></div><div class="sc-eYWepU cGEFaV">:</div><div class="sc-bgPuHN iJAsbP"><div class="sc-vMGZd dbNSDk"></div><div class="sc-eqLmJG fvWiKM"><div class="sc-enTqHk gVANIR">0</div><div class="sc-yEDbz izOGgw">4</div></div></div><div class="sc-bgPuHN iJAsbP"><div class="sc-vMGZd dbNSDk"></div><div class="sc-eqLmJG fvWiKM"><div class="sc-enTqHk gVANIR">1</div><div class="sc-yEDbz izOGgw">0</div></div></div></div><span class="sc-dprnXS eyUYsL">04:40</span><span class="sc-hRLfyG gCtJjX"><span class="sc-hDlsYP cbyPPe">left to complete purchase&nbsp;<span class="sc-epOimh bvFYXK"><span style="display: inline-block; padding: 0px; cursor: pointer; vertical-align: middle;"><button type="button" aria-expanded="false" aria-haspopup="true" aria-label="tooltip"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="inherit" role="img" width="16px" height="16px" fill="currentColor" class="sc-bdnxRM iJPHlW"><path d="M12 2c5.51 0 10 4.49 10 10s-4.49 10-10 10S2 17.51 2 12 6.49 2 12 2zm0 1.667c-4.592 0-8.333 3.741-8.333 8.333 0 4.592 3.741 8.333 8.333 8.333 4.592 0 8.333-3.741 8.333-8.333 0-4.592-3.741-8.333-8.333-8.333zm0 6.2c.589 0 1.067.478 1.067 1.066v5.334a1.067 1.067 0 01-2.134 0v-5.334c0-.588.478-1.066 1.067-1.066zm0-3.2A1.067 1.067 0 1112 8.8a1.067 1.067 0 010-2.134z" fill="inherit" fill-rule="evenodd"></path></svg><div class="sc-biJonm iBLESZ"></div></button></span></span></span><div class="sc-biJonm huvfwk"></div></span></div><hr class="sc-fpqIuI tMESW"></div><div class="sc-jdXKxY hLOQZw"><div><div class="sc-ddIsst bPLjwV"><div class="sc-ksluID iRNbUG"><div class="sc-hBMUJo zYifV pbd-item-label">Ticket Price</div><div class="sc-hBMUJo zYifV pbd-item-value">2 × $97</div></div><div class="sc-ksluID iRNbUG"><div class="sc-hBMUJo zYifV pbd-item-label">Service and Fulfillment Fee</div><div class="sc-hBMUJo zYifV pbd-item-value">2 × $30</div></div><div class="sc-biJonm huvfwk"></div><div class="sc-biJonm huvfwk"></div><div class="sc-biJonm huvfwk"></div><div class="sc-gVPcaA icspdR"><div class="sc-ksluID iRNbUG"><div class="sc-hBMUJo zYifV total-price-label"><div class="sc-biJonm huvfwk"></div><div class="sc-hBMUJo sc-HvCEC zYifV diNWkT">Total Price</div></div><div class="sc-hBMUJo zYifV total-price-value"><span class="sc-fhnvib bOHmrd">$255</span></div></div></div><div class="sc-ddIsst bkHKwj">Fees help us bring you a safe, global marketplace where you can get tickets to your favorite events.</div><div class="sc-jodtrm lhBSrm"><span class="sc-hRLfyG hXaMQi"><span class="sc-hDlsYP MPfhM"><span class="sc-eEnULY eCIkmg">Great choice! On average, customers paid <strong class="fs16">$255</strong> (excluding fees) per ticket for this event on our site - more than the <strong class="fs16">$97</strong> (excluding fees) tickets you've selected</span>&nbsp;<span class="sc-epOimh bvFYXK"><span style="display: inline-block; padding: 0px; cursor: pointer; vertical-align: middle;"><button type="button" aria-expanded="false" aria-haspopup="true" aria-label="tooltip"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="inherit" role="img" width="16px" height="16px" fill="currentColor" class="sc-bdnxRM iJPHlW"><path d="M12 2c5.51 0 10 4.49 10 10s-4.49 10-10 10S2 17.51 2 12 6.49 2 12 2zm0 1.667c-4.592 0-8.333 3.741-8.333 8.333 0 4.592 3.741 8.333 8.333 8.333 4.592 0 8.333-3.741 8.333-8.333 0-4.592-3.741-8.333-8.333-8.333zm0 6.2c.589 0 1.067.478 1.067 1.066v5.334a1.067 1.067 0 01-2.134 0v-5.334c0-.588.478-1.066 1.067-1.066zm0-3.2A1.067 1.067 0 1112 8.8a1.067 1.067 0 010-2.134z" fill="inherit" fill-rule="evenodd"></path></svg><div class="sc-biJonm iBLESZ"></div></button></span></span></span><div class="sc-biJonm huvfwk"></div></span></div><div class="sc-biJonm huvfwk"></div><div class="sc-biJonm huvfwk"></div><div class="sc-biJonm huvfwk"></div></div><hr class="sc-fpqIuI tMESW"></div></div><div wrap="false" class="sc-ksluID aNgFY"><div class="sc-hBMUJo zYifV"><div class="sc-fvNhHS YrOSI">Gift Card</div></div><div class="sc-hBMUJo zYifV"><div class="sc-cpUASM bqNXll"><button class="sc-fujyAs sc-kEqXSa jmMgcT ctdTBp" shape="pill"><div class="sc-biJonm huvfwk"></div>Manage</button></div></div></div><hr class="sc-fpqIuI tMESW"><div wrap="false" class="sc-ksluID aNgFY"><div class="sc-hBMUJo zYifV"><div class="sc-fvNhHS YrOSI"><span>Payment Method - <span>Credit Card</span></span></div></div><div class="sc-hBMUJo zYifV"><div class="sc-cpUASM bqNXll"><button class="sc-fujyAs sc-kEqXSa jmMgcT ctdTBp" shape="pill">Change Payment</button></div></div></div><div class="sc-ksluID sc-glgZbY kWpYTp ghSaiH"><div span="8" class="sc-hBMUJo sc-gtbgjk hjSPlJ bIJUPL">************4742&nbsp;02/27</div><div span="4" class="sc-hBMUJo sc-gtbgjk bJFRoN bIJUPL"></div></div><hr class="sc-fpqIuI tMESW"><p class="sc-eemifY cVOQVd"><span>By clicking the button below you acknowledge and accept our <a href="/secure/help/termsandconditions">terms and conditions</a> and <a href="/secure/help/privacy">privacy policy</a></span></p><div class="sc-biJonm huvfwk"></div><div class="sc-csTbgd fjLTRU"><div><button class="sc-fujyAs sc-pNWdM kihZQU pNRBG" shape="pill"><span>Buy Now</span></button></div></div><p class="sc-cAUwBd fcKsOG">Not sure if you can make it to this event? No worries! You can resell your tickets on StubHub if you are unable to attend!</p><div class="sc-biJonm huvfwk"></div><a class="sc-dIvrsQ biCrYn" href="/promise" title="Learn more about our promise ›"><div class="sc-csTbgd eEKyOu"><img alt="fan protect guarantee" class="sc-kfYoZR jEdcfg" src="https://img.vggcdn.net/images/Assets/Icons/bfx/fanprotect.724c822d.svg"></div></a><div class="sc-chKoiE fZxyVJ">We back every order so you can buy &amp; sell tickets with 100% confidence.</div></div></div></div></div></div></div><div class="sc-fFSPTT eEJWPz"></div><div class="Toastify"></div></div>
    <div id="modal-root"></div>

        
        
        


    <script nomodule="" crossorigin="" src="https://ws.vggcdn.net/scripts/d/e/r/ie/runtime.bd4bf4c2.js"></script>
    <script nomodule="" crossorigin="" src="https://ws.vggcdn.net/scripts/d/e/r/ie/vendors.33d0e155.chunk.js"></script>
    <script nomodule="" crossorigin="" src="https://ws.vggcdn.net/scripts/d/e/r/ie/viagogo-modules.8a2a4aee.chunk.js"></script>
    <script nomodule="" crossorigin="" src="https://ws.vggcdn.net/scripts/d/e/r/ie/icon.bcd932d6.chunk.js"></script>
    <script nomodule="" crossorigin="" src="https://ws.vggcdn.net/scripts/d/e/r/ie/viagogo-checkout-review.59484651.chunk.js"></script>

    
<script type="text/javascript">
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','__ga');
    __ga('create', 'UA-266806-12', 'auto');
    __ga('set', 'anonymizeIp', true);

            __ga('send', 'pageview');
</script>



    <script nomodule="" crossorigin="" src="https://ws.vggcdn.net/scripts/d/e/r/ie/vgo-web-vitals.e360f1b5.chunk.js"></script>



<script async="" src="https://www.googletagmanager.com/gtag/js?id=AW-1039308173"></script><noscript><img height="1" width="1" src="https://www.facebook.com/tr?id=440862442988419&amp;ev=PageView&amp;noscript=1"></noscript><div style="width:0px; height:0px; display:none; visibility:hidden;" id="batBeacon73340322721"><img style="width:0px; height:0px; display:none; visibility:hidden;" id="batBeacon137833185519" width="0" height="0" alt="" src="https://bat.bing.com/action/0?ti=4031192&amp;Ver=2&amp;mid=495b03cc-b38f-47ab-bfef-e21f7ab263d7&amp;sid=d46363f0c80a11edbb5a99dbbed22c54&amp;vid=7638227063e511ed90051180966e9c1b&amp;vids=0&amp;msclkid=N&amp;pi=918639831&amp;lg=en-US&amp;sw=1440&amp;sh=900&amp;sc=30&amp;tl=04%3A44%20left%20to%20complete%20purchase%20%7C%20Utah%20Jazz%20at%20Los%20Angeles%20Lakers&amp;p=https%3A%2F%2Fwww.stubhub.com%2Fsecure%2Fbuy%2FReviewAndBuy%3FID%3Da37e9ba8-1a22-4061-8965-779e0fa1212d%257C6182204947%257C2%257C0%26url%3Dbuy&amp;r=https%3A%2F%2Fwww.stubhub.com%2Fsecure%2Fbuy%2Fpayment%3FID%3Da37e9ba8-1a22-4061-8965-779e0fa1212d%257C6182204947%257C2%257C0%26url%3DBuy&amp;lt=1060&amp;evt=pageLoad&amp;sv=1&amp;rn=720122"></div><div><div class="sc-bTTELM bvWVmK"><style>
@font-face {
    font-family: 'Mont';
    src: url(chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/fonts/Mont-SemiBold.otf) format('opentype');
    font-weight: 700;
}

@font-face {
  font-family: 'Mont';
  src: url(chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/fonts/MontBold.otf) format('opentype');
  font-weight: 800;
}

@font-face {
    font-family: 'Manrope';
    src: url(chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/fonts/Manrope.ttf) format('truetype');
    font-weight: 100 800;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: url(chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/fonts/HelveticaNeue Light.ttf) format('truetype');
    font-weight: 300;
}

@font-face {
    font-family: 'HelveticaNeue';
    src: url(chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/fonts/HelveticaNeue Medium.ttf) format('truetype');
    font-weight: 500;
}
</style><div class="sc-bcXHqe iYJIDF"><img src="chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/imgs/base-layer.png" class="sc-gswNZR fpNFrr"><img src="chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/imgs/white-dots.png" class="sc-dkrFOg icAJVH dots"></div>;<div class="sc-fXqpFg lfBGi"><h1 class="sc-dwnOUR dHFnKd">spotlight</h1><button class="sc-hlLBRy jQfQUS"><img src="chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/imgs/X Button.svg" class="sc-eKJbhj jxrnkx"></button><div class="sc-jNJNQp bLYGAW"></div><div width="2.7999999999999843" class="sc-iOeugr fatONn" style="width: 7.46667%; background-color: rgb(75, 59, 255);"></div><div class="sc-kgTSHT htXDGC"><button width="84px" class="sc-fLcnxK iHGMlJ"><img src="chrome-extension://dboagkefghlfcldnhjgjgbgoomljlehi/imgs/filter.svg" alt="Filter" class="sc-iveFHk fPKZuS"><p class="sc-bBABsx iYoNBY">Filters</p></button><div class="sc-bqWxrE oFghM"><div class="sc-ksBlkl hOrzZA"><div class="sc-hBxehG eTMmbc"><h2 class="sc-fnGiBr cgQOZc">Price Range:</h2> <h2 class="sc-fEXmlR ivCsLa">$0 - $3000</h2></div><div class="sc-ftTHYK hKRbek"><div width="70" class="sc-gKPRtg cQeClK"><p class="sc-iBYQkv ifPqfX">$0</p></div><div class="sc-pyfCe llpYOg"><input type="range" min="0" max="3000" class="sc-jrcTuL bcZIDK" value="0"><input type="range" min="0" max="3000" class="sc-kDvujY bWIYOL" value="3000"><div class="sc-ipEyDJ eEvqTj"><div class="sc-eDWCr PnuqU" style="left: 0%; width: 100%;"></div><div class="sc-csuSiG fSCTiE"></div></div></div><div width="70" class="sc-gKPRtg cQeClK"><p class="sc-iBYQkv ifPqfX">$3000</p></div></div><div class="sc-hBxehG eTMmbc"><h2 class="sc-fnGiBr cgQOZc">Number of Tickets:</h2> <h2 class="sc-fEXmlR ivCsLa">Any</h2></div><div class="sc-bjfHbI jsYDvA"><div width="0" class="sc-gKPRtg kYWiIR"><p class="sc-iBYQkv ifPqfX">Any</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">1</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">2</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">3</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">4</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">5</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">6</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">7</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">8</p></div><div width="0" class="sc-gKPRtg dRBntH"><p class="sc-iBYQkv ifPqfX">9+</p></div></div><div class="sc-hBxehG eTMmbc"><h2 class="sc-fnGiBr cgQOZc">Websites:</h2> <h2 class="sc-fEXmlR ivCsLa">Any</h2></div><div class="sc-bjfHbI bLgcKA"><div width="0" class="sc-gKPRtg jTTzfq"><p class="sc-iBYQkv ifPqfX">Any</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">AXS</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">GameTime</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">SeatGeek</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">StubHub</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">Ticketmaster</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">TickPick</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">TicketIQ</p></div><div width="0" class="sc-gKPRtg clrcQs"><p class="sc-iBYQkv ifPqfX">VividSeats</p></div></div></div><div class="sc-idXgbr dWdgaI"><button class="sc-dIfARi bqlhxK"><p color="#27292a" class="sc-dmctIk elfWkU"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" class="svg-inline--fa fa-angle-left " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>   Back to Listings</p></button><button class="sc-hHTYSt hIJqYu"><p color="#FFFFFF" class="sc-dmctIk eNpeR">Apply Changes</p></button></div></div><button width="93px" class="sc-fLcnxK iHGMlJ" style="margin-left: 10px;"><p class="sc-bBABsx iYoNBY">Sort By: <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" class="svg-inline--fa fa-chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path></svg></p></button><div class="sc-hLBbgP gENtEw"><div class="sc-eDvSVe qKDxE"><p class="sc-jSUZER jQLZIP">Price: Low-High</p></div><div class="sc-eDvSVe qKDxE"><p class="sc-jSUZER jQLZIP">Price: High-Low</p></div></div></div><div class="sc-gScZFl jAieSF"><div class="sc-lbVpMG jIgvku">👀 looking for the best deals...</div></div><div class="sc-jfvxQR kZzUmz"><div class="sc-eJDSGI duzHKU"><div class="sc-oZIhv ijWxpN"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 20px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 50px; height: 50px; --base-color:#D2CEFF;">‌</span><br></span><div class="sc-hiDMwi hOWvUA"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 120px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 20px; --base-color:#EDECff;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 50px; --base-color:#D6D2FF;">‌</span><br></span></div><div class="sc-eJDSGI duzHKU"><div class="sc-oZIhv ijWxpN"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 20px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 50px; height: 50px; --base-color:#D2CEFF;">‌</span><br></span><div class="sc-hiDMwi hOWvUA"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 120px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 20px; --base-color:#EDECff;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 50px; --base-color:#D6D2FF;">‌</span><br></span></div><div class="sc-eJDSGI duzHKU"><div class="sc-oZIhv ijWxpN"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 20px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 50px; height: 50px; --base-color:#D2CEFF;">‌</span><br></span><div class="sc-hiDMwi hOWvUA"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 120px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 20px; --base-color:#EDECff;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 50px; --base-color:#D6D2FF;">‌</span><br></span></div><div class="sc-eJDSGI duzHKU"><div class="sc-oZIhv ijWxpN"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 20px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 50px; height: 50px; --base-color:#D2CEFF;">‌</span><br></span><div class="sc-hiDMwi hOWvUA"><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 120px; height: 20px; --base-color:#DEDBFF;">‌</span><br></span><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 20px; --base-color:#EDECff;">‌</span><br></span></div><span aria-live="polite" aria-busy="true"><span class="react-loading-skeleton" style="width: 100px; height: 50px; --base-color:#D6D2FF;">‌</span><br></span></div></div><div class="sc-jfTVlA kkWVXn"></div></div></div></div><iframe src="about:blank" id="tmx_tags_iframe" title="empty" tabindex="-1" aria-disabled="true" aria-hidden="true" data-time="1679427758126" style="width: 0px; height: 0px; border: 0px; position: absolute; top: -5000px;"></iframe></body>
`
export const findDiv = (
    $,
    targetString,
    htmlTag = `div`,
    strictEquality = true
) => {
    return $(htmlTag).filter(function () {
        if (strictEquality) return $(this).text().trim() === targetString;
        return $(this).text().trim().includes(targetString);
    });
};
const $ = load(outerHtml);

let isAssigned = true;
const rowDiv = findDiv($, `Row`);
console.log(`Row:`, rowDiv.text());
if (rowDiv.text() === '') isAssigned = false;

let quantity = 0,
    section = '',
    row = '',
    stadium = '',
    city = '',
    state = '',
    day = '',
    date = '',
    hour = '',
    basePrice = '',
    service = '',
    totalPrice = '';

if (isAssigned) {
    console.log(`Assigned`)
    const quantityDiv = findDiv($, 'ADMIT');
    const sectionDiv = findDiv($, 'Section');
    const dateDiv = findDiv($, '2023').parent();
    const venueDiv = $(`[class*='event-venue-label']`);
    const basePriceDiv = findDiv($, 'Ticket Price');

    const getServiceDiv = () => {
        const firstTry = findDiv($, `Service and Fulfillment Fee`);
        if (firstTry.text() !== '') return firstTry;
        return findDiv($, `Fulfillment and Service Fee`)
    }

    const serviceDiv = getServiceDiv();
    const totalPriceDiv = $(`[class*='total-price-value']`);

    quantity = parseInt(quantityDiv.next().text());
    section = sectionDiv.first().next().text();
    row = rowDiv.first().next().text();

    stadium = venueDiv.children().eq(0).text();
    const cityState = venueDiv.children().eq(1).text().split(', ');
    city = cityState[0];
    if (cityState.length > 1) state = cityState[1];

    const dateDay = dateDiv.children().eq(0).text();
    const month = dateDiv.children().eq(1).text();
    const year = dateDiv.children().eq(2).text();
    date = `${dateDay} ${month} ${year}`;
    const dayHourParent = venueDiv.parent().prev();
    day = dayHourParent.children().eq(0).text();
    hour = dayHourParent.children().eq(1).text();

    const basePriceNext = basePriceDiv.next().text();
    console.log(`Here:`, basePriceNext)

    console.log(`Service:`, serviceDiv.text());

    const serviceNext = serviceDiv.next().text();
    console.log(`Next:`, serviceNext);

    basePrice = basePriceDiv.next().text().split(' × ')[1].replace('$', '');
    service = serviceDiv.next().text().split(' × ')[1].replace('$', '');
    totalPrice = totalPriceDiv.text().replace('$', '');
}

const checkItems = () => {
    console.log(`Quantity:`, quantity);
    console.log(`Section:`, section);
    console.log(`Row:`, row);
    console.log(`Stadium:`, stadium);
    console.log(`City:`, city);
    console.log(`State:`, state);
    console.log(`Date:`, date);
    console.log(`Day:`, day);
    console.log(`Hour:`, hour);
    console.log(`Base Price:`, basePrice);
    console.log(`Service Fee:`, service);
    console.log(`Total Price:`, totalPrice);
};

checkItems();