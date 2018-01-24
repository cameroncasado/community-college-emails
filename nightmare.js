const Nightmare = require('nightmare');
const nightmare = Nightmare({
    show: true, // will show browser window
    openDevTools: true // will open dev tools in browser window 
});

const url = 'http://cfcc.edu/fasd/';
const selector = '[href="mailto:jcaaron480@mail.cfcc.edu"]';

nightmare
        .goto(url)
        .wait(10000)
        .mouseover('tr td:nth-child(4) a')
        .evaluate(function(){
            return document.querySelectorAll('tr td:nth-child(4)');
        })
        .end()
//this variable will be injected into evaluate callback
//it is required to inject required variables like this,
// because You have different - browser scope inside this
// callback and You will not has access to node.js variables not injected 


//tr td:nth-child(4)


//https://stackoverflow.com/questions/41281959/retrieve-html-content-of-a-page-several-seconds-after-its-loaded