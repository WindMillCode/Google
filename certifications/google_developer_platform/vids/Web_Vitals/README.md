# Web Vitals

<!-- ## [Youtube Walkthrough]() -->


* after the lab your file should look like web-vitals.directive.final.ts
* if issues copy and paste from web-vitals.directive.start.ts


### Start the Angular App

* download the frontend [here](https://downgit.github.io/#/home?url=https://github.com/WindMillCode/Google/tree/master/certifications/google_developer_platform/AngularApp)
open a terminal and head to project root and run this command
```ps1
npm install -s
npx ng serve -c=webVitals --open=true
```



* if there are issues remove all datasets created from the lab and start again
* open web-vitals.directive.ts and in your code editor,



### HTML Module Scripts

* in 'sample web -vitals' paste this code
    * we implement module scripts here so you do not have to go back and forth trying to implement this lab, 
    * module scripts are very new check your browser compatibility features
```ts
    {
        name:"Web Vitals",
        type:"module",
        async:"true",
        innerText:`
            import {getCLS, getFID, getLCP} from 'https://unpkg.com/web-vitals?module';

            getCLS(console.log);
            getFID(console.log);
            getLCP(console.log);

            // send the data to web ananlytics

            // 
        `,
        insertion:{
            appendChild:document.body
        }
    },
```

* refresh the page and as you click on the page, performance data will be shown in the logs


### Google Ananlytics


#### Google Analytics API
[cloud console](console.cloud.google.com)
 * enable analytics api and analytics admin API
* head to analytics.google.com
* create a google marketing platform account, and you need an actual website account for this step
    * however rather setup firebase hosting and take the tracking id and use as needed in your web app
* check resources on how to set this up
* you will need that tracking ID

#### Client Analytics API  communication

__FILE: environment.gdp.dev.ts__
in 'paste webVitals object here' paste your gtag trackig id
```ts
    webVitals:{
        gtag:"your gtag ID HERE"
    }
```

__FILE: web-vitals.ts__
* in 'send the data to web analytics' paste this code
    its commeneted inside the  module script code so  look closely, its going to  end up as a string
```js
        function sendToGoogleAnalytics({name, delta, id}) {
            gtag('event', name, {
                event_category: 'Web Vitals',
                value: Math.round(name === 'CLS' ? delta * 1000 : delta),
                event_label: id,
                non_interaction: true,
            });
        }

        getCLS(sendToGoogleAnalytics);
        getFID(sendToGoogleAnalytics);
        getLCP(sendToGoogleAnalytics);
```



* in 'send the data to google analytics' paste this code
```ts
                        {
                            name:"gtag",
                            src:"https://www.googletagmanager.com/gtag/js?id="+env.webVitals.gtag,
                            defer:"true",
                            placement:{
                                insertBefore:{
                                    parent:document.documentElement,
                                    sibling:document.body
                                }
                            }
                        },
                        {
                            name:"gtag-setup",
                            defer:"true",
                            innerText:`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());

                            gtag('config', '${env.webVitals.gtag}');
                            `,
                            placement:{
                                insertBefore:{
                                    parent:document.documentElement,
                                    sibling:document.body
                                }
                            }
                        },
```

* refresh the browser several times and head to ananlytics.google.com
* we can see values like LCP, CLS, and FID 
* more in  resources


### First Input Delay
* time  it takes for user to begin to interact with the website until site responds
    * Break up Long Tasks
    * Optimize your page for interaction readiness
    * Use a web worker

### Cumulative Layout Shift
* stability of the webpage as the user loads the website
     * always provide width and height attributes for your media elements
     * keep ads at the center of the page if you can
    * static dimensions for all fonts
    * try to use transititons over animations

### Largest Contentful Paint
* measure the time it takes for content to visually render (paint) on a page
    * Minify CSS
    * Defer non-critical CSS    
    * use ssr

### Resources
[Setup Google Analytics](https://www.youtube.com/watch?v=f3X-hYRxBL8)
[Setup Firebase Hosting](https://www.youtube.com/watch?v=9Q46HcMbaNs)
[FID](https://web.dev/optimize-fid?continue=https%3A%2F%2Fdevelopers.google.com%2Flearn%2Fpathways%2Fweb-vitals%3Fhl%3Den%23article-https%3A%2F%2Fweb.dev%2Foptimize-fid)
[CLS](https://web.dev/optimize-cls?continue=https%3A%2F%2Fdevelopers.google.com%2Flearn%2Fpathways%2Fweb-vitals%3Fhl%3Den%23article-https%3A%2F%2Fweb.dev%2Foptimize-cls)
[LCP](https://web.dev/optimize-lcp?continue=https%3A%2F%2Fdevelopers.google.com%2Flearn%2Fpathways%2Fweb-vitals%3Fhl%3Den%23article-https%3A%2F%2Fweb.dev%2Foptimize-lcp)
[Best Practices for Performance and Page Hits, Web Vitals](https://web.dev/vitals-field-measurement-best-practices?continue=https%3A%2F%2Fdevelopers.google.com%2Flearn%2Fpathways%2Fweb-vitals%3Fhl%3Den%23article-https%3A%2F%2Fweb.dev%2Fvitals-field-measurement-best-practices)