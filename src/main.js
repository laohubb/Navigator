const $siteList = $('.siteList')
const $lastLi=$siteList.find('li.last')

let localList=JSON.parse(localStorage.getItem('urlList'))

const hashMap=localList||
    [
        {logo:"B",url:"https://www.bilibili.com"},
        {logo:"G",url:"https://www.google.com/"},
        {logo:"D",url:"https://www.douban.com/"},
        {logo:"Z",url:"https://www.zhihu.com/"},
        {logo:"N",url:"https://news.163.com/"},

    ]

const simplyfyUrl=(url)=>{
    return url.replace('https://','').
    replace('http://','').
    replace('www.','').
    replace(/\.com.*|\.cn.*/,'')
}
const render=()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li =$(`<li>
                <div class="site">
                    <div class="logo">${simplyfyUrl(node.url)[0].toUpperCase()}</div>
                    <div class="link">${simplyfyUrl(node.url)}</div>
                     <div class="icon-delete"> 
                    <svg t="1658041851348" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3192" width="32" height="32"><path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z" p-id="3193"></path></svg>
                </div>
                </div>
        </li>`).insertBefore($lastLi)

        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.icon-delete',(e)=>{
            e.stopPropagation()
            hashMap.splice(index,1)

            render()
        })
    })
}
render()
$('.addButton').on('click',()=>{
    let url=window.prompt("请输入要添加的网址")
    if(url.indexOf('http')!==1){
        url='https://'+url
    }
    hashMap.push({logo:url[0],url:url})

})



$(document).on('keypress',(event)=>{
    const key=event.key.toUpperCase()
    // window.open()
    hashMap.forEach((item)=>{
       if(item.logo===key){
           window.open(item.url)
       }
    })
});

$('.searchDiv').on('click',()=>{
    $(document).off('keypress')
})

window.onbeforeunload=()=>{
    const localList=JSON.stringify(hashMap)
    localStorage.setItem('urlList',localList)
}


