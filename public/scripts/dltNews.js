import dltNews from './utils/deleteFunc.js'

const dltBtn = document.querySelectorAll('.dlt-news');


dltBtn.forEach(btn => {

    btn.addEventListener('click' , async (e) => {

        const closest = '.news-card';
        const dataset = 'newsId';
        const routes = '/admin/news'

        const {card , data} = await dltNews(e , closest , dataset , routes);

        if(data.error){
            alert(res.error)
        }

        if(data.success){
            card.remove()
        }
    })

})